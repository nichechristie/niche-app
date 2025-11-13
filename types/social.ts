export interface User {
  id: string;
  address: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followers: string[];
  following: string[];
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  mediaType?: "image" | "video";
  mediaUrl?: string;
  coinAddress?: string;
  coinSymbol?: string;
  coinName?: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  address: string;
  creator: string;
  postId: string;
  initialSupply: string;
  pairedWithNICHE: boolean;
  pairedWithETH: boolean;
}
