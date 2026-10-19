export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar: string;
          title: string;
          level: number;
          xp: number;
          xp_to_next_level: number;
          streak_days: number;
          last_active_date: string | null;
          joined_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar?: string;
          title?: string;
          level?: number;
          xp?: number;
          xp_to_next_level?: number;
          streak_days?: number;
          last_active_date?: string | null;
          joined_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          avatar?: string;
          title?: string;
          level?: number;
          xp?: number;
          xp_to_next_level?: number;
          streak_days?: number;
          last_active_date?: string | null;
          joined_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      worlds: {
        Row: {
          id: string;
          number: number;
          name: string;
          tagline: string | null;
          description: string | null;
          theme_color: string;
          accent_glow: string;
          icon: string;
          required_level: number;
          unlocked_by_default: boolean;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          number: number;
          name: string;
          tagline?: string | null;
          description?: string | null;
          theme_color?: string;
          accent_glow?: string;
          icon?: string;
          required_level?: number;
          unlocked_by_default?: boolean;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          number?: number;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          theme_color?: string;
          accent_glow?: string;
          icon?: string;
          required_level?: number;
          unlocked_by_default?: boolean;
          is_published?: boolean;
          created_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          world_id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          category: string;
          order_index: number;
          xp_reward: number;
          icon_name: string;
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
          summary: string | null;
          subtopics: string[];
          visualizer_type: string;
          content: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          world_id: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          category: string;
          order_index?: number;
          xp_reward?: number;
          icon_name?: string;
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
          summary?: string | null;
          subtopics?: string[];
          visualizer_type?: string;
          content?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          world_id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          category?: string;
          order_index?: number;
          xp_reward?: number;
          icon_name?: string;
          difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
          summary?: string | null;
          subtopics?: string[];
          visualizer_type?: string;
          content?: Json;
          created_at?: string;
        };
      };
      challenges: {
        Row: {
          id: string;
          topic_id: string;
          title: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          description: string;
          constraints: string[];
          examples: Json;
          starter_code: Json;
          function_name: string;
          optimal_solution: Json;
          hints: string[];
          created_at: string;
        };
        Insert: {
          id: string;
          topic_id: string;
          title: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          description: string;
          constraints?: string[];
          examples?: Json;
          starter_code?: Json;
          function_name: string;
          optimal_solution?: Json;
          hints?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          topic_id?: string;
          title?: string;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          description?: string;
          constraints?: string[];
          examples?: Json;
          starter_code?: Json;
          function_name?: string;
          optimal_solution?: Json;
          hints?: string[];
          created_at?: string;
        };
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          completed: boolean;
          completed_at: string;
          score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: string;
          completed?: boolean;
          completed_at?: string;
          score?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string;
          completed?: boolean;
          completed_at?: string;
          score?: number;
          created_at?: string;
        };
      };
      user_challenge_progress: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          completed: boolean;
          completed_at: string;
          attempts: number;
          language: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_id: string;
          completed?: boolean;
          completed_at?: string;
          attempts?: number;
          language?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          challenge_id?: string;
          completed?: boolean;
          completed_at?: string;
          attempts?: number;
          language?: string;
          created_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          language: string;
          code: string;
          status: 'passed' | 'failed' | 'error' | 'timeout';
          passed_tests: number;
          total_tests: number;
          execution_time_ms: number;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_id: string;
          language: string;
          code: string;
          status: 'passed' | 'failed' | 'error' | 'timeout';
          passed_tests?: number;
          total_tests?: number;
          execution_time_ms?: number;
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          challenge_id?: string;
          language?: string;
          code?: string;
          status?: 'passed' | 'failed' | 'error' | 'timeout';
          passed_tests?: number;
          total_tests?: number;
          execution_time_ms?: number;
          error_message?: string | null;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          user_id: string;
          problems_solved: number;
          lessons_completed: number;
          bosses_defeated: number;
          accuracy: number;
          total_submissions: number;
          correct_submissions: number;
          current_streak: number;
          longest_streak: number;
          weekly_activity: number[];
          topics_mastered: number;
          total_time_spent_minutes: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          problems_solved?: number;
          lessons_completed?: number;
          bosses_defeated?: number;
          accuracy?: number;
          total_submissions?: number;
          correct_submissions?: number;
          current_streak?: number;
          longest_streak?: number;
          weekly_activity?: number[];
          topics_mastered?: number;
          total_time_spent_minutes?: number;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          problems_solved?: number;
          lessons_completed?: number;
          bosses_defeated?: number;
          accuracy?: number;
          total_submissions?: number;
          correct_submissions?: number;
          current_streak?: number;
          longest_streak?: number;
          weekly_activity?: number[];
          topics_mastered?: number;
          total_time_spent_minutes?: number;
          updated_at?: string;
        };
      };
      xp_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          reason: string;
          source_type: string;
          source_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          reason: string;
          source_type: string;
          source_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          reason?: string;
          source_type?: string;
          source_id?: string | null;
          created_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: 'learning' | 'mastery' | 'streak' | 'speed' | 'special';
          icon: string;
          xp_reward: number;
          max_progress: number;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          category: 'learning' | 'mastery' | 'streak' | 'speed' | 'special';
          icon: string;
          xp_reward?: number;
          max_progress?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: 'learning' | 'mastery' | 'streak' | 'speed' | 'special';
          icon?: string;
          xp_reward?: number;
          max_progress?: number;
          created_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          progress: number;
          is_unlocked: boolean;
          unlocked_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          progress?: number;
          is_unlocked?: boolean;
          unlocked_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          progress?: number;
          is_unlocked?: boolean;
          unlocked_at?: string | null;
        };
      };
      daily_quests: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: 'solve' | 'visualize' | 'quiz' | 'lesson' | 'review' | 'streak' | 'boss';
          xp_reward: number;
          target_count: number;
          date_assigned: string;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          category: 'solve' | 'visualize' | 'quiz' | 'lesson' | 'review' | 'streak' | 'boss';
          xp_reward?: number;
          target_count?: number;
          date_assigned?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: 'solve' | 'visualize' | 'quiz' | 'lesson' | 'review' | 'streak' | 'boss';
          xp_reward?: number;
          target_count?: number;
          date_assigned?: string;
          created_at?: string;
        };
      };
      user_daily_quest_progress: {
        Row: {
          id: string;
          user_id: string;
          quest_id: string;
          current_count: number;
          is_completed: boolean;
          claimed_at: string | null;
          date_assigned: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quest_id: string;
          current_count?: number;
          is_completed?: boolean;
          claimed_at?: string | null;
          date_assigned?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quest_id?: string;
          current_count?: number;
          is_completed?: boolean;
          claimed_at?: string | null;
          date_assigned?: string;
        };
      };
      activity_events: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          details: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          details?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?: string;
          details?: Json;
          created_at?: string;
        };
      };
      mistakes: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          topic_title: string;
          type: 'quiz' | 'complexity' | 'visualizer' | 'coding';
          question_or_challenge: string;
          user_answer: string;
          correct_answer: string;
          explanation: string;
          reviewed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: string;
          topic_title: string;
          type: 'quiz' | 'complexity' | 'visualizer' | 'coding';
          question_or_challenge: string;
          user_answer: string;
          correct_answer: string;
          explanation: string;
          reviewed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string;
          topic_title?: string;
          type?: 'quiz' | 'complexity' | 'visualizer' | 'coding';
          question_or_challenge?: string;
          user_answer?: string;
          correct_answer?: string;
          explanation?: string;
          reviewed?: boolean;
          created_at?: string;
        };
      };
    };
    Functions: {
      complete_lesson: {
        Args: {
          p_topic_id: string;
          p_xp_reward?: number;
        };
        Returns: Json;
      };
      submit_challenge_result: {
        Args: {
          p_challenge_id: string;
          p_passed: boolean;
          p_language: string;
          p_code: string;
          p_passed_tests: number;
          p_total_tests: number;
          p_execution_time_ms?: number;
          p_xp_reward?: number;
        };
        Returns: Json;
      };
      claim_daily_quest: {
        Args: {
          p_quest_id: string;
        };
        Returns: Json;
      };
      defeat_boss_battle: {
        Args: {
          p_boss_id: string;
          p_xp_reward?: number;
        };
        Returns: Json;
      };
      review_user_mistake: {
        Args: {
          p_mistake_id: string;
        };
        Returns: Json;
      };
      migrate_guest_progress: {
        Args: {
          p_guest_data: Json;
        };
        Returns: Json;
      };
      get_user_dashboard: {
        Args: {
          p_user_id?: string;
        };
        Returns: Json;
      };
    };
  };
}
