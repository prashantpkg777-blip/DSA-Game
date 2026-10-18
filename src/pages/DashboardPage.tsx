import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DashboardPage: React.FC = () => {
  const { profile, stats, dailyQuests, achievements, completedLessons, resetProgress } = useUserStore();

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  // Determine next recommended lesson
  const allLessons = WORLD_REGIONS.flatMap(r => r.topics);
  const nextLesson = allLessons.find(l => !completedLessons.includes(l.id)) || allLessons[0];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const maxWeeklyXP = Math.max(...stats.weeklyActivity, 100);

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Profile Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 rounded-[24px] bg-white/85 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/[0.2] backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm dark:shadow-glass relative overflow-hidden"
        >
          <div className="flex items-center gap-4 sm:gap-5 z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#0080FF] via-[#8B00FF] to-[#FF1493] p-1 flex items-center justify-center text-3xl sm:text-4xl shadow-glass-electric border border-white/30 backdrop-blur-md">
              <div className="w-full h-full bg-white dark:bg-[#080B18]/80 backdrop-blur-md rounded-xl flex items-center justify-center">
                {profile.avatar}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {profile.username}
                </h1>
                <Badge variant="electric">LVL {profile.level}</Badge>
                {profile.isGuest && <Badge variant="slate">Guest Mode</Badge>}
              </div>
              <p className="text-sm text-[#0080FF] dark:text-[#20B2AA] font-mono font-medium">{profile.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">
                Joined on {profile.joinedDate} • {profile.streakDays} day streak
              </p>
            </div>
          </div>

          {/* XP Progress Card */}
          <div className="w-full md:w-80 bg-slate-100/80 dark:bg-white/[0.07] backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.16] shadow-sm dark:shadow-glass flex flex-col gap-2 z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 dark:text-slate-300">Level Progress</span>
              <span className="text-[#0080FF] dark:text-cyan-300 font-bold">
                {profile.xp} / {profile.xpToNextLevel} XP ({xpPercent}%)
              </span>
            </div>
            <ProgressBar value={xpPercent} barColor="cyan" height="md" />
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-right">
              {profile.xpToNextLevel - profile.xp} XP to Level {profile.level + 1}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with Staggered Entrance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card glow="electric" className="p-5 flex flex-col gap-1 h-full">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 text-xs font-mono">
                <span>Problems Solved</span>
                <Target className="w-4 h-4 text-[#0080FF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">
                {stats.problemsSolved}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {stats.correctSubmissions} correct submissions
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card glow="amber" className="p-5 flex flex-col gap-1 h-full">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 text-xs font-mono">
                <span>Current Streak</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400 font-mono flex items-center gap-1">
                {profile.streakDays} <span className="text-base text-slate-500 dark:text-slate-400">days</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Longest: {stats.longestStreak} days
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card glow="teal" className="p-5 flex flex-col gap-1 h-full">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 text-xs font-mono">
                <span>Accuracy</span>
                <CheckCircle2 className="w-4 h-4 text-[#20B2AA]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#20B2AA] font-mono">
                {stats.accuracy}%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {stats.totalSubmissions} total attempts
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card glow="royal" className="p-5 flex flex-col gap-1 h-full">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 text-xs font-mono">
                <span>Topics Mastered</span>
                <Trophy className="w-4 h-4 text-[#8B00FF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#8B00FF] font-mono">
                {completedLessons.length}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {stats.bossesDefeated} bosses defeated
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Continue Learning Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-[24px] bg-white/85 dark:bg-white/[0.05] border border-[#0080FF]/35 backdrop-blur-2xl shadow-sm dark:shadow-glass-electric flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <Badge variant="teal" className="mb-2">RECOMMENDED NEXT MISSION</Badge>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {nextLesson.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {nextLesson.subtitle} • +{nextLesson.xpReward} XP Reward
            </p>
          </div>
          <Link to={`/lesson/${nextLesson.id}`}>
            <Button variant="neon" size="md">
              Continue Quest <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </motion.div>

        {/* Middle Two-Column Section: Weekly Activity & Daily Quests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <Card className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0080FF] dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Weekly XP Activity</h3>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Past 7 Days</span>
            </div>

            {/* Bars */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
              {stats.weeklyActivity.map((xpVal, idx) => {
                const heightPercent = Math.max(10, Math.round((xpVal / maxWeeklyXP) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-[#0080FF] dark:text-cyan-400 font-bold">{xpVal}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-[#0080FF] to-sky-300 shadow-sm dark:shadow-glass-cyan transition-all duration-300"
                    />
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {daysOfWeek[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Daily Quests */}
          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Daily Quests</h3>
              </div>
              <Badge variant="amber" size="sm">Refreshes Daily</Badge>
            </div>

            <div className="flex flex-col gap-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all backdrop-blur-md ${
                    quest.isCompleted
                      ? 'bg-emerald-500/10 border-emerald-400/30'
                      : 'bg-slate-100/70 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/[0.12] hover:bg-slate-200/80 dark:hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        quest.isCompleted
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'bg-slate-200 dark:bg-white/[0.08] text-slate-500'
                      }`}
                    >
                      {quest.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {quest.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">+{quest.xpReward} XP</span>
                    {quest.isCompleted ? (
                      <Badge variant="emerald" size="sm">CLAIMED</Badge>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {quest.currentCount}/{quest.targetCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements Showcase */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8B00FF]" /> Unlocked Achievements
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {achievements.filter(a => a.isUnlocked).length} / {achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <Card
                key={ach.id}
                className={`p-4 flex items-start gap-3.5 transition-all backdrop-blur-md ${
                  ach.isUnlocked
                    ? 'border-[#8B00FF]/35 bg-purple-500/10 dark:bg-violet-500/10 shadow-sm dark:shadow-glass-royal'
                    : 'border-slate-200/80 dark:border-white/[0.08] bg-slate-100/50 dark:bg-white/[0.02] opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    ach.isUnlocked
                      ? 'bg-[#8B00FF]/20 text-[#8B00FF] dark:text-violet-300 border border-[#8B00FF]/30'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {ach.title}
                    </h4>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                      +{ach.xpReward} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {ach.description}
                  </p>
                  <div className="mt-2">
                    <ProgressBar
                      value={Math.round((ach.progress / ach.maxProgress) * 100)}
                      barColor="violet"
                      height="sm"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reset Progress Helper for Testing */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-900 flex justify-between items-center text-xs text-slate-500">
          <span>Guest progress is persisted automatically in local storage.</span>
          <button
            onClick={() => {
              if (window.confirm('Reset all user progress, XP, and achievements to zero?')) {
                resetProgress();
              }
            }}
            className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Progress
          </button>
        </div>
      </div>
    </div>
  );
};
