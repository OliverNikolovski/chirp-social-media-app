import {Component, OnInit} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {ScrollService} from "../../services/scroll.service";
import {LikeService} from "../../services/like.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  private currentPage = 1;
  private hasNextPage = true;

  posts: Post[] = [];
  newlyCreatedPosts: Post[] = [];
  arePostsLoading = false;

  constructor(private postService: PostService,
              private scrollService: ScrollService,
              private likeService: LikeService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.loadPosts();

    this.postService.postCreated$
      .subscribe(post => {
        this.newlyCreatedPosts.unshift(post);
      });

    this.scrollService.verticalScrollPosition.subscribe(position => this.onScroll(position));
  }

  loadPosts() {
    if (this.arePostsLoading || !this.hasNextPage) {
      return;
    }

    this.arePostsLoading = true;

    this.postService.getPosts(this.currentPage)
      .subscribe({
        next: postsResponse => {
          this.posts = [...this.posts, ...postsResponse.data];
          this.hasNextPage = postsResponse.meta.last_page > this.currentPage;
          this.currentPage++;
          this.arePostsLoading = false;
        },
        error: error => {
          console.error(error);
          this.arePostsLoading = false;
        }
      });
  }

  onScroll(scrollPosition: number) {
    const approximateTimelineHeight = (this.posts.length + this.newlyCreatedPosts.length) * 150;

    if (scrollPosition >= approximateTimelineHeight - 200) {
      this.loadPosts();
    }
  }

  onLike(post: Post) {
    this.likeService.likePost(post.id)
      .subscribe({
        next: likeResponse => {
          post.like_id = likeResponse.data.id;
          post.likes_count++;
        }
      })
  }

  onUnlike(post: Post) {
    if (!post.like_id) {
      return;
    }

    this.likeService.deleteLike(post.like_id)
      .subscribe(response => {
        post.like_id = null;
        post.likes_count--;
      });
  }

  onPostClick(id: number) {
    this.router.navigate(['../post', id], {relativeTo: this.route});
  }

  onDelete(post: Post) {
    this.postService.deletePost(post.id)
      .subscribe({
        next: response => {
          this.posts = this.posts.filter(p => p.id !== post.id);
          this.notificationService.success(response.message, 'center', 'bottom');
        },
        error: err => this.notificationService.error(err.message, 'center', 'bottom')
      });
  }
}
