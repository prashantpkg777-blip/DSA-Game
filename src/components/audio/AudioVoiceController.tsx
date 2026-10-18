import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Square, 
  Settings2, 
  X, 
  Radio,
  Sparkles,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { audioService } from '../../services/audioService';

export const AudioVoiceController: React.FC = () => {
  const { 
    soundEnabled, 
    voiceEnabled, 
    autoVoiceNarrate, 
    speechRate,
    toggleSound, 
    toggleVoice, 
    toggleAutoVoice, 
    setSpeechRate 
  } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsubscribe = audioService.subscribeSpeakingStatus((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsubscribe();
  }, []);

  const handleStopSpeaking = () => {
    audioService.stop();
  };

  const handleTestVoice = () => {
    audioService.speak(
      "Welcome to DSA Gamly! Algorithm voice narration is ready.",
      { voiceEnabled: true, rate: speechRate }
    );
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end">
      {/* Expanded Audio Settings Modal / Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-3xl bg-white/85 dark:bg-[#080B18]/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/20 shadow-2xl text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0080FF] to-[#8B00FF] flex items-center justify-center text-white shadow-sm">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">Audio & Voice Narrator</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Web Speech & Synthesizer</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Speaking Status Banner */}
            {isSpeaking && (
              <div className="mt-3 p-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-300">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-1 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="font-semibold">Voice Narrating...</span>
                </div>
                <button
                  onClick={handleStopSpeaking}
                  className="px-2 py-1 rounded-lg bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 hover:bg-rose-600 shadow-sm"
                >
                  <Square className="w-2.5 h-2.5 fill-current" /> Stop
                </button>
              </div>
            )}

            {/* Settings List */}
            <div className="mt-3 space-y-2.5 text-xs">
              {/* Voice Narrator Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  {voiceEnabled ? <Mic className="w-4 h-4 text-[#0080FF]" /> : <MicOff className="w-4 h-4 text-slate-400" />}
                  <div>
                    <span className="font-semibold block">AI Voice Narration</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Reads steps & lessons aloud</span>
                  </div>
                </div>
                <button
                  onClick={toggleVoice}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${voiceEnabled ? 'bg-[#0080FF]' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${voiceEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Auto Voice Narrate on Steps */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Radio className={`w-4 h-4 ${autoVoiceNarrate ? 'text-[#FF1493]' : 'text-slate-400'}`} />
                  <div>
                    <span className="font-semibold block">Auto-Read Steps</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Speaks on step change</span>
                  </div>
                </div>
                <button
                  onClick={toggleAutoVoice}
                  disabled={!voiceEnabled}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 disabled:opacity-50 ${autoVoiceNarrate && voiceEnabled ? 'bg-[#FF1493]' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${autoVoiceNarrate && voiceEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Sound FX Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-[#20B2AA]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  <div>
                    <span className="font-semibold block">Sound Effects</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Synthesized chimes & clicks</span>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${soundEnabled ? 'bg-[#20B2AA]' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Speech Speed */}
              <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Voice Speed:</span>
                  <span className="text-[11px] font-mono font-bold text-[#0080FF]">{speechRate}x</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`py-1 rounded-lg text-xs font-mono transition-all ${
                        speechRate === rate
                          ? 'bg-[#0080FF] text-white font-bold shadow-sm'
                          : 'bg-white/80 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Voice Button */}
              <button
                onClick={handleTestVoice}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#0080FF] to-[#8B00FF] text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Test Voice Narration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 dark:bg-[#080B18]/80 backdrop-blur-2xl border border-slate-200/90 dark:border-white/20 shadow-2xl transition-all hover:scale-105">
        {/* Animated speaking indicator or mic icon */}
        <button
          onClick={() => {
            if (isSpeaking) {
              handleStopSpeaking();
            } else {
              toggleVoice();
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isSpeaking
              ? 'bg-cyan-500 text-white shadow-glass-cyan animate-pulse'
              : voiceEnabled
              ? 'bg-[#0080FF]/15 text-[#0080FF] dark:text-cyan-300'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
          title={isSpeaking ? 'Click to stop speaking' : voiceEnabled ? 'Voice narrator active' : 'Voice narrator muted'}
        >
          {isSpeaking ? (
            <>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="hidden sm:inline">Speaking</span>
            </>
          ) : (
            <>
              {voiceEnabled ? <Mic className="w-3.5 h-3.5 text-[#0080FF]" /> : <MicOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Voice</span>
            </>
          )}
        </button>

        {/* Settings Expander Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
          title="Open Audio & Voice Controls"
          aria-label="Audio Controls"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
