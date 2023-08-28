import {Component, Input} from "@angular/core";
import {AppComment} from "../../models/app-comment";
import {LikeService} from "../../services/like.service";

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})
export class CommentComponent {

  @Input({required: true}) comment!: AppComment;

  constructor(private likeService: LikeService) {
  }

  onLikeOrUnlike() {
    if (this.comment.like_id) {
      this.unlikeComment();
    } else {
      this.likeComment();
    }
  }

  private likeComment() {
    this.likeService.likeComment(this.comment.id)
      .subscribe(response => {
        this.comment.likes_count++;
        this.comment.like_id = response.data.id;
      });
  }

  private unlikeComment() {
    this.likeService.deleteLike(this.comment.like_id!)
      .subscribe(() => {
        this.comment.likes_count--;
        this.comment.like_id = null;
      });
  }
}
