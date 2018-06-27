import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rolesPlaceholder'
})

export class RolesPlaceholderPipe implements PipeTransform {
  transform(value: string): string {
    let n = parseInt(value);
    let prefix = ['', '', 'Another'];

    return prefix[n];
  }
}
