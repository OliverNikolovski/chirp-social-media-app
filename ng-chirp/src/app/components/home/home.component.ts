import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {ScrollService} from "../../services/scroll.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authenticatedUser!: User;

  @ViewChild('homePageWrapper')
  homePageWrapperRef!: ElementRef;

  constructor(private authService: AuthenticationService,
              private scrollService: ScrollService) {
    this.authService.getAuthenticatedUser()
      .subscribe(user => this.authenticatedUser = user);
  }

  ngOnInit(): void {
  }

  onScroll() {
    this.scrollService.scrollTop.next(this.homePageWrapperRef.nativeElement.scrollTop);
  }
}
