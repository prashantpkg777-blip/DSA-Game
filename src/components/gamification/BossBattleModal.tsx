import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, ShieldAlert, Trophy, X, CheckCircle2, ArrowRight, Mic, Square } from 'lucide-react';
import { BossBattle } from '../../types/curriculum';
import { useUserStore } from '../../stores/userStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { CodeEditorPanel } from '../code/CodeEditorPanel';
import { audioService } from '../../services/audioService';
import confetti from 'canvas-confetti';

export interface BossBattleModalProps {
  boss: BossBattle;
  isOpen: boolean;
  onClose: () => void;
}

export const BossBattleModal: React.FC<BossBattleModalProps> = ({ boss, isOpen, onClose }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [bossHealth, setBossHealth] = useState(boss.health);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isStageSolved, setIsStageSolved] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [isSpeakingTaunt, setIsSpeakingTaunt] = useState(false);

  const { defeatBoss, defeatedBosses, soundEnabled, voiceEnabled, speechRate } = useUserStore();
  const isAlreadyDefeated = defeatedBosses.includes(boss.id);

  useEffect(() => {
    if (isOpen) {
      setCurrentStageIdx(0);
      setBossHealth(boss.health);
      setSelectedOptionId(null);
      setIsStageSolved(false);
      setIsVictory(false);
      setIsSpeakingTaunt(false);
      audioService.playBossRoar(soundEnabled);
    }
    return () => {
      audioService.stop();
    };
  }, [isOpen, boss.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        audioService.stop();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStage = boss.stages[currentStageIdx];
  const healthPercent = Math.max(0, Math.round((bossHealth / boss.health) * 100));

  const handleVoiceBossTaunt = () => {
    if (isSpeakingTaunt) {
      audioService.stop();
      setIsSpeakingTaunt(false);
    } else {
      setIsSpeakingTaunt(true);
      const script = `I am ${boss.name}, ${boss.title}! You dare enter my realm? Prepare yourself for Stage ${currentStage.stageNumber}: ${currentStage.title}!`;
      audioService.speak(script, {
        voiceEnabled: true,
        rate: Math.max(0.85, speechRate * 0.9),
        pitch: 0.8,
        onEnd: () => setIsSpeakingTaunt(false),
      });
    }
  };

  const handleConceptAnswer = (optionId: string) => {
    setSelectedOptionId(optionId);
    const option = currentStage.question?.options.find((o) => o.id === optionId);

    if (option?.isCorrect) {
      audioService.playSwap(soundEnabled);
      setIsStageSolved(true);
      const damage = Math.round(boss.health / boss.stages.length);
      setBossHealth((h) => Math.max(0, h - damage));
    } else {
      audioService.playError(soundEnabled);
    }
  };

  const handleNextStage = () => {
    audioService.playClick(soundEnabled);
    if (currentStageIdx < boss.stages.length - 1) {
      setCurrentStageIdx((s) => s + 1);
      setSelectedOptionId(null);
      setIsStageSolved(false);
    } else {
      setBossHealth(0);
      setIsVictory(true);
      defeatBoss(boss.id, boss.xpReward);
      audioService.playLevelUp(soundEnabled);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
  };

  const handleCodingSuccess = () => {
    audioService.playSuccess(soundEnabled);
    setIsStageSolved(true);
    const damage = Math.round(boss.health / boss.stages.length);
    setBossHealth((h) => Math.max(0, h - damage));
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
        onClick={() => {
          audioService.stop();
          onClose();
        }}
      >
        <motion.div 
          initial={{ scale: 0.96, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 16 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#F5F0E8] dark:bg-[#181818] border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[12px_12px_0px_#111111] dark:shadow-[12px_12px_0px_#FF2DAA] flex flex-col text-[#111111] dark:text-[#F5F0E8] overflow-hidden"
        >
          {/* Boss Header */}
          <div className="p-5 sm:p-6 bg-[#FF2DAA] text-[#111111] border-b-3 border-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl p-2 bg-[#111111] text-[#C6FF00] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] -rotate-3">
                {boss.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#111111] text-[#FFF200] font-display font-black text-xs uppercase">
                    BOSS BATTLE
                  </span>
                  {isAlreadyDefeated && (
                    <span className="px-2 py-0.5 bg-[#C6FF00] text-[#111111] font-display font-black text-xs uppercase">
                      DEFEATED
                    </span>
                  )}
                  <button
                    onClick={handleVoiceBossTaunt}
                    className="px-2 py-0.5 bg-[#FFF200] text-[#111111] border border-[#111111] font-display font-black text-xs uppercase flex items-center gap-1"
                  >
                    {isSpeakingTaunt ? <Square className="w-3 h-3 fill-current" /> : <Mic className="w-3 h-3" />}
                    <span>{isSpeakingTaunt ? 'STOP TAUNT' : 'BOSS TAUNT'}</span>
                  </button>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mt-1">
                  {boss.name}
                </h2>
                <p className="font-mono text-xs font-bold opacity-80">{boss.title}</p>
              </div>
            </div>

            <button
              onClick={() => {
                audioService.stop();
                onClose();
              }}
              className="p-1.5 bg-[#111111] text-[#F5F0E8] border-2 border-[#111111] hover:bg-[#FFF200] hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Boss Health Bar */}
          <div className="px-5 py-3 bg-[#111111] text-[#F5F0E8] border-b-3 border-[#111111] flex items-center gap-4 font-mono text-xs font-black">
            <div className="text-[#FF5C00] flex items-center gap-1.5 shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#FF5C00]" />
              BOSS HP: {bossHealth}/{boss.health}
            </div>
            <div className="flex-1 bg-[#2c2c2c] h-3 border border-[#F5F0E8]">
              <div 
                className="bg-[#FF2DAA] h-full transition-all duration-300"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
            <div className="text-[#FFF200] shrink-0">
              STAGE {currentStageIdx + 1}/{boss.stages.length}
            </div>
          </div>

          {/* Battle Arena Body */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto">
            {isVictory ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-[#FFF200] text-[#111111] border-3 border-[#111111] shadow-[6px_6px_0px_#111111] flex items-center justify-center text-amber-500 rotate-3">
                  <Trophy className="w-10 h-10 text-[#111111]" />
                </div>
                <h3 className="text-4xl font-display font-black uppercase tracking-tight">
                  BOSS DEFEATED!
                </h3>
                <p className="font-sans text-sm font-bold opacity-80 max-w-md">
                  You shattered the defenses of {boss.name} and conquered this realm!
                </p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] font-display font-black text-sm uppercase shadow-[3px_3px_0px_#111111]">
                    +{boss.xpReward} XP AWARDED
                  </span>
                </div>
                <Button variant="lime" size="lg" onClick={onClose} className="mt-4">
                  CLAIM REWARD & RETURN
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black uppercase text-[#FF5C00]">
                      STAGE {currentStage.stageNumber}: {currentStage.title}
                    </span>
                    <span className="font-mono text-xs font-bold opacity-75">
                      POINTS: {currentStage.points} PTS
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm font-medium opacity-90">
                    {currentStage.description}
                  </p>
                </div>

                {/* Concept Question Stage */}
                {currentStage.type === 'concept' && currentStage.question && (
                  <div className="flex flex-col gap-4">
                    <h4 className="font-display font-black text-base uppercase">
                      {currentStage.question.question}
                    </h4>

                    <div className="flex flex-col gap-2.5">
                      {currentStage.question.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;
                        let btnStyle = 'bg-white dark:bg-[#202020] border-[#111111] text-inherit';

                        if (selectedOptionId) {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-[#C6FF00] text-[#111111] font-black border-[#111111]';
                          } else if (isSelected && !opt.isCorrect) {
                            btnStyle = 'bg-[#FF2DAA] text-[#111111] font-black border-[#111111]';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleConceptAnswer(opt.id)}
                            disabled={isStageSolved}
                            className={`p-3 border-2 text-left font-sans text-xs sm:text-sm font-bold transition-all shadow-[2px_2px_0px_#111111] flex items-center justify-between gap-3 ${btnStyle}`}
                          >
                            <span>{opt.text}</span>
                            {selectedOptionId && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-[#111111]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Coding Challenge Stage */}
                {(currentStage.type === 'coding' || currentStage.type === 'code') && currentStage.codeProblem && (
                  <div className="h-[460px]">
                    <CodeEditorPanel
                      problem={currentStage.codeProblem}
                      onSuccess={handleCodingSuccess}
                    />
                  </div>
                )}

                {/* Stage Cleared CTA */}
                {isStageSolved && (
                  <div className="flex justify-end pt-2">
                    <Button variant="lime" size="md" onClick={handleNextStage}>
                      {currentStageIdx < boss.stages.length - 1 ? (
                        <>ADVANCE TO STAGE {currentStageIdx + 2} <ArrowRight className="w-4 h-4 ml-1.5" /></>
                      ) : (
                        <>DELIVER FINAL BLOW ⚔️</>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BossBattleModal;
