import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Map, 
  Zap, 
  CheckCircle, 
  Brain, 
  Code2, 
  Layers, 
  Flame, 
  Trophy 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArraySortingArena } from '../components/visualizers/ArraySortingArena';
import { WORLD_REGIONS } from '../curriculum/curriculumData';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-800 dark:text-slate-100">
      {/* Hero Section with Cinematic Motion */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0080FF]/15 border border-[#0080FF]/40 text-[#0060DF] dark:text-[#60A5FA] text-xs font-mono font-semibold uppercase tracking-wider mb-6 sm:mb-8 shadow-sm dark:shadow-glass-electric backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#20B2AA] animate-pulse" />
            <span>LEARN → VISUALIZE → PLAY → CODE → MASTER</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl text-slate-900 dark:text-slate-100 leading-[1.15] mb-5 sm:mb-6"
          >
            Stop Memorizing DSA.{' '}
            <span className="bg-gradient-to-r from-[#20B2AA] via-[#0080FF] to-[#FF1493] bg-clip-text text-transparent">
              Start Playing It.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10 px-2"
          >
            Master Data Structures & Algorithms from beginner to MAANG-ready through interactive visual games,
            boss battles, coding arenas, and real-time algorithmic simulations.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto"
          >
            <Link to="/map" className="w-full sm:w-auto">
              <Button variant="neon" size="lg" className="w-full sm:w-auto px-8 text-base shadow-glass-electric">
                Start Your Quest <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/map" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 text-base">
                <Map className="w-5 h-5 mr-2 text-[#0080FF]" />
                Explore Algorithm Map
              </Button>
            </Link>
          </motion.div>

          {/* Interactive Live Preview Hero Element */}
          <motion.div 
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl rounded-[28px] border border-slate-200/90 dark:border-white/[0.2] bg-white/80 dark:bg-white/[0.05] p-3 sm:p-6 backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 dark:border-white/[0.12] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF1493]/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#20B2AA]/80 shadow-sm" />
                <span className="text-xs font-mono text-slate-500 dark:text-slate-300 ml-2">
                  interactive_sorting_arena.sim
                </span>
              </div>
              <Badge variant="teal" size="sm">LIVE PLAYABLE DEMO</Badge>
            </div>
            <ArraySortingArena />
          </motion.div>
        </div>
      </section>

      {/* Philosophy / Features Grid */}
      <section className="py-16 sm:py-20 bg-slate-100/50 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/[0.08] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="royal" className="mb-3">THE GAMIFIED ROADMAP</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Why Engineers Learn 5x Faster With DSA Gamly
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-3">
              Traditional leetcode grinding teaches rote memorization. DSA Gamly builds genuine algorithm intuition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card glow="electric" className="p-6 sm:p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#0080FF]/15 border border-[#0080FF]/40 flex items-center justify-center text-[#0080FF] mb-5 shadow-sm dark:shadow-glass-electric">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Real Algorithmic Logic
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Zero fake animations. Every bar swap, pointer jump, and matrix state is computed by real, deterministic algorithm step engines.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card glow="royal" className="p-6 sm:p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#8B00FF]/15 border border-[#8B00FF]/40 flex items-center justify-center text-[#8B00FF] dark:text-[#C084FC] mb-5 shadow-sm dark:shadow-glass-royal">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Epic Region Boss Battles
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Face the Complexity Sentinel, The Array Golem, and The Sorting Sphinx in multi-stage boss fights testing concept, visual strategy, and code.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card glow="pink" className="p-6 sm:p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#FF1493]/15 border border-[#FF1493]/40 flex items-center justify-center text-[#FF1493] dark:text-[#F472B6] mb-5 shadow-sm dark:shadow-glass-pink">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Active Spaced Repetition
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your mistakes are automatically logged to your private Error Notebook, turning tricky edge cases into permanent mastery.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* World Map Regions Preview */}
      <section className="py-16 sm:py-20 bg-transparent border-t border-slate-200/80 dark:border-white/[0.08] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <Badge variant="teal" className="mb-2">12 UNLOCKABLE REALMS</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Explore The Algorithm Map
              </h2>
            </div>
            <Link to="/map">
              <Button variant="secondary" size="sm">
                View Full Map <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORLD_REGIONS.slice(0, 6).map((region, idx) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card glow="electric" interactive className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#0080FF]">
                        REGION 0{region.number}
                      </span>
                      <Badge variant="royal" size="sm">
                        Level {region.requiredLevel}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {region.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                      {region.tagline}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {region.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/[0.1] flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Boss: {region.bossBattle.name}
                    </span>
                    <Link to={`/lesson/${region.topics[0].id}`}>
                      <span className="text-xs text-[#0080FF] dark:text-[#20B2AA] font-bold hover:underline">
                        Enter →
                      </span>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-slate-100/50 dark:bg-white/[0.01] border-t border-slate-200/80 dark:border-white/[0.08] backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: 'What languages does DSA Gamly support?',
                a: 'Java is our primary interview curriculum focus, alongside JavaScript, Python, and C++. You can view implementations in all four languages and solve coding challenges in the editor.',
              },
              {
                q: 'Do I need any previous DSA experience?',
                a: 'Not at all! Region 1 (Coding Village) starts from absolute zero: Big-O foundations, call stack behavior, and memory models.',
              },
              {
                q: 'Is my progress saved without an account?',
                a: 'Yes! Guest mode automatically saves your XP, level, unlocked achievements, daily quests, and Error Notebook to your browser storage. Connect Supabase anytime for cloud synchronization.',
              },
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-[20px] bg-white/80 dark:bg-white/[0.05] border border-slate-200/90 dark:border-white/[0.15] backdrop-blur-xl shadow-sm dark:shadow-glass transition-all hover:bg-white dark:hover:bg-white/[0.09] hover:border-slate-300 dark:hover:border-white/[0.25]"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 dark:border-white/[0.08] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-10 rounded-[28px] bg-white/85 dark:bg-white/[0.05] border border-slate-200/90 dark:border-white/[0.2] backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_60px_rgba(0,128,255,0.25)] relative overflow-hidden"
          >
            <div className="text-4xl mb-4">⚔️</div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
              Your Algorithm Quest Awaits.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Level up from absolute beginner to algorithm wizard with DSA Gamly. Start playing right now.
            </p>
            <Link to="/map">
              <Button variant="neon" size="lg" className="px-8 sm:px-10 text-base shadow-glass-electric">
                Enter The World Map <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
