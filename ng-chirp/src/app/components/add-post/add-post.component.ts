import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {User} from "../../models/user";

@Component({
  selector: 'app-add-post',
  templateUrl: 'add-post.component.html',
  styleUrls: ['add-post.component.scss']
})
export class AddPostComponent implements OnChanges {

  @Input() authenticatedUser!: User;
  @ViewChild('postInput') postInput!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authenticatedUser']) {
      console.log('authenticated user:', this.authenticatedUser);
    }
  }

  onPostInputChange() {
    const nativeElement = this.postInput.nativeElement;
    nativeElement.style.height = 'auto';
    nativeElement.style.height = nativeElement.scrollHeight + 'px';
  }

}
