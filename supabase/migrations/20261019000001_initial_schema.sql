-- ==============================================================================
-- DSA CHAOS — SUPABASE POSTGRESQL INITIAL SCHEMA
-- Migration: 20261019000001_initial_schema.sql
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT,
    avatar TEXT NOT NULL DEFAULT '🧙‍♂️',
    title TEXT NOT NULL DEFAULT 'Algorithm Initiate',
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    xp_to_next_level INTEGER NOT NULL DEFAULT 200 CHECK (xp_to_next_level > 0),
    streak_days INTEGER NOT NULL DEFAULT 0 CHECK (streak_days >= 0),
    last_active_date DATE,
    joined_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. World Regions Table
CREATE TABLE IF NOT EXISTS public.worlds (
    id TEXT PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    theme_color TEXT NOT NULL DEFAULT '#C6FF00',
    accent_glow TEXT NOT NULL DEFAULT 'rgba(198, 255, 0, 0.4)',
    icon TEXT NOT NULL DEFAULT 'Sparkles',
    required_level INTEGER NOT NULL DEFAULT 1,
    unlocked_by_default BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Topics Table
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    world_id TEXT NOT NULL REFERENCES public.worlds(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    xp_reward INTEGER NOT NULL DEFAULT 50 CHECK (xp_reward >= 0),
    icon_name TEXT NOT NULL DEFAULT 'Code2',
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced')),
    summary TEXT,
    subtopics TEXT[] NOT NULL DEFAULT '{}',
    visualizer_type TEXT NOT NULL DEFAULT 'general',
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Lessons Submodules Table (Granular lesson chapters)
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Coding Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced')),
    description TEXT NOT NULL,
    constraints TEXT[] NOT NULL DEFAULT '{}',
    examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    starter_code JSONB NOT NULL DEFAULT '{}'::jsonb,
    function_name TEXT NOT NULL,
    optimal_solution JSONB NOT NULL DEFAULT '{}'::jsonb,
    hints TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Test Cases Table
CREATE TABLE IF NOT EXISTS public.test_cases (
    id TEXT PRIMARY KEY,
    challenge_id TEXT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    explanation TEXT,
    is_hidden BOOLEAN NOT NULL DEFAULT false,
    order_index INTEGER NOT NULL DEFAULT 1
);

-- 8. Quiz Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    code_snippet TEXT,
    hint TEXT,
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. User Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT true,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    score INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_topic_progress UNIQUE (user_id, topic_id)
);

-- 10. User Challenge Progress Table
CREATE TABLE IF NOT EXISTS public.user_challenge_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id TEXT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT true,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    attempts INTEGER NOT NULL DEFAULT 1,
    language TEXT NOT NULL DEFAULT 'javascript',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_challenge_progress UNIQUE (user_id, challenge_id)
);

-- 11. Code Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id TEXT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'error', 'timeout')),
    passed_tests INTEGER NOT NULL DEFAULT 0,
    total_tests INTEGER NOT NULL DEFAULT 0,
    execution_time_ms INTEGER NOT NULL DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. User Stats Table
CREATE TABLE IF NOT EXISTS public.user_stats (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    problems_solved INTEGER NOT NULL DEFAULT 0,
    lessons_completed INTEGER NOT NULL DEFAULT 0,
    bosses_defeated INTEGER NOT NULL DEFAULT 0,
    accuracy NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    total_submissions INTEGER NOT NULL DEFAULT 0,
    correct_submissions INTEGER NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    weekly_activity INTEGER[] NOT NULL DEFAULT '{0,0,0,0,0,0,0}',
    topics_mastered INTEGER NOT NULL DEFAULT 0,
    total_time_spent_minutes INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. XP Transactions Table (Audit trail of every XP reward)
CREATE TABLE IF NOT EXISTS public.xp_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount <> 0),
    reason TEXT NOT NULL,
    source_type TEXT NOT NULL,
    source_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Achievements Master Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('learning', 'mastery', 'streak', 'speed', 'special')),
    icon TEXT NOT NULL,
    xp_reward INTEGER NOT NULL DEFAULT 50,
    max_progress INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. User Achievements Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0,
    is_unlocked BOOLEAN NOT NULL DEFAULT false,
    unlocked_at TIMESTAMPTZ,
    CONSTRAINT uq_user_achievement UNIQUE (user_id, achievement_id)
);

-- 16. Daily Quests Table
CREATE TABLE IF NOT EXISTS public.daily_quests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('solve', 'visualize', 'quiz', 'lesson', 'review', 'streak', 'boss')),
    xp_reward INTEGER NOT NULL DEFAULT 50,
    target_count INTEGER NOT NULL DEFAULT 1,
    date_assigned DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. User Daily Quest Progress Table
CREATE TABLE IF NOT EXISTS public.user_daily_quest_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quest_id TEXT NOT NULL REFERENCES public.daily_quests(id) ON DELETE CASCADE,
    current_count INTEGER NOT NULL DEFAULT 0,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    claimed_at TIMESTAMPTZ,
    date_assigned DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT uq_user_daily_quest UNIQUE (user_id, quest_id)
);

-- 18. Activity Events Table
CREATE TABLE IF NOT EXISTS public.activity_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. Mistakes / Error Notebook Table
CREATE TABLE IF NOT EXISTS public.mistakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('quiz', 'complexity', 'visualizer', 'coding')),
    question_or_challenge TEXT NOT NULL,
    user_answer TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    explanation TEXT NOT NULL,
    reviewed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. Optimized Indexes
CREATE INDEX IF NOT EXISTS idx_topics_world_id ON public.topics(world_id);
CREATE INDEX IF NOT EXISTS idx_challenges_topic_id ON public.challenges(topic_id);
CREATE INDEX IF NOT EXISTS idx_test_cases_challenge_id ON public.test_cases(challenge_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON public.questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user ON public.user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenge_progress_user ON public.user_challenge_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_challenge_id ON public.submissions(challenge_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user ON public.xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_mistakes_user_id ON public.mistakes(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_events_user ON public.activity_events(user_id);

-- 21. Automatic Updated At Timestamp Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_user_stats_updated_at ON public.user_stats;
CREATE TRIGGER set_user_stats_updated_at
    BEFORE UPDATE ON public.user_stats
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 22. Automatic User Profile Initialization Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_username TEXT;
    avatar_choice TEXT;
BEGIN
    -- Extract username from raw_user_meta_data or fallback to email prefix
    new_username := COALESCE(
        NEW.raw_user_meta_data->>'username',
        split_part(NEW.email, '@', 1),
        'ChaosCoder_' || substr(NEW.id::text, 1, 6)
    );
    
    avatar_choice := COALESCE(NEW.raw_user_meta_data->>'avatar', '🧙‍♂️');

    -- Create profile
    INSERT INTO public.profiles (
        id,
        username,
        display_name,
        avatar,
        title,
        level,
        xp,
        xp_to_next_level,
        streak_days,
        joined_date
    ) VALUES (
        NEW.id,
        new_username,
        COALESCE(NEW.raw_user_meta_data->>'display_name', new_username),
        avatar_choice,
        'Algorithm Initiate',
        1,
        0,
        200,
        0,
        CURRENT_DATE
    )
    ON CONFLICT (id) DO NOTHING;

    -- Create stats record
    INSERT INTO public.user_stats (
        user_id,
        problems_solved,
        lessons_completed,
        bosses_defeated,
        accuracy,
        total_submissions,
        correct_submissions,
        current_streak,
        longest_streak,
        weekly_activity,
        topics_mastered,
        total_time_spent_minutes
    ) VALUES (
        NEW.id,
        0, 0, 0, 0.00, 0, 0, 0, 0, '{0,0,0,0,0,0,0}', 0, 0
    )
    ON CONFLICT (user_id) DO NOTHING;

    -- Initialize standard user achievements
    INSERT INTO public.user_achievements (user_id, achievement_id, progress, is_unlocked)
    SELECT NEW.id, a.id, 0, false
    FROM public.achievements a
    ON CONFLICT (user_id, achievement_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
