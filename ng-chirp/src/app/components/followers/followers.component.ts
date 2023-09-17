import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {UserResponse} from "../../responses/user.response";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-followers',
  templateUrl: 'followers.component.html',
  styleUrls: ['followers.component.scss']
})
export class FollowersComponent implements OnInit {

  authenticatedUser!: UserResponse;
  followers: User[] = [];
  loading = true;

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
    this.authService.authentication$.subscribe(user => this.authenticatedUser = user);
  }

  ngOnInit(): void {
    this.userService.getFollowers()
      .subscribe({
        next: response => {
          this.followers = response.followers;
          this.loading = false;
        }
      });
  }


  onFollowerClick(id: number) {
    this.router.navigate(['/home/profile', id]);
  }
}
