/**
 * Created by KolawoleBalogun on 4/5/17.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'parseRecommendationRecipientName'
})

export class ParseRecommendationRecipientNamePipe implements PipeTransform {
  transform(value: string): string {
    return (value != null && value.trim() != '') ? value : "(recipient)"

  }
}
