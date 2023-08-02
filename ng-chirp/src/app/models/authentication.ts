import {User} from "./user";

export interface Authentication {
  user: User;
  access_token: string;
}
