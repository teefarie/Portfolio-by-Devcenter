import {Pipe, PipeTransform} from '@angular/core';
import {TitleCasePipe} from "@angular/common";

@Pipe({
  name: 'titleCase'
})

export class titleCasePipe implements PipeTransform {
  constructor(private _titleCasePipe: TitleCasePipe) {
  }

  transform(value: string): string {
    if(value !== null) {
      return this._titleCasePipe.transform(value)
    }
  }
}
