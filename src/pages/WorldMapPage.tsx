import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  Swords, 
  Trophy, 
  ChevronRight, 
  Layers, 
  Search, 
  GitCommit, 
  Boxes, 
  Network, 
  Database, 
  Cpu, 
  Binary, 
  Terminal, 
  Sparkles,
  Zap
} from 'lucide-react';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { BossBattle } from '../types/curriculum';
import { useUserStore } from '../stores/userStore';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BossBattleModal } from '../components/gamification/BossBattleModal';

export const WorldMapPage: React.FC = () => {
  const [selectedBoss, setSelectedBoss] = useState<BossBattle | null>(null);
  const [freeExploration, setFreeExploration] = useState(false);

  const { profile, completedLessons, defeatedBosses } = useUserStore();

  const getRegionIcon = (name: string) => {
    if (name.includes('Array')) return <Boxes className="w-5 h-5 text-[#0080FF]" />;
    if (name.includes('Pointer')) return <GitCommit className="w-5 h-5 text-[#20B2AA]" />;
    if (name.includes('Search')) return <Search className="w-5 h-5 text-amber-500" />;
    if (name.includes('Sorting')) return <Zap className="w-5 h-5 text-[#FF1493]" />;
    if (name.includes('Linked')) return <GitCommit className="w-5 h-5 text-emerald-500" />;
    if (name.includes('Stack')) return <Layers className="w-5 h-5 text-[#8B00FF]" />;
    if (name.includes('Tree')) return <Network className="w-5 h-5 text-emerald-400" />;
    if (name.includes('Graph')) return <Network className="w-5 h-5 text-[#0080FF]" />;
    if (name.includes('Dynamic')) return <Database className="w-5 h-5 text-purple-400" />;
    return <Cpu className="w-5 h-5 text-[#20B2AA]" />;
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/[0.1] pb-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="electric">ALGORITHM QUEST OVERWORLD</Badge>
              {freeExploration && <Badge variant="teal">Free Exploration Active</Badge>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              The World of Data Structures & Algorithms
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Journey through each realm, master its algorithms, and defeat the guardian boss to claim your glory.
            </p>
          </div>

          <button
            onClick={() => setFreeExploration(!freeExploration)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/80 dark:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.2] backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/[0.16] hover:border-slate-300 dark:hover:border-white/[0.3] text-slate-700 dark:text-slate-200 transition-all shadow-sm dark:shadow-glass active:scale-95"
          >
            {freeExploration ? '🔓 Mode: Free Exploration' : '🔒 Mode: Strict RPG Unlock'}
          </button>
        </motion.div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORLD_REGIONS.map((region, idx) => {
            const isUnlocked = freeExploration || profile.level >= region.requiredLevel || region.unlockedByDefault;
            const isBossDefeated = defeatedBosses.includes(region.bossBattle.id);
            const completedCount = region.topics.filter(t => completedLessons.includes(t.id)).length;
            const isRegionMastered = completedCount === region.topics.length && isBossDefeated;

            return (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-[24px] border transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 ${
                  isUnlocked
                    ? 'bg-white/85 dark:bg-white/[0.06] border-slate-200/90 dark:border-white/[0.18] backdrop-blur-2xl hover:bg-white dark:hover:bg-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.32] hover:-translate-y-1.5 shadow-sm dark:shadow-glass'
                    : 'bg-slate-100/60 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/[0.08] backdrop-blur-md opacity-60'
                }`}
              >
                <div>
                  {/* Region Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.14] backdrop-blur-md flex items-center justify-center shadow-sm dark:shadow-glass">
                        {getRegionIcon(region.name)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#0080FF] dark:text-cyan-300 font-bold uppercase tracking-wider">
                          Region {region.number}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {region.name}
                        </h3>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                        <Lock className="w-3.5 h-3.5" /> Lvl {region.requiredLevel}
                      </div>
                    ) : isRegionMastered ? (
                      <Badge variant="emerald" size="sm">MASTERED</Badge>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-300">
                        {completedCount}/{region.topics.length} Done
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {region.description}
                  </p>

                  {/* Topics List */}
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Missions in this Realm:
                    </span>
                    {region.topics.map((topic) => {
                      const isDone = completedLessons.includes(topic.id);
                      return (
                        <Link
                          key={topic.id}
                          to={`/lesson/${topic.id}`}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all backdrop-blur-sm ${
                            isDone
                              ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-800 dark:text-emerald-300 font-medium'
                              : 'bg-slate-100/70 dark:bg-white/[0.04] border-slate-200/70 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-white/[0.08] hover:border-[#0080FF] dark:hover:border-cyan-400/40 hover:text-[#0080FF] dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-[#0080FF] dark:bg-cyan-400 shrink-0" />
                            )}
                            <span className="font-medium">{topic.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Boss Battle Trigger */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.1] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{region.bossBattle.avatar}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-300">
                        {region.bossBattle.name}
                      </span>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                        +{region.bossBattle.xpReward} XP
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={isBossDefeated ? 'secondary' : 'danger'}
                    size="sm"
                    onClick={() => setSelectedBoss(region.bossBattle)}
                    disabled={!isUnlocked}
                  >
                    <Swords className="w-3.5 h-3.5 mr-1" />
                    {isBossDefeated ? 'Replay Boss' : 'Fight Boss'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Boss Battle Modal Popup */}
        {selectedBoss && (
          <BossBattleModal
            boss={selectedBoss}
            isOpen={Boolean(selectedBoss)}
            onClose={() => setSelectedBoss(null)}
          />
        )}
      </div>
    </div>
  );
};
