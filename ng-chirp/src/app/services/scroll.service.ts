import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  verticalScrollPosition = new Subject<number>();

  scrollToTop = new Subject<boolean>();

}
