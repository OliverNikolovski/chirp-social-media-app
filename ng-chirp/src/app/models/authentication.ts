import {UserResponse} from "../responses/user.response";

export interface Authentication {
  user: UserResponse;
  access_token: string;
}
