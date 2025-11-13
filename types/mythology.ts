export interface MythologyLesson {
  id: string;
  title: string;
  description: string;
  culture: string; // e.g., "Greek", "Norse", "Egyptian"
  content: string;
  questions: MythQuestion[];
  reward: string; // Amount of NICHE tokens to reward
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface MythQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MythologyProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
  rewardClaimed: boolean;
}

export interface UserMythologyProgress {
  userId: string;
  completedLessons: string[];
  totalRewardsEarned: string;
  currentStreak: number;
  lastStudyDate?: Date;
}
