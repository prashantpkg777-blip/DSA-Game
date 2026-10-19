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
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
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
            <span className="font-mono font-bold opacity-70">Target:</span>
            {[2, 7, 12, 15, 20, 99].map((t) => (
              <button
                key={t}
                onClick={() => setSearchTarget(t)}
                className={`px-2 py-0.5 rounded font-mono font-bold border-2 border-[#111111] dark:border-[#F5F0E8] transition-all shadow-[2px_2px_0px_#111111] ${
                  searchTarget === t ? 'bg-[#C6FF00] text-[#111111]' : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
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
                className={`px-2.5 py-1 uppercase text-[11px] font-black font-mono transition-all border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[2px_2px_0px_#111111] ${
                  traversalType === trav
                    ? 'bg-[#304FFE] text-white'
                    : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
                }`}
              >
                {trav}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Tree SVG Canvas */}
      <div className="relative w-full h-[320px] bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] p-4 flex items-center justify-center overflow-hidden shadow-[6px_6px_0px_#111111]">
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
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-[#111111] dark:text-[#555]"
                  />
                )}
                {right && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={right.x}
                    y2={right.y}
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-[#111111] dark:text-[#555]"
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

            let fill = '#F5F0E8';
            let stroke = '#111111';
            let textFill = '#111111';

            if (isTarget) {
              fill = '#C6FF00';
              stroke = '#111111';
              textFill = '#111111';
            } else if (isCurr) {
              fill = '#FF2DAA';
              stroke = '#111111';
              textFill = '#FFFFFF';
            } else if (isVisited) {
              fill = '#304FFE';
              stroke = '#111111';
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
          <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] px-3 py-1.5 text-xs font-mono font-bold shadow-[2px_2px_0px_#111111]">
            <span className="opacity-70">BFS Queue:</span>
            <span className="text-[#304FFE] dark:text-[#C6FF00] font-black">[{currentStep.queueState.join(', ') || 'empty'}]</span>
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
