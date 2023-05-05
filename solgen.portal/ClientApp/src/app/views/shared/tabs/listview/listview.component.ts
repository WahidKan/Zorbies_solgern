import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  showEditButton: boolean = false;

  @Output() editUtilityAccount = new EventEmitter();
  @Input('data') dataArray: any;
  @Input('index') index: any;
  title: string = '';
  data;
  constructor(private commonservice: CommonService) { }

  ngOnInit() {
    if (this.dataArray) {
      this.data = this.commonservice.TryJsonParse(this.dataArray.data);
      this.title = this.dataArray.compact_view_name;
      this.title = this.title.replace("Compact", "Information");
    }

    if (this.title.includes('Proposal Design')) {
      this.showEditButton = true;
    }

  };

  openEditUtilityAccount() {
    this.editUtilityAccount.emit();
  };


};
