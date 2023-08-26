import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommentService} from "../../services/comment.service";
import {FormGroup} from "@angular/forms";
import {Post, UserInfo} from "../../models/post";
import {SaveCommentRequest} from "../../requests/save-comment.request";
import {NotificationService} from "../../services/notification.service";

interface CommentForm {
  commentTextContent: string;
  commentImage: string;
}

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
              private commentService: CommentService,
              private notificationService: NotificationService) {
    this.authenticatedUser = this.data.post.user;
  }

  ngOnInit() {

  }

  onSubmit(form: FormGroup) {
    if (!this.isFormValid(form.value)) {
      this.errors = true;
      return;
    }
    this.errors = false;

    const request = this.getSaveCommentRequestObject(form.value.commentTextContent);
    this.commentService.save(request)
      .subscribe({
        next: response => {
          this.notificationService.success('Your comment was sent', 'center', 'bottom');
          this.closeDialog(true);
        },
        error: error => {
          this.notificationService.error(error.message, 'center', 'bottom');
          this.closeDialog(false);
        }
      });
  }

  closeDialog(value: boolean) {
    this.dialogRef.close(value);
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

  isFormValid(value: CommentForm): boolean {
    return Boolean(value.commentTextContent) || Boolean(value.commentImage);
  }

  getSaveCommentRequestObject(textContent: string): SaveCommentRequest {
    const request = {} as SaveCommentRequest;
    request.post_id = this.data.post.id;
    if (textContent)
      request.text_content = textContent;
    if (this.commentImage)
      request.image = this.commentImage;

    return request;
  }
}
