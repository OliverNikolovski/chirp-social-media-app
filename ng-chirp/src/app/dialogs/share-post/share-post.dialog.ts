import {Component, Inject} from "@angular/core";
import {Post} from "../../models/post";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../services/post.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserResponse} from "../../responses/user.response";
import {AppComment} from "../../models/app-comment";

@Component({
  selector: 'share-post',
  templateUrl: 'share-post.dialog.html',
  styleUrls: ['share-post.dialog.scss']
})
export class SharePostDialog {
  authenticatedUser!: UserResponse;

  constructor(public matDialogRef: MatDialogRef<SharePostDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { post: Post | AppComment },
              private postService: PostService,
              private authService: AuthenticationService) {
    this.authService.authentication$.subscribe(auth => this.authenticatedUser = auth);

    this.postService.postCreated$.subscribe(() => this.matDialogRef.close(true));
  }

}
