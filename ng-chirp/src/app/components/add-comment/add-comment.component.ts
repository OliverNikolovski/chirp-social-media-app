import {Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from "@angular/core";
import {User} from "../../models/user";
import {Post, UserInfo} from "../../models/post";
import {PostService} from "../../services/post.service";
import {AuthenticationService} from "../../services/authentication.service";
import {CreatePostRequest} from "../../requests/create-post.request";
import {CommentService} from "../../services/comment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {FormGroup} from "@angular/forms";
import {SaveCommentRequest} from "../../requests/save-comment.request";
import {AppComment} from "../../models/app-comment";

interface CommentForm {
  commentTextContent: string;
  commentImage: string;
}


@Component({
  selector: 'app-add-comment',
  templateUrl: 'add-comment.component.html',
  styleUrls: ['add-comment.component.scss']
})
export class AddCommentComponent {
  authenticatedUser!: User;
  commentImageDataURL: string | ArrayBuffer | null = '';
  errors = false;
  commentImage: File | null = null;

  @ViewChild('commentInput')
  commentInput!: ElementRef;

  @Input({required: true}) postId!: number;
  @Input() parentCommentId?: number;

  @Output() commentAdded = new EventEmitter<AppComment>();

  constructor(private commentService: CommentService,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {
    this.authService.authentication$.subscribe(auth => this.authenticatedUser = auth);
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
          this.commentAdded.emit(response.data);
          form.get('commentTextContent')?.reset();
          this.notificationService.success('Your comment was sent', 'center', 'bottom');
        },
        error: error => {
          this.notificationService.error(error.message, 'center', 'bottom');
        }
      });
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
    request.post_id = this.postId;
    request.parent_comment_id = this.parentCommentId;
    if (textContent)
      request.text_content = textContent;
    if (this.commentImage)
      request.image = this.commentImage;

    return request;
  }
}
