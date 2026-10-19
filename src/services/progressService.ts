import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile, UserStats, Achievement, DailyQuest, MistakeRecord } from '../types/gamification';

export interface CloudProgressResult {
  success: boolean;
  offline?: boolean;
  data?: any;
  error?: string;
}

export interface UserDashboardData {
  profile: UserProfile | null;
  stats: UserStats | null;
  completedLessons: string[];
  completedChallenges: string[];
  achievements: Achievement[];
  recentSubmissions: any[];
  dailyQuests: DailyQuest[];
}

export const progressService = {
  isConfigured(): boolean {
    return isSupabaseConfigured && supabase !== null;
  },

  async completeLessonInCloud(topicId: string, xpReward: number = 50): Promise<CloudProgressResult> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, offline: true };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('complete_lesson', {
        p_topic_id: topicId,
        p_xp_reward: xpReward,
      });

      if (error) {
        console.warn('Supabase complete_lesson warning:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'RPC complete_lesson failed' };
    }
  },

  async submitChallengeInCloud(params: {
    challengeId: string;
    passed: boolean;
    language: string;
    code: string;
    passedTests: number;
    totalTests: number;
    executionTimeMs?: number;
    xpReward?: number;
  }): Promise<CloudProgressResult> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, offline: true };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('submit_challenge_result', {
        p_challenge_id: params.challengeId,
        p_passed: params.passed,
        p_language: params.language,
        p_code: params.code,
        p_passed_tests: params.passedTests,
        p_total_tests: params.totalTests,
        p_execution_time_ms: params.executionTimeMs || 0,
        p_xp_reward: params.xpReward || 80,
      });

      if (error) {
        console.warn('Supabase submit_challenge_result warning:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'RPC submit_challenge_result failed' };
    }
  },

  async reviewMistakeInCloud(mistakeId: string): Promise<CloudProgressResult> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, offline: true };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('review_user_mistake', {
        p_mistake_id: mistakeId,
      });

      if (error) {
        console.warn('Supabase review_user_mistake warning:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'RPC review_user_mistake failed' };
    }
  },

  async claimDailyQuestInCloud(questId: string): Promise<CloudProgressResult> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, offline: true };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('claim_daily_quest', {
        p_quest_id: questId,
      });

      if (error) {
        console.warn('Supabase claim_daily_quest warning:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'RPC claim_daily_quest failed' };
    }
  },

  async defeatBossInCloud(bossId: string, xpReward: number = 250): Promise<CloudProgressResult> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, offline: true };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('defeat_boss_battle', {
        p_boss_id: bossId,
        p_xp_reward: xpReward,
      });

      if (error) {
        console.warn('Supabase defeat_boss_battle warning:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'RPC defeat_boss_battle failed' };
    }
  },

  async migrateGuestProgressToCloud(guestData: {
    profile?: UserProfile;
    stats?: UserStats;
    completedLessons?: string[];
    completedChallenges?: string[];
    defeatedBosses?: string[];
    mistakes?: MistakeRecord[];
  }): Promise<CloudProgressResult> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, offline: true };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('migrate_guest_progress', {
        p_guest_data: guestData,
      });

      if (error) {
        console.warn('Supabase migrate_guest_progress warning:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Guest progress migration failed' };
    }
  },

  async fetchUserDashboard(userId?: string): Promise<{ success: boolean; data?: UserDashboardData; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'Database offline' };
    }

    try {
      const { data, error } = await (supabase.rpc as any)('get_user_dashboard', {
        p_user_id: userId,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data || typeof data !== 'object') {
        return { success: false, error: 'No data returned' };
      }

      // Map snake_case to frontend camelCase
      const profileRaw = (data as any).profile;
      const statsRaw = (data as any).stats;

      const profile: UserProfile | null = profileRaw
        ? {
            id: profileRaw.id,
            username: profileRaw.username,
            displayName: profileRaw.display_name || profileRaw.username,
            avatar: profileRaw.avatar || '🧙‍♂️',
            title: profileRaw.title || 'Algorithm Initiate',
            level: profileRaw.level || 1,
            xp: profileRaw.xp || 0,
            xpToNextLevel: profileRaw.xp_to_next_level || 200,
            streakDays: profileRaw.streak_days || 0,
            lastActiveDate: profileRaw.last_active_date || '',
            joinedDate: profileRaw.joined_date || '',
            isGuest: false,
          }
        : null;

      const stats: UserStats | null = statsRaw
        ? {
            problemsSolved: statsRaw.problems_solved || 0,
            lessonsCompleted: statsRaw.lessons_completed || 0,
            bossesDefeated: statsRaw.bosses_defeated || 0,
            accuracy: Number(statsRaw.accuracy) || 0,
            totalSubmissions: statsRaw.total_submissions || 0,
            correctSubmissions: statsRaw.correct_submissions || 0,
            currentStreak: statsRaw.current_streak || 0,
            longestStreak: statsRaw.longest_streak || 0,
            weeklyActivity: Array.isArray(statsRaw.weekly_activity) ? statsRaw.weekly_activity : [0, 0, 0, 0, 0, 0, 0],
            topicsMastered: statsRaw.topics_mastered || 0,
            totalTimeSpentMinutes: statsRaw.total_time_spent_minutes || 0,
          }
        : null;

      return {
        success: true,
        data: {
          profile,
          stats,
          completedLessons: (data as any).completedLessons || [],
          completedChallenges: (data as any).completedChallenges || [],
          achievements: (data as any).achievements || [],
          recentSubmissions: (data as any).recentSubmissions || [],
          dailyQuests: (data as any).dailyQuests || [],
        },
      };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error fetching dashboard data' };
    }
  },
};
