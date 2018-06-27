/**
 * Created by KolawoleBalogun on 4/5/17.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials'
})

export class GetInitialsPipe implements PipeTransform {
  transform(firstname: String, lastname: String): String {
    let initials = "";
    if (firstname) initials += firstname[0];
    if (lastname) initials += lastname[0];

    return initials;
  }
}
