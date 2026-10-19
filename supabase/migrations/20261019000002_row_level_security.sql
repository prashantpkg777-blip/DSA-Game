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
