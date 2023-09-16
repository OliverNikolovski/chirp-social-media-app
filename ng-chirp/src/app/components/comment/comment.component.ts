import {
  Component, EventEmitter,
  Input, Output,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {AppComment} from "../../models/app-comment";
import {LikeService} from "../../services/like.service";
import {AddCommentComponent} from "../add-comment/add-comment.component";
import {CommentService} from "../../services/comment.service";
import {DisplayAddCommentService} from "../../services/display-add-comment.service";
import {v4 as uuidv4} from 'uuid';
import {MatDialog} from "@angular/material/dialog";
import {SharePostDialog} from "../../dialogs/share-post/share-post.dialog";
import {NotificationService} from "../../services/notification.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})
export class CommentComponent {
  authenticatedUser!: User;
  private currentPage = 1;
  hasNextPage = false;

  childComments: AppComment[] = [];

  @Input({required: true}) comment!: AppComment;
  @Input() shared = false;

  @Output() delete = new EventEmitter<AppComment>();

  @ViewChild('commentFormContainer', {read: ViewContainerRef})
  commentFormVcr!: ViewContainerRef;

  uuid!: string;

  constructor(private likeService: LikeService,
              private commentService: CommentService,
              private displayAddCommentService: DisplayAddCommentService,
              private matDialog: MatDialog,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {
    this.authService.authentication$.subscribe(user => this.authenticatedUser = user);
    this.uuid = uuidv4();
    this.displayAddCommentService.display$
      .subscribe((value: string) => {
        if (value !== this.uuid) {
          this.commentFormVcr.clear();
        }
      });
  }

  onLikeOrUnlike() {
    if (this.comment.like_id) {
      this.unlikeComment();
    } else {
      this.likeComment();
    }
  }

  onCommentIconClicked() {
    this.loadChildComments();
    this.displayAddComment();
  }

  displayAddComment() {
    if (this.commentFormVcr.length) {
      this.commentFormVcr.clear();
      return;
    }
    this.displayAddCommentService.display$.next(this.uuid);
    const componentRef = this.commentFormVcr.createComponent(AddCommentComponent);
    componentRef.instance.postId = this.comment.post_id;
    componentRef.instance.parentCommentId = this.comment.id;
    componentRef.instance.commentAdded.subscribe(comment => {
      this.childComments.push(comment);
      this.comment.comments_count++;
    });
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

  loadChildComments() {
    this.commentService.getChildCommentsForComment(this.comment.id, this.currentPage)
      .subscribe({
        next: response => {
          this.childComments.push(...response.data);
          this.hasNextPage = this.currentPage === response.meta.last_page;
          this.currentPage++;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  trackByFn(index: number, comment: AppComment): number {
    return comment.id;
  }

  onShare() {
    const dialogRef = this.matDialog.open(SharePostDialog, {
      data: { post: this.comment } ,
      panelClass: 'scrollable-dialog',
      maxHeight: '70vh',
      width: '50vw'
    });

    dialogRef.afterClosed()
      .subscribe((created: boolean) => {
        if (created) {
          this.comment.shares_count++;
          this.notificationService.success('Comment successfully shared', 'center', 'bottom');
        }
      });
  }

  deleteComment() {
    this.delete.emit(this.comment);
  }
}
