import React, { useState } from 'react';
import { WORLD_REGIONS } from '../curriculum/curriculumData';
import { CodeProblem } from '../types/curriculum';
import { CodeEditorPanel } from '../components/code/CodeEditorPanel';
import { Badge } from '../components/ui/Badge';
import { Code2, Sparkles, Filter } from 'lucide-react';

export const CodingPlaygroundPage: React.FC = () => {
  const allProblems: CodeProblem[] = WORLD_REGIONS.flatMap((r) => [
    ...r.topics.map((t) => t.codeProblem),
    ...(r.bossBattle.stages.filter(s => s.codeProblem).map(s => s.codeProblem!))
  ]);

  const [selectedProblem, setSelectedProblem] = useState<CodeProblem>(allProblems[0]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredProblems = allProblems.filter((p) => {
    if (filterDifficulty === 'all') return true;
    return p.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="cyan">MONACO CODING ARENA</Badge>
              <Badge variant="violet">Java, Python, C++, JS</Badge>
            </div>
            <h1 className="text-3xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
              <Code2 className="w-8 h-8 text-cyan-400" /> Coding Playground
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Write, compile, test, and benchmark your algorithmic implementations with real test-case runners.
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-2" />
            {(['all', 'easy', 'medium'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-3 py-1 rounded-xl capitalize font-semibold transition-colors ${
                  filterDifficulty === diff
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredProblems.map((prob) => {
            const isSelected = selectedProblem.id === prob.id;
            return (
              <button
                key={prob.id}
                onClick={() => setSelectedProblem(prob)}
                className={`px-4 py-2 rounded-2xl border text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-glow-cyan'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${prob.difficulty === 'Easy' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>{prob.title}</span>
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
