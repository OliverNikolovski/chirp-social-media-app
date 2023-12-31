import {AppComment} from "./app-comment";

export interface Post {
  id: number;
  user: UserInfo;
  created_at: Date;
  text_content: string;
  image: string | null;
  type: string;
  likes_count: number;
  shares_count: number;
  comments_count: number;
  like_id: number | null;
  shared_post: Post | null;
  shared_comment: AppComment | null;
}

export interface UserInfo {
  id: number;
  name: string;
  profile_picture: string | null;
  username: string;
}
