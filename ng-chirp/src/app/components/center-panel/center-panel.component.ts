import {Component, HostListener, Input} from "@angular/core";
import {User} from "../../models/user";
import {Post} from "../../models/post";

@Component({
  selector: 'app-center-panel',
  templateUrl: 'center-panel.component.html',
  styleUrls: ['center-panel.component.scss']
})
export class CenterPanelComponent {
  @Input() authenticatedUser!: User;

}
