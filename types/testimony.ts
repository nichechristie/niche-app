export interface Testimony {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: TestimonyCategory;
  tags: string[];
  likes: string[];
  comments: TestimonyComment[];
  createdAt: Date;
  updatedAt?: Date;
}

export type TestimonyCategory =
  | "Salvation"
  | "Healing"
  | "Provision"
  | "Answered Prayer"
  | "Deliverance"
  | "Restored Relationship"
  | "Spiritual Growth"
  | "Miracle"
  | "Other";

export interface TestimonyComment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

export interface CreateTestimonyData {
  title: string;
  content: string;
  category: TestimonyCategory;
  tags: string[];
}
