import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Post} from "../../models/post";
import {MatDialog} from "@angular/material/dialog";
import {AddCommentDialog} from "../../dialogs/add-comment/add-comment.dialog";


@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})
export class PostComponent {

  @Input({required: true}) post!: Post;

  @Output() like = new EventEmitter<Post>();
  @Output() unlike = new EventEmitter<Post>();

  constructor(private matDialog: MatDialog) {
  }

  onLikeOrUnlike() {
    if (this.post.like_id) {
      this.unlike.emit(this.post);
    }
    else  {
      this.like.emit(this.post);
    }
  }

  openCommentDialog() {
    const matDialogRef = this.matDialog.open(AddCommentDialog, {
      data: { post: this.post },
      panelClass: 'scrollable-dialog',
      maxHeight: '70vh',
      width: '50vw'
    });

    matDialogRef.afterClosed().subscribe(() => console.log('closed'));
  }
}
