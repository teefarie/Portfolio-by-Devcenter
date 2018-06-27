import {Pipe, PipeTransform} from '@angular/core';
import {TitleCasePipe} from "@angular/common";

@Pipe({
  name: 'stringFormatPipe'
})

export class stringFormatPipe implements PipeTransform {
  constructor(private _titleCasePipe:TitleCasePipe){}
  transform(value: string): string {
    if (value != null && value.trim().length < 4) {
      return value.toUpperCase()
    } else {
      return this._titleCasePipe.transform(value)
    }
  }
}
