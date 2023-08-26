import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {ScrollService} from "../../services/scroll.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  authenticatedUser!: User;

  @ViewChild('homePageWrapper')
  homePageWrapperRef!: ElementRef;

  constructor(private authService: AuthenticationService,
              private scrollService: ScrollService) {
    this.authService.fetchAuthenticatedUser()
      .subscribe(user => {
        this.authenticatedUser = user;
        this.authService.authentication$.next(user);
      });

    this.scrollService.scrollToTop.subscribe(() => {
      this.homePageWrapperRef.nativeElement.scrollTop = 0;
    });
  }

  onScroll() {
    this.scrollService.verticalScrollPosition.next(this.homePageWrapperRef.nativeElement.scrollTop);
  }
}
