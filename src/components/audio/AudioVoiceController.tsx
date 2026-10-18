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
  Sparkles 
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
      "Yo coder! Welcome to DSA CHAOS. Break the code, master the chaos.",
      { voiceEnabled: true, rate: speechRate }
    );
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end select-none">
      {/* Expanded Audio Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="mb-3 w-80 max-w-[calc(100vw-2rem)] p-4 bg-[#F5F0E8] dark:bg-[#181818] border-3 border-[#111111] dark:border-[#F5F0E8] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#C6FF00] text-[#111111] dark:text-[#F5F0E8]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] dark:border-[#333]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] flex items-center justify-center font-bold">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs uppercase tracking-tight">CHAOS AUDIO & VOICE</h4>
                  <p className="font-mono text-[10px] opacity-70">Web Speech Engine</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 border border-[#111111] hover:bg-[#FF2DAA] hover:text-[#111111] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Speaking Status Banner */}
            {isSpeaking && (
              <div className="mt-3 p-2.5 bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-between text-xs font-mono font-bold">
                <span className="flex items-center gap-1.5 animate-pulse">
                  <span>⚡</span> NARRATOR TALKING...
                </span>
                <button
                  onClick={handleStopSpeaking}
                  className="px-2 py-0.5 bg-[#FF2DAA] text-[#111111] border border-[#111111] text-[10px] font-black uppercase"
                >
                  <Square className="w-2.5 h-2.5 fill-current inline mr-1" /> STOP
                </button>
              </div>
            )}

            {/* Settings List */}
            <div className="mt-3 space-y-2.5 text-xs font-mono">
              {/* Voice Narrator Toggle */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-[#202020] border-2 border-[#111111]">
                <div className="flex items-center gap-2">
                  {voiceEnabled ? <Mic className="w-4 h-4 text-[#304FFE]" /> : <MicOff className="w-4 h-4 opacity-50" />}
                  <div>
                    <span className="font-bold block uppercase">AI Voice Narration</span>
                    <span className="text-[10px] opacity-60">Speaks lesson intuitions</span>
                  </div>
                </div>
                <button
                  onClick={toggleVoice}
                  className={`px-2 py-1 font-display font-black text-xs border border-[#111111] ${
                    voiceEnabled ? 'bg-[#C6FF00] text-[#111111]' : 'bg-[#e0e0e0] text-[#666]'
                  }`}
                >
                  {voiceEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Sound FX Toggle */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-[#202020] border-2 border-[#111111]">
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF5C00]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
                  <div>
                    <span className="font-bold block uppercase">Sound Effects</span>
                    <span className="text-[10px] opacity-60">Chiptune arcade audio</span>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`px-2 py-1 font-display font-black text-xs border border-[#111111] ${
                    soundEnabled ? 'bg-[#FF5C00] text-[#111111]' : 'bg-[#e0e0e0] text-[#666]'
                  }`}
                >
                  {soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Speech Speed */}
              <div className="p-2 bg-white dark:bg-[#202020] border-2 border-[#111111]">
                <div className="flex items-center justify-between mb-1.5 font-bold">
                  <span>VOICE SPEED:</span>
                  <span className="text-[#304FFE] dark:text-[#C6FF00]">{speechRate}x</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`py-1 text-xs font-black border ${
                        speechRate === rate
                          ? 'bg-[#304FFE] text-[#F5F0E8] border-[#111111]'
                          : 'bg-white dark:bg-[#333] text-inherit border-transparent'
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
                className="w-full py-2 bg-[#FFF200] text-[#111111] font-display font-black text-xs uppercase border-2 border-[#111111] shadow-[2px_2px_0px_#111111] active:translate-y-0.5 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> TEST VOICE SAMPLE ⚡
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#FFF200] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] -rotate-1 hover:rotate-0 transition-transform">
        <button
          onClick={() => {
            if (isSpeaking) {
              handleStopSpeaking();
            } else {
              toggleVoice();
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-display font-black uppercase ${
            isSpeaking ? 'bg-[#FF2DAA] text-[#111111] animate-pulse' : voiceEnabled ? 'bg-[#C6FF00] text-[#111111]' : 'opacity-60'
          }`}
          title={isSpeaking ? 'Stop speaking' : voiceEnabled ? 'Voice active' : 'Voice muted'}
        >
          {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          <span>{isSpeaking ? 'SPEAKING' : 'VOICE'}</span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-[#111111] hover:text-[#FFF200] transition-colors"
          title="Audio Controls"
          aria-label="Audio Controls"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AudioVoiceController;
