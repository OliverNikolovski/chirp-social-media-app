export interface Like {
  id: number;
  user_id: number;
  post_id: number | null;
  comment_id: number | null;
  type: string;
}
