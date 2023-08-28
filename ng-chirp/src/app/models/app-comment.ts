import {UserInfo} from "./post";

export interface AppComment {
  id: number;
  user: UserInfo;
  post_id: number;
  parent_comment_id: number | null;
  created_at: Date;
  text_content: string | null;
  image: string | null;
  like_id: number | null;
  likes_count: number;
  shares_count: number;
  comments_count: number;
}

