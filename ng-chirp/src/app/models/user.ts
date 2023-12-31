export interface User {
  id: number;
  name: string;
  username: string;
  email_verified_at: string | null;
  created_at: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  birthdate: string | null;
  profile_picture: string | null;
  is_admin: boolean
}
