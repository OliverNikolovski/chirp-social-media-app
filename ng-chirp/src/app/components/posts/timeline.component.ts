import {Component, OnInit} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";


@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(postsResponse => {
        console.log('posts:',postsResponse.data);
        this.posts = postsResponse.data as Post[];
      });
  }

}
