import {Pipe, PipeTransform} from "@angular/core";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(date: Date | string): string {
    return formatDistanceToNow(new Date(date), {addSuffix: true})
  }

}
