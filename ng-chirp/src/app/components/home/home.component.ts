import {Component, ElementRef, ViewChild} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {ScrollService} from "../../services/scroll.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('homePageWrapper')
  homePageWrapperRef!: ElementRef;

  constructor(private authService: AuthenticationService,
              private scrollService: ScrollService) {
    this.authService.fetchAuthenticatedUser()
      .subscribe(user => {
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
