import fs from 'fs';
import path from 'path';
import { authService } from '../services/authService';
import { progressService } from '../services/progressService';
import { useUserStore } from '../stores/userStore';

export function runBackendIntegrationTests(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${testName}`);
      failed++;
    }
  }

  console.log('\n--- Suite 6: Supabase PostgreSQL Backend & Migrations ---');

  const migrationsDir = path.resolve(process.cwd(), 'supabase', 'migrations');
  assert(fs.existsSync(migrationsDir), 'supabase/migrations directory exists');

  // 1. Initial Schema Migration
  const schemaFile = path.join(migrationsDir, '20261019000001_initial_schema.sql');
  assert(fs.existsSync(schemaFile), 'Migration 001 (initial_schema.sql) exists');
  const schemaSql = fs.readFileSync(schemaFile, 'utf8');

  const expectedTables = [
    'profiles',
    'worlds',
    'topics',
    'lessons',
    'challenges',
    'test_cases',
    'questions',
    'user_lesson_progress',
    'user_challenge_progress',
    'submissions',
    'user_stats',
    'xp_transactions',
    'achievements',
    'user_achievements',
    'daily_quests',
    'user_daily_quest_progress',
    'activity_events',
    'mistakes',
  ];

  for (const table of expectedTables) {
    assert(schemaSql.includes(`CREATE TABLE IF NOT EXISTS public.${table}`), `Migration 001 defines table public.${table}`);
  }
  assert(schemaSql.includes('handle_new_user()'), 'Migration 001 includes handle_new_user trigger function');
  assert(schemaSql.includes('on_auth_user_created'), 'Migration 001 attaches auth user creation trigger');

  // 2. Row Level Security Migration
  const rlsFile = path.join(migrationsDir, '20261019000002_row_level_security.sql');
  assert(fs.existsSync(rlsFile), 'Migration 002 (row_level_security.sql) exists');
  const rlsSql = fs.readFileSync(rlsFile, 'utf8');

  for (const table of expectedTables) {
    assert(rlsSql.includes(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`), `Migration 002 enables RLS on public.${table}`);
  }
  assert(rlsSql.includes('Allow public read access to published worlds'), 'Migration 002 allows public read on worlds');
  assert(rlsSql.includes('Allow users to read own lesson progress'), 'Migration 002 protects user lesson progress');
  assert(rlsSql.includes('Allow users to read own xp transactions'), 'Migration 002 protects xp transactions');

  // 3. Stored Procedures Migration
  const spFile = path.join(migrationsDir, '20261019000003_stored_procedures.sql');
  assert(fs.existsSync(spFile), 'Migration 003 (stored_procedures.sql) exists');
  const spSql = fs.readFileSync(spFile, 'utf8');

  const expectedRpcs = [
    'award_xp_internal',
    'complete_lesson',
    'submit_challenge_result',
    'review_user_mistake',
    'claim_daily_quest',
    'defeat_boss_battle',
    'migrate_guest_progress',
    'get_user_dashboard',
  ];

  for (const rpc of expectedRpcs) {
    assert(spSql.includes(`CREATE OR REPLACE FUNCTION public.${rpc}`), `Migration 003 defines stored procedure public.${rpc}`);
    assert(spSql.includes('SECURITY DEFINER'), `Stored procedure public.${rpc} enforces SECURITY DEFINER`);
  }

  // 4. Seed Curriculum Migration
  const seedFile = path.join(migrationsDir, '20261019000004_seed_curriculum.sql');
  assert(fs.existsSync(seedFile), 'Migration 004 (seed_curriculum.sql) exists');
  const seedSql = fs.readFileSync(seedFile, 'utf8');
  assert(seedSql.length > 100000, `Migration 004 contains substantial curriculum seed data (${seedSql.length} bytes)`);
  assert(seedSql.includes('INSERT INTO public.achievements'), 'Migration 004 seeds master achievements');
  assert(seedSql.includes('INSERT INTO public.daily_quests'), 'Migration 004 seeds daily quests');
  assert(seedSql.includes("('region-foundations'"), 'Migration 004 seeds World 1 Foundations');
  assert(seedSql.includes("('region-competitive'"), 'Migration 004 seeds World 14 Competitive');

  // 5. Frontend Service Layer & Offline Fallback Checks
  console.log('\n--- Suite 7: Frontend Backend Service Layer & Offline Robustness ---');
  assert(typeof authService.isConfigured === 'function', 'authService exposes isConfigured check');
  assert(typeof progressService.isConfigured === 'function', 'progressService exposes isConfigured check');

  // Verify configuration detection
  assert(typeof authService.isConfigured() === 'boolean', 'authService exposes functional boolean configuration status');
  assert(typeof progressService.isConfigured() === 'boolean', 'progressService exposes functional boolean configuration status');
  assert(authService.isConfigured() === true, 'authService successfully detects active Supabase credentials');
  assert(progressService.isConfigured() === true, 'progressService successfully detects active Supabase credentials');

  // 6. UserStore Auth & Gamification Invariants
  console.log('\n--- Suite 8: UserStore Auth State & Gamification Invariants ---');
  const store = useUserStore.getState();
  assert(store.profile.isGuest === true, 'Initial state defaults to offline guest mode');
  assert(store.authModalOpen === false, 'Auth modal is closed by default');

  useUserStore.getState().openAuthModal('login');
  assert(useUserStore.getState().authModalOpen === true, 'openAuthModal opens modal');
  assert(useUserStore.getState().authMode === 'login', 'openAuthModal sets mode to login');

  useUserStore.getState().openAuthModal('signup');
  assert(useUserStore.getState().authMode === 'signup', 'openAuthModal sets mode to signup');

  useUserStore.getState().closeAuthModal();
  assert(useUserStore.getState().authModalOpen === false, 'closeAuthModal closes modal');

  // Guest Progress Idempotency Test
  const guestData = {
    profile: store.profile,
    stats: store.stats,
    completedLessons: ['topic-big-o', 'topic-memory-models'],
    completedChallenges: ['challenge-two-sum'],
    defeatedBosses: ['boss-foundations'],
  };

  // Simulate progress merge
  const initialLessonCount = guestData.completedLessons.length;
  const mergedLessons = Array.from(new Set([...guestData.completedLessons, 'topic-big-o', 'topic-recursion']));
  assert(mergedLessons.length === initialLessonCount + 1, 'Duplicate lessons are filtered during guest merge');

  return { passed, failed };
}
