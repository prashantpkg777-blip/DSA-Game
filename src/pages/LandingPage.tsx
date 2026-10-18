import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Flame, 
  Map, 
  Brain, 
  ShieldAlert, 
  Terminal, 
  Sparkles,
  Code2,
  Swords,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArraySortingArena } from '../components/visualizers/ArraySortingArena';

export const LandingPage: React.FC = () => {
  const chaosWorlds = [
    { num: '01', name: 'ARRAY CITY', theme: 'bg-[#C6FF00] text-[#111111]', desc: 'Traversal, sorting, two pointers, sliding window.', boss: 'The Array Golem', id: 'bubble-sort' },
    { num: '02', name: 'LINKED LAB', theme: 'bg-[#304FFE] text-[#F5F0E8]', desc: 'Singly & doubly lists, fast/slow pointers, cycle detection.', boss: 'Pointer Hydra', id: 'linked-list-reversal' },
    { num: '03', name: 'RECURSION REALM', theme: 'bg-[#FF2DAA] text-[#111111]', desc: 'Call stacks, backtracking, subsets & permutations.', boss: 'Infinite Loop Demon', id: 'fibonacci-recursion' },
    { num: '04', name: 'STACK & QUEUE ARENA', theme: 'bg-[#FF5C00] text-[#111111]', desc: 'Monotonic stacks, parentheses, priority queues.', boss: 'Stack Overflower', id: 'stack-tower' },
    { num: '05', name: 'TREE TOPIA', theme: 'bg-[#B9A0FF] text-[#111111]', desc: 'BST traversals, heaps, tries, LCA.', boss: 'Binary Behemoth', id: 'bst-operations' },
    { num: '06', name: 'GRAPH GLITCH', theme: 'bg-[#C6FF00] text-[#111111]', desc: 'BFS, DFS, Dijkstra, topological sort.', boss: 'Cyclic Overlord', id: 'graph-traversal' },
    { num: '07', name: 'DP DIMENSION', theme: 'bg-[#FFF200] text-[#111111]', desc: 'Memoization, tabulation, knapsack, LCS.', boss: 'Optimal Substructure', id: 'dp-knapsack' },
    { num: '08', name: 'FINAL BOSS', theme: 'bg-[#111111] text-[#FF2DAA] border-[#FF2DAA]', desc: 'Greedy, bit manipulation & MAANG interview gauntlet.', boss: 'The Algorithm Archon', id: 'sliding-window-max' },
  ];

  return (
    <div className="flex flex-col min-h-screen text-[#111111] dark:text-[#F5F0E8] overflow-x-hidden">
      {/* Gen-Z Chaos Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-16 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Top Marquee Sticker Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] font-display font-black text-xs uppercase tracking-wider mb-6 hover:rotate-0 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#FFF200] text-[#111111]" />
            <span>LESS THEORY. MORE ALGORITHM MAYHEM.</span>
          </motion.div>

          {/* Floating Sticker: 100+ Challenges (Left) */}
          <div className="hidden lg:block absolute left-4 top-16 -rotate-12 select-none pointer-events-none">
            <div className="px-3 py-1.5 bg-[#C6FF00] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] font-display font-black text-sm uppercase">
              ★ 100+ CHALLENGES
            </div>
            <div className="font-mono text-[11px] font-black text-[#FF2DAA] mt-1 ml-2">
              // NO CAP, ALL SKILL
            </div>
          </div>

          {/* Floating Sticker: Rotating BIG BRAIN ENERGY (Right) */}
          <div className="hidden lg:block absolute right-4 top-12 rotate-12 select-none">
            <div className="w-24 h-24 rounded-full bg-[#FFF200] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] flex flex-col items-center justify-center p-1 font-display font-black text-[10px] uppercase text-center animate-spin-slow">
              <span>★ BIG BRAIN ★</span>
              <span className="text-sm font-black">ENERGY</span>
              <span>⚡⚡⚡</span>
            </div>
          </div>

          {/* Main Giant Headlines */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mb-6"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.95]">
              <span className="block text-inherit">STOP MEMORIZING.</span>
              <span className="inline-block mt-2 px-3 py-1 bg-[#C6FF00] text-[#111111] border-3 border-[#111111] shadow-[6px_6px_0px_#111111] -rotate-1">
                START BREAKING
              </span>
              <span className="block mt-2 text-[#FF2DAA] dark:text-[#FF2DAA] underline decoration-wavy decoration-[#C6FF00]">
                ALGORITHMS.
              </span>
            </h1>
          </motion.div>

          {/* Supporting Text */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl font-sans font-bold opacity-90 leading-relaxed mb-8 px-2"
          >
            Learn Data Structures and Algorithms by playing, experimenting, and defeating increasingly difficult coding challenges. LeetCode meets arcade mayhem.
          </motion.p>

          {/* Primary CTA Buttons with Doodle Arrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 sm:mb-16 relative"
          >
            <Link to="/map" className="w-full sm:w-auto">
              <Button variant="lime" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 shadow-[6px_6px_0px_#111111] hover:rotate-1">
                ENTER THE CHAOS <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link to="/map" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 shadow-[6px_6px_0px_#111111] hover:-rotate-1">
                <Map className="w-5 h-5 mr-2 text-[#304FFE]" />
                EXPLORE THE MAP
              </Button>
            </Link>

            {/* Doodle Arrow pointing to CTA */}
            <div className="hidden md:flex absolute -right-28 -top-8 flex-col items-center -rotate-12 select-none pointer-events-none">
              <span className="font-mono text-xs font-black text-[#FF5C00] uppercase tracking-wider bg-[#FFF200] px-2 py-0.5 border border-[#111111]">
                CLICK HERE FR FR ↵
              </span>
              <span className="text-2xl text-[#FF5C00]">↙</span>
            </div>
          </motion.div>

          {/* Gen-Z Pixel Mascot & Algorithm Creature */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <div className="p-3 bg-[#304FFE] text-[#F5F0E8] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] -rotate-3 flex items-center gap-2">
              <span className="text-2xl">👾</span>
              <div className="text-left font-mono text-xs font-bold leading-tight">
                <div className="text-[#C6FF00]">BOT: GLITCH-01</div>
                <div>"I EAT O(N²) FOR BREAKFAST"</div>
              </div>
            </div>
            <div className="px-3 py-2 bg-[#FFF200] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] rotate-2 font-display font-black text-xs uppercase">
              NO MORE BORING DSA 💥
            </div>
          </div>

          {/* Interactive Live Sorting Arena inside Brutalist Arcade Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full max-w-5xl border-3 md:border-4 border-[#111111] bg-[#F5F0E8] dark:bg-[#181818] p-4 sm:p-6 shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#C6FF00] rounded-xl text-left"
          >
            <div className="flex flex-wrap items-center justify-between mb-4 pb-3 border-b-3 border-[#111111] dark:border-[#F5F0E8] gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-[#FF2DAA] border border-[#111111]" />
                <div className="w-3.5 h-3.5 bg-[#FFF200] border border-[#111111]" />
                <div className="w-3.5 h-3.5 bg-[#C6FF00] border border-[#111111]" />
                <span className="font-mono text-xs font-bold text-[#111111] dark:text-[#C6FF00] ml-2">
                  CHAOS_SORT_ARENA.EXE
                </span>
              </div>
              <Badge variant="lime" size="sm" tilt>
                INTERACTIVE ARCADE SIM
              </Badge>
            </div>
            <ArraySortingArena />
          </motion.div>
        </div>
      </section>

      {/* Ticker / Infinite Marquee */}
      <div className="bg-[#111111] text-[#C6FF00] border-y-3 border-[#111111] dark:border-[#F5F0E8] py-2 overflow-hidden font-display font-black text-base uppercase tracking-wider select-none">
        <div className="flex w-max animate-marquee space-x-12">
          <span>ARRAYS ✳ RECURSION ✳ TREES ✳ GRAPHS ✳ DYNAMIC PROGRAMMING ✳ BINARY SEARCH ✳ STACKS & QUEUES ✳ TWO POINTERS ✳ SLIDING WINDOW ✳</span>
          <span>ARRAYS ✳ RECURSION ✳ TREES ✳ GRAPHS ✳ DYNAMIC PROGRAMMING ✳ BINARY SEARCH ✳ STACKS & QUEUES ✳ TWO POINTERS ✳ SLIDING WINDOW ✳</span>
        </div>
      </div>

      {/* The 8 Chaos Worlds Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] font-display font-black text-xs uppercase mb-2 -rotate-1">
              THE 8 WORLDS OF CHAOS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
              PROGRESSION MAP
            </h2>
          </div>
          <Link to="/map">
            <Button variant="lime" size="md">
              VIEW FULL WORLD MAP <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chaosWorlds.map((world, idx) => (
            <motion.div
              key={world.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card interactive className="h-full flex flex-col justify-between p-5 border-3 border-[#111111] shadow-[5px_5px_0px_#111111]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-black text-xs px-2 py-0.5 bg-[#111111] text-[#C6FF00]">
                      WORLD {world.num}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#FF5C00]">
                      BOSS FIGHT
                    </span>
                  </div>
                  <h3 className={`font-display font-black text-base uppercase px-2 py-1 mb-2 border-2 border-[#111111] inline-block ${world.theme}`}>
                    {world.name}
                  </h3>
                  <p className="font-sans text-xs font-medium opacity-80 leading-relaxed mb-4">
                    {world.desc}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[#111111] dark:border-[#333] flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#FF2DAA]">
                    👹 {world.boss}
                  </span>
                  <Link to={`/lesson/${world.id}`}>
                    <span className="font-display font-black text-xs uppercase text-[#304FFE] dark:text-[#C6FF00] hover:underline">
                      PLAY →
                    </span>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manifesto / Why DSA Chaos Hits Different */}
      <section className="py-16 sm:py-20 border-t-3 border-[#111111] dark:border-[#F5F0E8] bg-[#F5F0E8] dark:bg-[#141414] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 bg-[#FFF200] text-[#111111] border-2 border-[#111111] font-display font-black text-xs uppercase mb-3 rotate-1">
              BUILT FOR CODERS WHO HATE SNOOZEFESTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
              WHY DSA CHAOS HITS DIFFERENT
            </h2>
            <p className="font-sans font-bold text-sm sm:text-base opacity-80 mt-3">
              Traditional platforms make you memorize arbitrary answers. We teach you how algorithms actually execute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card glow="lime" className="p-6">
              <div className="w-12 h-12 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center font-display font-black text-xl mb-4 -rotate-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl uppercase mb-2">
                100% Deterministic Engine
              </h3>
              <p className="font-sans text-xs sm:text-sm font-medium opacity-80 leading-relaxed">
                Zero fake visual trickery. Every pointer shift, stack pop, and matrix cell calculation is executed by authentic algorithm code.
              </p>
            </Card>

            <Card glow="pink" className="p-6">
              <div className="w-12 h-12 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center font-display font-black text-xl mb-4 rotate-2">
                <Swords className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl uppercase mb-2">
                Boss Battle Gauntlets
              </h3>
              <p className="font-sans text-xs sm:text-sm font-medium opacity-80 leading-relaxed">
                Face the Complexity Sentinel, The Pointer Hydra, and The DP Archon in multi-stage boss fights testing logic, strategy, and syntax.
              </p>
            </Card>

            <Card glow="electric" className="p-6">
              <div className="w-12 h-12 bg-[#304FFE] text-[#F5F0E8] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center font-display font-black text-xl mb-4 -rotate-2">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl uppercase mb-2">
                Spaced Error Notebook
              </h3>
              <p className="font-sans text-xs sm:text-sm font-medium opacity-80 leading-relaxed">
                Every quiz mistake or code bug is automatically saved to your private Error Notebook, turning weak spots into permanent strengths.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 border-t-3 border-[#111111] dark:border-[#F5F0E8] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 bg-[#FF2DAA] text-[#111111] border-4 border-[#111111] shadow-[10px_10px_0px_#111111] -rotate-1">
            <div className="text-4xl mb-3">⚡💥⚡</div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight mb-4">
              READY TO MASTER THE CHAOS?
            </h2>
            <p className="font-sans font-bold text-sm sm:text-base max-w-xl mx-auto mb-8 opacity-90">
              Stop stressing over interviews. Level up your algorithmic thinking the arcade way.
            </p>
            <Link to="/map">
              <Button variant="lime" size="lg" className="px-8 py-4 text-base sm:text-lg border-3 border-[#111111] shadow-[5px_5px_0px_#111111] hover:rotate-1">
                ENTER THE CHAOS NOW →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
