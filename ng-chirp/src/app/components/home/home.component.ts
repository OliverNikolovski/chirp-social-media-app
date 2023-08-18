import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authenticatedUser?: User

  constructor(private authService: AuthenticationService,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser()
      .subscribe(user => this.authenticatedUser = user);

    this.postService.getPosts()
      .subscribe(postsResponse => {
        console.log('posts:',postsResponse.data);
      });
  }

}
