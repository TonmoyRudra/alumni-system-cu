import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullWithDefault',
})
export class NullWithDefaultPipe implements PipeTransform {
  transform(value: any, defaultText: number = 0): any {
    if (typeof value === 'undefined' || value === null) {
      return defaultText;
    }

    return value;
  }
}
