import React, { useState } from 'react';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { CodeProblem } from '../types/curriculum';
import { CodeEditorPanel } from '../components/code/CodeEditorPanel';
import { Badge } from '../components/ui/Badge';
import { Code2, Filter, Zap } from 'lucide-react';

export const CodingPlaygroundPage: React.FC = () => {
  const allProblems: CodeProblem[] = WORLD_REGIONS.flatMap((r) => [
    ...r.topics.map((t) => t.codeProblem),
    ...(r.bossBattle.stages.filter(s => s.codeProblem).map(s => s.codeProblem!))
  ]);

  const [selectedProblem, setSelectedProblem] = useState<CodeProblem>(allProblems[0]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredProblems = allProblems.filter((p) => {
    if (filterDifficulty === 'all') return true;
    if (filterDifficulty === 'warm-up') return p.difficulty.toLowerCase() === 'easy';
    if (filterDifficulty === 'chaos mode') return p.difficulty.toLowerCase() === 'medium';
    if (filterDifficulty === 'boss fight') return p.difficulty.toLowerCase() === 'hard';
    return true;
  });

  return (
    <div className="min-h-screen text-[#111111] dark:text-[#F5F0E8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-[#111111] dark:border-[#F5F0E8] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-[#C6FF00] text-[#111111] font-display font-black text-xs uppercase border border-[#111111] shadow-[2px_2px_0px_#111111] -rotate-1">
                MONACO CHAOS ARENA
              </span>
              <span className="px-2 py-0.5 bg-[#FF2DAA] text-[#111111] font-mono text-[11px] font-bold border border-[#111111]">
                JAVA • JS • PYTHON • C++
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase flex items-center gap-2.5">
              <Zap className="w-8 h-8 text-[#FF5C00] fill-[#FF5C00]" /> CHAOS CODE LAB
            </h1>
            <p className="font-sans text-xs sm:text-sm font-bold opacity-80 mt-1">
              Write, benchmark, and defeat authentic algorithm test suites with zero fake mock results.
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 p-1 border-2 border-[#111111] bg-white dark:bg-[#1e1e1e] self-start sm:self-auto font-display text-xs font-black uppercase">
            <Filter className="w-3.5 h-3.5 ml-1 mr-1 text-[#FF2DAA]" />
            {[
              { id: 'all', label: 'ALL' },
              { id: 'warm-up', label: 'WARM-UP' },
              { id: 'chaos mode', label: 'CHAOS MODE' },
              { id: 'boss fight', label: 'BOSS FIGHT' }
            ].map((diff) => (
              <button
                key={diff.id}
                onClick={() => setFilterDifficulty(diff.id)}
                className={`px-3 py-1 border transition-all ${
                  filterDifficulty === diff.id
                    ? 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]'
                    : 'border-transparent text-inherit opacity-70 hover:opacity-100'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredProblems.map((prob) => {
            const isSelected = selectedProblem.id === prob.id;
            const diffTag = prob.difficulty === 'Easy' ? 'WARM-UP' : prob.difficulty === 'Medium' ? 'CHAOS' : 'BOSS';
            const diffColor = prob.difficulty === 'Easy' ? 'bg-[#C6FF00]' : prob.difficulty === 'Medium' ? 'bg-[#FF5C00]' : 'bg-[#FF2DAA]';

            return (
              <button
                key={prob.id}
                onClick={() => setSelectedProblem(prob)}
                className={`px-3 py-1.5 border-2 border-[#111111] text-xs font-display font-black uppercase shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#FFF200] text-[#111111] shadow-[3px_3px_0px_#111111] -translate-y-0.5'
                    : 'bg-white dark:bg-[#202020] text-inherit opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 border border-[#111111] ${diffColor}`} />
                  <span>{prob.title}</span>
                  <span className="text-[10px] font-mono opacity-60">[{diffTag}]</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Editor Panel */}
        <CodeEditorPanel problem={selectedProblem} />
      </div>
    </div>
  );
};

export default CodingPlaygroundPage;
