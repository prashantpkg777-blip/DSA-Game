import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Zap } from 'lucide-react';
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
      <div className="p-8 bg-[#F5F0E8] dark:bg-[#181818] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#C6FF00] text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center -rotate-3">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-black uppercase">
          {passed ? 'QUIZ CRUSHED!' : 'NEEDS REVISION'}
        </h3>
        <p className="font-sans text-xs sm:text-sm font-bold opacity-80">
          You scored <strong className="text-[#FF2DAA]">{score}</strong> out of{' '}
          <strong>{questions.length}</strong> questions correctly.
        </p>

        {passed && (
          <span className="px-3 py-1 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] font-display font-black text-xs uppercase shadow-[2px_2px_0px_#111111]">
            +{xpReward} XP EARNED
          </span>
        )}

        <Button variant="secondary" onClick={handleRetry} className="mt-2">
          <RotateCcw className="w-4 h-4 mr-1.5" /> RETRY QUIZ
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F5F0E8] dark:bg-[#181818] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#FF2DAA] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-0.5 bg-[#B9A0FF] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111]">
          QUESTION {currentIdx + 1} OF {questions.length}
        </span>
        <span className="font-mono text-xs font-black text-[#FF5C00]">
          SCORE: {score}/{currentIdx}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-display font-black uppercase leading-snug">
        {currentQ.question}
      </h3>

      {currentQ.codeSnippet && (
        <pre className="p-4 bg-[#111111] text-[#C6FF00] border-2 border-[#111111] font-mono text-xs overflow-x-auto leading-relaxed">
          {currentQ.codeSnippet}
        </pre>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQ.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let btnStyle = 'bg-white dark:bg-[#202020] border-[#111111] text-inherit hover:bg-[#FFF200] hover:text-[#111111]';

          if (isAnswered) {
            if (option.isCorrect) {
              btnStyle = 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] font-black';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'bg-[#FF2DAA] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] font-black';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={isAnswered}
              className={`p-3.5 border-2 text-left font-sans text-xs sm:text-sm font-bold transition-all shadow-[2px_2px_0px_#111111] flex items-center justify-between gap-3 ${btnStyle}`}
            >
              <span>{option.text}</span>
              {isAnswered && (
                <span>
                  {option.isCorrect ? <CheckCircle2 className="w-5 h-5 text-[#111111]" /> : isSelected ? <XCircle className="w-5 h-5 text-[#111111]" /> : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Next Question / Finish */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <Button variant="lime" size="md" onClick={handleNext}>
            {currentIdx < questions.length - 1 ? (
              <>NEXT QUESTION <ArrowRight className="w-4 h-4 ml-1.5" /></>
            ) : (
              <>FINISH QUIZ <Award className="w-4 h-4 ml-1.5" /></>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPanel;
