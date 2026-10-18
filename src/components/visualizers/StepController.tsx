import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Shuffle, 
  Gauge,
  Volume2,
  VolumeX,
  Mic,
  Square
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useUserStore } from '../../stores/userStore';
import { audioService } from '../../services/audioService';

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
  const { soundEnabled, voiceEnabled, autoVoiceNarrate, speechRate } = useUserStore();
  const [isSpeakingThis, setIsSpeakingThis] = useState(false);

  useEffect(() => {
    const unsub = audioService.subscribeSpeakingStatus(setIsSpeakingThis);
    return () => unsub();
  }, []);

  // Auto-speak step if enabled
  useEffect(() => {
    if (autoVoiceNarrate && voiceEnabled && explanation) {
      audioService.speak(explanation, { voiceEnabled: true, rate: speechRate });
    }
  }, [currentStep, autoVoiceNarrate, voiceEnabled]);

  const handleSpeakCurrentStep = () => {
    if (isSpeakingThis) {
      audioService.stop();
    } else {
      audioService.speak(explanation, { voiceEnabled: true, rate: speechRate });
    }
  };

  const handleNext = () => {
    audioService.playStep(soundEnabled);
    onNext();
  };

  const handlePrev = () => {
    audioService.playStep(soundEnabled);
    onPrev();
  };

  const handleReset = () => {
    audioService.playClick(soundEnabled);
    audioService.stop();
    onReset();
  };

  const handlePlayPause = () => {
    audioService.playClick(soundEnabled);
    onPlayPause();
  };

  const handleShuffle = () => {
    audioService.playSwap(soundEnabled);
    onShuffle?.();
  };

  return (
    <div className="w-full flex flex-col gap-3 p-4 bg-white/80 dark:bg-white/[0.05] border border-slate-200/90 dark:border-white/[0.16] rounded-2xl backdrop-blur-2xl shadow-sm dark:shadow-glass">
      {/* Explanation Banner with Voice Speaker */}
      <div className="flex items-start justify-between gap-3 p-3 bg-slate-100/80 dark:bg-white/[0.04] rounded-xl border border-slate-200/80 dark:border-white/[0.12] backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="px-2.5 py-0.5 rounded-lg bg-[#0080FF]/15 border border-[#0080FF]/30 text-[#0080FF] dark:text-cyan-300 font-mono text-xs font-semibold shrink-0 mt-0.5 shadow-sm">
            STEP {Math.min(currentStep + 1, totalSteps)}/{totalSteps}
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Listen to Step Voice Button */}
        <button
          onClick={handleSpeakCurrentStep}
          className={`shrink-0 p-2 rounded-xl border transition-all ${
            isSpeakingThis
              ? 'bg-[#0080FF] text-white border-transparent shadow-md animate-pulse'
              : 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/20 hover:border-[#0080FF] hover:text-[#0080FF]'
          }`}
          title={isSpeakingThis ? 'Stop voice reading' : 'Read step explanation aloud'}
          aria-label="Speak step"
        >
          {isSpeakingThis ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
        </button>
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Playback Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            title="Reset to beginning"
            disabled={currentStep === 0 && !isPlaying}
          >
            <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            title="Step backward"
            disabled={currentStep === 0 || isPlaying}
          >
            <SkipBack className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </Button>

          <Button
            variant={isPlaying ? 'amber' : 'primary'}
            size="sm"
            onClick={handlePlayPause}
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
            onClick={handleNext}
            title="Step forward"
            disabled={currentStep >= totalSteps - 1 || isPlaying}
          >
            <SkipForward className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </Button>

          {onShuffle && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShuffle}
              title="Generate new random array"
              disabled={isPlaying}
            >
              <Shuffle className="w-3.5 h-3.5 mr-1 text-[#0080FF] dark:text-cyan-400" />
              Shuffle
            </Button>
          )}
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
          <Gauge className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hidden sm:inline" />
          <span className="hidden sm:inline">Speed:</span>
          {[
            { label: '0.5x', ms: 1200 },
            { label: '1x', ms: 700 },
            { label: '2x', ms: 300 },
            { label: '4x', ms: 100 },
          ].map((sp) => (
            <button
              key={sp.label}
              onClick={() => {
                audioService.playClick(soundEnabled);
                onSpeedChange(sp.ms);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all backdrop-blur-sm ${
                speedMs === sp.ms
                  ? 'bg-[#0080FF] text-white font-bold shadow-sm'
                  : 'bg-slate-200/80 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/[0.12] border border-slate-300/60 dark:border-white/[0.1]'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Real-time metrics */}
        {stats && (
          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-white/[0.04] px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-white/[0.12] backdrop-blur-md shadow-sm">
            {stats.comparisons !== undefined && (
              <span>
                Comparisons: <strong className="text-[#0080FF] dark:text-cyan-300">{stats.comparisons}</strong>
              </span>
            )}
            {stats.swaps !== undefined && (
              <span>
                Swaps: <strong className="text-amber-600 dark:text-amber-300">{stats.swaps}</strong>
              </span>
            )}
            {stats.writes !== undefined && (
              <span>
                Writes: <strong className="text-emerald-600 dark:text-emerald-300">{stats.writes}</strong>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
