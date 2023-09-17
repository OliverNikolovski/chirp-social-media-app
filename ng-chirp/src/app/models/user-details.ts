export interface UserDetails {
  id: number;
  name: string;
  username: string;
  profile_picture: string | null;
  created_at: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  birthdate: string | null;
  followers_count: number;
  following_count: number;
}
