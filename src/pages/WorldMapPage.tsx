import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  Swords, 
  ChevronRight, 
  ChevronDown,
  Boxes, 
  GitCommit, 
  Search, 
  Zap, 
  Layers, 
  Network, 
  Database, 
  Cpu, 
  Sparkles,
  Trophy,
  Filter,
  Flame,
  ArrowRight
} from 'lucide-react';
import { WORLD_REGIONS, getAllTopics } from '../curriculum/curriculumData';
import { BossBattle } from '../types/curriculum';
import { useUserStore } from '../stores/userStore';
import { Button } from '../components/ui/Button';
import { BossBattleModal } from '../components/gamification/BossBattleModal';

export const WorldMapPage: React.FC = () => {
  const [selectedBoss, setSelectedBoss] = useState<BossBattle | null>(null);
  const [freeExploration, setFreeExploration] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedWorldId, setExpandedWorldId] = useState<string | null>(null);

  const { profile, completedLessons, defeatedBosses } = useUserStore();

  const allTopics = useMemo(() => getAllTopics(), []);
  const totalTopicsCount = allTopics.length;
  const completedTopicsCount = allTopics.filter(t => completedLessons.includes(t.id)).length;
  const totalBossesCount = WORLD_REGIONS.length;
  const defeatedBossesCount = defeatedBosses.length;
  const overallProgressPercent = totalTopicsCount > 0 
    ? Math.round((completedTopicsCount / totalTopicsCount) * 100) 
    : 0;

  // Next recommended uncompleted topic
  const nextLesson = allTopics.find(t => !completedLessons.includes(t.id)) || allTopics[0];
  const nextLessonWorld = WORLD_REGIONS.find(r => r.topics.some(t => t.id === nextLesson?.id));

  // Region icons mapping
  const getRegionIcon = (idx: number) => {
    const icons = [
      <Boxes className="w-5 h-5 text-[#111111]" />,
      <GitCommit className="w-5 h-5 text-[#111111]" />,
      <Zap className="w-5 h-5 text-[#111111]" />,
      <Layers className="w-5 h-5 text-[#111111]" />,
      <Network className="w-5 h-5 text-[#111111]" />,
      <Database className="w-5 h-5 text-[#111111]" />,
      <Cpu className="w-5 h-5 text-[#111111]" />,
      <Sparkles className="w-5 h-5 text-[#111111]" />,
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
      'bg-[#00E5FF] text-[#111111]',
      'bg-[#FF3366] text-[#F5F0E8]',
    ];
    return colors[idx % colors.length];
  };

  // Filtered worlds and topics based on search and difficulty
  const filteredWorlds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return WORLD_REGIONS.map(region => {
      const matchingTopics = region.topics.filter(topic => {
        const matchesDiff = difficultyFilter === 'all' || topic.difficulty === difficultyFilter;
        if (!matchesDiff) return false;
        if (!query) return true;
        const matchesTitle = topic.title.toLowerCase().includes(query);
        const matchesDesc = topic.description.toLowerCase().includes(query);
        const matchesSubtopics = topic.subtopics?.some(st => st.toLowerCase().includes(query));
        const matchesRegion = region.name.toLowerCase().includes(query) || region.tagline.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || Boolean(matchesSubtopics) || matchesRegion;
      });

      return {
        ...region,
        matchingTopics,
        hasMatches: matchingTopics.length > 0 || (query ? region.name.toLowerCase().includes(query) : true)
      };
    }).filter(region => region.hasMatches && (difficultyFilter === 'all' || region.matchingTopics.length > 0));
  }, [searchQuery, difficultyFilter]);

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
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-[#FF2DAA] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111] -rotate-1">
                ALGORITHM QUEST OVERWORLD
              </span>
              <span className="px-2.5 py-0.5 bg-[#00E5FF] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111]">
                {WORLD_REGIONS.length} WORLDS • {totalTopicsCount} TOPICS
              </span>
              {freeExploration && (
                <span className="px-2 py-0.5 bg-[#C6FF00] text-[#111111] font-mono text-[11px] font-bold border border-[#111111]">
                  FREE EXPLORATION ACTIVE
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase">
              THE {WORLD_REGIONS.length} WORLDS OF ALGORITHM MAYHEM
            </h1>
            <p className="font-sans text-xs sm:text-sm font-bold opacity-80 mt-1 max-w-3xl">
              Traverse all 14 algorithmic domains from Big-O Foundations to Advanced Segment Trees and Competitive Bit Manipulation. Every topic features subtopic deep-dives, multi-question quizzes, and full code test benches.
            </p>
          </div>

          <button
            onClick={() => setFreeExploration(!freeExploration)}
            className="self-start md:self-auto px-4 py-2.5 font-display text-xs font-black uppercase tracking-wider bg-[#FFF200] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
          >
            {freeExploration ? '🔓 MODE: FREE EXPLORATION' : '🔒 MODE: STRICT RPG UNLOCK'}
          </button>
        </motion.div>

        {/* Global Progress & Next Lesson Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Summary Card */}
          <div className="lg:col-span-1 p-5 border-3 border-[#111111] bg-[#F5F0E8] dark:bg-[#1a1a1a] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#C6FF00] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#FF5C00]">
                  CAMPAIGN COMPLETION
                </span>
                <span className="font-display font-black text-xl text-[#FF2DAA]">
                  {overallProgressPercent}%
                </span>
              </div>
              <div className="w-full h-3 border-2 border-[#111111] bg-white dark:bg-[#111] overflow-hidden mb-4">
                <div 
                  className="h-full bg-[#C6FF00] transition-all duration-500 border-r-2 border-[#111111]"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-display">
                <div className="p-2 border border-[#111111] bg-white dark:bg-[#222]">
                  <span className="text-[10px] font-mono block opacity-70">TOPICS</span>
                  <span className="text-base font-black text-[#304FFE] dark:text-[#C6FF00]">
                    {completedTopicsCount}/{totalTopicsCount}
                  </span>
                </div>
                <div className="p-2 border border-[#111111] bg-white dark:bg-[#222]">
                  <span className="text-[10px] font-mono block opacity-70">BOSSES</span>
                  <span className="text-base font-black text-[#FF2DAA]">
                    {defeatedBossesCount}/{totalBossesCount}
                  </span>
                </div>
                <div className="p-2 border border-[#111111] bg-white dark:bg-[#222]">
                  <span className="text-[10px] font-mono block opacity-70">PLAYER LVL</span>
                  <span className="text-base font-black text-[#FF5C00]">
                    {profile.level}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Resume Next Topic Banner */}
          {nextLesson && (
            <div className="lg:col-span-2 p-5 border-3 border-[#111111] bg-[#C6FF00] text-[#111111] shadow-[4px_4px_0px_#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#111111] text-[#C6FF00] font-mono font-black text-[10px] uppercase">
                    ⚡ CURRENT OBJECTIVE
                  </span>
                  {nextLessonWorld && (
                    <span className="font-mono text-xs font-bold text-[#111111] opacity-90">
                      WORLD {String(nextLessonWorld.number).padStart(2, '0')}: {nextLessonWorld.name}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight">
                  {nextLesson.title}
                </h3>
                <p className="font-sans text-xs font-bold opacity-80 line-clamp-1 max-w-xl">
                  {nextLesson.description}
                </p>
              </div>

              <Link
                to={`/lesson/${nextLesson.id}`}
                className="px-5 py-3 border-2 border-[#111111] bg-[#111111] text-[#C6FF00] hover:bg-[#FF2DAA] hover:text-[#111111] font-display font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,0.3)] flex items-center gap-2 shrink-0 transition-all hover:-translate-y-0.5"
              >
                RESUME QUEST <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border-3 border-[#111111] bg-white dark:bg-[#181818] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#FFF200]">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#111111] dark:text-[#F5F0E8] opacity-60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 14 worlds, topics, subtopics (e.g. KMP, DSU, Knapsack, Dijkstra)..."
              className="w-full pl-9 pr-4 py-2 border-2 border-[#111111] dark:border-[#555] bg-[#F5F0E8] dark:bg-[#111] text-xs font-mono font-bold placeholder:opacity-50 focus:outline-none focus:border-[#FF2DAA]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#FF2DAA]"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 flex-wrap font-display text-xs font-black uppercase">
            <Filter className="w-3.5 h-3.5 mr-1 text-[#FF5C00]" />
            {[
              { id: 'all', label: 'ALL LEVELS' },
              { id: 'beginner', label: 'BEGINNER' },
              { id: 'intermediate', label: 'INTERMEDIATE' },
              { id: 'advanced', label: 'ADVANCED' },
            ].map(diff => (
              <button
                key={diff.id}
                onClick={() => setDifficultyFilter(diff.id as any)}
                className={`px-3 py-1.5 border-2 border-[#111111] transition-all ${
                  difficultyFilter === diff.id
                    ? 'bg-[#C6FF00] text-[#111111] shadow-[2px_2px_0px_#111111]'
                    : 'bg-[#F5F0E8] dark:bg-[#222] text-inherit opacity-80 hover:opacity-100 hover:bg-[#FFF200] hover:text-[#111111]'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorlds.map((region, idx) => {
            const isUnlocked = freeExploration || profile.level >= region.requiredLevel || region.unlockedByDefault;
            const isBossDefeated = defeatedBosses.includes(region.bossBattle.id);
            const completedCount = region.topics.filter(t => completedLessons.includes(t.id)).length;
            const isRegionMastered = completedCount === region.topics.length && isBossDefeated;
            const isExpanded = expandedWorldId === region.id;
            const displayTopics = region.matchingTopics || region.topics;

            return (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
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
                          WORLD {String(region.number).padStart(2, '0')}
                        </span>
                        <h3 className="font-display font-black text-lg uppercase leading-tight">
                          {region.name}
                        </h3>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <div className="flex items-center gap-1 text-[#111111] font-mono text-xs font-bold bg-[#FF2DAA] px-2 py-0.5 border border-[#111111]">
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
                  <div className="flex flex-col gap-2.5 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#FF2DAA] dark:text-[#C6FF00]">
                        TOPICS & SUBTOPICS ({displayTopics.length}):
                      </span>
                      <button
                        onClick={() => setExpandedWorldId(isExpanded ? null : region.id)}
                        className="text-[10px] font-mono font-bold text-[#304FFE] dark:text-[#FFF200] hover:underline flex items-center gap-0.5"
                      >
                        {isExpanded ? 'COLLAPSE' : 'EXPAND ALL'}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {displayTopics.map((topic) => {
                      const isDone = completedLessons.includes(topic.id);
                      return (
                        <div key={topic.id} className="flex flex-col gap-1">
                          <Link
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
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[9px] font-mono font-bold uppercase px-1 border border-[#111111] opacity-75">
                                {topic.difficulty}
                              </span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </Link>

                          {/* Subtopics pill cloud when expanded or searching */}
                          {(isExpanded || searchQuery) && topic.subtopics && topic.subtopics.length > 0 && (
                            <div className="flex flex-wrap gap-1 pl-4 pt-0.5 pb-1.5">
                              {topic.subtopics.map((sub, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[9px] font-mono font-medium px-1.5 py-0.5 bg-white dark:bg-[#2c2c2c] border border-[#111111] dark:border-[#444] text-inherit opacity-85"
                                >
                                  • {sub}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
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

        {/* Empty Search Result */}
        {filteredWorlds.length === 0 && (
          <div className="p-12 text-center border-3 border-[#111111] bg-[#F5F0E8] dark:bg-[#1a1a1a] shadow-[4px_4px_0px_#111111]">
            <p className="font-display font-black text-lg uppercase mb-2">
              NO WORLDS OR TOPICS MATCH "{searchQuery}"
            </p>
            <p className="font-mono text-xs opacity-70 mb-4">
              Try searching for general terms like "graph", "tree", "pointer", "dp", or reset the filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchQuery(''); setDifficultyFilter('all'); }}
            >
              RESET SEARCH FILTERS
            </Button>
          </div>
        )}

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
