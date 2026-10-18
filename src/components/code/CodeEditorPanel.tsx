import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle2, XCircle, Lightbulb, Terminal, Code, Sparkles, Clock, MemoryStick } from 'lucide-react';
import { CodeProblem, TestCase } from '../../types/curriculum';
import { SupportedLanguage, ExecutionResult } from '../../types/codeEditor';
import { executeCodeChallenge } from '../../services/codeRunner';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

export interface CodeEditorPanelProps {
  problem: CodeProblem;
  onSuccess?: () => void;
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({ problem, onSuccess }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState<string>(problem.starterCode.javascript);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'tests' | 'console' | 'editorial'>('tests');
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(-1);

  // When language changes, load the corresponding starter code
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || '');
    setResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    const execResult = await executeCodeChallenge(language, code, problem.functionName, problem.testCases);
    setResult(execResult);
    setIsRunning(false);

    if (execResult.success) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      onSuccess?.();
    }
  };

  const unlockNextHint = () => {
    if (unlockedHintIndex < problem.hints.length - 1) {
      setUnlockedHintIndex(unlockedHintIndex + 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full h-[650px] bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Left Column: Problem Details & Hints */}
      <div className="w-full lg:w-5/12 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 p-6 overflow-y-auto">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={problem.difficulty === 'Easy' ? 'emerald' : problem.difficulty === 'Medium' ? 'amber' : 'rose'}>
            {problem.difficulty}
          </Badge>
          <span className="text-xs text-slate-500 font-mono">ID: {problem.id}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-3 tracking-tight">
          {problem.title}
        </h3>

        <div className="prose prose-invert prose-sm text-slate-300 mb-6 leading-relaxed">
          <p>{problem.description}</p>
        </div>

        {/* Examples */}
        <div className="flex flex-col gap-3 mb-6">
          <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
            Examples:
          </h4>
          {problem.examples.map((ex, idx) => (
            <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs">
              <div className="text-slate-400">
                <strong className="text-cyan-400">Input:</strong> {ex.input}
              </div>
              <div className="text-slate-400 mt-1">
                <strong className="text-emerald-400">Output:</strong> {ex.output}
              </div>
              {ex.explanation && (
                <div className="text-slate-500 text-[11px] mt-1 font-sans">
                  {ex.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mb-6">
          <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2">
            Constraints:
          </h4>
          <ul className="list-disc list-inside text-xs font-mono text-slate-400 space-y-1">
            {problem.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Progressive Hint System */}
        <div className="mt-auto pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Progressive Hints
            </span>
            {unlockedHintIndex < problem.hints.length - 1 && (
              <button
                onClick={unlockNextHint}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                + Reveal Hint {unlockedHintIndex + 2}
              </button>
            )}
          </div>

          {unlockedHintIndex >= 0 ? (
            <div className="flex flex-col gap-2">
              {problem.hints.slice(0, unlockedHintIndex + 1).map((hint, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <strong>Hint {idx + 1}:</strong> {hint}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Stuck? Progressive hints guide your thinking without spoiling the answer.
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Code Editor & Test Results */}
      <div className="w-full lg:w-7/12 flex flex-col h-full bg-slate-950">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900/80">
          {/* Language selector */}
          <div className="flex items-center gap-1.5">
            {(['javascript', 'python', 'java', 'cpp'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  language === lang
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Python' : lang === 'java' ? 'Java' : 'C++'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              icon={<Play className="w-3.5 h-3.5 fill-current" />}
            >
              {isRunning ? 'Running...' : 'Run & Test'}
            </Button>
          </div>
        </div>

        {/* Monaco Code Editor */}
        <div className="flex-1 min-h-[280px] w-full">
          <Editor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
              fontLigatures: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 12, bottom: 12 },
              lineNumbersMinChars: 3,
            }}
          />
        </div>

        {/* Bottom Panel: Test Results / Console / Editorial */}
        <div className="h-56 border-t border-slate-800 flex flex-col bg-slate-900/60">
          <div className="flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/60 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('tests')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === 'tests'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Test Cases {result && `(${result.passedTests}/${result.totalTests})`}
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === 'console'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Console Logs
              </button>
              <button
                onClick={() => setActiveTab('editorial')}
                className={`py-2 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === 'editorial'
                    ? 'border-violet-400 text-violet-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Editorial Solution
              </button>
            </div>

            {result && (
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {result.executionTimeMs} ms
                </span>
                {result.memoryKb && (
                  <span className="flex items-center gap-1">
                    <MemoryStick className="w-3 h-3 text-slate-500" /> {result.memoryKb} KB
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'tests' && (
              <div className="flex flex-col gap-2">
                {result?.compileError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    <strong>Error:</strong> {result.compileError}
                  </div>
                )}

                {result?.testResults && result.testResults.length > 0 ? (
                  result.testResults.map((tc, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                        tc.passed
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tc.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                        <span>Case {idx + 1}: {tc.passed ? 'PASSED' : 'FAILED'}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Expected: {tc.expectedOutput} | Actual: {tc.actualOutput}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-xs text-center py-6 font-mono">
                    Click "Run & Test" to execute test cases against your solution.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'console' && (
              <div className="font-mono text-xs text-slate-300 space-y-1">
                {result?.logs && result.logs.length > 0 ? (
                  result.logs.map((log, i) => <div key={i}>{log}</div>)
                ) : (
                  <div className="text-slate-500 text-center py-6">No console output.</div>
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="flex flex-col gap-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Badge variant="cyan">Complexity</Badge>
                  <span>Time: {problem.optimalSolution.timeComplexity}</span>
                  <span>Space: {problem.optimalSolution.spaceComplexity}</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  {problem.optimalSolution.explanation}
                </p>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 overflow-x-auto">
                  {problem.optimalSolution[language] || problem.optimalSolution.javascript}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
