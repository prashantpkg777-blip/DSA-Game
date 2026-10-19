import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, LogIn, UserPlus, Sparkles, AlertCircle, ShieldCheck, Cloud } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { audioService } from '../../services/audioService';

const AVATAR_OPTIONS = ['🧙‍♂️', '👾', '⚡', '🔥', '🥷', '🤖', '💀', '🐉'];

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authMode,
    isSyncing,
    cloudError,
    soundEnabled,
    closeAuthModal,
    openAuthModal,
    login,
    signup,
  } = useUserStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState('🧙‍♂️');
  const [localError, setLocalError] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    audioService.playClick(soundEnabled);

    if (authMode === 'signup') {
      if (!username || username.trim().length < 3) {
        setLocalError('Username must be at least 3 characters.');
        audioService.playError(soundEnabled);
        return;
      }
      if (!email || !email.includes('@')) {
        setLocalError('Please enter a valid email address.');
        audioService.playError(soundEnabled);
        return;
      }
      if (!password || password.length < 6) {
        setLocalError('Password must be at least 6 characters.');
        audioService.playError(soundEnabled);
        return;
      }

      const res = await signup({
        email: email.trim(),
        password,
        username: username.trim(),
        displayName: displayName.trim() || username.trim(),
        avatar,
      });

      if (res.success) {
        audioService.playVictory(soundEnabled);
      } else {
        audioService.playError(soundEnabled);
      }
    } else {
      if (!email || !password) {
        setLocalError('Please provide both email and password.');
        audioService.playError(soundEnabled);
        return;
      }

      const res = await login({
        email: email.trim(),
        password,
      });

      if (res.success) {
        audioService.playSuccess(soundEnabled);
      } else {
        audioService.playError(soundEnabled);
      }
    }
  };

  const handleTabSwitch = (mode: 'login' | 'signup') => {
    audioService.playClick(soundEnabled);
    setLocalError(null);
    openAuthModal(mode);
  };

  const handleClose = () => {
    audioService.playClick(soundEnabled);
    closeAuthModal();
  };

  const displayError = localError || cloudError;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#F5F0E8] dark:bg-[#111111] border-3 md:border-4 border-[#111111] dark:border-[#F5F0E8] shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_#C6FF00] overflow-hidden text-[#111111] dark:text-[#F5F0E8]"
        >
          {/* Top Banner Header */}
          <div className="p-4 bg-[#C6FF00] text-[#111111] border-b-3 border-[#111111] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#111111] text-[#C6FF00]">
                <Zap className="w-5 h-5 fill-[#FF2DAA]" />
              </div>
              <div className="font-display font-black text-lg uppercase tracking-tight">
                {authMode === 'login' ? 'ACCESS CHAOS MATRIX' : 'JOIN THE GUILD'}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 border-2 border-[#111111] bg-[#FF2DAA] text-[#111111] hover:bg-[#ff5bb9] transition-all font-mono font-bold shadow-[2px_2px_0px_#111111]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                type="button"
                onClick={() => handleTabSwitch('login')}
                className={`py-2 px-3 font-display font-black text-xs uppercase tracking-wider border-2 border-[#111111] transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'login'
                    ? 'bg-[#FFF200] text-[#111111] shadow-[3px_3px_0px_#111111] -translate-y-0.5'
                    : 'bg-white dark:bg-[#222222] text-inherit opacity-80 hover:opacity-100'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>SIGN IN</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabSwitch('signup')}
                className={`py-2 px-3 font-display font-black text-xs uppercase tracking-wider border-2 border-[#111111] transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'signup'
                    ? 'bg-[#FF2DAA] text-[#111111] shadow-[3px_3px_0px_#111111] -translate-y-0.5'
                    : 'bg-white dark:bg-[#222222] text-inherit opacity-80 hover:opacity-100'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>CREATE ACCOUNT</span>
              </button>
            </div>

            {/* Guest Progress Notice */}
            <div className="p-3 mb-5 border-2 border-[#111111] bg-[#304FFE]/15 text-[#304FFE] dark:text-[#B9A0FF] font-mono text-xs flex items-start gap-2.5">
              <Cloud className="w-4 h-4 mt-0.5 shrink-0 text-[#304FFE] dark:text-[#C6FF00]" />
              <div>
                <span className="font-bold">AUTO CLOUD SYNC: </span>
                All your existing completed quests, challenges, and XP will be automatically migrated to your cloud profile!
              </div>
            </div>

            {/* Error Message Box */}
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mb-4 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] font-mono text-xs font-bold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{displayError}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block font-display font-black text-xs uppercase tracking-wide mb-1 text-inherit">
                      CODER USERNAME
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. code_ninja99"
                      className="w-full px-3 py-2 border-2 border-[#111111] bg-white dark:bg-[#1a1a1a] text-[#111111] dark:text-[#F5F0E8] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase tracking-wide mb-1 text-inherit">
                      DISPLAY NAME (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Neo Algorithm"
                      className="w-full px-3 py-2 border-2 border-[#111111] bg-white dark:bg-[#1a1a1a] text-[#111111] dark:text-[#F5F0E8] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase tracking-wide mb-1 text-inherit">
                      PICK YOUR AVATAR
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => {
                            audioService.playClick(soundEnabled);
                            setAvatar(av);
                          }}
                          className={`w-9 h-9 border-2 border-[#111111] text-lg flex items-center justify-center transition-transform ${
                            avatar === av
                              ? 'bg-[#C6FF00] scale-110 shadow-[2px_2px_0px_#111111]'
                              : 'bg-white dark:bg-[#222222] hover:scale-105'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block font-display font-black text-xs uppercase tracking-wide mb-1 text-inherit">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="coder@dsachaos.dev"
                  className="w-full px-3 py-2 border-2 border-[#111111] bg-white dark:bg-[#1a1a1a] text-[#111111] dark:text-[#F5F0E8] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block font-display font-black text-xs uppercase tracking-wide mb-1 text-inherit">
                  PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border-2 border-[#111111] bg-white dark:bg-[#1a1a1a] text-[#111111] dark:text-[#F5F0E8] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSyncing}
                className="mt-2 w-full py-3 px-4 bg-[#C6FF00] hover:bg-[#b2e600] text-[#111111] border-2 md:border-3 border-[#111111] shadow-[4px_4px_0px_#111111] font-display font-black text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                {isSyncing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#111111] border-t-transparent animate-spin rounded-full" />
                    <span>SYNCING WITH CLOUD...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{authMode === 'login' ? 'ENTER MATRIX ↗' : 'CREATE CHAOS PROFILE ↗'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center font-mono text-xs opacity-75">
              {authMode === 'login' ? (
                <div>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('signup')}
                    className="font-bold underline text-[#FF2DAA] dark:text-[#C6FF00] hover:opacity-100"
                  >
                    Create one now
                  </button>
                </div>
              ) : (
                <div>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('login')}
                    className="font-bold underline text-[#FF2DAA] dark:text-[#C6FF00] hover:opacity-100"
                  >
                    Sign in here
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
