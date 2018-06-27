/**
 * Created by KolawoleBalogun on 4/5/17.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'explode'
})

export class ExplodePipe implements PipeTransform {
  transform(value: String, delimiter: String): String[] {
    return value.split('' + delimiter);
  }
}
