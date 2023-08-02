import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {Authentication} from "../../models/authentication";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authentication?: Authentication;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('in on init')
    this.authService.accessChange$.subscribe(authentication => {
      console.log('vlegov')
      this.authentication = authentication;
      console.log('authentication:',this.authentication);
    });
  }

}
