import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'split'
})
export class splitPipe implements PipeTransform {
  transform(value: any, character: any, index: any): any {
    if (value.includes(character)) {
      let data = value.split(character)[index];
      return data;
    }
    else{
      return value;
    }
  }
}

@Pipe({
  name: 'Contains'
})
export class ContainsPipe implements PipeTransform {
  transform(value: any, character: any): any {
    if (value) {
      if (value.includes(character)) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
