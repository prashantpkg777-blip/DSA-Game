# ⚡ DSA CHAOS — BACKEND ARCHITECTURE & DEPLOYMENT GUIDE

This document details the backend architecture, PostgreSQL database schema, authentication system, Row Level Security (RLS) policies, atomic stored procedures, and setup instructions for **DSA Chaos — Break the Code**.

---

## 1. ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                       DSA CHAOS CLIENT                      │
│            React + TypeScript + Vite + Zustand              │
│   (Operates in Offline Guest Mode or Cloud-Connected Mode)   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼ (Auth + RPC)                 ▼ (Sandboxed JS)
┌──────────────────────────────┐  ┌───────────────────────────┐
│       SUPABASE BACKEND       │  │    ISOLATED WEB WORKER    │
│  - Supabase Auth             │  │  - JavaScript sandbox     │
│  - PostgreSQL 15+            │  │  - 2500ms watchdog        │
│  - Row Level Security (RLS)  │  │  - Stripped network APIs  │
│  - SECURITY DEFINER RPCs     │  └───────────────────────────┘
│  - Versioned SQL Migrations  │
└──────────────────────────────┘
```

---

## 2. DATABASE SCHEMA & VERSIONED MIGRATIONS

All migrations are located in `supabase/migrations/` and must be applied in sequential order:

### Migration 1: `20261019000001_initial_schema.sql`
- **Profiles Table (`public.profiles`)**: Extends `auth.users` with `username`, `display_name`, `avatar`, `title`, `level`, `xp`, `xp_to_next_level`, `streak_days`, and dates. Includes an automatic trigger `on_auth_user_created` that initializes the profile upon email signup.
- **Worlds Table (`public.worlds`)**: Stores the 14 DSA world regions, themes, levels, and badges.
- **Topics Table (`public.topics`)**: Stores the 39 curriculum topics, subtopics, complexity specs, and educational content.
- **Lessons Submodules (`public.lessons`)**: Deep-dive chapter nodes.
- **Challenges Table (`public.challenges`)**: Code problems with starter templates in 4 languages, constraints, and solutions.
- **Test Cases Table (`public.test_cases`)**: Sample and hidden test cases for each challenge.
- **Questions Table (`public.questions`)**: 4-question quizzes with explanations for each topic.
- **User Progress Tables**: `user_lesson_progress`, `user_challenge_progress`, and `submissions`.
- **User Stats Table (`public.user_stats`)**: Solved counts, accuracy, streaks, weekly XP activity, and time spent.
- **XP Transactions (`public.xp_transactions`)**: Append-only tamper-evident audit ledger of every XP award.
- **Achievements & Quests**: `achievements`, `user_achievements`, `daily_quests`, and `user_daily_quest_progress`.
- **Mistakes / Error Notebook (`public.mistakes`)**: Error tracking for quizzes, complexity questions, and code.

### Migration 2: `20261019000002_row_level_security.sql`
- Enables Row Level Security (RLS) on all 18 tables.
- Public read access for published worlds, topics, challenges, visible test cases, and default achievements.
- Strict `auth.uid() = user_id` access controls for user progress, stats, and submissions.
- Tamper prevention: Direct client updates to `xp_transactions`, `user_stats.accuracy`, and `profiles.xp` are blocked; all mutations must flow through trusted stored procedures.

### Migration 3: `20261019000003_stored_procedures.sql`
Atomic PostgreSQL functions executed with `SECURITY DEFINER`:
1. `complete_lesson(p_topic_id, p_xp_reward)`: Enforces idempotency (no double-crediting XP for repeated lesson completions), increments streak, calculates level progression, logs to `xp_transactions`, and checks `first-steps` and `sorting-samurai` achievements.
2. `submit_challenge_result(...)`: Logs execution results in `submissions`, awards first-time challenge XP, updates problem-solving accuracy, and unlocks `pointer-ninja`.
3. `review_user_mistake(p_mistake_id)`: Validates that the mistake belongs to the user and has not been reviewed before, awards 30 XP, and unlocks `bug-hunter`.
4. `claim_daily_quest(p_quest_id)`: Atomically marks daily quest as claimed and awards quest XP.
5. `defeat_boss_battle(p_boss_id, p_xp_reward)`: Awards boss XP, updates `bosses_defeated`, and unlocks `boss-slayer`.
6. `migrate_guest_progress(p_guest_data)`: Idempotently imports completed lessons, challenges, and mistakes from guest localStorage into the newly created account without duplicating XP.
7. `get_user_dashboard(p_user_id)`: Returns the complete dashboard state in a single optimized query.

### Migration 4: `20261019000004_seed_curriculum.sql`
- Seeds all 14 published worlds.
- Seeds all 39 curriculum topics.
- Seeds all interactive coding challenges and test cases.
- Seeds all 4-question quizzes.
- Seeds standard daily quests and achievements.

---

## 3. HOW TO APPLY MIGRATIONS TO YOUR SUPABASE PROJECT

### Option A: Using the Supabase Dashboard (Fastest)
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Click on the **SQL Editor** tab in the left navigation.
3. Open and run each migration in order:
   - Paste and execute `supabase/migrations/20261019000001_initial_schema.sql`
   - Paste and execute `supabase/migrations/20261019000002_row_level_security.sql`
   - Paste and execute `supabase/migrations/20261019000003_stored_procedures.sql`
   - Paste and execute `supabase/migrations/20261019000004_seed_curriculum.sql`
4. Verify all tables and functions are created under the **Table Editor** and **Database -> Functions** tabs.

### Option B: Using the Supabase CLI
```bash
# Login to Supabase CLI
supabase login

# Link your local project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

---

## 4. FRONTEND ENVIRONMENT CONFIGURATION

### Local Development
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your Supabase project keys:
```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### Netlify Deployment
In your Netlify site dashboard:
1. Navigate to **Site configuration** -> **Environment variables**.
2. Add the following keys:
   - `VITE_SUPABASE_URL` = `https://<your-project-id>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `<your-anon-key>`
3. Trigger a redeploy. Netlify will build the production bundle with the Supabase client activated.

---

## 5. VERIFYING GUEST MODE & CLOUD SYNC

- **Offline / Guest Mode**: If no Supabase credentials are provided, DSA Chaos automatically persists all user progress, daily quests, XP, and notebook entries into browser `localStorage`.
- **Cloud Migration**: When a guest coder clicks **SAVE CLOUD** or creates an account, `migrate_guest_progress` automatically moves their entire quest history into PostgreSQL without data loss or duplicate XP.
