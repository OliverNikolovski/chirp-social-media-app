import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrollTop = new Subject<number>();

}
