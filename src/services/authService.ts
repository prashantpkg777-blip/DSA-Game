import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
  displayName?: string;
  avatar?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user: User | null;
  session: Session | null;
  error?: string;
}

export const authService = {
  isConfigured(): boolean {
    return isSupabaseConfigured && supabase !== null;
  },

  async signUp({ email, password, username, displayName, avatar }: SignUpParams): Promise<AuthResult> {
    if (!supabase || !isSupabaseConfigured) {
      return {
        success: false,
        user: null,
        session: null,
        error: 'Supabase backend is not configured. Running in offline guest mode.',
      };
    }

    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || cleanUsername.length < 3) {
      return {
        success: false,
        user: null,
        session: null,
        error: 'Username must be at least 3 characters long.',
      };
    }

    if (!email || !email.includes('@')) {
      return {
        success: false,
        user: null,
        session: null,
        error: 'Please enter a valid email address.',
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        user: null,
        session: null,
        error: 'Password must be at least 6 characters long.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: cleanUsername,
            display_name: displayName?.trim() || cleanUsername,
            avatar: avatar || '🧙‍♂️',
          },
        },
      });

      if (error) {
        return {
          success: false,
          user: null,
          session: null,
          error: error.message,
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      return {
        success: false,
        user: null,
        session: null,
        error: err?.message || 'Unexpected signup failure',
      };
    }
  },

  async signIn({ email, password }: SignInParams): Promise<AuthResult> {
    if (!supabase || !isSupabaseConfigured) {
      return {
        success: false,
        user: null,
        session: null,
        error: 'Supabase backend is not configured. Running in offline guest mode.',
      };
    }

    if (!email || !password) {
      return {
        success: false,
        user: null,
        session: null,
        error: 'Please enter your email and password.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return {
          success: false,
          user: null,
          session: null,
          error: error.message,
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      return {
        success: false,
        user: null,
        session: null,
        error: err?.message || 'Unexpected login failure',
      };
    }
  },

  async signOut(): Promise<{ success: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error signing out' };
    }
  },

  async getSession(): Promise<Session | null> {
    if (!supabase || !isSupabaseConfigured) return null;
    try {
      const { data } = await supabase.auth.getSession();
      return data.session;
    } catch {
      return null;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    if (!supabase || !isSupabaseConfigured) return null;
    try {
      const { data } = await supabase.auth.getUser();
      return data.user;
    } catch {
      return null;
    }
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!supabase || !isSupabaseConfigured) {
      return { unsubscribe: () => {} };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return {
      unsubscribe: () => {
        subscription.unsubscribe();
      },
    };
  },

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'Supabase backend is not configured.' };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Password reset request failed.' };
    }
  },
};
