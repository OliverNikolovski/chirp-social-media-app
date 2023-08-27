import {Component, Input} from "@angular/core";
import {Post} from "../../models/post";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-view-card',
  templateUrl: 'post-view-card.component.html',
  styleUrls: ['post-view-card.component.scss']
})
export class PostViewCardComponent {

  @Input({required: true}) post!: Post;

  constructor(private router: Router) {
  }

  goToSharedPost(id: number) {
    console.log('vlegov')
    this.router.navigate(['/home/post', id]);
  }
}
