import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {DisplayAddCommentService} from "../../services/display-add-comment.service";

@Component({
  selector: 'app-post-view-card',
  templateUrl: 'post-view-card.component.html',
  styleUrls: ['post-view-card.component.scss']
})
export class PostViewCardComponent {

  @Input({required: true}) post!: Post;
  @Output() commentIconClicked = new EventEmitter<void>();

  constructor(private router: Router,
              private displayAddCommentService: DisplayAddCommentService) {
  }

  goToSharedPost(id: number) {
    this.router.navigate(['/home/post', id]);
  }

  onCommentIconClicked() {
    this.commentIconClicked.emit();
  }
}
