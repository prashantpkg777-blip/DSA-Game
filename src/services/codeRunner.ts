import { ExecutionResult, SupportedLanguage, TestCaseResult } from '../types/codeEditor';
import { TestCase } from '../types/curriculum';

export interface CodeRunnerOptions {
  timeoutMs?: number;
  abortSignal?: AbortSignal;
}

// Active worker tracker to cancel any running task if a new submission arrives
let currentActiveWorker: Worker | null = null;
let currentActiveBlobUrl: string | null = null;

export function cancelCurrentExecution(): void {
  if (currentActiveWorker) {
    currentActiveWorker.terminate();
    currentActiveWorker = null;
  }
  if (currentActiveBlobUrl) {
    try {
      URL.revokeObjectURL(currentActiveBlobUrl);
    } catch {
      // Ignored
    }
    currentActiveBlobUrl = null;
  }
}

/**
 * Sandboxed in-browser JavaScript execution inside an isolated Web Worker.
 * - Enforces hard 2500ms watchdog timeout (worker.terminate()).
 * - Completely isolated from main thread UI, DOM, localStorage, and cookies.
 * - Restricts worker network capabilities (fetch, XMLHttpRequest, WebSocket, importScripts).
 * - Never executes untrusted user code synchronously on the main thread.
 */
export function runJavaScriptSandbox(
  userCode: string,
  functionName: string,
  testCases: TestCase[],
  options?: CodeRunnerOptions
): Promise<ExecutionResult> {
  const timeoutMs = options?.timeoutMs ?? 2500;
  const abortSignal = options?.abortSignal;
  const startTime = performance.now();

  // Terminate any prior in-flight execution to prevent resource exhaustion
  cancelCurrentExecution();

  if (typeof window === 'undefined' || typeof Worker === 'undefined' || typeof Blob === 'undefined') {
    return Promise.resolve({
      success: false,
      testResults: [],
      passedTests: 0,
      totalTests: testCases.length,
      executionTimeMs: 0,
      compileError: 'Web Worker execution is unavailable in this environment. Synchronous execution on the main thread is disabled for security.',
      logs: ['[ERROR] Execution blocked: client lacks Web Worker support.'],
    });
  }

  return new Promise((resolve) => {
    // Isolated Worker Script with stripped network/storage APIs
    const workerScript = `
      // 1. Sandbox Restriction: neutralize network and dynamic script loading
      self.fetch = undefined;
      self.XMLHttpRequest = undefined;
      self.WebSocket = undefined;
      self.EventSource = undefined;
      self.importScripts = undefined;
      self.indexedDB = undefined;

      self.onmessage = function(e) {
        const { userCode, functionName, testCases } = e.data;
        const logs = [];
        const customConsole = {
          log: function(...args) {
            logs.push(args.map(a => (typeof a === 'object' && a !== null) ? JSON.stringify(a) : String(a)).join(' '));
          },
          error: function(...args) { logs.push('[ERROR] ' + args.join(' ')); },
          warn: function(...args) { logs.push('[WARN] ' + args.join(' ')); },
        };

        try {
          // Construct sandbox function with custom console
          const sandboxFn = new Function('console', \`
            "use strict";
            \${userCode}
            if (typeof \${functionName} !== 'function') {
              throw new Error('Function "\${functionName}" is not defined or is not a function.');
            }
            return \${functionName};
          \`);

          const targetFn = sandboxFn(customConsole);
          const testResults = [];
          let passedCount = 0;

          for (const tc of testCases) {
            const caseStart = performance.now();
            let parsedArgs;
            try {
              parsedArgs = JSON.parse('[' + tc.input + ']');
            } catch {
              parsedArgs = [new Function('return (' + tc.input + ')')()];
            }

            const actual = targetFn(...parsedArgs);
            const caseDuration = Math.round((performance.now() - caseStart) * 100) / 100;
            const normalizedActual = JSON.stringify(actual);

            let normalizedExpected = tc.expectedOutput.trim();
            try {
              normalizedExpected = JSON.stringify(JSON.parse(tc.expectedOutput));
            } catch {
              // Raw string fallback
            }

            const passed = (normalizedActual === normalizedExpected) || (String(actual) === tc.expectedOutput);
            if (passed) passedCount++;

            testResults.push({
              testCaseId: tc.id,
              passed,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              actualOutput: normalizedActual,
              executionTimeMs: caseDuration,
              isHidden: Boolean(tc.isHidden),
            });
          }

          self.postMessage({
            success: passedCount === testCases.length,
            testResults,
            passedTests: passedCount,
            totalTests: testCases.length,
            logs,
          });
        } catch (err) {
          self.postMessage({
            success: false,
            compileError: err?.message || String(err),
            logs,
          });
        }
      };
    `;

    let blob: Blob;
    let blobUrl: string;
    let worker: Worker;

    try {
      blob = new Blob([workerScript], { type: 'application/javascript' });
      blobUrl = URL.createObjectURL(blob);
      worker = new Worker(blobUrl);
      currentActiveWorker = worker;
      currentActiveBlobUrl = blobUrl;
    } catch (err: any) {
      return resolve({
        success: false,
        testResults: [],
        passedTests: 0,
        totalTests: testCases.length,
        executionTimeMs: 0,
        compileError: 'Failed to initialize secure Web Worker sandbox: ' + (err?.message || 'CSP restriction'),
        logs: ['[ERROR] Worker initialization failed.'],
      });
    }

    let hasResolved = false;

    const cleanup = () => {
      clearTimeout(timer);
      if (abortSignal) {
        abortSignal.removeEventListener('abort', handleAbort);
      }
      if (worker === currentActiveWorker) {
        currentActiveWorker = null;
      }
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
    };

    const handleAbort = () => {
      if (!hasResolved) {
        hasResolved = true;
        cleanup();
        const totalTime = Math.round(performance.now() - startTime);
        resolve({
          success: false,
          testResults: [],
          passedTests: 0,
          totalTests: testCases.length,
          executionTimeMs: totalTime,
          compileError: 'Execution canceled by user.',
          logs: ['[INFO] Execution aborted.'],
        });
      }
    };

    if (abortSignal) {
      if (abortSignal.aborted) {
        handleAbort();
        return;
      }
      abortSignal.addEventListener('abort', handleAbort);
    }

    const timer = setTimeout(() => {
      if (!hasResolved) {
        hasResolved = true;
        cleanup();
        const totalTime = Math.round(performance.now() - startTime);

        resolve({
          success: false,
          testResults: [],
          passedTests: 0,
          totalTests: testCases.length,
          executionTimeMs: totalTime,
          compileError: `Time Limit Exceeded (TLE) — Code took longer than ${timeoutMs}ms limit. Check for infinite loops or recursion.`,
          logs: [`[ERROR] Execution halted: process exceeded ${timeoutMs}ms safety timeout.`],
        });
      }
    }, timeoutMs);

    worker.onmessage = (e) => {
      if (!hasResolved) {
        hasResolved = true;
        cleanup();

        const totalTime = Math.round(performance.now() - startTime);
        const data = e.data;

        resolve({
          success: Boolean(data.success),
          testResults: data.testResults || [],
          passedTests: data.passedTests || 0,
          totalTests: testCases.length,
          executionTimeMs: totalTime,
          compileError: data.compileError,
          logs: data.logs || [],
          // Note: Browser workers cannot read system RAM usage safely, so memoryKb remains undefined.
        });
      }
    };

    worker.onerror = (err) => {
      if (!hasResolved) {
        hasResolved = true;
        cleanup();

        const totalTime = Math.round(performance.now() - startTime);
        resolve({
          success: false,
          testResults: [],
          passedTests: 0,
          totalTests: testCases.length,
          executionTimeMs: totalTime,
          compileError: err?.message || 'Runtime execution exception in sandbox worker',
          logs: ['[ERROR] Worker encountered an unhandled error.'],
        });
      }
    };

    worker.postMessage({ userCode, functionName, testCases });
  });
}

/**
 * Main dispatcher for challenge evaluation.
 * - JavaScript runs natively in the browser Web Worker sandbox with 2.5s watchdog timer.
 * - Python, Java, C++ check for external backend API (VITE_CODE_EXECUTION_API_URL).
 * - If backend API is not configured, returns clear, honest notification without fabricating outputs.
 */
export async function executeCodeChallenge(
  language: SupportedLanguage,
  code: string,
  functionName: string,
  testCases: TestCase[],
  options?: CodeRunnerOptions
): Promise<ExecutionResult> {
  if (language === 'javascript') {
    return runJavaScriptSandbox(code, functionName, testCases, options);
  }

  // Check if an external execution service (e.g. Piston/Judge0) is configured via env
  const backendApiUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CODE_EXECUTION_API_URL) || '';

  if (backendApiUrl) {
    try {
      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, functionName, testCases }),
        signal: options?.abortSignal,
      });

      if (!response.ok) {
        throw new Error(`Execution backend responded with HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        success: Boolean(data.success),
        testResults: data.testResults || [],
        passedTests: data.passedTests || 0,
        totalTests: testCases.length,
        executionTimeMs: data.executionTimeMs || 0,
        memoryKb: data.memoryKb,
        compileError: data.compileError,
        runtimeError: data.runtimeError,
        logs: data.logs || [],
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return {
          success: false,
          testResults: [],
          passedTests: 0,
          totalTests: testCases.length,
          executionTimeMs: 0,
          compileError: 'Execution canceled by user.',
          logs: ['[INFO] Aborted by user.'],
        };
      }
      return {
        success: false,
        testResults: [],
        passedTests: 0,
        totalTests: testCases.length,
        executionTimeMs: 0,
        compileError: `Remote execution failed: ${err.message}`,
        logs: ['[ERROR] Backend execution service unreachable.'],
      };
    }
  }

  // When no backend container is configured, return honest explanation without fabrication
  return {
    success: false,
    testResults: [],
    passedTests: 0,
    totalTests: testCases.length,
    executionTimeMs: 0,
    compileError: `Direct in-browser sandboxed execution is active for JavaScript. To execute ${language.toUpperCase()} server-side, configure VITE_CODE_EXECUTION_API_URL in your environment. You can use JavaScript to evaluate test cases, or inspect the official solution in the Editorial tab!`,
    logs: [
      `[INFO] ${language.toUpperCase()} mode is available for syntax drafting and reference.`,
      `[INFO] Switch to JavaScript to test and earn XP immediately.`,
    ],
  };
}
