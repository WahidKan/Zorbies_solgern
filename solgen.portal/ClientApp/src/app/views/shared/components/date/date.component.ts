import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContentService } from 'src/app/views/document-maker/services/content.service';
import { AvailableDatesConst, DateFormatConst } from '../../constants/document-const';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnDestroy {
  @Input("date") public date: FormGroup;
  focus: boolean = false;
  format : string = DateFormatConst.YYYY_WITH_DASH;
  dateFormatSubscription: any;
  dateLimitSubscription: any;
  // minDateLimit: Date;
  // maxDateLimit: Date;
  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.dateFormatSubscription = this.contentService.getDateFormatEvent().subscribe(response=>{
      let value = this.date.get('displayName').value;
      this.format = this.date.get('selectedDateFormat').value;
      this.date.get('displayName').setValue(null);
      setTimeout(()=>{
      this.date.get('displayName').setValue(value);
      });
    });

    this.dateLimitSubscription = this.contentService.getDateLimitEvent().subscribe(response=>{
      if(this.date.get('dateLimit').value === AvailableDatesConst.ANY_DATES){
        this.date.get('minDate').setValue(null);
        this.date.get('maxDate').setValue(null);
      }
      else if(this.date.get('dateLimit').value === AvailableDatesConst.PAST_DATES){
        this.date.get('minDate').setValue(null);
        this.date.get('maxDate').setValue(new Date());
      }
      else if(this.date.get('dateLimit').value === AvailableDatesConst.FUTURE_DATES){
        this.date.get('minDate').setValue(new Date());
        this.date.get('maxDate').setValue(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.dateFormatSubscription.unsubscribe();
    this.dateLimitSubscription.unsubscribe();
  }

}
