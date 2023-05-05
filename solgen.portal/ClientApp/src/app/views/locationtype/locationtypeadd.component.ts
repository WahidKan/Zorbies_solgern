import { Component, OnInit } from '@angular/core';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locationtypeadd',
  templateUrl: './locationtypeadd.component.html',
  styleUrls: ['./locationtypeadd.component.scss']
})
export class LocationtypeaddComponent implements OnInit {
  lstStatus: any;
  lstStatusLoc: any;
  modulePermission: ModuleList;
  loadSave: boolean = false;
  pageTitle

  constructor(private commonService: CommonService,
    private route: ActivatedRoute
  ) {

    this.commonService.getMasterItemsList("status").subscribe((result: any) => {
      this.lstStatus = this.commonService.masters;
    })

    this.commonService.getMasterItemsList("locationType").subscribe((result: any) => {
      this.lstStatusLoc = this.commonService.masters;
    })
  }

  ngOnInit() {
  }

}
