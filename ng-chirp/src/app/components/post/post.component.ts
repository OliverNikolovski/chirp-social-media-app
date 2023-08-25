import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Post} from "../../models/post";


@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})
export class PostComponent {

  @Input({required: true}) post!: Post;

  @Output() like = new EventEmitter<Post>();
  @Output() unlike = new EventEmitter<Post>();

  get userProfilePicture(): string {
    return this.post.user.profile_picture ?? 'http://localhost:8000/profile-pictures/default.png';
  }

  onLikeOrUnlike() {
    if (this.post.like_id) {
      this.unlike.emit(this.post);
    }
    else  {
      this.like.emit(this.post);
    }
  }

}
