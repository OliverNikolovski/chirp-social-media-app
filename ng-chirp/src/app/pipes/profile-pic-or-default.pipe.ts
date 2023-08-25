import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'profilePicOrDefault'
})
export class ProfilePicOrDefaultPipe implements PipeTransform{

  transform(url: string | null): string {
    return url ?? 'http://localhost:8000/profile-pictures/default.png';
  }

}
