import {Pipe, PipeTransform} from "@angular/core";
import {format} from 'date-fns';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(date: string | Date, formatterString: string): string {
    return format(new Date(date), formatterString);
  }

}
