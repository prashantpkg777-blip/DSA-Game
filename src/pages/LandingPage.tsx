import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="flex flex-col min-h-screen bg-transparent text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-8 shadow-glass-cyan backdrop-blur-md animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEARN → VISUALIZE → PLAY → CODE → MASTER</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl text-slate-100 leading-[1.1] mb-6 drop-shadow-md">
            Stop Memorizing DSA.{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Start Playing It.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
            Master Data Structures & Algorithms from beginner to MAANG-ready through interactive visual games,
            boss battles, coding arenas, and real-time algorithmic simulations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link to="/map">
              <Button variant="neon" size="lg" className="px-8 text-base shadow-glass-cyan">
                Start Your Quest <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="secondary" size="lg" className="px-8 text-base">
                <Map className="w-5 h-5 mr-2 text-cyan-400" />
                Explore Algorithm Map
              </Button>
            </Link>
          </div>

          {/* Interactive Live Preview Hero Element */}
          <div className="w-full max-w-5xl rounded-3xl border border-white/[0.18] bg-white/[0.04] p-4 sm:p-6 backdrop-blur-2xl shadow-glass">
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.1] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
                <span className="text-xs font-mono text-slate-300 ml-2">
                  interactive_sorting_arena.sim
                </span>
              </div>
              <Badge variant="cyan" size="sm">LIVE PLAYABLE DEMO</Badge>
            </div>
            <ArraySortingArena />
          </div>
        </div>
      </section>

      {/* Philosophy / Features Grid */}
      <section className="py-20 bg-white/[0.02] border-t border-white/[0.08] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="violet" className="mb-3">THE GAMIFIED ROADMAP</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
              Why Engineers Learn 5x Faster With DSA Gamly
            </h2>
            <p className="text-slate-300 text-sm mt-3">
              Traditional leetcode grinding teaches rote memorization. DSA Gamly builds genuine algorithm intuition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card glow="cyan" className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Real Algorithmic Logic
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Zero fake animations. Every bar swap, pointer jump, and matrix state is computed by real, deterministic algorithm step engines.
              </p>
            </Card>

            <Card glow="violet" className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Epic Region Boss Battles
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Face the Complexity Sentinel, The Array Golem, and The Sorting Sphinx in multi-stage boss fights testing concept, visual strategy, and code.
              </p>
            </Card>

            <Card glow="amber" className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Active Spaced Repetition
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your mistakes are automatically logged to your private Error Notebook, turning tricky edge cases into permanent mastery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* World Map Regions Preview */}
      <section className="py-20 bg-white/[0.02] border-t border-white/[0.08] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="emerald" className="mb-2">12 UNLOCKABLE REALMS</Badge>
              <h2 className="text-3xl font-bold text-slate-100">
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
            {WORLD_REGIONS.slice(0, 6).map((region) => (
              <Card key={region.id} glow="cyan" interactive className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      REGION 0{region.number}
                    </span>
                    <Badge variant="violet" size="sm">
                      Level {region.requiredLevel}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">
                    {region.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-3">
                    {region.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {region.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Boss: {region.bossBattle.name}
                  </span>
                  <Link to={`/lesson/${region.topics[0].id}`}>
                    <span className="text-xs text-cyan-400 font-bold hover:underline">
                      Enter →
                    </span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/[0.01] border-t border-white/[0.08] backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100">
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
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.05] border border-white/[0.12] backdrop-blur-xl shadow-glass transition-all hover:bg-white/[0.08] hover:border-white/[0.2]">
                <h3 className="text-base font-bold text-slate-100 mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 border-t border-white/[0.08] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-10 rounded-3xl bg-white/[0.04] border border-white/[0.16] backdrop-blur-2xl shadow-glass-cyan relative overflow-hidden">
            <div className="text-4xl mb-4">⚔️</div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mb-4">
              Your Algorithm Quest Awaits.
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
              Level up from absolute beginner to algorithm wizard with DSA Gamly. Start playing right now.
            </p>
            <Link to="/map">
              <Button variant="neon" size="lg" className="px-10 text-base shadow-glass-cyan">
                Enter The World Map <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
