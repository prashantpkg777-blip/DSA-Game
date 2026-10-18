import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle2, XCircle, Lightbulb, Terminal, Clock, Zap } from 'lucide-react';
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

  const difficultyTag = problem.difficulty === 'Easy' ? 'WARM-UP' : problem.difficulty === 'Medium' ? 'CHAOS MODE' : 'BOSS FIGHT';
  const difficultyVariant = problem.difficulty === 'Easy' ? 'lime' : problem.difficulty === 'Medium' ? 'orange' : 'pink';

  return (
    <div className="flex flex-col lg:flex-row gap-0 w-full h-[680px] bg-[#111111] text-[#F5F0E8] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#C6FF00] overflow-hidden">
      {/* Left Column: Problem Details & Hints */}
      <div className="w-full lg:w-5/12 flex flex-col border-b-2 lg:border-b-0 lg:border-r-3 border-[#111111] dark:border-[#333] bg-[#1a1a1a] p-6 overflow-y-auto">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={difficultyVariant} size="sm" tilt>
            {difficultyTag}
          </Badge>
          <span className="text-xs font-mono font-bold text-[#FF5C00]">ID: {problem.id}</span>
        </div>

        <h3 className="text-2xl font-display font-black uppercase text-[#F5F0E8] mb-3 tracking-tight">
          {problem.title}
        </h3>

        <div className="prose prose-invert prose-sm text-[#F5F0E8] opacity-90 mb-6 font-sans leading-relaxed">
          <p>{problem.description}</p>
        </div>

        {/* Examples */}
        <div className="flex flex-col gap-3 mb-6">
          <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#C6FF00]">
            EXAMPLES:
          </h4>
          {problem.examples.map((ex, idx) => (
            <div key={idx} className="p-3 bg-[#111111] border-2 border-[#333] font-mono text-xs">
              <div className="text-[#F5F0E8]">
                <strong className="text-[#C6FF00]">Input:</strong> {ex.input}
              </div>
              <div className="text-[#F5F0E8] mt-1">
                <strong className="text-[#FF2DAA]">Output:</strong> {ex.output}
              </div>
              {ex.explanation && (
                <div className="text-[#F5F0E8] opacity-75 text-[11px] mt-1 font-sans">
                  {ex.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mb-6">
          <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#FFF200] mb-2">
            CONSTRAINTS:
          </h4>
          <ul className="list-disc list-inside text-xs font-mono opacity-80 space-y-1">
            {problem.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Progressive Hint System */}
        <div className="mt-auto pt-4 border-t-2 border-[#333]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-[#FFF200] flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-[#FFF200]" /> PROGRESSIVE HINTS
            </span>
            {unlockedHintIndex < problem.hints.length - 1 && (
              <button
                onClick={unlockNextHint}
                className="text-xs font-display font-bold text-[#C6FF00] hover:underline"
              >
                + REVEAL HINT {unlockedHintIndex + 2}
              </button>
            )}
          </div>

          {unlockedHintIndex >= 0 ? (
            <div className="flex flex-col gap-2">
              {problem.hints.slice(0, unlockedHintIndex + 1).map((hint, idx) => (
                <div key={idx} className="p-2.5 bg-[#FFF200] text-[#111111] border-2 border-[#111111] text-xs font-mono font-bold">
                  <strong>HINT {idx + 1}:</strong> {hint}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono opacity-60 italic">
              Stuck? Progressive hints guide your thinking without spoiling the answer.
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Code Editor & Test Results */}
      <div className="w-full lg:w-7/12 flex flex-col h-full bg-[#111111]">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between p-3 border-b-2 border-[#333] bg-[#181818]">
          {/* Language selector */}
          <div className="flex items-center gap-1.5">
            {(['javascript', 'python', 'java', 'cpp'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 text-xs font-display font-black uppercase transition-all border-2 ${
                  language === lang
                    ? 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]'
                    : 'bg-[#222222] text-[#F5F0E8] border-transparent hover:border-[#F5F0E8]'
                }`}
              >
                {lang === 'javascript' ? 'JS' : lang === 'python' ? 'PYTHON' : lang === 'java' ? 'JAVA' : 'C++'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="lime"
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              icon={<Play className="w-3.5 h-3.5 fill-current" />}
            >
              {isRunning ? 'EXECUTING...' : 'RUN CODE ⚡'}
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
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
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
        <div className="h-60 border-t-2 border-[#333] flex flex-col bg-[#141414]">
          <div className="flex items-center justify-between px-4 border-b-2 border-[#333] bg-[#181818] text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('tests')}
                className={`py-2 px-3 font-display font-black uppercase transition-all ${
                  activeTab === 'tests'
                    ? 'border-b-2 border-[#C6FF00] text-[#C6FF00]'
                    : 'text-[#F5F0E8] opacity-60 hover:opacity-100'
                }`}
              >
                TEST CASES {result && `(${result.passedTests}/${result.totalTests})`}
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`py-2 px-3 font-display font-black uppercase transition-all ${
                  activeTab === 'console'
                    ? 'border-b-2 border-[#FF2DAA] text-[#FF2DAA]'
                    : 'text-[#F5F0E8] opacity-60 hover:opacity-100'
                }`}
              >
                CONSOLE LOGS
              </button>
              <button
                onClick={() => setActiveTab('editorial')}
                className={`py-2 px-3 font-display font-black uppercase transition-all ${
                  activeTab === 'editorial'
                    ? 'border-b-2 border-[#FFF200] text-[#FFF200]'
                    : 'text-[#F5F0E8] opacity-60 hover:opacity-100'
                }`}
              >
                EDITORIAL / HINTS
              </button>
            </div>

            {result && (
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3 text-[#FF5C00]" /> {result.executionTimeMs.toFixed(1)}ms
                </span>
                <span className={`font-bold ${result.success ? 'text-[#C6FF00]' : 'text-[#FF2DAA]'}`}>
                  {result.success ? 'ALL TESTS PASSED' : 'TESTS FAILED'}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
            {activeTab === 'tests' && (
              <div className="flex flex-col gap-2">
                {result ? (
                  result.testResults.map((tRes, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 border-2 flex items-center justify-between ${
                        tRes.passed
                          ? 'bg-[#C6FF00]/10 border-[#C6FF00] text-[#C6FF00]'
                          : 'bg-[#FF2DAA]/10 border-[#FF2DAA] text-[#FF2DAA]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tRes.passed ? <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" /> : <XCircle className="w-4 h-4 text-[#FF2DAA]" />}
                        <span>Case {idx + 1}: Expected {JSON.stringify(tRes.expected)}</span>
                      </div>
                      <span>Actual: {JSON.stringify(tRes.actual)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center opacity-60 py-6">
                    Run your solution to evaluate against all test cases.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'console' && (
              <div className="text-[#F5F0E8] font-mono text-xs">
                {result?.logs && result.logs.length > 0 ? (
                  result.logs.map((log, i) => <div key={i}>{log}</div>)
                ) : (
                  <span className="opacity-50">No console output.</span>
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="prose prose-invert prose-xs text-[#F5F0E8] opacity-90">
                <p className="font-bold text-[#FFF200]">Time Complexity Target: {problem.timeComplexity}</p>
                <p className="font-bold text-[#FF2DAA]">Space Complexity Target: {problem.spaceComplexity}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPanel;
