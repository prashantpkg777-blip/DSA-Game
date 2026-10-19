import React, { useRef, useState } from 'react';
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
  Activity,
  Award,
  Zap,
  Swords,
  Download,
  Upload
} from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DashboardPage: React.FC = () => {
  const { 
    profile, 
    stats, 
    dailyQuests, 
    achievements, 
    completedLessons, 
    completedChallenges, 
    defeatedBosses, 
    mistakes, 
    resetProgress, 
    importProgress 
  } = useUserStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  const handleExportSave = () => {
    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      profile,
      stats,
      completedLessons,
      completedChallenges,
      defeatedBosses,
      achievements,
      dailyQuests,
      mistakes,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa-chaos-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMessage('✅ Backup JSON exported successfully!');
    setTimeout(() => setBackupMessage(null), 4000);
  };

  const handleImportSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON structure');
        }
        importProgress(parsed);
        setBackupMessage('🔥 Progress restored successfully from backup!');
        setTimeout(() => setBackupMessage(null), 4000);
      } catch (err: any) {
        setBackupMessage('❌ Failed to parse backup file. Please ensure it is a valid DSA Chaos JSON.');
        setTimeout(() => setBackupMessage(null), 5000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  // Next recommended lesson
  const allLessons = WORLD_REGIONS.flatMap(r => r.topics);
  const nextLesson = allLessons.find(l => !completedLessons.includes(l.id)) || allLessons[0];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const maxWeeklyXP = Math.max(...stats.weeklyActivity, 100);

  return (
    <div className="min-h-screen text-[#111111] dark:text-[#F5F0E8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Welcome Header: YO, CODER! READY TO COOK? */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 bg-[#C6FF00] text-[#111111] border-3 md:border-4 border-[#111111] shadow-[8px_8px_0px_#111111] -rotate-1 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF2DAA] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] flex items-center justify-center text-3xl sm:text-4xl rotate-3">
                {profile.avatar}
              </div>
              <div>
                <div className="font-mono text-xs font-black uppercase text-[#111111] bg-[#FFF200] px-2 py-0.5 border border-[#111111] inline-block mb-1">
                  STATUS: HIGH COOKING ENERGY 👨‍🍳
                </div>
                <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase leading-none">
                  YO, {profile.username}! READY TO COOK?
                </h1>
                <p className="font-mono text-xs font-bold text-[#111111] opacity-90 mt-1">
                  {profile.title} • {profile.streakDays > 0 ? `${profile.streakDays} DAY STREAK 🔥` : 'START YOUR STREAK TODAY 🔥'} • {completedLessons.length} TOPICS MASTERED
                </p>
              </div>
            </div>

            {/* XP Progress Badge Widget */}
            <div className="w-full md:w-80 bg-[#111111] text-[#F5F0E8] p-4 border-3 border-[#111111] shadow-[4px_4px_0px_#111111]">
              <div className="flex items-center justify-between font-mono text-xs font-black mb-1">
                <span className="text-[#C6FF00]">LVL {profile.level} PROGRESS</span>
                <span className="text-[#FFF200]">{profile.xp} / {profile.xpToNextLevel} XP</span>
              </div>
              <div className="w-full bg-[#2c2c2c] h-3 border border-[#F5F0E8] overflow-hidden">
                <div 
                  className="bg-[#C6FF00] h-full transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <div className="text-[10px] font-mono text-right text-[#C6FF00] mt-1 font-bold">
                {profile.xpToNextLevel - profile.xp} XP TO LVL {profile.level + 1}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Brutalist Key Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 border-3 border-[#111111] bg-[#F5F0E8] dark:bg-[#181818] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#304FFE] rotate-1">
            <div className="flex items-center justify-between font-mono text-xs font-black mb-1">
              <span>SOLVED</span>
              <Target className="w-4 h-4 text-[#304FFE]" />
            </div>
            <div className="text-3xl font-display font-black">
              {stats.problemsSolved}
            </div>
            <div className="font-mono text-[11px] opacity-70">
              {stats.correctSubmissions} correct runs
            </div>
          </Card>

          <Card className="p-4 border-3 border-[#111111] bg-[#F5F0E8] dark:bg-[#181818] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#FF5C00] -rotate-1">
            <div className="flex items-center justify-between font-mono text-xs font-black text-[#FF5C00] mb-1">
              <span>STREAK</span>
              <Flame className="w-4 h-4 text-[#FF5C00] fill-[#FF5C00]" />
            </div>
            <div className="text-3xl font-display font-black text-[#FF5C00]">
              {profile.streakDays}D
            </div>
            <div className="font-mono text-[11px] opacity-70">
              Longest: {stats.longestStreak} days
            </div>
          </Card>

          <Card className="p-4 border-3 border-[#111111] bg-[#F5F0E8] dark:bg-[#181818] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#C6FF00] rotate-1">
            <div className="flex items-center justify-between font-mono text-xs font-black text-[#C6FF00] mb-1">
              <span className="text-[#111111] dark:text-[#C6FF00]">ACCURACY</span>
              <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" />
            </div>
            <div className="text-3xl font-display font-black text-[#111111] dark:text-[#C6FF00]">
              {stats.totalSubmissions > 0 ? `${stats.accuracy}%` : 'N/A'}
            </div>
            <div className="font-mono text-[11px] opacity-70">
              {stats.totalSubmissions > 0 ? `${stats.totalSubmissions} attempts` : 'No attempts yet'}
            </div>
          </Card>

          <Card className="p-4 border-3 border-[#111111] bg-[#F5F0E8] dark:bg-[#181818] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#FF2DAA] -rotate-1">
            <div className="flex items-center justify-between font-mono text-xs font-black text-[#FF2DAA] mb-1">
              <span>BOSSES DEFEATED</span>
              <Trophy className="w-4 h-4 text-[#FF2DAA]" />
            </div>
            <div className="text-3xl font-display font-black text-[#FF2DAA]">
              {stats.bossesDefeated}
            </div>
            <div className="font-mono text-[11px] opacity-70">
              {completedLessons.length} topics mastered
            </div>
          </Card>
        </div>

        {/* Continue Learning Callout Banner */}
        <div className="p-6 bg-[#FF2DAA] text-[#111111] border-3 border-[#111111] shadow-[6px_6px_0px_#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] font-black uppercase bg-[#111111] text-[#FFF200] px-2 py-0.5 inline-block mb-1">
              CURRENT QUEST OBJECTIVE
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black uppercase">
              {nextLesson.title}
            </h2>
            <p className="font-mono text-xs font-bold opacity-90 mt-0.5">
              {nextLesson.subtitle} • REWARD: +{nextLesson.xpReward} XP
            </p>
          </div>
          <Link to={`/lesson/${nextLesson.id}`}>
            <Button variant="lime" size="md" className="border-3 border-[#111111] shadow-[3px_3px_0px_#111111] hover:rotate-1">
              CONTINUE THE MAYHEM <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Two-Column Section: Weekly Activity & Daily Quests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <Card className="p-6 border-3 border-[#111111] shadow-[5px_5px_0px_#111111] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#304FFE]" />
                <h3 className="font-display font-black text-lg uppercase">WEEKLY XP ACTIVITY</h3>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#FFF200] text-[#111111] border border-[#111111]">
                PAST 7 DAYS
              </span>
            </div>

            {/* Bars */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
              {stats.weeklyActivity.map((xpVal, idx) => {
                const heightPercent = Math.max(12, Math.round((xpVal / maxWeeklyXP) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="font-mono text-[10px] font-black">{xpVal}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[36px] bg-[#304FFE] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]"
                    />
                    <span className="font-mono text-xs font-black">
                      {daysOfWeek[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Daily Quests */}
          <Card className="p-6 border-3 border-[#111111] shadow-[5px_5px_0px_#111111] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF5C00]" />
                <h3 className="font-display font-black text-lg uppercase">DAILY QUEST TRACKER</h3>
              </div>
              <Badge variant="orange" size="sm">REFRESHES DAILY</Badge>
            </div>

            <div className="flex flex-col gap-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3.5 border-2 border-[#111111] flex items-center justify-between gap-4 ${
                    quest.isCompleted
                      ? 'bg-[#C6FF00] text-[#111111] shadow-[2px_2px_0px_#111111]'
                      : 'bg-white dark:bg-[#202020] text-inherit'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#111111] text-[#FFF200] border border-[#111111]">
                      {quest.isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" /> : <Target className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xs uppercase">
                        {quest.title}
                      </h4>
                      <p className="font-sans text-[11px] opacity-80">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs font-black">
                    <span className="text-[#FF5C00]">+{quest.xpReward} XP</span>
                    {quest.isCompleted ? (
                      <span className="px-2 py-0.5 bg-[#111111] text-[#C6FF00] text-[10px]">DONE</span>
                    ) : (
                      <span className="opacity-70 text-[11px]">{quest.currentCount}/{quest.targetCount}</span>
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
            <h3 className="font-display font-black text-xl uppercase flex items-center gap-2">
              <Award className="w-6 h-6 text-[#FF2DAA]" /> UNLOCKED ACHIEVEMENTS
            </h3>
            <span className="font-mono text-xs font-bold px-2 py-1 bg-[#111111] text-[#C6FF00] border border-[#111111]">
              {achievements.filter(a => a.isUnlocked).length} / {achievements.length} UNLOCKED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <Card
                key={ach.id}
                className={`p-4 border-3 border-[#111111] shadow-[4px_4px_0px_#111111] ${
                  ach.isUnlocked ? 'bg-[#FFF200] text-[#111111]' : 'opacity-60 bg-white dark:bg-[#1f1f1f]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#111111] text-[#C6FF00] border-2 border-[#111111] flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-xs uppercase">{ach.title}</h4>
                      <span className="font-mono text-xs font-black text-[#FF2DAA]">+{ach.xpReward} XP</span>
                    </div>
                    <p className="font-sans text-[11px] opacity-80 mt-0.5">{ach.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Backup / Export-Import & Reset Helper */}
        <div className="p-4 sm:p-6 bg-white dark:bg-[#181818] border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[6px_6px_0px_#111111] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs font-black uppercase text-[#304FFE] dark:text-[#C6FF00] flex items-center gap-1.5">
              <span>💾 SAVE DATA & PROGRESS BACKUP</span>
            </div>
            <p className="font-mono text-xs opacity-75 mt-1">
              Export your XP, achievements, and error notebook so you never lose progress across devices or browser clears.
            </p>
            {backupMessage && (
              <div className="font-mono text-xs font-black mt-2 text-[#FF2DAA]">
                {backupMessage}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportSave}
              accept=".json,application/json"
              className="hidden"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportSave}
              className="border-2 border-[#111111] shadow-[2px_2px_0px_#111111]"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Export Save JSON
            </Button>
            <Button
              variant="lime"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-[#111111] shadow-[2px_2px_0px_#111111]"
            >
              <Upload className="w-3.5 h-3.5 mr-1" /> Import Save JSON
            </Button>
            <button
              onClick={() => {
                if (window.confirm('Reset all user progress, XP, and achievements to zero?')) {
                  resetProgress();
                }
              }}
              className="px-3 py-1.5 font-mono text-xs font-bold text-[#FF2DAA] hover:underline flex items-center gap-1 border-2 border-transparent"
            >
              <RotateCcw className="w-3.5 h-3.5" /> RESET DEMO DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
