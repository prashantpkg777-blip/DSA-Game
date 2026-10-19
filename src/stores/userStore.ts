import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserStats, Achievement, DailyQuest, MistakeRecord, ActivityEventType } from '../types/gamification';
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
    progress: 0,
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

// Timezone-safe local calendar date (YYYY-MM-DD)
export function getLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyQuestsForToday(dateStr: string): DailyQuest[] {
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
      category: 'quiz',
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
  completeLesson: (lessonId: string, xpReward: number, topicCategory?: string) => void;
  solveChallenge: (challengeId: string, xpReward: number, topicCategory?: string) => void;
  defeatBoss: (bossId: string, xpReward: number) => void;
  recordMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp' | 'reviewed'>) => void;
  markMistakeReviewed: (id: string) => void;
  progressActivity: (eventType: ActivityEventType) => void;
  progressDailyQuest: (category: DailyQuest['category']) => void;
  checkDateRollover: () => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  toggleVoice: () => void;
  toggleAutoVoice: () => void;
  setSpeechRate: (rate: number) => void;
  resetProgress: () => void;
  importProgress: (imported: Partial<UserState>) => void;
}

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
        streakDays: 0, // Starts at 0 until first recorded activity
        lastActiveDate: '',
        joinedDate: getLocalDateString(),
        isGuest: true,
      },
      stats: {
        problemsSolved: 0,
        lessonsCompleted: 0,
        bossesDefeated: 0,
        accuracy: 0, // Accurate zero state
        totalSubmissions: 0,
        correctSubmissions: 0,
        currentStreak: 0,
        longestStreak: 0,
        weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Sun-Sat zero activity
        topicsMastered: 0,
        totalTimeSpentMinutes: 0,
      },
      completedLessons: [],
      completedChallenges: [],
      defeatedBosses: [],
      achievements: INITIAL_ACHIEVEMENTS,
      dailyQuests: getDailyQuestsForToday(getLocalDateString()),
      mistakes: [],
      soundEnabled: true,
      voiceEnabled: true,
      autoVoiceNarrate: false,
      speechRate: 1.0,
      theme: 'dark',

      checkDateRollover: () => {
        const today = getLocalDateString();
        const currentQuests = get().dailyQuests;
        if (currentQuests.length === 0 || currentQuests[0]?.dateAssigned !== today) {
          set({ dailyQuests: getDailyQuestsForToday(today) });
        }
      },

      addXP: (amount: number) => {
        get().checkDateRollover();

        set((state) => {
          let newXP = state.profile.xp + amount;
          let newLevel = state.profile.level;
          let newXpToNext = state.profile.xpToNextLevel;

          while (newXP >= newXpToNext) {
            newXP -= newXpToNext;
            newLevel += 1;
            newXpToNext = Math.round(newXpToNext * 1.35);
          }

          // Local date calculations for streak and activity
          const today = getLocalDateString();
          const yesterday = getYesterdayDateString();
          const dayOfWeek = new Date().getDay();

          let newStreak = state.profile.streakDays;
          if (!state.profile.lastActiveDate) {
            newStreak = 1;
          } else if (state.profile.lastActiveDate === today) {
            newStreak = state.profile.streakDays > 0 ? state.profile.streakDays : 1;
          } else if (state.profile.lastActiveDate === yesterday) {
            newStreak = state.profile.streakDays + 1;
          } else {
            newStreak = 1;
          }

          const newLongestStreak = Math.max(state.stats.longestStreak, newStreak);

          // Update weekly activity for local day index
          const newWeekly = [...state.stats.weeklyActivity];
          newWeekly[dayOfWeek] = (newWeekly[dayOfWeek] || 0) + amount;

          // Check consistency-champion achievement
          const updatedAchievements = state.achievements.map((ach) => {
            if (ach.id === 'consistency-champion') {
              const currentProg = Math.min(3, newStreak);
              const isUnlocked = currentProg >= 3;
              return {
                ...ach,
                progress: currentProg,
                isUnlocked,
                unlockedAt: isUnlocked && !ach.isUnlocked ? new Date().toISOString() : ach.unlockedAt,
              };
            }
            return ach;
          });

          const updatedProfile = {
            ...state.profile,
            xp: newXP,
            level: newLevel,
            xpToNextLevel: newXpToNext,
            streakDays: newStreak,
            lastActiveDate: today,
          };

          // Background sync to Supabase if configured
          syncProgressToCloud({
            userId: state.profile.id,
            xp: newXP,
            level: newLevel,
            streak: newStreak,
            completedLessons: state.completedLessons,
            achievements: updatedAchievements.filter((a) => a.isUnlocked).map((a) => a.id),
          });

          return {
            profile: updatedProfile,
            achievements: updatedAchievements,
            stats: {
              ...state.stats,
              currentStreak: newStreak,
              longestStreak: newLongestStreak,
              weeklyActivity: newWeekly,
            },
          };
        });
      },

      completeLesson: (lessonId: string, xpReward: number, topicCategory?: string) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return; // Prevent duplicate rewards

        const newCompleted = [...state.completedLessons, lessonId];
        state.addXP(xpReward);

        // Update achievements accurately
        const isSorting = topicCategory === 'sorting' || lessonId.toLowerCase().includes('sort');
        const updatedAchievements = state.achievements.map((ach) => {
          if (ach.id === 'first-steps' && !ach.isUnlocked) {
            return { ...ach, progress: 1, isUnlocked: true, unlockedAt: new Date().toISOString() };
          }
          if (ach.id === 'sorting-samurai' && isSorting && !ach.isUnlocked) {
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

        state.progressActivity('lesson_completed');

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

      solveChallenge: (challengeId: string, xpReward: number, topicCategory?: string) => {
        const state = get();
        const alreadySolved = state.completedChallenges.includes(challengeId);
        const newChallenges = alreadySolved ? state.completedChallenges : [...state.completedChallenges, challengeId];

        if (!alreadySolved) {
          state.addXP(xpReward);
        }

        const totalSubs = state.stats.totalSubmissions + 1;
        const correctSubs = state.stats.correctSubmissions + 1;
        const accuracy = Math.round((correctSubs / totalSubs) * 100);

        // Update achievements strictly by topic/category
        const isPointerOrLinked = 
          topicCategory === 'linked-lists' || 
          topicCategory === 'two-pointers' ||
          challengeId.toLowerCase().includes('pointer') ||
          challengeId.toLowerCase().includes('linked') ||
          challengeId.toLowerCase().includes('floyd') ||
          challengeId.toLowerCase().includes('reverse');

        const isSorting = 
          topicCategory === 'sorting' || 
          challengeId.toLowerCase().includes('sort');

        const updatedAchievements = state.achievements.map((ach) => {
          if (ach.id === 'pointer-ninja' && isPointerOrLinked && !ach.isUnlocked) {
            const nextProg = ach.progress + 1;
            return {
              ...ach,
              progress: nextProg,
              isUnlocked: nextProg >= ach.maxProgress,
              unlockedAt: nextProg >= ach.maxProgress ? new Date().toISOString() : null,
            };
          }
          if (ach.id === 'sorting-samurai' && isSorting && !ach.isUnlocked) {
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

        state.progressActivity('challenge_solved');

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

        state.progressActivity('boss_defeated');

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
        set((state) => {
          const totalSubs = state.stats.totalSubmissions + 1;
          const accuracy = Math.round((state.stats.correctSubmissions / totalSubs) * 100);

          return {
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
              totalSubmissions: totalSubs,
              accuracy,
            },
          };
        });
      },

      markMistakeReviewed: (id: string) => {
        const state = get();
        const targetMistake = state.mistakes.find((m) => m.id === id);

        // Security / Fraud prevention: mistake must exist and must not have been reviewed before
        if (!targetMistake || targetMistake.reviewed) {
          return;
        }

        set((s) => {
          const updated = s.mistakes.map((m) =>
            m.id === id ? { ...m, reviewed: true } : m
          );

          // Unlock Bug Hunter achievement on first genuine review
          const updatedAchievements = s.achievements.map((ach) => {
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

        // Award XP only for legitimate first review
        get().addXP(30, 'Reviewed mistake in Error Notebook');
        get().progressActivity('mistake_reviewed');
      },

      progressActivity: (eventType: ActivityEventType) => {
        get().checkDateRollover();

        // Map explicit event type to quest category
        let questCategory: DailyQuest['category'] | null = null;
        if (eventType === 'visualization_completed') questCategory = 'visualize';
        else if (eventType === 'quiz_passed') questCategory = 'quiz';
        else if (eventType === 'challenge_solved') questCategory = 'solve';
        else if (eventType === 'lesson_completed') questCategory = 'lesson';
        else if (eventType === 'mistake_reviewed') questCategory = 'review';
        else if (eventType === 'boss_defeated') questCategory = 'boss';

        if (!questCategory) return;
        get().progressDailyQuest(questCategory);
      },

      progressDailyQuest: (category) => {
        set((state) => {
          let xpToAward = 0;
          const updated = state.dailyQuests.map((q) => {
            if (q.category === category && !q.isCompleted) {
              const count = q.currentCount + 1;
              const isCompleted = count >= q.targetCount;
              if (isCompleted && !q.isCompleted) {
                xpToAward += q.xpReward;
              }
              return { ...q, currentCount: count, isCompleted };
            }
            return q;
          });

          if (xpToAward > 0) {
            setTimeout(() => get().addXP(xpToAward, 'Completed daily quest'), 0);
          }

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
            streakDays: 0,
            lastActiveDate: '',
            joinedDate: getLocalDateString(),
            isGuest: true,
          },
          stats: {
            problemsSolved: 0,
            lessonsCompleted: 0,
            bossesDefeated: 0,
            accuracy: 0,
            totalSubmissions: 0,
            correctSubmissions: 0,
            currentStreak: 0,
            longestStreak: 0,
            weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
            topicsMastered: 0,
            totalTimeSpentMinutes: 0,
          },
          completedLessons: [],
          completedChallenges: [],
          defeatedBosses: [],
          achievements: INITIAL_ACHIEVEMENTS,
          dailyQuests: getDailyQuestsForToday(getLocalDateString()),
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
