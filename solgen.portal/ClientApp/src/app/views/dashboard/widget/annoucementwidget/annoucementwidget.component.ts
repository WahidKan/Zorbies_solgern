import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService, AnnoucementModel } from '../../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-annoucementwidget',
  templateUrl: './annoucementwidget.component.html',
  styleUrls: ['./annoucementwidget.component.scss']
})
export class AnnoucementwidgetComponent implements OnInit {
  lstanoucements: any = [];
  tempAnoucements: any = [];

  audioSrc: any;
  modalTitle: string;
  imgSrc: any;
  videoSrc: any;
  loadSave: boolean = false;
  isFirstTime: boolean = true;
  isAnnouncementHidden: boolean = false;
  totalAnnoncements:number=0

  constructor(private dashboardservice: DashboardService, private toaster: ToastrService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.GetDashboardAnnoucements(true);
    this.dashboardservice.GetDashboardAnoucements(false).subscribe(resp => {
      this.tempAnoucements = resp;
      this.totalAnnoncements = this.tempAnoucements.length;
    }, err => {
      this.toaster.error(err);
    });
  }
  GetDashboardAnnoucements(_isFirstTime: boolean) {
    this.dashboardservice.GetDashboardAnoucements(_isFirstTime).subscribe(resp => {
      this.lstanoucements = resp;
        //// console.log("lstanoucement", this.lstanoucements)
    }, err => {
        this.toaster.error(err);
    });
  }

  setAudioSrc(audioFile) {
    let audio: HTMLAudioElement = new Audio(audioFile);
    audio.play();
  }

  ShowImageModal(_obj) {
    this.loadSave = true;
    this.imgSrc = _obj.filePath;
    this.modalTitle = _obj.title + ' (' + this.datepipe.transform(_obj.startDate, 'MM/dd/yyyy') + ')';

    setTimeout(() => { 
      this.loadSave = false;
    }, 1000);
  }
 
  ShowVideo(_obj) {
    this.loadSave = true;
    this.videoSrc = _obj.filePath;
    this.modalTitle = _obj.title + ' (' + this.datepipe.transform(_obj.startDate,'MM/dd/yyyy')+')';

    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }

  ViewAllAnnucements() {
    this.isFirstTime = false;
    this.GetDashboardAnnoucements(false);
  }
  CollapseAllAnnucements() {
    this.isFirstTime = true;
    this.GetDashboardAnnoucements(true);
  }
  setHidden() {
    this.isAnnouncementHidden = true;
  }
  getRowClass = (row) => {
    // console.log('rowClass')
    return {
      'announ-box': true
    };
  }

 
}
