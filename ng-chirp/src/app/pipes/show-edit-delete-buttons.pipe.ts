import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../models/user";
import {UserInfo} from "../models/post";

@Pipe({
  name: 'showEditDeleteButtons'
})
export class ShowEditDeleteButtonsPipe implements PipeTransform {
  transform(authenticatedUser: User, user: UserInfo, shared?: boolean): any {
    return !shared && authenticatedUser.data.id === user.id;
  }

}
