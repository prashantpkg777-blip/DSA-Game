export type ComplexityNotation = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n^2)' | 'O(2^n)' | 'O(n!)';

export interface ComplexityInfo {
  timeBest: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  hint?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface CodeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  functionName: string;
  testCases: TestCase[];
  hints: string[];
  optimalSolution: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
  };
}

export interface BossStage {
  stageNumber: number;
  title: string;
  type: 'concept' | 'visual_challenge' | 'coding';
  description: string;
  question?: QuizQuestion;
  challengeGoal?: string;
  codeProblem?: CodeProblem;
  points: number;
}

export interface BossBattle {
  id: string;
  name: string;
  avatar: string;
  title: string;
  regionId: string;
  description: string;
  health: number;
  xpReward: number;
  stages: BossStage[];
  victoryBadgeId: string;
}

export type TopicCategory = 
  | 'foundations'
  | 'arrays'
  | 'sorting'
  | 'searching'
  | 'linked_lists'
  | 'stacks_queues'
  | 'hashing'
  | 'trees'
  | 'heaps'
  | 'recursion'
  | 'greedy'
  | 'graphs'
  | 'dp'
  | 'tries'
  | 'advanced';

export interface TopicLesson {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: TopicCategory;
  regionId: string;
  order: number;
  xpReward: number;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  
  // Real educational content
  content: {
    whatIsIt: string;
    whyItMatters: string;
    intuition: string;
    stepByStep: string[];
    pseudocode: string;
    complexity: ComplexityInfo;
    commonMistakes: string[];
    edgeCases: string[];
    realWorldApplications: string[];
    whenToUse: string[];
    whenNotToUse: string[];
    relatedAlgorithms: string[];
  };

  quizQuestions: QuizQuestion[];
  codeProblem: CodeProblem;
  visualizerType: 
    | 'array_sorting'
    | 'binary_search'
    | 'linked_list'
    | 'stack'
    | 'queue'
    | 'hash_map'
    | 'tree'
    | 'graph'
    | 'dp_table'
    | 'two_pointers'
    | 'sliding_window'
    | 'general';
}

export interface WorldRegion {
  id: string;
  number: number;
  name: string;
  tagline: string;
  description: string;
  themeColor: string;
  accentGlow: string;
  icon: string;
  requiredLevel: number;
  topics: TopicLesson[];
  bossBattle: BossBattle;
  unlockedByDefault?: boolean;
}
