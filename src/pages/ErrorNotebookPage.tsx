import React from 'react';
import { BookOpenCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const ErrorNotebookPage: React.FC = () => {
  const { mistakes, markMistakeReviewed } = useUserStore();

  const unreviewedMistakes = mistakes.filter((m) => !m.reviewed);
  const reviewedMistakes = mistakes.filter((m) => m.reviewed);

  return (
    <div className="min-h-screen text-[#111111] dark:text-[#F5F0E8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-[#111111] dark:border-[#F5F0E8] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-[#FFF200] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111] -rotate-1">
                SPACED REPETITION NOTEBOOK
              </span>
              <span className="px-2 py-0.5 bg-[#C6FF00] text-[#111111] font-mono text-[11px] font-bold border border-[#111111]">
                FIX YOUR SLIP-UPS
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase flex items-center gap-2.5">
              <BookOpenCheck className="w-8 h-8 text-[#FF5C00]" /> ERROR NOTEBOOK
            </h1>
            <p className="font-sans text-xs sm:text-sm font-bold opacity-80 mt-1">
              Review and conquer concepts you previously missed. Reviewing mistakes grants +30 XP and solidifies permanent mastery.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs font-bold bg-[#111111] text-[#F5F0E8] border-2 border-[#111111] px-4 py-2 shadow-[3px_3px_0px_#111111]">
            <span className="text-[#FF5C00]">{unreviewedMistakes.length} NEEDS REVIEW</span>
            <span>|</span>
            <span className="text-[#C6FF00]">{reviewedMistakes.length} MASTERED</span>
          </div>
        </div>

        {/* Empty State */}
        {mistakes.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center flex flex-col items-center gap-4 border-3 border-[#111111] shadow-[6px_6px_0px_#111111]">
            <div className="w-16 h-16 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] flex items-center justify-center font-display font-black text-2xl -rotate-3">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-black uppercase">
              CLEAN RECORD! NO MISTAKES YET.
            </h3>
            <p className="font-sans text-xs sm:text-sm opacity-80 max-w-md">
              As you take quizzes and face bosses, any slip-ups will be saved here so you can master them without friction.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Unreviewed Section */}
            {unreviewedMistakes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="font-display font-black text-lg uppercase text-[#FF5C00] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#FF5C00]" /> READY FOR REVISION ({unreviewedMistakes.length})
                </h2>

                {unreviewedMistakes.map((item) => (
                  <Card key={item.id} className="p-5 sm:p-6 flex flex-col gap-4 border-3 border-[#111111] shadow-[5px_5px_0px_#111111]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-[#FF2DAA] uppercase">
                        {item.topicTitle}
                      </span>
                      <span className="font-mono text-[11px] opacity-60">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg">
                      {item.questionOrChallenge}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-[#FF2DAA]/10 border-2 border-[#FF2DAA] text-[#111111] dark:text-[#FF2DAA]">
                        <span className="block font-black mb-1 uppercase">Your Previous Answer:</span>
                        {item.userAnswer}
                      </div>

                      <div className="p-3 bg-[#C6FF00]/10 border-2 border-[#C6FF00] text-[#111111] dark:text-[#C6FF00]">
                        <span className="block font-black mb-1 uppercase">Correct Answer:</span>
                        {item.correctAnswer}
                      </div>
                    </div>

                    {item.explanation && (
                      <div className="p-3 bg-white dark:bg-[#202020] border-2 border-[#111111] font-sans text-xs leading-relaxed">
                        <strong className="font-mono text-[11px] font-black uppercase text-[#304FFE] dark:text-[#C6FF00] block mb-1">
                          CONCEPTUAL EXPLANATION:
                        </strong>
                        {item.explanation}
                      </div>
                    )}

                    <div className="flex justify-end pt-2 border-t-2 border-[#111111] dark:border-[#333]">
                      <Button
                        variant="lime"
                        size="sm"
                        onClick={() => markMistakeReviewed(item.id)}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> MARK REVIEWED (+30 XP)
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Reviewed Section */}
            {reviewedMistakes.length > 0 && (
              <div className="flex flex-col gap-4 pt-4">
                <h2 className="font-display font-black text-lg uppercase text-[#C6FF00] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> MASTERED ({reviewedMistakes.length})
                </h2>

                {reviewedMistakes.map((item) => (
                  <Card key={item.id} className="p-4 border-2 border-[#111111] opacity-75 bg-[#F5F0E8] dark:bg-[#181818]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold">{item.topicTitle}</span>
                      <span className="font-display font-black text-[10px] px-2 py-0.5 bg-[#C6FF00] text-[#111111] border border-[#111111]">
                        REVISE COMPLETE
                      </span>
                    </div>
                    <p className="font-sans text-xs opacity-90">{item.questionOrChallenge}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorNotebookPage;
