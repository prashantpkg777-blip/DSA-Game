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
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Header & Target Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
        <div className="flex items-center gap-3">
          <Badge variant="yellow" size="sm">DUNGEON TARGET</Badge>
          <div className="flex items-center gap-1.5">
            {[14, 35, 59, 88, 99].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTarget(t);
                  resetDungeonQuest();
                }}
                className={`px-2.5 py-1 text-xs font-mono font-black border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[2px_2px_0px_#111111] transition-all ${
                  target === t
                    ? 'bg-[#FFF200] text-[#111111]'
                    : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
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
          className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[3px_3px_0px_#111111] transition-all ${
            gameMode === 'dungeon_quest'
              ? 'bg-[#304FFE] text-white'
              : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
          }`}
        >
          🏰 {gameMode === 'dungeon_quest' ? 'Exit Dungeon Quest' : 'Enter Dungeon Quest Mode'}
        </button>
      </div>

      {/* Dungeon Rooms Grid */}
      <div className="relative w-full p-6 sm:p-8 bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] overflow-hidden shadow-[6px_6px_0px_#111111]">
        {gameMode === 'dungeon_quest' && (
          <div className="mb-6 p-3 bg-[#B9A0FF]/20 border-2 border-[#111111] dark:border-[#B9A0FF] text-xs font-mono font-bold shadow-[2px_2px_0px_#111111]">
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
                className={`relative border-2 border-[#111111] dark:border-[#F5F0E8] p-3 flex flex-col items-center justify-between min-h-[110px] transition-all duration-200 select-none ${
                  gameMode === 'dungeon_quest' && !isEliminated ? 'cursor-pointer hover:scale-105' : ''
                } ${
                  isTarget
                    ? 'bg-[#C6FF00] text-[#111111] shadow-[3px_3px_0px_#111111]'
                    : isMid
                    ? 'bg-[#FFF200] text-[#111111] shadow-[3px_3px_0px_#111111]'
                    : isEliminated
                    ? 'bg-slate-200 dark:bg-[#1a1a1a] opacity-30 shadow-none'
                    : 'bg-[#F5F0E8] dark:bg-[#222222] shadow-[2px_2px_0px_#111111]'
                }`}
              >
                {/* Pointer Tag */}
                <div className="h-5 flex items-center gap-1 font-mono text-[9px] font-black uppercase">
                  {isLow && <span className="px-1 border border-[#111111] bg-[#304FFE] text-white">LOW</span>}
                  {isMid && <span className="px-1 border border-[#111111] bg-[#FF5C00] text-white">MID</span>}
                  {isHigh && <span className="px-1 border border-[#111111] bg-[#FF2DAA] text-white">HIGH</span>}
                </div>

                {/* Door Icon & Room Value */}
                <div className="text-2xl my-1">
                  {isTarget ? '🏆' : isEliminated ? '🧱' : isMid ? '🔑' : '🚪'}
                </div>

                <div className="font-mono font-black text-sm">
                  {val}
                </div>

                <div className="text-[10px] opacity-60 font-mono font-bold">
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
