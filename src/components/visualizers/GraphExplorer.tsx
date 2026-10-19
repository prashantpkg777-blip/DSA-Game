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
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Algorithm switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#181818] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
        <div className="flex items-center gap-2">
          <Button
            variant={algorithm === 'dijkstra' ? 'lime' : 'secondary'}
            size="sm"
            onClick={() => setAlgorithm('dijkstra')}
          >
            ⚡ DIJKSTRA SHORTEST PATH
          </Button>
          <Button
            variant={algorithm === 'bfs' ? 'blue' : 'secondary'}
            size="sm"
            onClick={() => setAlgorithm('bfs')}
          >
            🌊 BFS TRAVERSAL
          </Button>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
          <span>START NODE:</span>
          {['A', 'B', 'C'].map((nd) => (
            <button
              key={nd}
              onClick={() => setStartNode(nd)}
              className={`px-3 py-1 font-display font-black text-xs border-2 ${
                startNode === nd
                  ? 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]'
                  : 'bg-white dark:bg-[#2c2c2c] text-inherit border-[#111111]'
              }`}
            >
              {nd}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Graph Canvas */}
      <div className="relative w-full h-[340px] bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[6px_6px_0px_#111111] p-4 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full max-w-[540px]" viewBox="0 0 520 240">
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
                  stroke={isHigh ? '#FF2DAA' : '#777777'}
                  strokeWidth={isHigh ? '4' : '2'}
                  className="transition-all duration-300"
                />
                {edge.weight !== undefined && (
                  <circle cx={midX} cy={midY} r="11" fill="#FFF200" stroke="#111111" strokeWidth="1.5" />
                )}
                {edge.weight !== undefined && (
                  <text
                    x={midX}
                    y={midY + 3.5}
                    textAnchor="middle"
                    fill="#111111"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
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

            let fill = '#F5F0E8';
            let stroke = '#111111';
            let textColor = '#111111';

            if (isCurr) {
              fill = '#C6FF00';
              stroke = '#111111';
            } else if (isVisited) {
              fill = '#B9A0FF';
              stroke = '#111111';
            }

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCurr ? '24' : '20'}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                />
                <text
                  x={node.x}
                  y={node.y + 4.5}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="13"
                  fontFamily="'Space Grotesk', sans-serif"
                  fontWeight="900"
                >
                  {node.label}
                </text>
                {dist !== undefined && (
                  <text
                    x={node.x}
                    y={node.y + 36}
                    textAnchor="middle"
                    fill={dist === Infinity ? '#888' : '#FF5C00'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {dist === Infinity ? '∞' : `dist: ${dist}`}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Queue / Distance Tracker Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#333] font-mono text-xs font-bold">
        <div className="flex items-center gap-2">
          <span className="text-[#304FFE] dark:text-[#C6FF00]">TRAVERSAL QUEUE:</span>
          <span className="bg-[#111111] text-[#C6FF00] px-2 py-0.5">
            [ {currentStep.queueOrStack.join(', ') || 'EMPTY'} ]
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#FF2DAA]">VISITED:</span>
          <span className="bg-[#111111] text-[#FF2DAA] px-2 py-0.5">
            {currentStep.visitedIds.join(' → ') || 'NONE'}
          </span>
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

export default GraphExplorer;
