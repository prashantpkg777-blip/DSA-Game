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
  Square,
  Zap
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

  const allTopics: TopicLesson[] = WORLD_REGIONS.flatMap((r) => r.topics);
  const currentTopic = allTopics.find((t) => t.id === topicId) || allTopics[0];
  const currentRegion = WORLD_REGIONS.find((r) => r.id === currentTopic.regionId);

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
    <div className="min-h-screen text-[#111111] dark:text-[#F5F0E8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> ← BACK TO WORLD MAP
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black uppercase text-[#FF5C00] hidden sm:inline">
              // {currentRegion?.name}
            </span>
            {isCompleted ? (
              <span className="px-3 py-1 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] font-display font-black text-xs uppercase shadow-[2px_2px_0px_#111111]">
                ✓ COMPLETED
              </span>
            ) : (
              <Button variant="lime" size="sm" onClick={handleClaimComplete}>
                <Award className="w-4 h-4 mr-1.5" /> COMPLETE (+{currentTopic.xpReward} XP)
              </Button>
            )}
          </div>
        </div>

        {/* Title Header with Voice Narration */}
        <div className="p-6 bg-[#F5F0E8] dark:bg-[#181818] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#FF2DAA] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-[#FF2DAA] text-[#111111] border border-[#111111] font-display font-black text-xs uppercase">
                {currentTopic.difficulty === 'Beginner' ? 'WARM-UP' : currentTopic.difficulty === 'Intermediate' ? 'CHAOS MODE' : 'BOSS FIGHT'}
              </span>
              <span className="text-xs font-mono font-black text-[#FF5C00] bg-[#FFF200] text-[#111111] px-2 py-0.5 border border-[#111111]">
                +{currentTopic.xpReward} XP
              </span>
              <button
                onClick={handleToggleVoiceLesson}
                className={`inline-flex items-center gap-1.5 px-3 py-1 border-2 border-[#111111] text-xs font-display font-black uppercase transition-all ${
                  isSpeakingLesson
                    ? 'bg-[#FF2DAA] text-[#111111] shadow-[2px_2px_0px_#111111] animate-pulse'
                    : 'bg-[#304FFE] text-[#F5F0E8] shadow-[2px_2px_0px_#111111]'
                }`}
                title={isSpeakingLesson ? 'Stop Voiceover' : 'Listen to Lesson'}
              >
                {isSpeakingLesson ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" /> STOP VOICE
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" /> AI NARRATOR
                  </>
                )}
              </button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase">
              {currentTopic.title}
            </h1>
            <p className="font-sans text-xs sm:text-sm font-bold opacity-80 mt-1">
              {currentTopic.subtitle}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 border-2 border-[#111111] bg-white dark:bg-[#111111] overflow-x-auto max-w-full font-display text-xs font-black uppercase shrink-0 w-full lg:w-auto">
            {[
              { id: 'concept', label: 'CONCEPT', icon: BookOpen },
              { id: 'simulator', label: 'SIMULATOR & PLAY', icon: Gamepad2 },
              { id: 'code', label: 'CODE ARENA', icon: Code2 },
              { id: 'quiz', label: 'QUIZ FIGHT', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all ${
                    isActive
                      ? 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]'
                      : 'border-transparent text-inherit opacity-75 hover:opacity-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Concept & Educational Content */}
        {activeTab === 'concept' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left 2 Cols: Explanations, Intuition & Code */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="p-6 border-3 border-[#111111] shadow-[5px_5px_0px_#111111]">
                <h3 className="font-display font-black text-xl uppercase mb-2">
                  WHAT PROBLEM DOES IT SOLVE?
                </h3>
                <p className="font-sans text-sm opacity-90 leading-relaxed mb-6">
                  {currentTopic.content.whatIsIt}
                </p>

                <h3 className="font-display font-black text-xl uppercase mb-2">
                  WHY IT MATTERS
                </h3>
                <p className="font-sans text-sm opacity-90 leading-relaxed mb-6">
                  {currentTopic.content.whyItMatters}
                </p>

                <div className="p-4 bg-[#FFF200] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] -rotate-0.5 mb-6">
                  <strong className="block font-mono text-xs uppercase tracking-wider mb-1 font-black">
                    ⚡ CORE INTUITION / MENTAL MODEL:
                  </strong>
                  <p className="font-sans text-sm font-bold leading-relaxed">
                    {currentTopic.content.intuition}
                  </p>
                </div>

                <h3 className="font-display font-black text-xl uppercase mb-2">
                  STEP-BY-STEP EXECUTION
                </h3>
                <ol className="list-decimal list-inside font-sans text-sm opacity-90 space-y-2 mb-6">
                  {currentTopic.content.stepByStep.map((step, idx) => (
                    <li key={idx} className="leading-relaxed font-medium">
                      {step}
                    </li>
                  ))}
                </ol>

                <h3 className="font-display font-black text-xl uppercase mb-2">
                  ALGORITHM PSEUDOCODE
                </h3>
                <pre className="p-4 bg-[#111111] text-[#C6FF00] border-2 border-[#111111] font-mono text-xs overflow-x-auto leading-relaxed">
                  {currentTopic.content.pseudocode}
                </pre>
              </Card>

              {/* Common Mistakes & Edge Cases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-5 border-3 border-[#111111] bg-[#FF2DAA]/10 text-[#111111] dark:text-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
                  <div className="flex items-center gap-2 font-display font-black text-sm uppercase mb-3 text-[#FF2DAA]">
                    <AlertTriangle className="w-4 h-4" /> COMMON SLIP-UPS
                  </div>
                  <ul className="list-disc list-inside text-xs font-sans opacity-90 space-y-2">
                    {currentTopic.content.commonMistakes.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-5 border-3 border-[#111111] bg-[#FFF200]/10 text-[#111111] dark:text-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
                  <div className="flex items-center gap-2 font-display font-black text-sm uppercase mb-3 text-[#FF5C00]">
                    <Sparkles className="w-4 h-4" /> TRICKY EDGE CASES
                  </div>
                  <ul className="list-disc list-inside text-xs font-sans opacity-90 space-y-2">
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
              <Card className="p-6 border-3 border-[#111111] shadow-[5px_5px_0px_#111111] bg-[#F5F0E8] dark:bg-[#181818]">
                <h3 className="font-display font-black text-lg uppercase mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#304FFE]" /> COMPLEXITY SPECS
                </h3>

                <div className="flex flex-col gap-2 font-mono text-xs mb-4">
                  <div className="flex justify-between p-2 bg-white dark:bg-[#222] border-2 border-[#111111]">
                    <span className="opacity-70">BEST CASE:</span>
                    <span className="font-black text-[#C6FF00] bg-[#111111] px-1.5">{currentTopic.content.complexity.timeBest}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white dark:bg-[#222] border-2 border-[#111111]">
                    <span className="opacity-70">AVERAGE:</span>
                    <span className="font-black text-[#304FFE] dark:text-[#60A5FA]">{currentTopic.content.complexity.timeAverage}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white dark:bg-[#222] border-2 border-[#111111]">
                    <span className="opacity-70">WORST CASE:</span>
                    <span className="font-black text-[#FF2DAA]">{currentTopic.content.complexity.timeWorst}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white dark:bg-[#222] border-2 border-[#111111]">
                    <span className="opacity-70">AUX SPACE:</span>
                    <span className="font-black text-[#B9A0FF]">{currentTopic.content.complexity.space}</span>
                  </div>
                </div>

                <p className="text-xs font-sans opacity-80 leading-relaxed">
                  {currentTopic.content.complexity.explanation}
                </p>
              </Card>

              {/* Real World Applications */}
              <Card className="p-6 border-3 border-[#111111] shadow-[5px_5px_0px_#111111] bg-[#F5F0E8] dark:bg-[#181818]">
                <h3 className="font-display font-black text-lg uppercase mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#C6FF00]" /> WHERE IT'S USED IN PROD
                </h3>
                <ul className="list-disc list-inside text-xs font-sans opacity-80 space-y-2">
                  {currentTopic.content.realWorldApplications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </Card>

              {/* CTA to jump into simulator */}
              <Button
                variant="lime"
                size="md"
                onClick={() => setActiveTab('simulator')}
                className="w-full text-sm font-display font-black shadow-[4px_4px_0px_#111111]"
              >
                LAUNCH SIMULATOR & PLAY <ArrowRight className="w-4 h-4 ml-2" />
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
              key={currentTopic.id}
              problem={currentTopic.codeProblem}
              onSuccess={handleClaimComplete}
            />
          </div>
        )}

        {/* Tab 4: Quiz & Comprehension Check */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto w-full animate-fade-in">
            <QuizPanel
              key={currentTopic.id}
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
          <div className="pt-6 border-t-2 border-[#111111] dark:border-[#333] flex justify-end">
            <Link to={`/lesson/${nextTopic.id}`}>
              <Button variant="secondary" size="md">
                NEXT MISSION: {nextTopic.title} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
