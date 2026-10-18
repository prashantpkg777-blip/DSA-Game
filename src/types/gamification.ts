export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  title: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  joinedDate: string;
  isGuest: boolean;
}

export interface UserStats {
  problemsSolved: number;
  lessonsCompleted: number;
  bossesDefeated: number;
  accuracy: number; // percentage (0 - 100)
  totalSubmissions: number;
  correctSubmissions: number;
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: number[]; // 7 numbers [Sun, Mon, Tue, Wed, Thu, Fri, Sat] representing actions/XP
  topicsMastered: number;
  totalTimeSpentMinutes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'mastery' | 'streak' | 'speed' | 'special';
  icon: string;
  xpReward: number;
  unlockedAt: string | null;
  progress: number; // 0 to maxProgress
  maxProgress: number;
  isUnlocked: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: 'solve' | 'visualize' | 'review' | 'streak' | 'complexity';
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  dateAssigned: string; // YYYY-MM-DD
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'in_progress' | 'mastered';
  prerequisites: string[];
  xpEarned: number;
  xpTotal: number;
  position: { x: number; y: number };
}

export interface MistakeRecord {
  id: string;
  topicId: string;
  topicTitle: string;
  type: 'quiz' | 'complexity' | 'visualizer' | 'coding';
  questionOrChallenge: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  timestamp: string;
  reviewed: boolean;
}
