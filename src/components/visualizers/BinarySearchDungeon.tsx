import React, { useState, useEffect, useRef } from 'react';
import { generateBinarySearchSteps } from '../../algorithms/searching/searchingAlgorithms';
import { ArrayAlgorithmStep } from '../../types/algorithm';
import { StepController } from './StepController';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';

const DUNGEON_ROOMS = [3, 9, 14, 22, 35, 48, 59, 67, 78, 88, 95];

export const BinarySearchDungeon: React.FC = () => {
  const [rooms] = useState<number[]>(DUNGEON_ROOMS);
  const [target, setTarget] = useState<number>(59);
  const [steps, setSteps] = useState<ArrayAlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(700);

  // Dungeon interactive game mode
  const [gameMode, setGameMode] = useState<'simulator' | 'dungeon_quest'>('simulator');
  const [playerLow, setPlayerLow] = useState(0);
  const [playerHigh, setPlayerHigh] = useState(DUNGEON_ROOMS.length - 1);
  const [playerGuessedMid, setPlayerGuessedMid] = useState<number | null>(null);
  const [dungeonMessage, setDungeonMessage] = useState('Select the middle door to inspect the room!');

  useEffect(() => {
    const generated = generateBinarySearchSteps(rooms, target);
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [rooms, target]);

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
    type: 'info',
    array: rooms.map((v, i) => ({ value: v, id: `elem-${i}` })),
    highlightIndices: [],
    explanation: 'Ready to search.',
  };

  const handleDoorClick = (idx: number) => {
    if (gameMode !== 'dungeon_quest') return;
    if (idx < playerLow || idx > playerHigh) return;

    const expectedMid = Math.floor((playerLow + playerHigh) / 2);
    setPlayerGuessedMid(idx);

    if (idx !== expectedMid) {
      setDungeonMessage(`Careful! Optimal binary search chooses midpoint idx ${expectedMid} (floor((${playerLow}+${playerHigh})/2)).`);
    } else {
      const val = rooms[idx];
      if (val === target) {
        setDungeonMessage(`🎯 TARGET FOUND! Room ${idx} contains the treasure (${val})!`);
        confetti({ particleCount: 100, spread: 80 });
      } else if (val < target) {
        setDungeonMessage(`Room ${idx} has ${val} < target ${target}. The treasure is further right! Discarding rooms [${playerLow}..${idx}].`);
        setPlayerLow(idx + 1);
      } else {
        setDungeonMessage(`Room ${idx} has ${val} > target ${target}. The treasure is to the left! Discarding rooms [${idx}..${playerHigh}].`);
        setPlayerHigh(idx - 1);
      }
    }
  };

  const resetDungeonQuest = () => {
    setPlayerLow(0);
    setPlayerHigh(rooms.length - 1);
    setPlayerGuessedMid(null);
    setDungeonMessage('Select the middle door to inspect the room!');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Target Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <Badge variant="amber">Dungeon Target</Badge>
          <div className="flex items-center gap-1.5">
            {[14, 35, 59, 88, 99].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTarget(t);
                  resetDungeonQuest();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  target === t
                    ? 'bg-amber-500 text-slate-950 shadow-glow-amber'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setGameMode(gameMode === 'simulator' ? 'dungeon_quest' : 'simulator');
            resetDungeonQuest();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            gameMode === 'dungeon_quest'
              ? 'bg-violet-600 text-white border-violet-400 shadow-glow-violet'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
          }`}
        >
          🏰 {gameMode === 'dungeon_quest' ? 'Exit Dungeon Quest' : 'Enter Dungeon Quest Mode'}
        </button>
      </div>

      {/* Dungeon Rooms Grid */}
      <div className="relative w-full p-8 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        {gameMode === 'dungeon_quest' && (
          <div className="mb-6 p-3 bg-violet-950/40 border border-violet-800/60 rounded-xl text-xs text-violet-200">
            {dungeonMessage}
          </div>
        )}

        {/* Room Doors */}
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-2.5 sm:gap-3">
          {rooms.map((val, idx) => {
            let isEliminated = false;
            let isMid = false;
            let isTarget = false;
            let isLow = false;
            let isHigh = false;

            if (gameMode === 'simulator') {
              const elem = currentStep.array[idx];
              isEliminated = elem?.isEliminated || false;
              isMid = currentStep.pointers?.mid === idx;
              isTarget = elem?.isTarget || false;
              isLow = currentStep.pointers?.low === idx;
              isHigh = currentStep.pointers?.high === idx;
            } else {
              isEliminated = idx < playerLow || idx > playerHigh;
              isMid = playerGuessedMid === idx;
              isTarget = val === target && isMid;
            }

            return (
              <div
                key={idx}
                onClick={() => handleDoorClick(idx)}
                className={`relative rounded-2xl border-2 p-3 flex flex-col items-center justify-between min-h-[110px] transition-all duration-300 select-none ${
                  gameMode === 'dungeon_quest' && !isEliminated ? 'cursor-pointer hover:scale-105' : ''
                } ${
                  isTarget
                    ? 'bg-emerald-600/30 border-emerald-400 shadow-glow-emerald text-emerald-300'
                    : isMid
                    ? 'bg-amber-500/30 border-amber-400 shadow-glow-amber text-amber-300'
                    : isEliminated
                    ? 'bg-slate-900/30 border-slate-800/40 text-slate-600 opacity-40'
                    : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-slate-500'
                }`}
              >
                {/* Pointer Tag */}
                <div className="h-5 flex items-center gap-1 font-mono text-[10px] font-bold">
                  {isLow && <span className="px-1 rounded bg-blue-500/20 text-blue-400">LOW</span>}
                  {isMid && <span className="px-1 rounded bg-amber-500/30 text-amber-300">MID</span>}
                  {isHigh && <span className="px-1 rounded bg-violet-500/20 text-violet-400">HIGH</span>}
                </div>

                {/* Door Icon & Room Value */}
                <div className="text-2xl my-1">
                  {isTarget ? '🏆' : isEliminated ? '🧱' : isMid ? '🔑' : '🚪'}
                </div>

                <div className="font-mono font-bold text-sm">
                  {val}
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Room {idx}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Controller (Simulator Mode) */}
      {gameMode === 'simulator' && (
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
          stats={{ comparisons: currentStepIndex + 1 }}
        />
      )}
    </div>
  );
};
