import React, { useState } from 'react';
import { Swords, ShieldAlert, Trophy, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { BossBattle } from '../../types/curriculum';
import { useUserStore } from '../../stores/userStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { CodeEditorPanel } from '../code/CodeEditorPanel';
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

  const { defeatBoss, defeatedBosses } = useUserStore();
  const isAlreadyDefeated = defeatedBosses.includes(boss.id);

  if (!isOpen) return null;

  const currentStage = boss.stages[currentStageIdx];
  const healthPercent = Math.max(0, Math.round((bossHealth / boss.health) * 100));

  const handleConceptAnswer = (optionId: string) => {
    setSelectedOptionId(optionId);
    const option = currentStage.question?.options.find((o) => o.id === optionId);

    if (option?.isCorrect) {
      setIsStageSolved(true);
      const damage = Math.round(boss.health / boss.stages.length);
      setBossHealth((h) => Math.max(0, h - damage));
    }
  };

  const handleNextStage = () => {
    if (currentStageIdx < boss.stages.length - 1) {
      setCurrentStageIdx((s) => s + 1);
      setSelectedOptionId(null);
      setIsStageSolved(false);
    } else {
      // Victory!
      setBossHealth(0);
      setIsVictory(true);
      defeatBoss(boss.id, boss.xpReward);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
  };

  const handleCodingSuccess = () => {
    setIsStageSolved(true);
    const damage = Math.round(boss.health / boss.stages.length);
    setBossHealth((h) => Math.max(0, h - damage));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#090d1f]/85 backdrop-blur-2xl border border-white/[0.18] rounded-3xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.6)] flex flex-col">
        {/* Boss Header */}
        <div className="p-6 bg-white/[0.04] backdrop-blur-md border-b border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl p-3 bg-rose-500/15 rounded-2xl border border-rose-400/30 shadow-glass-rose backdrop-blur-md">
              {boss.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="rose">BOSS BATTLE</Badge>
                {isAlreadyDefeated && <Badge variant="emerald">DEFEATED</Badge>}
              </div>
              <h2 className="text-2xl font-black text-rose-100 tracking-tight mt-1">
                {boss.name}
              </h2>
              <p className="text-xs text-rose-300 font-mono">{boss.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.1] border border-transparent hover:border-white/[0.1] backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boss Health Bar */}
        <div className="px-6 py-3 bg-white/[0.02] border-b border-white/[0.08] flex items-center gap-4 backdrop-blur-md">
          <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 shrink-0">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            BOSS HP: {bossHealth}/{boss.health}
          </div>
          <div className="flex-1">
            <ProgressBar value={healthPercent} barColor="violet" height="md" />
          </div>
          <div className="text-xs font-mono text-slate-300 shrink-0">
            Stage {currentStageIdx + 1}/{boss.stages.length}
          </div>
        </div>

        {/* Battle Arena Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {isVictory ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-glow-amber">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-slate-100 tracking-tight">
                BOSS DEFEATED!
              </h3>
              <p className="text-sm text-slate-300 max-w-md">
                You shattered the defenses of {boss.name} and conquered this realm!
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="amber" size="md">
                  +{boss.xpReward} XP AWARDED
                </Badge>
                <Badge variant="violet" size="md">
                  🏆 BADGE UNLOCKED
                </Badge>
              </div>
              <Button variant="neon" size="lg" onClick={onClose} className="mt-4">
                Claim Victory & Return
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
                  Stage {currentStage.stageNumber}: {currentStage.title}
                </span>
                <h4 className="text-lg font-bold text-slate-100 mt-1">
                  {currentStage.description}
                </h4>
              </div>

              {/* Stage Type: Concept */}
              {currentStage.type === 'concept' && currentStage.question && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-200">
                    {currentStage.question.question}
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentStage.question.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
                      if (isSelected) {
                        style = opt.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-500 text-rose-300';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleConceptAnswer(opt.id)}
                          disabled={isStageSolved}
                          className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition-all ${style}`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  {isStageSolved && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                      <span>Critical Hit! Boss defenses weakened.</span>
                      <Button variant="primary" size="sm" onClick={handleNextStage}>
                        Advance <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Stage Type: Coding Challenge */}
              {currentStage.type === 'coding' && currentStage.codeProblem && (
                <div className="flex flex-col gap-4">
                  <CodeEditorPanel
                    problem={currentStage.codeProblem}
                    onSuccess={handleCodingSuccess}
                  />
                  {isStageSolved && (
                    <Button variant="neon" size="lg" onClick={handleNextStage} className="self-end">
                      Deliver Final Blow! <Swords className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
