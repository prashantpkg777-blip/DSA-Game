import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserStats, Achievement, DailyQuest, MistakeRecord } from '../types/gamification';
import { syncProgressToCloud } from '../services/supabase';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first DSA concept lesson.',
    category: 'learning',
    icon: 'Footprints',
    xpReward: 50,
    unlockedAt: null,
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'sorting-samurai',
    title: 'Sorting Samurai',
    description: 'Master 3 sorting algorithms in the Sorting Desert.',
    category: 'mastery',
    icon: 'Sword',
    xpReward: 150,
    unlockedAt: null,
    progress: 0,
    maxProgress: 3,
    isUnlocked: false,
  },
  {
    id: 'pointer-ninja',
    title: 'Pointer Ninja',
    description: 'Solve 2 Two-Pointer or Linked List challenges.',
    category: 'mastery',
    icon: 'Zap',
    xpReward: 150,
    unlockedAt: null,
    progress: 0,
    maxProgress: 2,
    isUnlocked: false,
  },
  {
    id: 'boss-slayer',
    title: 'Boss Slayer',
    description: 'Defeat your first Region Boss in battle.',
    category: 'special',
    icon: 'Trophy',
    xpReward: 250,
    unlockedAt: null,
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'consistency-champion',
    title: 'Consistency Champion',
    description: 'Reach a 3-day learning streak.',
    category: 'streak',
    icon: 'Flame',
    xpReward: 100,
    unlockedAt: null,
    progress: 1,
    maxProgress: 3,
    isUnlocked: false,
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Review and correct a mistake in your Error Notebook.',
    category: 'learning',
    icon: 'ShieldCheck',
    xpReward: 75,
    unlockedAt: null,
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
];

function getDailyQuestsForToday(dateStr: string): DailyQuest[] {
  return [
    {
      id: `quest-sim-${dateStr}`,
      title: 'Algorithm Visualizer Run',
      description: 'Step through an algorithm visualization in simulator mode.',
      xpReward: 60,
      category: 'visualize',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false,
      dateAssigned: dateStr,
    },
    {
      id: `quest-quiz-${dateStr}`,
      title: 'Knowledge Check',
      description: 'Pass any topic quiz with 100% score.',
      xpReward: 50,
      category: 'solve',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false,
      dateAssigned: dateStr,
    },
    {
      id: `quest-code-${dateStr}`,
      title: 'Code Implementer',
      description: 'Solve one coding challenge in the editor.',
      xpReward: 80,
      category: 'solve',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false,
      dateAssigned: dateStr,
    },
  ];
}

interface UserState {
  profile: UserProfile;
  stats: UserStats;
  completedLessons: string[];
  completedChallenges: string[];
  defeatedBosses: string[];
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  mistakes: MistakeRecord[];
  soundEnabled: boolean;
  voiceEnabled: boolean;
  autoVoiceNarrate: boolean;
  speechRate: number;
  theme: 'dark' | 'light';

  // Actions
  addXP: (amount: number, reason?: string) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  solveChallenge: (challengeId: string, xpReward: number) => void;
  defeatBoss: (bossId: string, xpReward: number) => void;
  recordMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp' | 'reviewed'>) => void;
  markMistakeReviewed: (id: string) => void;
  progressDailyQuest: (category: DailyQuest['category']) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  toggleVoice: () => void;
  toggleAutoVoice: () => void;
  setSpeechRate: (rate: number) => void;
  resetProgress: () => void;
  importProgress: (imported: Partial<UserState>) => void;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: {
        id: 'guest-' + Math.random().toString(36).substring(2, 9),
        username: 'QuestMaster',
        displayName: 'Novice Adventurer',
        avatar: '🧙‍♂️',
        title: 'Algorithm Initiate',
        level: 1,
        xp: 0,
        xpToNextLevel: 200,
        streakDays: 1,
        lastActiveDate: getTodayString(),
        joinedDate: getTodayString(),
        isGuest: true,
      },
      stats: {
        problemsSolved: 0,
        lessonsCompleted: 0,
        bossesDefeated: 0,
        accuracy: 100,
        totalSubmissions: 0,
        correctSubmissions: 0,
        currentStreak: 1,
        longestStreak: 1,
        weeklyActivity: [40, 60, 20, 80, 50, 100, 30],
        topicsMastered: 0,
        totalTimeSpentMinutes: 15,
      },
      completedLessons: [],
      completedChallenges: [],
      defeatedBosses: [],
      achievements: INITIAL_ACHIEVEMENTS,
      dailyQuests: getDailyQuestsForToday(getTodayString()),
      mistakes: [],
      soundEnabled: true,
      voiceEnabled: true,
      autoVoiceNarrate: false,
      speechRate: 1.0,
      theme: 'dark',

      addXP: (amount: number) => {
        set((state) => {
          let newXP = state.profile.xp + amount;
          let newLevel = state.profile.level;
          let newXpToNext = state.profile.xpToNextLevel;

          while (newXP >= newXpToNext) {
            newXP -= newXpToNext;
            newLevel += 1;
            newXpToNext = Math.round(newXpToNext * 1.35);
          }

          // Update weekly activity (today index)
          const dayOfWeek = new Date().getDay();
          const newWeekly = [...state.stats.weeklyActivity];
          newWeekly[dayOfWeek] = (newWeekly[dayOfWeek] || 0) + amount;

          const updatedProfile = {
            ...state.profile,
            xp: newXP,
            level: newLevel,
            xpToNextLevel: newXpToNext,
          };

          // Background sync to Supabase if configured
          syncProgressToCloud({
            userId: state.profile.id,
            xp: newXP,
            level: newLevel,
            streak: state.profile.streakDays,
            completedLessons: state.completedLessons,
            achievements: state.achievements.filter((a) => a.isUnlocked).map((a) => a.id),
          });

          return {
            profile: updatedProfile,
            stats: {
              ...state.stats,
              weeklyActivity: newWeekly,
            },
          };
        });
      },

      completeLesson: (lessonId: string, xpReward: number) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return; // Prevent duplicate rewards

        const newCompleted = [...state.completedLessons, lessonId];
        state.addXP(xpReward);

        // Update achievements
        const updatedAchievements = state.achievements.map((ach) => {
          if (ach.id === 'first-steps' && !ach.isUnlocked) {
            return { ...ach, progress: 1, isUnlocked: true, unlockedAt: new Date().toISOString() };
          }
          return ach;
        });

        state.progressDailyQuest('visualize');

        set({
          completedLessons: newCompleted,
          achievements: updatedAchievements,
          stats: {
            ...state.stats,
            lessonsCompleted: newCompleted.length,
            topicsMastered: Math.floor(newCompleted.length / 2),
          },
        });
      },

      solveChallenge: (challengeId: string, xpReward: number) => {
        const state = get();
        const alreadySolved = state.completedChallenges.includes(challengeId);
        const newChallenges = alreadySolved ? state.completedChallenges : [...state.completedChallenges, challengeId];

        if (!alreadySolved) {
          state.addXP(xpReward);
        }

        const totalSubs = state.stats.totalSubmissions + 1;
        const correctSubs = state.stats.correctSubmissions + 1;
        const accuracy = Math.round((correctSubs / totalSubs) * 100);

        // Update achievements
        const updatedAchievements = state.achievements.map((ach) => {
          if (ach.id === 'pointer-ninja' && !ach.isUnlocked) {
            const nextProg = ach.progress + 1;
            return {
              ...ach,
              progress: nextProg,
              isUnlocked: nextProg >= ach.maxProgress,
              unlockedAt: nextProg >= ach.maxProgress ? new Date().toISOString() : null,
            };
          }
          return ach;
        });

        state.progressDailyQuest('solve');

        set({
          completedChallenges: newChallenges,
          achievements: updatedAchievements,
          stats: {
            ...state.stats,
            problemsSolved: newChallenges.length,
            totalSubmissions: totalSubs,
            correctSubmissions: correctSubs,
            accuracy,
          },
        });
      },

      defeatBoss: (bossId: string, xpReward: number) => {
        const state = get();
        if (state.defeatedBosses.includes(bossId)) return;

        const newBosses = [...state.defeatedBosses, bossId];
        state.addXP(xpReward);

        const updatedAchievements = state.achievements.map((ach) => {
          if (ach.id === 'boss-slayer' && !ach.isUnlocked) {
            return { ...ach, progress: 1, isUnlocked: true, unlockedAt: new Date().toISOString() };
          }
          return ach;
        });

        set({
          defeatedBosses: newBosses,
          achievements: updatedAchievements,
          stats: {
            ...state.stats,
            bossesDefeated: newBosses.length,
          },
        });
      },

      recordMistake: (mistake) => {
        set((state) => ({
          mistakes: [
            {
              ...mistake,
              id: 'err-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
              timestamp: new Date().toISOString(),
              reviewed: false,
            },
            ...state.mistakes,
          ],
          stats: {
            ...state.stats,
            totalSubmissions: state.stats.totalSubmissions + 1,
            accuracy: Math.round(
              (state.stats.correctSubmissions / (state.stats.totalSubmissions + 1)) * 100
            ),
          },
        }));
      },

      markMistakeReviewed: (id: string) => {
        set((state) => {
          const updated = state.mistakes.map((m) =>
            m.id === id ? { ...m, reviewed: true } : m
          );

          // Unlock Bug Hunter achievement
          const updatedAchievements = state.achievements.map((ach) => {
            if (ach.id === 'bug-hunter' && !ach.isUnlocked) {
              return { ...ach, progress: 1, isUnlocked: true, unlockedAt: new Date().toISOString() };
            }
            return ach;
          });

          return {
            mistakes: updated,
            achievements: updatedAchievements,
          };
        });
        get().addXP(30);
      },

      progressDailyQuest: (category) => {
        set((state) => {
          const updated = state.dailyQuests.map((q) => {
            if (q.category === category && !q.isCompleted) {
              const count = q.currentCount + 1;
              const isCompleted = count >= q.targetCount;
              if (isCompleted && !q.isCompleted) {
                // Award XP
                setTimeout(() => get().addXP(q.xpReward), 0);
              }
              return { ...q, currentCount: count, isCompleted };
            }
            return q;
          });
          return { dailyQuests: updated };
        });
      },

      toggleTheme: () => {
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          if (next === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: next };
        });
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      toggleVoice: () => {
        set((state) => ({ voiceEnabled: !state.voiceEnabled }));
      },

      toggleAutoVoice: () => {
        set((state) => ({ autoVoiceNarrate: !state.autoVoiceNarrate }));
      },

      setSpeechRate: (rate: number) => {
        set({ speechRate: rate });
      },

      resetProgress: () => {
        set({
          profile: {
            id: 'guest-' + Math.random().toString(36).substring(2, 9),
            username: 'QuestMaster',
            displayName: 'Novice Adventurer',
            avatar: '🧙‍♂️',
            title: 'Algorithm Initiate',
            level: 1,
            xp: 0,
            xpToNextLevel: 200,
            streakDays: 1,
            lastActiveDate: getTodayString(),
            joinedDate: getTodayString(),
            isGuest: true,
          },
          stats: {
            problemsSolved: 0,
            lessonsCompleted: 0,
            bossesDefeated: 0,
            accuracy: 100,
            totalSubmissions: 0,
            correctSubmissions: 0,
            currentStreak: 1,
            longestStreak: 1,
            weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
            topicsMastered: 0,
            totalTimeSpentMinutes: 0,
          },
          completedLessons: [],
          completedChallenges: [],
          defeatedBosses: [],
          achievements: INITIAL_ACHIEVEMENTS,
          dailyQuests: getDailyQuestsForToday(getTodayString()),
          mistakes: [],
        });
      },

      importProgress: (imported: Partial<UserState>) => {
        set((state) => ({
          ...state,
          ...(imported.profile ? { profile: { ...state.profile, ...imported.profile } } : {}),
          ...(imported.stats ? { stats: { ...state.stats, ...imported.stats } } : {}),
          ...(Array.isArray(imported.completedLessons) ? { completedLessons: imported.completedLessons } : {}),
          ...(Array.isArray(imported.completedChallenges) ? { completedChallenges: imported.completedChallenges } : {}),
          ...(Array.isArray(imported.defeatedBosses) ? { defeatedBosses: imported.defeatedBosses } : {}),
          ...(Array.isArray(imported.achievements) ? { achievements: imported.achievements } : {}),
          ...(Array.isArray(imported.dailyQuests) ? { dailyQuests: imported.dailyQuests } : {}),
          ...(Array.isArray(imported.mistakes) ? { mistakes: imported.mistakes } : {}),
        }));
      },
    }),
    {
      name: 'dsa_quest_user_v1',
    }
  )
);
