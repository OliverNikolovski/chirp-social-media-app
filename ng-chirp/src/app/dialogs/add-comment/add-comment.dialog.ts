import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommentService} from "../../services/comment.service";
import {FormGroup} from "@angular/forms";
import {Post, UserInfo} from "../../models/post";

@Component({
  selector: 'add-comment',
  templateUrl: 'add-comment.dialog.html',
  styleUrls: ['add-comment.dialog.scss']
})
export class AddCommentDialog implements OnInit {
  authenticatedUser: UserInfo;
  commentImageDataURL: string | ArrayBuffer | null = '';
  errors = false;
  commentImage: File | null = null;

  @ViewChild('commentInput')
  commentInput!: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddCommentDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { post: Post, parent_comment_id?: number },
              private commentService: CommentService) {
    this.authenticatedUser = this.data.post.user;
  }

  ngOnInit() {

  }

  onSubmit(form: FormGroup) {
    console.log('form',form);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onCommentInputChange() {
    const nativeElement = this.commentInput.nativeElement;
    nativeElement.style.height = 'auto';
    nativeElement.style.height = nativeElement.scrollHeight + 'px';
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (!file) {
      this.commentImage = null;
      this.commentImageDataURL = null;
      return;
    }

    this.commentImage = file;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.commentImageDataURL = event.target!.result;
    }
    reader.readAsDataURL(file);
  }
}
