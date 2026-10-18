import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-transparent text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Profile Banner */}
        <div className="p-8 rounded-3xl bg-white/[0.05] border border-white/[0.16] backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-glass relative overflow-hidden">
          <div className="flex items-center gap-5 z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-violet-600 p-1 flex items-center justify-center text-4xl shadow-glass-cyan border border-white/30 backdrop-blur-md">
              <div className="w-full h-full bg-[#070c1a]/80 backdrop-blur-md rounded-xl flex items-center justify-center">
                {profile.avatar}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-100">
                  {profile.username}
                </h1>
                <Badge variant="cyan">LVL {profile.level}</Badge>
                {profile.isGuest && <Badge variant="slate">Guest Mode</Badge>}
              </div>
              <p className="text-sm text-cyan-300 font-mono">{profile.title}</p>
              <p className="text-xs text-slate-400 mt-1">
                Joined on {profile.joinedDate} • {profile.streakDays} day streak
              </p>
            </div>
          </div>

          {/* XP Progress Card */}
          <div className="w-full md:w-80 bg-white/[0.07] backdrop-blur-md p-4 rounded-2xl border border-white/[0.16] shadow-glass flex flex-col gap-2 z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Level Progress</span>
              <span className="text-cyan-300 font-bold">
                {profile.xp} / {profile.xpToNextLevel} XP ({xpPercent}%)
              </span>
            </div>
            <ProgressBar value={xpPercent} barColor="cyan" height="md" />
            <div className="text-[11px] text-slate-400 font-mono text-right">
              {profile.xpToNextLevel - profile.xp} XP to Level {profile.level + 1}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card glow="cyan" className="p-5 flex flex-col gap-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Problems Solved</span>
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-slate-100 font-mono">
              {stats.problemsSolved}
            </div>
            <div className="text-[11px] text-slate-500">
              {stats.correctSubmissions} correct submissions
            </div>
          </Card>

          <Card glow="amber" className="p-5 flex flex-col gap-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Current Streak</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono flex items-center gap-1">
              {profile.streakDays} <span className="text-base text-slate-400">days</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Longest: {stats.longestStreak} days
            </div>
          </Card>

          <Card glow="emerald" className="p-5 flex flex-col gap-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Accuracy</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {stats.accuracy}%
            </div>
            <div className="text-[11px] text-slate-500">
              {stats.totalSubmissions} total attempts
            </div>
          </Card>

          <Card glow="violet" className="p-5 flex flex-col gap-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Topics Mastered</span>
              <Trophy className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-3xl font-black text-violet-400 font-mono">
              {completedLessons.length}
            </div>
            <div className="text-[11px] text-slate-500">
              {stats.bossesDefeated} bosses defeated
            </div>
          </Card>
        </div>

        {/* Continue Learning Callout */}
        <div className="p-6 rounded-3xl bg-white/[0.05] border border-cyan-400/30 backdrop-blur-2xl shadow-glass-cyan flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge variant="cyan" className="mb-2">RECOMMENDED NEXT MISSION</Badge>
            <h2 className="text-xl font-bold text-slate-100">
              {nextLesson.title}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {nextLesson.subtitle} • +{nextLesson.xpReward} XP Reward
            </p>
          </div>
          <Link to={`/lesson/${nextLesson.id}`}>
            <Button variant="neon" size="md">
              Continue Quest <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Middle Two-Column Section: Weekly Activity & Daily Quests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <Card className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-slate-100">Weekly XP Activity</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Past 7 Days</span>
            </div>

            {/* Bars */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
              {stats.weeklyActivity.map((xpVal, idx) => {
                const heightPercent = Math.max(10, Math.round((xpVal / maxWeeklyXP) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-cyan-400">{xpVal}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-cyan-500 to-sky-300 shadow-glass-cyan transition-all duration-300"
                    />
                    <span className="text-xs font-mono text-slate-400">
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
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-slate-100">Daily Quests</h3>
              </div>
              <Badge variant="amber" size="sm">Refreshes Daily</Badge>
            </div>

            <div className="flex flex-col gap-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all backdrop-blur-md shadow-glass ${
                    quest.isCompleted
                      ? 'bg-emerald-500/10 border-emerald-400/30'
                      : 'bg-white/[0.04] border-white/[0.12] hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        quest.isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/[0.08] text-slate-400'
                      }`}
                    >
                      {quest.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">
                        {quest.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-amber-400 font-bold">+{quest.xpReward} XP</span>
                    {quest.isCompleted ? (
                      <Badge variant="emerald" size="sm">CLAIMED</Badge>
                    ) : (
                      <span className="text-slate-400 text-[11px]">
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
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-400" /> Unlocked Achievements
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {achievements.filter(a => a.isUnlocked).length} / {achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <Card
                key={ach.id}
                className={`p-4 flex items-start gap-3.5 transition-all backdrop-blur-md ${
                  ach.isUnlocked
                    ? 'border-violet-400/35 bg-violet-500/10 shadow-glass-violet'
                    : 'border-white/[0.08] bg-white/[0.02] opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    ach.isUnlocked
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-400/30 shadow-glow-violet'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-200">
                      {ach.title}
                    </h4>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      +{ach.xpReward} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
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
        <div className="pt-8 border-t border-slate-900 flex justify-between items-center text-xs text-slate-500">
          <span>Guest progress is persisted automatically in local storage.</span>
          <button
            onClick={() => {
              if (window.confirm('Reset all user progress, XP, and achievements to zero?')) {
                resetProgress();
              }
            }}
            className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Progress
          </button>
        </div>
      </div>
    </div>
  );
};
