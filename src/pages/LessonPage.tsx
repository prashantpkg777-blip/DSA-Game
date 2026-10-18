import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Gamepad2, 
  Code2, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  HardDrive, 
  AlertTriangle, 
  Sparkles, 
  Award,
  HelpCircle,
  Mic,
  Square
} from 'lucide-react';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { TopicLesson } from '../types/curriculum';
import { useUserStore } from '../stores/userStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ArraySortingArena } from '../components/visualizers/ArraySortingArena';
import { BinarySearchDungeon } from '../components/visualizers/BinarySearchDungeon';
import { LinkedListBuilder } from '../components/visualizers/LinkedListBuilder';
import { StackTower } from '../components/visualizers/StackTower';
import { TreeKingdomVisualizer } from '../components/visualizers/TreeKingdomVisualizer';
import { GraphExplorer } from '../components/visualizers/GraphExplorer';
import { DPMatrixLab } from '../components/visualizers/DPMatrixLab';
import { CodeEditorPanel } from '../components/code/CodeEditorPanel';
import { QuizPanel } from '../components/gamification/QuizPanel';
import { audioService } from '../services/audioService';
import confetti from 'canvas-confetti';

export const LessonPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [activeTab, setActiveTab] = useState<'concept' | 'simulator' | 'code' | 'quiz'>('concept');
  const [isSpeakingLesson, setIsSpeakingLesson] = useState(false);

  const { completedLessons, completeLesson, soundEnabled, voiceEnabled, speechRate } = useUserStore();

  // Find topic in curriculum
  const allTopics: TopicLesson[] = WORLD_REGIONS.flatMap((r) => r.topics);
  const currentTopic = allTopics.find((t) => t.id === topicId) || allTopics[0];
  const currentRegion = WORLD_REGIONS.find((r) => r.id === currentTopic.regionId);

  // Find next topic
  const currentIndex = allTopics.findIndex((t) => t.id === currentTopic.id);
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
  const isCompleted = completedLessons.includes(currentTopic.id);

  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, [topicId]);

  const handleClaimComplete = () => {
    completeLesson(currentTopic.id, currentTopic.xpReward);
    audioService.playLevelUp(soundEnabled);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  const handleToggleVoiceLesson = () => {
    if (isSpeakingLesson) {
      audioService.stop();
      setIsSpeakingLesson(false);
    } else {
      setIsSpeakingLesson(true);
      const text = `${currentTopic.title}. ${currentTopic.subtitle}. What problem does it solve? ${currentTopic.content.whatIsIt}. Why it matters: ${currentTopic.content.whyItMatters}. Key intuition: ${currentTopic.content.intuition}`;
      audioService.speak(text, {
        voiceEnabled: true,
        rate: speechRate,
        onEnd: () => setIsSpeakingLesson(false),
      });
    }
  };

  const renderVisualizer = () => {
    switch (currentTopic.visualizerType) {
      case 'binary_search':
        return <BinarySearchDungeon />;
      case 'linked_list':
        return <LinkedListBuilder />;
      case 'stack':
        return <StackTower />;
      case 'tree':
        return <TreeKingdomVisualizer />;
      case 'graph':
        return <GraphExplorer />;
      case 'dp_table':
        return <DPMatrixLab />;
      default:
        return <ArraySortingArena />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-[#0080FF] dark:hover:text-cyan-300 font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to World Map
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
              {currentRegion?.name}
            </span>
            {isCompleted ? (
              <Badge variant="emerald" size="sm">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> COMPLETED
              </Badge>
            ) : (
              <Button variant="neon" size="sm" onClick={handleClaimComplete}>
                <Award className="w-4 h-4 mr-1.5" /> Complete (+{currentTopic.xpReward} XP)
              </Button>
            )}
          </div>
        </div>

        {/* Title Header with Voice Narration */}
        <div className="p-5 sm:p-6 bg-white/80 dark:bg-white/[0.05] rounded-3xl border border-slate-200/90 dark:border-white/[0.16] backdrop-blur-2xl shadow-sm dark:shadow-glass flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant="cyan">{currentTopic.difficulty}</Badge>
              <span className="text-xs font-mono text-amber-500 dark:text-amber-400 font-bold">
                +{currentTopic.xpReward} XP
              </span>
              <button
                onClick={handleToggleVoiceLesson}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isSpeakingLesson
                    ? 'bg-[#0080FF] text-white shadow-md animate-pulse'
                    : 'bg-[#0080FF]/15 text-[#0080FF] dark:text-cyan-300 hover:bg-[#0080FF]/25'
                }`}
                title={isSpeakingLesson ? 'Stop voiceover' : 'Listen to lesson summary'}
              >
                {isSpeakingLesson ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" /> Stop Voice
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" /> Listen to Lesson
                  </>
                )}
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {currentTopic.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {currentTopic.subtitle}
            </p>
          </div>

          {/* Mode Tabs (Scrollable on small mobile) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 dark:bg-white/[0.04] rounded-2xl border border-slate-200/80 dark:border-white/[0.12] backdrop-blur-md overflow-x-auto max-w-full pb-1 sm:pb-1.5 scrollbar-none shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('concept')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'concept'
                  ? 'bg-white dark:bg-white/[0.16] text-[#0080FF] dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/40 shadow-sm dark:shadow-glass-cyan backdrop-blur-md font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.08]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Concept
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'simulator'
                  ? 'bg-white dark:bg-white/[0.16] text-[#0080FF] dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/40 shadow-sm dark:shadow-glass-cyan backdrop-blur-md font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.08]'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" /> Visualizer & Play
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-white/[0.16] text-[#0080FF] dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/40 shadow-sm dark:shadow-glass-cyan backdrop-blur-md font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.08]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> Code Challenge
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white dark:bg-white/[0.16] text-[#0080FF] dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/40 shadow-sm dark:shadow-glass-cyan backdrop-blur-md font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.08]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Quiz
            </button>
          </div>
        </div>

        {/* Tab 1: Concept & Educational Content */}
        {activeTab === 'concept' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left 2 Cols: Explanations, Intuition & Code */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  What Problem Does It Solve?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {currentTopic.content.whatIsIt}
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Why It Matters
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {currentTopic.content.whyItMatters}
                </p>

                <div className="p-4 rounded-2xl bg-cyan-500/10 dark:bg-cyan-950/20 border border-cyan-500/30 text-cyan-800 dark:text-cyan-200 text-sm leading-relaxed mb-4">
                  <strong className="block font-mono text-xs uppercase tracking-wider text-[#0080FF] dark:text-cyan-400 mb-1">
                    💡 The Mental Model / Intuition:
                  </strong>
                  {currentTopic.content.intuition}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Step-by-Step Execution
                </h3>
                <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                  {currentTopic.content.stepByStep.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Algorithm Pseudocode
                </h3>
                <pre className="p-4 rounded-2xl bg-slate-900 text-cyan-300 border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                  {currentTopic.content.pseudocode}
                </pre>
              </Card>

              {/* Common Mistakes & Edge Cases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-5 border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm mb-3">
                    <AlertTriangle className="w-4 h-4" /> Common Mistakes
                  </div>
                  <ul className="list-disc list-inside text-xs text-rose-700 dark:text-rose-200/80 space-y-2">
                    {currentTopic.content.commonMistakes.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-5 border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/10">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-3">
                    <Sparkles className="w-4 h-4" /> Edge Cases to Watch
                  </div>
                  <ul className="list-disc list-inside text-xs text-amber-700 dark:text-amber-200/80 space-y-2">
                    {currentTopic.content.edgeCases.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Right Column: Complexity & Real-world Applications */}
            <div className="flex flex-col gap-6">
              {/* Complexity Card */}
              <Card glow="violet" className="p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-violet-500 dark:text-violet-400" /> Complexity Analysis
                </h3>

                <div className="flex flex-col gap-3 font-mono text-xs mb-4">
                  <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Best Case:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentTopic.content.complexity.timeBest}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Average Case:</span>
                    <span className="text-[#0080FF] dark:text-cyan-400 font-bold">{currentTopic.content.complexity.timeAverage}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Worst Case:</span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold">{currentTopic.content.complexity.timeWorst}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Aux Space:</span>
                    <span className="text-[#8B00FF] dark:text-violet-400 font-bold">{currentTopic.content.complexity.space}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {currentTopic.content.complexity.explanation}
                </p>
              </Card>

              {/* Real World Applications */}
              <Card className="p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Production Applications
                </h3>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  {currentTopic.content.realWorldApplications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </Card>

              {/* CTA to jump into simulator */}
              <Button
                variant="neon"
                size="md"
                onClick={() => setActiveTab('simulator')}
                className="w-full"
              >
                Launch Simulator & Play <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Tab 2: Visual Simulator & Play */}
        {activeTab === 'simulator' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {renderVisualizer()}
          </div>
        )}

        {/* Tab 3: Code Implementation */}
        {activeTab === 'code' && (
          <div className="animate-fade-in">
            <CodeEditorPanel
              problem={currentTopic.codeProblem}
              onSuccess={handleClaimComplete}
            />
          </div>
        )}

        {/* Tab 4: Quiz & Comprehension Check */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto w-full animate-fade-in">
            <QuizPanel
              questions={currentTopic.quizQuestions}
              topicId={currentTopic.id}
              topicTitle={currentTopic.title}
              xpReward={currentTopic.xpReward}
              onComplete={handleClaimComplete}
            />
          </div>
        )}

        {/* Bottom Nav: Next Lesson */}
        {nextTopic && (
          <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
            <Link to={`/lesson/${nextTopic.id}`}>
              <Button variant="secondary" size="md">
                Next Mission: {nextTopic.title} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
