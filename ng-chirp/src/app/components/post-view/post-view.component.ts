import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {NotificationService} from "../../services/notification.service";
import {Location} from "@angular/common";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-post-view',
  templateUrl: 'post-view.component.html',
  styleUrls: ['post-view.component.scss']
})
export class PostViewComponent implements OnInit{
  postId!: number;
  post?: Post;
  comments: Comment[] = [];
  currentCommentPageNumber = 1;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private notificationService: NotificationService,
              private location: Location,
              private commentService: CommentService) {
  }

  ngOnInit() {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPost();
    this.loadComments();
  }

  onBack() {
    this.location.back();
  }

  private loadPost() {
    this.postService.getPostById(this.postId)
      .subscribe({
        next: post => {
          this.post = post.data;
        },
        error: error => {
          this.notificationService.error(error.message);
        }
      });
  }

  private loadComments() {
    this.commentService.getCommentsForPost(this.postId, this.currentCommentPageNumber)
      .subscribe(response => {
        this.comments = [...this.comments, ...response.data];
        this.currentCommentPageNumber++;
      });
  }
}
