import { PipeTransform, Pipe } from "@angular/core";


@Pipe({
  name: 'truncate'
})
export class TruncateWord implements PipeTransform {
  transform(value: string, limit = 15, completeWords = false, ellipsis = '...') {
    if (value) {
      if (value.length > limit) {
        if (completeWords) {
          limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return `${value.substr(0, limit)}${ellipsis}`;
      }
      else {
        return `${value}`;
      }
    }
  }
}
