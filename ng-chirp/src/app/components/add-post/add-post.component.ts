import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from "@angular/core";
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {CreatePostRequest} from "../../requests/create-post.request";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-add-post',
  templateUrl: 'add-post.component.html',
  styleUrls: ['add-post.component.scss']
})
export class AddPostComponent {

  authenticatedUser!: User;
  @Input() share?: Post;

  @ViewChild('postInput') postInput!: ElementRef;

  postTextContent = '';
  postImage: File | null = null;
  postImageDataURL: string | ArrayBuffer | null = '';
  errors = false;


  constructor(private postService: PostService,
              private authService: AuthenticationService) {
    this.authService.authentication$.subscribe(auth => this.authenticatedUser = auth);
  }

  onPostInputChange() {
    const nativeElement = this.postInput.nativeElement;
    nativeElement.style.height = 'auto';
    nativeElement.style.height = nativeElement.scrollHeight + 'px';
  }

  onSubmit() {
    if (!this.postTextContent && !this.postImage) {
      this.errors = true;
      return;
    }
    this.errors = false;

    const request = this.getCreatePostRequestObject();

    this.postService.createPost(request)
      .subscribe({
        next: post => {
          this.postService.postCreated$.next(post.data);
          this.postTextContent = '';
          this.postImageDataURL = null;
        },
        error: err => console.log(err)
      });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (!file) {
      this.postImage = null;
      this.postImageDataURL = null;
      return;
    }

    this.postImage = file;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.postImageDataURL = event.target!.result;
    }
    reader.readAsDataURL(file);
  }

  getCreatePostRequestObject(): CreatePostRequest {
    return {
      text_content: this.postTextContent,
      image: this.postImage,
      post_id: this.share?.id,
      type: 'p'
    }
  }

}
