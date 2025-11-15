export interface JesusLesson {
  id: string;
  title: string;
  description: string;
  topic: string; // e.g., "Life & Ministry", "Teachings", "Miracles", etc.
  content: string;
  questions: Question[];
  reward: string; // Amount of NICHE tokens to reward
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer
  explanation: string;
}

export interface JesusProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
  rewardClaimed: boolean;
}

export interface UserJesusProgress {
  userId: string;
  completedLessons: string[];
  totalRewardsEarned: string;
  currentStreak: number;
  lastStudyDate?: Date;
}
