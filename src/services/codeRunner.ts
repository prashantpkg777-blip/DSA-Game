import { ExecutionResult, SupportedLanguage, TestCaseResult } from '../types/codeEditor';
import { TestCase } from '../types/curriculum';

export function runJavaScriptSandbox(
  userCode: string,
  functionName: string,
  testCases: TestCase[],
  timeoutMs: number = 2500
): Promise<ExecutionResult> {
  const startTime = performance.now();

  // 1. Browser Environment with Web Worker for hard Timeout / Infinite Loop Protection
  if (typeof window !== 'undefined' && typeof Worker !== 'undefined' && typeof Blob !== 'undefined') {
    return new Promise((resolve) => {
      const workerScript = `
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
            const sandboxFn = new Function('console', \`
              "use strict";
              \${userCode}
              if (typeof \${functionName} !== 'function') {
                throw new Error('Function "\${functionName}" is not defined.');
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
                // Keep raw string
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
      } catch {
        // Fallback to synchronous execution if CSP blocks blob workers
        return resolve(runSyncFallback(userCode, functionName, testCases, startTime));
      }

      let hasResolved = false;

      const timer = setTimeout(() => {
        if (!hasResolved) {
          hasResolved = true;
          worker.terminate();
          URL.revokeObjectURL(blobUrl);
          const totalTime = Math.round(performance.now() - startTime);

          resolve({
            success: false,
            testResults: [],
            passedTests: 0,
            totalTests: testCases.length,
            executionTimeMs: totalTime,
            compileError: 'Time Limit Exceeded (TLE) — Potential infinite loop or operation exceeded 2.5s.',
            logs: ['[ERROR] Execution halted: process took longer than 2500ms limit.'],
          });
        }
      }, timeoutMs);

      worker.onmessage = (e) => {
        if (!hasResolved) {
          hasResolved = true;
          clearTimeout(timer);
          worker.terminate();
          URL.revokeObjectURL(blobUrl);

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
          });
        }
      };

      worker.onerror = (err) => {
        if (!hasResolved) {
          hasResolved = true;
          clearTimeout(timer);
          worker.terminate();
          URL.revokeObjectURL(blobUrl);

          const totalTime = Math.round(performance.now() - startTime);
          resolve({
            success: false,
            testResults: [],
            passedTests: 0,
            totalTests: testCases.length,
            executionTimeMs: totalTime,
            compileError: err?.message || 'Worker runtime error',
            logs: ['[ERROR] Worker failed to execute code.'],
          });
        }
      };

      worker.postMessage({ userCode, functionName, testCases });
    });
  }

  // 2. Fallback for SSR and environments without Web Workers
  return Promise.resolve(runSyncFallback(userCode, functionName, testCases, startTime));
}

function runSyncFallback(
  userCode: string,
  functionName: string,
  testCases: TestCase[],
  startTime: number
): ExecutionResult {
  const logs: string[] = [];
  const testResults: TestCaseResult[] = [];

  try {
    const customConsole = {
      log: (...args: any[]) => logs.push(args.map(a => (typeof a === 'object' && a !== null) ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
      warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' ')),
    };

    const sandboxFn = new Function(
      'console',
      `
      "use strict";
      ${userCode}
      if (typeof ${functionName} !== 'function') {
        throw new Error('Function "${functionName}" is not defined.');
      }
      return ${functionName};
      `
    );

    const targetFn = sandboxFn(customConsole);
    let passedCount = 0;

    for (const tc of testCases) {
      const caseStart = performance.now();
      let parsedArgs: any[];
      try {
        parsedArgs = JSON.parse(`[${tc.input}]`);
      } catch {
        parsedArgs = [new Function(`return (${tc.input})`)()];
      }

      const actual = targetFn(...parsedArgs);
      const caseDuration = Math.round((performance.now() - caseStart) * 100) / 100;
      const normalizedActual = JSON.stringify(actual);

      let normalizedExpected = tc.expectedOutput.trim();
      try {
        normalizedExpected = JSON.stringify(JSON.parse(tc.expectedOutput));
      } catch {
        // Raw string
      }

      const passed = normalizedActual === normalizedExpected || String(actual) === tc.expectedOutput;
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

    const totalTime = Math.round(performance.now() - startTime);

    return {
      success: passedCount === testCases.length,
      testResults,
      passedTests: passedCount,
      totalTests: testCases.length,
      executionTimeMs: totalTime,
      logs,
    };
  } catch (err: any) {
    const totalTime = Math.round(performance.now() - startTime);
    return {
      success: false,
      testResults: [],
      passedTests: 0,
      totalTests: testCases.length,
      executionTimeMs: totalTime,
      compileError: err?.message || 'Compilation failed',
      logs,
    };
  }
}

export async function executeCodeChallenge(
  language: SupportedLanguage,
  code: string,
  functionName: string,
  testCases: TestCase[]
): Promise<ExecutionResult> {
  if (language === 'javascript') {
    return runJavaScriptSandbox(code, functionName, testCases);
  }

  // Non-JavaScript languages in frontend-only environment
  return {
    success: false,
    testResults: [],
    passedTests: 0,
    totalTests: testCases.length,
    executionTimeMs: 0,
    compileError: `Direct in-browser sandboxed execution with test benchmarking is active for JavaScript. To run ${language.toUpperCase()} server-side, a containerized sandbox is required. Switch to JavaScript mode to evaluate test cases!`,
    logs: [`[INFO] ${language.toUpperCase()} mode is available for reference and syntax practice.`],
  };
}
