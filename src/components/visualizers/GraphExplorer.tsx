import React, { useState, useEffect } from 'react';
import { generateGraphBFSSteps, generateDijkstraSteps, createSampleGraph } from '../../algorithms/graphs/graphAlgorithms';
import { GraphStep } from '../../types/algorithm';
import { StepController } from './StepController';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

export const GraphExplorer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dijkstra'>('dijkstra');
  const [startNode, setStartNode] = useState<string>('A');
  const [steps, setSteps] = useState<GraphStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(900);

  useEffect(() => {
    let generated: GraphStep[] = [];
    if (algorithm === 'bfs') {
      generated = generateGraphBFSSteps(startNode);
    } else {
      generated = generateDijkstraSteps(startNode);
    }
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [algorithm, startNode]);

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
    ...createSampleGraph(),
    currentNodeId: null,
    visitedIds: [],
    queueOrStack: [],
    explanation: 'Graph Explorer initialized.',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Algorithm switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Button
            variant={algorithm === 'dijkstra' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setAlgorithm('dijkstra')}
          >
            ⚡ Dijkstra Shortest Path
          </Button>
          <Button
            variant={algorithm === 'bfs' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setAlgorithm('bfs')}
          >
            🌊 Breadth-First Search (BFS)
          </Button>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-mono">Start Node:</span>
          {['A', 'B', 'C'].map((nd) => (
            <button
              key={nd}
              onClick={() => setStartNode(nd)}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                startNode === nd ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {nd}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Graph Canvas */}
      <div className="relative w-full h-[320px] bg-slate-950 rounded-3xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <svg className="w-full h-full max-w-[520px]" viewBox="0 0 520 240">
          {/* Edges */}
          {currentStep.edges.map((edge, idx) => {
            const fromNode = currentStep.nodes.find((n) => n.id === edge.from)!;
            const toNode = currentStep.nodes.find((n) => n.id === edge.to)!;
            const isHigh = edge.isHighlighted;

            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHigh ? '#38BDF8' : '#334155'}
                  strokeWidth={isHigh ? '4' : '2'}
                  className="transition-all duration-300"
                />
                {edge.weight !== undefined && (
                  <circle cx={midX} cy={midY} r="10" fill="#0F172A" stroke="#475569" strokeWidth="1" />
                )}
                {edge.weight !== undefined && (
                  <text
                    x={midX}
                    y={midY + 3.5}
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}

          {/* Vertices */}
          {currentStep.nodes.map((node) => {
            const isCurr = currentStep.currentNodeId === node.id;
            const isVisited = currentStep.visitedIds.includes(node.id);
            const dist = currentStep.distances ? currentStep.distances[node.id] : undefined;

            let fill = '#0F172A';
            let stroke = '#475569';
            if (isCurr) {
              fill = '#0284C7';
              stroke = '#38BDF8';
            } else if (isVisited) {
              fill = '#7C3AED';
              stroke = '#A78BFA';
            }

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCurr ? '22' : '18'}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
                {dist !== undefined && (
                  <text
                    x={node.x}
                    y={node.y + 32}
                    textAnchor="middle"
                    fill={dist === Infinity ? '#64748B' : '#38BDF8'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    d:{dist === Infinity ? '∞' : dist}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Visited & Queue badge overlay */}
        <div className="absolute bottom-4 left-6 flex items-center gap-3 text-xs font-mono bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
          <span className="text-slate-400">Visited:</span>
          <span className="text-violet-400 font-bold">[{currentStep.visitedIds.join(', ') || 'none'}]</span>
        </div>
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
