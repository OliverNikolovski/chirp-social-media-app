import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DisplayAddCommentService {

  public display$ = new Subject<string>();

}
