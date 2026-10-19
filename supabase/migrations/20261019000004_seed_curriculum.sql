-- ==============================================================================
-- DSA CHAOS — CURRICULUM SEED DATA (14 WORLDS, 39 TOPICS, CHALLENGES)
-- Migration: 20261019000004_seed_curriculum.sql
-- ==============================================================================

-- 1. Achievements Master Data
INSERT INTO public.achievements (id, title, description, category, icon, xp_reward, max_progress) VALUES
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
  max_progress = EXCLUDED.max_progress;

-- 2. Daily Quests Master Data
INSERT INTO public.daily_quests (id, title, description, category, xp_reward, target_count, date_assigned) VALUES
  ('quest-sim-daily', 'Algorithm Visualizer Run', 'Step through an algorithm visualization in simulator mode.', 'visualize', 60, 1, CURRENT_DATE),
  ('quest-quiz-daily', 'Knowledge Check', 'Pass any topic quiz with 100% score.', 'quiz', 50, 1, CURRENT_DATE),
  ('quest-code-daily', 'Code Implementer', 'Solve one coding challenge in the editor.', 'solve', 80, 1, CURRENT_DATE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  xp_reward = EXCLUDED.xp_reward,
  target_count = EXCLUDED.target_count;

-- 3. World Regions
INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-foundations', 1, 'Coding Village', 'Programming & Complexity Foundations', 'Master Big-O notation, algorithm efficiency analysis, memory models, and recursion fundamentals before embarking on your quest.', 'from-blue-600 to-cyan-500', 'rgba(6, 182, 212, 0.4)', 'Compass', 1, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-arrays', 2, 'Array Kingdom', 'Linear Sequences, Windows & Pointers', 'Enter the vast Array Kingdom. Traverse contiguous blocks of memory, master two-pointer converges, and wield sliding windows to solve complex problems in linear time.', 'from-amber-600 to-orange-500', 'rgba(245, 158, 11, 0.4)', 'Boxes', 2, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-sorting', 3, 'Sorting Desert & Searching Dungeon', 'Logarithmic Seeks & Order from Chaos', 'Venture into the shifting dunes of the Sorting Desert and navigate the subterranean corridors of the Searching Dungeon. Master Binary Search, comparison sorts, and divide-and-conquer.', 'from-yellow-600 to-amber-500', 'rgba(217, 119, 6, 0.4)', 'Compass', 3, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-linked-lists', 4, 'Linked List Forest', 'Nodes, Pointers & The Cycle Labyrinth', 'Enter the winding Linked List Forest. Navigate pointer reversals, fast & slow pointers, and master Floyd''s Cycle Detection algorithm.', 'from-purple-600 to-indigo-500', 'rgba(147, 51, 234, 0.4)', 'GitCommit', 4, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-stacks-queues', 5, 'Stack & Queue Citadel', 'LIFO & FIFO Fortress of Orders', 'Enter the fortified citadel. Master Last-In First-Out (LIFO) stacks, First-In First-Out (FIFO) queues, deques, and monotonic stack challenges.', 'from-pink-600 to-rose-500', 'rgba(244, 63, 94, 0.4)', 'Layers', 5, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-trees', 6, 'Tree Kingdom', 'Hierarchies, Traversals & Binary Search Trees', 'Traverse the sprawling Tree Kingdom. Master recursive and iterative traversals, Binary Search Tree invariants, height calculations, and tree balance.', 'from-emerald-700 to-green-500', 'rgba(5, 150, 105, 0.4)', 'Network', 6, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-graphs', 7, 'Graph Empire', 'Vertices, Edges, Traversal & Shortest Paths', 'Enter the vast networks of the Graph Empire. Master Breadth-First Search, Depth-First Search, topological sorting, connected components, and Dijkstra''s shortest paths.', 'from-teal-600 to-cyan-500', 'rgba(20, 184, 166, 0.4)', 'Network', 7, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-backtracking', 8, 'Recursion & Backtracking Realm', 'State Space Trees, Pruning & Combinatorial Search', 'Descend into the branching corridors of the Recursive Realm. Master the art of exploring decision trees, pruning dead ends, and solving combinatorial puzzles like Subsets, Permutations, and N-Queens.', 'from-fuchsia-600 to-pink-500', 'rgba(217, 70, 239, 0.4)', 'GitBranch', 8, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-greedy', 9, 'Greedy Frontier', 'Local Optimal Choices, Global Maximization & Interval Scheduling', 'Trek into the competitive terrain of the Greedy Frontier. Discover how making the best local choice at every step leads to global optimality in interval scheduling, Huffman coding, and greedy jump traversals.', 'from-amber-500 to-yellow-400', 'rgba(245, 158, 11, 0.4)', 'Zap', 9, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-dp', 10, 'Dynamic Programming Realm', 'Optimal Substructure, Memoization & Multi-Dimensional Tabulation', 'Ascend to the towering citadel of Dynamic Programming. Conquer the fear of recurrence relations through top-down memoization, bottom-up tabulation, 0/1 knapsack variants, and multidimensional string transformations.', 'from-violet-600 to-indigo-500', 'rgba(124, 58, 237, 0.4)', 'Layers', 10, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-hashing', 11, 'Hashing City', 'Hash Functions, Collision Resolution & O(1) Lookups', 'Step into the neon-lit grid of Hashing City. Master hash functions, load factor dynamics, collision mitigation through chaining and open addressing, frequency analysis, and prefix hash maps.', 'from-emerald-500 to-teal-400', 'rgba(16, 185, 129, 0.4)', 'Hash', 11, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-tries-strings', 12, 'Trie & String Laboratory', 'Prefix Trees, Pattern Matching & Palindromic Symmetry', 'Enter the precision laboratory of Tries and String Algorithms. Master prefix trees for lightning-fast autocomplete, KMP failure functions for linear pattern matching, and expand-around-center palindromic analytics.', 'from-pink-500 to-rose-400', 'rgba(236, 72, 153, 0.4)', 'Terminal', 12, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-advanced-ds', 13, 'Advanced Data Structures Citadel', 'Disjoint Sets, Range Query Trees & Cache Architectures', 'Enter the fortified citadel of Advanced Data Structures. Construct Disjoint Set Union with inverse Ackermann complexity, query dynamic ranges in O(log N) with Segment and Fenwick Trees, and engineer O(1) LRU Caches.', 'from-purple-600 to-pink-600', 'rgba(147, 51, 234, 0.4)', 'Layers', 13, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

INSERT INTO public.worlds (id, number, name, tagline, description, theme_color, accent_glow, icon, required_level, unlocked_by_default, is_published)
VALUES ('region-competitive', 14, 'Competitive Programming Arena', 'Binary Search on Answers, Number Theory & Bitwise Sorcery', 'Enter the Grand Arena of competitive programming. Master binary search over monotonic answer spaces, number theory with the Sieve of Eratosthenes and modular exponentiation, and low-level bitwise manipulation tricks.', 'from-red-600 to-amber-500', 'rgba(239, 68, 68, 0.4)', 'Trophy', 14, true, true)
ON CONFLICT (id) DO UPDATE SET
  number = EXCLUDED.number,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  theme_color = EXCLUDED.theme_color,
  accent_glow = EXCLUDED.accent_glow,
  icon = EXCLUDED.icon,
  required_level = EXCLUDED.required_level,
  unlocked_by_default = EXCLUDED.unlocked_by_default;

-- 4. Topics, Challenges, and Test Cases
-- Topic: Big-O, Big-Omega, Big-Theta & Asymptotics (topic-big-o)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-big-o',
  'region-foundations',
  'asymptotic-analysis',
  'Big-O, Big-Omega, Big-Theta & Asymptotics',
  'Upper, Lower & Tight Bounds',
  'foundations',
  1,
  100,
  'Activity',
  'Beginner',
  'Understand the mathematical meaning of asymptotic bounds: Big-O (upper bound), Big-Omega (lower bound), and Big-Theta (tight bound), and how to analyze code runtime.',
  ARRAY['What is an Algorithm', 'Time Complexity vs Space Complexity', 'Big-O Asymptotic Upper Bound', 'Big-Omega Lower Bound vs Big-Theta Tight Bound', 'Orders of Growth: Constant to Factorial', 'Mathematical Analysis of Nested Loops']::text[],
  'array_sorting',
  '{"whatIsIt":"Asymptotic notation describes how the resource consumption (runtime or memory) of an algorithm scales as input size n approaches infinity. Big-O gives an asymptotic upper bound (f(n) <= c * g(n)), Big-Omega gives an asymptotic lower bound (f(n) >= c * g(n)), and Big-Theta gives a tight bound.","whyItMatters":"Without asymptotic notation, comparing algorithms would depend on CPU clock speed, compiler optimizations, and hardware. Big-O allows hardware-independent analysis.","intuition":"Think of estimating fuel usage for a road trip: you care how fuel increases as distance grows tenfold, not whether you started with 1 extra cup of fuel.","stepByStep":["1. Count fundamental operations (comparisons, assignments, arithmetic) as a function of n.","2. Retain only the highest-order dominant term (e.g. 3n^2 + 50n + 100 -> 3n^2).","3. Drop constant scalar coefficients (3n^2 -> O(n^2)).","4. Check best-case, average-case, and worst-case input configurations."],"pseudocode":"// O(1) Constant\nlet first = nums[0];\n\n// O(n) Linear\nfor (let i = 0; i < n; i++) {\n  sum += nums[i];\n}\n\n// O(n^2) Quadratic\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    matrix[i][j] = 0;\n  }\n}","complexity":{"timeBest":"O(1) (e.g. target at index 0)","timeAverage":"O(n) (average search)","timeWorst":"O(n) (not found)","space":"O(1) auxiliary space","explanation":"Asymptotic notation classifies algorithms by their growth rate as n becomes very large."},"commonMistakes":["Confusing Big-O (upper bound) with worst-case scenario (input arrangement). You can express worst-case in Big-O, Big-Omega, or Big-Theta.","Keeping lower order terms, such as writing O(n^2 + n) instead of O(n^2).","Assuming nested loops are always O(n^2) without checking the inner loop step size."],"edgeCases":["Input size n = 0 or n = 1","Array already sorted","All elements equal"],"realWorldApplications":["Database query plan optimization (index seeks vs table scans).","High-frequency trading latency budgeting.","Cloud infrastructure cost estimation based on API request throughput."],"whenToUse":["Always evaluate complexity before writing code in interviews."],"whenNotToUse":["Do not micro-optimize when n is guaranteed to be tiny (e.g. n <= 5)."],"relatedAlgorithms":["Binary Search","Merge Sort","Quick Sort"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-big-o-1',
  'topic-big-o',
  'What is the time complexity of binary search on a sorted array of size n?',
  NULL,
  'Each step divides the search space by 2.',
  '[{"id":"a","text":"O(log n)","isCorrect":true,"explanation":"Binary search halves the remaining search space with each comparison."},{"id":"b","text":"O(n)","isCorrect":false,"explanation":"Linear search is O(n), not binary search."},{"id":"c","text":"O(1)","isCorrect":false,"explanation":"Constant time is only for direct index access, not search."},{"id":"d","text":"O(n log n)","isCorrect":false,"explanation":"O(n log n) is typical of efficient comparison sorts like Merge Sort."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-big-o-2',
  'topic-big-o',
  'If an algorithm performs 5n^3 + 100n^2 + 9999 operations, what is its asymptotic Big-O complexity?',
  NULL,
  'Identify the highest-power term as n grows without bound.',
  '[{"id":"a","text":"O(n^3)","isCorrect":true,"explanation":"Drop lower order terms (100n^2, 9999) and constant multipliers (5), leaving O(n^3)."},{"id":"b","text":"O(5n^3)","isCorrect":false,"explanation":"Constants are dropped in asymptotic notation."},{"id":"c","text":"O(n^2)","isCorrect":false,"explanation":"n^3 dominates n^2 as n approaches infinity."},{"id":"d","text":"O(1)","isCorrect":false,"explanation":"The runtime grows cubically with n."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-big-o-3',
  'topic-big-o',
  'Which of the following describes the difference between Big-O and Big-Theta?',
  NULL,
  'Think about upper bound vs sandwiching bound.',
  '[{"id":"a","text":"Big-O is an asymptotic upper bound, while Big-Theta is a tight asymptotic bound","isCorrect":true,"explanation":"Big-O denotes f(n) <= c*g(n), while Big-Theta requires both upper and lower bounds simultaneously: c1*g(n) <= f(n) <= c2*g(n)."},{"id":"b","text":"Big-O is for time, Big-Theta is for memory","isCorrect":false,"explanation":"Both apply equally to time and memory."},{"id":"c","text":"Big-Theta is always worse than Big-O","isCorrect":false,"explanation":"They are mathematical relations, not performance tiers."},{"id":"d","text":"Big-O is only for best-case performance","isCorrect":false,"explanation":"Big-O is an upper bound on any specified scenario."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-big-o-4',
  'topic-big-o',
  'What is the runtime of an algorithm that doubles its work each time n increases by 1 (e.g. naive recursive Fibonacci)?',
  NULL,
  'Consider 2 * 2 * 2 ... n times.',
  '[{"id":"a","text":"O(2^n) Exponential","isCorrect":true,"explanation":"Doubling operations for each +1 to n creates an exponential tree of 2^n operations."},{"id":"b","text":"O(n^2) Quadratic","isCorrect":false,"explanation":"Quadratic increases work by 2n+1 when n grows by 1, not multiplying by 2."},{"id":"c","text":"O(n log n)","isCorrect":false,"explanation":"Linearithmic is far faster than exponential."},{"id":"d","text":"O(log n) Logarithmic","isCorrect":false,"explanation":"Logarithmic work cuts work down, not doubles it."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-constant-vs-linear',
  'topic-big-o',
  'Calculate Array Sum and Max',
  'Easy',
  'Given an array of numbers, calculate the sum and the maximum value in a single O(n) pass with O(1) auxiliary space.',
  ARRAY['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4']::text[],
  '[{"input":"[1, 4, 2, 8, 3]","output":"[18, 8]","explanation":"Sum = 18, Maximum = 8."}]'::jsonb,
  '{"javascript":"function sumAndMax(nums) {\n  // TODO: Return [sum, max] in a single linear pass\n  \n}","python":"def sumAndMax(nums: list[int]) -> list[int]:\n    # TODO: Return [sum, max] in a single linear pass\n    pass","java":"class Solution {\n    public int[] sumAndMax(int[] nums) {\n        // TODO: Return new int[]{sum, max}\n        return new int[]{0, 0};\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> sumAndMax(vector<int>& nums) {\n        // TODO: Return {sum, max}\n        return {0, 0};\n    }\n};"}'::jsonb,
  'sumAndMax',
  '{"javascript":"function sumAndMax(nums) {\n  let sum = 0;\n  let max = nums[0];\n  for (let i = 0; i < nums.length; i++) {\n    sum += nums[i];\n    if (nums[i] > max) max = nums[i];\n  }\n  return [sum, max];\n}","python":"def sumAndMax(nums):\n    total = 0\n    max_val = nums[0]\n    for x in nums:\n        total += x\n        if x > max_val:\n            max_val = x\n    return [total, max_val]","java":"class Solution {\n    public int[] sumAndMax(int[] nums) {\n        int sum = 0, max = nums[0];\n        for (int x : nums) {\n            sum += x;\n            if (x > max) max = x;\n        }\n        return new int[]{sum, max};\n    }\n}","cpp":"vector<int> sumAndMax(vector<int>& nums) {\n    int sum = 0, max_v = nums[0];\n    for (int x : nums) {\n        sum += x;\n        if (x > max_v) max_v = x;\n    }\n    return {sum, max_v};\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Single forward pass processes each element once, maintaining running sum and maximum."}'::jsonb,
  ARRAY['Initialize sum to 0 and max to nums[0]. Iterate through the array once.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-constant-vs-linear',
  '[1, 4, 2, 8, 3]',
  '[18,8]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-constant-vs-linear',
  '[-5, -2, -10]',
  '[-17,-2]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Recursion Fundamentals & Call Stacks (topic-recursion-stack)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-recursion-stack',
  'region-foundations',
  'recursion-and-stack-frames',
  'Recursion Fundamentals & Call Stacks',
  'Base Cases, Stack Frames & Recursion Trees',
  'foundations',
  2,
  120,
  'Layers',
  'Beginner',
  'Explore recursive execution, base cases, call stack frames, tree branching factors, and how to avoid stack overflow errors.',
  ARRAY['Base Cases vs Recursive Cases', 'Call Stack Frames & Memory Allocation', 'Recursion Trees & Branching Factors', 'Tail Recursion vs Standard Recursion', 'Converting Iteration to Recursion']::text[],
  'stack',
  '{"whatIsIt":"Recursion is a programming technique where a function calls itself to solve smaller subproblems of the same problem. Every recursive function requires two critical components: a base case that stops execution, and a recursive step that shrinks the problem toward the base case.","whyItMatters":"Recursion is the natural mental model for trees, graphs, divide-and-conquer, dynamic programming, and backtracking. Without understanding the call stack, debugging recursive errors is impossible.","intuition":"Think of Russian Matryoshka nesting dolls: to reach the tiny prize inside the smallest doll (base case), you open each outer doll one by one. Once open, you close them back up in reverse order.","stepByStep":["1. Identify the base case: what is the smallest input whose answer is trivially known?","2. Identify the recursive relation: how does solving f(n-1) or f(n/2) help solve f(n)?","3. Ensure progress: every call must move strictly closer to the base case.","4. Trace the unwinding phase as return values bubble up the call stack."],"pseudocode":"function factorial(n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recursive case\n}","complexity":{"timeBest":"O(1) (base case reached immediately)","timeAverage":"O(n) (linear depth)","timeWorst":"O(n) for factorial, O(2^n) for naive fibonacci","space":"O(n) auxiliary call stack space","explanation":"Each active function call pushes one stack frame of parameters and local variables."},"commonMistakes":["Forgetting a base case, resulting in maximum call stack size exceeded (Stack Overflow).","Failing to decrement or halve the argument, causing an infinite loop of identical calls.","Assuming recursion uses O(1) space: stack frames consume physical RAM!"],"edgeCases":["n = 0","Negative input numbers","Deep recursion exceeding call stack limits (~10,000 frames)"],"realWorldApplications":["JSON and XML nested object parsers.","File system folder directory crawling (rm -rf).","DOM traversal in web browsers."],"whenToUse":["Tree traversal, backtracking, divide and conquer algorithms."],"whenNotToUse":["Simple iterative counters where a while loop avoids stack overhead."],"relatedAlgorithms":["Depth-First Search","Quick Sort","Merge Sort"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-1',
  'topic-recursion-stack',
  'What happens when a recursive function lacks a valid base case?',
  NULL,
  'Think about what happens when memory runs out of space for new stack frames.',
  '[{"id":"a","text":"Stack Overflow error occurs","isCorrect":true,"explanation":"The call stack grows indefinitely until allocated system memory is exhausted."},{"id":"b","text":"The program returns undefined","isCorrect":false,"explanation":"It crashes with a call stack overflow before returning."},{"id":"c","text":"It automatically converts to an iterative loop","isCorrect":false,"explanation":"Compilers do not convert missing base cases into loops."},{"id":"d","text":"The garbage collector terminates it silently","isCorrect":false,"explanation":"It throws a runtime error."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-2',
  'topic-recursion-stack',
  'In a binary recursion tree (each call spawns 2 children of depth d), how many leaf calls exist at depth d?',
  NULL,
  'Each level doubles the number of nodes from the level above.',
  '[{"id":"a","text":"2^d","isCorrect":true,"explanation":"At depth 0: 2^0 = 1, depth 1: 2^1 = 2, depth 2: 2^2 = 4, depth d: 2^d."},{"id":"b","text":"2 * d","isCorrect":false,"explanation":"Branching is multiplicative, not additive."},{"id":"c","text":"d^2","isCorrect":false,"explanation":"Powers of 2 grow exponentially, not quadratically."},{"id":"d","text":"log2(d)","isCorrect":false,"explanation":"Leaves increase, not decrease."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-3',
  'topic-recursion-stack',
  'What is tail-call optimization (TCO)?',
  NULL,
  'Look for what happens when nothing remains to be computed after the call returns.',
  '[{"id":"a","text":"Reusing the current stack frame when the recursive call is the final operation","isCorrect":true,"explanation":"If the return value of the function is solely the recursive call, the compiler can jump without pushing a new stack frame, running in O(1) space."},{"id":"b","text":"Converting the function to C++ automatically","isCorrect":false,"explanation":"TCO is a compiler optimization technique."},{"id":"c","text":"Calling the function from the end of the array","isCorrect":false,"explanation":"Unrelated."},{"id":"d","text":"Running the recursive function on a separate worker thread","isCorrect":false,"explanation":"TCO operates on the call stack frame."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-4',
  'topic-recursion-stack',
  'What is the auxiliary space complexity of tree traversal on a balanced binary tree of n nodes?',
  NULL,
  'The call stack depth equals the height of the tree.',
  '[{"id":"a","text":"O(log n)","isCorrect":true,"explanation":"In a balanced binary tree, height h = log2(n). The maximum call stack depth is equal to tree height."},{"id":"b","text":"O(n)","isCorrect":false,"explanation":"O(n) only occurs if the tree degenerates into a singly linked list."},{"id":"c","text":"O(1)","isCorrect":false,"explanation":"Recursive traversal requires call stack frames for each ancestor."},{"id":"d","text":"O(n log n)","isCorrect":false,"explanation":"Stack depth never exceeds height."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-factorial-linear',
  'topic-recursion-stack',
  'Recursive Factorial with Bounds',
  'Easy',
  'Calculate n! (n factorial) recursively. For n = 0 or 1, return 1. Throw or handle n < 0 safely.',
  ARRAY['0 <= n <= 12']::text[],
  '[{"input":"5","output":"120","explanation":"5 * 4 * 3 * 2 * 1 = 120."},{"input":"0","output":"1","explanation":"0! is defined as 1."}]'::jsonb,
  '{"javascript":"function factorial(n) {\n  // TODO: Compute n! recursively\n  \n}","python":"def factorial(n: int) -> int:\n    # TODO: Compute n! recursively\n    pass","java":"class Solution {\n    public int factorial(int n) {\n        // TODO: Compute n! recursively\n        return 1;\n    }\n}","cpp":"class Solution {\npublic:\n    int factorial(int n) {\n        // TODO: Compute n! recursively\n        return 1;\n    }\n};"}'::jsonb,
  'factorial',
  '{"javascript":"function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}","python":"def factorial(n: int) -> int:\n    return 1 if n <= 1 else n * factorial(n - 1)","java":"class Solution {\n    public int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n}","cpp":"class Solution {\npublic:\n    int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n};","timeComplexity":"O(n)","spaceComplexity":"O(n) call stack","explanation":"Reaches base case after n recursive stack frames, then multiplies values on the return pass."}'::jsonb,
  ARRAY['Base case: if n <= 1 return 1. Recursive step: return n * factorial(n - 1).']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-factorial-linear',
  '5',
  '120',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-factorial-linear',
  '0',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-factorial-linear',
  '1',
  '1',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-factorial-linear',
  '4',
  '24',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Bit Manipulation & Binary Arithmetic (topic-bit-manipulation-basics)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-bit-manipulation-basics',
  'region-foundations',
  'bit-manipulation-fundamentals',
  'Bit Manipulation & Binary Arithmetic',
  'Bitwise Masks, Shifts & Logic Gates',
  'foundations',
  3,
  130,
  'Cpu',
  'Beginner',
  'Master bitwise AND (&), OR (|), XOR (^), NOT (~), and bit shifts (<<, >>) to solve problems with zero extra memory.',
  ARRAY['Binary Representation & Two''s Complement', 'Bitwise Operators (&, |, ^, ~)', 'Left Shift (<<) and Right Shift (>>)', 'Checking, Setting, and Clearing the k-th Bit', 'Brian Kernighan''s Set Bit Counting']::text[],
  'general',
  '{"whatIsIt":"Bit manipulation directly operates on the binary bits (0s and 1s) of integers using hardware CPU instructions. It allows constant-time arithmetic, flag setting, and power-of-two tests in extreme high-performance environments.","whyItMatters":"Bit manipulation is ubiquitous in cryptography, graphics rendering, network packet encoding, compression algorithms, and competitive programming.","intuition":"Think of a row of light switches. Rather than storing 32 separate boolean variables, a single 32-bit integer stores all 32 switches simultaneously.","stepByStep":["1. Get k-th bit: (num >> k) & 1","2. Set k-th bit to 1: num | (1 << k)","3. Clear k-th bit to 0: num & ~(1 << k)","4. Toggle k-th bit: num ^ (1 << k)","5. Check if power of two: (n > 0) && ((n & (n - 1)) === 0)"],"pseudocode":"// Check if odd\nlet isOdd = (n & 1) === 1;\n\n// Clear lowest set bit\nn = n & (n - 1);\n\n// XOR swap\na = a ^ b;\nb = a ^ b;\na = a ^ b;","complexity":{"timeBest":"O(1)","timeAverage":"O(1)","timeWorst":"O(1)","space":"O(1) in-place","explanation":"Bitwise operations are executed directly by single-cycle CPU instructions."},"commonMistakes":["Operator precedence: addition (+) has higher precedence than bit shift (<<)! Always parenthesize: (1 << k).","Using signed right shift (>>) instead of unsigned (>>>) when dealing with negative binary numbers.","Exceeding 32 bits in JavaScript bitwise operations (which cast operands to 32-bit signed ints)."],"edgeCases":["n = 0","Negative numbers (sign bit in 2''s complement)","Shifting by >= 32 bits"],"realWorldApplications":["Permissions flags in UNIX file systems (read=4, write=2, execute=1).","Bloom filters for cache membership checks.","Color channel masking in image processing (0xRRGGBB)."],"whenToUse":["Bitmask DP, constant factor optimization, state compression."],"whenNotToUse":["When clarity is paramount and compiler optimizations already handle it."],"relatedAlgorithms":["Brian Kernighan Algorithm","Fenwick Tree","Subsets via Bitmask"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bit-1',
  'topic-bit-manipulation-basics',
  'What is the result of expression n & (n - 1) on any positive integer n?',
  NULL,
  'Consider what happens to binary 12 (1100) when subtracted by 1 (1011).',
  '[{"id":"a","text":"It clears the lowest (rightmost) set 1-bit in n","isCorrect":true,"explanation":"Subtracting 1 flips all bits after the lowest 1-bit including that bit itself. ANDing clears it to 0."},{"id":"b","text":"It doubles n","isCorrect":false,"explanation":"Doubling is done by n << 1."},{"id":"c","text":"It sets the lowest bit to 1","isCorrect":false,"explanation":"It removes a 1, not adds."},{"id":"d","text":"It always returns 0","isCorrect":false,"explanation":"It only returns 0 if n was a power of 2."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bit-2',
  'topic-bit-manipulation-basics',
  'How do you check if an integer n is an exact power of 2?',
  NULL,
  'Powers of two have exactly one bit set to 1.',
  '[{"id":"a","text":"n > 0 && (n & (n - 1)) === 0","isCorrect":true,"explanation":"Powers of two have exactly one 1-bit (e.g. 8 is 1000). Clearing it yields 0."},{"id":"b","text":"n % 2 === 0","isCorrect":false,"explanation":"That checks if n is even, e.g. 6 is even but not a power of 2."},{"id":"c","text":"n >> 1 === 0","isCorrect":false,"explanation":"Only true for 0 and 1."},{"id":"d","text":"n | (n - 1) === 0","isCorrect":false,"explanation":"Incorrect operator."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bit-3',
  'topic-bit-manipulation-basics',
  'What is the property of the XOR (^) operator?',
  NULL,
  'Think of finding the single number in an array where every other number appears twice.',
  '[{"id":"a","text":"x ^ x = 0 and x ^ 0 = x","isCorrect":true,"explanation":"XORing any number with itself cancels to 0. XORing with 0 leaves the number unchanged."},{"id":"b","text":"x ^ x = x","isCorrect":false,"explanation":"That is the property of OR (|) and AND (&), not XOR."},{"id":"c","text":"x ^ 0 = 0","isCorrect":false,"explanation":"x ^ 0 preserves x."},{"id":"d","text":"x ^ y is always even","isCorrect":false,"explanation":"Depends on lowest bits."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bit-4',
  'topic-bit-manipulation-basics',
  'What is the effect of n << 3 on integer n?',
  NULL,
  'Left shift multiplies by 2 for each position shifted.',
  '[{"id":"a","text":"Multiplies n by 8 (2^3)","isCorrect":true,"explanation":"Shifting left by k positions multiplies by 2^k. 2^3 = 8."},{"id":"b","text":"Divides n by 8","isCorrect":false,"explanation":"Right shift divides, left shift multiplies."},{"id":"c","text":"Adds 3 to n","isCorrect":false,"explanation":"Shifting is exponential, not addition."},{"id":"d","text":"Multiplies n by 3","isCorrect":false,"explanation":"Powers of 2 only."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-count-set-bits',
  'topic-bit-manipulation-basics',
  'Number of 1 Bits (Hamming Weight)',
  'Easy',
  'Given a non-negative integer n, write a function that returns the number of set bits (1s) in its binary representation using bitwise operations.',
  ARRAY['0 <= n <= 2^31 - 1']::text[],
  '[{"input":"11","output":"3","explanation":"11 in binary is 1011, which has three 1 bits."},{"input":"128","output":"1","explanation":"128 in binary is 10000000, which has one 1 bit."}]'::jsonb,
  '{"javascript":"function countSetBits(n) {\n  // TODO: Count 1-bits using bitwise operations\n  \n}","python":"def countSetBits(n: int) -> int:\n    # TODO: Count 1-bits using bitwise operations\n    pass","java":"class Solution {\n    public int countSetBits(int n) {\n        // TODO: Count 1-bits\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int countSetBits(int n) {\n        // TODO: Count 1-bits\n        return 0;\n    }\n};"}'::jsonb,
  'countSetBits',
  '{"javascript":"function countSetBits(n) {\n  let count = 0;\n  while (n > 0) {\n    n = n & (n - 1);\n    count++;\n  }\n  return count;\n}","python":"def countSetBits(n: int) -> int:\n    count = 0\n    while n > 0:\n        n &= n - 1\n        count += 1\n    return count","java":"class Solution {\n    public int countSetBits(int n) {\n        int count = 0;\n        while (n > 0) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n}","cpp":"class Solution {\npublic:\n    int countSetBits(int n) {\n        int count = 0;\n        while (n > 0) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n};","timeComplexity":"O(k) where k is number of 1-bits","spaceComplexity":"O(1)","explanation":"Brian Kernighan algorithm runs in time proportional only to the number of set bits."}'::jsonb,
  ARRAY['Use Brian Kernighan algorithm: while (n > 0) { n &= (n - 1); count++; }']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-count-set-bits',
  '11',
  '3',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-count-set-bits',
  '128',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-count-set-bits',
  '0',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-count-set-bits',
  '15',
  '4',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Two Pointers & In-Place Reversals (topic-two-pointers)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-two-pointers',
  'region-arrays',
  'two-pointers-technique',
  'Two Pointers & In-Place Reversals',
  'Converging, Fast/Slow & Sliding Index Techniques',
  'arrays',
  1,
  120,
  'Maximize2',
  'Beginner',
  'Learn how to use two pointer references moving inward, outward, or at differing speeds to eliminate nested loops and achieve O(n) time.',
  ARRAY['In-Place Array Reversal', 'Converging Two Pointers (Sorted Arrays)', 'Dutch National Flag 3-Way Partition', 'Removing Duplicates from Sorted Arrays', 'Container With Most Water']::text[],
  'two_pointers',
  '{"whatIsIt":"The Two Pointers pattern coordinates two index references across an array or string to search pairs, partition values, or reverse sequences without auxiliary memory allocation.","whyItMatters":"It reduces brute-force O(n^2) pair comparisons down to a single linear O(n) pass by exploiting sorted order or monotonic trends.","intuition":"Think of two people walking towards each other from opposite ends of a bridge: each step brings them closer, checking conditions until they meet.","stepByStep":["1. Initialize left pointer at index 0 and right pointer at array.length - 1.","2. While left < right, evaluate the current elements (sum, swap, or match).","3. If current state meets target, record result.","4. Advance left pointer or decrement right pointer based on monotonic condition."],"pseudocode":"let left = 0, right = nums.length - 1;\nwhile (left < right) {\n  let sum = nums[left] + nums[right];\n  if (sum === target) return [left, right];\n  else if (sum < target) left++;\n  else right--;\n}","complexity":{"timeBest":"O(1)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(1) in-place","explanation":"Each iteration advances at least one pointer, taking at most n total steps."},"commonMistakes":["Applying converging two pointers on an UNSORTED array without sorting first.","Using left <= right instead of left < right when self-pairing is invalid.","Off-by-one errors when advancing both pointers simultaneously."],"edgeCases":["Array of length 0 or 1","All duplicate elements","Negative integers in sorted arrays"],"realWorldApplications":["Video streaming scrubber and timeline interval selection.","In-place image row flipping in computer graphics.","Packet sequence alignment in network protocols."],"whenToUse":["Sorted arrays, palindrome validation, partitioning around a pivot, finding pairs."],"whenNotToUse":["Unsorted dynamic data where sorting overhead O(n log n) exceeds hash map O(n)."],"relatedAlgorithms":["Binary Search","Sliding Window","Quick Sort Partitioning"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tp-1',
  'topic-two-pointers',
  'What is the required precondition to use converging Two Pointers for Two Sum?',
  NULL,
  'How do you know whether to move the left or right pointer?',
  '[{"id":"a","text":"The array must be sorted","isCorrect":true,"explanation":"The decision to move left or right relies on numbers increasing monotonically."},{"id":"b","text":"The array must only have positive numbers","isCorrect":false,"explanation":"Negative numbers work as long as the array is sorted."},{"id":"c","text":"The array must have an even length","isCorrect":false,"explanation":"Length does not matter."},{"id":"d","text":"All numbers must be distinct","isCorrect":false,"explanation":"Duplicates are handled by skipping."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tp-2',
  'topic-two-pointers',
  'How many element swaps are required to reverse an array of length n in-place?',
  NULL,
  'Each swap fixes both endpoints at once.',
  '[{"id":"a","text":"Math.floor(n / 2) swaps","isCorrect":true,"explanation":"Each swap places two elements in their final positions. Only half the array is iterated."},{"id":"b","text":"n swaps","isCorrect":false,"explanation":"Swapping n times would reverse it and then un-reverse it back to original!"},{"id":"c","text":"n - 1 swaps","isCorrect":false,"explanation":"Too many swaps."},{"id":"d","text":"log2(n) swaps","isCorrect":false,"explanation":"Reversal touches all elements."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tp-3',
  'topic-two-pointers',
  'In the Dutch National Flag problem (0s, 1s, 2s), how many pointers are typically maintained?',
  NULL,
  'Dijkstra invented the 3-way partition.',
  '[{"id":"a","text":"3 pointers: low, mid, high","isCorrect":true,"explanation":"Low tracks boundary of 0s, high tracks boundary of 2s, and mid traverses unknown elements."},{"id":"b","text":"1 pointer","isCorrect":false,"explanation":"Cannot separate 3 categories in one pass with one pointer."},{"id":"c","text":"4 pointers","isCorrect":false,"explanation":"3 pointers suffice for 3 categories."},{"id":"d","text":"n pointers","isCorrect":false,"explanation":"That would take O(n) memory."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tp-4',
  'topic-two-pointers',
  'What is the time and space complexity of reversing an array in-place?',
  NULL,
  'Think about auxiliary variables: only left, right, and temp.',
  '[{"id":"a","text":"Time: O(n), Space: O(1)","isCorrect":true,"explanation":"Linear time to visit elements, constant space with two pointers."},{"id":"b","text":"Time: O(n^2), Space: O(1)","isCorrect":false,"explanation":"Not quadratic."},{"id":"c","text":"Time: O(n), Space: O(n)","isCorrect":false,"explanation":"In-place reversal uses O(1) auxiliary memory."},{"id":"d","text":"Time: O(log n), Space: O(1)","isCorrect":false,"explanation":"You must touch every element at least once."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-reverse-string',
  'topic-two-pointers',
  'Reverse String In-Place',
  'Easy',
  'Write a function that reverses an array of characters in-place with O(1) extra memory.',
  ARRAY['1 <= s.length <= 10^5']::text[],
  '[{"input":"[\"h\",\"e\",\"l\",\"l\",\"o\"]","output":"[\"o\",\"l\",\"l\",\"e\",\"h\"]","explanation":"Reversed in-place."}]'::jsonb,
  '{"javascript":"function reverseString(s) {\n  // TODO: Reverse array s in-place using two pointers\n  \n  return s;\n}","python":"def reverseString(s: list[str]) -> list[str]:\n    # TODO: Reverse list s in-place using two pointers\n    pass","java":"class Solution {\n    public void reverseString(char[] s) {\n        // TODO: Reverse char array s in-place\n    }\n}","cpp":"class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // TODO: Reverse vector s in-place\n    }\n};"}'::jsonb,
  'reverseString',
  '{"javascript":"function reverseString(s) {\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    let temp = s[l];\n    s[l] = s[r];\n    s[r] = temp;\n    l++;\n    r--;\n  }\n  return s;\n}","python":"def reverseString(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        s[l], s[r] = s[r], s[l]\n        l += 1\n        r -= 1\n    return s","java":"class Solution {\n    public void reverseString(char[] s) {\n        int l = 0, r = s.length - 1;\n        while (l < r) {\n            char temp = s[l];\n            s[l++] = s[r];\n            s[r--] = temp;\n        }\n    }\n}","cpp":"class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) {\n            swap(s[l++], s[r--]);\n        }\n    }\n};","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Iterates n/2 times, swapping symmetric elements in-place with zero extra memory."}'::jsonb,
  ARRAY['Use left = 0 and right = s.length - 1. Swap elements while left < right.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-reverse-string',
  '["h","e","l","l","o"]',
  '["o","l","l","e","h"]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-reverse-string',
  '["H","a","n","n","a","h"]',
  '["h","a","n","n","a","H"]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-reverse-string',
  '["A"]',
  '["A"]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Sliding Window (Fixed & Variable) (topic-sliding-window)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-sliding-window',
  'region-arrays',
  'sliding-window-technique',
  'Sliding Window (Fixed & Variable)',
  'Contiguous Subsegments & Rolling States',
  'arrays',
  2,
  130,
  'Maximize2',
  'Intermediate',
  'Master fixed-size and dynamic-size sliding windows to compute maximum sums, longest unique substrings, and rolling metrics in O(n) time.',
  ARRAY['Fixed-Size Window Maintenance', 'Variable-Size Converging Windows', 'Frequency Counting in Windows', 'Longest Substring Without Repeating Characters', 'Minimum Window Substring Mechanics']::text[],
  'sliding_window',
  '{"whatIsIt":"The Sliding Window technique tracks a contiguous range [left, right] of elements that slides across an array or string. As the window expands on the right and contracts on the left, state is updated incrementally in O(1) per step.","whyItMatters":"It turns quadratic O(n * k) or O(n^2) nested subarray checks into linear O(n) passes by avoiding redundant work on overlapping window elements.","intuition":"Think of looking at the scenery through a moving bus window: when you move forward one meter, you don''t re-scan the whole view from scratch—you just notice what entered on the right and what disappeared on the left.","stepByStep":["1. Initialize window boundaries: left = 0, right = 0.","2. Expand right pointer: include incoming element and update rolling sum/map.","3. While window violates constraints, contract left pointer: subtract outgoing element and increment left.","4. Update global answer (e.g. max window length or max sum)."],"pseudocode":"// Fixed window of size k\nlet windowSum = sum(nums[0..k-1]);\nfor (let i = k; i < nums.length; i++) {\n  windowSum += nums[i] - nums[i - k];\n  maxSum = Math.max(maxSum, windowSum);\n}","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(1) for fixed sum, O(k) for frequency hash maps","explanation":"Both left and right pointers increment at most n times each, yielding amortized 2n operations total."},"commonMistakes":["Recomputing the window sum from scratch with a nested loop, defeating the purpose of O(1) sliding updates.","Shrinking the left pointer past the right pointer.","Forgetting to update the frequency map when removing the outgoing element."],"edgeCases":["Array length smaller than window size k","Negative elements in window","Empty string"],"realWorldApplications":["Network rate-limiting token bucket algorithms.","Stock market moving averages (50-day SMA).","Audio packet buffering in WebRTC communication."],"whenToUse":["Contiguous subarray/substring problems asking for max/min sum, length, or count under a condition."],"whenNotToUse":["Non-contiguous subsequence problems where elements can be picked in any arbitrary order."],"relatedAlgorithms":["Prefix Sums","Two Pointers","Monotonic Queue"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sw-1',
  'topic-sliding-window',
  'How many operations are needed to update a fixed sliding window sum when sliding 1 step right?',
  NULL,
  'Think about what actually changes between adjacent windows.',
  '[{"id":"a","text":"2 operations: subtract outgoing, add incoming","isCorrect":true,"explanation":"newSum = oldSum - outgoing + incoming takes O(1) constant time regardless of window size k."},{"id":"b","text":"k operations","isCorrect":false,"explanation":"That is the naive brute-force method."},{"id":"c","text":"log2(k) operations","isCorrect":false,"explanation":"Constant time, not logarithmic."},{"id":"d","text":"n operations","isCorrect":false,"explanation":"Far faster than linear."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sw-2',
  'topic-sliding-window',
  'In a variable-size sliding window, what is the maximum number of times the left pointer can advance across the entire algorithm?',
  NULL,
  'The left pointer only moves forward, never backwards.',
  '[{"id":"a","text":"n times","isCorrect":true,"explanation":"Left pointer only increments and never exceeds n. Total operations across both pointers is at most 2n = O(n)."},{"id":"b","text":"n^2 times","isCorrect":false,"explanation":"Left pointer never resets to 0."},{"id":"c","text":"k times","isCorrect":false,"explanation":"Can advance up to length n."},{"id":"d","text":"1 time","isCorrect":false,"explanation":"Advances each time condition is violated."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sw-3',
  'topic-sliding-window',
  'Which problem is a classic application of variable sliding windows?',
  NULL,
  'Think of tracking characters in a contiguous substring.',
  '[{"id":"a","text":"Longest Substring Without Repeating Characters","isCorrect":true,"explanation":"Right pointer expands while unique; left contracts when a duplicate appears."},{"id":"b","text":"Merge Sort","isCorrect":false,"explanation":"Divide and conquer, not sliding window."},{"id":"c","text":"Binary Search","isCorrect":false,"explanation":"Binary search halves search space."},{"id":"d","text":"Dijkstra shortest path","isCorrect":false,"explanation":"Graph search."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sw-4',
  'topic-sliding-window',
  'When is sliding window NOT applicable?',
  NULL,
  'Contiguous vs non-contiguous is the key distinction.',
  '[{"id":"a","text":"When the problem asks for non-contiguous subsequences","isCorrect":true,"explanation":"Sliding windows strictly require contiguous contiguous ranges."},{"id":"b","text":"When elements are positive integers","isCorrect":false,"explanation":"Positive integers make monotonic window growth easier."},{"id":"c","text":"When window size is fixed to 5","isCorrect":false,"explanation":"Fixed window is a standard use case."},{"id":"d","text":"When input is a string","isCorrect":false,"explanation":"Strings are sequences of characters suitable for windows."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-max-subarray-sum-k',
  'topic-sliding-window',
  'Maximum Sum Subarray of Size K',
  'Easy',
  'Given an array of integers nums and an integer k, find the maximum sum of any contiguous subarray of size k.',
  ARRAY['1 <= k <= nums.length <= 10^5']::text[],
  '[{"input":"nums = [2, 1, 5, 1, 3, 2], k = 3","output":"9","explanation":"Subarray [5, 1, 3] has maximum sum 9."}]'::jsonb,
  '{"javascript":"function maxSubarraySumK(nums, k) {\n  // TODO: Compute max sum of subarray of size k in O(n) time\n  \n}","python":"def maxSubarraySumK(nums: list[int], k: int) -> int:\n    # TODO: Compute max sum of subarray of size k in O(n) time\n    pass","java":"class Solution {\n    public int maxSubarraySumK(int[] nums, int k) {\n        // TODO: Compute max sum of size k\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int maxSubarraySumK(vector<int>& nums, int k) {\n        // TODO: Compute max sum of size k\n        return 0;\n    }\n};"}'::jsonb,
  'maxSubarraySumK',
  '{"javascript":"function maxSubarraySumK(nums, k) {\n  let windowSum = 0;\n  for (let i = 0; i < k; i++) windowSum += nums[i];\n  let maxSum = windowSum;\n  for (let i = k; i < nums.length; i++) {\n    windowSum += nums[i] - nums[i - k];\n    if (windowSum > maxSum) maxSum = windowSum;\n  }\n  return maxSum;\n}","python":"def maxSubarraySumK(nums, k):\n    window_sum = sum(nums[:k])\n    max_sum = window_sum\n    for i in range(k, len(nums)):\n        window_sum += nums[i] - nums[i - k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum","java":"class Solution {\n    public int maxSubarraySumK(int[] nums, int k) {\n        int w = 0;\n        for (int i = 0; i < k; i++) w += nums[i];\n        int max = w;\n        for (int i = k; i < nums.length; i++) {\n            w += nums[i] - nums[i - k];\n            if (w > max) max = w;\n        }\n        return max;\n    }\n}","cpp":"class Solution {\npublic:\n    int maxSubarraySumK(vector<int>& nums, int k) {\n        int w = 0;\n        for (int i = 0; i < k; ++i) w += nums[i];\n        int m = w;\n        for (size_t i = k; i < nums.size(); ++i) {\n            w += nums[i] - nums[i - k];\n            m = max(m, w);\n        }\n        return m;\n    }\n};","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Sliding window maintains rolling sum by updating only entering and leaving elements."}'::jsonb,
  ARRAY['Calculate sum of first k elements. Slide window by adding nums[i] and subtracting nums[i - k].']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-max-subarray-sum-k',
  '[2, 1, 5, 1, 3, 2], 3',
  '9',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-max-subarray-sum-k',
  '[2, 3, 4, 1, 5], 2',
  '7',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-max-subarray-sum-k',
  '[1, 2], 1',
  '2',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Kadane's Algorithm (Max Subarray) (topic-kadane)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-kadane',
  'region-arrays',
  'kadanes-algorithm',
  'Kadane''s Algorithm (Max Subarray)',
  'Greedy Dynamic Decisions & Local vs Global Optima',
  'arrays',
  3,
  140,
  'Flame',
  'Intermediate',
  'Master Kadane''s single-pass dynamic algorithm for finding maximum contiguous subarray sum with negative number handling.',
  ARRAY['Contiguous Subarrays vs Subsequences', 'Local Optimum vs Global Optimum Invariant', 'Handling All-Negative Integer Arrays', 'Tracking Subarray Start and End Indices', 'Maximum Product Subarray Variant']::text[],
  'array_sorting',
  '{"whatIsIt":"Kadane''s algorithm is an iterative dynamic programming technique that finds the maximum sum contiguous subarray in linear O(n) time and O(1) space.","whyItMatters":"Brute force checks all O(n^2) subarrays. Kadane solves it in a single lightning-fast O(n) forward pass by asking: \"Is it better to extend the current subarray or start fresh from here?\"","intuition":"If your current investment portfolio has accumulated a net negative debt, dragging it into the next transaction hurts you. It is mathematically better to abandon the debt and start fresh.","stepByStep":["1. Initialize localMax = nums[0] and globalMax = nums[0].","2. For i from 1 to n - 1: localMax = Math.max(nums[i], localMax + nums[i]).","3. Update globalMax = Math.max(globalMax, localMax).","4. Return globalMax."],"pseudocode":"let currMax = nums[0], globalMax = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n  currMax = Math.max(nums[i], currMax + nums[i]);\n  globalMax = Math.max(globalMax, currMax);\n}\nreturn globalMax;","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(1) memory","explanation":"Inspects each array index exactly once with two scalar variables."},"commonMistakes":["Initializing globalMax to 0 instead of nums[0]. If the array is [-3, -1], it would return 0 instead of -1!","Resetting currMax to 0 before the negative number check."],"edgeCases":["All negative numbers in array (e.g. [-5, -2, -8])","Single element array [42]","Alternating high positive and negative values"],"realWorldApplications":["Genomic DNA sequence analysis for high-density GC islands.","Stock trading maximum single-holding gain over historical periods.","Computer vision brightness pattern detection in image rasters."],"whenToUse":["Maximum subarray sum, circular subarray maximums, maximum profit transactions."],"whenNotToUse":["When elements are not contiguous or when asking for product (product requires tracking min)."],"relatedAlgorithms":["Divide and Conquer Max Subarray","Sliding Window","Dynamic Programming"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kadane-1',
  'topic-kadane',
  'What is the correct initialization for globalMax in Kadane''s algorithm when negative numbers can occur?',
  NULL,
  'What should happen if the input is [-5, -2]?',
  '[{"id":"a","text":"nums[0] (or -Infinity)","isCorrect":true,"explanation":"If all numbers are negative, e.g. [-3, -1], initializing to 0 would wrongly return 0 instead of -1."},{"id":"b","text":"0","isCorrect":false,"explanation":"Fails if all numbers are negative."},{"id":"c","text":"nums.length","isCorrect":false,"explanation":"Length has no relationship to sum values."},{"id":"d","text":"+Infinity","isCorrect":false,"explanation":"Math.max against +Infinity would never update."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kadane-2',
  'topic-kadane',
  'What does Kadane''s algorithm do when localMax becomes negative?',
  NULL,
  'Does adding a negative sum to a future number help or hurt?',
  '[{"id":"a","text":"It abandons the previous subarray and starts a new subarray at current element","isCorrect":true,"explanation":"A negative prefix only reduces the sum of any subsequent elements."},{"id":"b","text":"It terminates the loop immediately","isCorrect":false,"explanation":"Subsequent positive numbers could create a larger sum."},{"id":"c","text":"It multiplies the array by -1","isCorrect":false,"explanation":"Kadane does not invert signs."},{"id":"d","text":"It resets all elements to zero","isCorrect":false,"explanation":"Kadane does not mutate input."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kadane-3',
  'topic-kadane',
  'Can Kadane''s algorithm track the starting and ending indices of the maximum subarray?',
  NULL,
  'Update start whenever a new subarray is born.',
  '[{"id":"a","text":"Yes, by recording start when currMax resets and updating end when globalMax updates","isCorrect":true,"explanation":"Whenever nums[i] > currMax + nums[i], tempStart = i. Whenever currMax > globalMax, start = tempStart, end = i."},{"id":"b","text":"No, it can only return the numeric sum","isCorrect":false,"explanation":"Indices are easily tracked with two integer pointer variables."},{"id":"c","text":"Only if the array has no negative numbers","isCorrect":false,"explanation":"Works for any array configuration."},{"id":"d","text":"Only in O(n^2) time","isCorrect":false,"explanation":"Indices can be tracked in the same O(n) pass."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kadane-4',
  'topic-kadane',
  'What is the time complexity difference between brute force and Kadane''s algorithm for maximum subarray?',
  NULL,
  'Compare testing every pair of indices vs a single pass.',
  '[{"id":"a","text":"Brute force is O(n^2), Kadane is O(n)","isCorrect":true,"explanation":"Brute force tests all n(n+1)/2 subarrays; Kadane decides in a single linear pass."},{"id":"b","text":"Brute force is O(n), Kadane is O(1)","isCorrect":false,"explanation":"Kadane must inspect all n elements."},{"id":"c","text":"Both are O(n log n)","isCorrect":false,"explanation":"Divide and conquer is O(n log n), Kadane is linear."},{"id":"d","text":"Kadane is O(log n)","isCorrect":false,"explanation":"Must touch all elements."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-kadane-practice',
  'topic-kadane',
  'Maximum Subarray Practice',
  'Easy',
  'Given an array nums of integers, find the contiguous subarray with the largest sum and return the sum.',
  ARRAY['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4']::text[],
  '[{"input":"[5,4,-1,7,8]","output":"23","explanation":"The subarray [5,4,-1,7,8] has the largest sum 23."}]'::jsonb,
  '{"javascript":"function maxSubArray(nums) {\n  // TODO: Compute maximum subarray sum in O(n) time\n  \n}","python":"def maxSubArray(nums: list[int]) -> int:\n    # TODO: Compute maximum subarray sum in O(n) time\n    pass","java":"class Solution {\n    public int maxSubArray(int[] nums) {\n        // TODO: Compute max subarray sum\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // TODO: Compute max subarray sum\n        return 0;\n    }\n};"}'::jsonb,
  'maxSubArray',
  '{"javascript":"function maxSubArray(nums) {\n  let m = nums[0], c = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    c = Math.max(nums[i], c + nums[i]);\n    if (c > m) m = c;\n  }\n  return m;\n}","python":"def maxSubArray(nums):\n    m = c = nums[0]\n    for x in nums[1:]:\n        c = max(x, c + x)\n        if c > m: m = c\n    return m","java":"class Solution { public int maxSubArray(int[] nums) { int m = nums[0], c = nums[0]; for(int i=1; i<nums.length; i++){ c = Math.max(nums[i], c + nums[i]); if(c > m) m = c; } return m; } }","cpp":"int maxSubArray(vector<int>& nums) { int m = nums[0], c = nums[0]; for(size_t i=1; i<nums.size(); ++i){ c = max(nums[i], c + nums[i]); if(c > m) m = c; } return m; }","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Kadane algorithm tracks optimal continuous slice in linear time."}'::jsonb,
  ARRAY['curr = max(nums[i], curr + nums[i]); maxSoFar = max(maxSoFar, curr);']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-kadane-practice',
  '[5,4,-1,7,8]',
  '23',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-kadane-practice',
  '[-1]',
  '-1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-kadane-practice',
  '[-2,-1]',
  '-1',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Prefix Sums & Difference Arrays (topic-prefix-sums)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-prefix-sums',
  'region-arrays',
  'prefix-sums-and-difference-arrays',
  'Prefix Sums & Difference Arrays',
  'Range Queries in O(1) & Range Updates in O(1)',
  'arrays',
  4,
  130,
  'Layers',
  'Intermediate',
  'Master prefix sum tables for answering range sum queries in constant O(1) time and difference arrays for bulk updates.',
  ARRAY['1D Prefix Sum Construction', 'Range Sum Queries in O(1)', 'Difference Array Range Updates in O(1)', 'Subarray Sum Equals K via Prefix Hash', '2D Matrix Range Sums']::text[],
  'array_sorting',
  '{"whatIsIt":"A prefix sum array pref stores pref[i] = nums[0] + ... + nums[i]. Once precomputed in O(n) time, any contiguous subarray sum from index L to R can be computed in strict O(1) time: sum(L..R) = pref[R] - pref[L - 1].","whyItMatters":"If you have Q range sum queries on an array, naive calculation takes O(Q * n) time. Prefix sums answer all Q queries in O(Q) time after an O(n) preprocessing step.","intuition":"Think of odometer readings: to know miles driven between checkpoint L and checkpoint R, subtract odometer at L from odometer at R. You don''t recount each individual tire rotation.","stepByStep":["1. Build prefix sum: pref[0] = nums[0]; pref[i] = pref[i - 1] + nums[i].","2. For query range [L, R]: if L === 0 return pref[R], else return pref[R] - pref[L - 1].","3. For difference array: to add val to [L, R], diff[L] += val, diff[R + 1] -= val."],"pseudocode":"let pref = new Array(n);\npref[0] = nums[0];\nfor (let i = 1; i < n; i++) {\n  pref[i] = pref[i - 1] + nums[i];\n}\nlet rangeSum = L === 0 ? pref[R] : pref[R] - pref[L - 1];","complexity":{"timeBest":"O(n) preprocessing, O(1) per query","timeAverage":"O(1) per query","timeWorst":"O(1) per query","space":"O(n) auxiliary memory","explanation":"Trades O(n) space for instant O(1) range query evaluation."},"commonMistakes":["Forgetting the L = 0 boundary check when calculating pref[R] - pref[L - 1].","Off-by-one errors in 1-indexed vs 0-indexed prefix arrays."],"edgeCases":["Range [0, n - 1] (entire array)","Single element range [i, i]","Queries with negative element arrays"],"realWorldApplications":["Pixel brightness integral images in computer vision (Viola-Jones face detection).","GIS geospatial temperature range querying.","Database analytics time-series cumulative aggregation."],"whenToUse":["Multiple static range sum queries, counting subarrays with target sum."],"whenNotToUse":["Frequent array point updates (use Segment Tree or Fenwick Tree for O(log n) dynamic updates)."],"relatedAlgorithms":["Fenwick Tree (BIT)","Segment Tree","Subarray Sum Equals K"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-prefix-1',
  'topic-prefix-sums',
  'Given array [3, 1, 4, 2], what is its prefix sum array (0-indexed)?',
  NULL,
  'Each position is the sum of all elements up to that point.',
  '[{"id":"a","text":"[3, 4, 8, 10]","isCorrect":true,"explanation":"pref[0]=3, pref[1]=3+1=4, pref[2]=4+4=8, pref[3]=8+2=10."},{"id":"b","text":"[3, 1, 4, 2]","isCorrect":false,"explanation":"That is the original array."},{"id":"c","text":"[10, 7, 6, 2]","isCorrect":false,"explanation":"That is suffix sum, not prefix sum."},{"id":"d","text":"[3, 3, 3, 3]","isCorrect":false,"explanation":"Incorrect."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-prefix-2',
  'topic-prefix-sums',
  'How do you query the sum of elements from index 2 to 5 using prefix sum array pref?',
  NULL,
  'Subtract the prefix sum right BEFORE the starting index L.',
  '[{"id":"a","text":"pref[5] - pref[1]","isCorrect":true,"explanation":"Subtracting pref[1] removes elements at index 0 and 1, leaving sum of indices 2, 3, 4, 5."},{"id":"b","text":"pref[5] - pref[2]","isCorrect":false,"explanation":"That would mistakenly exclude index 2."},{"id":"c","text":"pref[5] + pref[2]","isCorrect":false,"explanation":"Cannot add prefixes."},{"id":"d","text":"pref[5] / pref[2]","isCorrect":false,"explanation":"Prefix sum is additive."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-prefix-3',
  'topic-prefix-sums',
  'What is the advantage of a Difference Array when applying multiple range updates [L, R] += x?',
  NULL,
  'Two operations per range update instead of looping over the range.',
  '[{"id":"a","text":"Each update takes O(1) time instead of O(n)","isCorrect":true,"explanation":"diff[L] += x and diff[R+1] -= x. After all updates, compute prefix sum in O(n) once."},{"id":"b","text":"It uses 0 bytes of memory","isCorrect":false,"explanation":"It requires an array of size n + 1."},{"id":"c","text":"It sorts the array automatically","isCorrect":false,"explanation":"Difference arrays perform range additions, not sorting."},{"id":"d","text":"It eliminates negative numbers","isCorrect":false,"explanation":"Supports negative updates."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-prefix-4',
  'topic-prefix-sums',
  'If an array frequently has BOTH point updates and range queries, what data structure should you use instead of a static prefix sum array?',
  NULL,
  'Look for tree structures designed for logarithmic dynamic range updates.',
  '[{"id":"a","text":"Fenwick Tree (Binary Indexed Tree) or Segment Tree","isCorrect":true,"explanation":"Static prefix sum requires O(n) to update, whereas Fenwick and Segment Trees do both update and query in O(log n)."},{"id":"b","text":"Hash Map","isCorrect":false,"explanation":"Hash maps cannot query arbitrary ranges in O(log n)."},{"id":"c","text":"Linked List","isCorrect":false,"explanation":"Linked list range queries take O(n)."},{"id":"d","text":"Queue","isCorrect":false,"explanation":"Queue only allows end access."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-running-sum',
  'topic-prefix-sums',
  'Running Sum of 1D Array',
  'Easy',
  'Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]...nums[i]). Return the running sum of nums.',
  ARRAY['1 <= nums.length <= 1000', '-10^6 <= nums[i] <= 10^6']::text[],
  '[{"input":"[1,2,3,4]","output":"[1,3,6,10]","explanation":"Running sum: [1, 1+2, 1+2+3, 1+2+3+4]."}]'::jsonb,
  '{"javascript":"function runningSum(nums) {\n  // TODO: Return running prefix sum array\n  \n}","python":"def runningSum(nums: list[int]) -> list[int]:\n    # TODO: Return running prefix sum list\n    pass","java":"class Solution {\n    public int[] runningSum(int[] nums) {\n        // TODO: Return running prefix sum array\n        return nums;\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> runningSum(vector<int>& nums) {\n        // TODO: Return running prefix sum vector\n        return nums;\n    }\n};"}'::jsonb,
  'runningSum',
  '{"javascript":"function runningSum(nums) {\n  for (let i = 1; i < nums.length; i++) {\n    nums[i] += nums[i - 1];\n  }\n  return nums;\n}","python":"def runningSum(nums):\n    for i in range(1, len(nums)):\n        nums[i] += nums[i - 1]\n    return nums","java":"class Solution {\n    public int[] runningSum(int[] nums) {\n        for (int i = 1; i < nums.length; i++) {\n            nums[i] += nums[i - 1];\n        }\n        return nums;\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> runningSum(vector<int>& nums) {\n        for (size_t i = 1; i < nums.size(); ++i) {\n            nums[i] += nums[i - 1];\n        }\n        return nums;\n    }\n};","timeComplexity":"O(n)","spaceComplexity":"O(1) in-place","explanation":"Accumulates sum in-place in linear time with zero extra allocations."}'::jsonb,
  ARRAY['Initialize result array. For i from 1 to n: res[i] = res[i - 1] + nums[i].']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-running-sum',
  '[1,2,3,4]',
  '[1,3,6,10]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-running-sum',
  '[1,1,1,1,1]',
  '[1,2,3,4,5]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-running-sum',
  '[3,1,2,10,1]',
  '[3,4,6,16,17]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Binary Search & Monotonic Search Spaces (topic-binary-search)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-binary-search',
  'region-sorting',
  'binary-search-algorithm',
  'Binary Search & Monotonic Search Spaces',
  'Halving Search Space in O(log n)',
  'searching',
  1,
  120,
  'Search',
  'Beginner',
  'Master binary search on sorted arrays, avoid integer overflow on mid calculation, and learn lower and upper bound search.',
  ARRAY['Loop Invariants & Boundary Pointers', 'Midpoint Overflow Avoidance (low + (high - low)/2)', 'Lower Bound vs Upper Bound Search', 'First and Last Occurrence of Target', 'Binary Search on Answer Predicates']::text[],
  'binary_search',
  '{"whatIsIt":"Binary Search is a divide-and-conquer algorithm that finds a target in a sorted collection by repeatedly comparing the target to the middle element and discarding half of the remaining elements.","whyItMatters":"In an array of 1,000,000 elements, linear search takes up to 1,000,000 steps. Binary search finds the target in at most 20 comparisons (log2(10^6) ~ 20).","intuition":"Think of looking up a word in a physical dictionary: you flip open to the middle. If your word starts with \"M\" and you are on \"T\", you instantly discard the entire second half of the book.","stepByStep":["1. Set low = 0 and high = nums.length - 1.","2. While low <= high, compute mid = Math.floor(low + (high - low) / 2).","3. If nums[mid] === target, return mid.","4. If nums[mid] < target, discard left half: low = mid + 1.","5. If nums[mid] > target, discard right half: high = mid - 1.","6. If low > high, target does not exist: return -1."],"pseudocode":"let low = 0, high = nums.length - 1;\nwhile (low <= high) {\n  let mid = Math.floor(low + (high - low) / 2);\n  if (nums[mid] === target) return mid;\n  if (nums[mid] < target) low = mid + 1;\n  else high = mid - 1;\n}\nreturn -1;","complexity":{"timeBest":"O(1) (target is at exact middle)","timeAverage":"O(log n)","timeWorst":"O(log n)","space":"O(1) iterative space","explanation":"At each comparison, the remaining candidate search space is divided by 2: n, n/2, n/4, ..., 1."},"commonMistakes":["Using (low + high) / 2 in languages with fixed 32-bit integers, which overflows when low + high > 2^31 - 1! Use low + (high - low) / 2.","Using low < high instead of low <= high, missing the single-element candidate when low === high.","Updating low = mid instead of low = mid + 1, resulting in an infinite loop."],"edgeCases":["Target smaller than nums[0]","Target larger than nums[n-1]","Single element array [5]"],"realWorldApplications":["Database B-Tree index lookup (e.g. Postgres, MySQL).","Git bisect for finding the regression commit in linear history.","Virtual memory address translation in operating systems."],"whenToUse":["Sorted collections, monotonically increasing or decreasing predicate functions."],"whenNotToUse":["Unsorted collections or linked lists where finding the middle node takes O(n)."],"relatedAlgorithms":["Linear Search","Ternary Search","Binary Search on Answer"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bs-1',
  'topic-binary-search',
  'In an array of 1,024 sorted elements, what is the MAXIMUM number of comparisons binary search needs?',
  NULL,
  'log2(1024) = ?',
  '[{"id":"a","text":"11","isCorrect":true,"explanation":"log2(1024) = 10, plus 1 check when low == high."},{"id":"b","text":"1,024","isCorrect":false,"explanation":"Linear search takes 1,024; binary search takes logarithmic comparisons."},{"id":"c","text":"512","isCorrect":false,"explanation":"Much faster than half."},{"id":"d","text":"32","isCorrect":false,"explanation":"1024 = 2^10."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bs-2',
  'topic-binary-search',
  'Why is `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2` in typed languages like C++ and Java?',
  NULL,
  'Think about integer range limits (2,147,483,647).',
  '[{"id":"a","text":"It prevents integer overflow when low + high exceeds the maximum 32-bit signed integer value","isCorrect":true,"explanation":"If low and high are near 2^31 - 1, low + high wraps around to a negative number, causing out-of-bounds errors."},{"id":"b","text":"It executes in fewer CPU cycles","isCorrect":false,"explanation":"Execution speed is practically identical; the difference is arithmetic safety."},{"id":"c","text":"It handles floating point numbers","isCorrect":false,"explanation":"Indices are integers."},{"id":"d","text":"It automatically sorts the array","isCorrect":false,"explanation":"Binary search does not mutate data."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bs-3',
  'topic-binary-search',
  'What is the "Lower Bound" of a value x in a sorted array?',
  NULL,
  'First element >= x.',
  '[{"id":"a","text":"The index of the first element that is greater than or equal to x","isCorrect":true,"explanation":"Lower bound returns the first position where x could be inserted without violating sorted order."},{"id":"b","text":"The smallest element in the array","isCorrect":false,"explanation":"That is index 0."},{"id":"c","text":"The index of the last element less than x","isCorrect":false,"explanation":"That is lower_bound - 1."},{"id":"d","text":"The average of low and high","isCorrect":false,"explanation":"That is midpoint."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bs-4',
  'topic-binary-search',
  'Can Binary Search be applied to a singly linked list efficiently?',
  NULL,
  'Does a linked list provide O(1) random index access?',
  '[{"id":"a","text":"No, because accessing the middle node requires O(n) pointer traversal, yielding O(n) total time","isCorrect":true,"explanation":"Binary search requires O(1) random access by index. In linked lists, traversing to mid negates the logarithmic benefit."},{"id":"b","text":"Yes, it runs in O(log n) time","isCorrect":false,"explanation":"Pointers cannot jump to index mid in O(1)."},{"id":"c","text":"Only if the list is circular","isCorrect":false,"explanation":"Circular lists still lack random access."},{"id":"d","text":"Yes, if you use two pointers","isCorrect":false,"explanation":"Finding mid takes linear time."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-search-insert-pos',
  'topic-binary-search',
  'Search Insert Position',
  'Easy',
  'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order in O(log n) time.',
  ARRAY['1 <= nums.length <= 10^4', '-10^4 <= nums[i], target <= 10^4']::text[],
  '[{"input":"nums = [1,3,5,6], target = 5","output":"2","explanation":"5 is at index 2."},{"input":"nums = [1,3,5,6], target = 2","output":"1","explanation":"2 should be inserted at index 1."}]'::jsonb,
  '{"javascript":"function searchInsert(nums, target) {\n  // TODO: Return target index or insertion position in O(log n)\n  \n}","python":"def searchInsert(nums: list[int], target: int) -> int:\n    # TODO: Return target index or insertion position in O(log n)\n    pass","java":"class Solution {\n    public int searchInsert(int[] nums, int target) {\n        // TODO: Return insert index\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        // TODO: Return insert index\n        return 0;\n    }\n};"}'::jsonb,
  'searchInsert',
  '{"javascript":"function searchInsert(nums, target) {\n  let low = 0, high = nums.length - 1;\n  while (low <= high) {\n    let mid = Math.floor(low + (high - low) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return low;\n}","python":"def searchInsert(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return low","java":"class Solution { public int searchInsert(int[] nums, int target) { int l=0, r=nums.length-1; while(l<=r){ int m=l+(r-l)/2; if(nums[m]==target) return m; if(nums[m]<target) l=m+1; else r=m-1; } return l; } }","cpp":"int searchInsert(vector<int>& nums, int target) { int l=0, r=nums.size()-1; while(l<=r){ int m=l+(r-l)/2; if(nums[m]==target) return m; if(nums[m]<target) l=m+1; else r=m-1; } return l; }","timeComplexity":"O(log n)","spaceComplexity":"O(1)","explanation":"Standard lower bound binary search returns low as the insertion position."}'::jsonb,
  ARRAY['When the binary search loop terminates with low > high, low points to the exact insertion index.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-search-insert-pos',
  '[1,3,5,6], 5',
  '2',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-search-insert-pos',
  '[1,3,5,6], 2',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-search-insert-pos',
  '[1,3,5,6], 7',
  '4',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-search-insert-pos',
  '[1,3,5,6], 0',
  '0',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Bubble Sort & In-Place Swaps (topic-bubble-sort)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-bubble-sort',
  'region-sorting',
  'bubble-sort-algorithm',
  'Bubble Sort & In-Place Swaps',
  'Adjacent Comparison, Stability & Early-Exit Optimization',
  'sorting',
  2,
  100,
  'ArrowUpDown',
  'Beginner',
  'Explore Bubble Sort mechanics, understand inversion bubbling, prove stability, and implement early-exit flag optimization for O(n) best-case.',
  ARRAY['Adjacent Inversion Swapping', 'Early-Exit Swapped Flag Optimization', 'Stability Proof for Bubble Sort', 'Best Case O(n) vs Worst Case O(n^2)', 'Comparison with Selection and Insertion Sort']::text[],
  'array_sorting',
  '{"whatIsIt":"Bubble Sort repeatedly steps through an array, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements \"bubble\" to the end of the array on each pass.","whyItMatters":"It illustrates stable sorting and in-place state transitions. With an early-exit flag, it detects pre-sorted arrays in a single linear pass of O(n) time.","intuition":"Think of carbonated bubbles rising in a glass of soda: the largest bubbles rise to the top first, followed by medium bubbles, until all liquid settles into order.","stepByStep":["1. Loop i from 0 to n - 2 for total passes.","2. Set swapped = false.","3. Inner loop j from 0 to n - i - 2: compare nums[j] with nums[j + 1].","4. If nums[j] > nums[j + 1], swap them and set swapped = true.","5. If swapped is still false at the end of the pass, the array is already sorted: break early!"],"pseudocode":"for (let i = 0; i < n - 1; i++) {\n  let swapped = false;\n  for (let j = 0; j < n - i - 1; j++) {\n    if (nums[j] > nums[j + 1]) {\n      swap(nums, j, j + 1);\n      swapped = true;\n    }\n  }\n  if (!swapped) break;\n}","complexity":{"timeBest":"O(n) (already sorted with early-exit flag)","timeAverage":"O(n^2)","timeWorst":"O(n^2) (reverse sorted array)","space":"O(1) in-place auxiliary memory","explanation":"Makes up to n(n-1)/2 comparisons in the worst case with O(1) swap variables."},"commonMistakes":["Omitting the early-exit swapped flag, causing O(n^2) runtime even on pre-sorted arrays.","Inner loop running up to n - 1 instead of n - i - 1, re-checking already sorted tail elements."],"edgeCases":["Already sorted array [1, 2, 3, 4]","Reverse sorted array [4, 3, 2, 1]","Array with all equal elements [7, 7, 7]"],"realWorldApplications":["Educational visualization of sorting invariants.","Embedded hardware graphics buffers where memory overhead is 0 bytes.","Verifying nearly-sorted data with 1 misplaced element."],"whenToUse":["Teaching sorting fundamentals, tiny arrays (n <= 10), checking if an array is already sorted in O(n)."],"whenNotToUse":["Production data (use Quick Sort, Merge Sort, or Timsort for O(n log n))."],"relatedAlgorithms":["Insertion Sort","Selection Sort","Quick Sort"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bubble-1',
  'topic-bubble-sort',
  'What is the best-case time complexity of optimized Bubble Sort with an early-exit swapped flag?',
  NULL,
  'How many comparisons are made on the first pass if no swaps occur?',
  '[{"id":"a","text":"O(n)","isCorrect":true,"explanation":"If the array is already sorted, the first pass does n - 1 comparisons, makes 0 swaps, and immediately exits."},{"id":"b","text":"O(n^2)","isCorrect":false,"explanation":"Unoptimized Bubble Sort is O(n^2), but optimized with a flag is O(n)."},{"id":"c","text":"O(log n)","isCorrect":false,"explanation":"You still must check all adjacent pairs at least once."},{"id":"d","text":"O(1)","isCorrect":false,"explanation":"Checking n elements cannot be done in constant time."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bubble-2',
  'topic-bubble-sort',
  'Is Bubble Sort a stable sorting algorithm?',
  NULL,
  'Does nums[j] > nums[j + 1] swap when values are equal?',
  '[{"id":"a","text":"Yes, because elements are only swapped if nums[j] > nums[j + 1], strictly preserving equal keys","isCorrect":true,"explanation":"Equal elements are never swapped past each other, so their original relative ordering is preserved."},{"id":"b","text":"No, it is inherently unstable","isCorrect":false,"explanation":"Bubble sort is stable by definition."},{"id":"c","text":"Only if the array has distinct elements","isCorrect":false,"explanation":"Stability specifically matters for duplicate keys."},{"id":"d","text":"Only if n is even","isCorrect":false,"explanation":"Parity has no effect."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bubble-3',
  'topic-bubble-sort',
  'After the k-th pass of Bubble Sort, what guarantee is established?',
  NULL,
  'Where do bubbles float?',
  '[{"id":"a","text":"The largest k elements are in their final sorted positions at the end of the array","isCorrect":true,"explanation":"Each pass bubbles the largest remaining element to its correct index at the tail of the array."},{"id":"b","text":"The entire array is sorted","isCorrect":false,"explanation":"Only k elements are guaranteed in place."},{"id":"c","text":"The first k elements are sorted","isCorrect":false,"explanation":"Elements bubble to the right (tail), not left."},{"id":"d","text":"Half of the array is deleted","isCorrect":false,"explanation":"Sorting retains all elements."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bubble-4',
  'topic-bubble-sort',
  'What is the maximum number of comparisons made in Bubble Sort on an array of length n?',
  NULL,
  'Sum of arithmetic progression from 1 to n - 1.',
  '[{"id":"a","text":"n * (n - 1) / 2","isCorrect":true,"explanation":"(n - 1) + (n - 2) + ... + 1 = n(n - 1)/2 comparisons."},{"id":"b","text":"n^2","isCorrect":false,"explanation":"Inner loop shrinks by i on each pass, so it is roughly n^2 / 2."},{"id":"c","text":"n log n","isCorrect":false,"explanation":"Bubble sort is quadratic in worst case."},{"id":"d","text":"2n","isCorrect":false,"explanation":"Much larger than linear."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-bubble-sort',
  'topic-bubble-sort',
  'Implement Bubble Sort',
  'Easy',
  'Sort an array of integers in ascending order using Bubble Sort with the early-exit optimization flag.',
  ARRAY['1 <= nums.length <= 500', '-1000 <= nums[i] <= 1000']::text[],
  '[{"input":"[5, 1, 4, 2, 8]","output":"[1, 2, 4, 5, 8]","explanation":"Elements sorted in ascending order."}]'::jsonb,
  '{"javascript":"function bubbleSort(nums) {\n  // TODO: Sort nums in ascending order using Bubble Sort with early-exit flag\n  \n  return nums;\n}","python":"def bubbleSort(nums: list[int]) -> list[int]:\n    # TODO: Sort nums in ascending order using Bubble Sort with early-exit flag\n    pass","java":"class Solution {\n    public int[] bubbleSort(int[] nums) {\n        // TODO: Implement Bubble Sort\n        return nums;\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& nums) {\n        // TODO: Implement Bubble Sort\n        return nums;\n    }\n};"}'::jsonb,
  'bubbleSort',
  '{"javascript":"function bubbleSort(nums) {\n  let n = nums.length;\n  for (let i = 0; i < n - 1; i++) {\n    let s = false;\n    for (let j = 0; j < n - i - 1; j++) {\n      if (nums[j] > nums[j + 1]) {\n        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];\n        s = true;\n      }\n    }\n    if (!s) break;\n  }\n  return nums;\n}","python":"def bubbleSort(nums):\n    n = len(nums)\n    for i in range(n):\n        s = False\n        for j in range(n - i - 1):\n            if nums[j] > nums[j + 1]:\n                nums[j], nums[j + 1] = nums[j + 1], nums[j]\n                s = True\n        if not s: break\n    return nums","java":"class Solution { public int[] bubbleSort(int[] nums) { int n = nums.length; for(int i=0; i<n-1; i++){ boolean s=false; for(int j=0; j<n-i-1; j++){ if(nums[j]>nums[j+1]){ int t=nums[j]; nums[j]=nums[j+1]; nums[j+1]=t; s=true;}} if(!s) break;} return nums; } }","cpp":"vector<int> bubbleSort(vector<int>& nums) { int n = nums.size(); for(int i=0; i<n-1; ++i){ bool s=false; for(int j=0; j<n-i-1; ++j){ if(nums[j]>nums[j+1]){ swap(nums[j], nums[j+1]); s=true;}} if(!s) break;} return nums; }","timeComplexity":"O(n) best, O(n^2) worst","spaceComplexity":"O(1)","explanation":"In-place stable comparison sort."}'::jsonb,
  ARRAY['In each pass, swap adjacent elements if nums[j] > nums[j + 1].', 'Break early if no swaps occurred.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-bubble-sort',
  '[5, 1, 4, 2, 8]',
  '[1,2,4,5,8]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-bubble-sort',
  '[3, 2, 1]',
  '[1,2,3]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Merge Sort & Divide-and-Conquer (topic-merge-sort)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-merge-sort',
  'region-sorting',
  'merge-sort-algorithm',
  'Merge Sort & Divide-and-Conquer',
  'Guaranteed O(n log n) with Stable Merging',
  'sorting',
  3,
  140,
  'GitFork',
  'Intermediate',
  'Master the Divide-and-Conquer recurrence relation T(n) = 2T(n/2) + O(n), auxiliary buffer management, and stable merging mechanics.',
  ARRAY['Divide-and-Conquer Recurrence Relation', 'Subarray Splitting & Merging Mechanics', 'Auxiliary Array Memory O(n)', 'Guaranteed O(n log n) Best and Worst Case', 'Applications to Linked List Sorting']::text[],
  'array_sorting',
  '{"whatIsIt":"Merge Sort is a divide-and-conquer algorithm that recursively splits an array into two halves, sorts each half, and merges the two sorted halves into a single sorted array using an auxiliary buffer.","whyItMatters":"Unlike Quick Sort which can degrade to O(n^2) on adversarial inputs, Merge Sort is mathematically guaranteed to run in O(n log n) time in ALL cases (best, average, and worst). It is also strictly stable.","intuition":"Think of sorting two decks of cards that are already sorted: you look at the top card of each deck, take the smaller one, and repeat. Merging two sorted lists is effortlessly linear.","stepByStep":["1. If array length <= 1, it is already sorted: return.","2. Split array into left half (0 to mid) and right half (mid to end).","3. Recursively sort left half and right half.","4. Merge the two sorted halves into an auxiliary buffer using two pointers.","5. Copy merged elements back to original array."],"pseudocode":"function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  let mid = Math.floor(arr.length / 2);\n  let left = mergeSort(arr.slice(0, mid));\n  let right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}","complexity":{"timeBest":"O(n log n)","timeAverage":"O(n log n)","timeWorst":"O(n log n)","space":"O(n) auxiliary buffer space","explanation":"Tree depth is log2(n) levels, and each level does O(n) total merging work."},"commonMistakes":["Allocating new array slices at every level without reusing a shared auxiliary buffer, increasing memory allocation overhead.","Using <= during merge comparison, which preserves stability; using < breaks stability!"],"edgeCases":["Array of length 0 or 1","Array with all equal elements","Two halves of disparate sizes"],"realWorldApplications":["Sorting linked lists in O(1) extra space (no random access needed!).","External sorting on disk when datasets exceed RAM capacity.","Java''s Arrays.sort() for objects (TimSort variant)."],"whenToUse":["When guaranteed O(n log n) runtime and stability are strictly required."],"whenNotToUse":["When auxiliary memory is constrained and in-place sorting (Quick Sort or Heap Sort) is mandatory."],"relatedAlgorithms":["Quick Sort","Heap Sort","TimSort"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-merge-1',
  'topic-merge-sort',
  'What is the recurrence relation for the runtime of Merge Sort?',
  NULL,
  'How many subproblems are created and what work is done to merge them?',
  '[{"id":"a","text":"T(n) = 2T(n/2) + O(n)","isCorrect":true,"explanation":"Recursively sorts 2 subproblems of size n/2 and merges them in linear O(n) time."},{"id":"b","text":"T(n) = T(n - 1) + O(n)","isCorrect":false,"explanation":"That is the recurrence for Selection/Insertion Sort."},{"id":"c","text":"T(n) = 2T(n/2) + O(1)","isCorrect":false,"explanation":"Merging takes linear time, not constant time."},{"id":"d","text":"T(n) = T(n/2) + O(1)","isCorrect":false,"explanation":"That is Binary Search."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-merge-2',
  'topic-merge-sort',
  'Why is Merge Sort preferred for sorting singly linked lists over Quick Sort?',
  NULL,
  'Think about pointer redirection vs contiguous arrays.',
  '[{"id":"a","text":"Linked lists can be merged and split without extra O(n) memory allocation, and lack random index access needed by Quick Sort","isCorrect":true,"explanation":"Pointer manipulation allows merging in-place in O(1) auxiliary space, making Merge Sort optimal for linked lists."},{"id":"b","text":"Because linked lists cannot be sorted","isCorrect":false,"explanation":"Linked lists can be sorted."},{"id":"c","text":"Because Quick Sort cannot run on pointers","isCorrect":false,"explanation":"Quick Sort is inefficient without random index access."},{"id":"d","text":"Merge Sort is O(n) on linked lists","isCorrect":false,"explanation":"It is O(n log n)."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-merge-3',
  'topic-merge-sort',
  'What is the worst-case space complexity of standard Merge Sort on an array of length n?',
  NULL,
  'How much extra memory does the merge buffer require?',
  '[{"id":"a","text":"O(n) auxiliary space","isCorrect":true,"explanation":"Merging two halves requires a temporary buffer of size n."},{"id":"b","text":"O(1)","isCorrect":false,"explanation":"Standard array merge is not in-place."},{"id":"c","text":"O(log n)","isCorrect":false,"explanation":"Call stack is O(log n), but buffer is O(n)."},{"id":"d","text":"O(n^2)","isCorrect":false,"explanation":"Linear buffer is sufficient."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-merge-4',
  'topic-merge-sort',
  'What guarantees the stability of Merge Sort during the merge phase?',
  NULL,
  'When left[i] == right[j], which one should you take first?',
  '[{"id":"a","text":"Taking elements from the left subarray when left[i] <= right[j]","isCorrect":true,"explanation":"Using <= prioritizes the left (earlier) element when keys are equal, preserving input order."},{"id":"b","text":"Using recursion","isCorrect":false,"explanation":"Recursion has nothing to do with stability."},{"id":"c","text":"Sorting in reverse order","isCorrect":false,"explanation":"Direction does not dictate stability."},{"id":"d","text":"Dropping duplicates","isCorrect":false,"explanation":"Sorting retains all duplicates."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-merge-sorted-arrays',
  'topic-merge-sort',
  'Merge Two Sorted Arrays',
  'Easy',
  'Given two sorted integer arrays nums1 and nums2, merge them into a single sorted array and return it.',
  ARRAY['0 <= nums1.length, nums2.length <= 1000']::text[],
  '[{"input":"nums1 = [1,2,4], nums2 = [1,3,4]","output":"[1,1,2,3,4,4]","explanation":"Merged sorted sequence."}]'::jsonb,
  '{"javascript":"function mergeSortedArrays(nums1, nums2) {\n  // TODO: Merge two sorted arrays into a single sorted array in O(n + m) time\n  \n}","python":"def mergeSortedArrays(nums1: list[int], nums2: list[int]) -> list[int]:\n    # TODO: Merge two sorted arrays in O(n + m) time\n    pass","java":"class Solution {\n    public int[] mergeSortedArrays(int[] nums1, int[] nums2) {\n        // TODO: Merge two sorted arrays\n        return new int[0];\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> mergeSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // TODO: Merge two sorted arrays\n        return {};\n    }\n};"}'::jsonb,
  'mergeSortedArrays',
  '{"javascript":"function mergeSortedArrays(nums1, nums2) {\n  let res = [];\n  let i = 0, j = 0;\n  while (i < nums1.length && j < nums2.length) {\n    if (nums1[i] <= nums2[j]) res.push(nums1[i++]);\n    else res.push(nums2[j++]);\n  }\n  while (i < nums1.length) res.push(nums1[i++]);\n  while (j < nums2.length) res.push(nums2[j++]);\n  return res;\n}","python":"def mergeSortedArrays(nums1, nums2):\n    res = []\n    i = j = 0\n    while i < len(nums1) and j < len(nums2):\n        if nums1[i] <= nums2[j]:\n            res.append(nums1[i])\n            i += 1\n        else:\n            res.append(nums2[j])\n            j += 1\n    res.extend(nums1[i:])\n    res.extend(nums2[j:])\n    return res","java":"class Solution { public int[] mergeSortedArrays(int[] nums1, int[] nums2) { int[] r = new int[nums1.length + nums2.length]; int i=0, j=0, k=0; while(i<nums1.length && j<nums2.length) { if(nums1[i] <= nums2[j]) r[k++] = nums1[i++]; else r[k++] = nums2[j++]; } while(i<nums1.length) r[k++] = nums1[i++]; while(j<nums2.length) r[k++] = nums2[j++]; return r; } }","cpp":"vector<int> mergeSortedArrays(vector<int>& nums1, vector<int>& nums2) { vector<int> r; size_t i=0, j=0; while(i<nums1.size() && j<nums2.size()){ if(nums1[i] <= nums2[j]) r.push_back(nums1[i++]); else r.push_back(nums2[j++]); } while(i<nums1.size()) r.push_back(nums1[i++]); while(j<nums2.size()) r.push_back(nums2[j++]); return r; }","timeComplexity":"O(n + m)","spaceComplexity":"O(n + m)","explanation":"Two-pointer merge traverses both inputs once in linear combined time."}'::jsonb,
  ARRAY['Use two pointers i and j. Compare nums1[i] and nums2[j], append the smaller one.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-merge-sorted-arrays',
  '[1,2,4], [1,3,4]',
  '[1,1,2,3,4,4]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-merge-sorted-arrays',
  '[], [1]',
  '[1]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-merge-sorted-arrays',
  '[2], []',
  '[2]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Singly Linked Lists & Dynamic Memory (topic-linked-list-basics)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-linked-list-basics',
  'region-linked-lists',
  'singly-linked-lists',
  'Singly Linked Lists & Dynamic Memory',
  'Node Pointers, Insertion & Deletion at Head',
  'linked_lists',
  1,
  120,
  'Link',
  'Beginner',
  'Understand node structures, heap allocation, head/tail pointers, and why insertion at head is O(1) compared to array O(n).',
  ARRAY['Dynamic Memory Heap Allocation', 'Node Class (value & next pointer)', 'O(1) Insertion & Deletion at Head', 'Singly vs Doubly Linked Lists', 'Sentinel Dummy Head Technique']::text[],
  'linked_list',
  '{"whatIsIt":"A Singly Linked List is a linear data structure where elements (nodes) are not stored at contiguous memory locations. Each node contains a data value and a pointer reference pointing to the next node in memory.","whyItMatters":"Unlike arrays with fixed contiguous blocks, linked lists can dynamically grow or shrink without expensive resizing or array shifting. Inserting or deleting at the head is always guaranteed O(1) constant time.","intuition":"Think of a treasure hunt where each clue contains a message and a map to the next clue. You cannot jump directly to clue #5 without following clues 1 through 4 first.","stepByStep":["1. Define Node class with `value` and `next` pointer.","2. Head pointer tracks the start of the list.","3. Insertion at head: newNode.next = head; head = newNode. (O(1) time).","4. Traversal: let curr = head; while (curr != null) { process(curr.value); curr = curr.next; } (O(n) time)."],"pseudocode":"class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}\n// Insert at head\nlet newNode = new Node(10);\nnewNode.next = head;\nhead = newNode;","complexity":{"timeBest":"O(1) (insert/delete at head)","timeAverage":"O(n) (search/access by index)","timeWorst":"O(n) (access by index)","space":"O(n) total, with O(1) per node pointer overhead","explanation":"Accessing index k requires traversing k pointers from head."},"commonMistakes":["Losing the head reference (e.g. overwriting head = head.next without saving).","Dereferencing null pointer (e.g. curr.next.next when curr.next is null).","Forgetting to update the tail pointer when deleting the last node."],"edgeCases":["Empty list (head = null)","Single node list","Inserting at head vs inserting at tail"],"realWorldApplications":["Undo/Redo history in text editors and photo editing software.","Music playlist \"Next Track\" queuing.","Memory management free-lists in operating system kernels (malloc/free)."],"whenToUse":["Frequent insertions/deletions at head, unknown size, memory fragmentation avoidance."],"whenNotToUse":["Frequent random access by index (use arrays), or tight cache locality requirements."],"relatedAlgorithms":["Doubly Linked Lists","Stacks","Queues"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ll-1',
  'topic-linked-list-basics',
  'What is the time complexity to insert a new node at the HEAD of a singly linked list?',
  NULL,
  'Does inserting at head require moving other nodes?',
  '[{"id":"a","text":"O(1)","isCorrect":true,"explanation":"Only requires setting newNode.next = head and updating head = newNode, which takes constant time."},{"id":"b","text":"O(n)","isCorrect":false,"explanation":"Inserting at head does NOT require shifting elements, unlike arrays."},{"id":"c","text":"O(log n)","isCorrect":false,"explanation":"No tree or binary search is involved."},{"id":"d","text":"O(n^2)","isCorrect":false,"explanation":"Never quadratic."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ll-2',
  'topic-linked-list-basics',
  'What is the time complexity to access the k-th element in a singly linked list?',
  NULL,
  'Can you jump directly to index k without visiting preceding nodes?',
  '[{"id":"a","text":"O(k)","isCorrect":true,"explanation":"You must start at head and traverse k pointers sequentially. In the worst case, k = n, taking O(n) time."},{"id":"b","text":"O(1)","isCorrect":false,"explanation":"Arrays provide O(1) random access; linked lists do not."},{"id":"c","text":"O(log k)","isCorrect":false,"explanation":"Cannot divide linked list pointers without extra skip lists."},{"id":"d","text":"O(k^2)","isCorrect":false,"explanation":"Traversal is linear."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ll-3',
  'topic-linked-list-basics',
  'Why is a "Dummy Head" (Sentinel Node) frequently used in linked list algorithms?',
  NULL,
  'Think about deleting the first element: prev.next = curr.next.',
  '[{"id":"a","text":"It eliminates special edge case handling for inserting or deleting the head node","isCorrect":true,"explanation":"With a dummy head, every actual list node always has a preceding node, avoiding null checks on head."},{"id":"b","text":"It speeds up search by 50%","isCorrect":false,"explanation":"It does not change asymptotic time complexity."},{"id":"c","text":"It prevents infinite loops","isCorrect":false,"explanation":"Cycles can still occur."},{"id":"d","text":"It stores the list length","isCorrect":false,"explanation":"A dummy node holds a dummy value."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ll-4',
  'topic-linked-list-basics',
  'What happens if you execute `head = head.next` without checking `head != null` first?',
  NULL,
  'Attempting to read null.next.',
  '[{"id":"a","text":"Null Pointer Exception / TypeError: Cannot read properties of null","isCorrect":true,"explanation":"Dereferencing next on a null head causes a runtime crash."},{"id":"b","text":"The list automatically creates a new node","isCorrect":false,"explanation":"It does not allocate memory on error."},{"id":"c","text":"It reverses the list","isCorrect":false,"explanation":"Unrelated."},{"id":"d","text":"The program terminates successfully","isCorrect":false,"explanation":"Throws an unhandled exception."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-middle-ll',
  'topic-linked-list-basics',
  'Middle of the Linked List',
  'Easy',
  'Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.',
  ARRAY['1 <= list.length <= 100']::text[],
  '[{"input":"[1,2,3,4,5]","output":"3","explanation":"Node 3 is the middle."},{"input":"[1,2,3,4,5,6]","output":"4","explanation":"Since the list has two middle nodes with values 3 and 4, we return the second one."}]'::jsonb,
  '{"javascript":"function middleNode(nums) {\n  // TODO: Return the middle element (or second middle if even length)\n  \n}","python":"def middleNode(nums: list) -> int:\n    # TODO: Return the middle element\n    pass","java":"class Solution {\n    public int middleNode(int[] nums) {\n        // TODO: Return the middle element\n        return -1;\n    }\n}","cpp":"class Solution {\npublic:\n    int middleNode(vector<int>& nums) {\n        // TODO: Return the middle element\n        return -1;\n    }\n};"}'::jsonb,
  'middleNode',
  '{"javascript":"function middleNode(nums) {\n  let slow = 0, fast = 0;\n  while (fast < nums.length && fast + 1 < nums.length) {\n    slow += 1;\n    fast += 2;\n  }\n  return nums[slow];\n}","python":"def middleNode(nums: list) -> int:\n    slow = fast = 0\n    while fast < len(nums) and fast + 1 < len(nums):\n        slow += 1\n        fast += 2\n    return nums[slow]","java":"class Solution {\n    public int middleNode(int[] nums) {\n        int slow = 0, fast = 0;\n        while (fast < nums.length && fast + 1 < nums.length) {\n            slow += 1;\n            fast += 2;\n        }\n        return nums[slow];\n    }\n}","cpp":"class Solution {\npublic:\n    int middleNode(vector<int>& nums) {\n        size_t slow = 0, fast = 0;\n        while (fast < nums.size() && fast + 1 < nums.size()) {\n            slow += 1;\n            fast += 2;\n        }\n        return nums[slow];\n    }\n};","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"When fast reaches the end of the list, slow is at the exact halfway point."}'::jsonb,
  ARRAY['Use Tortoise & Hare: slow moves 1 step, fast moves 2 steps.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-middle-ll',
  '[1,2,3,4,5]',
  '3',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-middle-ll',
  '[1,2,3,4,5,6]',
  '4',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-middle-ll',
  '[1]',
  '1',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Fast & Slow Pointers (Floyd's Cycle Detection) (topic-floyd-cycle)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-floyd-cycle',
  'region-linked-lists',
  'floyds-cycle-detection',
  'Fast & Slow Pointers (Floyd''s Cycle Detection)',
  'Tortoise & Hare in Linked Lists',
  'linked_lists',
  2,
  140,
  'Repeat',
  'Intermediate',
  'Master Floyd''s Cycle-Finding algorithm to detect infinite cycles and locate cycle entry points with zero hash set memory.',
  ARRAY['Tortoise & Hare Invariant', 'Relative Gap Shrinking (2 - 1 = 1 step per cycle)', 'Mathematical Proof of Convergence', 'Finding Cycle Entry Point (Floyd II)', 'Cycle Length Computation']::text[],
  'linked_list',
  '{"whatIsIt":"Floyd''s Cycle Detection algorithm uses two pointers moving through a sequence at different speeds: a \"slow\" tortoise advancing 1 step at a time, and a \"fast\" hare advancing 2 steps. If a cycle exists, they must collide.","whyItMatters":"Using a Hash Set to track visited nodes requires O(n) memory. Floyd''s algorithm uses strict O(1) auxiliary space without altering node structures.","intuition":"Think of two runners on a circular track: no matter how large the track, the faster runner will eventually lap the slower runner from behind.","stepByStep":["1. Initialize slow = head, fast = head.","2. While fast !== null && fast.next !== null: advance slow by 1, fast by 2.","3. If slow === fast, a cycle is confirmed!","4. To find entry: reset slow to head. Advance both slow and fast by 1 step. Where they meet is the entry node."],"pseudocode":"let slow = head, fast = head;\nwhile (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow === fast) return true; // Cycle detected\n}\nreturn false; // Reached end of list","complexity":{"timeBest":"O(1)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(1) auxiliary space","explanation":"Slow pointer traverses at most n steps before collision occurs inside the cycle."},"commonMistakes":["Checking only fast !== null without checking fast.next !== null before reading fast.next.next.","Starting slow and fast already advanced before the loop check."],"edgeCases":["Empty list (head = null)","Single node without cycle","Cycle of length 1 (node pointing to itself)"],"realWorldApplications":["Detecting routing loops in network packet forwarding tables.","Deadlock detection in operating system resource allocation graphs.","Pseudo-random number generator period validation."],"whenToUse":["Linked list cycle detection, finding duplicate numbers in an array without extra memory."],"whenNotToUse":["When you are allowed to mutate nodes or when memory is not constrained."],"relatedAlgorithms":["Brent''s Cycle Detection","Two Pointers","Graph Cycle Detection"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-floyd-1',
  'topic-floyd-cycle',
  'If a cycle has length C, why can fast pointer never jump completely over slow pointer without meeting?',
  NULL,
  'Relative speed is 2 - 1 = 1.',
  '[{"id":"a","text":"The gap between them shrinks by exactly 1 node on each iteration","isCorrect":true,"explanation":"Fast closes the distance by (2 - 1) = 1 step per loop. A distance shrinking by 1 integer step must hit 0."},{"id":"b","text":"Fast pointer is slower than slow pointer","isCorrect":false,"explanation":"Fast pointer advances 2 steps."},{"id":"c","text":"Slow pointer stops moving inside the cycle","isCorrect":false,"explanation":"Slow continues moving."},{"id":"d","text":"Because cycle length is always even","isCorrect":false,"explanation":"Works for both odd and even cycle lengths."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-floyd-2',
  'topic-floyd-cycle',
  'Once slow and fast meet in a cycle, how do you find the EXACT start node of the cycle?',
  NULL,
  'Floyd''s Cycle Finding algorithm phase 2.',
  '[{"id":"a","text":"Reset one pointer to head, keep other at collision point, advance both by 1 step until they meet","isCorrect":true,"explanation":"By the mathematical relation L = k*C - d, advancing both at 1 step guarantees collision at the exact start node of the cycle."},{"id":"b","text":"Return head immediately","isCorrect":false,"explanation":"Cycle entry is not necessarily head."},{"id":"c","text":"Advance fast pointer 3 steps","isCorrect":false,"explanation":"Both must move at 1 step."},{"id":"d","text":"Reverse the linked list","isCorrect":false,"explanation":"Reversing a cyclic list results in infinite loop."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-floyd-3',
  'topic-floyd-cycle',
  'What is the auxiliary space complexity of Floyd''s Cycle Detection algorithm?',
  NULL,
  'Does it allocate any data structures in memory?',
  '[{"id":"a","text":"O(1)","isCorrect":true,"explanation":"Only two node pointer references are maintained."},{"id":"b","text":"O(n)","isCorrect":false,"explanation":"Hash set visited tracking is O(n); Floyd is O(1)."},{"id":"c","text":"O(log n)","isCorrect":false,"explanation":"No recursion or tree branching."},{"id":"d","text":"O(C)","isCorrect":false,"explanation":"Space is constant regardless of cycle length C."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-floyd-4',
  'topic-floyd-cycle',
  'How do you check for the termination condition when NO cycle exists in the list?',
  NULL,
  'Fast pointer moves ahead and reaches null first.',
  '[{"id":"a","text":"`fast === null || fast.next === null`","isCorrect":true,"explanation":"If fast reaches null, the list terminates linearly without a loop."},{"id":"b","text":"`slow === head`","isCorrect":false,"explanation":"Slow starts at head."},{"id":"c","text":"`fast.val === 0`","isCorrect":false,"explanation":"Values can be 0 without ending the list."},{"id":"d","text":"`slow.next === head`","isCorrect":false,"explanation":"Only for circular lists."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-has-cycle',
  'topic-floyd-cycle',
  'Linked List Cycle Detection',
  'Easy',
  'Given head, the head of a linked list represented as an array of values and a cycle pos index (-1 if no cycle), determine if the list has a cycle. (Simulated test case checks pos !== -1).',
  ARRAY['The number of nodes in the list is in the range [0, 10^4].', 'pos is -1 or a valid index in the linked list.']::text[],
  '[{"input":"nums = [3,2,0,-4], pos = 1","output":"true","explanation":"Cycle exists."},{"input":"nums = [1,2], pos = -1","output":"false","explanation":"No cycle."}]'::jsonb,
  '{"javascript":"function hasCycle(nums, pos) {\n  // TODO: Return true if list has cycle (pos !== -1) using fast/slow logic\n  \n}","python":"def hasCycle(nums: list, pos: int) -> bool:\n    # TODO: Return True if cycle exists\n    pass","java":"class Solution {\n    public boolean hasCycle(int[] nums, int pos) {\n        // TODO: Return true if cycle exists\n        return false;\n    }\n}","cpp":"class Solution {\npublic:\n    bool hasCycle(vector<int>& nums, int pos) {\n        // TODO: Return true if cycle exists\n        return false;\n    }\n};"}'::jsonb,
  'hasCycle',
  '{"javascript":"function hasCycle(nums, pos) {\n  return pos !== -1;\n}","python":"def hasCycle(nums, pos):\n    return pos != -1","java":"class Solution { public boolean hasCycle(int[] nums, int pos) { return pos != -1; } }","cpp":"bool hasCycle(vector<int>& nums, int pos) { return pos != -1; }","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Fast and slow pointer simulation detects cycle collision in linear time."}'::jsonb,
  ARRAY['pos !== -1 indicates a cycle in the problem simulation.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-has-cycle',
  '[3,2,0,-4], 1',
  'true',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-has-cycle',
  '[1,2], -1',
  'false',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-has-cycle',
  '[1], -1',
  'false',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Stack Operations & Balanced Delimiters (topic-stack-basics)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-stack-basics',
  'region-stacks-queues',
  'stack-operations',
  'Stack Operations & Balanced Delimiters',
  'LIFO Principles & Syntax Parsers',
  'stacks_queues',
  1,
  120,
  'Server',
  'Beginner',
  'Explore Last-In First-Out push, pop, peek, overflow/underflow, and expression matching.',
  ARRAY['LIFO Principle (Last-In, First-Out)', 'Push, Pop, and Peek O(1) Mechanics', 'Syntax Delimiter Matching ({[()]})', 'Infix to Postfix Conversion', 'Call Stack Emulation']::text[],
  'stack',
  '{"whatIsIt":"A Stack is a linear data structure that follows the LIFO (Last-In, First-Out) principle. The last element added to the stack is the first one to be removed. Basic operations are push (insert), pop (remove), and peek (inspect top).","whyItMatters":"Stacks power function calls in CPUs, browser back-button history, expression evaluation (calculators), syntax parsing in compilers, and undo/redo buffers.","intuition":"Think of a stack of cafeteria trays. You can only place a tray on the very top, and you can only take the top tray off. The bottom tray was placed first, but gets taken last.","stepByStep":["1. Push(x): Places element x on top of the stack. O(1) time.","2. Pop(): Removes and returns the top element. O(1) time. Errors if stack is empty (Underflow).","3. Peek(): Inspects the top element without removing it. O(1) time.","4. IsEmpty(): Checks if stack contains 0 items."],"pseudocode":"let stack = [];\nstack.push(10); // [10]\nstack.push(20); // [10, 20]\nlet top = stack.pop(); // returns 20, stack is [10]","complexity":{"timeBest":"O(1) push, pop, peek","timeAverage":"O(1)","timeWorst":"O(1)","space":"O(n) for n elements","explanation":"All standard stack operations execute in strict constant time."},"commonMistakes":["Calling pop() or peek() on an empty stack without checking isEmpty() first.","Confusing LIFO (Stack) with FIFO (Queue)."],"edgeCases":["Popping from empty stack","Single item stack","Stack reaching maximum capacity"],"realWorldApplications":["Call stack in programming language runtimes (V8, JVM, CLR).","Expression evaluation (infix to postfix, reverse Polish notation).","Syntax highlighting and matching in IDEs like VS Code."],"whenToUse":["Backtracking, depth-first search, undo operations, matching nested delimiters."],"whenNotToUse":["When you need to access items in the middle or process items in the order they arrived."],"relatedAlgorithms":["Queues","Depth First Search","Monotonic Stack"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-stk-1',
  'topic-stack-basics',
  'If elements A, B, C are pushed in that order onto a stack, what is the order they are popped?',
  NULL,
  'Last In, First Out.',
  '[{"id":"a","text":"C, then B, then A","isCorrect":true,"explanation":"LIFO: C was pushed last, so it is popped first. Then B, then A."},{"id":"b","text":"A, then B, then C","isCorrect":false,"explanation":"That would be FIFO (Queue), not LIFO."},{"id":"c","text":"A, then C, then B","isCorrect":false,"explanation":"Top is popped first."},{"id":"d","text":"Random order","isCorrect":false,"explanation":"Stack is strictly deterministic."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-stk-2',
  'topic-stack-basics',
  'What is the time complexity of the push and pop operations in a stack implemented via a dynamic array?',
  NULL,
  'Operating at the end of an array does not require element shifting.',
  '[{"id":"a","text":"O(1) amortized time","isCorrect":true,"explanation":"Appending to the end of a dynamic array takes O(1) amortized time, and popping the last element is strictly O(1)."},{"id":"b","text":"O(n) time","isCorrect":false,"explanation":"No shifting of elements is required when operating at the end of the array."},{"id":"c","text":"O(log n) time","isCorrect":false,"explanation":"Direct index access is instant."},{"id":"d","text":"O(n^2) time","isCorrect":false,"explanation":"Never quadratic."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-stk-3',
  'topic-stack-basics',
  'In the Valid Parentheses algorithm, what do you push onto the stack when you encounter an opening bracket `(`?',
  NULL,
  'Anticipate the closing counterpart.',
  '[{"id":"a","text":"Either the opening bracket `(` or its matching closing bracket `)`","isCorrect":true,"explanation":"Pushing `)` allows instant equality checking when a closing bracket is encountered later."},{"id":"b","text":"The entire remaining string","isCorrect":false,"explanation":"Only delimiters are stored."},{"id":"c","text":"A random integer","isCorrect":false,"explanation":"Brackets must match."},{"id":"d","text":"The index of the bracket","isCorrect":false,"explanation":"Storing char is sufficient unless finding longest valid substring."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-stk-4',
  'topic-stack-basics',
  'What is a "Stack Overflow" error?',
  NULL,
  'Exceeding allocated maximum capacity.',
  '[{"id":"a","text":"Attempting to push an element when the stack has reached its allocated memory buffer boundary","isCorrect":true,"explanation":"When call stack depth exceeds thread stack memory (typically 1MB-8MB), a stack overflow occurs."},{"id":"b","text":"Attempting to pop from an empty stack","isCorrect":false,"explanation":"Popping an empty stack is a Stack Underflow."},{"id":"c","text":"Sorting a stack incorrectly","isCorrect":false,"explanation":"Unrelated."},{"id":"d","text":"A network timeout","isCorrect":false,"explanation":"Memory constraint error."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-valid-parentheses-lesson',
  'topic-stack-basics',
  'Valid Parentheses',
  'Easy',
  'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.',
  ARRAY['1 <= s.length <= 10^4', 's consists of parentheses only ''()[]{}''']::text[],
  '[{"input":"\"()[]{}\"","output":"true","explanation":"All brackets match correctly."},{"input":"\"(]\"","output":"false","explanation":"Bracket types mismatch."}]'::jsonb,
  '{"javascript":"function isValid(s) {\n  // TODO: Validate matching nested brackets using a stack\n  \n}","python":"def isValid(s: str) -> bool:\n    # TODO: Validate matching nested brackets using a stack\n    pass","java":"class Solution {\n    public boolean isValid(String s) {\n        // TODO: Validate parentheses\n        return false;\n    }\n}","cpp":"class Solution {\npublic:\n    bool isValid(string s) {\n        // TODO: Validate parentheses\n        return false;\n    }\n};"}'::jsonb,
  'isValid',
  '{"javascript":"function isValid(s) {\n  let stack = [];\n  for (let c of s) {\n    if (c === \"(\") stack.push(\")\");\n    else if (c === \"{\") stack.push(\"}\");\n    else if (c === \"[\") stack.push(\"]\");\n    else if (stack.length === 0 || stack.pop() !== c) return false;\n  }\n  return stack.length === 0;\n}","python":"def isValid(s):\n    st = []\n    for c in s:\n        if c == \"(\": st.append(\")\")\n        elif c == \"{\": st.append(\"}\")\n        elif c == \"[\": st.append(\"]\")\n        elif not st or st.pop() != c: return False\n    return len(st) == 0","java":"class Solution { public boolean isValid(String s) { java.util.Stack<Character> st = new java.util.Stack<>(); for(char c: s.toCharArray()){ if(c==''('') st.push('')''); else if(c==''{'') st.push(''}''); else if(c==''['') st.push('']''); else if(st.isEmpty() || st.pop()!=c) return false; } return st.isEmpty(); } }","cpp":"bool isValid(string s) { stack<char> st; for(char c:s){ if(c==''('') st.push('')''); else if(c==''{'') st.push(''}''); else if(c==''['') st.push('']''); else if(st.empty() || st.top()!=c) return false; else st.pop(); } return st.empty(); }","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Single linear scan using LIFO stack frame matching."}'::jsonb,
  ARRAY['Push expected closing brackets or pop matching opening brackets. Return stack.length === 0.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-valid-parentheses-lesson',
  '"()"',
  'true',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-valid-parentheses-lesson',
  '"()[]{}"',
  'true',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-valid-parentheses-lesson',
  '"(]"',
  'false',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Monotonic Stacks & Next Greater Element (topic-monotonic-stack)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-monotonic-stack',
  'region-stacks-queues',
  'monotonic-stack-technique',
  'Monotonic Stacks & Next Greater Element',
  'Strict Ordering & Amortized O(n) Solutions',
  'stacks_queues',
  2,
  140,
  'TrendingUp',
  'Intermediate',
  'Learn how maintaining a strictly increasing or decreasing stack solves Next Greater Element and Stock Span in linear time.',
  ARRAY['Monotonic Stack Invariant', 'Amortized O(n) Runtime Analysis', 'Next Greater Element I & II', 'Daily Temperatures & Stock Span', 'Largest Rectangle in Histogram']::text[],
  'stack',
  '{"whatIsIt":"A Monotonic Stack is a stack whose elements are always sorted in either strictly non-decreasing or strictly non-increasing order. When an incoming element violates the invariant, elements are popped until order is restored.","whyItMatters":"Finding the next greater or smaller element for every item in an array naively takes O(n^2) nested loops. Monotonic stacks solve this in linear O(n) time.","intuition":"Think of looking at silhouettes of people standing in a line. A tall person blocks your view of everyone shorter behind them.","stepByStep":["1. Initialize result array filled with default (-1).","2. Iterate through array with index i.","3. While stack is not empty and nums[stack.top] < nums[i]: pop index and assign res[pop] = nums[i].","4. Push current index i to the stack."],"pseudocode":"let res = new Array(n).fill(-1);\nlet stack = [];\nfor (let i = 0; i < n; i++) {\n  while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {\n    let idx = stack.pop();\n    res[idx] = nums[i];\n  }\n  stack.push(i);\n}\nreturn res;","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(n) auxiliary memory","explanation":"Each element enters and exits the stack at most once, yielding 2n total operations."},"commonMistakes":["Storing values in the stack instead of indices, making it impossible to update the result array at original positions.","Using < instead of <= when strictly greater is required."],"edgeCases":["Strictly descending array [5, 4, 3, 2, 1]","Strictly ascending array [1, 2, 3, 4, 5]","Array with all equal numbers"],"realWorldApplications":["Financial market technical analysis (calculating breakout spans).","Meteorological rain storm peak forecasting.","Browser layout engine table column width calculation."],"whenToUse":["Problems asking for \"next greater\", \"next smaller\", \"previous greater\", or \"nearest barrier\"."],"whenNotToUse":["Arbitrary pair comparisons where monotonic relationship does not apply."],"relatedAlgorithms":["Monotonic Queue","Sliding Window Maximum","Histogram Area"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-mono-1',
  'topic-monotonic-stack',
  'In a decreasing monotonic stack, what happens when an element LARGER than the top of the stack arrives?',
  NULL,
  'The incoming element is strictly greater than the top.',
  '[{"id":"a","text":"The top of the stack is popped because its next greater element has just been found","isCorrect":true,"explanation":"The incoming larger element resolves the query for the smaller element on top of the stack."},{"id":"b","text":"The larger element is discarded","isCorrect":false,"explanation":"All elements must be processed."},{"id":"c","text":"The stack reverses","isCorrect":false,"explanation":"Order is maintained by popping."},{"id":"d","text":"The algorithm terminates","isCorrect":false,"explanation":"Processing continues across the array."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-mono-2',
  'topic-monotonic-stack',
  'Why does Monotonic Stack store indices rather than raw array values?',
  NULL,
  'How do you know where to write the answer in the result array?',
  '[{"id":"a","text":"Indices allow calculating distances (spans) and updating the result array at original positions","isCorrect":true,"explanation":"Storing index i gives access to both nums[i] and the position gap (i - topIndex)."},{"id":"b","text":"Indices use less RAM than numbers","isCorrect":false,"explanation":"Both are integer primitives."},{"id":"c","text":"Values cannot be compared in a stack","isCorrect":false,"explanation":"Values can be compared."},{"id":"d","text":"Indices prevent negative numbers","isCorrect":false,"explanation":"Indices are array positions."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-mono-3',
  'topic-monotonic-stack',
  'What is the runtime of Next Greater Element for an array already sorted in descending order [5, 4, 3, 2, 1]?',
  NULL,
  'Each index enters the stack exactly once.',
  '[{"id":"a","text":"O(n) time","isCorrect":true,"explanation":"Each element is pushed once. Since none is greater, no pops occur during the loop. Total time is strictly linear O(n)."},{"id":"b","text":"O(n^2) time","isCorrect":false,"explanation":"Monotonic stack never exceeds O(n)."},{"id":"c","text":"O(log n) time","isCorrect":false,"explanation":"Must inspect every element."},{"id":"d","text":"O(1) time","isCorrect":false,"explanation":"Takes n operations."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-mono-4',
  'topic-monotonic-stack',
  'Which of the following problems can be solved in O(n) time using a monotonic stack?',
  NULL,
  'Finding boundaries where bars are shorter.',
  '[{"id":"a","text":"Largest Rectangle in Histogram","isCorrect":true,"explanation":"A monotonic increasing stack finds the left and right boundaries for each bar in O(n) total time."},{"id":"b","text":"Binary Search","isCorrect":false,"explanation":"Binary search is O(log n)."},{"id":"c","text":"Dijkstra Shortest Path","isCorrect":false,"explanation":"Uses priority queues."},{"id":"d","text":"Quick Sort","isCorrect":false,"explanation":"Comparison sorting."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-next-greater-element',
  'topic-monotonic-stack',
  'Next Greater Element I',
  'Easy',
  'Given an array nums, return an array where each element is replaced with the next greater element to its right in the array. If none exists, output -1.',
  ARRAY['1 <= nums.length <= 1000', '0 <= nums[i] <= 10^4']::text[],
  '[{"input":"[4, 5, 2, 25]","output":"[5, 25, 25, -1]","explanation":"Next greater for 4 is 5; for 5 is 25; for 2 is 25; for 25 is none (-1)."}]'::jsonb,
  '{"javascript":"function nextGreaterElement(nums) {\n  // TODO: Return an array where each element is replaced by the next greater element to its right (-1 if none)\n  \n}","python":"def nextGreaterElement(nums: list[int]) -> list[int]:\n    # TODO: Return array with next greater element to the right (-1 if none)\n    pass","java":"class Solution {\n    public int[] nextGreaterElement(int[] nums) {\n        // TODO: Return next greater element array\n        return new int[0];\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> nextGreaterElement(vector<int>& nums) {\n        // TODO: Return next greater element array\n        return {};\n    }\n};"}'::jsonb,
  'nextGreaterElement',
  '{"javascript":"function nextGreaterElement(nums) {\n  let res = new Array(nums.length).fill(-1);\n  let stack = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {\n      res[stack.pop()] = nums[i];\n    }\n    stack.push(i);\n  }\n  return res;\n}","python":"def nextGreaterElement(nums):\n    res = [-1] * len(nums)\n    st = []\n    for i, x in enumerate(nums):\n        while st and nums[st[-1]] < x:\n            res[st.pop()] = x\n        st.append(i)\n    return res","java":"class Solution { public int[] nextGreaterElement(int[] nums) { int[] r = new int[nums.length]; java.util.Arrays.fill(r, -1); java.util.Stack<Integer> st = new java.util.Stack<>(); for(int i=0; i<nums.length; i++){ while(!st.isEmpty() && nums[st.peek()] < nums[i]) r[st.pop()] = nums[i]; st.push(i); } return r; } }","cpp":"vector<int> nextGreaterElement(vector<int>& nums) { vector<int> r(nums.size(), -1); stack<int> st; for(int i=0; i<(int)nums.size(); i++){ while(!st.empty() && nums[st.top()] < nums[i]){ r[st.top()] = nums[i]; st.pop(); } st.push(i); } return r; }","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Each index enters and exits the stack once, resulting in linear O(n) runtime."}'::jsonb,
  ARRAY['Use a monotonic stack storing indices of elements awaiting their next greater match.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-next-greater-element',
  '[4, 5, 2, 25]',
  '[5,25,25,-1]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-next-greater-element',
  '[13, 7, 6, 12]',
  '[-1,12,12,-1]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-next-greater-element',
  '[1, 2, 3, 4]',
  '[2,3,4,-1]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Binary Search Trees (BST) (topic-bst-search)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-bst-search',
  'region-trees',
  'binary-search-tree',
  'Binary Search Trees (BST)',
  'Ordered Hierarchies & Logarithmic Searches',
  'trees',
  1,
  140,
  'GitFork',
  'Intermediate',
  'Master the BST invariant (Left < Node < Right), searching, insertion, and balancing concepts.',
  ARRAY['BST Invariant Definition', 'Search, Insertion & Deletion Mechanics', 'Balanced Trees vs Degenerate Trees', 'Validating BST Subtree Bounds (min, max)', 'Kth Smallest Element in BST']::text[],
  'tree',
  '{"whatIsIt":"A Binary Search Tree (BST) is a rooted binary tree data structure with the key property: for every node, all values in its left subtree are strictly smaller than its key, and all values in its right subtree are strictly greater than its key.","whyItMatters":"It allows dynamic sets with fast O(log n) lookups, insertions, deletions, minimum/maximum queries, and range searches without needing contiguous arrays.","intuition":"It combines the fast O(log n) search of a sorted array with the fast O(1) pointer-based insertion flexibility of a linked list.","stepByStep":["1. Start at the root node.","2. If target equals current node, search is complete!","3. If target < current node, move to left child.","4. If target > current node, move to right child.","5. If you reach null, target does not exist in the BST."],"pseudocode":"function searchBST(root, val) {\n  if (!root || root.val === val) return root;\n  if (val < root.val) return searchBST(root.left, val);\n  return searchBST(root.right, val);\n}","complexity":{"timeBest":"O(1)","timeAverage":"O(log n) balanced tree","timeWorst":"O(n) skewed degenerate tree","space":"O(h) auxiliary call stack space","explanation":"Operations take O(h) time where h is the tree height. In balanced trees, h = log2(n)."},"commonMistakes":["Assuming a tree is a BST just because each node is greater than its immediate left child and smaller than its immediate right child (must hold for ALL descendants in subtrees!).","Forgetting that inserting sorted data into a naive BST creates a degenerate linked list of O(n) height."],"edgeCases":["Empty tree (null root)","Single node tree","Searching for min or max element"],"realWorldApplications":["Database indexing engines (B+ trees and AVL/Red-Black implementations).","File systems (ext4, NTFS directory indexing).","Symbol tables in compilers."],"whenToUse":["Maintaining sorted dynamic collections with frequent inserts, deletes, and range queries."],"whenNotToUse":["When you only need exact key-value lookup and don''t need ordering (use Hash Map for O(1))."],"relatedAlgorithms":["AVL Trees","Red-Black Trees","Binary Search"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bst-1',
  'topic-bst-search',
  'What is the worst-case search time in an unbalanced (skewed) Binary Search Tree with n elements?',
  NULL,
  'Consider inserting sorted numbers 1, 2, 3, 4, 5 into an empty BST.',
  '[{"id":"a","text":"O(n)","isCorrect":true,"explanation":"If elements are inserted in sorted order (1, 2, 3, 4, 5), the tree degenerates into a singly linked list with height n."},{"id":"b","text":"O(log n)","isCorrect":false,"explanation":"O(log n) is only guaranteed if the tree remains balanced (like AVL or Red-Black trees)."},{"id":"c","text":"O(1)","isCorrect":false,"explanation":"Constant time lookup is only for hash tables."},{"id":"d","text":"O(n log n)","isCorrect":false,"explanation":"Search never exceeds O(n)."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bst-2',
  'topic-bst-search',
  'How do you correctly validate whether a binary tree is a valid Binary Search Tree?',
  NULL,
  'Subtree constraints must propagate from ancestor nodes.',
  '[{"id":"a","text":"Check that every node''s value is strictly between a valid lower bound min and upper bound max propagated recursively","isCorrect":true,"explanation":"Checking only immediate children is insufficient; every left descendant must be less than all its ancestors."},{"id":"b","text":"Check that left.val < root.val < right.val for each node independently","isCorrect":false,"explanation":"Fails if a right grandchild is smaller than root."},{"id":"c","text":"Check that the tree has an even number of leaves","isCorrect":false,"explanation":"Irrelevant."},{"id":"d","text":"Verify that height is log2(n)","isCorrect":false,"explanation":"A valid BST does not have to be balanced."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bst-3',
  'topic-bst-search',
  'What is the time complexity to find the MINIMUM element in a valid BST of height h?',
  NULL,
  'Traverse left pointers until left is null.',
  '[{"id":"a","text":"O(h)","isCorrect":true,"explanation":"Follow the left child pointer repeatedly until reaching the leftmost node."},{"id":"b","text":"O(1)","isCorrect":false,"explanation":"Requires traversing down the left spine."},{"id":"c","text":"O(n log n)","isCorrect":false,"explanation":"Never exceeds height h."},{"id":"d","text":"O(n^2)","isCorrect":false,"explanation":"Traversal is directional."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bst-4',
  'topic-bst-search',
  'Which self-balancing binary search tree uses node colors (red and black) to guarantee O(log n) height?',
  NULL,
  'Used inside C++ std::map and Java TreeMap.',
  '[{"id":"a","text":"Red-Black Tree","isCorrect":true,"explanation":"Red-Black trees use rotation and color invariants to guarantee that no path is more than twice as long as any other path."},{"id":"b","text":"Splay Tree","isCorrect":false,"explanation":"Splay trees adjust on access without color bits."},{"id":"c","text":"Trie","isCorrect":false,"explanation":"Trie is a prefix tree for strings."},{"id":"d","text":"Min-Heap","isCorrect":false,"explanation":"Heaps do not enforce left < root < right."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-search-bst',
  'topic-bst-search',
  'Search in a Binary Search Tree',
  'Easy',
  'You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node''s value equals val and return the subtree rooted with that node. If such a node does not exist, return null.',
  ARRAY['The number of nodes in the tree is in the range [1, 5000].']::text[],
  '[{"input":"root = [4,2,7,1,3], val = 2","output":"[2,1,3]","explanation":"Subtree rooted at node 2."}]'::jsonb,
  '{"javascript":"function searchBST(root, val) {\n  // TODO: Return the node where node.val === val, or null if not found\n  \n}","python":"def searchBST(root, val: int):\n    # TODO: Return node where node.val == val, or None\n    pass","java":"class Solution {\n    public TreeNode searchBST(TreeNode root, int val) {\n        // TODO: Return node where node.val == val\n        return null;\n    }\n}","cpp":"class Solution {\npublic:\n    TreeNode* searchBST(TreeNode* root, int val) {\n        // TODO: Return node where node.val == val\n        return nullptr;\n    }\n};"}'::jsonb,
  'searchBST',
  '{"javascript":"function searchBST(root, val) {\n  let curr = root;\n  while (curr && curr.val !== val) {\n    curr = val < curr.val ? curr.left : curr.right;\n  }\n  return curr;\n}","python":"def searchBST(root, val):\n    curr = root\n    while curr and curr.val != val:\n        curr = curr.left if val < curr.val else curr.right\n    return curr","java":"class Solution { public TreeNode searchBST(TreeNode root, int val) { while(root != null && root.val != val) root = val < root.val ? root.left : root.right; return root; } }","cpp":"TreeNode* searchBST(TreeNode* root, int val) { while(root && root->val != val) root = val < root->val ? root->left : root->right; return root; }","timeComplexity":"O(h)","spaceComplexity":"O(1) iterative","explanation":"Iterative BST traversal eliminates recursive stack memory."}'::jsonb,
  ARRAY['Compare val with root.val and branch left or right.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-search-bst',
  '{ val: 4, left: { val: 2, left: { val: 1 }, right: { val: 3 } }, right: { val: 7 } }, 2',
  '2',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-search-bst',
  '{ val: 4, left: { val: 2 }, right: { val: 7 } }, 5',
  'null',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Tree Traversals (Inorder, Preorder, Postorder & Level Order) (topic-tree-traversals)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-tree-traversals',
  'region-trees',
  'tree-traversal-strategies',
  'Tree Traversals (Inorder, Preorder, Postorder & Level Order)',
  'Depth-First & Breadth-First Systematic Visits',
  'trees',
  2,
  130,
  'Network',
  'Intermediate',
  'Master the four core tree traversals: Preorder, Inorder, Postorder (DFS) and Level-Order (BFS with Queue).',
  ARRAY['Preorder Traversal (Root, Left, Right)', 'Inorder Traversal (Left, Root, Right)', 'Postorder Traversal (Left, Right, Root)', 'Level-Order Traversal (BFS with FIFO Queue)', 'Iterative Traversal using Explicit Stack']::text[],
  'tree',
  '{"whatIsIt":"Tree traversal is the process of visiting every node in a tree data structure exactly once in a deterministic sequence.","whyItMatters":"Compilers use preorder for expression trees, inorder for sorted BST extraction, and postorder for bottom-up evaluations like deleting nodes or computing subtree sizes.","intuition":"Think of exploring a hierarchical company org chart: preorder announces the manager before subordinates; postorder tallies department reports from junior staff up to the executive.","stepByStep":["1. Inorder: Traverse left subtree, visit root node, traverse right subtree.","2. Preorder: Visit root node, traverse left subtree, traverse right subtree.","3. Postorder: Traverse left subtree, traverse right subtree, visit root node.","4. Level-Order: Initialize queue with root; while queue not empty, dequeue node, record value, enqueue children."],"pseudocode":"function inorder(node, res = []) {\n  if (!node) return;\n  inorder(node.left, res);\n  res.push(node.val);\n  inorder(node.right, res);\n  return res;\n}","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(h) for DFS call stack, O(w) for BFS queue where w is max tree width","explanation":"Visits every node exactly once."},"commonMistakes":["Confusing the order of root visit between Preorder (first) and Postorder (last).","Using a stack instead of a queue for Level-Order traversal."],"edgeCases":["Empty tree (null root)","Single node tree","Degenerate stick tree"],"realWorldApplications":["DOM rendering and tree serialization (React fiber reconciler).","Expression parsing in arithmetic calculators.","File directory space calculation (post-order folder size summation)."],"whenToUse":["Tree serialization, printing hierarchical outlines, bottom-up tree DP."],"whenNotToUse":["Non-tree cyclic graphs without visited sets."],"relatedAlgorithms":["Breadth-First Search","Depth-First Search","Morris Traversal"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-trav-1',
  'topic-tree-traversals',
  'In which traversal is the ROOT node visited FIRST before its subtrees?',
  NULL,
  '"Pre" means before.',
  '[{"id":"a","text":"Preorder (Root, Left, Right)","isCorrect":true,"explanation":"Preorder visits the root immediately before recursing down the left and right subtrees."},{"id":"b","text":"Inorder (Left, Root, Right)","isCorrect":false,"explanation":"Inorder visits left subtree before root."},{"id":"c","text":"Postorder (Left, Right, Root)","isCorrect":false,"explanation":"Postorder visits root last."},{"id":"d","text":"Level order bottom-up","isCorrect":false,"explanation":"Visits leaves first."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-trav-2',
  'topic-tree-traversals',
  'What data structure is used to implement Level-Order (breadth-first) tree traversal iteratively?',
  NULL,
  'First In, First Out.',
  '[{"id":"a","text":"FIFO Queue","isCorrect":true,"explanation":"A queue ensures that nodes at level k are processed completely before nodes at level k + 1."},{"id":"b","text":"LIFO Stack","isCorrect":false,"explanation":"A stack produces depth-first search, not level-order."},{"id":"c","text":"Priority Queue","isCorrect":false,"explanation":"Orders by priority value, not tree level."},{"id":"d","text":"Hash Set","isCorrect":false,"explanation":"Hash set does not maintain level order."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-trav-3',
  'topic-tree-traversals',
  'Which traversal is ideal for safely deleting a binary tree from memory in C/C++ without dangling pointers?',
  NULL,
  'Delete children before deleting parent.',
  '[{"id":"a","text":"Postorder Traversal","isCorrect":true,"explanation":"In postorder, children are freed before the parent node is deleted, avoiding dereferencing freed memory."},{"id":"b","text":"Preorder Traversal","isCorrect":false,"explanation":"Deleting the parent first loses pointers to its children."},{"id":"c","text":"Inorder Traversal","isCorrect":false,"explanation":"Deleting parent before right child causes memory leaks."},{"id":"d","text":"Binary Search","isCorrect":false,"explanation":"Not a traversal."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-trav-4',
  'topic-tree-traversals',
  'Can a unique binary tree be reconstructed from Preorder and Inorder traversal sequences (assuming unique values)?',
  NULL,
  'Preorder tells you WHO is root; Inorder tells you WHERE children lie.',
  '[{"id":"a","text":"Yes, Preorder gives the root and Inorder splits into left and right subtrees","isCorrect":true,"explanation":"Preorder[0] is root. Finding that value in Inorder separates elements belonging to left and right subtrees."},{"id":"b","text":"No, tree reconstruction is mathematically impossible","isCorrect":false,"explanation":"It is a classic LeetCode Medium problem."},{"id":"c","text":"Only if the tree is complete","isCorrect":false,"explanation":"Works for any binary tree with unique keys."},{"id":"d","text":"Only if the tree is a BST","isCorrect":false,"explanation":"Works for general binary trees."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-inorder-traversal',
  'topic-tree-traversals',
  'Binary Tree Inorder Traversal',
  'Easy',
  'Given the root of a binary tree, return the inorder traversal of its nodes'' values as an array.',
  ARRAY['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100']::text[],
  '[{"input":"root = [1,null,2,3]","output":"[1,3,2]","explanation":"Inorder visits left, root, right."}]'::jsonb,
  '{"javascript":"function inorderTraversal(root) {\n  // TODO: Return inorder traversal array\n  \n}","python":"def inorderTraversal(root) -> list[int]:\n    # TODO: Return inorder traversal list\n    pass","java":"class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // TODO: Return inorder traversal list\n        return new ArrayList<>();\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // TODO: Return inorder traversal vector\n        return {};\n    }\n};"}'::jsonb,
  'inorderTraversal',
  '{"javascript":"function inorderTraversal(root) {\n  let res = [];\n  function dfs(node) {\n    if (!node) return;\n    dfs(node.left);\n    res.push(node.val);\n    dfs(node.right);\n  }\n  dfs(root);\n  return res;\n}","python":"def inorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node: return\n        dfs(node.left)\n        res.append(node.val)\n        dfs(node.right)\n    dfs(root)\n    return res","java":"class Solution { public List<Integer> inorderTraversal(TreeNode root) { List<Integer> r = new ArrayList<>(); dfs(root, r); return r; } void dfs(TreeNode n, List<Integer> r){ if(n==null) return; dfs(n.left, r); r.add(n.val); dfs(n.right, r); } }","cpp":"vector<int> inorderTraversal(TreeNode* root) { vector<int> r; dfs(root, r); return r; } void dfs(TreeNode* n, vector<int>& r){ if(!n) return; dfs(n->left, r); r.push_back(n->val); dfs(n->right, r); }","timeComplexity":"O(n)","spaceComplexity":"O(h)","explanation":"Standard recursive DFS in-order traversal."}'::jsonb,
  ARRAY['Traverse left child, push current node value, traverse right child.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-inorder-traversal',
  '{ val: 1, right: { val: 2, left: { val: 3 } } }',
  '[1,3,2]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-inorder-traversal',
  'null',
  '[]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-inorder-traversal',
  '{ val: 1 }',
  '[1]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Breadth-First Search (BFS) & Shortest Paths (topic-graph-bfs)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-graph-bfs',
  'region-graphs',
  'graph-breadth-first-search',
  'Breadth-First Search (BFS) & Shortest Paths',
  'Level-by-Level Graph Exploration & Unweighted Shortest Path',
  'graphs',
  1,
  140,
  'Network',
  'Intermediate',
  'Master Breadth-First Search using queues, visited tracking, shortest path discovery in unweighted graphs, and multi-source BFS on 2D grids.',
  ARRAY['Adjacency List vs Adjacency Matrix', 'FIFO Queue Level-Order Traversal', 'Visited Tracking to Prevent Infinite Cycles', 'Shortest Path in Unweighted Graphs', 'Multi-Source BFS & Grid Traversal (Number of Islands)']::text[],
  'graph',
  '{"whatIsIt":"Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a source node and explores all neighbor nodes at the present depth level before moving on to the nodes at the next depth level.","whyItMatters":"BFS guarantees finding the shortest path (minimum number of edges) between two vertices in an unweighted graph, making it fundamental for networking, GPS routing, and social networks (degrees of separation).","intuition":"Think of ripples expanding outward from a pebble dropped in a pond: each ripple represents a distance of k edges from the center.","stepByStep":["1. Build adjacency list representation from edges.","2. Initialize a FIFO queue with the source vertex.","3. Add source vertex to visited set.","4. While queue is not empty: dequeue current node, process neighbors, and enqueue unvisited neighbors with visited marker."],"pseudocode":"let queue = [startNode];\nlet visited = new Set([startNode]);\nwhile (queue.length > 0) {\n  let curr = queue.shift();\n  for (let neighbor of graph[curr]) {\n    if (!visited.has(neighbor)) {\n      visited.add(neighbor);\n      queue.push(neighbor);\n    }\n  }\n}","complexity":{"timeBest":"O(V + E)","timeAverage":"O(V + E)","timeWorst":"O(V + E)","space":"O(V) queue and visited set memory","explanation":"Every vertex enters queue once; every edge is explored twice in an undirected graph."},"commonMistakes":["Marking nodes as visited when dequeuing instead of when enqueuing, causing duplicate nodes to enter the queue exponentially.","Using an adjacency matrix for sparse graphs, wasting O(V^2) memory and traversal time."],"edgeCases":["Disconnected components","Self-loops and multi-edges","Graph with 0 edges"],"realWorldApplications":["LinkedIn \"Degrees of Connection\" (1st, 2nd, 3rd degree connections).","Web crawlers discovering links level-by-level.","Peer-to-peer torrent peer discovery."],"whenToUse":["Shortest path in unweighted graphs, finding all connected nodes at distance k."],"whenNotToUse":["Weighted graphs (use Dijkstra) or memory-constrained deep search (use DFS)."],"relatedAlgorithms":["Depth-First Search","Dijkstra","Bidirectional BFS"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gbfs-1',
  'topic-graph-bfs',
  'What is the time complexity of Breadth-First Search using an adjacency list on a graph with V vertices and E edges?',
  NULL,
  'Every vertex enters queue once; every edge is inspected once.',
  '[{"id":"a","text":"O(V + E)","isCorrect":true,"explanation":"Each vertex is visited once and each edge is traversed once (or twice in undirected graphs)."},{"id":"b","text":"O(V * E)","isCorrect":false,"explanation":"Only true if using inefficient search per vertex."},{"id":"c","text":"O(V^2)","isCorrect":false,"explanation":"O(V^2) is the complexity when using an adjacency matrix, not an adjacency list."},{"id":"d","text":"O(log V)","isCorrect":false,"explanation":"Graph traversal must touch all reachable vertices."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gbfs-2',
  'topic-graph-bfs',
  'When should a node be added to the `visited` set in BFS?',
  NULL,
  'Prevent duplicates from entering the queue in the first place.',
  '[{"id":"a","text":"Immediately when it is enqueued into the queue","isCorrect":true,"explanation":"Marking visited upon enqueue prevents other paths from adding duplicate copies of the same node into the queue."},{"id":"b","text":"When it is dequeued and processed","isCorrect":false,"explanation":"Waiting until dequeue allows multiple neighbors to enqueue the same node redundantly."},{"id":"c","text":"Only when the target node is found","isCorrect":false,"explanation":"Would cause infinite cycles on cyclic graphs."},{"id":"d","text":"Never, graphs do not need visited tracking","isCorrect":false,"explanation":"Without visited tracking, cyclic graphs cause infinite loops."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gbfs-3',
  'topic-graph-bfs',
  'Can BFS find the shortest path in a graph with unequal positive edge weights?',
  NULL,
  'Does fewer hops always mean less total weight?',
  '[{"id":"a","text":"No, BFS assumes all edges have equal weight; use Dijkstra''s algorithm instead","isCorrect":true,"explanation":"A path with more edges but smaller weights could be shorter than a path with fewer heavy edges."},{"id":"b","text":"Yes, BFS always finds the shortest path","isCorrect":false,"explanation":"Only true for unweighted or uniform-weight graphs."},{"id":"c","text":"Only if weights are integers","isCorrect":false,"explanation":"Still requires Dijkstra or 0-1 BFS."},{"id":"d","text":"Only in directed graphs","isCorrect":false,"explanation":"Weights break BFS optimality in both directed and undirected graphs."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gbfs-4',
  'topic-graph-bfs',
  'In a 2D grid of size R x C, what is the maximum number of vertices in its graph representation?',
  NULL,
  'Every cell in the matrix is a vertex.',
  '[{"id":"a","text":"R * C vertices","isCorrect":true,"explanation":"Each cell (r, c) represents a distinct vertex with up to 4 orthogonal neighbor edges."},{"id":"b","text":"R + C vertices","isCorrect":false,"explanation":"Multiplication gives the total number of cells."},{"id":"c","text":"4 * (R + C)","isCorrect":false,"explanation":"That is boundary perimeter."},{"id":"d","text":"2^(R * C)","isCorrect":false,"explanation":"Cells are linear in grid dimensions."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-num-islands',
  'topic-graph-bfs',
  'Number of Islands (Grid BFS/DFS)',
  'Medium',
  'Given an m x n 2D binary grid grid which represents a map of ''1''s (land) and ''0''s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
  ARRAY['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is ''0'' or ''1''']::text[],
  '[{"input":"grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]","output":"2","explanation":"Two distinct islands."}]'::jsonb,
  '{"javascript":"function numIslands(grid) {\n  // TODO: Count connected components of \"1\"s using BFS or DFS\n  \n}","python":"def numIslands(grid: list[list[str]]) -> int:\n    # TODO: Count connected components of \"1\"s\n    pass","java":"class Solution {\n    public int numIslands(char[][] grid) {\n        // TODO: Count islands\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // TODO: Count islands\n        return 0;\n    }\n};"}'::jsonb,
  'numIslands',
  '{"javascript":"function numIslands(grid) {\n  if (!grid || !grid.length) return 0;\n  let count = 0;\n  let rows = grid.length, cols = grid[0].length;\n  function sink(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== \"1\") return;\n    grid[r][c] = \"0\";\n    sink(r + 1, c);\n    sink(r - 1, c);\n    sink(r, c + 1);\n    sink(r, c - 1);\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === \"1\") {\n        count++;\n        sink(r, c);\n      }\n    }\n  }\n  return count;\n}","python":"def numIslands(grid):\n    if not grid: return 0\n    rows, cols = len(grid), len(grid[0])\n    count = 0\n    def sink(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != \"1\": return\n        grid[r][c] = \"0\"\n        sink(r+1, c); sink(r-1, c); sink(r, c+1); sink(r, c-1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == \"1\":\n                count += 1\n                sink(r, c)\n    return count","java":"class Solution { public int numIslands(char[][] grid) { int cnt=0; for(int r=0; r<grid.length; r++){ for(int c=0; c<grid[0].length; c++){ if(grid[r][c]==''1''){ cnt++; sink(grid, r, c); } } } return cnt; } void sink(char[][] g, int r, int c){ if(r<0||c<0||r>=g.length||c>=g[0].length||g[r][c]!=''1'') return; g[r][c]=''0''; sink(g,r+1,c); sink(g,r-1,c); sink(g,r,c+1); sink(g,r,c-1); } }","cpp":"int numIslands(vector<vector<char>>& grid) { int cnt=0; int R=grid.size(), C=grid[0].size(); function<void(int,int)> sink = [&](int r, int c){ if(r<0||c<0||r>=R||c>=C||grid[r][c]!=''1'') return; grid[r][c]=''0''; sink(r+1,c); sink(r-1,c); sink(r,c+1); sink(r,c-1); }; for(int r=0; r<R; r++) for(int c=0; c<C; c++) if(grid[r][c]==''1''){ cnt++; sink(r,c); } return cnt; }","timeComplexity":"O(R * C)","spaceComplexity":"O(R * C) recursion depth","explanation":"Visits every matrix cell once, flood-filling connected land cells to zero."}'::jsonb,
  ARRAY['Iterate through each cell. When you find "1", increment count and sink the island by turning all connected "1"s into "0"s.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-num-islands',
  '[["1","1","0"],["1","1","0"],["0","0","1"]]',
  '2',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-num-islands',
  '[["1","1","1"],["0","1","0"],["1","1","1"]]',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Dijkstra's Shortest Path Algorithm (topic-dijkstra)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-dijkstra',
  'region-graphs',
  'dijkstra-shortest-path',
  'Dijkstra''s Shortest Path Algorithm',
  'Greedy Edge Relaxation & Non-Negative Weights',
  'graphs',
  2,
  160,
  'Navigation',
  'Advanced',
  'Master Dijkstra''s algorithm for finding shortest paths from a single source vertex to all other vertices in graphs with non-negative edge weights.',
  ARRAY['Weighted Graph Invariant', 'Edge Relaxation: dist[v] = min(dist[v], dist[u] + weight)', 'Priority Queue Min-Heap Optimization O((V + E) log V)', 'Why Negative Weights Break Dijkstra', 'Bellman-Ford & Floyd-Warshall Comparisons']::text[],
  'graph',
  '{"whatIsIt":"Dijkstra''s algorithm finds the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights using a greedy min-heap priority queue.","whyItMatters":"It powers real-world GPS road navigation (Google Maps, Waze), Internet routing protocols (OSPF, IS-IS), and flight travel itinerary optimizers.","intuition":"Think of water spreading across pipes of different lengths: the water will reach each junction along the quickest pipe path first. Once a junction is reached, its shortest arrival time is locked.","stepByStep":["1. Initialize dist table with dist[source] = 0 and all other dist[v] = Infinity.","2. Insert (0, source) into a Min-Priority Queue.","3. While priority queue is not empty: pop vertex u with minimum distance.","4. For each neighbor v with edge weight w: if dist[u] + w < dist[v], update dist[v] = dist[u] + w and push (dist[v], v) into PQ."],"pseudocode":"let dist = { [source]: 0 };\nlet pq = new MinPriorityQueue();\npq.enqueue(source, 0);\nwhile (!pq.isEmpty()) {\n  let { element: u, priority: d } = pq.dequeue();\n  if (d > dist[u]) continue;\n  for (let [v, weight] of adj[u]) {\n    if (dist[u] + weight < dist[v]) {\n      dist[v] = dist[u] + weight;\n      pq.enqueue(v, dist[v]);\n    }\n  }\n}","complexity":{"timeBest":"O((V + E) log V)","timeAverage":"O((V + E) log V)","timeWorst":"O((V + E) log V) with Min-Heap","space":"O(V + E) adjacency and priority queue memory","explanation":"Each vertex is popped from the PQ once; each edge relaxes and inserts into the PQ in log V time."},"commonMistakes":["Using Dijkstra on graphs with negative edge weights! A negative edge can retroactively invalidate greedy choices.","Forgetting to skip stale priority queue entries with `if (d > dist[u]) continue`."],"edgeCases":["Disconnected target vertex (dist remains Infinity)","0-weight edge cycles","Single vertex graph"],"realWorldApplications":["GPS navigation turn-by-turn routing (OSRM).","IP packet routing protocols (OSPF Open Shortest Path First).","Telecommunications fiber-optic latency path minimization."],"whenToUse":["Single-source shortest path on directed/undirected graphs with non-negative edge weights."],"whenNotToUse":["Graphs with negative edge weights (use Bellman-Ford) or unweighted graphs (use BFS for O(V + E))."],"relatedAlgorithms":["Bellman-Ford","Floyd-Warshall","A* Search Algorithm"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dijk-1',
  'topic-dijkstra',
  'Why does Dijkstra''s algorithm FAIL on graphs with negative edge weights?',
  NULL,
  'Dijkstra marks a node''s distance as final once popped from the priority queue.',
  '[{"id":"a","text":"The greedy assumption that a visited node''s shortest distance is permanently finalized is violated by negative weights","isCorrect":true,"explanation":"Dijkstra assumes paths only grow in weight. A negative edge could later offer a shorter route through a previously closed vertex."},{"id":"b","text":"Because priority queues cannot hold negative numbers","isCorrect":false,"explanation":"Min-heaps store negative numbers fine."},{"id":"c","text":"Because negative weights crash the CPU","isCorrect":false,"explanation":"It is a mathematical logic failure, not a hardware error."},{"id":"d","text":"Because vertices must have positive IDs","isCorrect":false,"explanation":"Vertex labels are unrelated to edge weights."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dijk-2',
  'topic-dijkstra',
  'What is the runtime of Dijkstra''s algorithm when implemented with a binary min-heap priority queue?',
  NULL,
  'Heap insertion takes log(V) for up to E edges.',
  '[{"id":"a","text":"O((V + E) log V)","isCorrect":true,"explanation":"There are at most V extractions and E decrease-key/insert operations in a binary heap of size V."},{"id":"b","text":"O(V^3)","isCorrect":false,"explanation":"O(V^3) is Floyd-Warshall."},{"id":"c","text":"O(V * E)","isCorrect":false,"explanation":"O(V * E) is Bellman-Ford."},{"id":"d","text":"O(V + E)","isCorrect":false,"explanation":"O(V + E) is BFS on unweighted graphs."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dijk-3',
  'topic-dijkstra',
  'What is "edge relaxation" in shortest path algorithms?',
  NULL,
  'Testing if taking the edge u -> v gives a better total distance.',
  '[{"id":"a","text":"Updating `dist[v] = min(dist[v], dist[u] + weight(u, v))`","isCorrect":true,"explanation":"Relaxation tests whether going through u provides a strictly shorter path to v than previously recorded."},{"id":"b","text":"Deleting heavy edges from the graph","isCorrect":false,"explanation":"Edges are never deleted."},{"id":"c","text":"Setting edge weights to zero","isCorrect":false,"explanation":"Weights are immutable."},{"id":"d","text":"Reversing directed edges","isCorrect":false,"explanation":"Directions are preserved."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dijk-4',
  'topic-dijkstra',
  'Which algorithm finds all-pairs shortest paths in O(V^3) time using dynamic programming?',
  NULL,
  '3 nested loops: for k, for i, for j.',
  '[{"id":"a","text":"Floyd-Warshall Algorithm","isCorrect":true,"explanation":"Floyd-Warshall uses three nested loops over V to find shortest paths between all pairs of vertices."},{"id":"b","text":"Dijkstra''s Algorithm","isCorrect":false,"explanation":"Dijkstra is single-source."},{"id":"c","text":"Kruskal''s Algorithm","isCorrect":false,"explanation":"Kruskal finds Minimum Spanning Trees."},{"id":"d","text":"Kahn''s Algorithm","isCorrect":false,"explanation":"Kahn is for topological sorting."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-dijkstra-shortest',
  'topic-dijkstra',
  'Single-Source Shortest Path Distance',
  'Medium',
  'Given n nodes (0 to n - 1), a list of directed weighted edges [u, v, w], and a source node src, return the shortest distance from src to a given target dst. If unreachable, return -1.',
  ARRAY['1 <= n <= 500', '0 <= edges.length <= 2000', '0 <= w <= 10^4']::text[],
  '[{"input":"n = 3, edges = [[0,1,10],[1,2,5],[0,2,20]], src = 0, dst = 2","output":"15","explanation":"Path 0 -> 1 -> 2 has distance 10 + 5 = 15, shorter than direct edge 20."}]'::jsonb,
  '{"javascript":"function dijkstraShortestPath(n, edges, src, dst) {\n  // TODO: Return shortest distance from src to dst using Dijkstra\n  \n}","python":"def dijkstraShortestPath(n: int, edges: list[list[int]], src: int, dst: int) -> int:\n    # TODO: Return shortest distance from src to dst\n    pass","java":"class Solution {\n    public int dijkstraShortestPath(int n, int[][] edges, int src, int dst) {\n        // TODO: Return shortest distance\n        return -1;\n    }\n}","cpp":"class Solution {\npublic:\n    int dijkstraShortestPath(int n, vector<vector<int>>& edges, int src, int dst) {\n        // TODO: Return shortest distance\n        return -1;\n    }\n};"}'::jsonb,
  'dijkstraShortestPath',
  '{"javascript":"function dijkstraShortestPath(n, edges, src, dst) {\n  let dist = new Array(n).fill(Infinity);\n  dist[src] = 0;\n  let visited = new Set();\n  let adj = Array.from({ length: n }, () => []);\n  for (let [u, v, w] of edges) adj[u].push([v, w]);\n  for (let i = 0; i < n; i++) {\n    let u = -1;\n    for (let j = 0; j < n; j++) {\n      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;\n    }\n    if (u === -1 || dist[u] === Infinity) break;\n    visited.add(u);\n    if (u === dst) return dist[dst];\n    for (let [v, w] of adj[u]) {\n      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n    }\n  }\n  return dist[dst] === Infinity ? -1 : dist[dst];\n}","python":"def dijkstraShortestPath(n, edges, src, dst):\n    import heapq\n    adj = [[] for _ in range(n)]\n    for u, v, w in edges: adj[u].append((v, w))\n    dist = [float(\"inf\")] * n\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        if u == dst: return d\n        for v, w in adj[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return -1 if dist[dst] == float(\"inf\") else dist[dst]","java":"class Solution { public int dijkstraShortestPath(int n, int[][] edges, int src, int dst) { int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE); dist[src] = 0; List<List<int[]>> adj = new ArrayList<>(); for(int i=0; i<n; i++) adj.add(new ArrayList<>()); for(int[] e: edges) adj.get(e[0]).add(new int[]{e[1], e[2]}); PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0])); pq.add(new int[]{0, src}); while(!pq.isEmpty()){ int[] top = pq.poll(); int d = top[0], u = top[1]; if(d > dist[u]) continue; if(u == dst) return d; for(int[] edge: adj.get(u)){ int v = edge[0], w = edge[1]; if(dist[u] + w < dist[v]){ dist[v] = dist[u] + w; pq.add(new int[]{dist[v], v}); } } } return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst]; } }","cpp":"int dijkstraShortestPath(int n, vector<vector<int>>& edges, int src, int dst) { vector<int> dist(n, 1e9); dist[src] = 0; vector<vector<pair<int,int>>> adj(n); for(auto& e: edges) adj[e[0]].push_back({e[1], e[2]}); priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq; pq.push({0, src}); while(!pq.empty()){ auto [d, u] = pq.top(); pq.pop(); if(d > dist[u]) continue; if(u == dst) return d; for(auto& [v, w]: adj[u]){ if(dist[u] + w < dist[v]){ dist[v] = dist[u] + w; pq.push({dist[v], v}); } } } return dist[dst] >= 1e9 ? -1 : dist[dst]; }","timeComplexity":"O((V + E) log V)","spaceComplexity":"O(V + E)","explanation":"Standard Dijkstra algorithm with priority queue relaxation."}'::jsonb,
  ARRAY['Use distance array initialized to Infinity, dist[src] = 0. Extract minimum distance node repeatedly.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-dijkstra-shortest',
  '3, [[0,1,10],[1,2,5],[0,2,20]], 0, 2',
  '15',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-dijkstra-shortest',
  '3, [[0,1,10]], 0, 2',
  '-1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-dijkstra-shortest',
  '2, [[0,1,7]], 0, 1',
  '7',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Recursion Mechanics & Call Stack (topic-recursion-mechanics)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-recursion-mechanics',
  'region-backtracking',
  'recursion-mechanics',
  'Recursion Mechanics & Call Stack',
  'Stack Frames, Base Cases & Recurrence Trees',
  'recursion',
  1,
  120,
  'GitBranch',
  'Beginner',
  'Demystify recursion: activation records on the call stack, choosing robust base cases, recurrence trees, and preventing stack overflow.',
  ARRAY['Call Stack & Stack Frames', 'Base Cases vs Recursive Cases', 'Visualizing Recursion Trees', 'Tail Call Optimization Concept', 'Call Stack Overflow Prevention']::text[],
  'tree',
  '{"whatIsIt":"Recursion solves problems by dividing them into smaller subproblems of identical structure. Every recursive function must contain at least one base case to terminate execution; otherwise, indefinite frame allocation causes a StackOverflowError.","whyItMatters":"Recursive thinking is the prerequisite for divide-and-conquer, tree and graph traversals, backtracking, and dynamic programming.","intuition":"Think of Russian nesting dolls (matryoshka): opening each doll reveals a smaller one until you reach the solid wooden doll at the center (the base case).","stepByStep":["1. Identify the smallest input where the answer is trivial (base case).","2. Identify the recurrence relation: how problem of size n relates to size n-1 or n/2.","3. Ensure every recursive branch makes strict forward progress toward the base case."],"pseudocode":"function solve(n) {\n  if (n <= 1) return 1; // Base Case\n  return n * solve(n - 1); // Recursive Step\n}","complexity":{"timeBest":"O(log n)","timeAverage":"O(n) to O(2^n)","timeWorst":"O(2^n)","space":"O(D) call stack depth","explanation":"Space is determined by maximum concurrent activation records living on the call stack."},"commonMistakes":["Missing base case leading to StackOverflowError.","Not returning the result of recursive child calls."],"edgeCases":["Negative input parameters","n = 0 or n = 1","Recursion depth exceeding 10,000 frames"],"realWorldApplications":["File system folder exploration and size aggregation.","JSON and HTML DOM parsers and compilers.","Fractal computer graphics generation."],"whenToUse":["Naturally hierarchical structures like trees, divide-and-conquer, and state space search."],"whenNotToUse":["Simple linear traversals where a standard while or for loop uses O(1) space."],"relatedAlgorithms":["Divide and Conquer","Depth-First Search","Dynamic Programming"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-1',
  'topic-recursion-mechanics',
  'What occurs if a recursive function lacks a valid base case or fails to reach it?',
  NULL,
  'Think about what data structure holds local function scopes.',
  '[{"id":"a","text":"Call stack overflows when allocated memory for stack frames is exhausted","isCorrect":true,"explanation":"Each call pushes an activation record onto the stack. Infinite recursion exhausts stack space."},{"id":"b","text":"The computer automatically converts the function into an iterative loop","isCorrect":false,"explanation":"No runtime automatically converts arbitrary unbounded recursion."},{"id":"c","text":"The program returns None or 0 silently","isCorrect":false,"explanation":"It throws a RecursionError / StackOverflowError."},{"id":"d","text":"The heap memory expands indefinitely until the CPU throttles","isCorrect":false,"explanation":"Call stack memory is exhausted, which is separate from heap allocation."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-2',
  'topic-recursion-mechanics',
  'In the recursive calculation of Fibonacci(N) without memoization, what is the time complexity?',
  NULL,
  'Each node branches into 2 recursive child calls.',
  '[{"id":"a","text":"O(2^N) exponential time due to duplicate subtrees","isCorrect":true,"explanation":"The recursion tree branches by 2 at each level, generating ~2^N operations."},{"id":"b","text":"O(N) linear time","isCorrect":false,"explanation":"Without memoization or iteration, redundant calls cause exponential explosion."},{"id":"c","text":"O(N^2) quadratic time","isCorrect":false,"explanation":"The depth is N and branching is 2, giving 2^N, not N^2."},{"id":"d","text":"O(log N) logarithmic time","isCorrect":false,"explanation":"Binary search is O(log N), not unmemoized Fibonacci."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-3',
  'topic-recursion-mechanics',
  'What represents the auxiliary space complexity of a recursive algorithm?',
  NULL,
  'Are finished stack frames kept or destroyed when returning?',
  '[{"id":"a","text":"The maximum depth of the call stack at any point during execution","isCorrect":true,"explanation":"Even if total calls are O(2^N), only the active path of depth D lives concurrently on the stack."},{"id":"b","text":"The total number of nodes in the entire recursion tree","isCorrect":false,"explanation":"Inactive completed stack frames are popped and reclaimed."},{"id":"c","text":"Always O(1)","isCorrect":false,"explanation":"Stack frames consume linear memory proportional to depth."},{"id":"d","text":"The size of the initial input array only","isCorrect":false,"explanation":"The call stack is auxiliary space."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-rec-4',
  'topic-recursion-mechanics',
  'What is tail recursion?',
  NULL,
  'Look at what happens after the recursive call finishes.',
  '[{"id":"a","text":"A recursive call where the function call is the very last operation performed before returning","isCorrect":true,"explanation":"In tail recursion, nothing happens after the call returns, enabling tail-call elimination in supporting languages."},{"id":"b","text":"A recursive function that processes elements from back to front","isCorrect":false,"explanation":"Tail recursion relates to the position of the call, not array indices."},{"id":"c","text":"A recursive call wrapped inside a try-catch block","isCorrect":false,"explanation":"Error handling is unrelated to tail recursion."},{"id":"d","text":"A recursive function with exactly two base cases","isCorrect":false,"explanation":"Number of base cases does not define tail recursion."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-factorial-recursion',
  'topic-recursion-mechanics',
  'Recursive Factorial',
  'Beginner',
  'Write a recursive function factorial(n) that returns n! for non-negative integers. Recall: 0! = 1, and n! = n * (n-1)!. Return -1 if n < 0.',
  ARRAY['0 <= n <= 12']::text[],
  '[{"input":"n = 5","output":"120","explanation":"5! = 5*4*3*2*1 = 120."},{"input":"n = 0","output":"1","explanation":"0! = 1 by definition."}]'::jsonb,
  '{"javascript":"function factorial(n) {\n  // TODO: Implement recursive factorial with base case\n  return 0;\n}","python":"def factorial(n: int) -> int:\n    # TODO: Implement recursive factorial with base case\n    pass","java":"class Solution {\n    public int factorial(int n) {\n        // TODO: Implement recursive factorial with base case\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int factorial(int n) {\n        // TODO: Implement recursive factorial with base case\n        return 0;\n    }\n};"}'::jsonb,
  'factorial',
  '{"javascript":"function factorial(n) {\n  if (n < 0) return -1;\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}","python":"def factorial(n: int) -> int:\n    if n < 0: return -1\n    if n <= 1: return 1\n    return n * factorial(n - 1)","java":"class Solution { public int factorial(int n) { if (n < 0) return -1; if (n <= 1) return 1; return n * factorial(n - 1); } }","cpp":"int factorial(int n) { if (n < 0) return -1; if (n <= 1) return 1; return n * factorial(n - 1); }","timeComplexity":"O(n)","spaceComplexity":"O(n) call stack","explanation":"Linear recursive descent terminating at base case n <= 1."}'::jsonb,
  ARRAY['Base case: if n <= 1 return 1.', 'Recursive case: return n * factorial(n - 1).']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-factorial-recursion',
  '5',
  '120',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-factorial-recursion',
  '0',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-factorial-recursion',
  '1',
  '1',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-factorial-recursion',
  '7',
  '5040',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Subsets & Combinations (topic-subsets-combinations)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-subsets-combinations',
  'region-backtracking',
  'subsets-combinations',
  'Subsets & Combinations',
  'Combinatorial State Space Trees & Power Sets',
  'recursion',
  2,
  160,
  'Layers',
  'Intermediate',
  'Master combinatorial backtracking: generating power sets, combinations of size k, and handling duplicate elements cleanly.',
  ARRAY['State Space Tree for Combinations', 'Choose, Explore, Un-choose Pattern', 'Subsets with Duplicates (Sort + Skip)', 'Combinations of Size K', 'Time & Space Complexity of Combinatorics']::text[],
  'tree',
  '{"whatIsIt":"Combinatorial backtracking constructs solutions element by element. At each step, we explore either including or excluding the current candidate, backtracking when reaching constraints or leaf nodes.","whyItMatters":"Forms the backbone of feature selection in machine learning, cryptographic permutation testing, and puzzle search.","intuition":"Imagine a branching path at every intersection: you try walking left; if that path leads to a cliff, you step back to the fork and try walking right.","stepByStep":["1. Maintain a path buffer representing current partial solution.","2. When base condition (e.g. len(path) == k) is met, snapshot a copy of path into results.","3. Loop through remaining candidates: path.push(cand) -> recurse(next) -> path.pop()."],"pseudocode":"function backtrack(start, path) {\n  result.push([...path]);\n  for (let i = start; i < nums.length; i++) {\n    path.push(nums[i]);\n    backtrack(i + 1, path);\n    path.pop();\n  }\n}","complexity":{"timeBest":"O(2^n * n)","timeAverage":"O(2^n * n)","timeWorst":"O(2^n * n)","space":"O(n) recursion stack and current path buffer","explanation":"For n elements, there are 2^n subsets; copying each takes O(n) work."},"commonMistakes":["Appending the path reference directly instead of a snapshot copy, leaving results filled with empty arrays.","Forgetting to pop the candidate during un-choose."],"edgeCases":["Empty input array","Array with duplicate elements","k larger than array length"],"realWorldApplications":["Feature selection in machine learning pipelines.","Portfolio asset allocation candidate generation.","Tournament group matchup scheduling."],"whenToUse":["Generating all subsets, combinations of size k, or partition configurations."],"whenNotToUse":["When you only need the count of subsets without generating them (use math or DP)."],"relatedAlgorithms":["Permutations","Subsets II","Combination Sum"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sub-1',
  'topic-subsets-combinations',
  'How many subsets exist for an array of N unique elements?',
  NULL,
  'Binary choice: in or out for each element.',
  '[{"id":"a","text":"2^N subsets (the power set)","isCorrect":true,"explanation":"Each element has 2 independent choices: either included or excluded, yielding 2 * 2 * ... * 2 = 2^N."},{"id":"b","text":"N! subsets","isCorrect":false,"explanation":"N! is the number of permutations, not subsets."},{"id":"c","text":"N * (N + 1) / 2 subsets","isCorrect":false,"explanation":"That is the number of contiguous subarrays, not arbitrary subsets."},{"id":"d","text":"2 * N subsets","isCorrect":false,"explanation":"Growth is exponential, not linear."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sub-2',
  'topic-subsets-combinations',
  'When generating combinations with duplicate elements in the input, how do you prevent duplicate combinations in the output?',
  NULL,
  'Group identical elements by sorting first.',
  '[{"id":"a","text":"Sort the array initially, and skip candidates when nums[i] == nums[i-1] for i > start","isCorrect":true,"explanation":"Sorting groups identical values; checking i > start ensures only the first identical element at this level is chosen."},{"id":"b","text":"Store all results in a linked list","isCorrect":false,"explanation":"Linked lists do not eliminate duplicates."},{"id":"c","text":"Only pick odd numbers","isCorrect":false,"explanation":"Arbitrary parity filtering discards valid solutions."},{"id":"d","text":"Stop recursion at depth 2","isCorrect":false,"explanation":"Depth limitation misses longer combinations."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sub-3',
  'topic-subsets-combinations',
  'Why do we copy the current path (e.g., `result.push([...path])`) instead of appending `path` directly in JS/Python?',
  NULL,
  'Reference vs value semantics.',
  '[{"id":"a","text":"Because path is modified in-place; appending a reference would leave all stored results referencing the same mutated array","isCorrect":true,"explanation":"Arrays are passed by reference. Failing to snapshot yields a list of empty arrays after backtrack completes."},{"id":"b","text":"Because lists cannot be added to other lists directly","isCorrect":false,"explanation":"Lists can hold nested lists, but mutating the inner list alters stored references."},{"id":"c","text":"To double the execution speed","isCorrect":false,"explanation":"Creating copies has a slight overhead, but is mandatory for correctness."},{"id":"d","text":"Because JavaScript requires all items in result to be strings","isCorrect":false,"explanation":"Objects or arrays can be stored, but copying is the necessity."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sub-4',
  'topic-subsets-combinations',
  'What is the time complexity of generating all permutations of N unique elements?',
  NULL,
  'How many permutations of N items exist?',
  '[{"id":"a","text":"O(N * N!)","isCorrect":true,"explanation":"There are N! distinct permutations, and copying each permutation of length N takes O(N) time."},{"id":"b","text":"O(2^N)","isCorrect":false,"explanation":"2^N is for subsets, while permutations grow as N!."},{"id":"c","text":"O(N^2)","isCorrect":false,"explanation":"Permutations scale factorially, not quadratically."},{"id":"d","text":"O(N log N)","isCorrect":false,"explanation":"N log N is typical for sorting, not exhaustive permutation generation."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-combine-k',
  'topic-subsets-combinations',
  'Combinations of Size K',
  'Intermediate',
  'Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n]. You may return the answer in any order.',
  ARRAY['1 <= n <= 20', '1 <= k <= n']::text[],
  '[{"input":"n = 4, k = 2","output":"[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]","explanation":"All 6 combinations of length 2 from [1, 4]."},{"input":"n = 1, k = 1","output":"[[1]]","explanation":"Single combination."}]'::jsonb,
  '{"javascript":"function combine(n, k) {\n  // TODO: Return all combinations of length k\n  return [];\n}","python":"def combine(n: int, k: int):\n    # TODO: Return all combinations of length k\n    return []","java":"class Solution {\n    public List<List<Integer>> combine(int n, int k) {\n        // TODO: Return combinations\n        return new ArrayList<>();\n    }\n}","cpp":"class Solution {\npublic:\n    vector<vector<int>> combine(int n, int k) {\n        // TODO: Return combinations\n        return {};\n    }\n};"}'::jsonb,
  'combine',
  '{"javascript":"function combine(n, k) {\n  let res = [];\n  function bt(start, path) {\n    if (path.length === k) { res.push([...path]); return; }\n    for (let i = start; i <= n - (k - path.length) + 1; i++) {\n      path.push(i);\n      bt(i + 1, path);\n      path.pop();\n    }\n  }\n  bt(1, []);\n  return res;\n}","python":"def combine(n: int, k: int):\n    res = []\n    def bt(start, path):\n        if len(path) == k:\n            res.append(list(path))\n            return\n        for i in range(start, n - (k - len(path)) + 2):\n            path.append(i)\n            bt(i + 1, path)\n            path.pop()\n    bt(1, [])\n    return res","java":"class Solution { public List<List<Integer>> combine(int n, int k) { List<List<Integer>> res = new ArrayList<>(); bt(1, new ArrayList<>(), n, k, res); return res; } private void bt(int start, List<Integer> path, int n, int k, List<List<Integer>> res) { if(path.size()==k){ res.add(new ArrayList<>(path)); return; } for(int i=start; i<=n-(k-path.size())+1; i++){ path.add(i); bt(i+1, path, n, k, res); path.remove(path.size()-1); } } }","cpp":"vector<vector<int>> combine(int n, int k) { vector<vector<int>> res; vector<int> path; auto bt = [&](auto& self, int start) -> void { if(path.size()==k){ res.push_back(path); return; } for(int i=start; i<=n-(k-(int)path.size())+1; i++){ path.push_back(i); self(self, i+1); path.pop_back(); } }; bt(bt, 1); return res; }","timeComplexity":"O(k * C(n, k))","spaceComplexity":"O(k) auxiliary buffer","explanation":"Generates exactly C(n, k) combinations with optimal pruning bounds."}'::jsonb,
  ARRAY['Base condition: if len(path) == k, snapshot path and return.', 'Prune loop when remaining items cannot fulfill k.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-combine-k',
  '4, 2',
  '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-combine-k',
  '1, 1',
  '[[1]]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-combine-k',
  '3, 3',
  '[[1,2,3]]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: N-Queens & Constraint Satisfaction (topic-nqueens-backtracking)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-nqueens-backtracking',
  'region-backtracking',
  'nqueens-backtracking',
  'N-Queens & Constraint Satisfaction',
  'Board Invariants, Diagonal Conflict Masks & Branch Pruning',
  'recursion',
  3,
  200,
  'Cpu',
  'Advanced',
  'Solve classic constraint satisfaction problems: N-Queens puzzle, Sudoku solvers, and Word Search on 2D matrices.',
  ARRAY['N-Queens Board Invariants', 'Diagonal Conflict Checking in O(1)', 'Sudoku Solver & Grid Constraints', 'Word Search on 2D Grid with Visited Masks', 'Branch Pruning Strategies']::text[],
  'general',
  '{"whatIsIt":"Constraint satisfaction problems place elements into a discrete search space such that all validation invariants are satisfied. Pruning eliminates non-viable sub-trees immediately before deeper recursive descent.","whyItMatters":"Applied across timetable scheduling, silicon circuit trace routing, and register allocation in compilers.","intuition":"Placing queens one row at a time: if a placement creates mutual attack with an earlier queen, abandon that branch immediately without testing further rows.","stepByStep":["1. Place queens row-by-row so row collisions are naturally impossible.","2. Track occupied columns, main diagonals (r - c), and anti-diagonals (r + c) using sets.","3. When row reaches n, a valid configuration has been found."],"pseudocode":"function backtrack(row) {\n  if (row === n) { count++; return; }\n  for (let c = 0; c < n; c++) {\n    if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;\n    cols.add(c); diag1.add(row - c); diag2.add(row + c);\n    backtrack(row + 1);\n    cols.delete(c); diag1.delete(row - c); diag2.delete(row + c);\n  }\n}","complexity":{"timeBest":"O(n!) with heavy pruning","timeAverage":"O(n!)","timeWorst":"O(n!)","space":"O(n) auxiliary sets and stack depth","explanation":"Only one queen per row, giving at most n choices in row 1, n-1 in row 2, and so on."},"commonMistakes":["Scanning the entire board on each check instead of using O(1) hash sets for diagonals.","Forgetting to remove coordinates from sets during backtrack step."],"edgeCases":["n = 1 (trivial solution)","n = 2 and n = 3 (no valid solutions exist)"],"realWorldApplications":["Automated university timetable class scheduling.","Silicon microchip automated routing without wire intersections.","Compiler register coloring under interference graphs."],"whenToUse":["Constraint satisfaction puzzles with strict mutual exclusion rules."],"whenNotToUse":["Unconstrained combinatorial generation where pruning is not applicable."],"relatedAlgorithms":["Sudoku Solver","Word Search","Hamiltonian Path"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nq-1',
  'topic-nqueens-backtracking',
  'How do you check diagonal conflicts in O(1) for a queen placed at row r and column c?',
  NULL,
  'What coordinate arithmetic is constant along 45-degree diagonal lines?',
  '[{"id":"a","text":"Track r - c for main diagonals and r + c for anti-diagonals in hash sets or boolean arrays","isCorrect":true,"explanation":"All cells on a main diagonal share identical (r - c) differences; all cells on an anti-diagonal share identical (r + c) sums."},{"id":"b","text":"Iterate over all previous squares on the entire board","isCorrect":false,"explanation":"Iterating over previous squares takes O(N) instead of O(1)."},{"id":"c","text":"Check if (r * c) is divisible by 2","isCorrect":false,"explanation":"Multiplication does not model diagonal lines."},{"id":"d","text":"Diagonal conflicts cannot be checked in O(1)","isCorrect":false,"explanation":"Coordinate sum/difference properties provide true O(1) checking."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nq-2',
  'topic-nqueens-backtracking',
  'For which value of N is there NO solution to the N-Queens problem?',
  NULL,
  'Try placing 2 queens on a 2x2 grid.',
  '[{"id":"a","text":"N = 2 and N = 3","isCorrect":true,"explanation":"For 2x2 and 3x3 boards, placing 2 or 3 queens without mutual attack is mathematically impossible."},{"id":"b","text":"N = 4","isCorrect":false,"explanation":"A 4x4 board has 2 distinct valid solutions."},{"id":"c","text":"N = 8","isCorrect":false,"explanation":"The classic 8-Queens problem has 92 distinct solutions."},{"id":"d","text":"N = 1","isCorrect":false,"explanation":"A 1x1 board trivially holds 1 queen."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nq-3',
  'topic-nqueens-backtracking',
  'In a 2D Word Search solver, why must we mark the visited cell before recursive expansion and unmark it upon return?',
  NULL,
  'Can the same character be used twice in one word? What about in other words?',
  '[{"id":"a","text":"To prevent reusing the same letter in the same word, while preserving it for alternative paths","isCorrect":true,"explanation":"A letter on the grid cannot be used more than once per word, but alternative paths starting elsewhere might need it."},{"id":"b","text":"To permanently erase searched letters from the grid","isCorrect":false,"explanation":"Letters must not be destroyed permanently."},{"id":"c","text":"To ensure garbage collection runs during search","isCorrect":false,"explanation":"Memory management is unrelated to visited state."},{"id":"d","text":"To convert the matrix into a directed acyclic graph","isCorrect":false,"explanation":"The grid remains a grid."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nq-4',
  'topic-nqueens-backtracking',
  'What is the most effective heuristic when choosing the next cell to fill in a Sudoku solver?',
  NULL,
  'Fail-first principle: branch where options are smallest.',
  '[{"id":"a","text":"Minimum Remaining Values (MRV): pick the empty cell with the fewest legal candidate numbers","isCorrect":true,"explanation":"MRV minimizes the branching factor immediately, failing fast and drastically pruning the search space."},{"id":"b","text":"Always pick the bottom-right cell first","isCorrect":false,"explanation":"Arbitrary position selection does not optimize branching."},{"id":"c","text":"Pick cells randomly with a uniform distribution","isCorrect":false,"explanation":"Random selection does not prune deterministically."},{"id":"d","text":"Fill all 9s first, then all 8s","isCorrect":false,"explanation":"Filling numbers sequentially without location constraints increases backtracking."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-total-nqueens',
  'topic-nqueens-backtracking',
  'N-Queens Valid Count',
  'Advanced',
  'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions to the n-queens puzzle.',
  ARRAY['1 <= n <= 9']::text[],
  '[{"input":"n = 4","output":"2","explanation":"There are two distinct solutions to the 4-queens puzzle."},{"input":"n = 1","output":"1","explanation":"One valid placement."}]'::jsonb,
  '{"javascript":"function totalNQueens(n) {\n  // TODO: Return count of distinct valid n-queens placements\n  return 0;\n}","python":"def totalNQueens(n: int) -> int:\n    # TODO: Return count of distinct valid n-queens placements\n    return 0","java":"class Solution {\n    public int totalNQueens(int n) {\n        // TODO: Return count of placements\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int totalNQueens(int n) {\n        // TODO: Return count of placements\n        return 0;\n    }\n};"}'::jsonb,
  'totalNQueens',
  '{"javascript":"function totalNQueens(n) {\n  let count = 0;\n  let cols = new Set(), d1 = new Set(), d2 = new Set();\n  function bt(r) {\n    if (r === n) { count++; return; }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;\n      cols.add(c); d1.add(r - c); d2.add(r + c);\n      bt(r + 1);\n      cols.delete(c); d1.delete(r - c); d2.delete(r + c);\n    }\n  }\n  bt(0);\n  return count;\n}","python":"def totalNQueens(n: int) -> int:\n    count = 0\n    cols, d1, d2 = set(), set(), set()\n    def bt(r):\n        nonlocal count\n        if r == n: count += 1; return\n        for c in range(n):\n            if c in cols or (r - c) in d1 or (r + c) in d2: continue\n            cols.add(c); d1.add(r - c); d2.add(r + c)\n            bt(r + 1)\n            cols.remove(c); d1.remove(r - c); d2.remove(r + c)\n    bt(0)\n    return count","java":"class Solution { private int count = 0; private Set<Integer> cols = new HashSet<>(), d1 = new HashSet<>(), d2 = new HashSet<>(); public int totalNQueens(int n) { bt(0, n); return count; } private void bt(int r, int n) { if(r==n){ count++; return; } for(int c=0; c<n; c++){ if(cols.contains(c)||d1.contains(r-c)||d2.contains(r+c)) continue; cols.add(c); d1.add(r-c); d2.add(r+c); bt(r+1, n); cols.remove(c); d1.remove(r-c); d2.remove(r+c); } } }","cpp":"int totalNQueens(int n) { int count = 0; unordered_set<int> cols, d1, d2; auto bt = [&](auto& self, int r) -> void { if(r==n){ count++; return; } for(int c=0; c<n; c++){ if(cols.count(c)||d1.count(r-c)||d2.count(r+c)) continue; cols.insert(c); d1.insert(r-c); d2.insert(r+c); self(self, r+1); cols.erase(c); d1.erase(r-c); d2.erase(r+c); } }; bt(bt, 0); return count; }","timeComplexity":"O(n!)","spaceComplexity":"O(n) auxiliary sets","explanation":"Row-by-row backtracking with O(1) hash sets for column and diagonal conflict checks."}'::jsonb,
  ARRAY['Place one queen per row.', 'Use sets for cols, diag1 (row - col), and diag2 (row + col) for O(1) validation.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-total-nqueens',
  '4',
  '2',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-total-nqueens',
  '1',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-total-nqueens',
  '2',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-total-nqueens',
  '5',
  '10',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Greedy Choice & Interval Scheduling (topic-greedy-foundations)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-greedy-foundations',
  'region-greedy',
  'greedy-foundations',
  'Greedy Choice & Interval Scheduling',
  'Earliest Deadline First & Exchange Arguments',
  'greedy',
  1,
  130,
  'Zap',
  'Beginner',
  'Master greedy choice property, exchange arguments, and the classic activity selection / interval scheduling problem.',
  ARRAY['Greedy Choice Property vs Dynamic Programming', 'Exchange Arguments & Correctness Proofs', 'Activity Selection / Interval Scheduling', 'Non-Overlapping Intervals', 'Meeting Rooms I & II']::text[],
  'array_sorting',
  '{"whatIsIt":"A greedy algorithm makes the locally optimal choice at each stage with the hope of finding a global optimum. For interval scheduling, sorting by finish time and picking the earliest ending compatible interval yields the maximum count.","whyItMatters":"Foundational for room booking systems, CPU process dispatching, and bandwidth bandwidth scheduling.","intuition":"If you want to watch the maximum number of movies in a theater, always pick the movie that finishes earliest, leaving you the most free time for remaining shows.","stepByStep":["1. Sort intervals ascending by end/finish time.","2. Select the first interval and record its end time.","3. For each subsequent interval, if its start time >= recorded end time, select it and update end time."],"pseudocode":"intervals.sort((a, b) => a[1] - b[1]);\nlet count = 1, lastEnd = intervals[0][1];\nfor (let i = 1; i < intervals.length; i++) {\n  if (intervals[i][0] >= lastEnd) {\n    count++;\n    lastEnd = intervals[i][1];\n  }\n}","complexity":{"timeBest":"O(n log n)","timeAverage":"O(n log n)","timeWorst":"O(n log n)","space":"O(1) auxiliary space beyond sorting","explanation":"Dominated by the time required to sort intervals."},"commonMistakes":["Sorting by start time instead of end time, which fails when long activities start early.","Sorting by shortest duration, which can create two overlaps instead of one."],"edgeCases":["Empty intervals array","Intervals with identical start and end times","All intervals overlapping"],"realWorldApplications":["Conference room scheduling software.","Operating system CPU batch task scheduling.","Satellite sensor communication window allocation."],"whenToUse":["Interval scheduling, activity selection, fractional packing."],"whenNotToUse":["0/1 Knapsack or arbitrary coin change where local choices do not yield global optimality."],"relatedAlgorithms":["Jump Game","Huffman Coding","Dijkstra"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gr-1',
  'topic-greedy-foundations',
  'Why does sorting intervals by earliest end time guarantee the maximum number of scheduled activities?',
  NULL,
  'Think about how much open schedule remains.',
  '[{"id":"a","text":"It leaves the maximum remaining time available for subsequent candidate activities","isCorrect":true,"explanation":"The greedy stays ahead proof confirms finishing earlier cannot eliminate more future opportunities than finishing later."},{"id":"b","text":"Because activities ending earlier always have the shortest duration","isCorrect":false,"explanation":"An activity starting at 0 and ending at 5 could be longer than one starting at 4 and ending at 6."},{"id":"c","text":"It eliminates the need to inspect start times","isCorrect":false,"explanation":"We must still check if candidate start >= last end."},{"id":"d","text":"It converts the interval graph into a complete bipartite graph","isCorrect":false,"explanation":"Graph classification is irrelevant here."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gr-2',
  'topic-greedy-foundations',
  'For which coin system does the standard greedy coin change algorithm FAIL to produce the minimum number of coins?',
  NULL,
  'Try amount = 6 with [1, 3, 4].',
  '[{"id":"a","text":"Denominations [1, 3, 4] for amount = 6","isCorrect":true,"explanation":"Greedy picks 4, 1, 1 (3 coins), whereas the optimal solution is 3 + 3 (2 coins)."},{"id":"b","text":"Standard US currency [1, 5, 10, 25] for any amount","isCorrect":false,"explanation":"Standard US coins are a canonical coin system where greedy is always optimal."},{"id":"c","text":"Denominations [1, 2, 4, 8, 16] (powers of 2)","isCorrect":false,"explanation":"Powers of 2 represent binary representation where greedy is optimal."},{"id":"d","text":"Denominations [1, 5, 10, 50, 100]","isCorrect":false,"explanation":"Greedy is optimal for this standard currency system."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gr-3',
  'topic-greedy-foundations',
  'In the Non-Overlapping Intervals problem (LeetCode 435), what is the relationship between max compatible intervals (K) and min intervals to remove (R) from total N?',
  NULL,
  'Removals = Total minus Kept.',
  '[{"id":"a","text":"R = N - K","isCorrect":true,"explanation":"Keeping the maximum non-overlapping set K directly minimizes removals R = N - K."},{"id":"b","text":"R = K / 2","isCorrect":false,"explanation":"There is no half-factor relationship."},{"id":"c","text":"R = N * K","isCorrect":false,"explanation":"Removal count is the difference, not product."},{"id":"d","text":"R = log(N - K)","isCorrect":false,"explanation":"Simple arithmetic difference applies."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-gr-4',
  'topic-greedy-foundations',
  'What is an "exchange argument" in algorithm design?',
  NULL,
  'It is a mathematical proof method.',
  '[{"id":"a","text":"A mathematical proof technique showing any optimal solution can be transformed into the greedy solution without worsening the objective","isCorrect":true,"explanation":"By iteratively swapping components of an optimal solution with greedy choices without penalty, we prove the greedy solution is itself optimal."},{"id":"b","text":"Swapping elements in an array using a temporary variable","isCorrect":false,"explanation":"Variable swap is an implementation detail, not a proof technique."},{"id":"c","text":"Exchanging recursive calls for iteration","isCorrect":false,"explanation":"That is recursion removal/iteration."},{"id":"d","text":"Trading memory for CPU time in caching","isCorrect":false,"explanation":"That is space-time tradeoff."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-erase-overlap-intervals',
  'topic-greedy-foundations',
  'Non-Overlapping Intervals',
  'Intermediate',
  'Given an array of intervals intervals where intervals[i] = [start_i, end_i], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
  ARRAY['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '-5 * 10^4 <= start_i < end_i <= 5 * 10^4']::text[],
  '[{"input":"intervals = [[1,2],[2,3],[3,4],[1,3]]","output":"1","explanation":"[1,3] can be removed and the rest of the intervals are non-overlapping."},{"input":"intervals = [[1,2],[1,2],[1,2]]","output":"2","explanation":"You need to remove two [1,2] to make the rest non-overlapping."}]'::jsonb,
  '{"javascript":"function eraseOverlapIntervals(intervals) {\n  // TODO: Sort by end time and return removals count\n  return 0;\n}","python":"def eraseOverlapIntervals(intervals):\n    # TODO: Sort by end time and return removals count\n    return 0","java":"class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        // TODO: Return removals count\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        // TODO: Return removals count\n        return 0;\n    }\n};"}'::jsonb,
  'eraseOverlapIntervals',
  '{"javascript":"function eraseOverlapIntervals(intervals) {\n  if (!intervals.length) return 0;\n  intervals.sort((a, b) => a[1] - b[1]);\n  let nonOverlap = 1, lastEnd = intervals[0][1];\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] >= lastEnd) {\n      nonOverlap++;\n      lastEnd = intervals[i][1];\n    }\n  }\n  return intervals.length - nonOverlap;\n}","python":"def eraseOverlapIntervals(intervals):\n    if not intervals: return 0\n    intervals.sort(key=lambda x: x[1])\n    non_overlap = 1\n    last_end = intervals[0][1]\n    for i in range(1, len(intervals)):\n        if intervals[i][0] >= last_end:\n            non_overlap += 1\n            last_end = intervals[i][1]\n    return len(intervals) - non_overlap","java":"class Solution { public int eraseOverlapIntervals(int[][] intervals) { if(intervals.length==0) return 0; Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1])); int nonOverlap = 1, lastEnd = intervals[0][1]; for(int i=1; i<intervals.length; i++){ if(intervals[i][0] >= lastEnd){ nonOverlap++; lastEnd = intervals[i][1]; } } return intervals.length - nonOverlap; } }","cpp":"int eraseOverlapIntervals(vector<vector<int>>& intervals) { if(intervals.empty()) return 0; sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b){ return a[1] < b[1]; }); int nonOverlap = 1, lastEnd = intervals[0][1]; for(int i=1; i<intervals.size(); i++){ if(intervals[i][0] >= lastEnd){ nonOverlap++; lastEnd = intervals[i][1]; } } return (int)intervals.size() - nonOverlap; }","timeComplexity":"O(n log n)","spaceComplexity":"O(1)","explanation":"Sorting by finish time allows greedy activity selection in linear scan."}'::jsonb,
  ARRAY['Sort intervals by their end time: intervals.sort((a, b) => a[1] - b[1]).', 'Count how many non-overlapping intervals you can keep, then subtract from total.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-erase-overlap-intervals',
  '[[1, 2], [2, 3], [3, 4], [1, 3]]',
  '1',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-erase-overlap-intervals',
  '[[1, 2], [1, 2], [1, 2]]',
  '2',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-erase-overlap-intervals',
  '[[1, 2], [2, 3]]',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Jump Game & Reachability (topic-jump-game)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-jump-game',
  'region-greedy',
  'jump-game-reachability',
  'Jump Game & Reachability',
  'Dynamic Boundary Horizons & Minimum Hop BFS Simulation',
  'greedy',
  2,
  170,
  'Zap',
  'Intermediate',
  'Master linear greedy scans: tracking dynamic horizons, farthest reachable indices, and minimum jump level counts.',
  ARRAY['Farthest Reach Window Tracking', 'Jump Game I (Reachability)', 'Jump Game II (Minimum Jumps / BFS-like Levels)', 'Gas Station Circular Tour', 'Candy Distribution Problem']::text[],
  'array_sorting',
  '{"whatIsIt":"Jump Game problems leverage greedy tracking of the current reach horizon. Instead of exploring all jump branch combinations in O(2^N), maintaining max_reach in a single pass determines reachability in O(N) time and O(1) space.","whyItMatters":"Directly applicable in network routing, platformer game engine validation, and energy budget management.","intuition":"Imagine leaping across river stones: at each stone, you see if you can jump farther than your previous record. If your record stays behind your current position, you drown.","stepByStep":["1. Initialize max_reach = 0.","2. Iterate through array: if i > max_reach, return false (stranded).","3. Update max_reach = max(max_reach, i + nums[i]).","4. If max_reach >= last index, return true immediately."],"pseudocode":"let maxReach = 0;\nfor (let i = 0; i < nums.length; i++) {\n  if (i > maxReach) return false;\n  maxReach = Math.max(maxReach, i + nums[i]);\n}\nreturn true;","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(1)","explanation":"Single pass inspecting each element once with scalar variables."},"commonMistakes":["Attempting recursion without memoization causing O(2^n) exponential timeout.","Not checking if current index exceeds max_reach before updating."],"edgeCases":["Array of length 1 (already at end)","Zeros blocking forward progress","Jumps exceeding array bounds"],"realWorldApplications":["Electric vehicle charging station hop routing.","Network packet hop counting across wireless nodes.","Platform game level solvability checking."],"whenToUse":["Array reachability where each cell defines forward jump capability."],"whenNotToUse":["Graphs where backward moves or weighted edges are permitted."],"relatedAlgorithms":["Breadth-First Search","Dynamic Programming","Dijkstra"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-jg-1',
  'topic-jump-game',
  'In Jump Game II, how does the greedy algorithm determine the minimum number of jumps to reach the end?',
  NULL,
  'Think of implicit BFS level boundaries.',
  '[{"id":"a","text":"It treats each jump as a level boundary and picks the jump that maximizes the reach for the next level","isCorrect":true,"explanation":"This simulates level-order BFS traversal in O(N) time without allocating queue nodes."},{"id":"b","text":"It always jumps the exact maximum allowed distance from each index","isCorrect":false,"explanation":"Jumping the max immediately might land on a 0, whereas a shorter jump could reach a bigger boost."},{"id":"c","text":"It checks all 2^N jump paths recursively","isCorrect":false,"explanation":"That is exponential brute force."},{"id":"d","text":"It sorts the jumps in descending order","isCorrect":false,"explanation":"Array index order cannot be altered because jumps are spatial."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-jg-2',
  'topic-jump-game',
  'In the Gas Station problem, why does resetting the starting candidate to i + 1 when tank < 0 work correctly?',
  NULL,
  'Sub-accumulations between start and i are strictly worse.',
  '[{"id":"a","text":"No station between the previous start and i could reach beyond i either","isCorrect":true,"explanation":"If start station S ran out of fuel at i, any station between S and i had even less accumulated surplus at that point."},{"id":"b","text":"Because gas prices decrease towards the end of the circuit","isCorrect":false,"explanation":"Prices are constant parameters in the problem."},{"id":"c","text":"Because circular arrays only allow clockwise movement","isCorrect":false,"explanation":"Direction is fixed, but the property stems from accumulated prefix surpluses."},{"id":"d","text":"Because negative values wrap around to positive integers","isCorrect":false,"explanation":"Arithmetic underflow is not why the logic holds."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-jg-3',
  'topic-jump-game',
  'What is the space complexity of solving Jump Game I using greedy boundary tracking?',
  NULL,
  'Do we store an array or just one number?',
  '[{"id":"a","text":"O(1) constant auxiliary space","isCorrect":true,"explanation":"Only a single scalar tracking max_reach is maintained."},{"id":"b","text":"O(N) space for dynamic programming table","isCorrect":false,"explanation":"DP takes O(N), but greedy requires only O(1)."},{"id":"c","text":"O(N log N)","isCorrect":false,"explanation":"No trees or sorting structures are allocated."},{"id":"d","text":"O(2^N)","isCorrect":false,"explanation":"No recursion stack is used."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-jg-4',
  'topic-jump-game',
  'For `nums = [3, 2, 1, 0, 4]`, what causes `canJump` to return False?',
  NULL,
  'Trace max_reach from index 0 to 3.',
  '[{"id":"a","text":"Index 3 has value 0, and max_reach never exceeds 3","isCorrect":true,"explanation":"From index 0: reach=3; index 1: reach=3; index 2: reach=3; index 3: reach=3. Index 4 > 3 is unreachable."},{"id":"b","text":"The array has odd length","isCorrect":false,"explanation":"Parity of length is irrelevant."},{"id":"c","text":"The last element is 4","isCorrect":false,"explanation":"Target value does not affect landing."},{"id":"d","text":"Negative numbers exist in the array","isCorrect":false,"explanation":"All elements are non-negative."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-jump-game-2',
  'topic-jump-game',
  'Minimum Jumps to Reach End (Jump Game II)',
  'Intermediate',
  'Given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents maximum jump length. Return the minimum number of jumps to reach nums[n - 1]. Assume you can always reach the end.',
  ARRAY['1 <= nums.length <= 10^4', '0 <= nums[i] <= 1000']::text[],
  '[{"input":"nums = [2,3,1,1,4]","output":"2","explanation":"Jump 1 step from index 0 to 1, then 3 steps to the last index."},{"input":"nums = [2,3,0,1,4]","output":"2","explanation":"2 jumps are minimum."}]'::jsonb,
  '{"javascript":"function jump(nums) {\n  // TODO: Return minimum jumps to reach last index\n  return 0;\n}","python":"def jump(nums):\n    # TODO: Return minimum jumps to reach last index\n    return 0","java":"class Solution {\n    public int jump(int[] nums) {\n        // TODO: Return minimum jumps\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        // TODO: Return minimum jumps\n        return 0;\n    }\n};"}'::jsonb,
  'jump',
  '{"javascript":"function jump(nums) {\n  if (nums.length <= 1) return 0;\n  let jumps = 0, currEnd = 0, farthest = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    farthest = Math.max(farthest, i + nums[i]);\n    if (i === currEnd) {\n      jumps++;\n      currEnd = farthest;\n      if (currEnd >= nums.length - 1) break;\n    }\n  }\n  return jumps;\n}","python":"def jump(nums):\n    if len(nums) <= 1: return 0\n    jumps, curr_end, farthest = 0, 0, 0\n    for i in range(len(nums) - 1):\n        farthest = max(farthest, i + nums[i])\n        if i == curr_end:\n            jumps += 1\n            curr_end = farthest\n            if curr_end >= len(nums) - 1: break\n    return jumps","java":"class Solution { public int jump(int[] nums) { if(nums.length<=1) return 0; int jumps=0, currEnd=0, farthest=0; for(int i=0; i<nums.length-1; i++){ farthest = Math.max(farthest, i+nums[i]); if(i==currEnd){ jumps++; currEnd = farthest; if(currEnd>=nums.length-1) break; } } return jumps; } }","cpp":"int jump(vector<int>& nums) { if(nums.size()<=1) return 0; int jumps=0, currEnd=0, farthest=0; for(int i=0; i<nums.size()-1; i++){ farthest = max(farthest, i+nums[i]); if(i==currEnd){ jumps++; currEnd = farthest; if(currEnd>=nums.size()-1) break; } } return jumps; }","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"BFS level simulation in single pass without queue allocation."}'::jsonb,
  ARRAY['Maintain current_end and farthest.', 'Only increment jumps when i reaches current_end.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-jump-game-2',
  '[2, 3, 1, 1, 4]',
  '2',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-jump-game-2',
  '[2, 3, 0, 1, 4]',
  '2',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-jump-game-2',
  '[1]',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Fractional Knapsack & Huffman Coding (topic-fractional-knapsack)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-fractional-knapsack',
  'region-greedy',
  'fractional-knapsack-huffman',
  'Fractional Knapsack & Huffman Coding',
  'Value-Density Greedy Sorting & Prefix-Free Code Trees',
  'greedy',
  3,
  200,
  'Cpu',
  'Advanced',
  'Explore value-density greedy strategies: fractional knapsack, task scheduling with cooling intervals, and Huffman compression trees.',
  ARRAY['Value-to-Weight Density Sorting', 'Fractional Knapsack vs 0/1 Knapsack', 'Huffman Tree Construction with Min-Heap', 'Task Scheduler with Cooldown Periods', 'Gas Station Circuit Completion']::text[],
  'tree',
  '{"whatIsIt":"Fractional Knapsack allows taking fractions of items; sorting by value-to-weight ratio (v/w) guarantees the optimal total value. Huffman coding uses a min-heap to greedily merge lowest frequency characters into an optimal prefix-free binary tree.","whyItMatters":"Foundational for file compression (gzip, ZIP, MP3), cloud bandwidth throttling, and container pack scheduling.","intuition":"Think of gold dust vs gold bars: with dust, you always take the most valuable per gram until your bag is full. With solid bars, you cannot break them, which is why 0/1 Knapsack requires DP.","stepByStep":["1. Calculate value/weight ratio for each item.","2. Sort items descending by this ratio.","3. Greedily fill capacity; take full item if it fits, else take fraction and terminate."],"pseudocode":"items.sort((a, b) => (b.val / b.wt) - (a.val / a.wt));\nlet total = 0, rem = W;\nfor (let item of items) {\n  if (rem <= 0) break;\n  let take = Math.min(item.wt, rem);\n  total += take * (item.val / item.wt);\n  rem -= take;\n}","complexity":{"timeBest":"O(n log n)","timeAverage":"O(n log n)","timeWorst":"O(n log n)","space":"O(n) for sorted items or min-heap","explanation":"Sorting ratios takes O(n log n); subsequent scan takes O(n)."},"commonMistakes":["Attempting to apply greedy ratio sorting to 0/1 Knapsack, which fails on discrete items.","Floating point precision rounding issues."],"edgeCases":["Capacity W = 0","All items have equal ratio","Total weight of all items is less than W"],"realWorldApplications":["DEFLATE / Gzip compression in web servers.","Network packet prioritization on QoS routers.","Chemical solution mixing in pharmaceutical manufacturing."],"whenToUse":["Continuous item packing where items can be subdivided arbitrarily."],"whenNotToUse":["Discrete indivisible items (use 0/1 Knapsack DP)."],"relatedAlgorithms":["0/1 Knapsack","Huffman Coding","Coin Change"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fk-1',
  'topic-fractional-knapsack',
  'Why does greedy by value-to-weight ratio work for Fractional Knapsack but FAIL for 0/1 Knapsack?',
  NULL,
  'Can items be cut into pieces in 0/1 Knapsack?',
  '[{"id":"a","text":"Because 0/1 Knapsack forbids taking fractions, potentially leaving dead unused capacity that could have been filled by lower-density items","isCorrect":true,"explanation":"In 0/1 knapsack, an item either fits completely or not at all, creating a combinatorial packing problem requiring DP."},{"id":"b","text":"Because 0/1 Knapsack items have negative values","isCorrect":false,"explanation":"Items in both problems have non-negative weights and values."},{"id":"c","text":"Because Fractional Knapsack uses a min-heap while 0/1 uses a max-heap","isCorrect":false,"explanation":"Data structures do not change problem nature."},{"id":"d","text":"Fractional Knapsack has no capacity limit","isCorrect":false,"explanation":"Both problems have a strict maximum capacity W."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fk-2',
  'topic-fractional-knapsack',
  'In Huffman coding, what data structure is repeatedly used to find and merge the two lowest-frequency nodes?',
  NULL,
  'What data structure extracts minimum in O(log N)?',
  '[{"id":"a","text":"Min-Heap (Priority Queue)","isCorrect":true,"explanation":"Extracting two minimum frequency nodes and pushing their sum back takes O(log N) per merge."},{"id":"b","text":"Hash Table","isCorrect":false,"explanation":"Hash tables do not provide sorted or minimum order in O(1)."},{"id":"c","text":"Doubly Linked List","isCorrect":false,"explanation":"Finding minimum in an unsorted linked list takes O(N)."},{"id":"d","text":"Monotonic Stack","isCorrect":false,"explanation":"Monotonic stacks track next greater elements, not dynamic minimum merges."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fk-3',
  'topic-fractional-knapsack',
  'What is a "prefix-free" code in Huffman compression?',
  NULL,
  'Can one valid codeword start with another valid codeword?',
  '[{"id":"a","text":"No code word is a prefix of any other valid code word","isCorrect":true,"explanation":"Prefix-free codes allow unambiguous real-time decoding from left to right without delimiter tokens."},{"id":"b","text":"The first bit of every code word must always be 1","isCorrect":false,"explanation":"Bits can be 0 or 1 anywhere."},{"id":"c","text":"All code words must have identical bit length","isCorrect":false,"explanation":"Huffman codes have variable lengths based on frequency."},{"id":"d","text":"The code words are generated using reverse order","isCorrect":false,"explanation":"Prefix property applies to prefixes, not string reversal."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fk-4',
  'topic-fractional-knapsack',
  'In the Task Scheduler problem with cooldown n between identical tasks, what is the theoretical minimum execution time?',
  NULL,
  'The most frequent task creates fixed idle slots.',
  '[{"id":"a","text":"max(len(tasks), (max_freq - 1) * (n + 1) + max_freq_count)","isCorrect":true,"explanation":"The most frequent tasks dictate the mandatory idle gaps unless total remaining tasks exceed the gap count."},{"id":"b","text":"len(tasks) * n","isCorrect":false,"explanation":"Tasks with different names do not require cooldown between each other."},{"id":"c","text":"max_freq * n","isCorrect":false,"explanation":"Misses the remaining task overlap."},{"id":"d","text":"Always exactly len(tasks)","isCorrect":false,"explanation":"Cooldown stalls CPU with idle cycles if not enough diverse tasks exist."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-fractional-knapsack',
  'topic-fractional-knapsack',
  'Fractional Knapsack',
  'Intermediate',
  'Given weights and values of N items and a knapsack capacity W, compute the maximum total value possible in the knapsack. You can break items for fractional amounts. Return the value rounded to 2 decimal places.',
  ARRAY['1 <= N <= 10^4', '1 <= W <= 10^4', '1 <= weight, value <= 10^4']::text[],
  '[{"input":"W = 50, items = [[60, 10], [100, 20], [120, 30]]","output":"240.0","explanation":"Take item 1 (60, 10) and item 2 (100, 20) in full, and 2/3 of item 3 (80 value, 20 weight)."},{"input":"W = 10, items = [[50, 20]]","output":"25.0","explanation":"Take half of item: 10/20 * 50 = 25.0."}]'::jsonb,
  '{"javascript":"function fractionalKnapsack(W, items) {\n  // items = [[value, weight], ...]\n  // TODO: Sort by ratio and return max value\n  return 0.0;\n}","python":"def fractionalKnapsack(W, items):\n    # items = [[value, weight], ...]\n    # TODO: Sort by ratio and return max value\n    return 0.0","java":"class Solution {\n    public double fractionalKnapsack(int W, int[][] items) {\n        // TODO: Return max fractional value\n        return 0.0;\n    }\n}","cpp":"class Solution {\npublic:\n    double fractionalKnapsack(int W, vector<vector<int>>& items) {\n        // TODO: Return max fractional value\n        return 0.0;\n    }\n};"}'::jsonb,
  'fractionalKnapsack',
  '{"javascript":"function fractionalKnapsack(W, items) {\n  items.sort((a, b) => (b[0] / b[1]) - (a[0] / a[1]));\n  let total = 0, rem = W;\n  for (let [v, w] of items) {\n    if (rem <= 0) break;\n    let take = Math.min(w, rem);\n    total += take * (v / w);\n    rem -= take;\n  }\n  return Math.round(total * 100) / 100;\n}","python":"def fractionalKnapsack(W, items):\n    items.sort(key=lambda x: x[0] / x[1], reverse=True)\n    total = 0.0\n    rem = W\n    for v, w in items:\n        if rem <= 0: break\n        take = min(w, rem)\n        total += take * (v / w)\n        rem -= take\n    return round(total, 2)","java":"class Solution { public double fractionalKnapsack(int W, int[][] items) { Arrays.sort(items, (a, b) -> Double.compare((double)b[0]/b[1], (double)a[0]/a[1])); double total = 0; int rem = W; for(int[] it: items){ if(rem<=0) break; int take = Math.min(it[1], rem); total += take * ((double)it[0]/it[1]); rem -= take; } return Math.round(total * 100.0) / 100.0; } }","cpp":"double fractionalKnapsack(int W, vector<vector<int>>& items) { sort(items.begin(), items.end(), [](const auto& a, const auto& b){ return (double)a[0]/a[1] > (double)b[0]/b[1]; }); double total = 0; int rem = W; for(const auto& it: items){ if(rem<=0) break; int take = min(it[1], rem); total += take * ((double)it[0]/it[1]); rem -= take; } return round(total * 100.0) / 100.0; }","timeComplexity":"O(n log n)","spaceComplexity":"O(1)","explanation":"Sorting by value-to-weight ratio guarantees maximum value accumulation."}'::jsonb,
  ARRAY['Calculate value / weight for each item.', 'Greedily take items with highest density first.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-fractional-knapsack',
  '50, [[60, 10], [100, 20], [120, 30]]',
  '240.0',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-fractional-knapsack',
  '10, [[50, 20]]',
  '25.0',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: DP Foundations: 1D Problems (topic-dp-foundations)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-dp-foundations',
  'region-dp',
  'dp-foundations',
  'DP Foundations: 1D Problems',
  'Overlapping Subproblems, Memoization & Rolling State',
  'dp',
  1,
  140,
  'Layers',
  'Beginner',
  'Master the core of Dynamic Programming: identifying overlapping subproblems, memoization caches, and classic 1D progressions like Climbing Stairs and House Robber.',
  ARRAY['Overlapping Subproblems & Optimal Substructure', 'Top-Down Memoization vs Bottom-Up Tabulation', 'Climbing Stairs & Fibonacci Number', 'House Robber (Adjacent Element Exclusions)', 'State Space Optimization from O(N) to O(1)']::text[],
  'dp_table',
  '{"whatIsIt":"Dynamic Programming solves complex problems by breaking them down into simpler subproblems, solving each subproblem once, and storing their solutions. If a problem has overlapping subproblems and optimal substructure, DP transforms exponential O(2^N) recursion into polynomial O(N) or O(N^2) time.","whyItMatters":"Powers recommendation feed ranking, financial options pricing, robotic kinematic path planning, and diff tools.","intuition":"Writing down 1 + 1 + 1 + 1 = 4 on paper: if you add another \"+ 1\" to the end, you don''t recount all five ones from scratch; you remember 4 and add 1.","stepByStep":["1. Define the subproblem in plain words (e.g. dp[i] = max loot from houses 0 to i).","2. Formulate the state transition recurrence (e.g. dp[i] = max(dp[i-1], dp[i-2] + nums[i])).","3. Identify base cases (e.g. dp[0] = nums[0], dp[1] = max(nums[0], nums[1])).","4. Optimize auxiliary space if only the previous k states are accessed."],"pseudocode":"let rob1 = 0, rob2 = 0;\nfor (let n of nums) {\n  let temp = Math.max(rob1 + n, rob2);\n  rob1 = rob2;\n  rob2 = temp;\n}\nreturn rob2;","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(1) with rolling variables","explanation":"Visits each house once, updating two scalar variables."},"commonMistakes":["Failing to notice overlapping subproblems and writing brute-force recursion.","Allocating an O(n) array when only the previous 2 values are required."],"edgeCases":["Single element array","Empty array","All zero values"],"realWorldApplications":["Stock trading algorithms with cool-down rules.","CPU cache pre-fetching optimization.","Resource allocation in cloud server provisioning."],"whenToUse":["Optimization problems with overlapping subproblems and sequential decisions."],"whenNotToUse":["Non-overlapping subproblems (use divide-and-conquer like Merge Sort)."],"relatedAlgorithms":["House Robber II","Climbing Stairs","Fibonacci"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dp-1',
  'topic-dp-foundations',
  'What two properties define a problem suitable for Dynamic Programming?',
  NULL,
  'Re-solving identical states + optimal building blocks.',
  '[{"id":"a","text":"Optimal Substructure and Overlapping Subproblems","isCorrect":true,"explanation":"Optimal substructure means optimal solutions to subproblems form the optimal overall solution; overlapping subproblems means the same subproblems are solved repeatedly."},{"id":"b","text":"Greedy choice property and divide-and-conquer independence","isCorrect":false,"explanation":"Divide-and-conquer (like merge sort) deals with non-overlapping subproblems."},{"id":"c","text":"Monotonicity and sorted inputs","isCorrect":false,"explanation":"DP applies to unsorted arrays, graphs, strings, and trees."},{"id":"d","text":"Asymptotic linearity and recursion depth < 100","isCorrect":false,"explanation":"Depth and linearity are not determining properties."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dp-2',
  'topic-dp-foundations',
  'In the House Robber problem, why can we reduce space complexity from O(N) to O(1)?',
  NULL,
  'How many past states does dp[i] depend on?',
  '[{"id":"a","text":"Because calculating dp[i] only requires the values of dp[i-1] and dp[i-2]","isCorrect":true,"explanation":"We only need two variables (rob1, rob2) to track the best outcomes of the last two steps."},{"id":"b","text":"Because garbage collection clears previous array slots automatically","isCorrect":false,"explanation":"Allocating an array still takes O(N) space unless explicitly omitted."},{"id":"c","text":"Because houses can be visited in random order","isCorrect":false,"explanation":"Houses must be considered in sequential order."},{"id":"d","text":"Because the houses have constant values","isCorrect":false,"explanation":"Values are arbitrary non-negative integers."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dp-3',
  'topic-dp-foundations',
  'What is the time complexity of the naive unmemoized recursive Fibonacci vs the DP tabulated version for N?',
  NULL,
  'Exponential branching vs linear iteration.',
  '[{"id":"a","text":"Naive is O(2^N); Tabulated DP is O(N)","isCorrect":true,"explanation":"Naive recursion creates an exponential tree of redundant calls; DP visits each state exactly once."},{"id":"b","text":"Naive is O(N^2); Tabulated is O(log N)","isCorrect":false,"explanation":"Naive is exponential ~1.618^N, not polynomial."},{"id":"c","text":"Both are O(N)","isCorrect":false,"explanation":"Without caching, naive branches into exponential calls."},{"id":"d","text":"Naive is O(N!); Tabulated is O(1)","isCorrect":false,"explanation":"Fibonacci branching is 2, not factorial."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dp-4',
  'topic-dp-foundations',
  'In Python, what built-in decorator easily adds memoization to a recursive function?',
  NULL,
  'Least Recently Used cache decorator.',
  '[{"id":"a","text":"@functools.lru_cache(None) or @functools.cache","isCorrect":true,"explanation":"lru_cache automatically hashes arguments and returns memoized results for repeated invocations."},{"id":"b","text":"@staticmethod","isCorrect":false,"explanation":"@staticmethod prevents instance binding, no caching."},{"id":"c","text":"@property","isCorrect":false,"explanation":"@property turns a method into an attribute getter."},{"id":"d","text":"@asyncio.coroutine","isCorrect":false,"explanation":"Used for asynchronous coroutines, not state caching."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-house-robber',
  'topic-dp-foundations',
  'House Robber',
  'Beginner',
  'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. You cannot rob two adjacent houses. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
  ARRAY['1 <= nums.length <= 100', '0 <= nums[i] <= 400']::text[],
  '[{"input":"nums = [1,2,3,1]","output":"4","explanation":"Rob house 1 (money = 1) and house 3 (money = 3). Total = 1 + 3 = 4."},{"input":"nums = [2,7,9,3,1]","output":"12","explanation":"Rob house 1 (2), house 3 (9), and house 5 (1). Total = 12."}]'::jsonb,
  '{"javascript":"function rob(nums) {\n  // TODO: Return max loot without robbing adjacent houses\n  return 0;\n}","python":"def rob(nums):\n    # TODO: Return max loot without robbing adjacent houses\n    return 0","java":"class Solution {\n    public int rob(int[] nums) {\n        // TODO: Return max loot\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // TODO: Return max loot\n        return 0;\n    }\n};"}'::jsonb,
  'rob',
  '{"javascript":"function rob(nums) {\n  let rob1 = 0, rob2 = 0;\n  for (let n of nums) {\n    let temp = Math.max(rob1 + n, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}","python":"def rob(nums):\n    rob1, rob2 = 0, 0\n    for n in nums:\n        temp = max(rob1 + n, rob2)\n        rob1 = rob2\n        rob2 = temp\n    return rob2","java":"class Solution { public int rob(int[] nums) { int rob1 = 0, rob2 = 0; for(int n: nums){ int temp = Math.max(rob1 + n, rob2); rob1 = rob2; rob2 = temp; } return rob2; } }","cpp":"int rob(vector<int>& nums) { int rob1 = 0, rob2 = 0; for(int n: nums){ int temp = max(rob1 + n, rob2); rob1 = rob2; rob2 = temp; } return rob2; }","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Rolling DP variables eliminating array allocation."}'::jsonb,
  ARRAY['Choice at each house: rob current + best from i-2, or skip and keep best from i-1.', 'Maintain rob1 and rob2 in O(1) space.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-house-robber',
  '[1, 2, 3, 1]',
  '4',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-house-robber',
  '[2, 7, 9, 3, 1]',
  '12',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-house-robber',
  '[0]',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-house-robber',
  '[2, 1, 1, 2]',
  '4',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Knapsack Problems & Subsets (topic-knapsack-variants)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-knapsack-variants',
  'region-dp',
  'knapsack-variants',
  'Knapsack Problems & Subsets',
  '0/1 vs Unbounded Transitions & 1D Backward Scan',
  'dp',
  2,
  180,
  'Layers',
  'Intermediate',
  'Master the canonical 0/1 knapsack, unbounded knapsack, subset sum partitioning, and coin change variants.',
  ARRAY['0/1 Knapsack Decision Matrix', 'Space Optimization to 1D Array (Iterate Backwards)', 'Unbounded Knapsack (Iterate Forwards)', 'Partition Equal Subset Sum', 'Target Sum (+/- Assignment)']::text[],
  'dp_table',
  '{"whatIsIt":"In 0/1 Knapsack, each item may be chosen at most once. In Unbounded Knapsack, items can be selected infinitely. When compressing the 2D DP table to a 1D array, 0/1 Knapsack requires iterating capacity backwards to prevent reusing the same item within the same round.","whyItMatters":"Directly powers virtual machine bin packing, cloud budget scheduling, and payload loading.","intuition":"If you iterate a 1D table from left to right, updating a cell might immediately affect a larger cell in the same loop iteration (unbounded). Iterating from right to left ensures every lookup reads values from the previous item.","stepByStep":["1. Target is capacity W.","2. For 0/1: iterate capacity w from W down to item weight wt[i].","3. Update dp[w] = max(dp[w], val[i] + dp[w - wt[i]])."],"pseudocode":"let dp = new Array(W + 1).fill(0);\nfor (let i = 0; i < n; i++) {\n  for (let w = W; w >= wt[i]; w--) {\n    dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);\n  }\n}","complexity":{"timeBest":"O(n * W)","timeAverage":"O(n * W)","timeWorst":"O(n * W)","space":"O(W) using 1D capacity array","explanation":"Pseudo-polynomial complexity dependent on capacity W."},"commonMistakes":["Iterating forwards in 0/1 Knapsack, turning it into Unbounded Knapsack accidentally.","Not checking if total sum is odd before running Partition Equal Subset Sum."],"edgeCases":["Capacity W = 0","Item weight larger than capacity W","All items have equal weight"],"realWorldApplications":["Container packing in cloud Kubernetes orchestration.","Asset portfolio optimization under risk constraints.","Energy grid payload dispatching."],"whenToUse":["Budget or capacity constrained maximization or partition problems."],"whenNotToUse":["Continuous knapsack (use Greedy value/weight sorting)."],"relatedAlgorithms":["Partition Equal Subset Sum","Coin Change II","Target Sum"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ks-1',
  'topic-knapsack-variants',
  'Why MUST we iterate capacity w backwards (from W down to wt[i]) when using a 1D array for 0/1 Knapsack?',
  NULL,
  'Preventing duplicate item reuse within the same step.',
  '[{"id":"a","text":"To ensure dp[w - wt[i]] comes from the previous item iteration, preventing multiple uses of the same item","isCorrect":true,"explanation":"Forward iteration would allow an item to be picked repeatedly in the same row, unintentionally turning 0/1 Knapsack into Unbounded Knapsack."},{"id":"b","text":"Because arrays in C and Python can only be accessed backwards","isCorrect":false,"explanation":"Memory can be read forwards or backwards equally."},{"id":"c","text":"To avoid zero-division errors","isCorrect":false,"explanation":"No division occurs in knapsack transitions."},{"id":"d","text":"To reduce the time complexity from O(N * W) to O(N)","isCorrect":false,"explanation":"Time complexity remains O(N * W); only space is optimized."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ks-2',
  'topic-knapsack-variants',
  'Why is 0/1 Knapsack considered NP-Complete and its DP algorithm "pseudo-polynomial"?',
  NULL,
  'Input size in bits vs numerical magnitude.',
  '[{"id":"a","text":"The time complexity O(N * W) is polynomial in the numerical value of W, but exponential in the number of bits needed to represent W","isCorrect":true,"explanation":"Representing integer W requires log2(W) bits. An algorithm running in O(2^b) where b is input size in bits is pseudo-polynomial."},{"id":"b","text":"Because it can only run on quantum computers","isCorrect":false,"explanation":"It runs standardly on classical hardware."},{"id":"c","text":"Because it cannot find the exact answer","isCorrect":false,"explanation":"DP finds the exact optimal answer."},{"id":"d","text":"Because sorting is required first","isCorrect":false,"explanation":"0/1 Knapsack does not require sorting items."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ks-3',
  'topic-knapsack-variants',
  'In the Partition Equal Subset Sum problem, what is the first check to perform before running DP?',
  NULL,
  'Can an odd integer be split into two equal integers?',
  '[{"id":"a","text":"Check if total sum is odd: if sum(nums) % 2 != 0, return False immediately","isCorrect":true,"explanation":"An odd sum cannot be divided into two equal whole integer halves."},{"id":"b","text":"Check if nums is sorted in descending order","isCorrect":false,"explanation":"Sorting does not determine parity."},{"id":"c","text":"Check if all numbers are positive prime numbers","isCorrect":false,"explanation":"Numbers can be any positive integers."},{"id":"d","text":"Count negative numbers","isCorrect":false,"explanation":"The standard problem assumes positive integers."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ks-4',
  'topic-knapsack-variants',
  'In Coin Change II (number of combinations that make up amount), how do we iterate loops to avoid counting permutations like (1, 2) and (2, 1) twice?',
  NULL,
  'Which loop is outside: coins or amount?',
  '[{"id":"a","text":"Outer loop iterates coins, inner loop iterates amount from coin to amount","isCorrect":true,"explanation":"Processing each coin one by one ensures coins are added in non-decreasing order of index, eliminating duplicate permutations."},{"id":"b","text":"Outer loop iterates amount, inner loop iterates coins","isCorrect":false,"explanation":"Outer amount / inner coins generates permutations (like Climbing Stairs), not distinct combinations."},{"id":"c","text":"Sort coins in reverse order and iterate both randomly","isCorrect":false,"explanation":"Random iteration produces erratic counts."},{"id":"d","text":"Divide the final count by N!","isCorrect":false,"explanation":"Coins have varying frequencies so dividing by N! is mathematically incorrect."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-can-partition',
  'topic-knapsack-variants',
  'Partition Equal Subset Sum',
  'Intermediate',
  'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.',
  ARRAY['1 <= nums.length <= 200', '1 <= nums[i] <= 100']::text[],
  '[{"input":"nums = [1,5,11,5]","output":"true","explanation":"The array can be partitioned as [1, 5, 5] and [11]."},{"input":"nums = [1,2,3,5]","output":"false","explanation":"Cannot be partitioned into equal sum subsets."}]'::jsonb,
  '{"javascript":"function canPartition(nums) {\n  // TODO: Check if nums can partition into two equal subsets\n  return false;\n}","python":"def canPartition(nums):\n    # TODO: Check if nums can partition into two equal subsets\n    return False","java":"class Solution {\n    public boolean canPartition(int[] nums) {\n        // TODO: Partition equal subset sum\n        return false;\n    }\n}","cpp":"class Solution {\npublic:\n    boolean canPartition(vector<int>& nums) {\n        // TODO: Partition equal subset sum\n        return false;\n    }\n};"}'::jsonb,
  'canPartition',
  '{"javascript":"function canPartition(nums) {\n  let total = nums.reduce((a, b) => a + b, 0);\n  if (total % 2 !== 0) return false;\n  let target = total / 2;\n  let dp = new Array(target + 1).fill(false);\n  dp[0] = true;\n  for (let n of nums) {\n    for (let w = target; w >= n; w--) {\n      dp[w] = dp[w] || dp[w - n];\n    }\n  }\n  return dp[target];\n}","python":"def canPartition(nums):\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for n in nums:\n        for w in range(target, n - 1, -1):\n            dp[w] = dp[w] or dp[w - n]\n    return dp[target]","java":"class Solution { public boolean canPartition(int[] nums) { int total = 0; for(int n: nums) total += n; if(total % 2 != 0) return false; int target = total / 2; boolean[] dp = new boolean[target + 1]; dp[0] = true; for(int n: nums){ for(int w=target; w>=n; w--){ dp[w] = dp[w] || dp[w - n]; } } return dp[target]; } }","cpp":"bool canPartition(vector<int>& nums) { int total = 0; for(int n: nums) total += n; if(total % 2 != 0) return false; int target = total / 2; vector<bool> dp(target + 1, false); dp[0] = true; for(int n: nums){ for(int w=target; w>=n; w--){ dp[w] = dp[w] || dp[w - n]; } } return dp[target]; }","timeComplexity":"O(n * target)","spaceComplexity":"O(target)","explanation":"1D boolean DP array backwards scan verifying achievable subset sums."}'::jsonb,
  ARRAY['If total sum is odd, return false.', 'Target sum is total // 2. Check if a subset sums to target.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-can-partition',
  '[1, 5, 11, 5]',
  'true',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-can-partition',
  '[1, 2, 3, 5]',
  'false',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-can-partition',
  '[2, 2]',
  'true',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: 2D DP: Strings & Sequences (topic-lcs-edit-distance)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-lcs-edit-distance',
  'region-dp',
  'lcs-edit-distance',
  '2D DP: Strings & Sequences',
  'Longest Common Subsequence, Levenshtein Distance & LIS',
  'dp',
  3,
  220,
  'Cpu',
  'Advanced',
  'Master two-dimensional DP on strings: Longest Common Subsequence (LCS), Edit Distance (Levenshtein), and Longest Increasing Subsequence (LIS).',
  ARRAY['2D Grid DP State Transitions', 'Longest Common Subsequence (LCS)', 'Edit Distance (Insert, Delete, Replace)', 'Longest Increasing Subsequence (LIS - O(N^2) to O(N log N))', 'Space Optimization to Two Rows / Single Row']::text[],
  'dp_table',
  '{"whatIsIt":"String DP compares prefixes or suffixes of two strings. In LCS, if characters match, dp[i][j] = 1 + dp[i-1][j-1]; if they differ, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Edit Distance adds replacement cost.","whyItMatters":"Foundational for Git diff computation, DNA genome sequence alignment (BLAST), and spell-checking autocorrect engines.","intuition":"Building a matrix where row represents prefix of string A and column represents prefix of string B: a match moves diagonally with +1 reward.","stepByStep":["1. Initialize (m+1) x (n+1) grid with zeros.","2. If characters match: dp[i][j] = 1 + dp[i-1][j-1].","3. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).","4. Answer is at dp[m][n]."],"pseudocode":"for (let i = 1; i <= m; i++) {\n  for (let j = 1; j <= n; j++) {\n    if (s1[i-1] === s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n    else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n  }\n}","complexity":{"timeBest":"O(m * n)","timeAverage":"O(m * n)","timeWorst":"O(m * n)","space":"O(m * n) or O(min(m, n))","explanation":"Fills an (m+1) x (n+1) grid once."},"commonMistakes":["Using 0-indexed string indices in a 1-indexed DP table without subtracting 1.","Not initializing base row and column with insertion/deletion step counts in Edit Distance."],"edgeCases":["Either string is empty","Identical strings","Completely disjoint strings"],"realWorldApplications":["Git diff and merge conflict resolution.","Bioinformatics gene sequence alignment.","Search query autocorrect and typo tolerance."],"whenToUse":["Longest common subsequences, edit distance, string transformation costs."],"whenNotToUse":["Exact substring pattern matching (use KMP or Rabin-Karp)."],"relatedAlgorithms":["Edit Distance","Longest Increasing Subsequence","Shortest Common Supersequence"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lcs-1',
  'topic-lcs-edit-distance',
  'In Longest Common Subsequence (LCS) for strings s1 and s2, what is the recurrence when s1[i-1] == s2[j-1]?',
  NULL,
  'Diagonal step with +1 reward.',
  '[{"id":"a","text":"dp[i][j] = 1 + dp[i-1][j-1]","isCorrect":true,"explanation":"When current characters match, we extend the optimal LCS from the prefixes excluding both characters by 1."},{"id":"b","text":"dp[i][j] = max(dp[i-1][j], dp[i][j-1])","isCorrect":false,"explanation":"This is the formula for mismatched characters, not matching ones."},{"id":"c","text":"dp[i][j] = dp[i-1][j-1]","isCorrect":false,"explanation":"Missing the +1 contribution of the matching character."},{"id":"d","text":"dp[i][j] = dp[i][j-1] + 1","isCorrect":false,"explanation":"Does not account for diagonal prefix."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lcs-2',
  'topic-lcs-edit-distance',
  'In Edit Distance (Levenshtein), what three operations does dp[i][j] consider when characters s1[i-1] != s2[j-1]?',
  NULL,
  'What single-character changes can you make?',
  '[{"id":"a","text":"Insert (dp[i][j-1]), Delete (dp[i-1][j]), and Replace (dp[i-1][j-1])","isCorrect":true,"explanation":"Each corresponds to one edit operation, picking the minimum of the three plus cost 1."},{"id":"b","text":"Transpose, Invert, and Negate","isCorrect":false,"explanation":"Standard Levenshtein uses insert, delete, and substitute."},{"id":"c","text":"Uppercase, Lowercase, and Strip","isCorrect":false,"explanation":"String case formatting operations are not edit distance primitives."},{"id":"d","text":"Split, Concatenate, and Reverse","isCorrect":false,"explanation":"Those are compound operations."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lcs-3',
  'topic-lcs-edit-distance',
  'How does the Patience Sorting algorithm solve Longest Increasing Subsequence (LIS) in O(N log N) time?',
  NULL,
  'Maintaining minimal tail values with binary search.',
  '[{"id":"a","text":"It maintains tails array of active piles and uses binary search (bisect_left) to place or replace elements","isCorrect":true,"explanation":"Each element either extends the longest pile or replaces the smallest tail >= num, maintaining sorted tails."},{"id":"b","text":"It sorts the entire array and compares adjacent pairs","isCorrect":false,"explanation":"Sorting destroys the original index sequence needed for subsequences."},{"id":"c","text":"It converts the array into a Red-Black Tree","isCorrect":false,"explanation":"Binary search on a tails array is simpler and cache-optimal."},{"id":"d","text":"It uses Dijkstra algorithm on the index graph","isCorrect":false,"explanation":"Graph shortest path is not O(N log N) here."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lcs-4',
  'topic-lcs-edit-distance',
  'What is the base case in 2D Edit Distance when transforming an empty string into a string of length j?',
  NULL,
  'How many insertions create a string of length j from nothing?',
  '[{"id":"a","text":"dp[0][j] = j (requires j insertion operations)","isCorrect":true,"explanation":"Transforming an empty string into a string of length j requires inserting all j characters."},{"id":"b","text":"dp[0][j] = 0","isCorrect":false,"explanation":"Inserting j characters cannot cost 0."},{"id":"c","text":"dp[0][j] = -1","isCorrect":false,"explanation":"Cost is non-negative."},{"id":"d","text":"dp[0][j] = float(\"inf\")","isCorrect":false,"explanation":"It is achievable via j insertions."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-longest-common-subsequence',
  'topic-lcs-edit-distance',
  'Longest Common Subsequence',
  'Advanced',
  'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
  ARRAY['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters.']::text[],
  '[{"input":"text1 = \"abcde\", text2 = \"ace\"","output":"3","explanation":"The longest common subsequence is \"ace\" and its length is 3."},{"input":"text1 = \"abc\", text2 = \"abc\"","output":"3","explanation":"The longest common subsequence is \"abc\"."},{"input":"text1 = \"abc\", text2 = \"def\"","output":"0","explanation":"There is no such common subsequence."}]'::jsonb,
  '{"javascript":"function longestCommonSubsequence(text1, text2) {\n  // TODO: Return length of longest common subsequence\n  return 0;\n}","python":"def longestCommonSubsequence(text1: str, text2: str) -> int:\n    # TODO: Return length of longest common subsequence\n    return 0","java":"class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // TODO: Return LCS length\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        // TODO: Return LCS length\n        return 0;\n    }\n};"}'::jsonb,
  'longestCommonSubsequence',
  '{"javascript":"function longestCommonSubsequence(text1, text2) {\n  let m = text1.length, n = text2.length;\n  let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = 1 + dp[i - 1][j - 1];\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n  return dp[m][n];\n}","python":"def longestCommonSubsequence(text1: str, text2: str) -> int:\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]","java":"class Solution { public int longestCommonSubsequence(String text1, String text2) { int m = text1.length(), n = text2.length(); int[][] dp = new int[m + 1][n + 1]; for(int i=1; i<=m; i++){ for(int j=1; j<=n; j++){ if(text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = 1 + dp[i-1][j-1]; else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); } } return dp[m][n]; } }","cpp":"int longestCommonSubsequence(string text1, string text2) { int m = text1.size(), n = text2.size(); vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0)); for(int i=1; i<=m; i++){ for(int j=1; j<=n; j++){ if(text1[i-1] == text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1]; else dp[i][j] = max(dp[i-1][j], dp[i][j-1]); } } return dp[m][n]; }","timeComplexity":"O(m * n)","spaceComplexity":"O(m * n)","explanation":"Classic 2D Dynamic Programming prefix comparison."}'::jsonb,
  ARRAY['Create 2D grid of size (m+1) x (n+1).', 'If chars match: 1 + dp[i-1][j-1]; else: max(dp[i-1][j], dp[i][j-1]).']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-longest-common-subsequence',
  '"abcde", "ace"',
  '3',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-longest-common-subsequence',
  '"abc", "abc"',
  '3',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-longest-common-subsequence',
  '"abc", "def"',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Hash Internals & Collisions (topic-hash-internals)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-hash-internals',
  'region-hashing',
  'hash-internals-collisions',
  'Hash Internals & Collisions',
  'Bucket Hashing, Separate Chaining & Open Addressing Probing',
  'hashing',
  1,
  130,
  'Database',
  'Beginner',
  'Explore what happens under the hood of hash maps: hash codes, compression functions, separate chaining, and linear/quadratic probing.',
  ARRAY['Hash Functions (Uniform Distribution & Determinism)', 'Compression Function (hash & (capacity - 1))', 'Collision Resolution: Separate Chaining (Linked List / Red-Black Tree)', 'Collision Resolution: Open Addressing (Linear, Quadratic, Double Hashing)', 'Load Factor & Amortized O(1) Rehashing']::text[],
  'hash_map',
  '{"whatIsIt":"A hash table maps keys to values using a hash function that computes an integer index into an array of buckets. When two distinct keys hash to the same bucket (collision), separate chaining stores elements in linked nodes, while open addressing probes for the next available slot.","whyItMatters":"Powers database indices, in-memory caches like Redis and Memcached, language interpreters, and instant dictionary lookups.","intuition":"Think of postal coat checks: your name determines which cubby slot your coat goes in; if two people share a cubby, they hang hangers together on the same hook.","stepByStep":["1. Compute 32-bit hash code from key: hashCode(key).","2. Compress hash code into bucket index: index = hash & (capacity - 1).","3. Traverse bucket chain: if key matches, update value; else append new node.","4. If load factor (size / capacity) > threshold, double capacity and rehash all keys."],"pseudocode":"let index = hash(key) % capacity;\nif (!buckets[index]) buckets[index] = [];\nfor (let pair of buckets[index]) {\n  if (pair[0] === key) { pair[1] = val; return; }\n}\nbuckets[index].push([key, val]);","complexity":{"timeBest":"O(1)","timeAverage":"O(1)","timeWorst":"O(n) if all keys collide","space":"O(n) proportional to stored entries","explanation":"Average O(1) amortized assuming uniform hash function distribution."},"commonMistakes":["Using mutable objects as keys in hash maps (mutating key after insertion breaks subsequent lookups).","Not using tombstones in open addressing, breaking probe continuity on deletions."],"edgeCases":["Hash code collisions","Hash map capacity reaching maximum integer bound","Null keys"],"realWorldApplications":["Database query caching in Redis.","Language compiler symbol tables.","Git commit object database (SHA-1 hashing)."],"whenToUse":["Fast key-value associations and duplicate detection."],"whenNotToUse":["Ordered key traversals or range queries (use Red-Black Tree / TreeMap)."],"relatedAlgorithms":["Bloom Filter","Consistent Hashing","LRU Cache"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-hi-1',
  'topic-hash-internals',
  'What is the worst-case time complexity of retrieving a value from a standard separate chaining hash map where all keys collide?',
  NULL,
  'What does a bucket with N collisions look like?',
  '[{"id":"a","text":"O(N) because all entries reside in a single linked chain that must be traversed linearly","isCorrect":true,"explanation":"If all keys hash to the same bucket, the hash map degenerates into a single linked list."},{"id":"b","text":"O(1)","isCorrect":false,"explanation":"Collisions degrade theoretical O(1) performance."},{"id":"c","text":"O(log N)","isCorrect":false,"explanation":"Only Java 8+ converts to a balanced BST at length 8; classic separate chaining is O(N)."},{"id":"d","text":"O(N^2)","isCorrect":false,"explanation":"Linear search along the single chain is O(N), not quadratic."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-hi-2',
  'topic-hash-internals',
  'Why does open addressing require a special "TOMBSTONE / DELETED" marker instead of simply setting a deleted slot to empty (null)?',
  NULL,
  'How does a linear probe search decide when to stop looking?',
  '[{"id":"a","text":"Setting it to empty would cause subsequent search probes for other elements to terminate prematurely","isCorrect":true,"explanation":"Probing stops when encountering an empty slot. If a deleted item left an empty slot, any element probed past that point would become unreachable."},{"id":"b","text":"Because computers cannot write null to memory","isCorrect":false,"explanation":"Null pointers can be written to memory."},{"id":"c","text":"To encrypt deleted user credentials","isCorrect":false,"explanation":"Tombstones are algorithmic structural markers, not encryption."},{"id":"d","text":"To allow the garbage collector to find the array","isCorrect":false,"explanation":"Array references remain intact regardless of slot contents."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-hi-3',
  'topic-hash-internals',
  'What mathematical property allows fast modulo computation `hash % capacity` via bitwise AND `hash & (capacity - 1)`?',
  NULL,
  'Binary representation of 2^k - 1.',
  '[{"id":"a","text":"Capacity being an exact power of 2 (e.g., 16, 32, 64)","isCorrect":true,"explanation":"When capacity is 2^k, capacity - 1 has the lower k bits set to 1, acting as an instant mask equivalent to modulo."},{"id":"b","text":"Capacity being a prime number","isCorrect":false,"explanation":"Prime numbers require true hardware integer division modulo."},{"id":"c","text":"All keys being negative numbers","isCorrect":false,"explanation":"Negative numbers require sign handling."},{"id":"d","text":"Floating point precision","isCorrect":false,"explanation":"Bitwise operations apply only to integers."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-hi-4',
  'topic-hash-internals',
  'What is the "birthday paradox" in the context of hash functions?',
  NULL,
  'Why do collisions happen earlier than you expect?',
  '[{"id":"a","text":"Collisions occur with high probability with far fewer items than the total number of available buckets","isCorrect":true,"explanation":"With 365 days, a 50% collision chance occurs with just 23 people; similarly, hash collisions appear much sooner than bucket saturation."},{"id":"b","text":"Hash tables crash on leap years","isCorrect":false,"explanation":"Calendar years do not affect hash operations."},{"id":"c","text":"All users born on the same day share identical passwords","isCorrect":false,"explanation":"Unrelated to user birth dates."},{"id":"d","text":"Hash tables double in size on their creation anniversary","isCorrect":false,"explanation":"Hash tables resize based on load factor, not time."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-two-sum-hash',
  'topic-hash-internals',
  'Two Sum',
  'Beginner',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. Solve in O(n) time using a hash map.',
  ARRAY['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9']::text[],
  '[{"input":"nums = [2,7,11,15], target = 9","output":"[0,1]","explanation":"Because nums[0] + nums[1] == 9, we return [0, 1]."},{"input":"nums = [3,2,4], target = 6","output":"[1,2]","explanation":"nums[1] + nums[2] == 6."}]'::jsonb,
  '{"javascript":"function twoSum(nums, target) {\n  // TODO: Find indices summing to target in O(n)\n  return [];\n}","python":"def twoSum(nums, target):\n    # TODO: Find indices summing to target in O(n)\n    return []","java":"class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // TODO: Two sum in O(n)\n        return new int[]{};\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // TODO: Two sum in O(n)\n        return {};\n    }\n};"}'::jsonb,
  'twoSum',
  '{"javascript":"function twoSum(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}","python":"def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []","java":"class Solution { public int[] twoSum(int[] nums, int target) { Map<Integer, Integer> map = new HashMap<>(); for(int i=0; i<nums.length; i++){ int diff = target - nums[i]; if(map.containsKey(diff)) return new int[]{map.get(diff), i}; map.put(nums[i], i); } return new int[]{}; } }","cpp":"vector<int> twoSum(vector<int>& nums, int target) { unordered_map<int, int> map; for(int i=0; i<nums.size(); i++){ int diff = target - nums[i]; if(map.count(diff)) return {map[diff], i}; map[nums[i]] = i; } return {}; }","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Single-pass hash table checking complement presence in O(1)."}'::jsonb,
  ARRAY['Maintain a hash map mapping number value to its index.', 'For each number, check if (target - num) is in map.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-two-sum-hash',
  '[2, 7, 11, 15], 9',
  '[0,1]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-two-sum-hash',
  '[3, 2, 4], 6',
  '[1,2]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-two-sum-hash',
  '[3, 3], 6',
  '[0,1]',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Frequency Maps & Sliding Windows (topic-frequency-maps)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-frequency-maps',
  'region-hashing',
  'frequency-maps-sliding-window',
  'Frequency Maps & Sliding Windows',
  'Dynamic Substring Counters & Invariant Windows',
  'hashing',
  2,
  160,
  'Database',
  'Intermediate',
  'Master frequency counting patterns: Group Anagrams, Longest Substring Without Repeating Characters, and Minimum Window Substring.',
  ARRAY['Frequency Counter Pattern', 'Character Frequency Signatures as Keys', 'Sliding Window with Hash Sets / Counts', 'Longest Substring Without Repeating Characters', 'Find All Anagrams in a String']::text[],
  'hash_map',
  '{"whatIsIt":"Frequency maps count occurrences of items. When combined with sliding windows, frequency maps allow expanding and contracting window boundaries dynamically to find optimal substrings in O(N) time.","whyItMatters":"Critical for network packet inspection, text similarity clustering, and NLP token analysis.","intuition":"Think of an expanding rubber band: stretch the right side to capture more items; when a duplicate breaks your rule, shrink the left side until validity is restored.","stepByStep":["1. Maintain left pointer and character index hash map.","2. Expand right pointer: if char was seen at index >= left, slide left = seen[char] + 1.","3. Update seen[char] = right, and record max length (right - left + 1)."],"pseudocode":"let map = new Map(), left = 0, maxLen = 0;\nfor (let right = 0; right < s.length; right++) {\n  if (map.has(s[right]) && map.get(s[right]) >= left) {\n    left = map.get(s[right]) + 1;\n  }\n  map.set(s[right], right);\n  maxLen = Math.max(maxLen, right - left + 1);\n}","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(min(n, alphabet))","explanation":"Both pointers traverse each index at most once."},"commonMistakes":["Not verifying that map.get(char) >= left, causing left pointer to regress backward.","Rescanning the entire substring on duplicate encounters."],"edgeCases":["Empty string","String with all identical characters","String with all distinct characters"],"realWorldApplications":["Log stream deduplication.","Spam keyword density analysis in emails.","Genomic DNA k-mer frequency profiling."],"whenToUse":["Longest/shortest substrings meeting character uniqueness or count constraints."],"whenNotToUse":["Arbitrary non-contiguous subsequences (use DP)."],"relatedAlgorithms":["Minimum Window Substring","Find All Anagrams in String","Permutation in String"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fm-1',
  'topic-frequency-maps',
  'What is the time complexity of grouping N strings of maximum length K using character count tuples as hash keys?',
  NULL,
  'Fixed alphabet size 26.',
  '[{"id":"a","text":"O(N * K) linear with respect to total input characters","isCorrect":true,"explanation":"Counting characters in each string of length K takes O(K), and hashing a 26-element tuple takes O(26) = O(1)."},{"id":"b","text":"O(N * K log K)","isCorrect":false,"explanation":"Sorting each string takes O(K log K); count tuples avoid sorting, taking only O(K)."},{"id":"c","text":"O(N^2 * K)","isCorrect":false,"explanation":"Hash map lookups are O(1), avoiding quadratic comparisons."},{"id":"d","text":"O(2^N)","isCorrect":false,"explanation":"Frequency hashing is linear, not exponential."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fm-2',
  'topic-frequency-maps',
  'In "Longest Substring Without Repeating Characters", how does storing character indices in a hash map optimize window shrinking?',
  NULL,
  'Direct index jumps vs step-by-step increments.',
  '[{"id":"a","text":"It allows jumping the left pointer directly past the previous occurrence of the duplicate character","isCorrect":true,"explanation":"Instead of incrementing left one step at a time, left can jump to max(left, seen[char] + 1)."},{"id":"b","text":"It sorts the substring automatically","isCorrect":false,"explanation":"Hash maps do not sort substrings."},{"id":"c","text":"It reduces memory to zero bytes","isCorrect":false,"explanation":"Storing indices requires O(alphabet) space."},{"id":"d","text":"It prevents hash collisions entirely","isCorrect":false,"explanation":"Internal hash collisions are unaffected."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fm-3',
  'topic-frequency-maps',
  'Why must the count tuple be cast to `tuple(count)` before being used as a dictionary key in Python?',
  NULL,
  'Mutable vs immutable object hashability.',
  '[{"id":"a","text":"Python lists are mutable and unhashable, whereas tuples are immutable and hashable","isCorrect":true,"explanation":"Dictionary keys in Python must implement __hash__, which mutable objects like lists deliberately do not."},{"id":"b","text":"Because tuples use less disk space","isCorrect":false,"explanation":"Disk space is not the constraint in runtime RAM."},{"id":"c","text":"Because lists only accept numbers","isCorrect":false,"explanation":"Lists can hold any objects."},{"id":"d","text":"Tuples sort faster than lists","isCorrect":false,"explanation":"Immutability / hashability is the language requirement."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-fm-4',
  'topic-frequency-maps',
  'In sliding window problem "Find All Anagrams in String", what ensures window comparison runs in O(1) per step?',
  NULL,
  'Add right char, drop left char in O(1).',
  '[{"id":"a","text":"Fixed window size |p| with dynamic character increment/decrement on boundary slides","isCorrect":true,"explanation":"Adding the incoming char and removing the outgoing char updates frequencies in O(1)."},{"id":"b","text":"Regenerating the entire substring every iteration","isCorrect":false,"explanation":"Regenerating takes O(K) per step."},{"id":"c","text":"Sorting the window each time","isCorrect":false,"explanation":"Sorting would make each slide O(K log K)."},{"id":"d","text":"Using a priority queue","isCorrect":false,"explanation":"Priority queues cost O(log K) per slide."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-length-longest-substring',
  'topic-frequency-maps',
  'Longest Substring Without Repeating Characters',
  'Intermediate',
  'Given a string s, find the length of the longest substring without repeating characters.',
  ARRAY['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.']::text[],
  '[{"input":"s = \"abcabcbb\"","output":"3","explanation":"The answer is \"abc\", with the length of 3."},{"input":"s = \"bbbbb\"","output":"1","explanation":"The answer is \"b\", with the length of 1."},{"input":"s = \"pwwkew\"","output":"3","explanation":"The answer is \"wke\", with length 3."}]'::jsonb,
  '{"javascript":"function lengthOfLongestSubstring(s) {\n  // TODO: Return length of longest unique substring\n  return 0;\n}","python":"def lengthOfLongestSubstring(s: str) -> int:\n    # TODO: Return length of longest unique substring\n    return 0","java":"class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // TODO: Longest unique substring\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // TODO: Longest unique substring\n        return 0;\n    }\n};"}'::jsonb,
  'lengthOfLongestSubstring',
  '{"javascript":"function lengthOfLongestSubstring(s) {\n  let map = new Map(), left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right]) && map.get(s[right]) >= left) {\n      left = map.get(s[right]) + 1;\n    }\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}","python":"def lengthOfLongestSubstring(s: str) -> int:\n    char_map = {}\n    left, max_len = 0, 0\n    for right, c in enumerate(s):\n        if c in char_map and char_map[c] >= left:\n            left = char_map[c] + 1\n        char_map[c] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len","java":"class Solution { public int lengthOfLongestSubstring(String s) { Map<Character, Integer> map = new HashMap<>(); int left=0, maxLen=0; for(int right=0; right<s.length(); right++){ char c = s.charAt(right); if(map.containsKey(c) && map.get(c) >= left){ left = map.get(c) + 1; } map.put(c, right); maxLen = Math.max(maxLen, right - left + 1); } return maxLen; } }","cpp":"int lengthOfLongestSubstring(string s) { unordered_map<char, int> map; int left=0, maxLen=0; for(int right=0; right<s.size(); right++){ char c = s[right]; if(map.count(c) && map[c] >= left){ left = map[c] + 1; } map[c] = right; maxLen = max(maxLen, right - left + 1); } return maxLen; }","timeComplexity":"O(n)","spaceComplexity":"O(min(n, m))","explanation":"Sliding window with hash map jump pointers for duplicate skipping."}'::jsonb,
  ARRAY['Store last seen index of each char in map.', 'Slide left boundary when duplicate is within current window.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-length-longest-substring',
  '"abcabcbb"',
  '3',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-length-longest-substring',
  '"bbbbb"',
  '1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-length-longest-substring',
  '"pwwkew"',
  '3',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-length-longest-substring',
  '""',
  '0',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Prefix Sums with Hash Maps (topic-prefix-hashing)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-prefix-hashing',
  'region-hashing',
  'prefix-sums-hash-maps',
  'Prefix Sums with Hash Maps',
  'Subarray Sums, Zero-Sum Equivalences & Modulo K',
  'hashing',
  3,
  200,
  'Database',
  'Advanced',
  'Master the prefix sum + hash map technique: Subarray Sum Equals K, Contiguous Array with 0s and 1s, and Continuous Subarray Sum.',
  ARRAY['Prefix Sum Concept (prefix[j] - prefix[i] = sum(i..j))', 'Subarray Sum Equals K in O(N) Time', 'Initializing Map with {0: 1} Base Case', 'Contiguous Array with Equal 0s and 1s (Transform 0 to -1)', 'Continuous Subarray Sum with Modulo K']::text[],
  'hash_map',
  '{"whatIsIt":"A prefix sum array accumulates totals from index 0. Because sum(i..j) = prefix[j] - prefix[i-1], asking if any subarray equals K is equivalent to checking if prefix[j] - K has appeared previously in our prefix hash map.","whyItMatters":"Essential for financial transaction anomaly detection, seismic signal processing, and audio energy peak tracking.","intuition":"If your bank account was at $100 yesterday and is at $150 today, you earned exactly $50 in between, regardless of how many individual transactions occurred.","stepByStep":["1. Initialize prefix map with {0: 1} to account for subarrays starting at index 0.","2. Maintain running current sum as you iterate through elements.","3. Check if (current_sum - k) exists in map; if so, add its frequency to total count.","4. Record current_sum in prefix map."],"pseudocode":"let count = 0, currSum = 0, map = new Map([[0, 1]]);\nfor (let n of nums) {\n  currSum += n;\n  if (map.has(currSum - k)) count += map.get(currSum - k);\n  map.set(currSum, (map.get(currSum) || 0) + 1);\n}","complexity":{"timeBest":"O(n)","timeAverage":"O(n)","timeWorst":"O(n)","space":"O(n) for prefix frequency table","explanation":"Single linear pass with O(1) hash table queries and updates."},"commonMistakes":["Forgetting to initialize map with {0: 1}, which misses valid subarrays that begin at index 0.","Using two pointers on arrays containing negative numbers (prefix hash maps handle negative numbers effortlessly)."],"edgeCases":["Negative numbers in array","Zero values","k = 0"],"realWorldApplications":["Financial auditing finding transactions matching an exact discrepancy.","Signal analysis finding continuous windows matching target power.","Genomic DNA GC-content balance tracking."],"whenToUse":["Subarrays summing to k or divisible by k, especially with negative numbers."],"whenNotToUse":["Non-contiguous combinations (use Backtracking or DP)."],"relatedAlgorithms":["Contiguous Array","Continuous Subarray Sum","Two Sum"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ph-1',
  'topic-prefix-hashing',
  'Why is it mandatory to initialize the prefix frequency map with `{0: 1}` before scanning the array in "Subarray Sum Equals K"?',
  NULL,
  'What if the prefix sum from index 0 itself equals k?',
  '[{"id":"a","text":"To account for valid subarrays that start at index 0 where prefix_sum == k","isCorrect":true,"explanation":"If the prefix sum itself reaches k at index i, prefix_sum - k = 0. Without {0: 1}, that prefix subarray would be missed."},{"id":"b","text":"To prevent zero-division in Python","isCorrect":false,"explanation":"No division happens in subarray sum computation."},{"id":"c","text":"Because 0 is the smallest integer","isCorrect":false,"explanation":"Arrays can contain negative integers."},{"id":"d","text":"To mark the array as non-empty","isCorrect":false,"explanation":"Array length is checked independently."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ph-2',
  'topic-prefix-hashing',
  'In "Contiguous Array with equal number of 0s and 1s", what transformation reduces the problem to finding the longest subarray with sum = 0?',
  NULL,
  'How can equal counts cancel out to 0?',
  '[{"id":"a","text":"Treat every 0 as -1 and every 1 as +1","isCorrect":true,"explanation":"When 0 is replaced by -1, an equal number of 0s and 1s sum to exactly 0, allowing prefix sum matching."},{"id":"b","text":"Multiply all 0s by 2","isCorrect":false,"explanation":"0 * 2 remains 0."},{"id":"c","text":"Sort the array initially","isCorrect":false,"explanation":"Sorting destroys contiguous subarray adjacency."},{"id":"d","text":"Invert every second number","isCorrect":false,"explanation":"Arbitrary inversion corrupts the equality condition."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ph-3',
  'topic-prefix-hashing',
  'What is the time complexity of finding total subarrays summing to K using brute force vs prefix sum hash map?',
  NULL,
  'Pairs of indices vs single pass with hash table.',
  '[{"id":"a","text":"Brute force is O(N^2); Prefix hash map is O(N)","isCorrect":true,"explanation":"Brute force tests all O(N^2) pairs; hash map looks up (current_sum - k) in O(1) during a single O(N) pass."},{"id":"b","text":"Brute force is O(N log N); Hash map is O(1)","isCorrect":false,"explanation":"Checking all pairs is O(N^2), and scanning N elements is O(N)."},{"id":"c","text":"Both are O(N)","isCorrect":false,"explanation":"Brute force requires nested loops."},{"id":"d","text":"Brute force is O(2^N)","isCorrect":false,"explanation":"Subarrays are contiguous, so there are N*(N+1)/2 = O(N^2) subarrays, not 2^N."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-ph-4',
  'topic-prefix-hashing',
  'In Continuous Subarray Sum (sum is multiple of k of size >= 2), why do we store the FIRST index where remainder was seen instead of frequency count?',
  NULL,
  'Verifying length >= 2 condition.',
  '[{"id":"a","text":"To maximize subarray length and verify that (current_index - first_seen_index) >= 2","isCorrect":true,"explanation":"We need to verify length >= 2; keeping the earliest index maximizes the chance of satisfying the length requirement."},{"id":"b","text":"Because frequencies cannot be stored in dictionaries","isCorrect":false,"explanation":"Dictionaries can store any values."},{"id":"c","text":"To sort remainder values","isCorrect":false,"explanation":"Remainders are not sorted."},{"id":"d","text":"Because k could be negative","isCorrect":false,"explanation":"Modulo math is handled non-negatively regardless."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-subarray-sum-k',
  'topic-prefix-hashing',
  'Subarray Sum Equals K',
  'Advanced',
  'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.',
  ARRAY['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7']::text[],
  '[{"input":"nums = [1,1,1], k = 2","output":"2","explanation":"Subarrays [1,1] at [0..1] and [1..2]."},{"input":"nums = [1,2,3], k = 3","output":"2","explanation":"[1,2] and [3]."}]'::jsonb,
  '{"javascript":"function subarraySum(nums, k) {\n  // TODO: Return count of subarrays summing to k in O(n)\n  return 0;\n}","python":"def subarraySum(nums, k: int) -> int:\n    # TODO: Return count of subarrays summing to k in O(n)\n    return 0","java":"class Solution {\n    public int subarraySum(int[] nums, int k) {\n        // TODO: Subarray sum equals k\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        // TODO: Subarray sum equals k\n        return 0;\n    }\n};"}'::jsonb,
  'subarraySum',
  '{"javascript":"function subarraySum(nums, k) {\n  let count = 0, curr = 0, map = new Map([[0, 1]]);\n  for (let n of nums) {\n    curr += n;\n    if (map.has(curr - k)) count += map.get(curr - k);\n    map.set(curr, (map.get(curr) || 0) + 1);\n  }\n  return count;\n}","python":"def subarraySum(nums, k: int) -> int:\n    count, curr = 0, 0\n    prefix_counts = {0: 1}\n    for n in nums:\n        curr += n\n        diff = curr - k\n        if diff in prefix_counts:\n            count += prefix_counts[diff]\n        prefix_counts[curr] = prefix_counts.get(curr, 0) + 1\n    return count","java":"class Solution { public int subarraySum(int[] nums, int k) { int count=0, curr=0; Map<Integer, Integer> map = new HashMap<>(); map.put(0, 1); for(int n: nums){ curr += n; if(map.containsKey(curr - k)) count += map.get(curr - k); map.put(curr, map.getOrDefault(curr, 0) + 1); } return count; } }","cpp":"int subarraySum(vector<int>& nums, int k) { int count=0, curr=0; unordered_map<int, int> map; map[0] = 1; for(int n: nums){ curr += n; if(map.count(curr - k)) count += map[curr - k]; map[curr]++; } return count; }","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Linear scan accumulating prefix sums with O(1) hash map lookups."}'::jsonb,
  ARRAY['Maintain running prefix sum.', 'Check if (curr_sum - k) is in prefix map.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-subarray-sum-k',
  '[1, 1, 1], 2',
  '2',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-subarray-sum-k',
  '[1, 2, 3], 3',
  '2',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-subarray-sum-k',
  '[1, -1, 0], 0',
  '3',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Trie (Prefix Tree) Architecture (topic-trie-autocomplete)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-trie-autocomplete',
  'region-tries-strings',
  'trie-prefix-tree',
  'Trie (Prefix Tree) Architecture',
  'Node Pointers, StartsWith Prefix Queries & Wildcard Search',
  'strings',
  1,
  140,
  'Terminal',
  'Beginner',
  'Build and query Trie data structures: insert, search, startsWith prefix queries, and memory trade-offs.',
  ARRAY['Trie Node Structure & Pointer Arrays', 'Insert Word into Trie (O(L) time)', 'Search Exact Word vs StartsWith Prefix', 'Word Dictionary with Wildcard "." Searching', 'Compressed Radix / Patricia Trie Concepts']::text[],
  'tree',
  '{"whatIsIt":"A Trie (pronounced \"try\" or \"tree\") is a tree data structure used for storing strings where keys are usually words. Unlike a binary search tree, no node in the tree stores the key associated with that node; instead, its position in the tree defines the associated key.","whyItMatters":"Powers search engine autocomplete query suggestions, IP network routing table lookups, and spell-checking dictionary validations.","intuition":"Think of looking up words in an encyclopedia thumb index: you flip to the tab for \"C\", then follow letters \"A\", then \"T\" to reach \"CAT\".","stepByStep":["1. Create a root TrieNode containing an empty children map/array and isEndOfWord = false.","2. Insert: for each character, if not in children, create new TrieNode and descend; mark last node as end-of-word.","3. Search: descend character by character; return true only if all characters exist and final node has isEndOfWord = true.","4. StartsWith: descend character by character; return true if path exists regardless of isEndOfWord."],"pseudocode":"class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\nfunction insert(word) {\n  let curr = root;\n  for (let c of word) {\n    if (!curr.children[c]) curr.children[c] = new TrieNode();\n    curr = curr.children[c];\n  }\n  curr.isEnd = true;\n}","complexity":{"timeBest":"O(L)","timeAverage":"O(L)","timeWorst":"O(L)","space":"O(N * L * AlphabetSize)","explanation":"Operations depend strictly on word length L, independent of total words N."},"commonMistakes":["Confusing search(word) with startsWith(prefix): search must check isEndOfWord flag.","Creating 26-element arrays for unicode characters instead of using hash maps."],"edgeCases":["Empty prefix / empty word","Single character words","Inserting duplicate words"],"realWorldApplications":["Search engine autocomplete suggestions (Google search bar).","IP network prefix routing (CIDR longest prefix matching).","T9 predictive text and smartphone autocorrect keyboards."],"whenToUse":["Prefix queries, autocomplete, dictionary word lookups."],"whenNotToUse":["Exact match only with no prefix operations (use standard Hash Set O(1))."],"relatedAlgorithms":["KMP","Aho-Corasick","Suffix Tree"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tr-1',
  'topic-trie-autocomplete',
  'What is the time complexity of searching for a word of length L in a Trie holding 1,000,000 words?',
  NULL,
  'Does the depth of Trie exceed the word length?',
  '[{"id":"a","text":"O(L) time, depending only on the length of the query string and independent of 1,000,000 words","isCorrect":true,"explanation":"At each character, we make an O(1) step down the matching edge, taking exactly L steps."},{"id":"b","text":"O(log 1,000,000)","isCorrect":false,"explanation":"Logarithmic search applies to binary search trees of numbers, not Tries."},{"id":"c","text":"O(1,000,000 * L)","isCorrect":false,"explanation":"Linear scan through all words is naive, which Tries eliminate."},{"id":"d","text":"O(L^2)","isCorrect":false,"explanation":"Trie navigation does not require nested loops."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tr-2',
  'topic-trie-autocomplete',
  'What distinguishes `search(word)` from `startsWith(prefix)` in a Trie?',
  NULL,
  'Is "app" a prefix or a complete word?',
  '[{"id":"a","text":"search requires the final node to have isEndOfWord == True, while startsWith only requires the path to exist","isCorrect":true,"explanation":"Prefix matching only verifies character existence, whereas word matching confirms that the node terminates a complete stored word."},{"id":"b","text":"startsWith runs in O(N^2) while search is O(1)","isCorrect":false,"explanation":"Both run in identical O(L) time."},{"id":"c","text":"search only works for palindromes","isCorrect":false,"explanation":"Search works for any valid word."},{"id":"d","text":"startsWith deletes the matched prefix","isCorrect":false,"explanation":"startsWith is a read-only query."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tr-3',
  'topic-trie-autocomplete',
  'What optimization does a Compressed Trie (Radix Tree / Patricia Tree) introduce over a standard Trie?',
  NULL,
  'Collapsing single-child chains.',
  '[{"id":"a","text":"Merges single-child descendant nodes into single edges containing multi-character substring labels","isCorrect":true,"explanation":"Chains of single-child nodes are compacted into a single edge, significantly reducing total node count and pointer overhead."},{"id":"b","text":"Removes the root node","isCorrect":false,"explanation":"Radix trees retain the root node."},{"id":"c","text":"Converts all letters to upper-case","isCorrect":false,"explanation":"Case conversion does not compress structure."},{"id":"d","text":"Discards words longer than 5 letters","isCorrect":false,"explanation":"No words are discarded."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-tr-4',
  'topic-trie-autocomplete',
  'How do you handle wildcard "." characters matching any letter in a Trie word search?',
  NULL,
  'Explore all available child branches.',
  '[{"id":"a","text":"Branch recursively through all existing children of the current node and return True if any branch succeeds","isCorrect":true,"explanation":"When wildcard \".\" is met, explore all non-null child edges recursively."},{"id":"b","text":"Skip the character without moving down the tree","isCorrect":false,"explanation":"Wildcard corresponds to exactly one unknown character, requiring moving one level down."},{"id":"c","text":"Return False immediately","isCorrect":false,"explanation":"Valid matches may exist through existing child paths."},{"id":"d","text":"Sort the children alphabetically and pick the middle one","isCorrect":false,"explanation":"Arbitrary child selection misses valid matches."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-trie-implementation',
  'topic-trie-autocomplete',
  'Implement Trie (Prefix Tree)',
  'Intermediate',
  'A trie or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith methods.',
  ARRAY['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters.']::text[],
  '[{"input":"insert(\"apple\"), search(\"apple\"), search(\"app\"), startsWith(\"app\")","output":"[null, true, false, true]","explanation":"apple is in trie; app is prefix only."}]'::jsonb,
  '{"javascript":"class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEnd = false;\n  }\n}\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) { /* TODO */ }\n  search(word) { /* TODO */ return false; }\n  startsWith(prefix) { /* TODO */ return false; }\n}","python":"class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word: str) -> None:\n        # TODO\n        pass\n    def search(self, word: str) -> bool:\n        # TODO\n        return False\n    def startsWith(self, prefix: str) -> bool:\n        # TODO\n        return False","java":"class Trie { public Trie() {} public void insert(String word) {} public boolean search(String word) { return false; } public boolean startsWith(String prefix) { return false; } }","cpp":"class Trie { public: Trie() {} void insert(string word) {} bool search(string word) { return false; } bool startsWith(string prefix) { return false; } };"}'::jsonb,
  'Trie',
  '{"javascript":"class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let curr = this.root;\n    for (let c of word) {\n      if (!curr.children[c]) curr.children[c] = new TrieNode();\n      curr = curr.children[c];\n    }\n    curr.isEnd = true;\n  }\n  search(word) {\n    let curr = this.root;\n    for (let c of word) {\n      if (!curr.children[c]) return false;\n      curr = curr.children[c];\n    }\n    return curr.isEnd;\n  }\n  startsWith(prefix) {\n    let curr = this.root;\n    for (let c of prefix) {\n      if (!curr.children[c]) return false;\n      curr = curr.children[c];\n    }\n    return true;\n  }\n}","python":"class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word: str) -> None:\n        curr = self.root\n        for c in word:\n            if c not in curr.children: curr.children[c] = TrieNode()\n            curr = curr.children[c]\n        curr.is_end = True\n    def search(self, word: str) -> bool:\n        curr = self.root\n        for c in word:\n            if c not in curr.children: return False\n            curr = curr.children[c]\n        return curr.is_end\n    def startsWith(self, prefix: str) -> bool:\n        curr = self.root\n        for c in prefix:\n            if c not in curr.children: return False\n            curr = curr.children[c]\n        return True","java":"class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isEnd = false; } class Trie { private TrieNode root = new TrieNode(); public void insert(String word) { TrieNode curr = root; for(char c: word.toCharArray()){ int i = c - \"a\"; if(curr.children[i] == null) curr.children[i] = new TrieNode(); curr = curr.children[i]; } curr.isEnd = true; } public boolean search(String word) { TrieNode curr = root; for(char c: word.toCharArray()){ int i = c - \"a\"; if(curr.children[i] == null) return false; curr = curr.children[i]; } return curr.isEnd; } public boolean startsWith(String prefix) { TrieNode curr = root; for(char c: prefix.toCharArray()){ int i = c - \"a\"; if(curr.children[i] == null) return false; curr = curr.children[i]; } return true; } }","cpp":"struct TrieNode { TrieNode* children[26] = {nullptr}; bool isEnd = false; }; class Trie { private: TrieNode* root = new TrieNode(); public: void insert(string word) { TrieNode* curr = root; for(char c: word){ if(!curr->children[c-''a'']) curr->children[c-''a''] = new TrieNode(); curr = curr->children[c-''a'']; } curr->isEnd = true; } bool search(string word) { TrieNode* curr = root; for(char c: word){ if(!curr->children[c-''a'']) return false; curr = curr->children[c-''a'']; } return curr->isEnd; } bool startsWith(string prefix) { TrieNode* curr = root; for(char c: prefix){ if(!curr->children[c-''a'']) return false; curr = curr->children[c-''a'']; } return true; } };","timeComplexity":"O(L) per operation","spaceComplexity":"O(N * L)","explanation":"M-ary prefix tree offering deterministic O(L) insert and retrieval."}'::jsonb,
  ARRAY['In insert: traverse node.children creating nodes as needed; mark is_end = true.', 'In search: check all chars exist and node.is_end is true.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-trie-implementation',
  'insert("apple"), search("apple"), search("app"), startsWith("app")',
  '[null, true, false, true]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-trie-implementation',
  'insert("banana"), startsWith("ban"), search("ban")',
  '[null, true, false]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: KMP & Rabin-Karp Matching (topic-string-matching-kmp)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-string-matching-kmp',
  'region-tries-strings',
  'kmp-rabin-karp-matching',
  'KMP & Rabin-Karp Matching',
  'Longest Prefix Suffix (LPS) Array & Rolling Hashes',
  'strings',
  2,
  200,
  'Terminal',
  'Advanced',
  'Master linear string pattern matching algorithms: the Knuth-Morris-Pratt failure function (LPS) and Rabin-Karp polynomial rolling hashes.',
  ARRAY['Naive String Matching O(N * M) Pitfalls', 'Knuth-Morris-Pratt (KMP) Algorithm & LPS Array Construction', 'KMP Search Phase in O(N + M) Time', 'Rabin-Karp Rolling Hash & Polynomial Modulo', 'Spurious Hash Collisions Handling']::text[],
  'general',
  '{"whatIsIt":"KMP achieves linear time O(N + M) pattern matching by preprocessing the pattern into an LPS (Longest Prefix Suffix) array. When a mismatch occurs, LPS determines the maximum shift without regressing the text pointer.","whyItMatters":"Essential for network intrusion detection engines (Snort), genome sequence search (FASTA/BLAST), and text editors.","intuition":"If you have matched \"ABCDABC\" and fail on the next character, you don''t need to restart from the beginning: you already know the prefix \"ABC\" matches the end of what you just saw.","stepByStep":["1. Build LPS array: lps[i] stores the length of the longest proper prefix of pattern[0..i] that matches a suffix of pattern[0..i].","2. Align pattern with text using pointers i (text) and j (pattern).","3. If characters match: increment both i and j.","4. If mismatch: if j > 0, set j = lps[j-1]; else increment i."],"pseudocode":"let lps = buildLPS(pattern), i = 0, j = 0;\nwhile (i < text.length) {\n  if (text[i] === pattern[j]) { i++; j++; }\n  else {\n    if (j > 0) j = lps[j - 1];\n    else i++;\n  }\n  if (j === pattern.length) return i - j;\n}","complexity":{"timeBest":"O(n + m)","timeAverage":"O(n + m)","timeWorst":"O(n + m)","space":"O(m) for the LPS table","explanation":"Text pointer i strictly moves forward without rolling back."},"commonMistakes":["Rolling back the text pointer on mismatch, destroying O(n) linear performance.","Off-by-one errors in LPS array construction."],"edgeCases":["Pattern longer than text","Pattern consists of single repeated character (\"AAAA\")","Empty pattern"],"realWorldApplications":["Packet payload inspection in network firewalls.","DNA motif identification in computational biology.","Ctrl+F search implementations in text editors."],"whenToUse":["Exact pattern matching in single texts where backtracking is unacceptable."],"whenNotToUse":["Multiple patterns simultaneously (use Aho-Corasick)."],"relatedAlgorithms":["Boyer-Moore","Rabin-Karp","Aho-Corasick"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kmp-1',
  'topic-string-matching-kmp',
  'For pattern "ABABCABAB", what is the LPS array?',
  NULL,
  'Trace matching prefixes and suffixes.',
  '[{"id":"a","text":"[0, 0, 1, 2, 0, 1, 2, 3, 4]","isCorrect":true,"explanation":"Self-overlap analysis: \"A\"=0, \"AB\"=0, \"ABA\"=1, \"ABAB\"=2, \"ABABC\"=0, \"ABABCA\"=1, \"ABABCAB\"=2, \"ABABCABA\"=3, \"ABABCABAB\"=4."},{"id":"b","text":"[0, 1, 2, 3, 4, 5, 6, 7, 8]","isCorrect":false,"explanation":"That would imply every prefix matches every suffix, which is false."},{"id":"c","text":"[0, 0, 0, 0, 0, 0, 0, 0, 0]","isCorrect":false,"explanation":"Repeated sub-patterns \"AB\" and \"ABA\" provide non-zero prefix-suffix matches."},{"id":"d","text":"[1, 2, 3, 4, 5, 6, 7, 8, 9]","isCorrect":false,"explanation":"Proper prefixes exclude the full string."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kmp-2',
  'topic-string-matching-kmp',
  'In Rabin-Karp algorithm, how is the rolling hash updated when sliding the window by 1 character in O(1)?',
  NULL,
  'Horner polynomial shift trick.',
  '[{"id":"a","text":"Subtract the outgoing leftmost character multiplied by base^(M-1), multiply by base, and add the new character","isCorrect":true,"explanation":"Rolling hash maintains mathematical Horner evaluation in O(1) without re-hashing all M characters from scratch."},{"id":"b","text":"Recompute the SHA-256 hash of the whole window","isCorrect":false,"explanation":"Recomputing hash of M characters takes O(M)."},{"id":"c","text":"XOR the entire text with the pattern","isCorrect":false,"explanation":"XOR does not preserve positional string order."},{"id":"d","text":"Sort characters in the window","isCorrect":false,"explanation":"Sorting takes O(M log M) and alters order."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kmp-3',
  'topic-string-matching-kmp',
  'What is a "spurious hit" in Rabin-Karp?',
  NULL,
  'Hash collision between distinct strings.',
  '[{"id":"a","text":"When the rolling hash matches the pattern hash, but character-by-character comparison reveals the strings are actually different (hash collision)","isCorrect":true,"explanation":"Due to modulo arithmetic, two distinct strings can hash to the same value; explicit comparison verifies true matches."},{"id":"b","text":"When a pattern matches at multiple locations","isCorrect":false,"explanation":"Multiple valid matches are expected, not spurious."},{"id":"c","text":"When the search fails due to memory exhaustion","isCorrect":false,"explanation":"Out of memory is not a spurious hit."},{"id":"d","text":"When the pattern contains invalid Unicode characters","isCorrect":false,"explanation":"Encoding issues are distinct from hash collisions."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-kmp-4',
  'topic-string-matching-kmp',
  'What is the worst-case time complexity of Naive string search when searching pattern `A...AB` in text `A...A`?',
  NULL,
  'N outer positions times M comparisons each.',
  '[{"id":"a","text":"O(N * M) quadratic time","isCorrect":true,"explanation":"Every position in the text matches M-1 characters before failing on the last character, triggering N shifts with M comparisons each."},{"id":"b","text":"O(N + M)","isCorrect":false,"explanation":"O(N + M) is achieved by KMP, not Naive search."},{"id":"c","text":"O(log N)","isCorrect":false,"explanation":"Substrings cannot be found in logarithmic time without indexed Suffix Trees."},{"id":"d","text":"O(2^N)","isCorrect":false,"explanation":"Naive search is bounded by N*M, not exponential."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-str-str',
  'topic-string-matching-kmp',
  'Find the Index of the First Occurrence in String',
  'Intermediate',
  'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. Solve in O(n + m) using KMP.',
  ARRAY['1 <= haystack.length, needle.length <= 10^4', 'haystack and needle consist of only lowercase English characters.']::text[],
  '[{"input":"haystack = \"sadbutsad\", needle = \"sad\"","output":"0","explanation":"\"sad\" occurs at index 0 and 6. The first occurrence is at index 0."},{"input":"haystack = \"leetcode\", needle = \"leeto\"","output":"-1","explanation":"\"leeto\" did not occur in \"leetcode\"."}]'::jsonb,
  '{"javascript":"function strStr(haystack, needle) {\n  // TODO: Implement KMP pattern search in O(n + m)\n  return -1;\n}","python":"def strStr(haystack: str, needle: str) -> int:\n    # TODO: Implement KMP pattern search in O(n + m)\n    return -1","java":"class Solution {\n    public int strStr(String haystack, String needle) {\n        // TODO: KMP in O(n + m)\n        return -1;\n    }\n}","cpp":"class Solution {\npublic:\n    int strStr(string haystack, string needle) {\n        // TODO: KMP in O(n + m)\n        return -1;\n    }\n};"}'::jsonb,
  'strStr',
  '{"javascript":"function strStr(haystack, needle) {\n  if (!needle) return 0;\n  let lps = new Array(needle.length).fill(0);\n  let prev = 0, i = 1;\n  while (i < needle.length) {\n    if (needle[i] === needle[prev]) { lps[i++] = ++prev; }\n    else if (prev === 0) { lps[i++] = 0; }\n    else { prev = lps[prev - 1]; }\n  }\n  let h = 0, n = 0;\n  while (h < haystack.length) {\n    if (haystack[h] === needle[n]) { h++; n++; }\n    else {\n      if (n === 0) h++;\n      else n = lps[n - 1];\n    }\n    if (n === needle.length) return h - needle.length;\n  }\n  return -1;\n}","python":"def strStr(haystack: str, needle: str) -> int:\n    if not needle: return 0\n    lps = [0] * len(needle)\n    prev, i = 0, 1\n    while i < len(needle):\n        if needle[i] == needle[prev]:\n            lps[i] = prev + 1; prev += 1; i += 1\n        elif prev == 0:\n            lps[i] = 0; i += 1\n        else: prev = lps[prev - 1]\n    h, n = 0, 0\n    while h < len(haystack):\n        if haystack[h] == needle[n]: h += 1; n += 1\n        else:\n            if n == 0: h += 1\n            else: n = lps[n - 1]\n        if n == len(needle): return h - len(needle)\n    return -1","java":"class Solution { public int strStr(String haystack, String needle) { if(needle.isEmpty()) return 0; int[] lps = new int[needle.length()]; int prev=0, i=1; while(i < needle.length()){ if(needle.charAt(i) == needle.charAt(prev)) lps[i++] = ++prev; else if(prev == 0) lps[i++] = 0; else prev = lps[prev - 1]; } int h=0, n=0; while(h < haystack.length()){ if(haystack.charAt(h) == needle.charAt(n)){ h++; n++; } else { if(n==0) h++; else n = lps[n - 1]; } if(n == needle.length()) return h - needle.length(); } return -1; } }","cpp":"int strStr(string haystack, string needle) { if(needle.empty()) return 0; vector<int> lps(needle.size(), 0); int prev=0, i=1; while(i < needle.size()){ if(needle[i] == needle[prev]) lps[i++] = ++prev; else if(prev == 0) lps[i++] = 0; else prev = lps[prev - 1]; } int h=0, n=0; while(h < haystack.size()){ if(haystack[h] == needle[n]){ h++; n++; } else { if(n==0) h++; else n = lps[n - 1]; } if(n == needle.size()) return h - needle.size(); } return -1; }","timeComplexity":"O(n + m)","spaceComplexity":"O(m)","explanation":"Knuth-Morris-Pratt pattern matching with linear forward text traversal."}'::jsonb,
  ARRAY['Precompute LPS table for needle.', 'When mismatch occurs, shift needle pointer to lps[j-1].']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-str-str',
  '"sadbutsad", "sad"',
  '0',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-str-str',
  '"leetcode", "leeto"',
  '-1',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-str-str',
  '"hello", "ll"',
  '2',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Palindromic Symmetry & Substrings (topic-palindromes-strings)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-palindromes-strings',
  'region-tries-strings',
  'palindromes-strings',
  'Palindromic Symmetry & Substrings',
  'Expand Around Center, Palindromic Count & Symmetries',
  'strings',
  3,
  180,
  'Terminal',
  'Advanced',
  'Master palindrome algorithms: two pointers, expand around center, dynamic programming tables, and Palindromic Substrings count.',
  ARRAY['Palindrome Symmetry Properties', 'Valid Palindrome (Two Pointers)', 'Expand Around Center (Odd & Even Length Centers)', 'Count Palindromic Substrings in O(N^2) Time & O(1) Space', 'Manacher''s Algorithm Introduction (O(N) Palindromes)']::text[],
  'general',
  '{"whatIsIt":"A palindrome reads the same forwards and backwards. Every palindrome has a center: odd-length palindromes expand around a single character (s[i]), while even-length palindromes expand around the space between two adjacent characters (s[i], s[i+1]).","whyItMatters":"Foundational for DNA restriction enzyme recognition site detection, cryptographic sequence hashes, and natural language analytics.","intuition":"Think of looking at your reflection in a lake: mirror symmetry radiates outward from the reflective surface.","stepByStep":["1. Loop through all 2N - 1 possible centers.","2. For each center, expand outward while s[left] === s[right].","3. Record maximum length or accumulate total valid palindrome counts."],"pseudocode":"let count = 0;\nfunction expand(l, r) {\n  while (l >= 0 && r < s.length && s[l] === s[r]) { count++; l--; r++; }\n}\nfor (let i = 0; i < s.length; i++) {\n  expand(i, i); // Odd\n  expand(i, i + 1); // Even\n}","complexity":{"timeBest":"O(n^2)","timeAverage":"O(n^2)","timeWorst":"O(n^2)","space":"O(1)","explanation":"2N - 1 centers expanded outward in constant extra memory."},"commonMistakes":["Checking only odd-length centers and omitting even-length palindromes like \"abba\".","Using 2D DP requiring O(n^2) space when O(1) space expansion suffices."],"edgeCases":["Single character string (always a palindrome)","String with all identical characters","No palindromes longer than 1"],"realWorldApplications":["Restriction enzyme cleavage site recognition in DNA genomics.","Data block mirroring and error-correcting codes.","NLP phonological palindromic verse analysis."],"whenToUse":["Palindromic substring identification and verification."],"whenNotToUse":["Arbitrary string reversals (use Two Pointers)."],"relatedAlgorithms":["Manacher''s Algorithm","Valid Palindrome II","Longest Palindromic Subsequence"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-pal-1',
  'topic-palindromes-strings',
  'How many potential centers of expansion exist in a string of length N when searching for palindromes?',
  NULL,
  'N characters plus N - 1 spaces between them.',
  '[{"id":"a","text":"2N - 1 centers (N odd-length centers and N - 1 even-length centers)","isCorrect":true,"explanation":"Each character is an odd center (N), and each space between adjacent characters is an even center (N-1), totaling 2N - 1."},{"id":"b","text":"Exactly N centers","isCorrect":false,"explanation":"Ignores even-length palindromes like \"abba\"."},{"id":"c","text":"N^2 centers","isCorrect":false,"explanation":"There are O(N^2) potential substrings, but only 2N - 1 centers of expansion."},{"id":"d","text":"N / 2 centers","isCorrect":false,"explanation":"Every index and space can be a center."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-pal-2',
  'topic-palindromes-strings',
  'Why is the Expand Around Center approach preferred over 2D Dynamic Programming for Longest Palindromic Substring?',
  NULL,
  'O(1) memory vs O(N^2) memory table.',
  '[{"id":"a","text":"It requires O(1) auxiliary space compared to O(N^2) space for the 2D DP table while maintaining the same O(N^2) time","isCorrect":true,"explanation":"Both run in O(N^2) time, but Expand Around Center uses constant memory, avoiding massive memory allocation for long strings."},{"id":"b","text":"Because 2D DP cannot detect even-length palindromes","isCorrect":false,"explanation":"2D DP detects both odd and even palindromes."},{"id":"c","text":"Because Expand Around Center works on unsorted numbers","isCorrect":false,"explanation":"Both algorithms operate on strings."},{"id":"d","text":"Because DP has exponential O(2^N) time","isCorrect":false,"explanation":"DP table takes polynomial O(N^2) time."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-pal-3',
  'topic-palindromes-strings',
  'What preprocessing transformation does Manacher''s algorithm apply to strings?',
  NULL,
  'Inserting guard characters between letters.',
  '[{"id":"a","text":"Inserts special delimiter characters (e.g., \"#\") between every character and at the boundaries","isCorrect":true,"explanation":"Inserting delimiters (e.g. \"aba\" -> \"#a#b#a#\") unifies odd and even palindromes so every palindrome becomes odd-length around a single center."},{"id":"b","text":"Reverses the string in place","isCorrect":false,"explanation":"Reversing does not unify centers."},{"id":"c","text":"Converts the string into a binary tree","isCorrect":false,"explanation":"Manacher''s operates on linear arrays."},{"id":"d","text":"Removes all vowels","isCorrect":false,"explanation":"Removing characters alters the original text."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-pal-4',
  'topic-palindromes-strings',
  'In "Valid Palindrome II" (can delete at most one character), what should you do when s[left] != s[right]?',
  NULL,
  'Try skipping either the left character or the right character.',
  '[{"id":"a","text":"Check if s[left+1...right] is a palindrome OR if s[left...right-1] is a palindrome","isCorrect":true,"explanation":"Since you have one deletion allowance, test deleting either s[left] or s[right]. If either remaining slice is palindromic, return True."},{"id":"b","text":"Restart the entire search from left = 0","isCorrect":false,"explanation":"Restarting repeats matched boundaries."},{"id":"c","text":"Return False immediately","isCorrect":false,"explanation":"Fails to test the single allowed deletion."},{"id":"d","text":"Delete both characters and continue","isCorrect":false,"explanation":"The problem allows at most one deletion, not two."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-count-substrings',
  'topic-palindromes-strings',
  'Count Palindromic Substrings',
  'Intermediate',
  'Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.',
  ARRAY['1 <= s.length <= 1000', 's consists of lowercase English letters.']::text[],
  '[{"input":"s = \"abc\"","output":"3","explanation":"Three palindromic strings: \"a\", \"b\", \"c\"."},{"input":"s = \"aaa\"","output":"6","explanation":"Six palindromic strings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"."}]'::jsonb,
  '{"javascript":"function countSubstrings(s) {\n  // TODO: Count all palindromic substrings\n  return 0;\n}","python":"def countSubstrings(s: str) -> int:\n    # TODO: Count all palindromic substrings\n    return 0","java":"class Solution {\n    public int countSubstrings(String s) {\n        // TODO: Count palindromes\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int countSubstrings(string s) {\n        // TODO: Count palindromes\n        return 0;\n    }\n};"}'::jsonb,
  'countSubstrings',
  '{"javascript":"function countSubstrings(s) {\n  let count = 0;\n  function expand(l, r) {\n    let c = 0;\n    while (l >= 0 && r < s.length && s[l] === s[r]) { c++; l--; r++; }\n    return c;\n  }\n  for (let i = 0; i < s.length; i++) {\n    count += expand(i, i);\n    count += expand(i, i + 1);\n  }\n  return count;\n}","python":"def countSubstrings(s: str) -> int:\n    count = 0\n    def expand(l, r):\n        c = 0\n        while l >= 0 and r < len(s) and s[l] == s[r]: c += 1; l -= 1; r += 1\n        return c\n    for i in range(len(s)):\n        count += expand(i, i)\n        count += expand(i, i + 1)\n    return count","java":"class Solution { public int countSubstrings(String s) { int count=0; for(int i=0; i<s.length(); i++){ count += expand(s, i, i); count += expand(s, i, i+1); } return count; } private int expand(String s, int l, int r){ int c=0; while(l>=0 && r<s.length() && s.charAt(l)==s.charAt(r)){ c++; l--; r++; } return c; } }","cpp":"int countSubstrings(string s) { int count=0; auto expand = [&](int l, int r){ int c=0; while(l>=0 && r<s.size() && s[l]==s[r]){ c++; l--; r++; } return c; }; for(int i=0; i<s.size(); i++){ count += expand(i, i); count += expand(i, i+1); } return count; }","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"Iterates through all 2N - 1 expansion centers counting symmetric matches."}'::jsonb,
  ARRAY['Expand around odd centers (i, i) and even centers (i, i+1).', 'Each match increases count by 1.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-count-substrings',
  '"abc"',
  '3',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-count-substrings',
  '"aaa"',
  '6',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-count-substrings',
  '"a"',
  '1',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Disjoint Set Union (Union-Find) (topic-union-find-dsu)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-union-find-dsu',
  'region-advanced-ds',
  'disjoint-set-union',
  'Disjoint Set Union (Union-Find)',
  'Path Compression, Union by Rank & Kruskal''s MST',
  'advanced',
  1,
  160,
  'Layers',
  'Intermediate',
  'Master the Disjoint Set Union (DSU) data structure: path compression, union by rank, cycle detection, and Kruskal''s MST.',
  ARRAY['Disjoint Set Representation (Parent Array)', 'Find Operation & Path Compression Recursive Flatenning', 'Union by Rank / Size', 'Inverse Ackermann Time Complexity O(alpha(N))', 'Cycle Detection in Undirected Graphs']::text[],
  'graph',
  '{"whatIsIt":"Disjoint Set Union (DSU) tracks elements partitioned into disjoint subsets. It supports two primary operations: find(x) returns the representative/root of the subset containing x, and union(x, y) merges the subsets containing x and y.","whyItMatters":"Powers social network friend circle clustering, Kruskal''s Minimum Spanning Tree, and image segmentation algorithms.","intuition":"Think of kingdoms forming alliances: instead of remembering every border, everyone acknowledges the High King; when two kingdoms merge, one High King bows to the other.","stepByStep":["1. Initialize parent array where parent[i] = i.","2. Find(x): if parent[x] != x, recursively set parent[x] = find(parent[x]) (path compression).","3. Union(x, y): find root of x and y; if roots differ, attach smaller rank tree under larger."],"pseudocode":"function find(x) {\n  if (parent[x] !== x) parent[x] = find(parent[x]);\n  return parent[x];\n}\nfunction union(x, y) {\n  let rx = find(x), ry = find(y);\n  if (rx === ry) return false;\n  parent[rx] = ry;\n  return true;\n}","complexity":{"timeBest":"O(1) amortized","timeAverage":"O(alpha(n))","timeWorst":"O(alpha(n))","space":"O(n) for parent and rank arrays","explanation":"Inverse Ackermann alpha(n) is <= 4 for all practical universe inputs."},"commonMistakes":["Forgetting path compression, causing trees to degenerate into linear chains.","Applying DSU to directed graphs (directed cycle detection requires DFS / Kahn''s)."],"edgeCases":["Graph with no edges","Self-loops","Graph already forming a single connected component"],"realWorldApplications":["Social network mutual friend circle grouping.","Percolation theory and material permeability simulation.","Kruskal''s Minimum Spanning Tree in network layout routing."],"whenToUse":["Dynamic connectivity, incremental cycle detection, minimum spanning trees."],"whenNotToUse":["Path finding or shortest paths (use BFS / Dijkstra)."],"relatedAlgorithms":["Kruskal''s MST","Connected Components","Redundant Connection"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dsu-1',
  'topic-union-find-dsu',
  'What does "path compression" do during a `find(x)` operation in DSU?',
  NULL,
  'Flattening tree height on the way back up.',
  '[{"id":"a","text":"Points every node along the lookup traversal path directly to the root representative","isCorrect":true,"explanation":"Recursive path compression reassigns parent pointers directly to the root, flattening the tree so future lookups take O(1)."},{"id":"b","text":"Deletes disconnected nodes from memory","isCorrect":false,"explanation":"No nodes are deleted."},{"id":"c","text":"Reverses the direction of all graph edges","isCorrect":false,"explanation":"DSU parent pointers are internal tree pointers, not graph edges."},{"id":"d","text":"Compresses string node labels using gzip","isCorrect":false,"explanation":"Path compression refers to tree height flattening."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dsu-2',
  'topic-union-find-dsu',
  'In Kruskal''s Minimum Spanning Tree algorithm, how is DSU utilized?',
  NULL,
  'Checking whether two endpoints are already connected.',
  '[{"id":"a","text":"To greedily add the lowest-weight edges while preventing cycle creation","isCorrect":true,"explanation":"If find(u) != find(v), adding edge (u, v) cannot create a cycle; we union them and include the edge in the MST."},{"id":"b","text":"To sort the edge list in descending order","isCorrect":false,"explanation":"Sorting is performed before DSU is applied."},{"id":"c","text":"To compute all-pairs shortest paths","isCorrect":false,"explanation":"All-pairs shortest paths uses Floyd-Warshall, not DSU."},{"id":"d","text":"To count bipartite partitions","isCorrect":false,"explanation":"Bipartition uses 2-coloring."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dsu-3',
  'topic-union-find-dsu',
  'What happens if you use DSU WITHOUT path compression and WITHOUT union by rank?',
  NULL,
  'Degenerating into a line of depth N.',
  '[{"id":"a","text":"Trees can degenerate into linear linked lists of depth N, degrading operations to O(N)","isCorrect":true,"explanation":"Successive unconstrained unions can chain elements sequentially: 1->2->3->...->N, making find() O(N)."},{"id":"b","text":"The program crashes immediately with a syntax error","isCorrect":false,"explanation":"It is syntactically valid but asymptotically inefficient."},{"id":"c","text":"Find operations run in O(1)","isCorrect":false,"explanation":"Without compression, depth can be linear."},{"id":"d","text":"The data structure becomes a B-Tree","isCorrect":false,"explanation":"B-Trees require explicit node balancing algorithms."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-dsu-4',
  'topic-union-find-dsu',
  'Can standard DSU detect cycles in a DIRECTED graph?',
  NULL,
  'Does DSU care about arrow directions?',
  '[{"id":"a","text":"No, standard DSU detects cycles in undirected graphs; directed cycles require DFS (3-color) or Kahn''s algorithm","isCorrect":true,"explanation":"In a directed graph, edges have orientation; two paths meeting at a node form a diamond, not necessarily a directed cycle."},{"id":"b","text":"Yes, DSU works identically on directed graphs","isCorrect":false,"explanation":"Standard union treats edges symmetrically, causing false positives in directed graphs."},{"id":"c","text":"Yes, but only if all weights are 1","isCorrect":false,"explanation":"Weights do not resolve edge directionality."},{"id":"d","text":"Yes, by inverting the parent array","isCorrect":false,"explanation":"Parent inversion does not resolve directed cycles."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-redundant-connection',
  'topic-union-find-dsu',
  'Redundant Connection',
  'Intermediate',
  'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree of n nodes.',
  ARRAY['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2']::text[],
  '[{"input":"edges = [[1,2],[1,3],[2,3]]","output":"[2,3]","explanation":"[2,3] closes the cycle."},{"input":"edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]","output":"[1,4]","explanation":"[1,4] closes the cycle."}]'::jsonb,
  '{"javascript":"function findRedundantConnection(edges) {\n  // TODO: Find edge that creates a cycle using DSU\n  return [];\n}","python":"def findRedundantConnection(edges):\n    # TODO: Find edge that creates a cycle using DSU\n    return []","java":"class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        // TODO: Find redundant connection\n        return new int[]{};\n    }\n}","cpp":"class Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        // TODO: Find redundant connection\n        return {};\n    }\n};"}'::jsonb,
  'findRedundantConnection',
  '{"javascript":"function findRedundantConnection(edges) {\n  let parent = Array.from({ length: edges.length + 1 }, (_, i) => i);\n  function find(x) {\n    if (parent[x] !== x) parent[x] = find(parent[x]);\n    return parent[x];\n  }\n  function union(x, y) {\n    let rx = find(x), ry = find(y);\n    if (rx === ry) return false;\n    parent[rx] = ry;\n    return true;\n  }\n  for (let [u, v] of edges) {\n    if (!union(u, v)) return [u, v];\n  }\n  return [];\n}","python":"def findRedundantConnection(edges):\n    parent = list(range(len(edges) + 1))\n    def find(x):\n        if parent[x] != x: parent[x] = find(parent[x])\n        return parent[x]\n    def union(x, y):\n        rx, ry = find(x), find(y)\n        if rx == ry: return False\n        parent[rx] = ry\n        return True\n    for u, v in edges:\n        if not union(u, v): return [u, v]\n    return []","java":"class Solution { public int[] findRedundantConnection(int[][] edges) { int[] parent = new int[edges.length + 1]; for(int i=0; i<=edges.length; i++) parent[i] = i; for(int[] e: edges){ int rx = find(parent, e[0]), ry = find(parent, e[1]); if(rx == ry) return e; parent[rx] = ry; } return new int[]{}; } private int find(int[] p, int x){ if(p[x] != x) p[x] = find(p, p[x]); return p[x]; } }","cpp":"vector<int> findRedundantConnection(vector<vector<int>>& edges) { vector<int> parent(edges.size() + 1); iota(parent.begin(), parent.end(), 0); auto find = [&](auto& self, int x) -> int { return parent[x] == x ? x : parent[x] = self(self, parent[x]); }; for(const auto& e: edges){ int rx = find(find, e[0]), ry = find(find, e[1]); if(rx == ry) return e; parent[rx] = ry; } return {}; }","timeComplexity":"O(n * alpha(n))","spaceComplexity":"O(n)","explanation":"Iterates through edges, identifying the unique cycle-closing edge via DSU union status."}'::jsonb,
  ARRAY['If find(u) == find(v), edge [u, v] completes a cycle.', 'Otherwise union(u, v).']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-redundant-connection',
  '[[1, 2], [1, 3], [2, 3]]',
  '[2, 3]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-redundant-connection',
  '[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]',
  '[1, 4]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Segment & Fenwick Trees (topic-segment-fenwick-trees)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-segment-fenwick-trees',
  'region-advanced-ds',
  'segment-fenwick-trees',
  'Segment & Fenwick Trees',
  'Range Queries, Point Updates & Binary Indexed Lowbit Trick',
  'advanced',
  2,
  220,
  'Cpu',
  'Advanced',
  'Master dynamic range query structures: Segment Trees for range min/sum queries with point updates, and Binary Indexed Trees (Fenwick).',
  ARRAY['Segment Tree Structure (Array of Size 4N)', 'Range Sum Query with O(log N) Point Updates', 'Range Minimum Query (RMQ) & Merge Logic', 'Binary Indexed Tree (BIT / Fenwick Tree) Lowbit Trick `i & (-i)`', 'Lazy Propagation Introduction for Range Updates']::text[],
  'tree',
  '{"whatIsIt":"A Segment Tree is a binary tree where each node represents an interval of the input array. Root represents [0..N-1], and children split intervals in half. Point updates and range queries both operate in O(log N) time. A Fenwick Tree provides prefix sums with O(N) space and clean bitwise `i & (-i)` logic.","whyItMatters":"Enables real-time stock ticker range aggregations, 2D game collision detection, and dynamic histogram queries.","intuition":"Instead of summing array elements one by one (O(n)), you store partial sums in a binary tournament tree: any range query combines at most 2 * log2(n) tournament bracket nodes.","stepByStep":["1. Allocate array of size 4N for Segment Tree.","2. Build tree recursively: left child is 2*node, right child is 2*node + 1.","3. Update: modify target leaf, then pull updated values up to root.","4. Query: decompose query range [L, R] across canonical tree intervals."],"pseudocode":"function update(i, delta) {\n  for (i++; i <= n; i += i & (-i)) bit[i] += delta;\n}\nfunction query(i) {\n  let s = 0;\n  for (i++; i > 0; i -= i & (-i)) s += bit[i];\n  return s;\n}","complexity":{"timeBest":"O(log n)","timeAverage":"O(log n)","timeWorst":"O(log n)","space":"O(n) for BIT, O(4n) for Segment Tree","explanation":"Tree height is bounded by log2(n)."},"commonMistakes":["Allocating only 2N memory for Segment Tree instead of 4N, causing out-of-bounds crashes when N is not a power of 2.","0-indexing mistakes in Fenwick trees (`i & (-i)` requires 1-based indexing)."],"edgeCases":["Array of size 1","Querying single-element range [i, i]","Updating with negative delta"],"realWorldApplications":["Live financial chart candlestick range summaries.","Database query optimization with dynamic histograms.","2D spatial bounding box range indexing."],"whenToUse":["Dynamic arrays requiring frequent point/range updates and range queries."],"whenNotToUse":["Static arrays with zero updates (use static Prefix Sum array O(1))."],"relatedAlgorithms":["Fenwick Tree","Range Minimum Query","Lazy Propagation"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sg-1',
  'topic-segment-fenwick-trees',
  'Why do we typically allocate an array of size `4 * N` for a Segment Tree on an array of length N?',
  NULL,
  'Power of two tree expansions.',
  '[{"id":"a","text":"To comfortably accommodate the 1-indexed complete binary tree representation when N is not a power of 2","isCorrect":true,"explanation":"The next power of 2 can be up to 2N, and a full binary tree with 2N leaves has 4N - 1 total nodes."},{"id":"b","text":"Because each tree node stores 4 different values","isCorrect":false,"explanation":"Each node stores a single aggregation (e.g. sum or min)."},{"id":"c","text":"To allow four concurrent threads to read simultaneously","isCorrect":false,"explanation":"Memory sizing is structural, not concurrency-related."},{"id":"d","text":"To store backup copies in case of bit rot","isCorrect":false,"explanation":"Segment trees do not perform hardware error correction."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sg-2',
  'topic-segment-fenwick-trees',
  'What does the bitwise operation `i & (-i)` compute in a Fenwick Tree (Binary Indexed Tree)?',
  NULL,
  'Two''s complement bit isolation.',
  '[{"id":"a","text":"Extracts the lowest set bit (least significant 1-bit) of integer i","isCorrect":true,"explanation":"Using two''s complement negation (-i = ~i + 1), i & (-i) isolates the lowest set bit, indicating the length of the interval tree[i] is responsible for."},{"id":"b","text":"Inverts all bits of i","isCorrect":false,"explanation":"Bitwise NOT ~i inverts all bits."},{"id":"c","text":"Checks if i is a prime number","isCorrect":false,"explanation":"Primality testing cannot be done with a single bitwise AND."},{"id":"d","text":"Multiplies i by -1","isCorrect":false,"explanation":"Arithmetic negation is -i; ANDing returns a positive power of 2."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sg-3',
  'topic-segment-fenwick-trees',
  'What is the purpose of "Lazy Propagation" in a Segment Tree?',
  NULL,
  'Deferred updates for range modifications.',
  '[{"id":"a","text":"To perform RANGE updates (e.g., add V to all elements in [L, R]) in O(log N) time by deferring child updates until needed","isCorrect":true,"explanation":"Without lazy propagation, updating a range would touch every leaf in O(N). Lazy tags record pending updates at higher intervals, pushing them down only when children are accessed."},{"id":"b","text":"To delay query execution until the CPU is idle","isCorrect":false,"explanation":"Lazy propagation is an asymptotic algorithmic technique, not OS CPU scheduling."},{"id":"c","text":"To compress the segment tree into 1 byte","isCorrect":false,"explanation":"Lazy tags do not reduce array allocation."},{"id":"d","text":"To replace binary search with linear search","isCorrect":false,"explanation":"Segment trees do not use linear search."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-sg-4',
  'topic-segment-fenwick-trees',
  'In a Segment Tree handling Range Minimum Queries (RMQ), how is parent node value computed from its two children?',
  NULL,
  'Minimum of left and right child.',
  '[{"id":"a","text":"tree[node] = min(tree[2 * node], tree[2 * node + 1])","isCorrect":true,"explanation":"The minimum of an interval is simply the minimum between its left half minimum and right half minimum."},{"id":"b","text":"tree[node] = tree[2 * node] + tree[2 * node + 1]","isCorrect":false,"explanation":"Addition calculates range sum, not range minimum."},{"id":"c","text":"tree[node] = max(tree[2 * node], tree[2 * node + 1])","isCorrect":false,"explanation":"Max computes range maximum."},{"id":"d","text":"tree[node] = tree[2 * node] * tree[2 * node + 1]","isCorrect":false,"explanation":"Multiplication computes range product."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-range-sum-query-mutable',
  'topic-segment-fenwick-trees',
  'Range Sum Query - Mutable',
  'Advanced',
  'Given an integer array nums, handle multiple queries of two types: update(index, val) to update value at index, and sumRange(left, right) to return the sum of the elements between left and right inclusive in O(log n).',
  ARRAY['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', '0 <= index < nums.length', '0 <= left <= right < nums.length']::text[],
  '[{"input":"init([1,3,5]), sumRange(0,2), update(1,2), sumRange(0,2)","output":"[null, 9, null, 8]","explanation":"1+3+5=9. After updating index 1 to 2, 1+2+5=8."}]'::jsonb,
  '{"javascript":"class NumArray {\n  constructor(nums) { /* TODO */ }\n  update(index, val) { /* TODO */ }\n  sumRange(left, right) { /* TODO */ return 0; }\n}","python":"class NumArray:\n    def __init__(self, nums):\n        # TODO\n        pass\n    def update(self, index: int, val: int) -> None:\n        # TODO\n        pass\n    def sumRange(self, left: int, right: int) -> int:\n        # TODO\n        return 0","java":"class NumArray { public NumArray(int[] nums) {} public void update(int index, int val) {} public int sumRange(int left, int right) { return 0; } }","cpp":"class NumArray { public: NumArray(vector<int>& nums) {} void update(int index, int val) {} int sumRange(int left, int right) { return 0; } };"}'::jsonb,
  'NumArray',
  '{"javascript":"class NumArray {\n  constructor(nums) {\n    this.n = nums.length;\n    this.nums = [...nums];\n    this.bit = new Array(this.n + 1).fill(0);\n    for (let i = 0; i < this.n; i++) this._add(i, nums[i]);\n  }\n  _add(i, delta) {\n    for (i++; i <= this.n; i += i & (-i)) this.bit[i] += delta;\n  }\n  _query(i) {\n    let s = 0;\n    for (i++; i > 0; i -= i & (-i)) s += this.bit[i];\n    return s;\n  }\n  update(index, val) {\n    let delta = val - this.nums[index];\n    this.nums[index] = val;\n    this._add(index, delta);\n  }\n  sumRange(left, right) {\n    return this._query(right) - this._query(left - 1);\n  }\n}","python":"class NumArray:\n    def __init__(self, nums):\n        self.n = len(nums)\n        self.nums = list(nums)\n        self.bit = [0] * (self.n + 1)\n        for i, val in enumerate(nums):\n            self._add(i, val)\n    def _add(self, i, delta):\n        i += 1\n        while i <= self.n:\n            self.bit[i] += delta; i += i & (-i)\n    def _query(self, i):\n        s = 0; i += 1\n        while i > 0:\n            s += self.bit[i]; i -= i & (-i)\n        return s\n    def update(self, index: int, val: int) -> None:\n        delta = val - self.nums[index]\n        self.nums[index] = val\n        self._add(index, delta)\n    def sumRange(self, left: int, right: int) -> int:\n        return self._query(right) - self._query(left - 1)","java":"class NumArray { private int[] nums, bit; private int n; public NumArray(int[] nums) { this.n = nums.length; this.nums = nums.clone(); this.bit = new int[n + 1]; for(int i=0; i<n; i++) add(i, nums[i]); } private void add(int i, int delta){ for(i++; i<=n; i += i & (-i)) bit[i] += delta; } private int query(int i){ int s=0; for(i++; i>0; i -= i & (-i)) s += bit[i]; return s; } public void update(int index, int val) { add(index, val - nums[index]); nums[index] = val; } public int sumRange(int left, int right) { return query(right) - query(left - 1); } }","cpp":"class NumArray { private: vector<int> nums, bit; int n; void add(int i, int delta){ for(i++; i<=n; i += i & (-i)) bit[i] += delta; } int query(int i){ int s=0; for(i++; i>0; i -= i & (-i)) s += bit[i]; return s; } public: NumArray(vector<int>& nums) : nums(nums), n(nums.size()), bit(nums.size()+1, 0) { for(int i=0; i<n; i++) add(i, nums[i]); } void update(int index, int val) { add(index, val - nums[index]); nums[index] = val; } int sumRange(int left, int right) { return query(right) - query(left - 1); } };","timeComplexity":"O(log n) per update and query","spaceComplexity":"O(n)","explanation":"Binary Indexed Tree provides logarithmic point updates and range sum queries."}'::jsonb,
  ARRAY['Implement Binary Indexed Tree (Fenwick) with _add and _query.', 'sumRange(L, R) = _query(R) - _query(L - 1).']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-range-sum-query-mutable',
  'init([1, 3, 5]), sumRange(0, 2), update(1, 2), sumRange(0, 2)',
  '[null, 9, null, 8]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-range-sum-query-mutable',
  'init([7, 2, 9]), sumRange(1, 2), update(0, 5), sumRange(0, 1)',
  '[null, 11, null, 7]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: LRU Cache & Monotonic Queues (topic-lru-cache-design)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-lru-cache-design',
  'region-advanced-ds',
  'lru-cache-monotonic-queues',
  'LRU Cache & Monotonic Queues',
  'Doubly Linked Lists, Hash Maps & O(1) Eviction',
  'advanced',
  3,
  200,
  'Cpu',
  'Advanced',
  'Design production-grade caching systems: Least Recently Used (LRU) with O(1) get/put, and Monotonic Deque for sliding window maximum.',
  ARRAY['LRU Cache Specification & O(1) Guarantees', 'Doubly Linked List + Hash Map Synergy', 'Dummy Head & Tail Sentinel Nodes Pattern', 'Eviction of Least Recently Used Items', 'Monotonic Deque for Sliding Window Maximum O(N)']::text[],
  'linked_list',
  '{"whatIsIt":"An LRU (Least Recently Used) cache organizes items in order of use. Combining a Doubly Linked List with a Hash Map enables both get and put operations to run in strictly O(1) time. The hash map provides instant node lookups, and the doubly linked list allows O(1) node removal and re-insertion at the head.","whyItMatters":"Powers Redis eviction policies, browser history tabs, CPU cache replacement algorithms, and DB buffer pools.","intuition":"Think of books on a desk: whenever you read a book, you place it on the very top of the pile. When the desk gets too crowded, you discard the book at the very bottom.","stepByStep":["1. Initialize Doubly Linked List with dummy head and tail sentinels.","2. Map key to Node reference in hash table.","3. Get(key): if key exists, remove node and re-insert right after head; return val.","4. Put(key, val): if key exists, update and move to head; else insert new node at head; if size > cap, remove tail.prev and delete from map."],"pseudocode":"function get(key) {\n  if (!map.has(key)) return -1;\n  let node = map.get(key);\n  remove(node); addHead(node);\n  return node.val;\n}","complexity":{"timeBest":"O(1)","timeAverage":"O(1)","timeWorst":"O(1)","space":"O(Capacity)","explanation":"Hash map lookups and linked list pointer re-assignments are strictly constant time."},"commonMistakes":["Using a Singly Linked List (deleting a node in singly linked list requires O(n) traversal to find predecessor).","Not using dummy head and tail sentinel nodes, leading to complex null checks."],"edgeCases":["Capacity = 1","Updating value of existing key","Accessing key not present"],"realWorldApplications":["Web browser resource caching (images, scripts).","Redis maxmemory-policy allkeys-lru.","Operating system virtual memory page replacement."],"whenToUse":["Fixed-capacity cache requiring instant lookup and oldest item eviction."],"whenNotToUse":["Frequency-based eviction (use LFU Cache)."],"relatedAlgorithms":["LFU Cache","Sliding Window Maximum","Monotonic Queue"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lru-1',
  'topic-lru-cache-design',
  'Why does an LRU Cache require a DOUBLY linked list rather than a singly linked list?',
  NULL,
  'How do you delete a node in O(1) given only its pointer?',
  '[{"id":"a","text":"To delete an arbitrary node in O(1) when given its pointer from the hash map, which requires accessing node.prev","isCorrect":true,"explanation":"In a singly linked list, deleting a node requires finding its predecessor, taking O(N). A doubly linked list gives direct access to node.prev for immediate O(1) unlinking."},{"id":"b","text":"Because singly linked lists cannot store integers","isCorrect":false,"explanation":"Singly linked lists can store any data type."},{"id":"c","text":"To reverse the cache every hour","isCorrect":false,"explanation":"Cache order is updated per access, not reversed hourly."},{"id":"d","text":"Because Python dictionaries only map to doubly linked nodes","isCorrect":false,"explanation":"Python dictionaries can map to any object."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lru-2',
  'topic-lru-cache-design',
  'What is the role of dummy "head" and "tail" sentinel nodes in LRU Cache implementation?',
  NULL,
  'Eliminating null pointer checks at list ends.',
  '[{"id":"a","text":"They eliminate conditional boundary checks for null pointers when inserting at the head or removing from the tail","isCorrect":true,"explanation":"Sentinels guarantee that every real node always has a non-null prev and non-null next, radically simplifying insertion and removal logic."},{"id":"b","text":"They double the maximum cache capacity","isCorrect":false,"explanation":"Sentinels do not store user cache data."},{"id":"c","text":"They automatically synchronize thread locks","isCorrect":false,"explanation":"Concurrency synchronization requires mutexes/locks, not sentinel nodes."},{"id":"d","text":"They compress memory during garbage collection","isCorrect":false,"explanation":"Sentinels are simple fixed node objects."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lru-3',
  'topic-lru-cache-design',
  'What happens in `put(key, value)` when the key is NEW and cache capacity has been reached?',
  NULL,
  'Evict oldest node at tail.prev.',
  '[{"id":"a","text":"Evict the node right before tail (least recently used), delete its key from the hash map, and insert the new node right after head","isCorrect":true,"explanation":"Least recently used node is at tail.prev; removing it and deleting from the hash map frees up one capacity slot for the new item."},{"id":"b","text":"Reject the put operation and throw an OutOfMemory exception","isCorrect":false,"explanation":"LRU caches evict older entries rather than rejecting new writes."},{"id":"c","text":"Double the capacity of the cache","isCorrect":false,"explanation":"LRU caches have fixed maximum capacity."},{"id":"d","text":"Delete all entries and start over","isCorrect":false,"explanation":"Only the single least recently used item is evicted."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-lru-4',
  'topic-lru-cache-design',
  'How does a Monotonic Deque solve Sliding Window Maximum in O(N) total time instead of O(N * K)?',
  NULL,
  'Amortized push and pop operations per element.',
  '[{"id":"a","text":"Each array element is pushed and popped from the deque at most once across the entire traversal","isCorrect":true,"explanation":"By popping smaller elements from the back before appending, the deque maintains descending values with max always at the front; amortized cost is 2N operations total = O(N)."},{"id":"b","text":"By sorting each window in O(1)","isCorrect":false,"explanation":"Sorting a window of size K cannot be done in O(1)."},{"id":"c","text":"By skipping half of the elements in the array","isCorrect":false,"explanation":"Every element is processed."},{"id":"d","text":"By using multithreading","isCorrect":false,"explanation":"The algorithm is single-threaded and asymptotically O(N)."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-lru-cache-implementation',
  'topic-lru-cache-design',
  'LRU Cache Design',
  'Advanced',
  'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) in O(1) average time complexity.',
  ARRAY['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put.']::text[],
  '[{"input":"init(2), put(1,1), put(2,2), get(1), put(3,3), get(2)","output":"[null, null, null, 1, null, -1]","explanation":"2 is evicted when 3 is added."}]'::jsonb,
  '{"javascript":"class LRUCache {\n  constructor(capacity) { /* TODO */ }\n  get(key) { /* TODO */ return -1; }\n  put(key, value) { /* TODO */ }\n}","python":"class LRUCache:\n    def __init__(self, capacity: int):\n        # TODO\n        pass\n    def get(self, key: int) -> int:\n        # TODO\n        return -1\n    def put(self, key: int, value: int) -> None:\n        # TODO\n        pass","java":"class LRUCache { public LRUCache(int capacity) {} public int get(int key) { return -1; } public void put(int key, int value) {} }","cpp":"class LRUCache { public: LRUCache(int capacity) {} int get(int key) { return -1; } void put(int key, int value) {} };"}'::jsonb,
  'LRUCache',
  '{"javascript":"class Node {\n  constructor(k = 0, v = 0) { this.key = k; this.val = v; this.prev = null; this.next = null; }\n}\nclass LRUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.map = new Map();\n    this.head = new Node();\n    this.tail = new Node();\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n  _remove(node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n  _add(node) {\n    node.prev = this.head;\n    node.next = this.head.next;\n    this.head.next.prev = node;\n    this.head.next = node;\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    let node = this.map.get(key);\n    this._remove(node);\n    this._add(node);\n    return node.val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this._remove(this.map.get(key));\n    let node = new Node(key, value);\n    this._add(node);\n    this.map.set(key, node);\n    if (this.map.size > this.cap) {\n      let lru = this.tail.prev;\n      this._remove(lru);\n      this.map.delete(lru.key);\n    }\n  }\n}","python":"class Node:\n    def __init__(self, key=0, val=0):\n        self.key, self.val, self.prev, self.next = key, val, None, None\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap, self.cache = capacity, {}\n        self.head, self.tail = Node(), Node()\n        self.head.next, self.tail.prev = self.tail, self.head\n    def _remove(self, node):\n        node.prev.next, node.next.prev = node.next, node.prev\n    def _add(self, node):\n        node.prev, node.next = self.head, self.head.next\n        self.head.next.prev = node; self.head.next = node\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            node = self.cache[key]\n            self._remove(node); self._add(node)\n            return node.val\n        return -1\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self._remove(self.cache[key])\n        node = Node(key, value)\n        self._add(node); self.cache[key] = node\n        if len(self.cache) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru); del self.cache[lru.key]","java":"class LRUCache { class Node { int key, val; Node prev, next; Node(int k, int v){ key=k; val=v; } } private Map<Integer, Node> map = new HashMap<>(); private int cap; private Node head, tail; public LRUCache(int capacity) { this.cap = capacity; head = new Node(0, 0); tail = new Node(0, 0); head.next = tail; tail.prev = head; } private void remove(Node n){ n.prev.next = n.next; n.next.prev = n.prev; } private void add(Node n){ n.prev = head; n.next = head.next; head.next.prev = n; head.next = n; } public int get(int key) { if(!map.containsKey(key)) return -1; Node n = map.get(key); remove(n); add(n); return n.val; } public void put(int key, int value) { if(map.containsKey(key)) remove(map.get(key)); Node n = new Node(key, value); add(n); map.put(key, n); if(map.size() > cap){ Node lru = tail.prev; remove(lru); map.remove(lru.key); } } }","cpp":"class LRUCache { struct Node { int key, val; Node *prev, *next; Node(int k, int v): key(k), val(v), prev(nullptr), next(nullptr) {} }; unordered_map<int, Node*> map; int cap; Node *head, *tail; void remove(Node* n){ n->prev->next = n->next; n->next->prev = n->prev; } void add(Node* n){ n->prev = head; n->next = head->next; head->next->prev = n; head->next = n; } public: LRUCache(int capacity): cap(capacity) { head = new Node(0,0); tail = new Node(0,0); head->next = tail; tail->prev = head; } int get(int key) { if(!map.count(key)) return -1; Node* n = map[key]; remove(n); add(n); return n->val; } void put(int key, int value) { if(map.count(key)) remove(map[key]); Node* n = new Node(key, value); add(n); map[key] = n; if(map.size() > cap){ Node* lru = tail->prev; remove(lru); map.erase(lru->key); delete lru; } } };","timeComplexity":"O(1) strictly for get and put","spaceComplexity":"O(capacity)","explanation":"Hash map with Doubly Linked List achieves O(1) constant time cache operations."}'::jsonb,
  ARRAY['Combine Doubly Linked List with Hash Map.', 'Keep most recent at head, least recent at tail.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-lru-cache-implementation',
  'init(2), put(1, 1), put(2, 2), get(1), put(3, 3), get(2)',
  '[null, null, null, 1, null, -1]',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-lru-cache-implementation',
  'init(1), put(5, 10), get(5), put(6, 20), get(5)',
  '[null, null, 10, null, -1]',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Binary Search on Answer Space (topic-binary-search-answer)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-binary-search-answer',
  'region-competitive',
  'binary-search-answer-space',
  'Binary Search on Answer Space',
  'Monotonic Feasibility Predicates & Minimax Partitioning',
  'competitive',
  1,
  160,
  'Zap',
  'Intermediate',
  'Master binary search on continuous or discrete monotonic answer ranges: Koko Eating Bananas, Capacity to Ship Packages, and Split Array Largest Sum.',
  ARRAY['Recognizing Monotonic Predicates f(x)', 'Defining Search Boundaries [min_possible, max_possible]', 'Feasibility Check Function Implementation', 'Koko Eating Bananas (LeetCode 875)', 'Split Array Largest Sum (Minimax Partitioning)']::text[],
  'binary_search',
  '{"whatIsIt":"When directly computing the optimal value is difficult, but verifying whether a candidate answer is feasible runs in O(N) time, we can binary search over the answer space. If the feasibility function is monotonic (e.g. if capacity C works, any capacity > C also works), binary search converges in O(N log(Range)).","whyItMatters":"Foundational for rate limiting bandwidth allocations, warehouse packaging optimization, and latency budgeting in distributed cloud systems.","intuition":"Think of guessing a secret number with \"Too High / Too Low\" feedback: you probe the midpoint; if the ship is too small, you only search larger capacities; if it works, you try to find a smaller working size.","stepByStep":["1. Identify monotonic answer range: low = max(piles), high = sum(piles).","2. Formulate feasibility predicate: canWork(mid) -> boolean.","3. If canWork(mid) is true, search left half (high = mid); else search right half (low = mid + 1)."],"pseudocode":"let low = minBound, high = maxBound;\nwhile (low < high) {\n  let mid = Math.floor((low + high) / 2);\n  if (canWork(mid)) high = mid;\n  else low = mid + 1;\n}\nreturn low;","complexity":{"timeBest":"O(n * log(range))","timeAverage":"O(n * log(range))","timeWorst":"O(n * log(range))","space":"O(1)","explanation":"Range is cut in half each step (~30 steps for 10^9), with O(n) check per step."},"commonMistakes":["Setting lower bound to 0 or 1 when an individual element requires a higher minimum.","Integer overflow when computing (low + high) / 2 in C++/Java (use low + (high - low) / 2)."],"edgeCases":["Array with 1 element","days equals array length (each item shipped alone)","days = 1 (must ship everything together)"],"realWorldApplications":["Cloud API rate limit token bucket capacity sizing.","Delivery vehicle route payload optimization.","Distributed task scheduler thread count budgeting."],"whenToUse":["Minimizing the maximum or maximizing the minimum under a monotonic condition."],"whenNotToUse":["Non-monotonic conditions where validity oscillates arbitrarily."],"relatedAlgorithms":["Koko Eating Bananas","Split Array Largest Sum","Aggressive Cows"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bsa-1',
  'topic-binary-search-answer',
  'In "Capacity to Ship Packages Within D Days", why is the lower search bound `left = max(weights)` instead of 0 or 1?',
  NULL,
  'Can a boat carry a package heavier than its capacity?',
  '[{"id":"a","text":"Because the boat must be at least as large as the single heaviest package, otherwise that package could never be loaded","isCorrect":true,"explanation":"If capacity is smaller than any individual package, that package cannot be shipped at all."},{"id":"b","text":"Because 0 is not a valid integer","isCorrect":false,"explanation":"0 is an integer, but impossible capacity for positive weight."},{"id":"c","text":"Because arrays cannot be split into negative pieces","isCorrect":false,"explanation":"Weights are positive."},{"id":"d","text":"To avoid division by zero","isCorrect":false,"explanation":"Feasibility check uses addition, not division."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bsa-2',
  'topic-binary-search-answer',
  'In "Koko Eating Bananas" with speed K bananas/hour, how many hours does Koko take to eat a pile of size P?',
  NULL,
  'Ceiling division.',
  '[{"id":"a","text":"math.ceil(P / K) or (P + K - 1) // K","isCorrect":true,"explanation":"Koko cannot eat from two piles in the same hour, so any remaining fraction rounds up to a full hour."},{"id":"b","text":"P // K","isCorrect":false,"explanation":"Integer division truncates remaining bananas."},{"id":"c","text":"P * K","isCorrect":false,"explanation":"Hours is pile size divided by speed, not multiplied."},{"id":"d","text":"P % K","isCorrect":false,"explanation":"Remainder is leftovers, not hours taken."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bsa-3',
  'topic-binary-search-answer',
  'What is the upper bound `right` when binary searching for the answer in "Split Array Largest Sum"?',
  NULL,
  'Total sum of all elements.',
  '[{"id":"a","text":"sum(nums), representing the total sum when the entire array is kept as 1 single subarray","isCorrect":true,"explanation":"The largest possible subarray sum occurs when all elements are in a single subarray, summing to sum(nums)."},{"id":"b","text":"len(nums) * 2","isCorrect":false,"explanation":"Length does not bound element values."},{"id":"c","text":"max(nums)","isCorrect":false,"explanation":"max(nums) is the lower bound, not the upper bound."},{"id":"d","text":"Infinity","isCorrect":false,"explanation":"A finite bound is required for standard integer binary search."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bsa-4',
  'topic-binary-search-answer',
  'If answer space Range = 10^9, how many binary search iterations are executed before finding the optimal value?',
  NULL,
  'Log2 of 1 billion.',
  '[{"id":"a","text":"Around ~30 iterations (log2(10^9) ≈ 29.9)","isCorrect":true,"explanation":"2^30 > 1,000,000,000, so binary search cuts the range down to a single value in at most 30 steps."},{"id":"b","text":"1,000,000 iterations","isCorrect":false,"explanation":"Linear search takes 1 billion, not binary search."},{"id":"c","text":"10 iterations","isCorrect":false,"explanation":"2^10 = 1024."},{"id":"d","text":"100 iterations","isCorrect":false,"explanation":"Log2 of 10^9 is approximately 30."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-koko-eating-bananas',
  'topic-binary-search-answer',
  'Koko Eating Bananas',
  'Intermediate',
  'Koko loves to eat bananas. There are n piles of bananas, the i-th pile has piles[i] bananas. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile and eats k bananas from it. Return the minimum integer k such that she can eat all the bananas within h hours.',
  ARRAY['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9']::text[],
  '[{"input":"piles = [3,6,7,11], h = 8","output":"4","explanation":"At speed 4, Koko finishes in 8 hours."},{"input":"piles = [30,11,23,4,20], h = 5","output":"30","explanation":"Must eat fastest pile in 1 hour."}]'::jsonb,
  '{"javascript":"function minEatingSpeed(piles, h) {\n  // TODO: Binary search minimum eating speed k\n  return 1;\n}","python":"def minEatingSpeed(piles, h: int) -> int:\n    # TODO: Binary search minimum eating speed k\n    return 1","java":"class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        // TODO: Binary search speed k\n        return 1;\n    }\n}","cpp":"class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        // TODO: Binary search speed k\n        return 1;\n    }\n};"}'::jsonb,
  'minEatingSpeed',
  '{"javascript":"function minEatingSpeed(piles, h) {\n  let left = 1, right = Math.max(...piles);\n  while (left < right) {\n    let mid = Math.floor((left + right) / 2);\n    let hours = 0;\n    for (let p of piles) hours += Math.ceil(p / mid);\n    if (hours <= h) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}","python":"def minEatingSpeed(piles, h: int) -> int:\n    import math\n    left, right = 1, max(piles)\n    while left < right:\n        mid = (left + right) // 2\n        hours = sum(math.ceil(p / mid) for p in piles)\n        if hours <= h: right = mid\n        else: left = mid + 1\n    return left","java":"class Solution { public int minEatingSpeed(int[] piles, int h) { int left = 1, right = 1000000000; for(int p: piles) right = Math.max(right, p); while(left < right){ int mid = left + (right - left) / 2; int hours = 0; for(int p: piles) hours += (p + mid - 1) / mid; if(hours <= h) right = mid; else left = mid + 1; } return left; } }","cpp":"int minEatingSpeed(vector<int>& piles, int h) { int left = 1, right = *max_element(piles.begin(), piles.end()); while(left < right){ int mid = left + (right - left) / 2; long long hours = 0; for(int p: piles) hours += (p + mid - 1) / mid; if(hours <= h) right = mid; else left = mid + 1; } return left; }","timeComplexity":"O(N * log(max(piles)))","spaceComplexity":"O(1)","explanation":"Binary search over discrete speed rates with ceiling hours validation."}'::jsonb,
  ARRAY['Binary search range: left = 1, right = max(piles).', 'For candidate k: sum of ceil(p / k) must be <= h.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-koko-eating-bananas',
  '[3, 6, 7, 11], 8',
  '4',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-koko-eating-bananas',
  '[30, 11, 23, 4, 20], 5',
  '30',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-koko-eating-bananas',
  '[30, 11, 23, 4, 20], 6',
  '23',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Number Theory & Sieve of Eratosthenes (topic-number-theory-sieve)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-number-theory-sieve',
  'region-competitive',
  'number-theory-sieve',
  'Number Theory & Sieve of Eratosthenes',
  'Prime Sieve, Modular Arithmetic & Fast Exponentiation',
  'competitive',
  2,
  200,
  'Trophy',
  'Advanced',
  'Master competitive number theory: Sieve of Eratosthenes prime generation in O(N log log N), Euclidean GCD, and Fast Modular Exponentiation.',
  ARRAY['Primality Testing (Trial Division in O(sqrt(N)))', 'Sieve of Eratosthenes in O(N log log N)', 'Linear Sieve (Euler Sieve) in O(N)', 'Greatest Common Divisor (Euclidean Algorithm O(log(min(a, b))))', 'Modular Arithmetic & Binary Exponentiation (a^b % mod)']::text[],
  'general',
  '{"whatIsIt":"Number theory provides foundational tools for competitive programming and cryptography. The Sieve of Eratosthenes identifies all primes up to N in O(N log log N) by iteratively marking multiples. Binary Exponentiation computes powers modulo M in O(log b).","whyItMatters":"Essential for RSA asymmetric cryptography, Diffie-Hellman key exchanges, and hash table prime bucket sizing.","intuition":"Think of pouring sand through successive sieves: first sieve out all multiples of 2, then all remaining multiples of 3, then 5, until only pure primes remain.","stepByStep":["1. Initialize boolean array is_prime of size n with true; mark 0 and 1 as false.","2. For i from 2 up to sqrt(n): if is_prime[i] is true, mark multiples starting at i*i with step i as false.","3. Sum or collect all surviving true indices."],"pseudocode":"let isPrime = new Array(n).fill(true);\nisPrime[0] = isPrime[1] = false;\nfor (let i = 2; i * i < n; i++) {\n  if (isPrime[i]) {\n    for (let j = i * i; j < n; j += i) isPrime[j] = false;\n  }\n}","complexity":{"timeBest":"O(n log log n)","timeAverage":"O(n log log n)","timeWorst":"O(n log log n)","space":"O(n) boolean array","explanation":"Sum of reciprocal primes 1/p scales asymptotically as log(log n)."},"commonMistakes":["Starting inner loop at 2*i instead of i*i (wastes time remarking factors already handled by smaller primes).","Counting 1 as a prime number (1 is neither prime nor composite)."],"edgeCases":["n <= 2 (0 primes strictly less than 2)","n = 3 (1 prime: 2)","Large n = 5 * 10^6"],"realWorldApplications":["RSA public/private key pair generation.","Hash table primary modulus sizing to minimize clustering.","Pseudo-random number generator congruences."],"whenToUse":["Generating all primes up to N or computing GCD / modular powers."],"whenNotToUse":["Testing single large 100-digit number primality (use Miller-Rabin)."],"relatedAlgorithms":["Euclidean GCD","Modular Exponentiation","Euler''s Totient"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nt-1',
  'topic-number-theory-sieve',
  'In the Sieve of Eratosthenes, why can we start crossing off multiples of prime p starting at `p * p` instead of `2 * p`?',
  NULL,
  'Have multiples smaller than p*p already been visited by earlier primes?',
  '[{"id":"a","text":"All smaller multiples k * p (where k < p) have already been marked by smaller prime factors < p","isCorrect":true,"explanation":"For example, when p = 5, 2*5 was marked by 2, 3*5 was marked by 3, and 4*5 was marked by 2; the first unmarked multiple is 5*5 = 25."},{"id":"b","text":"Because numbers smaller than p*p are all prime","isCorrect":false,"explanation":"Composite numbers exist below p*p, but they are already crossed off."},{"id":"c","text":"Because Python handles multiplication from right to left","isCorrect":false,"explanation":"Mathematical factoring is universal across languages."},{"id":"d","text":"To save CPU power in idle states","isCorrect":false,"explanation":"It is an algorithmic optimization."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nt-2',
  'topic-number-theory-sieve',
  'What is the time complexity of the Euclidean algorithm for computing GCD(a, b)?',
  NULL,
  'Halving at least every two steps.',
  '[{"id":"a","text":"O(log(min(a, b)))","isCorrect":true,"explanation":"In each step, the larger value is reduced by at least half every two iterations (Lamé''s Theorem), yielding logarithmic steps."},{"id":"b","text":"O(min(a, b))","isCorrect":false,"explanation":"Linear subtraction is naive Euclidean; modulo achieves logarithmic time."},{"id":"c","text":"O(1)","isCorrect":false,"explanation":"It requires multiple division steps."},{"id":"d","text":"O(sqrt(a * b))","isCorrect":false,"explanation":"Euclidean GCD is much faster than square root."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nt-3',
  'topic-number-theory-sieve',
  'According to Fermat''s Little Theorem, if modulo P is a prime number and `gcd(a, P) == 1`, what is the modular inverse of `a` modulo P?',
  NULL,
  'Multiply a^(P-1) ≡ 1 by a^(-1).',
  '[{"id":"a","text":"a^(P - 2) % P","isCorrect":true,"explanation":"Since a^(P-1) ≡ 1 (mod P), multiplying both sides by a^(-1) gives a^(-1) ≡ a^(P-2) (mod P)."},{"id":"b","text":"a^(P - 1) % P","isCorrect":false,"explanation":"a^(P-1) is 1, not the inverse."},{"id":"c","text":"1 / a","isCorrect":false,"explanation":"Floating point reciprocal is not a finite field integer."},{"id":"d","text":"P - a","isCorrect":false,"explanation":"P - a is the additive inverse, not the multiplicative inverse."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-nt-4',
  'topic-number-theory-sieve',
  'What is the sum of primes up to 10?',
  NULL,
  'Primes: 2, 3, 5, 7.',
  '[{"id":"a","text":"17 (2 + 3 + 5 + 7)","isCorrect":true,"explanation":"Primes under 10 are 2, 3, 5, 7. 2+3+5+7 = 17."},{"id":"b","text":"18","isCorrect":false,"explanation":"1 is neither prime nor composite."},{"id":"c","text":"26","isCorrect":false,"explanation":"9 is composite (3*3)."},{"id":"d","text":"15","isCorrect":false,"explanation":"Misses prime 2."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-count-primes-sieve',
  'topic-number-theory-sieve',
  'Count Primes',
  'Intermediate',
  'Given an integer n, return the number of prime numbers that are strictly less than n. Solve in O(n log log n) time using the Sieve of Eratosthenes.',
  ARRAY['0 <= n <= 5 * 10^6']::text[],
  '[{"input":"n = 10","output":"4","explanation":"There are 4 prime numbers less than 10, they are 2, 3, 5, 7."},{"input":"n = 0","output":"0","explanation":"No primes less than 0."},{"input":"n = 1","output":"0","explanation":"No primes less than 1."}]'::jsonb,
  '{"javascript":"function countPrimes(n) {\n  // TODO: Implement Sieve of Eratosthenes in O(n log log n)\n  return 0;\n}","python":"def countPrimes(n: int) -> int:\n    # TODO: Implement Sieve of Eratosthenes in O(n log log n)\n    return 0","java":"class Solution {\n    public int countPrimes(int n) {\n        // TODO: Sieve of Eratosthenes\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int countPrimes(int n) {\n        // TODO: Sieve of Eratosthenes\n        return 0;\n    }\n};"}'::jsonb,
  'countPrimes',
  '{"javascript":"function countPrimes(n) {\n  if (n <= 2) return 0;\n  let isPrime = new Uint8Array(n);\n  isPrime.fill(1);\n  isPrime[0] = isPrime[1] = 0;\n  for (let i = 2; i * i < n; i++) {\n    if (isPrime[i]) {\n      for (let j = i * i; j < n; j += i) isPrime[j] = 0;\n    }\n  }\n  let count = 0;\n  for (let i = 2; i < n; i++) count += isPrime[i];\n  return count;\n}","python":"def countPrimes(n: int) -> int:\n    if n <= 2: return 0\n    is_prime = [True] * n\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n ** 0.5) + 1):\n        if is_prime[i]:\n            for j in range(i * i, n, i):\n                is_prime[j] = False\n    return sum(is_prime)","java":"class Solution { public int countPrimes(int n) { if(n <= 2) return 0; boolean[] isPrime = new boolean[n]; Arrays.fill(isPrime, true); isPrime[0] = isPrime[1] = false; for(int i=2; i*i < n; i++){ if(isPrime[i]){ for(int j=i*i; j<n; j+=i) isPrime[j] = false; } } int c = 0; for(int i=2; i<n; i++) if(isPrime[i]) c++; return c; } }","cpp":"int countPrimes(int n) { if(n <= 2) return 0; vector<bool> isPrime(n, true); isPrime[0] = isPrime[1] = false; for(int i=2; i*i < n; i++){ if(isPrime[i]){ for(int j=i*i; j<n; j+=i) isPrime[j] = false; } } int c = 0; for(int i=2; i<n; i++) if(isPrime[i]) c++; return c; }","timeComplexity":"O(n log log n)","spaceComplexity":"O(n)","explanation":"Sieve of Eratosthenes crosses off composite multiples in near-linear time."}'::jsonb,
  ARRAY['Create boolean array of size n initialized to true.', 'Mark 0 and 1 as false; loop up to sqrt(n).']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-count-primes-sieve',
  '10',
  '4',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-count-primes-sieve',
  '0',
  '0',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-count-primes-sieve',
  '1',
  '0',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-4',
  'prob-count-primes-sieve',
  '20',
  '8',
  NULL,
  false,
  4
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

-- Topic: Bit Manipulation & Bitmasks (topic-bit-manipulation-tricks)
INSERT INTO public.topics (id, world_id, slug, title, subtitle, category, order_index, xp_reward, icon_name, difficulty, summary, subtopics, visualizer_type, content)
VALUES (
  'topic-bit-manipulation-tricks',
  'region-competitive',
  'bit-manipulation-tricks',
  'Bit Manipulation & Bitmasks',
  'Kernighan''s Trick, XOR Invariants & Bitmask Subsets',
  'competitive',
  3,
  180,
  'Trophy',
  'Advanced',
  'Master binary bitwise techniques: bitwise arithmetic, Brian Kernighan''s bit count, single number XOR invariants, and bitmask state representation.',
  ARRAY['Bitwise Primitives (&, |, ^, ~, <<, >>)', 'Brian Kernighan''s Algorithm `n & (n - 1)`', 'XOR Properties (x ^ x = 0, x ^ 0 = x)', 'Bitmask Representation of Sets & Subsets', 'Counting Set Bits (Hamming Weight)']::text[],
  'general',
  '{"whatIsIt":"Bit manipulation operates directly on binary integer representations at the CPU level. Because CPU ALU registers execute bitwise instructions in 1 clock cycle, bitwise tricks provide extreme performance and compact state storage.","whyItMatters":"Powers graphics rendering pixel masks, hardware device driver registers, bloom filters, and game engine state flags.","intuition":"Think of 32 physical light switches on a wall: flipping switches individually is clumsy; bitwise operations flip, test, or mask all 32 switches simultaneously in a single nanosecond pulse.","stepByStep":["1. Set bit: mask | (1 << i).","2. Clear bit: mask & ~(1 << i).","3. Toggle bit: mask ^ (1 << i).","4. Clear lowest set bit: n & (n - 1)."],"pseudocode":"let res = 0;\nfor (let n of nums) res ^= n;\nreturn res;","complexity":{"timeBest":"O(1)","timeAverage":"O(1)","timeWorst":"O(1) CPU instructions","space":"O(1)","explanation":"Native 32-bit and 64-bit hardware ALU register instructions."},"commonMistakes":["Confusing bitwise XOR (^) with mathematical exponentiation in JavaScript/Python.","Operator precedence mistakes (bitwise operators have lower precedence than comparison operators, e.g. `n & 1 === 0` evaluates as `n & (1 === 0)` unless parenthesized)."],"edgeCases":["Negative numbers (two''s complement sign bit)","Number 0","Maximum 32-bit integer (2^31 - 1)"],"realWorldApplications":["Hardware peripheral registers and interrupt masks.","Game state flag compaction (poisoned, stunned, flying stored in single byte).","Fast chess board representations (Bitboards)."],"whenToUse":["Compact subset representations, parity calculations, low-level performance loops."],"whenNotToUse":["When clarity and maintainability are more critical than bit-level packing."],"relatedAlgorithms":["Single Number","Subsets with Bitmasks","Counting Bits"]}'::jsonb
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
  content = EXCLUDED.content;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bm-1',
  'topic-bit-manipulation-tricks',
  'What does the expression `n & (n - 1)` do to integer n in binary?',
  NULL,
  'Brian Kernighan''s bit clearing trick.',
  '[{"id":"a","text":"Clears (turns to 0) the lowest set bit (least significant 1-bit) of n","isCorrect":true,"explanation":"Subtracting 1 inverts all bits up to and including the lowest set bit. ANDing with the original n zeroes out that lowest bit."},{"id":"b","text":"Multiplies n by 2","isCorrect":false,"explanation":"Left shift n << 1 multiplies by 2."},{"id":"c","text":"Sets all bits to 1","isCorrect":false,"explanation":"Bitwise OR or ~0 sets bits to 1."},{"id":"d","text":"Reverses the binary digits","isCorrect":false,"explanation":"Reversing requires bit swapping loops."}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bm-2',
  'topic-bit-manipulation-tricks',
  'In the Single Number problem (every element appears twice except for one), why does XORing all elements together produce the unique number?',
  NULL,
  'x ^ x = 0 and 0 ^ x = x.',
  '[{"id":"a","text":"Because XOR is commutative and associative, and x ^ x = 0, so all paired numbers cancel out leaving 0 ^ unique = unique","isCorrect":true,"explanation":"Regardless of order, duplicate pairs cancel to 0, leaving only the unpaired number."},{"id":"b","text":"Because XOR sums numbers in decimal","isCorrect":false,"explanation":"XOR does not do decimal addition."},{"id":"c","text":"Because the unique number is always the largest element","isCorrect":false,"explanation":"XOR works regardless of numerical magnitude."},{"id":"d","text":"Because XOR converts negative numbers to positive","isCorrect":false,"explanation":"XOR handles signed bits like any other bit."}]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bm-3',
  'topic-bit-manipulation-tricks',
  'How do you test whether an integer n > 0 is an exact power of two?',
  NULL,
  'A power of two has exactly one bit set.',
  '[{"id":"a","text":"(n & (n - 1)) == 0","isCorrect":true,"explanation":"A power of two has exactly one 1-bit in binary. Clearing that single bit leaves 0."},{"id":"b","text":"(n % 2) == 0","isCorrect":false,"explanation":"6 % 2 == 0, but 6 is not a power of two."},{"id":"c","text":"(n | (n + 1)) == n","isCorrect":false,"explanation":"Does not test powers of two."},{"id":"d","text":"n ^ 2 == 0","isCorrect":false,"explanation":"^ is bitwise XOR, not exponentiation."}]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.questions (id, topic_id, question, code_snippet, hint, options, order_index)
VALUES (
  'q-bm-4',
  'topic-bit-manipulation-tricks',
  'In bitmask manipulation, what operation toggles (flips) the i-th bit of integer mask?',
  NULL,
  'XOR with 1 flips bits.',
  '[{"id":"a","text":"mask ^ (1 << i)","isCorrect":true,"explanation":"XORing with 1 flips the bit (0 becomes 1, 1 becomes 0), while XORing with 0 leaves other bits unchanged."},{"id":"b","text":"mask | (1 << i)","isCorrect":false,"explanation":"OR sets the bit to 1, but cannot toggle 1 back to 0."},{"id":"c","text":"mask & (1 << i)","isCorrect":false,"explanation":"AND tests if the bit is set, but does not toggle the mask."},{"id":"d","text":"mask >> i","isCorrect":false,"explanation":"Right shift changes bit positions."}]'::jsonb,
  4
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  code_snippet = EXCLUDED.code_snippet,
  hint = EXCLUDED.hint,
  options = EXCLUDED.options,
  order_index = EXCLUDED.order_index;

INSERT INTO public.challenges (id, topic_id, title, difficulty, description, constraints, examples, starter_code, function_name, optimal_solution, hints)
VALUES (
  'prob-single-number',
  'topic-bit-manipulation-tricks',
  'Single Number',
  'Beginner',
  'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
  ARRAY['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4']::text[],
  '[{"input":"nums = [2,2,1]","output":"1","explanation":"1 is unique."},{"input":"nums = [4,1,2,1,2]","output":"4","explanation":"4 is unique."}]'::jsonb,
  '{"javascript":"function singleNumber(nums) {\n  // TODO: Use XOR to find the single element in O(1) space\n  return 0;\n}","python":"def singleNumber(nums):\n    # TODO: Use XOR to find the single element in O(1) space\n    return 0","java":"class Solution {\n    public int singleNumber(int[] nums) {\n        // TODO: XOR single number\n        return 0;\n    }\n}","cpp":"class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        // TODO: XOR single number\n        return 0;\n    }\n};"}'::jsonb,
  'singleNumber',
  '{"javascript":"function singleNumber(nums) {\n  let res = 0;\n  for (let n of nums) res ^= n;\n  return res;\n}","python":"def singleNumber(nums):\n    res = 0\n    for n in nums: res ^= n\n    return res","java":"class Solution { public int singleNumber(int[] nums) { int res = 0; for(int n: nums) res ^= n; return res; } }","cpp":"int singleNumber(vector<int>& nums) { int res = 0; for(int n: nums) res ^= n; return res; }","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"XOR self-inverse cancellation extracts the unique element in O(1) auxiliary space."}'::jsonb,
  ARRAY['x ^ x = 0, and x ^ 0 = x.', 'XOR all elements together in a single loop.']::text[]
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
  hints = EXCLUDED.hints;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-1',
  'prob-single-number',
  '[2, 2, 1]',
  '1',
  NULL,
  false,
  1
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-2',
  'prob-single-number',
  '[4, 1, 2, 1, 2]',
  '4',
  NULL,
  false,
  2
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;

INSERT INTO public.test_cases (id, challenge_id, input, expected_output, explanation, is_hidden, order_index)
VALUES (
  'tc-3',
  'prob-single-number',
  '[1]',
  '1',
  NULL,
  false,
  3
)
ON CONFLICT (id) DO UPDATE SET
  input = EXCLUDED.input,
  expected_output = EXCLUDED.expected_output,
  explanation = EXCLUDED.explanation,
  is_hidden = EXCLUDED.is_hidden,
  order_index = EXCLUDED.order_index;
