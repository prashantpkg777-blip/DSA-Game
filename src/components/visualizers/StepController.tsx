import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Shuffle, 
  Gauge 
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface StepControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speedMs: number;
  explanation: string;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onShuffle?: () => void;
  onSpeedChange: (speedMs: number) => void;
  stats?: {
    comparisons?: number;
    swaps?: number;
    writes?: number;
  };
}

export const StepController: React.FC<StepControllerProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  speedMs,
  explanation,
  onPlayPause,
  onNext,
  onPrev,
  onReset,
  onShuffle,
  onSpeedChange,
  stats,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md">
      {/* Explanation Banner */}
      <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <div className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold shrink-0 mt-0.5">
          STEP {Math.min(currentStep + 1, totalSteps)}/{totalSteps}
        </div>
        <p className="text-sm text-slate-200 font-sans leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Playback Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            title="Reset to beginning"
            disabled={currentStep === 0 && !isPlaying}
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onPrev}
            title="Step backward"
            disabled={currentStep === 0 || isPlaying}
          >
            <SkipBack className="w-4 h-4 text-slate-300" />
          </Button>

          <Button
            variant={isPlaying ? 'amber' : 'primary'}
            size="sm"
            onClick={onPlayPause}
            className="px-4"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1.5 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1.5 fill-current" /> Play
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            title="Step forward"
            disabled={currentStep >= totalSteps - 1 || isPlaying}
          >
            <SkipForward className="w-4 h-4 text-slate-300" />
          </Button>

          {onShuffle && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onShuffle}
              title="Generate new random array"
              disabled={isPlaying}
            >
              <Shuffle className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              Shuffle
            </Button>
          )}
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Gauge className="w-3.5 h-3.5 text-slate-500" />
          <span>Speed:</span>
          {[
            { label: '0.5x', ms: 1200 },
            { label: '1x', ms: 700 },
            { label: '2x', ms: 300 },
            { label: '4x', ms: 100 },
          ].map((sp) => (
            <button
              key={sp.label}
              onClick={() => onSpeedChange(sp.ms)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                speedMs === sp.ms
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Real-time metrics */}
        {stats && (
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-950/40 px-3 py-1.5 rounded-xl border border-slate-800">
            {stats.comparisons !== undefined && (
              <span>
                Comparisons: <strong className="text-cyan-400">{stats.comparisons}</strong>
              </span>
            )}
            {stats.swaps !== undefined && (
              <span>
                Swaps: <strong className="text-amber-400">{stats.swaps}</strong>
              </span>
            )}
            {stats.writes !== undefined && (
              <span>
                Writes: <strong className="text-emerald-400">{stats.writes}</strong>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
