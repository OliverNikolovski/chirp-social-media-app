export interface UserResponse {
  data: {
    id: number;
    name: string;
    username: string;
    email_verified_at: Date | null;
    created_at: Date;
    bio: string | null;
    location: string | null;
    website: string | null;
    birthdate: Date | null;
    profile_picture: string | null;
  }
}
