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
-- ==============================================================================
-- DSA CHAOS — ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 20261019000002_row_level_security.sql
-- ==============================================================================

-- 1. Enable RLS on All Public Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worlds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_quest_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 2. PUBLIC / CURRICULUM READ POLICIES
-- ==============================================================================

-- Worlds: readable by anyone (anon and authenticated)
CREATE POLICY "Allow public read access to published worlds"
    ON public.worlds FOR SELECT
    USING (is_published = true);

-- Topics: readable by anyone
CREATE POLICY "Allow public read access to topics"
    ON public.topics FOR SELECT
    USING (true);

-- Lessons: readable by anyone
CREATE POLICY "Allow public read access to lessons"
    ON public.lessons FOR SELECT
    USING (true);

-- Challenges: readable by anyone
CREATE POLICY "Allow public read access to challenges"
    ON public.challenges FOR SELECT
    USING (true);

-- Test cases: visible only if not hidden; hidden test cases reserved for secure evaluator
CREATE POLICY "Allow public read access to visible test cases"
    ON public.test_cases FOR SELECT
    USING (is_hidden = false);

-- Questions: readable by anyone
CREATE POLICY "Allow public read access to questions"
    ON public.questions FOR SELECT
    USING (true);

-- Achievements master catalog: readable by anyone
CREATE POLICY "Allow public read access to achievements"
    ON public.achievements FOR SELECT
    USING (true);

-- Daily Quests catalog: readable by anyone
CREATE POLICY "Allow public read access to daily quests"
    ON public.daily_quests FOR SELECT
    USING (true);

-- ==============================================================================
-- 3. USER PROFILE & STATS POLICIES
-- ==============================================================================

-- Profiles: Public can read for leaderboards; users can update their own profile
CREATE POLICY "Allow public read on profiles"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Allow users to update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- User Stats: read own stats; updates handled via trusted RPC or user
CREATE POLICY "Allow users to read own stats"
    ON public.user_stats FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update own stats"
    ON public.user_stats FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own stats"
    ON public.user_stats FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- 4. USER PROGRESS POLICIES
-- ==============================================================================

-- User Lesson Progress
CREATE POLICY "Allow users to read own lesson progress"
    ON public.user_lesson_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own lesson progress"
    ON public.user_lesson_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own lesson progress"
    ON public.user_lesson_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- User Challenge Progress
CREATE POLICY "Allow users to read own challenge progress"
    ON public.user_challenge_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own challenge progress"
    ON public.user_challenge_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own challenge progress"
    ON public.user_challenge_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Code Submissions: users can read and insert their own code submissions
CREATE POLICY "Allow users to read own submissions"
    ON public.submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own submissions"
    ON public.submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- XP Transactions: Users can read their own XP history (writes restricted to security definer RPC)
CREATE POLICY "Allow users to read own xp transactions"
    ON public.xp_transactions FOR SELECT
    USING (auth.uid() = user_id);

-- User Achievements
CREATE POLICY "Allow users to read own achievements"
    ON public.user_achievements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own achievements"
    ON public.user_achievements FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own achievements"
    ON public.user_achievements FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- User Daily Quest Progress
CREATE POLICY "Allow users to read own daily quest progress"
    ON public.user_daily_quest_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own daily quest progress"
    ON public.user_daily_quest_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own daily quest progress"
    ON public.user_daily_quest_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Activity Events
CREATE POLICY "Allow users to read own activity events"
    ON public.activity_events FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to record own activity events"
    ON public.activity_events FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Mistakes / Error Notebook
CREATE POLICY "Allow users to read own mistakes"
    ON public.mistakes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own mistakes"
    ON public.mistakes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own mistakes"
    ON public.mistakes FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete own mistakes"
    ON public.mistakes FOR DELETE
    USING (auth.uid() = user_id);
-- ==============================================================================
-- DSA CHAOS — ATOMIC STORED PROCEDURES & SECURE RPCS
-- Migration: 20261019000003_stored_procedures.sql
-- ==============================================================================

-- 1. Helper function to award XP and handle level-up, streaks, and weekly activity
CREATE OR REPLACE FUNCTION public.award_xp_internal(
    p_user_id UUID,
    p_amount INTEGER,
    p_reason TEXT,
    p_source_type TEXT,
    p_source_id TEXT
)
RETURNS TABLE (
    new_xp INTEGER,
    new_level INTEGER,
    new_streak INTEGER
) AS $$
DECLARE
    v_cur_xp INTEGER;
    v_cur_level INTEGER;
    v_cur_xp_to_next INTEGER;
    v_cur_streak INTEGER;
    v_last_active DATE;
    v_today DATE := CURRENT_DATE;
    v_yesterday DATE := CURRENT_DATE - 1;
    v_day_of_week INTEGER;
    v_weekly INTEGER[];
BEGIN
    IF p_amount <= 0 THEN
        SELECT xp, level, streak_days INTO v_cur_xp, v_cur_level, v_cur_streak
        FROM public.profiles WHERE id = p_user_id;
        RETURN QUERY SELECT v_cur_xp, v_cur_level, v_cur_streak;
        RETURN;
    END IF;

    -- Fetch current profile state
    SELECT xp, level, xp_to_next_level, streak_days, last_active_date
    INTO v_cur_xp, v_cur_level, v_cur_xp_to_next, v_cur_streak, v_last_active
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'User profile not found for ID %', p_user_id;
    END IF;

    -- Calculate XP and Level progression
    v_cur_xp := v_cur_xp + p_amount;
    WHILE v_cur_xp >= v_cur_xp_to_next LOOP
        v_cur_xp := v_cur_xp - v_cur_xp_to_next;
        v_cur_level := v_cur_level + 1;
        v_cur_xp_to_next := ROUND(v_cur_xp_to_next * 1.35);
    END LOOP;

    -- Streak progression logic
    IF v_last_active IS NULL THEN
        v_cur_streak := 1;
    ELSIF v_last_active = v_today THEN
        v_cur_streak := GREATEST(v_cur_streak, 1);
    ELSIF v_last_active = v_yesterday THEN
        v_cur_streak := v_cur_streak + 1;
    ELSE
        v_cur_streak := 1;
    END IF;

    -- Update profile
    UPDATE public.profiles
    SET 
        xp = v_cur_xp,
        level = v_cur_level,
        xp_to_next_level = v_cur_xp_to_next,
        streak_days = v_cur_streak,
        last_active_date = v_today,
        updated_at = NOW()
    WHERE id = p_user_id;

    -- Log transaction audit trail
    INSERT INTO public.xp_transactions (
        user_id, amount, reason, source_type, source_id
    ) VALUES (
        p_user_id, p_amount, p_reason, p_source_type, p_source_id
    );

    -- Update user stats streak and weekly activity
    v_day_of_week := EXTRACT(DOW FROM NOW())::INTEGER + 1; -- 1 = Sun, 7 = Sat
    
    SELECT weekly_activity INTO v_weekly
    FROM public.user_stats
    WHERE user_id = p_user_id
    FOR UPDATE;

    IF v_weekly IS NULL OR array_length(v_weekly, 1) <> 7 THEN
        v_weekly := '{0,0,0,0,0,0,0}';
    END IF;

    v_weekly[v_day_of_week] := COALESCE(v_weekly[v_day_of_week], 0) + p_amount;

    UPDATE public.user_stats
    SET
        current_streak = v_cur_streak,
        longest_streak = GREATEST(longest_streak, v_cur_streak),
        weekly_activity = v_weekly,
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Check Consistency Champion achievement (3 day streak)
    IF v_cur_streak >= 3 THEN
        UPDATE public.user_achievements
        SET
            progress = LEAST(3, v_cur_streak),
            is_unlocked = true,
            unlocked_at = COALESCE(unlocked_at, NOW())
        WHERE user_id = p_user_id AND achievement_id = 'consistency-champion';
    ELSE
        UPDATE public.user_achievements
        SET progress = LEAST(3, v_cur_streak)
        WHERE user_id = p_user_id AND achievement_id = 'consistency-champion' AND NOT is_unlocked;
    END IF;

    RETURN QUERY SELECT v_cur_xp, v_cur_level, v_cur_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 2. Lesson Completion Procedure
CREATE OR REPLACE FUNCTION public.complete_lesson(
    p_topic_id TEXT,
    p_xp_reward INTEGER DEFAULT 50
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_already_completed BOOLEAN;
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_streak INTEGER;
    v_total_completed INTEGER;
    v_is_sorting BOOLEAN;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    -- Check if lesson is already completed
    SELECT EXISTS (
        SELECT 1 FROM public.user_lesson_progress
        WHERE user_id = v_user_id AND topic_id = p_topic_id
    ) INTO v_already_completed;

    IF v_already_completed THEN
        SELECT xp, level, streak_days INTO v_new_xp, v_new_level, v_new_streak
        FROM public.profiles WHERE id = v_user_id;

        RETURN jsonb_build_object(
            'success', true,
            'is_first_completion', false,
            'xp_awarded', 0,
            'current_xp', v_new_xp,
            'current_level', v_new_level,
            'streak', v_new_streak
        );
    END IF;

    -- Insert progress
    INSERT INTO public.user_lesson_progress (
        user_id, topic_id, completed, completed_at, score
    ) VALUES (
        v_user_id, p_topic_id, true, NOW(), 100
    );

    -- Award XP atomically
    SELECT new_xp, new_level, new_streak 
    INTO v_new_xp, v_new_level, v_new_streak
    FROM public.award_xp_internal(
        v_user_id,
        p_xp_reward,
        'Completed topic lesson: ' || p_topic_id,
        'lesson',
        p_topic_id
    );

    -- Count total completed lessons
    SELECT COUNT(*) INTO v_total_completed
    FROM public.user_lesson_progress
    WHERE user_id = v_user_id;

    -- Update stats
    UPDATE public.user_stats
    SET
        lessons_completed = v_total_completed,
        topics_mastered = FLOOR(v_total_completed / 2.0)::INTEGER,
        updated_at = NOW()
    WHERE user_id = v_user_id;

    -- Unlock 'first-steps' achievement on first completed lesson
    UPDATE public.user_achievements
    SET
        progress = 1,
        is_unlocked = true,
        unlocked_at = COALESCE(unlocked_at, NOW())
    WHERE user_id = v_user_id AND achievement_id = 'first-steps';

    -- Check if topic is a sorting topic
    v_is_sorting := (p_topic_id ILIKE '%sort%');
    IF v_is_sorting THEN
        UPDATE public.user_achievements
        SET
            progress = LEAST(3, progress + 1),
            is_unlocked = (progress + 1 >= 3),
            unlocked_at = CASE WHEN progress + 1 >= 3 AND NOT is_unlocked THEN NOW() ELSE unlocked_at END
        WHERE user_id = v_user_id AND achievement_id = 'sorting-samurai';
    END IF;

    -- Log activity event
    INSERT INTO public.activity_events (user_id, event_type, details)
    VALUES (v_user_id, 'lesson_completed', jsonb_build_object('topic_id', p_topic_id, 'xp', p_xp_reward));

    RETURN jsonb_build_object(
        'success', true,
        'is_first_completion', true,
        'xp_awarded', p_xp_reward,
        'current_xp', v_new_xp,
        'current_level', v_new_level,
        'streak', v_new_streak,
        'lessons_completed', v_total_completed
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 3. Code Challenge Submission Procedure
CREATE OR REPLACE FUNCTION public.submit_challenge_result(
    p_challenge_id TEXT,
    p_passed BOOLEAN,
    p_language TEXT,
    p_code TEXT,
    p_passed_tests INTEGER,
    p_total_tests INTEGER,
    p_execution_time_ms INTEGER DEFAULT 0,
    p_xp_reward INTEGER DEFAULT 80
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_already_solved BOOLEAN;
    v_xp_awarded INTEGER := 0;
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_streak INTEGER;
    v_total_subs INTEGER;
    v_corr_subs INTEGER;
    v_accuracy NUMERIC(5, 2);
    v_solved_count INTEGER;
    v_is_pointer BOOLEAN;
    v_status TEXT;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    v_status := CASE WHEN p_passed THEN 'passed' ELSE 'failed' END;

    -- Record submission log
    INSERT INTO public.submissions (
        user_id, challenge_id, language, code, status,
        passed_tests, total_tests, execution_time_ms
    ) VALUES (
        v_user_id, p_challenge_id, p_language, p_code, v_status,
        p_passed_tests, p_total_tests, p_execution_time_ms
    );

    -- Check if challenge was already solved
    SELECT EXISTS (
        SELECT 1 FROM public.user_challenge_progress
        WHERE user_id = v_user_id AND challenge_id = p_challenge_id
    ) INTO v_already_solved;

    -- Update user stats counters
    SELECT total_submissions + 1, correct_submissions + (CASE WHEN p_passed THEN 1 ELSE 0 END)
    INTO v_total_subs, v_corr_subs
    FROM public.user_stats
    WHERE user_id = v_user_id;

    v_accuracy := ROUND((v_corr_subs * 100.0) / v_total_subs, 2);

    IF p_passed AND NOT v_already_solved THEN
        -- First time solve: register progress
        INSERT INTO public.user_challenge_progress (
            user_id, challenge_id, completed, completed_at, language
        ) VALUES (
            v_user_id, p_challenge_id, true, NOW(), p_language
        );

        v_xp_awarded := p_xp_reward;

        -- Award XP
        SELECT new_xp, new_level, new_streak
        INTO v_new_xp, v_new_level, v_new_streak
        FROM public.award_xp_internal(
            v_user_id,
            p_xp_reward,
            'Solved code challenge: ' || p_challenge_id,
            'challenge',
            p_challenge_id
        );

        -- Check Pointer Ninja achievement
        v_is_pointer := (p_challenge_id ILIKE '%pointer%' OR p_challenge_id ILIKE '%linked%' OR p_challenge_id ILIKE '%floyd%' OR p_challenge_id ILIKE '%reverse%');
        IF v_is_pointer THEN
            UPDATE public.user_achievements
            SET
                progress = LEAST(2, progress + 1),
                is_unlocked = (progress + 1 >= 2),
                unlocked_at = CASE WHEN progress + 1 >= 2 AND NOT is_unlocked THEN NOW() ELSE unlocked_at END
            WHERE user_id = v_user_id AND achievement_id = 'pointer-ninja';
        END IF;

        -- Check Sorting Samurai achievement
        IF p_challenge_id ILIKE '%sort%' THEN
            UPDATE public.user_achievements
            SET
                progress = LEAST(3, progress + 1),
                is_unlocked = (progress + 1 >= 3),
                unlocked_at = CASE WHEN progress + 1 >= 3 AND NOT is_unlocked THEN NOW() ELSE unlocked_at END
            WHERE user_id = v_user_id AND achievement_id = 'sorting-samurai';
        END IF;

        -- Log activity event
        INSERT INTO public.activity_events (user_id, event_type, details)
        VALUES (v_user_id, 'challenge_solved', jsonb_build_object('challenge_id', p_challenge_id, 'xp', p_xp_reward));
    ELSE
        SELECT xp, level, streak_days INTO v_new_xp, v_new_level, v_new_streak
        FROM public.profiles WHERE id = v_user_id;
    END IF;

    -- Count total solved
    SELECT COUNT(*) INTO v_solved_count
    FROM public.user_challenge_progress
    WHERE user_id = v_user_id;

    -- Update stats record
    UPDATE public.user_stats
    SET
        problems_solved = v_solved_count,
        total_submissions = v_total_subs,
        correct_submissions = v_corr_subs,
        accuracy = v_accuracy,
        updated_at = NOW()
    WHERE user_id = v_user_id;

    RETURN jsonb_build_object(
        'success', true,
        'passed', p_passed,
        'is_first_solve', (p_passed AND NOT v_already_solved),
        'xp_awarded', v_xp_awarded,
        'current_xp', v_new_xp,
        'current_level', v_new_level,
        'streak', v_new_streak,
        'problems_solved', v_solved_count,
        'accuracy', v_accuracy
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 4. Review Mistake in Error Notebook Procedure
CREATE OR REPLACE FUNCTION public.review_user_mistake(
    p_mistake_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_mistake RECORD;
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_streak INTEGER;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    SELECT * INTO v_mistake
    FROM public.mistakes
    WHERE id = p_mistake_id AND user_id = v_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Mistake record not found or unauthorized.';
    END IF;

    IF v_mistake.reviewed THEN
        RETURN jsonb_build_object('success', true, 'already_reviewed', true, 'xp_awarded', 0);
    END IF;

    UPDATE public.mistakes
    SET reviewed = true
    WHERE id = p_mistake_id;

    -- Award 30 XP for review
    SELECT new_xp, new_level, new_streak
    INTO v_new_xp, v_new_level, v_new_streak
    FROM public.award_xp_internal(
        v_user_id,
        30,
        'Reviewed mistake in Error Notebook',
        'mistake_review',
        p_mistake_id::text
    );

    -- Unlock Bug Hunter achievement
    UPDATE public.user_achievements
    SET
        progress = 1,
        is_unlocked = true,
        unlocked_at = COALESCE(unlocked_at, NOW())
    WHERE user_id = v_user_id AND achievement_id = 'bug-hunter';

    -- Log activity
    INSERT INTO public.activity_events (user_id, event_type, details)
    VALUES (v_user_id, 'mistake_reviewed', jsonb_build_object('mistake_id', p_mistake_id));

    RETURN jsonb_build_object(
        'success', true,
        'already_reviewed', false,
        'xp_awarded', 30,
        'current_xp', v_new_xp,
        'current_level', v_new_level,
        'streak', v_new_streak
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 5. Claim Daily Quest Procedure
CREATE OR REPLACE FUNCTION public.claim_daily_quest(
    p_quest_id TEXT
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_quest RECORD;
    v_user_quest RECORD;
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_streak INTEGER;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    SELECT * INTO v_quest FROM public.daily_quests WHERE id = p_quest_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Daily quest % does not exist.', p_quest_id;
    END IF;

    SELECT * INTO v_user_quest
    FROM public.user_daily_quest_progress
    WHERE user_id = v_user_id AND quest_id = p_quest_id;

    IF v_user_quest IS NOT NULL AND v_user_quest.claimed_at IS NOT NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Quest reward already claimed.');
    END IF;

    -- Upsert quest progress to claimed
    INSERT INTO public.user_daily_quest_progress (
        user_id, quest_id, current_count, is_completed, claimed_at, date_assigned
    ) VALUES (
        v_user_id, p_quest_id, v_quest.target_count, true, NOW(), CURRENT_DATE
    )
    ON CONFLICT (user_id, quest_id) DO UPDATE
    SET is_completed = true, claimed_at = NOW();

    -- Award quest XP
    SELECT new_xp, new_level, new_streak
    INTO v_new_xp, v_new_level, v_new_streak
    FROM public.award_xp_internal(
        v_user_id,
        v_quest.xp_reward,
        'Completed daily quest: ' || v_quest.title,
        'daily_quest',
        p_quest_id
    );

    RETURN jsonb_build_object(
        'success', true,
        'xp_awarded', v_quest.xp_reward,
        'current_xp', v_new_xp,
        'current_level', v_new_level,
        'streak', v_new_streak
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 6. Defeat Boss Battle Procedure
CREATE OR REPLACE FUNCTION public.defeat_boss_battle(
    p_boss_id TEXT,
    p_xp_reward INTEGER DEFAULT 250
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_streak INTEGER;
    v_bosses_count INTEGER;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    -- Award XP
    SELECT new_xp, new_level, new_streak
    INTO v_new_xp, v_new_level, v_new_streak
    FROM public.award_xp_internal(
        v_user_id,
        p_xp_reward,
        'Defeated region boss: ' || p_boss_id,
        'boss_battle',
        p_boss_id
    );

    -- Increment bosses defeated counter
    UPDATE public.user_stats
    SET
        bosses_defeated = bosses_defeated + 1,
        updated_at = NOW()
    WHERE user_id = v_user_id
    RETURNING bosses_defeated INTO v_bosses_count;

    -- Unlock Boss Slayer achievement
    UPDATE public.user_achievements
    SET
        progress = 1,
        is_unlocked = true,
        unlocked_at = COALESCE(unlocked_at, NOW())
    WHERE user_id = v_user_id AND achievement_id = 'boss-slayer';

    -- Log activity event
    INSERT INTO public.activity_events (user_id, event_type, details)
    VALUES (v_user_id, 'boss_defeated', jsonb_build_object('boss_id', p_boss_id, 'xp', p_xp_reward));

    RETURN jsonb_build_object(
        'success', true,
        'xp_awarded', p_xp_reward,
        'current_xp', v_new_xp,
        'current_level', v_new_level,
        'bosses_defeated', v_bosses_count
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 7. Idempotent Guest-to-Account Migration Procedure
CREATE OR REPLACE FUNCTION public.migrate_guest_progress(
    p_guest_data JSONB
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_completed_lessons JSONB;
    v_completed_challenges JSONB;
    v_defeated_bosses JSONB;
    v_mistakes JSONB;
    v_item RECORD;
    v_elem JSONB;
    v_lesson_id TEXT;
    v_challenge_id TEXT;
    v_boss_id TEXT;
    v_imported_lessons INTEGER := 0;
    v_imported_challenges INTEGER := 0;
    v_imported_mistakes INTEGER := 0;
    v_guest_xp INTEGER := 0;
    v_guest_level INTEGER := 1;
    v_guest_streak INTEGER := 0;
    v_cur_profile RECORD;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    -- Extract arrays safely
    v_completed_lessons := COALESCE(p_guest_data->'completedLessons', '[]'::jsonb);
    v_completed_challenges := COALESCE(p_guest_data->'completedChallenges', '[]'::jsonb);
    v_defeated_bosses := COALESCE(p_guest_data->'defeatedBosses', '[]'::jsonb);
    v_mistakes := COALESCE(p_guest_data->'mistakes', '[]'::jsonb);

    v_guest_xp := COALESCE((p_guest_data->'profile'->>'xp')::INTEGER, 0);
    v_guest_level := GREATEST(1, COALESCE((p_guest_data->'profile'->>'level')::INTEGER, 1));
    v_guest_streak := GREATEST(0, COALESCE((p_guest_data->'profile'->>'streakDays')::INTEGER, 0));

    -- 1. Import Completed Lessons idempotently
    FOR v_elem IN SELECT * FROM jsonb_array_elements_text(v_completed_lessons) LOOP
        v_lesson_id := v_elem::TEXT;
        INSERT INTO public.user_lesson_progress (user_id, topic_id, completed, completed_at)
        VALUES (v_user_id, v_lesson_id, true, NOW())
        ON CONFLICT (user_id, topic_id) DO NOTHING;

        IF FOUND THEN
            v_imported_lessons := v_imported_lessons + 1;
        END IF;
    END LOOP;

    -- 2. Import Completed Challenges idempotently
    FOR v_elem IN SELECT * FROM jsonb_array_elements_text(v_completed_challenges) LOOP
        v_challenge_id := v_elem::TEXT;
        INSERT INTO public.user_challenge_progress (user_id, challenge_id, completed, completed_at)
        VALUES (v_user_id, v_challenge_id, true, NOW())
        ON CONFLICT (user_id, challenge_id) DO NOTHING;

        IF FOUND THEN
            v_imported_challenges := v_imported_challenges + 1;
        END IF;
    END LOOP;

    -- 3. Import Mistakes idempotently
    IF jsonb_typeof(v_mistakes) = 'array' THEN
        FOR v_elem IN SELECT * FROM jsonb_array_elements(v_mistakes) LOOP
            INSERT INTO public.mistakes (
                user_id, topic_id, topic_title, type, question_or_challenge,
                user_answer, correct_answer, explanation, reviewed
            ) VALUES (
                v_user_id,
                COALESCE(v_elem->>'topicId', 'unknown'),
                COALESCE(v_elem->>'topicTitle', 'Review Item'),
                CASE 
                    WHEN v_elem->>'type' IN ('quiz', 'complexity', 'visualizer', 'coding') THEN v_elem->>'type'
                    ELSE 'quiz'
                END,
                COALESCE(v_elem->>'questionOrChallenge', 'Mistake snippet'),
                COALESCE(v_elem->>'userAnswer', ''),
                COALESCE(v_elem->>'correctAnswer', ''),
                COALESCE(v_elem->>'explanation', ''),
                COALESCE((v_elem->>'reviewed')::BOOLEAN, false)
            );
            v_imported_mistakes := v_imported_mistakes + 1;
        END LOOP;
    END IF;

    -- 4. Reconcile Profile XP, Level, and Streak
    SELECT * INTO v_cur_profile FROM public.profiles WHERE id = v_user_id;

    UPDATE public.profiles
    SET
        xp = GREATEST(v_cur_profile.xp, v_guest_xp),
        level = GREATEST(v_cur_profile.level, v_guest_level),
        streak_days = GREATEST(v_cur_profile.streak_days, v_guest_streak),
        updated_at = NOW()
    WHERE id = v_user_id;

    -- 5. Reconcile Stats
    UPDATE public.user_stats
    SET
        lessons_completed = (SELECT COUNT(*) FROM public.user_lesson_progress WHERE user_id = v_user_id),
        problems_solved = (SELECT COUNT(*) FROM public.user_challenge_progress WHERE user_id = v_user_id),
        bosses_defeated = GREATEST(bosses_defeated, jsonb_array_length(v_defeated_bosses)),
        current_streak = GREATEST(current_streak, v_guest_streak),
        longest_streak = GREATEST(longest_streak, v_guest_streak),
        topics_mastered = FLOOR((SELECT COUNT(*) FROM public.user_lesson_progress WHERE user_id = v_user_id) / 2.0)::INTEGER,
        updated_at = NOW()
    WHERE user_id = v_user_id;

    -- 6. Reconcile Achievements
    IF (SELECT COUNT(*) FROM public.user_lesson_progress WHERE user_id = v_user_id) >= 1 THEN
        UPDATE public.user_achievements
        SET progress = 1, is_unlocked = true, unlocked_at = COALESCE(unlocked_at, NOW())
        WHERE user_id = v_user_id AND achievement_id = 'first-steps';
    END IF;

    IF jsonb_array_length(v_defeated_bosses) >= 1 THEN
        UPDATE public.user_achievements
        SET progress = 1, is_unlocked = true, unlocked_at = COALESCE(unlocked_at, NOW())
        WHERE user_id = v_user_id AND achievement_id = 'boss-slayer';
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'imported_lessons', v_imported_lessons,
        'imported_challenges', v_imported_challenges,
        'imported_mistakes', v_imported_mistakes
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;


-- 8. Get Full User Dashboard Procedure
CREATE OR REPLACE FUNCTION public.get_user_dashboard(
    p_user_id UUID DEFAULT auth.uid()
)
RETURNS JSONB AS $$
DECLARE
    v_profile JSONB;
    v_stats JSONB;
    v_completed_lessons JSONB;
    v_completed_challenges JSONB;
    v_achievements JSONB;
    v_recent_submissions JSONB;
    v_daily_quests JSONB;
BEGIN
    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    -- Profile
    SELECT to_jsonb(p) INTO v_profile
    FROM public.profiles p WHERE p.id = p_user_id;

    -- Stats
    SELECT to_jsonb(s) INTO v_stats
    FROM public.user_stats s WHERE s.user_id = p_user_id;

    -- Completed Lessons
    SELECT COALESCE(jsonb_agg(topic_id), '[]'::jsonb) INTO v_completed_lessons
    FROM public.user_lesson_progress
    WHERE user_id = p_user_id;

    -- Completed Challenges
    SELECT COALESCE(jsonb_agg(challenge_id), '[]'::jsonb) INTO v_completed_challenges
    FROM public.user_challenge_progress
    WHERE user_id = p_user_id;

    -- Achievements (joined with master info)
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id', a.id,
        'title', a.title,
        'description', a.description,
        'category', a.category,
        'icon', a.icon,
        'xpReward', a.xp_reward,
        'progress', COALESCE(ua.progress, 0),
        'maxProgress', a.max_progress,
        'isUnlocked', COALESCE(ua.is_unlocked, false),
        'unlockedAt', ua.unlocked_at
    )), '[]'::jsonb) INTO v_achievements
    FROM public.achievements a
    LEFT JOIN public.user_achievements ua ON ua.achievement_id = a.id AND ua.user_id = p_user_id;

    -- Recent Submissions (up to 5)
    SELECT COALESCE(jsonb_agg(sub), '[]'::jsonb) INTO v_recent_submissions
    FROM (
        SELECT id, challenge_id, language, status, passed_tests, total_tests, execution_time_ms, created_at
        FROM public.submissions
        WHERE user_id = p_user_id
        ORDER BY created_at DESC
        LIMIT 5
    ) sub;

    -- Daily Quests
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id', q.id,
        'title', q.title,
        'description', q.description,
        'category', q.category,
        'xpReward', q.xp_reward,
        'targetCount', q.target_count,
        'currentCount', COALESCE(uq.current_count, 0),
        'isCompleted', COALESCE(uq.is_completed, false),
        'claimedAt', uq.claimed_at,
        'dateAssigned', q.date_assigned
    )), '[]'::jsonb) INTO v_daily_quests
    FROM public.daily_quests q
    LEFT JOIN public.user_daily_quest_progress uq ON uq.quest_id = q.id AND uq.user_id = p_user_id
    WHERE q.date_assigned = CURRENT_DATE;

    RETURN jsonb_build_object(
        'profile', v_profile,
        'stats', v_stats,
        'completedLessons', v_completed_lessons,
        'completedChallenges', v_completed_challenges,
        'achievements', v_achievements,
        'recentSubmissions', v_recent_submissions,
        'dailyQuests', v_daily_quests
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;
