/**
 * Audio Service for DSA Gamly
 * 
 * Provides:
 * 1. Web Audio API synthesized sound effects (Zero external assets required, 100% offline-ready)
 * 2. Web Speech API voice synthesis narrator for algorithms, steps, quests, and boss battles
 */

class AudioService {
  private audioCtx: AudioContext | null = null;
  private speechSynth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingActive: boolean = false;
  private listeners: Set<(speaking: boolean) => void> = new Set();
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.speechSynth = window.speechSynthesis;
        this.loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  private loadVoices() {
    if (!this.speechSynth) return;
    try {
      this.voices = this.speechSynth.getVoices();
    } catch {
      this.voices = [];
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      } catch (err) {
        console.warn('Web Audio API not supported', err);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public subscribeSpeakingStatus(cb: (speaking: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isSpeakingActive);
    return () => this.listeners.delete(cb);
  }

  private notifySpeaking(status: boolean) {
    this.isSpeakingActive = status;
    this.listeners.forEach((cb) => cb(status));
  }

  /* =========================================================================
     1. Web Audio API Synthesized Sound Effects
     ========================================================================= */

  /**
   * Subtle tactile click for UI buttons
   */
  public playClick(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio context policy
    }
  }

  /**
   * Step click tone for stepping forward/backward in algorithms
   */
  public playStep(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  /**
   * Dual-tone slide for element swaps or comparisons
   */
  public playSwap(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(659, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.1);
    } catch {}
  }

  /**
   * Joyful 4-note ascending chord for test pass & challenge completion
   */
  public playSuccess(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.07, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch {}
  }

  /**
   * Grand Level-Up Fanfare with harmonics
   */
  public playLevelUp(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const chords = [
        [440, 554, 659],     // A major
        [493, 622, 739],     // B major
        [587, 739, 880],     // D major
        [880, 1108, 1318],   // A high victory
      ];
      const now = ctx.currentTime;
      chords.forEach((chord, step) => {
        const stepTime = now + step * 0.12;
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, stepTime);
          gain.gain.setValueAtTime(0.05, stepTime);
          gain.gain.exponentialRampToValueAtTime(0.001, stepTime + (step === 3 ? 0.6 : 0.18));

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(stepTime);
          osc.stop(stepTime + (step === 3 ? 0.6 : 0.18));
        });
      });
    } catch {}
  }

  /**
   * Low warning buzz for incorrect test case or error notebook entry
   */
  public playError(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(130, now + 0.1);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch {}
  }

  /**
   * Dramatic Sub-bass strike when a Boss Battle begins
   */
  public playBossRoar(soundEnabled: boolean = true) {
    if (!soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.5);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } catch {}
  }

  /* =========================================================================
     2. Web Speech API Voice Narrator
     ========================================================================= */

  /**
   * Speaks the provided text using natural speech synthesis
   */
  public speak(
    text: string,
    options: {
      voiceEnabled?: boolean;
      rate?: number;
      pitch?: number;
      onEnd?: () => void;
    } = {}
  ) {
    if (options.voiceEnabled === false) return;
    if (!this.speechSynth) return;

    try {
      // Cancel previous speech immediately
      this.speechSynth.cancel();

      // Clean markdown, symbols, and formatting for crisp speech output
      const cleanText = text
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[#*_{}[\]()<>]/g, ' ')
        .replace(/O\(([^)]+)\)/g, 'Big O of $1')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;

      // Select high quality English voice if available
      const enVoice = this.voices.find(
        (v) =>
          (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Microsoft')))
      ) || this.voices.find((v) => v.lang.startsWith('en'));

      if (enVoice) {
        utterance.voice = enVoice;
      }

      utterance.onstart = () => {
        this.notifySpeaking(true);
      };

      utterance.onend = () => {
        this.notifySpeaking(false);
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = () => {
        this.notifySpeaking(false);
        this.currentUtterance = null;
      };

      this.currentUtterance = utterance;
      this.speechSynth.speak(utterance);
    } catch (err) {
      this.notifySpeaking(false);
      console.warn('Speech synthesis error', err);
    }
  }

  /**
   * Stop any active voice narration
   */
  public stop() {
    if (this.speechSynth) {
      try {
        this.speechSynth.cancel();
      } catch {}
    }
    this.notifySpeaking(false);
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingActive;
  }
}

export const audioService = new AudioService();
