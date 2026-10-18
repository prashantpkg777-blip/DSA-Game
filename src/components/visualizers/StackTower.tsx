import React, { useState, useEffect } from 'react';
import { generateBalancedParenthesesSteps } from '../../algorithms/stacks/stackAlgorithms';
import { StackQueueStep } from '../../types/algorithm';
import { StepController } from './StepController';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

export const StackTower: React.FC = () => {
  const [expression, setExpression] = useState('{[()]}');
  const [steps, setSteps] = useState<StackQueueStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(800);

  // Manual interactive stack state
  const [manualStack, setManualStack] = useState<string[]>(['10', '25', '42']);
  const [mode, setMode] = useState<'parentheses_simulator' | 'interactive_tower'>('parentheses_simulator');

  useEffect(() => {
    if (mode === 'parentheses_simulator') {
      const generated = generateBalancedParenthesesSteps(expression);
      setSteps(generated);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  }, [expression, mode]);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            confetti({ particleCount: 50, spread: 60 });
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speedMs, steps.length]);

  const currentStep = steps[currentStepIndex] || {
    stepIndex: 0,
    elements: [],
    operation: 'idle',
    explanation: 'Ready to evaluate.',
  };

  const handleManualPush = () => {
    if (manualStack.length >= 6) return;
    const val = (Math.floor(Math.random() * 90) + 10).toString();
    setManualStack([...manualStack, val]);
  };

  const handleManualPop = () => {
    if (manualStack.length === 0) return;
    setManualStack(manualStack.slice(0, manualStack.length - 1));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mode and Expressions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'parentheses_simulator' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMode('parentheses_simulator')}
          >
            Bracket Match Simulator
          </Button>
          <Button
            variant={mode === 'interactive_tower' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMode('interactive_tower')}
          >
            Interactive Push/Pop Tower
          </Button>
        </div>

        {mode === 'parentheses_simulator' && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono">Sample:</span>
            {['{[()]}', '()[]{}', '([)]', '{[(])}'].map((ex) => (
              <button
                key={ex}
                onClick={() => setExpression(ex)}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  expression === ex ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        {mode === 'interactive_tower' && (
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleManualPush} disabled={manualStack.length >= 6}>
              + Push
            </Button>
            <Button variant="danger" size="sm" onClick={handleManualPop} disabled={manualStack.length === 0}>
              - Pop
            </Button>
          </div>
        )}
      </div>

      {/* Stack Tower Visual Canvas */}
      <div className="relative w-full min-h-[300px] bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-end overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        {/* Stack Cylinder / Frame */}
        <div className="relative w-64 min-h-[220px] border-b-4 border-x-4 border-slate-700/80 rounded-b-2xl bg-slate-900/40 p-2 flex flex-col-reverse items-center gap-2">
          {mode === 'parentheses_simulator' ? (
            currentStep.elements.length === 0 ? (
              <div className="text-slate-600 font-mono text-xs my-auto select-none">
                Stack Empty
              </div>
            ) : (
              currentStep.elements.map((elem, idx) => (
                <div
                  key={elem.id || idx}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 border border-violet-400/50 text-white font-mono font-bold text-center shadow-lg shadow-violet-950/50 animate-float"
                >
                  {elem.value}
                  {idx === currentStep.elements.length - 1 && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-sans">
                      TOP
                    </span>
                  )}
                </div>
              ))
            )
          ) : (
            manualStack.length === 0 ? (
              <div className="text-slate-600 font-mono text-xs my-auto select-none">
                Tower Empty
              </div>
            ) : (
              manualStack.map((val, idx) => (
                <div
                  key={idx}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400/50 text-white font-mono font-bold text-center shadow-lg shadow-cyan-950/50"
                >
                  {val}
                  {idx === manualStack.length - 1 && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-sans">
                      TOP
                    </span>
                  )}
                </div>
              ))
            )
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-400 mt-3">
          LIFO (Last-In First-Out) Base Platform
        </div>
      </div>

      {/* Step Controller for parentheses simulator */}
      {mode === 'parentheses_simulator' && (
        <StepController
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          isPlaying={isPlaying}
          speedMs={speedMs}
          explanation={currentStep.explanation}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
          onPrev={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          onReset={() => {
            setIsPlaying(false);
            setCurrentStepIndex(0);
          }}
          onSpeedChange={(ms) => setSpeedMs(ms)}
        />
      )}
    </div>
  );
};
