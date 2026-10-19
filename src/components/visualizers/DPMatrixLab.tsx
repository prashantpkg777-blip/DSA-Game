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
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Top Banner with Transition Formula */}
      <div className="p-4 bg-white dark:bg-[#181818] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <Badge variant="pink" size="sm" className="mb-1">0/1 KNAPSACK MATRIX</Badge>
          <div className="text-xs font-mono font-bold opacity-80">
            WEIGHTS: [2, 3, 4] | VALUES: [3, 4, 5] | CAPACITY: 5
          </div>
        </div>
        <div className="text-xs font-mono font-black bg-[#C6FF00] text-[#111111] px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
          {currentStep.transitionFormula || 'dp[i][w] = optimal'}
        </div>
      </div>

      {/* DP Table */}
      <div className="relative w-full bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[6px_6px_0px_#111111] p-4 sm:p-6 overflow-x-auto">
        <table className="w-full text-center border-collapse font-mono text-xs">
          <thead>
            <tr>
              <th className="p-2.5 font-black uppercase border-b-2 border-[#111111] dark:border-[#333]">ITEM \ CAP</th>
              {currentStep.colHeaders?.map((col, idx) => (
                <th key={idx} className="p-2.5 font-black border-b-2 border-[#111111] dark:border-[#333]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentStep.table.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-[#111111]/20 dark:border-[#333]">
                <td className="p-2.5 text-left font-black border-r-2 border-[#111111] dark:border-[#333]">
                  {currentStep.rowHeaders?.[rIdx]}
                </td>
                {row.map((cell, cIdx) => {
                  let cellBg = 'bg-[#f0ebe3] dark:bg-[#222222] opacity-40';

                  if (cell.isCurrent) {
                    cellBg = 'bg-[#C6FF00] text-[#111111] font-black border-2 border-[#111111] scale-105 shadow-[2px_2px_0px_#111111] z-10';
                  } else if (cell.isDependency) {
                    cellBg = 'bg-[#FFF200] text-[#111111] font-black border-2 border-[#111111] shadow-[2px_2px_0px_#111111]';
                  } else if (cell.isComputed) {
                    cellBg = 'bg-[#e4ded5] dark:bg-[#2a2a2a] text-inherit font-bold border border-[#111111]/30 dark:border-[#444]';
                  }

                  return (
                    <td key={cIdx} className="p-1">
                      <div className={`py-2 px-3 transition-all duration-200 select-none ${cellBg}`}>
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

export default DPMatrixLab;
