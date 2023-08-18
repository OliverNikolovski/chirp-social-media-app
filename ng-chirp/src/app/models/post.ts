export interface Post {
  id: number;
  user_id: number;
  created_at: Date;
  text_content: string;
  image: string;
  type: string;
  likes_count: number;
  shares_count: number;
  comments_count: number;
}
