import {Pipe, PipeTransform} from "@angular/core";
import {UserResponse} from "../responses/user.response";
import {UserInfo} from "../models/post";
import {UserDetails} from "../models/user-details";

@Pipe({
  name: 'isSameUser'
})
export class IsSameUserPipe implements PipeTransform {

  transform(user1: UserResponse | UserInfo | UserDetails, user2: UserResponse | UserInfo | UserDetails): any {
    const id1 = 'data' in user1 ? user1.data.id : user1.id;
    const id2 = 'data' in user2 ? user2.data.id : user2.id;
    return id1 === id2;
  }

}
