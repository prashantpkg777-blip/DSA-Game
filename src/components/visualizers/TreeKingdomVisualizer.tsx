import React, { useState, useEffect } from 'react';
import { generateBSTSearchSteps, generateTreeTraversalSteps, createSampleBST } from '../../algorithms/trees/treeAlgorithms';
import { TreeStep } from '../../types/algorithm';
import { StepController } from './StepController';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

export const TreeKingdomVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'search' | 'traversal'>('search');
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder' | 'bfs'>('inorder');
  const [searchTarget, setSearchTarget] = useState<number>(7);
  const [steps, setSteps] = useState<TreeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(900);

  useEffect(() => {
    let generated: TreeStep[] = [];
    if (mode === 'search') {
      generated = generateBSTSearchSteps(searchTarget);
    } else {
      generated = generateTreeTraversalSteps(traversalType);
    }
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [mode, traversalType, searchTarget]);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            confetti({ particleCount: 50, spread: 60 });
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speedMs, steps.length]);

  const currentStep = steps[currentStepIndex] || {
    stepIndex: 0,
    nodes: createSampleBST(),
    rootId: 'node-10',
    currentNodeId: null,
    visitedNodeIds: [],
    explanation: 'Tree Kingdom initialized.',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'search' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMode('search')}
          >
            🔍 BST Search
          </Button>
          <Button
            variant={mode === 'traversal' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMode('traversal')}
          >
            🌿 Tree Traversals
          </Button>
        </div>

        {mode === 'search' ? (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono">Target:</span>
            {[2, 7, 12, 15, 20, 99].map((t) => (
              <button
                key={t}
                onClick={() => setSearchTarget(t)}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  searchTarget === t ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs">
            {(['inorder', 'preorder', 'postorder', 'bfs'] as const).map((trav) => (
              <button
                key={trav}
                onClick={() => setTraversalType(trav)}
                className={`px-2.5 py-1 rounded-lg uppercase text-[11px] font-bold font-mono transition-all ${
                  traversalType === trav
                    ? 'bg-violet-600 text-white shadow-glow-violet'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {trav}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Tree SVG Canvas */}
      <div className="relative w-full h-[320px] bg-slate-950 rounded-3xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <svg className="w-full h-full max-w-[500px]" viewBox="0 0 500 260">
          {/* Edges */}
          {Object.values(currentStep.nodes).map((node) => {
            const left = node.leftId ? currentStep.nodes[node.leftId] : null;
            const right = node.rightId ? currentStep.nodes[node.rightId] : null;

            return (
              <g key={`edges-${node.id}`}>
                {left && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={left.x}
                    y2={left.y}
                    stroke="#334155"
                    strokeWidth="3"
                  />
                )}
                {right && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={right.x}
                    y2={right.y}
                    stroke="#334155"
                    strokeWidth="3"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {Object.values(currentStep.nodes).map((node) => {
            const isCurr = currentStep.currentNodeId === node.id;
            const isVisited = currentStep.visitedNodeIds.includes(node.id);
            const isTarget = node.isTarget;

            let fill = '#0F172A';
            let stroke = '#475569';
            let textFill = '#E2E8F0';

            if (isTarget) {
              fill = '#059669';
              stroke = '#34D399';
              textFill = '#FFFFFF';
            } else if (isCurr) {
              fill = '#0284C7';
              stroke = '#38BDF8';
              textFill = '#FFFFFF';
            } else if (isVisited) {
              fill = '#7C3AED';
              stroke = '#A78BFA';
              textFill = '#FFFFFF';
            }

            return (
              <g key={`node-${node.id}`} className="cursor-pointer transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCurr || isTarget ? '22' : '18'}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                <text
                  x={node.x}
                  y={node.y ? node.y + 5 : 0}
                  textAnchor="middle"
                  fill={textFill}
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Level order queue display if BFS */}
        {currentStep.queueState && (
          <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span className="text-slate-400">BFS Queue:</span>
            <span className="text-cyan-400 font-bold">[{currentStep.queueState.join(', ') || 'empty'}]</span>
          </div>
        )}
      </div>

      {/* Step Controller */}
      <StepController
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        speedMs={speedMs}
        explanation={currentStep.explanation}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
        onPrev={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
        onReset={() => {
          setIsPlaying(false);
          setCurrentStepIndex(0);
        }}
        onSpeedChange={(ms) => setSpeedMs(ms)}
      />
    </div>
  );
};
