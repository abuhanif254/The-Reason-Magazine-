export interface Post {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  authorId: string;
  authorName?: string;
  authorPhoto?: string;
  publishedAt: any; // Firestore Timestamp
  status: 'draft' | 'published';
  tags?: string[];
  category?: string;
  likesCount?: number;
  aiSummary?: string;
  relatedPostSlugs?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'author' | 'reader';
  createdAt: any;
}
