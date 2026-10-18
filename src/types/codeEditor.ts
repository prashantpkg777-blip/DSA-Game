export type SupportedLanguage = 'javascript' | 'python' | 'java' | 'cpp';

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTimeMs?: number;
  error?: string;
  isHidden?: boolean;
}

export interface ExecutionResult {
  success: boolean;
  testResults: TestCaseResult[];
  passedTests: number;
  totalTests: number;
  executionTimeMs: number;
  memoryKb?: number;
  compileError?: string;
  runtimeError?: string;
  logs: string[];
}
