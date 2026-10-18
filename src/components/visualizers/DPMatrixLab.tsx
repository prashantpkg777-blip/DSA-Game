import React, { useState, useEffect } from 'react';
import { generateKnapsackSteps } from '../../algorithms/dynamicProgramming/dpAlgorithms';
import { DPStep } from '../../types/algorithm';
import { StepController } from './StepController';
import { Badge } from '../ui/Badge';

export const DPMatrixLab: React.FC = () => {
  const weights = [2, 3, 4];
  const values = [3, 4, 5];
  const capacity = 5;

  const [steps, setSteps] = useState<DPStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(900);

  useEffect(() => {
    const generated = generateKnapsackSteps(weights, values, capacity);
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
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
    table: [],
    rowHeaders: [],
    colHeaders: [],
    currentState: { i: 0, j: 0 },
    dependencies: [],
    transitionFormula: '',
    explanation: 'DP Matrix initialized.',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner with Transition Formula */}
      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <Badge variant="violet" className="mb-1">0/1 Knapsack Table</Badge>
          <div className="text-xs text-slate-400 font-mono">
            Weights: [2, 3, 4] | Values: [3, 4, 5] | Knapsack Capacity: 5
          </div>
        </div>
        <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-cyan-300">
          {currentStep.transitionFormula}
        </div>
      </div>

      {/* DP Table */}
      <div className="relative w-full bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-x-auto shadow-2xl">
        <table className="w-full text-center border-collapse font-mono text-xs">
          <thead>
            <tr>
              <th className="p-2.5 text-slate-500 border-b border-slate-800">Items \ Cap</th>
              {currentStep.colHeaders?.map((col, idx) => (
                <th key={idx} className="p-2.5 text-slate-300 font-bold border-b border-slate-800">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentStep.table.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-slate-900/80">
                <td className="p-2.5 text-left text-slate-400 font-medium whitespace-nowrap border-r border-slate-800/80">
                  {currentStep.rowHeaders?.[rIdx]}
                </td>
                {row.map((cell, cIdx) => {
                  let cellBg = 'bg-slate-900/40 text-slate-500';

                  if (cell.isCurrent) {
                    cellBg = 'bg-cyan-500 text-slate-950 font-bold scale-110 shadow-glow-cyan z-10';
                  } else if (cell.isDependency) {
                    cellBg = 'bg-amber-500/30 text-amber-300 border border-amber-400/80 shadow-glow-amber';
                  } else if (cell.isComputed) {
                    cellBg = 'bg-slate-800/70 text-slate-200';
                  }

                  return (
                    <td key={cIdx} className="p-1">
                      <div className={`py-2 px-3 rounded-xl transition-all duration-300 ${cellBg}`}>
                        {cell.val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step Controller */}
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
    </div>
  );
};
