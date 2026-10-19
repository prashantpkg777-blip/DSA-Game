import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { progressService } from './progressService';
import { authService } from './authService';

export { supabase, isSupabaseConfigured, authService, progressService };

export interface CloudSyncPayload {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  achievements: string[];
}

/**
 * Backward compatibility sync handler
 */
export async function syncProgressToCloud(payload: CloudSyncPayload): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('user_stats')
      .update({
        current_streak: payload.streak,
        lessons_completed: payload.completedLessons.length,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', payload.userId);

    if (error) {
      console.warn('Supabase sync warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Cloud sync error:', err);
    return false;
  }
}
