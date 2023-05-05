import { PipeTransform, Pipe } from "@angular/core";
import * as moment from 'moment'

@Pipe({
  name: 'utctolocal'
})
export class UtctolocalPipe implements PipeTransform {

  transform(date: any, toUTC: any): any {
    if (date == null) {
      return null;
    }
    date = new Date(date);
    var localOffset = date.getTimezoneOffset() * 60000;
    var localTime = date.getTime();
    if (toUTC) {
      date = localTime + localOffset;
    }
    else {
      date = localTime - localOffset;
    }
    date = new Date(date);

    return moment(date).format('MM/DD/YYYY')
  }

}

@Pipe({
  name: 'utcdatetimetolocal'
})
export class UtcDateTimeToLocalPipe implements PipeTransform {

  transform(date: any, toUTC: any): any {
    if (date == null) {
      return null;
    }
    date = new Date(date);
    var localOffset = date.getTimezoneOffset() * 60000;
    var localTime = date.getTime();
    if (toUTC) {
      date = localTime + localOffset;
    }
    else {
      date = localTime - localOffset;
    }
    date = new Date(date);

    return moment(date).format('MM/DD/YYYY  hh:mm:ss a')
  }

}


@Pipe({
  name: 'pstdatetimetolocal'
})
export class PstDateTimeToLocalPipe implements PipeTransform {

  transform(date: any, toUTC: any): any {
    if (date == null || date=='') {
      return null;
    }
    date = new Date(date);

    let time = (date.getTimezoneOffset() / 60);
    var localOffset = date.getTime() + (3600000 *-8.0);

  date = new Date(localOffset);
    // console.log(date);
    return moment(date).format('MM-DD-YYYY  hh:mm:ss A')
  }

}

@Pipe({
  name: 'pstdatetimetolocaldate'
})
export class PstDateTimeToLocalPipeDate implements PipeTransform {

  transform(date: any, toUTC: any): any {
    if (date == null || date == '') {
      return null;
    }
    date = new Date(date);

    let time = (date.getTimezoneOffset() / 60);
    var localOffset = date.getTime() + (3600000 * -8.0);

    date = new Date(localOffset);
    return moment(date).format('MM-DD-YYYY')
  }

}

@Pipe({
  name: 'utcdatetimetopst'
})
export class UtcDateTimeToPstPipe implements PipeTransform {

  transform(date: any, toUTC: any): any {
    if (date == null || date == '') {
      return null;
    }
    date = new Date(date);

    let time = (date.getTimezoneOffset() / 60);
    var localOffset = date.getTime() + (3600000 * -8.0);

    date = new Date(localOffset);

    return moment(date).format('MM-DD-YYYY  hh:mm:ss A')
  }

}

@Pipe({
  name: 'utctopst'
})
export class UtcToPstPipe implements PipeTransform {
  transform(date: any, toUTC: any): any {
    if (date == null || date == '') {
      return null;
    }
    date = new Date(date);

    let time = (date.getTimezoneOffset() / 60);
    var localOffset = date.getTime() + (3600000 * -8.0);

    date = new Date(localOffset);

    return new Date(moment(date).format('MM/DD/YYYY hh:mm:ss A'));
  }

}


@Pipe({
  name: 'utctopstdate'
})
export class UtcToPstDatePipe implements PipeTransform {
  transform(date: any, toUTC: any): any {
    if (date == null || date == '') {
      return null;
    }
    date = new Date(date);

    let time = (date.getTimezoneOffset() / 60);
    var localOffset = date.getTime() + (3600000 * -8.0);

    date = new Date(localOffset);

    return new Date(moment(date).format('MM/DD/YYYY'));
  }

}


