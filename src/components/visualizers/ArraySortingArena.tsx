import React, { useState, useEffect, useRef } from 'react';
import { 
  generateBubbleSortSteps, 
  generateSelectionSortSteps, 
  generateInsertionSortSteps, 
  generateQuickSortSteps, 
  generateMergeSortSteps 
} from '../../algorithms/sorting/sortingAlgorithms';
import { ArrayAlgorithmStep } from '../../types/algorithm';
import { StepController } from './StepController';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

const INITIAL_DATA = [45, 18, 72, 33, 90, 12, 55, 64, 25];

export const ArraySortingArena: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'bubble' | 'selection' | 'insertion' | 'merge' | 'quick'>('bubble');
  const [numbers, setNumbers] = useState<number[]>(INITIAL_DATA);
  const [steps, setSteps] = useState<ArrayAlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(500);
  const [userSelectedIndices, setUserSelectedIndices] = useState<number[]>([]);
  const [manualMoveCount, setManualMoveCount] = useState(0);
  const [mode, setMode] = useState<'simulator' | 'play_sandbox'>('simulator');
  const timerRef = useRef<any>(null);

  // Re-generate algorithm steps when algorithm or numbers change
  useEffect(() => {
    let generated: ArrayAlgorithmStep[] = [];
    if (algorithm === 'bubble') generated = generateBubbleSortSteps(numbers);
    else if (algorithm === 'selection') generated = generateSelectionSortSteps(numbers);
    else if (algorithm === 'insertion') generated = generateInsertionSortSteps(numbers);
    else if (algorithm === 'quick') generated = generateQuickSortSteps(numbers);
    else if (algorithm === 'merge') generated = generateMergeSortSteps(numbers);

    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [algorithm, numbers]);

  // Handle auto-play loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs, steps.length]);

  const handleShuffle = () => {
    const shuffled = Array.from({ length: 9 }, () => Math.floor(Math.random() * 85) + 12);
    setNumbers(shuffled);
    setUserSelectedIndices([]);
    setManualMoveCount(0);
  };

  const currentStep = steps[currentStepIndex] || {
    stepIndex: 0,
    type: 'info',
    array: numbers.map((v, i) => ({ value: v, id: `elem-${i}` })),
    highlightIndices: [],
    explanation: 'Ready to sort.',
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
  };

  // Check if manual sandbox is sorted
  const isManuallySorted = numbers.every((v, i, arr) => i === 0 || arr[i - 1] <= v);

  const handleManualBarClick = (idx: number) => {
    if (mode !== 'play_sandbox') return;
    if (userSelectedIndices.includes(idx)) {
      setUserSelectedIndices(userSelectedIndices.filter(i => i !== idx));
      return;
    }

    const nextSelection = [...userSelectedIndices, idx];
    if (nextSelection.length === 2) {
      // Swap selected two
      const [i1, i2] = nextSelection;
      const copy = [...numbers];
      const temp = copy[i1];
      copy[i1] = copy[i2];
      copy[i2] = temp;
      setNumbers(copy);
      setUserSelectedIndices([]);
      setManualMoveCount(m => m + 1);

      // Check win condition
      if (copy.every((v, i, arr) => i === 0 || arr[i - 1] <= v)) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      setUserSelectedIndices(nextSelection);
    }
  };

  const maxVal = Math.max(...numbers, 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Algorithm Tabs & Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white/[0.04] rounded-2xl border border-white/[0.12] backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['bubble', 'selection', 'insertion', 'merge', 'quick'] as const).map((algo) => (
            <button
              key={algo}
              onClick={() => {
                setAlgorithm(algo);
                setMode('simulator');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                algorithm === algo && mode === 'simulator'
                  ? 'bg-white/[0.16] text-cyan-300 border border-cyan-400/40 shadow-glass-cyan backdrop-blur-md'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-transparent'
              }`}
            >
              {algo} Sort
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode(mode === 'simulator' ? 'play_sandbox' : 'simulator');
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border backdrop-blur-md ${
              mode === 'play_sandbox'
                ? 'bg-violet-600/90 text-white border-violet-400/50 shadow-glass-violet'
                : 'bg-white/[0.06] text-slate-300 border-white/[0.14] hover:bg-white/[0.12] shadow-glass'
            }`}
          >
            🎮 {mode === 'play_sandbox' ? 'Exit Play Mode' : 'Interactive Play Mode'}
          </button>
        </div>
      </div>

      {/* Arena Canvas */}
      <div className="relative w-full h-72 sm:h-80 bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/[0.16] p-6 flex items-end justify-center gap-3 sm:gap-4 overflow-hidden shadow-glass">
        {mode === 'play_sandbox' && (
          <div className="absolute top-4 left-6 z-10 flex items-center gap-3">
            <Badge variant="violet">Play Mode Active</Badge>
            <span className="text-xs text-slate-300">
              Click any two bars to swap them! Moves: <strong className="text-cyan-400">{manualMoveCount}</strong>
            </span>
            {isManuallySorted && (
              <Badge variant="emerald">VICTORY: Sorted in {manualMoveCount} moves!</Badge>
            )}
          </div>
        )}

        {/* Animated Bars */}
        {(mode === 'play_sandbox'
          ? numbers.map((v, i) => ({ value: v, id: `elem-${i}`, isSelected: userSelectedIndices.includes(i) }))
          : currentStep.array
        ).map((elem: any, idx: number) => {
          const heightPercent = Math.max(15, Math.round((elem.value / maxVal) * 85));

          // Determine color based on state
          let barBg = 'bg-white/[0.08] border-white/[0.18] backdrop-blur-md';
          let textColor = 'text-slate-300';

          if (elem.isSelected) {
            barBg = 'bg-gradient-to-t from-violet-600 to-fuchsia-400 border-white/50 shadow-glass-violet scale-105';
            textColor = 'text-white font-bold';
          } else if (elem.isSorted) {
            barBg = 'bg-gradient-to-t from-emerald-600 to-teal-400 border-emerald-300/50 shadow-glow-emerald';
            textColor = 'text-emerald-200';
          } else if (elem.isSwapped) {
            barBg = 'bg-gradient-to-t from-cyan-500 to-sky-300 border-cyan-200 shadow-glass-cyan scale-105';
            textColor = 'text-cyan-950 font-bold';
          } else if (elem.isCompared) {
            barBg = 'bg-gradient-to-t from-amber-500 to-yellow-300 border-amber-200 shadow-glow-amber';
            textColor = 'text-amber-950 font-bold';
          } else if (elem.isPivot) {
            barBg = 'bg-gradient-to-t from-rose-600 to-pink-500 border-rose-300 shadow-lg';
            textColor = 'text-rose-100 font-bold';
          }

          return (
            <div
              key={elem.id || idx}
              onClick={() => handleManualBarClick(idx)}
              style={{ height: `${heightPercent}%` }}
              className={`flex-1 max-w-[56px] rounded-t-2xl border-t-2 border-x-2 transition-all duration-300 flex flex-col items-center justify-between p-2 select-none group ${
                mode === 'play_sandbox' ? 'cursor-pointer hover:brightness-125' : ''
              } ${barBg}`}
            >
              <span className={`text-xs sm:text-sm font-mono font-bold ${textColor}`}>
                {elem.value}
              </span>
              <span className="text-[10px] font-mono text-slate-400/80">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span>Swapped / Written</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Sorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span>Pivot / Current</span>
        </div>
      </div>

      {/* Step Controller */}
      {mode === 'simulator' && (
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
          onShuffle={handleShuffle}
          onSpeedChange={(ms) => setSpeedMs(ms)}
          stats={currentStep.stats}
        />
      )}
    </div>
  );
};
