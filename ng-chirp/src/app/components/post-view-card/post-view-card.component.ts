import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {LikeService} from "../../services/like.service";

@Component({
  selector: 'app-post-view-card',
  templateUrl: 'post-view-card.component.html',
  styleUrls: ['post-view-card.component.scss']
})
export class PostViewCardComponent {

  @Input({required: true}) post!: Post;
  @Output() commentIconClicked = new EventEmitter<void>();

  constructor(private router: Router,
              private likeService: LikeService) {
  }

  goToSharedPost(id: number) {
    this.router.navigate(['/home/post', id]);
  }

  onCommentIconClicked() {
    this.commentIconClicked.emit();
  }

  likeOrUnlike() {
    if (this.post.like_id) {
      this.unlike();
    }
    else {
      this.like();
    }
  }

  private like() {
    this.likeService.likePost(this.post.id)
      .subscribe({
        next: likeResponse => {
          this.post.like_id = likeResponse.data.id;
          this.post.likes_count++;
        }
      })
  }

  private unlike() {
    if (!this.post.like_id) {
      return;
    }

    this.likeService.deleteLike(this.post.like_id)
      .subscribe(response => {
        this.post.like_id = null;
        this.post.likes_count--;
      });
  }
}
