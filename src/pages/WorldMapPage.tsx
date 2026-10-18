import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  Swords, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  Grid, 
  ArrowUpDown, 
  Link2, 
  Layers, 
  Network 
} from 'lucide-react';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { WorldRegion } from '../types/curriculum';
import { useUserStore } from '../stores/userStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BossBattleModal } from '../components/gamification/BossBattleModal';

export const WorldMapPage: React.FC = () => {
  const { profile, completedLessons, defeatedBosses } = useUserStore();
  const [selectedBoss, setSelectedBoss] = useState<WorldRegion['bossBattle'] | null>(null);
  const [freeExploration, setFreeExploration] = useState(true);

  const getRegionIcon = (name: string) => {
    switch (name) {
      case 'Coding Village': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'Array Kingdom': return <Grid className="w-5 h-5 text-emerald-400" />;
      case 'Sorting Desert': return <ArrowUpDown className="w-5 h-5 text-amber-400" />;
      case 'Linked List Forest': return <Link2 className="w-5 h-5 text-purple-400" />;
      case 'Stack & Queue Citadel': return <Layers className="w-5 h-5 text-rose-400" />;
      default: return <Network className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="cyan">ALGORITHM QUEST OVERWORLD</Badge>
              {freeExploration && <Badge variant="emerald">Free Exploration Active</Badge>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              The World of Data Structures & Algorithms
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Journey through each realm, master its algorithms, and defeat the guardian boss to claim your glory.
            </p>
          </div>

          <button
            onClick={() => setFreeExploration(!freeExploration)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 transition-colors"
          >
            {freeExploration ? '🔓 Mode: Free Exploration' : '🔒 Mode: Strict RPG Unlock'}
          </button>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORLD_REGIONS.map((region) => {
            const isUnlocked = freeExploration || profile.level >= region.requiredLevel || region.unlockedByDefault;
            const isBossDefeated = defeatedBosses.includes(region.bossBattle.id);
            const completedCount = region.topics.filter(t => completedLessons.includes(t.id)).length;
            const isRegionMastered = completedCount === region.topics.length && isBossDefeated;

            return (
              <div
                key={region.id}
                className={`relative rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div>
                  {/* Region Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                        {getRegionIcon(region.name)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                          Region {region.number}
                        </span>
                        <h3 className="text-lg font-bold text-slate-100 leading-snug">
                          {region.name}
                        </h3>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <div className="flex items-center gap-1 text-slate-500 text-xs font-mono">
                        <Lock className="w-3.5 h-3.5" /> Lvl {region.requiredLevel}
                      </div>
                    ) : isRegionMastered ? (
                      <Badge variant="emerald" size="sm">MASTERED</Badge>
                    ) : (
                      <span className="text-xs font-mono text-slate-400">
                        {completedCount}/{region.topics.length} Done
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {region.description}
                  </p>

                  {/* Topics List */}
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Missions in this Realm:
                    </span>
                    {region.topics.map((topic) => {
                      const isDone = completedLessons.includes(topic.id);
                      return (
                        <Link
                          key={topic.id}
                          to={`/lesson/${topic.id}`}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                            )}
                            <span className="font-medium">{topic.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Boss Battle Trigger */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{region.bossBattle.avatar}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-rose-300">
                        {region.bossBattle.name}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400">
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
              </div>
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
