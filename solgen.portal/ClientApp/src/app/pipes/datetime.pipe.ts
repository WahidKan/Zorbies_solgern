import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import moment from 'moment-timezone';

@Pipe({
  name: 'DateTimeToLocal'
})
export class DateTimeToLocalPipe implements PipeTransform {
  transform(_date: any, _type: any): any {
    if (_date == null || _date == '') {
      return null;
    }
   // _date = new Date(_date);
    let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    let _timezone = info["timeZone"] as string;
    let _timeFormat = info["timeFormat"] as number;

    let _result: any;

    if (_type == 'Date' && _timezone) {
      _result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY');
    }
    else if (_type == 'Time' && _timezone) {
      if (_timeFormat == 24) {
        _result = moment.utc(_date).tz(_timezone).format('HH:mm');
      }
      else {
        _result = moment.utc(_date).tz(_timezone).format('hh:mm A');
      }
    }
    else if ((isNullOrUndefined(_type) || _type == '') && _timezone) {
      if (_timeFormat == 24) {
        _result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY HH:mm');
      }
      else if (_timeFormat == 12) {
        _result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY hh:mm A');
       // _result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY');
      }
      else {
        _result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY hh:mm A');
      }
    }
    else {
      _result = moment.utc(_date).tz('America/Los_Angeles').format('MM-DD-YYYY hh:mm A');
    }

    return _result;
  }
}

@Pipe({
  name: 'DateTimeToLocalForAppointment'
})
export class DateTimeToLocalPipeForAppointment implements PipeTransform {
  transform(_date: any, _type: any): any {
    if (_date == null || _date == '') {
      return null;
    }
   // _date = new Date(_date);
    let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    let _timezone = info["timeZone"] as string;
    let _timeFormat = info["timeFormat"] as number;

    let _result: any;

    if (_type == 'Date' && _timezone) {
      _result = moment.utc(_date).tz(_timezone).format('MM/DD/YYYY');
    }
    else if (_type == 'Time' && _timezone) {
      if (_timeFormat == 24) {
        _result = moment.utc(_date).tz(_timezone).format('HH:mm');
      }
      else {
        _result = moment.utc(_date).tz(_timezone).format('hh:mm A');
      }
    }
    else if ((isNullOrUndefined(_type) || _type == '') && _timezone) {
      if (_timeFormat == 24) {
        _result = moment.utc(_date).tz(_timezone).format('MM/DD/YYYY HH:mm');
      }
      else if (_timeFormat == 12) {
        _result = moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm A');
       // _result = moment.utc(_date).tz(_timezone).format('MM-DD-YYYY');
      }
      else {
        _result = moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm A');
      }
    }
    else {
      _result = moment.utc(_date).tz('America/Los_Angeles').format('MM/DD/YYYY hh:mm A');
    }

    return _result;
  }
}

@Pipe({
  name: 'DateTimeToLocalForAddEdit'
})
export class DateTimeToLocalForAddEditPipe implements PipeTransform {
  transform(_date: any, _type: any): any {
    if (_date == null || _date == '') {
      return null;
    }
    let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    let _timezone = info["timeZone"] as string;
    let _timeFormat = info["timeFormat"] as number;

    let _result: any;
    if (_type == 'Date' && _timezone) {
      _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY'));
    }
    else if ((isNullOrUndefined(_type) || _type == '') && _timezone) {
      if (_timeFormat == 24) {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY HH:mm'));
      }
      else if (_timeFormat == 12) {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm:ss A'));
      }
      else {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm:ss A'));
      }
    }
    else {
      if(_type == 'Date' && _timezone == null)
      {
        _result = new Date(moment.utc(_date).format('MM/DD/YYYY hh:mm:ss A'));
      }
      else
      {
        _result = new Date(moment.utc(_date).tz('America/Los_Angeles').format('MM/DD/YYYY hh:mm:ss A'));
      }
    }

    return _result;
  }
}


@Pipe({
  name: 'DateTimeToLocalForAddEditForDate'
})
export class DateTimeToLocalForAddEditForDatePipe implements PipeTransform {
  transform(_date: any, _type: any): any {
    if (_date == null || _date == '') {
      return null;
    }
    let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    let _timezone = info["timeZone"] as string;
    let _timeFormat = info["timeFormat"] as number;

    let _result: any;

    if (_type == 'Date' && _timezone) {
      _result = new Date(moment.utc(_date).format('MM/DD/YYYY'));
    }
    else if ((isNullOrUndefined(_type) || _type == '') && _timezone) {
      if (_timeFormat == 24) {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY HH:mm'));
      }
      else if (_timeFormat == 12) {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm:ss A'));
      }
      else {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm:ss A'));
      }
    }
    else {
      _result = new Date(moment.utc(_date).tz('America/Los_Angeles').format('MM/DD/YYYY hh:mm:ss A'));
    }

    return _result;
  }
}

@Pipe({
  name: 'DateTimeToLocalForGhantView'
})
export class DateTimeToLocalForGhantView implements PipeTransform {
  transform(_date: any, _type: any, _timezone: string, _timeFormat: number): any {
    if (_date == null || _date == '') {
      return null;
    }
    //let info: any[] = JSON.parse(localStorage.getItem('userinfo'));
    //let _timezone = info["timeZone"] as string;
    //let _timeFormat = info["timeFormat"] as number;

    let _result: any;

    if (_type == 'Date' && _timezone) {
      _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY'));
    }
    else if ((isNullOrUndefined(_type) || _type == '') && _timezone) {
      if (_timeFormat == 24) {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY HH:mm'));
      }
      else if (_timeFormat == 12) {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm A'));
      }
      else {
        _result = new Date(moment.utc(_date).tz(_timezone).format('MM/DD/YYYY hh:mm A'));
      }
    }
    else {
      _result = new Date(moment.utc(_date).tz('America/Los_Angeles').format('MM/DD/YYYY hh:mm A'));
    }

    return _result;
  }
}


