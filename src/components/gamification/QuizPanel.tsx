import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, Sparkles, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../types/curriculum';
import { useUserStore } from '../../stores/userStore';
import { Button } from '../ui/Button';
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
  // Store selected option per question ID: { [questionId]: optionId }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recordedMistakes, setRecordedMistakes] = useState<Record<string, boolean>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasAwardedXP, setHasAwardedXP] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { addXP, recordMistake } = useUserStore();

  // Reset local state whenever the topic or questions change
  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setRecordedMistakes({});
    setQuizFinished(false);
    setHasAwardedXP(false);
    setShowHint(false);
  }, [topicId, questions]);

  // Guard against empty questions
  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 bg-[#F5F0E8] dark:bg-[#181818] border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[6px_6px_0px_#111111] text-center">
        <p className="font-mono text-xs font-bold uppercase opacity-80">
          No quiz challenges available for this topic yet. Check back soon!
        </p>
      </div>
    );
  }

  // Ensure currentIdx is always within valid bounds
  const safeIdx = Math.min(Math.max(0, currentIdx), questions.length - 1);
  const currentQ = questions[safeIdx];
  const selectedOptionId = answers[currentQ.id] || null;
  const isCurrentAnswered = Boolean(selectedOptionId);

  // Compute live score from answers
  const correctCount = questions.reduce((acc, q) => {
    const chosen = answers[q.id];
    if (!chosen) return acc;
    const isCorrect = q.options.find((o) => o.id === chosen)?.isCorrect;
    return isCorrect ? acc + 1 : acc;
  }, 0);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const passingScore = Math.max(1, Math.ceil(questions.length * 0.7));
  const passed = correctCount >= passingScore;

  const handleSelectOption = (optionId: string) => {
    // If this specific question is already answered, don't allow re-answering
    if (answers[currentQ.id]) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));

    const option = currentQ.options.find((o) => o.id === optionId);
    if (!option?.isCorrect && !recordedMistakes[currentQ.id]) {
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
      setRecordedMistakes((prev) => ({ ...prev, [currentQ.id]: true }));
    }
  };

  const handlePrevious = () => {
    if (safeIdx > 0) {
      setCurrentIdx(safeIdx - 1);
      setShowHint(false);
    }
  };

  const handleNext = () => {
    if (safeIdx < questions.length - 1) {
      setCurrentIdx(safeIdx + 1);
      setShowHint(false);
    } else {
      // Final submission
      setQuizFinished(true);
      if (passed && !hasAwardedXP) {
        setHasAwardedXP(true);
        addXP(xpReward);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        onComplete?.();
      }
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setAnswers({});
    setRecordedMistakes({});
    setQuizFinished(false);
    setHasAwardedXP(false);
    setShowHint(false);
  };

  if (quizFinished) {
    return (
      <div className="p-8 bg-[#F5F0E8] dark:bg-[#181818] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#C6FF00] text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center -rotate-3">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-black uppercase">
          {passed ? 'QUIZ CRUSHED!' : 'NEEDS REVISION'}
        </h3>
        <p className="font-sans text-xs sm:text-sm font-bold opacity-80">
          You scored <strong className="text-[#FF2DAA]">{correctCount}</strong> out of{' '}
          <strong>{questions.length}</strong> questions correctly (needed {passingScore} to pass).
        </p>

        {passed ? (
          <span className="px-3 py-1 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] font-display font-black text-xs uppercase shadow-[2px_2px_0px_#111111]">
            +{xpReward} XP EARNED
          </span>
        ) : (
          <p className="text-xs font-mono text-[#FF5C00] font-bold">
            Mistakes have been logged into your Error Notebook for revision!
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
          <Button variant="secondary" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4 mr-1.5" /> RETRY QUIZ
          </Button>
          <Button variant="lime" onClick={() => setQuizFinished(false)}>
            REVIEW ANSWERS
          </Button>
        </div>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="p-6 bg-[#F5F0E8] dark:bg-[#181818] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#FF2DAA] flex flex-col gap-6">
      {/* Top Header & Question Navigation Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#111111] dark:border-[#333]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-[#B9A0FF] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111]">
            QUESTION {safeIdx + 1} OF {questions.length}
          </span>
          <span className="font-mono text-xs font-black text-[#FF5C00]">
            SCORE: {correctCount}/{answeredCount}
          </span>
        </div>

        {/* Step jump buttons for multi-question navigation */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {questions.map((q, qIndex) => {
            const isCurrent = qIndex === safeIdx;
            const qAnswer = answers[q.id];
            const isQCorrect = qAnswer && q.options.find((o) => o.id === qAnswer)?.isCorrect;
            const isQAnswered = Boolean(qAnswer);

            let pillStyle = 'bg-white dark:bg-[#202020] text-inherit border-[#111111] opacity-70';
            if (isCurrent) {
              pillStyle = 'bg-[#FFF200] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] font-black scale-105';
            } else if (isQAnswered) {
              pillStyle = isQCorrect
                ? 'bg-[#C6FF00] text-[#111111] border-[#111111] font-bold'
                : 'bg-[#FF2DAA] text-[#111111] border-[#111111] font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(qIndex);
                  setShowHint(false);
                }}
                className={`w-7 h-7 text-xs font-display border transition-all flex items-center justify-center ${pillStyle}`}
                title={`Jump to Question ${qIndex + 1}`}
              >
                {qIndex + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-lg sm:text-xl font-display font-black uppercase leading-snug">
        {currentQ.question}
      </h3>

      {currentQ.codeSnippet && (
        <pre className="p-4 bg-[#111111] text-[#C6FF00] border-2 border-[#111111] font-mono text-xs overflow-x-auto leading-relaxed">
          {currentQ.codeSnippet}
        </pre>
      )}

      {/* Options List */}
      <div className="flex flex-col gap-3">
        {currentQ.options.map((option, optIdx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = optionLetters[optIdx] || String(optIdx + 1);
          let btnStyle = 'bg-white dark:bg-[#202020] border-[#111111] text-inherit hover:bg-[#FFF200] hover:text-[#111111]';

          if (isCurrentAnswered) {
            if (option.isCorrect) {
              btnStyle = 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] font-black';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'bg-[#FF2DAA] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] font-black';
            } else {
              btnStyle = 'bg-white/50 dark:bg-[#202020]/50 border-[#111111] opacity-60 text-inherit';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={isCurrentAnswered}
              className={`p-3.5 border-2 text-left font-sans text-xs sm:text-sm font-bold transition-all shadow-[2px_2px_0px_#111111] flex items-center justify-between gap-3 ${btnStyle}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="w-6 h-6 shrink-0 bg-[#111111] text-[#FFF200] font-display font-black text-xs flex items-center justify-center border border-[#111111]">
                  {letter}
                </span>
                <span>{option.text}</span>
              </div>
              {isCurrentAnswered && (
                <span className="shrink-0">
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#111111]" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-[#111111]" />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation once selected */}
      {isCurrentAnswered && (
        <div className="p-4 bg-white dark:bg-[#222] border-2 border-[#111111] font-mono text-xs flex flex-col gap-1.5 shadow-[2px_2px_0px_#111111]">
          <div className="font-display font-black uppercase text-xs flex items-center gap-1.5">
            {currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
              <span className="text-emerald-700 dark:text-[#C6FF00]">✓ SPOT ON!</span>
            ) : (
              <span className="text-[#FF2DAA]">✕ EXPLANATION:</span>
            )}
          </div>
          <p className="opacity-90 leading-relaxed font-sans text-xs sm:text-sm font-medium">
            {currentQ.options.find((o) => o.id === selectedOptionId)?.explanation ||
              currentQ.options.find((o) => o.isCorrect)?.explanation}
          </p>
        </div>
      )}

      {/* Hint toggle if question has a hint */}
      {currentQ.hint && !isCurrentAnswered && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="self-start text-xs font-mono font-bold text-[#FF5C00] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'HIDE HINT' : 'NEED A HINT?'}
          </button>
          {showHint && (
            <div className="p-3 bg-[#FFF200]/20 border border-[#111111] text-xs font-mono">
              💡 {currentQ.hint}
            </div>
          )}
        </div>
      )}

      {/* Navigation Controls: Previous, Restart, Next / Finish */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-[#111111] dark:border-[#333] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrevious}
            disabled={safeIdx === 0}
            className="border-2 border-[#111111] disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> PREVIOUS
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRetry}
            className="border-2 border-[#111111]"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> RESTART
          </Button>
        </div>

        <div>
          {isCurrentAnswered && (
            <Button variant="lime" size="md" onClick={handleNext}>
              {safeIdx < questions.length - 1 ? (
                <>
                  NEXT QUESTION <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              ) : (
                <>
                  FINISH QUIZ <Award className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPanel;
