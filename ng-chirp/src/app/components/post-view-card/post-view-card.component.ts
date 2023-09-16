import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {LikeService} from "../../services/like.service";
import {MatDialog} from "@angular/material/dialog";
import {SharePostDialog} from "../../dialogs/share-post/share-post.dialog";
import {NotificationService} from "../../services/notification.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-post-view-card',
  templateUrl: 'post-view-card.component.html',
  styleUrls: ['post-view-card.component.scss']
})
export class PostViewCardComponent {

  authenticatedUser!: User;

  @Input({required: true}) post!: Post;
  @Output() commentIconClicked = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Post>();

  constructor(private router: Router,
              private likeService: LikeService,
              private matDialog: MatDialog,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {
    this.authService.authentication$.subscribe(user => this.authenticatedUser = user);
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
    } else {
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

  sharePost() {
    const dialogRef = this.matDialog.open(SharePostDialog, {
      data: {
        post: this.post,
        panelClass: 'scrollable-dialog',
        maxHeight: '70vh',
        width: '50vw'
      }
    });

    dialogRef.afterClosed()
      .subscribe((created: boolean) => {
        if (created) {
          this.post.shares_count++;
          this.notificationService.success('Post successfully shared', 'center', 'bottom');
        }
      })
  }

  onDelete() {
    this.delete.emit(this.post);
  }

}
