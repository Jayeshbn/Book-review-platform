export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url: string;
  created_at: string;
}

export interface Review {
  id: string;
  book_id: string;
  user_id: string;
  rating: number;
  content: string;
  created_at: string;
  user?: {
    email: string;
  };
}

export interface User {
  id: string;
  email: string;
}