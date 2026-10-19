import React, { useState, useEffect } from 'react';
import { 
  generateFloydCycleSteps, 
  generateLinkedListReverseSteps, 
  createInitialLinkedList 
} from '../../algorithms/linkedLists/linkedListAlgorithms';
import { LinkedListStep, LinkedListNodeData } from '../../types/algorithm';
import { StepController } from './StepController';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, RotateCw, PlusCircle, Repeat } from 'lucide-react';

export const LinkedListBuilder: React.FC = () => {
  const [values, setValues] = useState<number[]>([12, 99, 37, 45, 88, 23]);
  const [cycleTarget, setCycleTarget] = useState<number>(-1); // -1 = no cycle, 2 = points to index 2
  const [algorithm, setAlgorithm] = useState<'floyd_cycle' | 'reverse'>('floyd_cycle');
  const [steps, setSteps] = useState<LinkedListStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(800);

  useEffect(() => {
    let generated: LinkedListStep[] = [];
    if (algorithm === 'floyd_cycle') {
      generated = generateFloydCycleSteps(values, cycleTarget);
    } else {
      generated = generateLinkedListReverseSteps(values);
    }
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [values, cycleTarget, algorithm]);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
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
    nodes: createInitialLinkedList(values, cycleTarget),
    slowPointerId: null,
    fastPointerId: null,
    currentPointerId: null,
    explanation: 'Linked List ready.',
  };

  const handleAddHead = () => {
    const newVal = Math.floor(Math.random() * 90) + 10;
    setValues([newVal, ...values]);
  };

  const handleAddTail = () => {
    const newVal = Math.floor(Math.random() * 90) + 10;
    setValues([...values, newVal]);
  };

  const toggleCycle = () => {
    setCycleTarget(cycleTarget === -1 ? 2 : -1);
    setAlgorithm('floyd_cycle');
  };

  return (
    <div className="flex flex-col gap-6 text-[#111111] dark:text-[#F5F0E8]">
      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#181818] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[4px_4px_0px_#111111]">
        <div className="flex items-center gap-2">
          <Button
            variant={algorithm === 'floyd_cycle' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setAlgorithm('floyd_cycle')}
          >
            🐢🐰 Floyd's Cycle Detect
          </Button>
          <Button
            variant={algorithm === 'reverse' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setAlgorithm('reverse')}
          >
            <RotateCw className="w-3.5 h-3.5 mr-1" /> Reverse List
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddHead}
            disabled={values.length >= 8}
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1 text-[#304FFE] dark:text-[#C6FF00]" /> +Head
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddTail}
            disabled={values.length >= 8}
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1 text-[#304FFE] dark:text-[#C6FF00]" /> +Tail
          </Button>
          <Button
            variant={cycleTarget >= 0 ? 'danger' : 'secondary'}
            size="sm"
            onClick={toggleCycle}
          >
            <Repeat className="w-3.5 h-3.5 mr-1" />
            {cycleTarget >= 0 ? 'Remove Cycle' : 'Inject Cycle (Node 2)'}
          </Button>
        </div>
      </div>

      {/* Nodes Canvas */}
      <div className="relative w-full min-h-[220px] bg-white dark:bg-[#141414] border-2 md:border-3 border-[#111111] dark:border-[#F5F0E8] p-8 flex items-center justify-start overflow-x-auto shadow-[6px_6px_0px_#111111]">
        <div className="flex items-center gap-4 min-w-max mx-auto">
          {currentStep.nodes.map((node, idx) => {
            const isSlow = currentStep.slowPointerId === node.id;
            const isFast = currentStep.fastPointerId === node.id;
            const isCurr = currentStep.currentPointerId === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div className="flex flex-col items-center">
                  {/* Pointers Row Above */}
                  <div className="h-7 flex items-center gap-1 font-mono text-[10px] font-black uppercase">
                    {isSlow && (
                      <span className="px-1.5 py-0.5 border border-[#111111] bg-[#FFF200] text-[#111111] shadow-[1px_1px_0px_#111111]">
                        🐢 SLOW
                      </span>
                    )}
                    {isFast && (
                      <span className="px-1.5 py-0.5 border border-[#111111] bg-[#304FFE] text-white shadow-[1px_1px_0px_#111111]">
                        🐰 FAST
                      </span>
                    )}
                    {isCurr && !isSlow && !isFast && (
                      <span className="px-1.5 py-0.5 border border-[#111111] bg-[#FF2DAA] text-white shadow-[1px_1px_0px_#111111]">
                        CURR
                      </span>
                    )}
                  </div>

                  {/* Node Card */}
                  <div
                    className={`w-16 h-16 border-2 border-[#111111] dark:border-[#F5F0E8] flex flex-col items-center justify-center font-mono font-black text-base transition-all duration-300 shadow-[3px_3px_0px_#111111] ${
                      node.isHighlighted
                        ? 'bg-[#FF2DAA] text-white scale-110'
                        : isSlow && isFast
                        ? 'bg-[#C6FF00] text-[#111111] scale-110'
                        : isSlow
                        ? 'bg-[#FFF200] text-[#111111]'
                        : isFast
                        ? 'bg-[#304FFE] text-white'
                        : 'bg-[#F5F0E8] dark:bg-[#222222] text-[#111111] dark:text-[#F5F0E8]'
                    }`}
                  >
                    <span>{node.value}</span>
                    <span className="text-[10px] opacity-70 font-normal">
                      {node.isHead ? 'HEAD' : node.isTail ? 'TAIL' : `[${idx}]`}
                    </span>
                  </div>

                  {/* Memory Address Below */}
                  <div className="text-[10px] opacity-60 font-mono font-bold mt-1">
                    0x{(idx * 16 + 100).toString(16)}
                  </div>
                </div>

                {/* Arrow to next */}
                {idx < currentStep.nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center text-[#111111] dark:text-[#F5F0E8] px-1">
                    <ArrowRight className="w-5 h-5 text-[#304FFE] dark:text-[#C6FF00]" />
                    <span className="text-[9px] font-mono font-bold">.next</span>
                  </div>
                )}

                {/* Last node arrow: cycle or NULL */}
                {idx === currentStep.nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center pl-1 font-mono text-xs">
                    {node.nextId ? (
                      <div className="flex items-center gap-1 text-[#FF2DAA] border-2 border-[#111111] dark:border-[#FF2DAA] px-2 py-1 bg-[#FF2DAA]/10 font-black shadow-[2px_2px_0px_#111111]">
                        <Repeat className="w-3.5 h-3.5" />
                        <span>↺ {node.nextId}</span>
                      </div>
                    ) : (
                      <span className="text-[#111111] dark:text-[#F5F0E8] font-black px-2 py-1 bg-white dark:bg-[#222222] border-2 border-[#111111] dark:border-[#F5F0E8] shadow-[2px_2px_0px_#111111]">
                        NULL
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
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
