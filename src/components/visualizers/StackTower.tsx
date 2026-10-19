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
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Mode and Expressions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
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
            <span className="font-mono font-bold opacity-70">Sample:</span>
            {['{[()]}', '()[]{}', '([)]', '{[(])}'].map((ex) => (
              <button
                key={ex}
                onClick={() => setExpression(ex)}
                className={`px-2 py-0.5 rounded font-mono font-bold border-2 border-[#111111] dark:border-[#F5F0E8] transition-all shadow-[2px_2px_0px_#111111] ${
                  expression === ex ? 'bg-[#C6FF00] text-[#111111]' : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
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
      <div className="relative w-full min-h-[300px] bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] p-8 flex flex-col items-center justify-end overflow-hidden shadow-[6px_6px_0px_#111111]">
        {/* Stack Cylinder / Frame */}
        <div className="relative w-64 min-h-[220px] border-b-4 border-x-4 border-[#111111] dark:border-[#F5F0E8] bg-[#F5F0E8] dark:bg-[#222222]/60 p-2 flex flex-col-reverse items-center gap-2 shadow-[4px_4px_0px_#111111]">
          {mode === 'parentheses_simulator' ? (
            currentStep.elements.length === 0 ? (
              <div className="font-mono font-bold text-xs my-auto select-none opacity-50">
                Stack Empty
              </div>
            ) : (
              currentStep.elements.map((elem, idx) => (
                <div
                  key={elem.id || idx}
                  className="w-full py-2.5 px-4 bg-[#304FFE] text-white border-2 border-[#111111] font-mono font-black text-center shadow-[3px_3px_0px_#111111] animate-float"
                >
                  {elem.value}
                  {idx === currentStep.elements.length - 1 && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-[#C6FF00] text-[#111111] font-sans font-black border border-[#111111]">
                      TOP
                    </span>
                  )}
                </div>
              ))
            )
          ) : (
            manualStack.length === 0 ? (
              <div className="font-mono font-bold text-xs my-auto select-none opacity-50">
                Tower Empty
              </div>
            ) : (
              manualStack.map((val, idx) => (
                <div
                  key={idx}
                  className="w-full py-2.5 px-4 bg-[#FF2DAA] text-white border-2 border-[#111111] font-mono font-black text-center shadow-[3px_3px_0px_#111111]"
                >
                  {val}
                  {idx === manualStack.length - 1 && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-[#FFF200] text-[#111111] font-sans font-black border border-[#111111]">
                      TOP
                    </span>
                  )}
                </div>
              ))
            )
          )}
        </div>

        <div className="text-[11px] font-mono font-bold opacity-70 mt-3">
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
