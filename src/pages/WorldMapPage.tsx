import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  Swords, 
  ChevronRight, 
  Boxes, 
  GitCommit, 
  Search, 
  Zap, 
  Layers, 
  Network, 
  Database, 
  Cpu, 
  Sparkles
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

  const getRegionIcon = (idx: number) => {
    const icons = [
      <Boxes className="w-5 h-5 text-[#111111]" />,
      <GitCommit className="w-5 h-5 text-[#111111]" />,
      <Zap className="w-5 h-5 text-[#111111]" />,
      <Layers className="w-5 h-5 text-[#111111]" />,
      <Network className="w-5 h-5 text-[#111111]" />,
      <Database className="w-5 h-5 text-[#111111]" />,
    ];
    return icons[idx % icons.length];
  };

  const getRegionColor = (idx: number) => {
    const colors = [
      'bg-[#C6FF00]',
      'bg-[#304FFE] text-[#F5F0E8]',
      'bg-[#FF2DAA]',
      'bg-[#FF5C00]',
      'bg-[#B9A0FF]',
      'bg-[#FFF200]',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="min-h-screen text-[#111111] dark:text-[#F5F0E8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-[#111111] dark:border-[#F5F0E8] pb-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-[#FF2DAA] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111] -rotate-1">
                ALGORITHM QUEST OVERWORLD
              </span>
              {freeExploration && (
                <span className="px-2 py-0.5 bg-[#C6FF00] text-[#111111] font-mono text-[11px] font-bold border border-[#111111]">
                  FREE EXPLORATION
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase">
              THE 8 WORLDS OF ALGORITHM MAYHEM
            </h1>
            <p className="font-sans text-xs sm:text-sm font-bold opacity-80 mt-1">
              Traverse the chaotic realms, conquer real data structure simulators, and crush guardian bosses.
            </p>
          </div>

          <button
            onClick={() => setFreeExploration(!freeExploration)}
            className="self-start md:self-auto px-3.5 py-2 font-display text-xs font-black uppercase tracking-wider bg-[#FFF200] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
          >
            {freeExploration ? '🔓 MODE: FREE EXPLORATION' : '🔒 MODE: STRICT RPG UNLOCK'}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`relative border-3 border-[#111111] flex flex-col justify-between p-6 transition-all ${
                  isUnlocked
                    ? 'bg-[#F5F0E8] dark:bg-[#181818] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#C6FF00] hover:-translate-x-1 hover:-translate-y-1'
                    : 'bg-[#e2ddd5] dark:bg-[#121212] opacity-60 shadow-[3px_3px_0px_#111111]'
                }`}
              >
                <div>
                  {/* Region Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center -rotate-2 ${getRegionColor(idx)}`}>
                        {getRegionIcon(idx)}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-black uppercase text-[#FF5C00] tracking-wider">
                          WORLD 0{region.number}
                        </span>
                        <h3 className="font-display font-black text-lg uppercase leading-tight">
                          {region.name}
                        </h3>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <div className="flex items-center gap-1 text-[#111111] dark:text-[#F5F0E8] font-mono text-xs font-bold bg-[#FF2DAA] px-2 py-0.5 border border-[#111111]">
                        <Lock className="w-3.5 h-3.5" /> LVL {region.requiredLevel}
                      </div>
                    ) : isRegionMastered ? (
                      <span className="font-display font-black text-[10px] px-2 py-0.5 bg-[#C6FF00] text-[#111111] border border-[#111111]">
                        MASTERED
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold opacity-80">
                        {completedCount}/{region.topics.length} DONE
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs font-medium opacity-80 mb-4 leading-relaxed">
                    {region.description}
                  </p>

                  {/* Topics List */}
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#FF2DAA] dark:text-[#C6FF00]">
                      CHALLENGES IN THIS WORLD:
                    </span>
                    {region.topics.map((topic) => {
                      const isDone = completedLessons.includes(topic.id);
                      return (
                        <Link
                          key={topic.id}
                          to={`/lesson/${topic.id}`}
                          className={`p-2.5 border-2 border-[#111111] flex items-center justify-between text-xs transition-all font-display ${
                            isDone
                              ? 'bg-[#C6FF00] text-[#111111] font-bold shadow-[2px_2px_0px_#111111]'
                              : 'bg-white dark:bg-[#202020] text-inherit hover:bg-[#FFF200] hover:text-[#111111] hover:shadow-[2px_2px_0px_#111111]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                            ) : (
                              <div className="w-2.5 h-2.5 bg-[#FF5C00] border border-[#111111] shrink-0" />
                            )}
                            <span className="font-bold tracking-tight">{topic.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Boss Battle Trigger */}
                <div className="pt-4 border-t-2 border-[#111111] dark:border-[#333] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{region.bossBattle.avatar}</span>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-xs uppercase text-[#FF2DAA]">
                        {region.bossBattle.name}
                      </span>
                      <span className="font-mono text-[10px] font-black text-[#FF5C00]">
                        +{region.bossBattle.xpReward} XP
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={isBossDefeated ? 'secondary' : 'pink'}
                    size="sm"
                    onClick={() => setSelectedBoss(region.bossBattle)}
                    disabled={!isUnlocked}
                  >
                    <Swords className="w-3.5 h-3.5 mr-1" />
                    {isBossDefeated ? 'REPLAY' : 'FIGHT BOSS'}
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

export default WorldMapPage;
