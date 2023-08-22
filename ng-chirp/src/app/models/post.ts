export interface Post {
  id: number;
  user: UserInfo;
  created_at: Date;
  text_content: string;
  image: string;
  type: string;
  likes_count: number;
  shares_count: number;
  comments_count: number;
  comments: Comment[];
}

interface UserInfo {
  id: number;
  name: string;
  profile_picture: string;
  username: string;
}
