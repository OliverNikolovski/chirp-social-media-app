export interface CreatePostRequest {
  text_content: string | null;
  image: File | null;
  post_id?: number;
  comment_id?: number;
  type: string;
}
