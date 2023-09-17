import {Component, EventEmitter, Input, Output} from "@angular/core";
import {UserResponse} from "../../responses/user.response";
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {LikeService} from "../../services/like.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-left-panel',
  templateUrl: 'left-panel.component.html',
  styleUrls: ['left-panel.component.scss']
})
export class LeftPanelComponent {
  authenticatedUser!: UserResponse;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.authService.authentication$.subscribe(user => this.authenticatedUser = user);
  }

  onLogout(event: MouseEvent) {
    event.preventDefault();
    this.authService.logout()
      .subscribe(() => this.router.navigate(['/login']))
  }
}
