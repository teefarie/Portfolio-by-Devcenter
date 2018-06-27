import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'workTypeFormat'
})

export class workTypeFormatPipe implements PipeTransform {
  transform(value: Object): string {
    let outputArray: string[] = [];
    let output: string = "";
    if (value !== null) {
      if (value["employment_type_contract"]) {
        outputArray.push("contract")
      }
      if (value["employment_type_full_time"]) {
        outputArray.push("full time")
      }
      if (value["employment_type_internship"]) {
        outputArray.push("interning")
      }
      if (value["employment_type_remote"]) {
        outputArray.push("remote")
      }
    }

    if (outputArray.length > 0) {
      let length = outputArray.length;
      let lastRole = outputArray.pop();
      if (length == 1) {
        return "<span class='blue'>" + lastRole + "</span>"
      } else {
        for (let i = 0; i < outputArray.length; i++) {
          output += "<span class='blue'>" + outputArray[i] + "</span>"
        }
        output += " and <span class='blue'>" + lastRole + "</span>"
      }
    }

    return output;
  }
}
