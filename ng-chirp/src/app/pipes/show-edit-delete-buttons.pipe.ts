import {Pipe, PipeTransform} from "@angular/core";
import {UserResponse} from "../responses/user.response";
import {UserInfo} from "../models/post";

@Pipe({
  name: 'showEditDeleteButtons'
})
export class ShowEditDeleteButtonsPipe implements PipeTransform {
  transform(authenticatedUser: UserResponse, user: UserInfo, shared?: boolean): any {
    return !shared && authenticatedUser.data.id === user.id;
  }

}
