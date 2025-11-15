export interface KingsLesson {
  id: string;
  title: string;
  description: string;
  period: string; // e.g., "United Kingdom Period" or "Divided Kingdom Period"
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

export interface KingsProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
  rewardClaimed: boolean;
}

export interface UserKingsProgress {
  userId: string;
  completedLessons: string[];
  totalRewardsEarned: string;
  currentStreak: number;
  lastStudyDate?: Date;
}
