import {Follow} from "../models/follow";

export interface IsFollowingResponse {
  is_following: boolean;
  follow: Follow
}
