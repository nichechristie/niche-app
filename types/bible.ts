export interface BibleLesson {
  id: string;
  title: string;
  description: string;
  scripture: string;
  content: string;
  questions: Question[];
  reward: string; // Amount of NICHE tokens to reward
  estimatedTime: string; // e.g., "10 minutes"
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer
  explanation: string;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
  rewardClaimed: boolean;
}

export interface UserBibleProgress {
  userId: string;
  completedLessons: string[];
  totalRewardsEarned: string;
  currentStreak: number;
  lastStudyDate?: Date;
}
