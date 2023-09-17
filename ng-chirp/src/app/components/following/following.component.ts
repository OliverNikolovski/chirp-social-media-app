import {Component} from "@angular/core";
import {UserResponse} from "../../responses/user.response";
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-following',
  templateUrl: 'following.component.html',
  styleUrls: ['following.component.scss', '../followers/followers.component.scss']
})
export class FollowingComponent {
  authenticatedUser!: UserResponse;
  followings: User[] = [];
  loading = true;

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
    this.authService.authentication$.subscribe(user => this.authenticatedUser = user);
  }

  ngOnInit(): void {
    this.userService.getFollowing()
      .subscribe({
        next: response => {
          this.followings = response.following;
          this.loading = false;
        }
      });
  }


  onFollowingClick(id: number) {
    this.router.navigate(['/home/profile', id]);
  }
}
