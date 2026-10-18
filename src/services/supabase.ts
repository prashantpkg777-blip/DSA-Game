import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback to demo local mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

// Graceful client creation
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface CloudSyncPayload {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  achievements: string[];
}

export async function syncProgressToCloud(payload: CloudSyncPayload): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    // In local demo mode, progress is safely managed via localStorage Zustand persistence
    return false;
  }

  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: payload.userId,
        xp: payload.xp,
        level: payload.level,
        streak: payload.streak,
        completed_lessons: payload.completedLessons,
        achievements: payload.achievements,
        updated_at: new Date().toISOString(),
      });

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
