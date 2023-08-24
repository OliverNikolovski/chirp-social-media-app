import {Component, OnInit} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";


@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  private currentPage = 1;

  posts: Post[] = [];
  newlyCreatedPosts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.loadPosts();

    this.postService.postCreated$
      .subscribe(post => this.newlyCreatedPosts.unshift(post));
  }

  loadPosts() {
    this.postService.getPosts(this.currentPage)
      .subscribe(postsResponse => {
        console.log('timeline:',postsResponse.data);
        this.posts = [...this.posts, ...postsResponse.data];
        this.currentPage++;
      });
  }

  onScrollIndexChange(index: number) {
    if (index === this.posts.length - 1) {
      this.loadPosts();
    }
  }

}
