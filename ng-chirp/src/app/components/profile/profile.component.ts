import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Post} from "../../models/post";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {filter, forkJoin, map, mergeMap, switchMap, take} from "rxjs";
import {PostsPaginationResponse} from "../../responses/posts-pagination-response";
import {UserDetails} from "../../models/user-details";
import {UserResponse} from "../../responses/user.response";
import {AuthenticationService} from "../../services/authentication.service";
import {FollowUnfollowService} from "../../services/follow-unfollow.service";
import {IsFollowingResponse} from "../../responses/is-following.response";
import {Follow} from "../../models/follow";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.components.scss']
})
export class ProfileComponent implements OnInit {

  posts: Post[] = [];
  details?: UserDetails;
  currentPage = 1;
  hasNextPage = true;
  arePostsLoading = true;
  authenticatedUser!: UserResponse;
  isAuthenticatedUserFollowingThisUser?: boolean;
  follow?: Follow;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private followService: FollowUnfollowService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.authenticationService.authentication$
      .pipe(
        take(1),
        switchMap((user: UserResponse) => {
          this.authenticatedUser = user;
          return this.route.paramMap;
        }),
        filter((paramMap: ParamMap) => paramMap.has('id')),
        map((paramMap: ParamMap) => +paramMap.get('id')!),
        switchMap((id: number) =>
          forkJoin([
            this.userService.getPostsForUser(id, this.currentPage),
            this.userService.getUserDetails(id),
            this.followService.checkFollow(this.authenticatedUserId!, id)
          ])
        ),
      )
      .subscribe(([userPostsResponse, userDetails, isFollowingResponse]:
                    [PostsPaginationResponse, UserDetails, IsFollowingResponse]) => {
        this.posts = userPostsResponse.data;
        this.details = userDetails;
        this.isAuthenticatedUserFollowingThisUser = isFollowingResponse.is_following;
        this.hasNextPage = userPostsResponse.links.next !== null;
        this.arePostsLoading = false;
        console.log('isFollowingResponse',isFollowingResponse)
      });
  }


  get authenticatedUserId(): number | undefined {
    return this.authenticatedUser?.data.id;
  }

  unfollowUser() {
    if (!this.follow)
      return;

    this.followService.unfollow(this.follow.id)
      .subscribe({
        next: response => {
          this.follow = undefined;
          this.isAuthenticatedUserFollowingThisUser = false;
          this.details!.followers_count--;
          this.notificationService.success(response.message, 'right', 'top');
        },
        error: err => this.notificationService.error(err.message, 'right', 'top')
      });
  }

  followUser() {
    this.followService.follow(this.details!.id)
      .subscribe({
        next: response => {
          this.follow = response.follow;
          this.isAuthenticatedUserFollowingThisUser = true;
          this.details!.followers_count++;
          this.notificationService.success(response.message, 'right', 'top');
        },
        error: err => this.notificationService.error(err.message, 'right', 'top')
      });
  }

  loadMorePosts() {
    if (!this.hasNextPage) {
      return;
    }

    this.arePostsLoading = true;

    this.currentPage++;
    this.userService.getPostsForUser(this.details!.id, this.currentPage)
      .subscribe(userPostsResponse => {
        this.posts.push(...userPostsResponse.data);
        this.hasNextPage = userPostsResponse.links.next !== null;
        this.arePostsLoading = false;
      });
  }
}
