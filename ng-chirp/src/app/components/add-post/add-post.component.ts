import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from "@angular/core";
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-add-post',
  templateUrl: 'add-post.component.html',
  styleUrls: ['add-post.component.scss']
})
export class AddPostComponent implements OnChanges {

  @Input() authenticatedUser!: User;

  @ViewChild('postInput') postInput!: ElementRef;

  postTextContent = '';
  postImage: File | null = null;
  postImageDataURL: string | ArrayBuffer | null = '';
  errors = false;


  constructor(private postService: PostService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authenticatedUser']) {
      console.log('authenticated user:', this.authenticatedUser);
    }
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

    this.postService.createPost(this.postTextContent, this.postImage)
      .subscribe({
        next: post => {
          console.log('created post:', post.data);
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

}
