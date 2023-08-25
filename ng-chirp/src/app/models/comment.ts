export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  created_at: Date;
  text_content: string | null;
  image: string | null;
}
