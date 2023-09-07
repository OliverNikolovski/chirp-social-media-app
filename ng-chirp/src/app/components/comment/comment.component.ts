import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from "@angular/core";
import {AppComment} from "../../models/app-comment";
import {LikeService} from "../../services/like.service";
import {AddCommentComponent} from "../add-comment/add-comment.component";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})
export class CommentComponent {
//  to do: make comment section as component
  private currentPage = 1;
  hasNextPage = false;

  childComments: AppComment[] = [];

  @Input({required: true}) comment!: AppComment;

  @ViewChild('commentFormContainer', {read: ViewContainerRef})
  commentFormVcr!: ViewContainerRef;

  constructor(private likeService: LikeService,
              private commentService: CommentService) {
  }

  onLikeOrUnlike() {
    if (this.comment.like_id) {
      this.unlikeComment();
    } else {
      this.likeComment();
    }
  }

  displayAddComment() {
    if (this.commentFormVcr.length) {
      this.commentFormVcr.clear();
      return;
    }
    const componentRef = this.commentFormVcr.createComponent(AddCommentComponent);
    componentRef.instance.postId = this.comment.post_id;
    componentRef.instance.parentCommentId = this.comment.id;
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
          console.log(response);
          this.childComments.push(...response.data);
          this.hasNextPage = this.currentPage === response.meta.last_page;
          this.currentPage++;
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
