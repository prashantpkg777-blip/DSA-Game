import fs from 'fs';
import path from 'path';
import { WORLD_REGIONS } from '../curriculum/curriculumData';

function escapeSql(str: string | undefined | null): string {
  if (str === undefined || str === null) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function escapeJson(obj: any): string {
  if (!obj) return `'{}'::jsonb`;
  const json = JSON.stringify(obj).replace(/'/g, "''");
  return `'${json}'::jsonb`;
}

function escapeTextArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'::text[]";
  const escaped = arr.map(s => escapeSql(s)).join(', ');
  return `ARRAY[${escaped}]::text[]`;
}

function normalizeChallengeDifficulty(diff: string | undefined): string {
  if (!diff) return 'Medium';
  if (diff === 'Beginner') return 'Easy';
  if (diff === 'Intermediate') return 'Medium';
  if (diff === 'Advanced') return 'Hard';
  return diff;
}

function normalizeTopicDifficulty(diff: string | undefined): string {
  if (!diff) return 'Intermediate';
  if (diff === 'Easy') return 'Beginner';
  if (diff === 'Medium') return 'Intermediate';
  if (diff === 'Hard') return 'Advanced';
  return diff;
}

export function generateSeed(): string {
  const lines: string[] = [];
  lines.push('-- ==============================================================================');
  lines.push('-- DSA CHAOS — CURRICULUM SEED DATA (14 WORLDS, 39 TOPICS, CHALLENGES)');
  lines.push('-- Migration: 20261019000004_seed_curriculum.sql');
  lines.push('-- ==============================================================================\n');

  lines.push('-- 0. Ensure Difficulty Check Constraints Accept Both Formats');
  lines.push('ALTER TABLE public.challenges DROP CONSTRAINT IF EXISTS challenges_difficulty_check;');
  lines.push("ALTER TABLE public.challenges ADD CONSTRAINT challenges_difficulty_check CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced'));");
  lines.push('ALTER TABLE public.topics DROP CONSTRAINT IF EXISTS topics_difficulty_check;');
  lines.push("ALTER TABLE public.topics ADD CONSTRAINT topics_difficulty_check CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced'));\n");

  // 1. Achievements
  lines.push('-- 1. Achievements Master Data');
  lines.push(`INSERT INTO public.achievements (id, title, description, category, icon, xp_reward, max_progress) VALUES
  ('first-steps', 'First Steps', 'Complete your first DSA concept lesson.', 'learning', 'Footprints', 50, 1),
  ('sorting-samurai', 'Sorting Samurai', 'Master 3 sorting algorithms in the Sorting Desert.', 'mastery', 'Sword', 150, 3),
  ('pointer-ninja', 'Pointer Ninja', 'Solve 2 Two-Pointer or Linked List challenges.', 'mastery', 'Zap', 150, 2),
  ('boss-slayer', 'Boss Slayer', 'Defeat your first Region Boss in battle.', 'special', 'Trophy', 250, 1),
  ('consistency-champion', 'Consistency Champion', 'Reach a 3-day learning streak.', 'streak', 'Flame', 100, 3),
  ('bug-hunter', 'Bug Hunter', 'Review and correct a mistake in your Error Notebook.', 'learning', 'ShieldCheck', 75, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  icon = EXCLUDED.icon,
  xp_reward = EXCLUDED.xp_reward,
  max_progress = EXCLUDED.max_progress;\n`);

  // 2. Daily Quests Default
  lines.push('-- 2. Daily Quests Master Data');
  lines.push(`INSERT INTO public.daily_quests (id, title, description, category, xp_reward, target_count, date_assigned) VALUES
  ('quest-sim-daily', 'Algorithm Visualizer Run', 'Step through an algorithm visualization in simulator mode.', 'visualize', 60, 1, CURRENT_DATE),
  ('quest-quiz-daily', 'Knowledge Check', 'Pass any topic quiz with 100% score.', 'quiz', 50, 1, CURRENT_DATE),
  ('quest-code-daily', 'Code Implementer', 'Solve one coding challenge in the editor.', 'solve', 80, 1, CURRENT_DATE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  xp_reward = EXCLUDED.xp_reward,
  target_count = EXCLUDED.target_count;\n`);

  // 3. Worlds
  lines.push('-- 3. World Regions');
  for (const world of WORLD_REGIONS) {
    lines.push(`INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES (${escapeSql(world.id)}, ${world.number}, ${escapeSql(world.name)}, ${escapeSql(world.tagline)}, ${escapeSql(world.description)}, ${escapeSql(world.themeColor)}, ${escapeSql(world.accentGlow)}, ${escapeSql(world.icon)}, ${world.requiredLevel}, ${Boolean(world.unlockedByDefault)}, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;\n`);
  }

  // 4. Topics, Questions, Challenges & Test Cases
  lines.push('-- 4. Topics, Challenges, and Test Cases');
  for (const world of WORLD_REGIONS) {
    for (const topic of world.topics) {
      lines.push(`-- Topic: ${topic.title} (${topic.id})`);
      lines.push(`INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  ${escapeSql(topic.id)},
  ${escapeSql(world.id)},
  ${escapeSql(topic.slug)},
  ${escapeSql(topic.title)},
  ${escapeSql(topic.subtitle)},
  ${escapeSql(topic.category)},
  ${topic.order},
  ${topic.xpReward},
  ${escapeSql(topic.iconName)},
  ${escapeSql(normalizeTopicDifficulty(topic.difficulty))},
  ${escapeSql(topic.summary)},
  ${escapeTextArray(topic.subtopics)},
  ${escapeSql(topic.visualizerType)},
  ${escapeJson(topic.content)}
)
ON CONFLICT (id) DO UPDATE SET
  world_id = EXCLUDED.world_id,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  category = EXCLUDED.category,
  order_index = EXCLUDED.order_index,
  xp_reward = EXCLUDED.xp_reward,
  icon_name = EXCLUDED.icon_name,
  difficulty = EXCLUDED.difficulty,
  summary = EXCLUDED.summary,
  subtopics = EXCLUDED.subtopics,
  visualizer_type = EXCLUDED.visualizer_type,
  content = EXCLUDED.content;\n`);

      // Questions for this topic
      if (topic.quizQuestions && topic.quizQuestions.length > 0) {
        for (let qIdx = 0; qIdx < topic.quizQuestions.length; qIdx++) {
          const q = topic.quizQuestions[qIdx];
          lines.push(`INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  ${escapeSql(q.id)},
  ${escapeSql(topic.id)},
  ${escapeSql(q.question)},
  ${escapeSql(q.codeSnippet)},
  ${escapeSql(q.hint)},
  ${escapeJson(q.options)},
  ${qIdx + 1}
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;\n`);
        }
      }

      // Coding Challenge
      if (topic.codeProblem) {
        const cp = topic.codeProblem;
        lines.push(`INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  ${escapeSql(cp.id)},
  ${escapeSql(topic.id)},
  ${escapeSql(cp.title)},
  ${escapeSql(normalizeChallengeDifficulty(cp.difficulty))},
  ${escapeSql(cp.description)},
  ${escapeTextArray(cp.constraints)},
  ${escapeJson(cp.examples)},
  ${escapeJson(cp.starterCode)},
  ${escapeSql(cp.functionName)},
  ${escapeJson(cp.optimalSolution)},
  ${escapeTextArray(cp.hints)}
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  difficulty = EXCLUDED.difficulty,
  description = EXCLUDED.description,
  constraints = EXCLUDED.constraints,
  examples = EXCLUDED.examples,
  starter_code = EXCLUDED.starter_code,
  function_name = EXCLUDED.function_name,
  optimal_solution = EXCLUDED.optimal_solution,
  hints = EXCLUDED.hints;\n`);

        // Test Cases
        if (cp.testCases && cp.testCases.length > 0) {
          for (let tcIdx = 0; tcIdx < cp.testCases.length; tcIdx++) {
            const tc = cp.testCases[tcIdx];
            lines.push(`INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  ${escapeSql(tc.id)},
  ${escapeSql(cp.id)},
  ${escapeSql(tc.input)},
  ${escapeSql(tc.expectedOutput)},
  ${escapeSql(tc.explanation)},
  ${Boolean(tc.isHidden)},
  ${tcIdx + 1}
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;\n`);
          }
        }
      }
    }
  }

  return lines.join('\n');
}

const sql = generateSeed();
const outputPath = path.resolve(process.cwd(), 'supabase', 'migrations', '20261019000004_seed_curriculum.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Generated migration 004 seed curriculum SQL at: ${outputPath} (${sql.length} bytes)`);
