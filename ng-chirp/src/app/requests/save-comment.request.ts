export interface SaveCommentRequest {
  text_content?: string;
  image?: File;
  post_id: number;
  parent_comment_id?: number;
}
