import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '../../types/curriculum';
import { useUserStore } from '../../stores/userStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

export interface QuizPanelProps {
  questions: QuizQuestion[];
  topicId: string;
  topicTitle: string;
  xpReward: number;
  onComplete?: () => void;
}

export const QuizPanel: React.FC<QuizPanelProps> = ({
  questions,
  topicId,
  topicTitle,
  xpReward,
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasAwardedXP, setHasAwardedXP] = useState(false);

  const { addXP, recordMistake } = useUserStore();

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const option = currentQ.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      setScore((s) => s + 1);
    } else {
      // Record mistake in user's Error Notebook for Spaced Repetition / Review Mode
      const correctOption = currentQ.options.find((o) => o.isCorrect);
      recordMistake({
        topicId,
        topicTitle,
        type: 'quiz',
        questionOrChallenge: currentQ.question,
        userAnswer: option?.text || 'None',
        correctAnswer: correctOption?.text || 'Unknown',
        explanation: option?.explanation || correctOption?.explanation || '',
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const passed = score >= Math.ceil(questions.length * 0.7);
      if (passed && !hasAwardedXP) {
        setHasAwardedXP(true);
        addXP(xpReward);
        confetti({ particleCount: 70, spread: 60 });
        onComplete?.();
      }
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const passed = score >= Math.ceil(questions.length * 0.7);
    return (
      <div className="p-8 bg-slate-900/90 rounded-3xl border border-slate-800 text-center flex flex-col items-center gap-4 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">
          {passed ? 'Quiz Mastered!' : 'Needs Review'}
        </h3>
        <p className="text-sm text-slate-400">
          You scored <strong className="text-cyan-400">{score}</strong> out of{' '}
          <strong>{questions.length}</strong> questions correctly.
        </p>

        {passed && (
          <Badge variant="emerald" size="md">
            +{xpReward} XP Earned
          </Badge>
        )}

        <Button variant="secondary" onClick={handleRetry} className="mt-2">
          <RotateCcw className="w-4 h-4 mr-1.5" /> Retry Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between">
        <Badge variant="violet">
          Question {currentIdx + 1} of {questions.length}
        </Badge>
        <span className="text-xs font-mono text-slate-400">
          Score: {score}/{currentIdx}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-100 leading-snug">
        {currentQ.question}
      </h3>

      {currentQ.codeSnippet && (
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
          {currentQ.codeSnippet}
        </pre>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQ.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';

          if (isAnswered) {
            if (option.isCorrect) {
              btnStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-300';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start justify-between gap-3 ${btnStyle}`}
            >
              <div className="flex-1 text-sm font-medium leading-relaxed">
                {option.text}
              </div>
              {isAnswered && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswered && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center gap-2 font-bold font-mono">
            {currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
              <span className="text-emerald-400">CORRECT!</span>
            ) : (
              <span className="text-rose-400">INCORRECT (Logged to Error Notebook)</span>
            )}
          </div>
          <p className="leading-relaxed">
            {currentQ.options.find((o) => o.id === selectedOptionId)?.explanation}
          </p>
          <Button variant="primary" size="sm" onClick={handleNext} className="self-end mt-1">
            Next Question <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      )}
    </div>
  );
};
