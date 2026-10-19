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

  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const handleApplyCustomArray = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);
    if (!customInput.trim()) return;

    const parts = customInput.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length < 4 || parts.length > 12) {
      setInputError('Please provide between 4 and 12 numbers.');
      return;
    }

    const parsedNums: number[] = [];
    for (const p of parts) {
      const n = parseInt(p, 10);
      if (isNaN(n) || n < 1 || n > 99) {
        setInputError(`"${p}" is invalid. Please enter numbers between 1 and 99.`);
        return;
      }
      parsedNums.push(n);
    }

    setNumbers(parsedNums);
    setUserSelectedIndices([]);
    setManualMoveCount(0);
    setCustomInput('');
  };

  const maxVal = Math.max(...numbers, 100);

  return (
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Algorithm Tabs & Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['bubble', 'selection', 'insertion', 'merge', 'quick'] as const).map((algo) => (
            <button
              key={algo}
              onClick={() => {
                setAlgorithm(algo);
                setMode('simulator');
              }}
              className={`px-3 py-1.5 uppercase font-mono text-xs font-black transition-all border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[2px_2px_0px_#111111] ${
                algorithm === algo && mode === 'simulator'
                  ? 'bg-[#C6FF00] text-[#111111]'
                  : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
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
            className={`px-3.5 py-1.5 uppercase font-mono text-xs font-black transition-all border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[3px_3px_0px_#111111] ${
              mode === 'play_sandbox'
                ? 'bg-[#304FFE] text-white'
                : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
            }`}
          >
            🎮 {mode === 'play_sandbox' ? 'Exit Play Mode' : 'Interactive Play Mode'}
          </button>
        </div>
      </div>

      {/* Custom Array Input Form */}
      <form onSubmit={handleApplyCustomArray} className="flex flex-wrap items-center gap-2 p-3 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
        <span className="font-mono font-black text-xs uppercase flex items-center gap-1.5">
          <span>⚡ CUSTOM ARRAY:</span>
        </span>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="e.g. 34, 12, 89, 45, 23, 67"
          className="flex-1 min-w-[200px] px-3 py-1.5 bg-[#F5F0E8] dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8] font-mono text-xs border-2 border-[#111111] dark:border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
        />
        <Button type="submit" size="sm" variant="primary">
          Set Array
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={handleShuffle}>
          🎲 Randomize
        </Button>
        {inputError && (
          <span className="w-full text-xs font-mono font-bold text-[#FF2DAA]">
            ⚠️ {inputError}
          </span>
        )}
      </form>

      {/* Arena Canvas */}
      <div className="relative w-full h-72 sm:h-80 bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] p-6 flex items-end justify-center gap-2 sm:gap-3 overflow-hidden shadow-[6px_6px_0px_#111111]">
        {mode === 'play_sandbox' && (
          <div className="absolute top-4 left-6 z-10 flex items-center gap-3">
            <Badge variant="pink" size="sm">PLAY MODE</Badge>
            <span className="text-xs font-mono font-bold">
              Click two bars to swap! Moves: <strong className="text-[#304FFE] dark:text-[#C6FF00]">{manualMoveCount}</strong>
            </span>
            {isManuallySorted && (
              <Badge variant="lime" size="sm">VICTORY: Sorted in {manualMoveCount} moves!</Badge>
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
          let barBg = 'bg-[#F5F0E8] dark:bg-[#222222] border-2 border-[#111111] dark:border-[#F5F0E8]';
          let textColor = 'text-[#111111] dark:text-[#F5F0E8]';

          if (elem.isSelected) {
            barBg = 'bg-[#FF2DAA] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] scale-105';
            textColor = 'text-white font-black';
          } else if (elem.isSorted) {
            barBg = 'bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]';
            textColor = 'text-[#111111] font-black';
          } else if (elem.isSwapped) {
            barBg = 'bg-[#304FFE] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] scale-105';
            textColor = 'text-white font-black';
          } else if (elem.isCompared) {
            barBg = 'bg-[#FFF200] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]';
            textColor = 'text-[#111111] font-black';
          } else if (elem.isPivot) {
            barBg = 'bg-[#FF5C00] text-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111]';
            textColor = 'text-white font-black';
          }

          return (
            <div
              key={elem.id || idx}
              onClick={() => handleManualBarClick(idx)}
              style={{ height: `${heightPercent}%` }}
              className={`flex-1 max-w-[56px] transition-all duration-300 flex flex-col items-center justify-between p-2 select-none group shadow-[2px_2px_0px_#111111] ${
                mode === 'play_sandbox' ? 'cursor-pointer hover:scale-105' : ''
              } ${barBg}`}
            >
              <span className={`text-xs sm:text-sm font-mono font-black ${textColor}`}>
                {elem.value}
              </span>
              <span className="text-[10px] font-mono font-bold opacity-70">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold text-[#111111] dark:text-[#F5F0E8]">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 border border-[#111111] bg-[#FFF200]" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 border border-[#111111] bg-[#304FFE]" />
          <span>Swapped / Written</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 border border-[#111111] bg-[#C6FF00]" />
          <span>Sorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 border border-[#111111] bg-[#FF5C00]" />
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
