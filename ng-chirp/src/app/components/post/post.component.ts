import {Component, Input} from "@angular/core";
import {Post} from "../../models/post";


@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})
export class PostComponent {

  @Input({required: true}) post!: Post;

  get userProfilePicture(): string {
    return this.post.user.profile_picture ?? 'http://localhost:8000/profile-pictures/default.png';
  }

}
