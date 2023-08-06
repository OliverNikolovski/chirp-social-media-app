export interface UserRegisterRequest {
  name: string;
  username: string;
  password: string;
  password_confirmation: string
  bio: string | null;
  location: string | null;
  website: string | null;
  birthdate: Date | null;
  profile_picture: File | null;
}
