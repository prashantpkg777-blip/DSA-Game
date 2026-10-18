import React from 'react';
import { BookOpenCheck, CheckCircle2, RotateCcw, AlertTriangle, Sparkles, Trophy } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ErrorNotebookPage: React.FC = () => {
  const { mistakes, markMistakeReviewed } = useUserStore();

  const unreviewedMistakes = mistakes.filter((m) => !m.reviewed);
  const reviewedMistakes = mistakes.filter((m) => m.reviewed);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.1] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="amber">SPACED REPETITION NOTEBOOK</Badge>
              <Badge variant="violet">Adaptive Learning</Badge>
            </div>
            <h1 className="text-3xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
              <BookOpenCheck className="w-8 h-8 text-amber-400" /> Error Notebook
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Review and correct concepts you previously struggled with. Reviewing mistakes awards +30 XP and reinforces permanent retention.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono bg-white/[0.06] border border-white/[0.16] backdrop-blur-md px-4 py-2 rounded-2xl shadow-glass">
            <span className="text-amber-400 font-bold">{unreviewedMistakes.length}</span>
            <span className="text-slate-300">Needs Review</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-bold">{reviewedMistakes.length}</span>
            <span className="text-slate-300">Mastered</span>
          </div>
        </div>

        {/* Empty State */}
        {mistakes.length === 0 ? (
          <Card className="p-12 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Clean Record! No Mistakes Yet.
            </h3>
            <p className="text-sm text-slate-400 max-w-md">
              As you take quizzes and solve challenges, any missed questions will be saved here so you can review and practice them.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Unreviewed Section */}
            {unreviewedMistakes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Ready for Revision ({unreviewedMistakes.length})
                </h2>

                {unreviewedMistakes.map((item) => (
                  <Card key={item.id} glow="amber" className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {item.topicTitle}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-100">
                      {item.questionOrChallenge}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300">
                        <span className="text-rose-400 block font-bold mb-1">Your Previous Answer:</span>
                        {item.userAnswer}
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                        <span className="text-emerald-400 block font-bold mb-1">Correct Answer:</span>
                        {item.correctAnswer}
                      </div>
                    </div>

                    {item.explanation && (
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-md text-xs text-slate-300 font-sans leading-relaxed">
                        <strong className="text-cyan-300 block font-mono text-[11px] uppercase mb-1">
                          Conceptual Explanation:
                        </strong>
                        {item.explanation}
                      </div>
                    )}

                    <div className="flex justify-end pt-2 border-t border-white/[0.1]">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => markMistakeReviewed(item.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Mark as Reviewed (+30 XP)
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Reviewed Section */}
            {reviewedMistakes.length > 0 && (
              <div className="flex flex-col gap-4 mt-6">
                <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Mastered Concepts ({reviewedMistakes.length})
                </h2>

                {reviewedMistakes.map((item) => (
                  <Card key={item.id} className="p-5 opacity-75 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-slate-400">{item.topicTitle}</span>
                      <h4 className="text-sm font-semibold text-slate-200 mt-0.5">{item.questionOrChallenge}</h4>
                    </div>
                    <Badge variant="emerald" size="sm">REVIEWED</Badge>
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
