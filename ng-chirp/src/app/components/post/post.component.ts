import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Post, UserInfo} from "../../models/post";
import {MatDialog} from "@angular/material/dialog";
import {AddCommentDialog} from "../../dialogs/add-comment/add-comment.dialog";
import {SharePostDialog} from "../../dialogs/share-post/share-post.dialog";
import {ScrollService} from "../../services/scroll.service";
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})
export class PostComponent {

  authenticatedUser!: User;

  @Input({required: true}) post!: Post;
  @Input() shared = false;

  @Output() like = new EventEmitter<Post>();
  @Output() unlike = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<Post>();

  constructor(private matDialog: MatDialog,
              private scrollService: ScrollService,
              private authService: AuthenticationService) {
    this.authService.authentication$.subscribe(user => this.authenticatedUser = user);
  }

  onLikeOrUnlike(event: Event) {
    event.stopPropagation();
    if (this.post.like_id) {
      this.unlike.emit(this.post);
    }
    else  {
      this.like.emit(this.post);
    }
  }

  openCommentDialog(event: Event) {
    event.stopPropagation();
    const matDialogRef = this.matDialog.open(AddCommentDialog, {
      data: { post: this.post },
      panelClass: 'scrollable-dialog',
      maxHeight: '70vh',
      width: '50vw'
    });

    matDialogRef.afterClosed().subscribe(isSuccessful => {
      if (isSuccessful) {
        this.post.comments_count++;
      }
    });
  }

  sharePost(event: Event) {
    event.stopPropagation();
    const dialogRef = this.matDialog.open(SharePostDialog, {
      data: { post: this.post } ,
      panelClass: 'scrollable-dialog',
      maxHeight: '70vh',
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(successful => {
      if (successful) {
        this.post.shares_count++;
        this.scrollService.scrollToTop.next(true);
      }
    });
  }

  deletePost() {
    this.delete.emit(this.post);
  }
}
