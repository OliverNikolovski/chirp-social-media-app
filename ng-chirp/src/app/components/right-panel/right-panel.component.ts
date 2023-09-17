import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();

  @ViewChild('searchBox')
  searchBox!: ElementRef;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onUserClick(id: number) {
    (this.searchBox.nativeElement as HTMLInputElement).value = '';
    this.search('');
    this.router.navigate(['/home/profile', id]);
  }
}
