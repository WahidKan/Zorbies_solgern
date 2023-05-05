import { Component, OnInit, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AssignSheduleAppointmentModel, ServicesappointmentService, ServiceAppointmentJsonData, AuditCheckListSubmitModel } from '../servicesappointment.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';   
import { LightboxConfig, Lightbox } from 'ngx-lightbox';
import { ServicesappointmentlistComponent } from '../servicesappointmentlist.component';
import { CustomLightboxComponent } from '../../shared/components/custom-lightbox/custom-lightbox.component';

@Component({
  selector: 'app-auditchecklistpopup',
  templateUrl: './auditchecklistpopup.component.html',
  styleUrls: ['./auditchecklistpopup.component.scss']
})


export class AuditchecklistpopupComponent implements OnInit {
  @ViewChild('auditCheckList', { static: false }) auditCheckListModel: ModalDirective;
  @ViewChild('Lightbox', { static: false }) lightBoxModal: CustomLightboxComponent;
  @Output() auditHistoryEvent = new EventEmitter();
  //@Output() buttonState = new EventEmitter<number>();

   
  @Output() buttonState = new EventEmitter();


  constructor(private fb: FormBuilder, private serviceappointmentlistService: ServicesappointmentService, private toaster: ToastrService, private commonService: CommonService, private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox, private zone: NgZone) { }
  loadSave: boolean = false;
  auditCheckListData: any[];
  auditTitle: any;
  checkListType: any;
  serviceAppointmentId: any;
  jsonData: any;
  isScroll = false;
  ActualauditCheckListData: { Main: any, Child: any[] }[] = [];
  SectionGroup: any[] = [];
  SectionGroupTop: any[] = [];
  isDisabled: any;

  JsonData: ServiceAppointmentJsonData = new ServiceAppointmentJsonData();

  isModalShow = false;
  _timeout: any = null;



  ngOnInit() {
    this.loadSave = true;
  }



  ShowPopup(checkList_Id: number, serviceAppointmentId: number, disable: boolean) {
    this.isDisabled = disable;
    this.loadSave = true;
    this.isModalShow = true;
    //this.auditCheckListModel.show();        
    this.auditChecklistDetail(checkList_Id, serviceAppointmentId, disable);
  }

  auditChecklistDetail(checkList_Id: number, serviceAppointmentId: number, disable: boolean) {
    this.isModalShow = true;
    this.isDisabled = disable;
    this.auditCheckListData = [];
    this.ActualauditCheckListData = [];
    this.serviceAppointmentId = serviceAppointmentId;
    this.auditCheckListModel.show();

    this.serviceappointmentlistService.auditChecklistDetail(checkList_Id, serviceAppointmentId).subscribe(resp => {

      if (resp) {
        this.auditCheckListData = resp as [];
        this.auditTitle = this.auditCheckListData[0].CHECK_LIST_NAME;
        this.checkListType = this.auditCheckListData[0].CHECKLIST_TYPE;
        this.SectionGroup = this.auditCheckListData[0].Section;
        this.SectionGroupTop = this.auditCheckListData[0].Section;
        this.refreshTop(this.SectionGroup);
        this.loadSave = false;
        //// console.log("this.SectionGroup", this.SectionGroup);
      }
      
      //this.auditCheckListData = s as any[];
      //// console.log('auditCheckListData', this.auditCheckListData)
      //if (this.auditCheckListData != null) {
      //  this.auditCheckListModel.show();        
      //  if (this.auditCheckListData) {
      //    let _data = this.auditCheckListData as any[];
      //    if (_data) {
      //      this.auditTitle = _data[0].CHECK_LIST_NAME;
      //    }
      //  }
      //  var ths = this;
      //  ths.SectionGroup = [];
      //  this.auditCheckListData.forEach(sc => {
      //    let checkIfAlreadyExist = ths.SectionGroup.filter(function (itm) { return itm.sectionId == sc.SECTION_ID });
      //    if (checkIfAlreadyExist.length == 0) {
      //      let groupArray = ths.auditCheckListData.filter(function (itm) { return itm.SECTION_ID == sc.SECTION_ID });
      //      var section = {
      //        sectionName: sc.SECTION_NAME,
      //        sectionId: sc.SECTION_ID,
      //        sectionGroup: []
      //      }
      //      this.ActualauditCheckListData = [];
      //      groupArray.forEach(i => {
      //        let isFound = false;
      //        if (i.PARENT_ID == null) {
      //          this.ActualauditCheckListData.forEach(m => {
      //            if (m.Main.QUESTION_ID == i.QUESTION_ID) {
      //              if (i.QUESTION_TYPE != "checkbox") {
      //                var obj = {
      //                  answer: i.ANSWER,
      //                  answerGivenBy: i.ANSWER_GIVEN_BY,
      //                  attachment: i.ATTACHMENT_PATH
      //                };
      //                if (typeof m.Main.ANSWERS == "undefined") {
      //                  m.Main.ANSWERS = [];
      //                }
      //                m.Main.ANSWERS.push(obj);
      //              }
      //              isFound = true;
      //            }
      //          });
      //          if (isFound == false) {
      //            i.ATTACHMENT_PATHS = [];
      //            if (i.QUESTION_TYPE != "checkbox") {
      //              var obj = {
      //                answer: i.ANSWER,
      //                answerGivenBy: i.ANSWER_GIVEN_BY,
      //                attachment: i.ATTACHMENT_PATH
      //              };
      //              if (typeof i.ANSWERS == "undefined") {
      //                i.ANSWERS = [];
      //              }
      //              i.ANSWERS.push(obj);
      //            }
      //            this.ActualauditCheckListData.push({
      //              Main: i,
      //              Child: []
      //            })
      //          }
      //        }
      //        else {
      //          let index = 0;

      //          this.ActualauditCheckListData.forEach(j => {
      //            if (j.Main.QUESTION_ID === i.PARENT_ID) {
      //              if (i.QUESTION_TYPE != "checkbox") {
      //                var obj = {
      //                  answer: i.ANSWER,
      //                  answerGivenBy: i.ANSWER_GIVEN_BY,
      //                  attachment: i.ATTACHMENT_PATH
      //                };
      //                if (typeof j.Main.ANSWERS == "undefined") {
      //                  j.Main.ANSWERS = [];
      //                }
      //                j.Main.ANSWERS.push(obj);
      //              } else {
      //                i.ANSWER = ((i.ANSWER == "true") ? true : false)
      //              }
      //              this.ActualauditCheckListData[index].Child.push(i);
      //            }
      //            index += 1;
      //          });
      //        }
      //      });
      //      section.sectionGroup = this.ActualauditCheckListData;
      //      this.SectionGroup.push(section);
      //    }
      //  });
      //  // console.log('SectionGroup', this.SectionGroup)
      //}
      //else {
      //  this.toaster.error("No record found");
      //  this.loadSave = false;
      //  this.auditModel.show();
      //  this.auditCheckListModel.hide();
      //}
      //setTimeout(() => {
      //  this.loadSave = false;
      //}, 500);
    }, err => {
      this.loadSave = false;
    });
  }

  refreshTop(data) {
    this.SectionGroupTop = [];
    this.SectionGroupTop = data;
    // console.log(this.SectionGroupTop);

  }


  onSubmitAuditCheckList() {

    let CheckList: Array<AuditCheckListSubmitModel> = new Array<AuditCheckListSubmitModel>();

    this.SectionGroup.forEach(section => {
      [...section.Question].forEach(ques => {

        let questionModel: AuditCheckListSubmitModel = new AuditCheckListSubmitModel();

        questionModel.comment = ques.AuComments[0].Comment;
        questionModel.isCorrect = ques.AuComments[0].IsCorrect;
        questionModel.questionId = ques.QUESTION_ID;
        questionModel.sectionId = ques.SectionId;
        questionModel.serviceAppointmnentId = this.serviceAppointmentId;
        CheckList.push(questionModel);

        if (ques.SubQuestions) {
          [...ques.SubQuestions].forEach(subques => {

            let subquestionModel: AuditCheckListSubmitModel = new AuditCheckListSubmitModel();

            subquestionModel.comment = subques.Comment;
            subquestionModel.isCorrect = subques.IsCorrect;
            subquestionModel.questionId = subques.QUESTION_ID;
            subquestionModel.sectionId = subques.SectionId;
            subquestionModel.serviceAppointmnentId = this.serviceAppointmentId;
            CheckList.push(subquestionModel);
          });
        }
      });
    });



    //this.SectionGroup.forEach(sc => {
    //  sc.sectionGroup.forEach(s => {
    //    let obj: any = {};
    //    obj.QUESTION_ID = s.Main.QUESTION_ID;
    //    obj.SECTION_ID = s.Main.SECTION_ID;
    //    obj.SERVICE_APPT_ID = s.Main.SERVICE_APPT_ID;
    //    obj.Answer = s.Main.ANSWER;
    //    obj.Comment = s.Main.Comment;
    //    obj.IsCorrect = s.Main.IsCorrect == true ? 1 : 0;
    //    SubmitModel.push(obj);
    //    if (s.Child.length > 0) {
    //      s.Child.forEach(d => {
    //        let objChild: any = {};
    //        objChild.QUESTION_ID = d.QUESTION_ID;
    //        objChild.SECTION_ID = s.Main.SECTION_ID;
    //        objChild.SERVICE_APPT_ID = d.SERVICE_APPT_ID;
    //        objChild.Answer = d.ANSWER;
    //        objChild.Comment = '';
    //        objChild.IsCorrect = 0;
    //        SubmitModelChildModel.push(objChild);
    //      })
    //    }
    //  });
    //});
    this.loadSave = true;
    this.JsonData.FormJsonData = JSON.stringify(CheckList);
   // this.JsonData.subModuleCode = JSON.stringify(SubmitModelChildModel);
    this.serviceappointmentlistService.addEditAudit(this.JsonData).subscribe((result: any) => {   
      if (result.statusCode == 200) {
        setTimeout(() => {
          this.toaster.success(result.responseMessage);
          this.auditHistoryEvent.emit();
          this.loadSave = false;

        }, 500);
        this.closeAuditCheckList();
      }
      else {
        this.toaster.error(result.responseMessage);
        this.auditHistoryEvent.emit();
        this.loadSave = false;
      }
    }, error => {
      this.loadSave = false;
    });
    this.ActualauditCheckListData = [];
  }

  open(imageList: any[], index: number): void {
    // open lightbox
    var ImageObject = [];
    var currIndexImage = imageList[index];
    var index = 0;
    let tempindex = 0;
    imageList.forEach(x => {
      if (typeof x.FileUrl != "undefined" && x.FileUrl != null && x.FileUrl != "") {
        var obj = {
          src: x.FileUrl,
          caption: x.ANSWER,
          thumb: x.FileUrl
        }
        if (currIndexImage.FileUrl == x.FileUrl) {
          index = tempindex;
        }
        ImageObject.push(obj);
        tempindex++;
      }
    });
    ;
    this.lightBoxModal.Show(ImageObject,index);
  }

  closeAuditCheckList() {
    this.auditCheckListModel.hide();
    this.buttonState.emit({ serviceAppointmentsId: this.serviceAppointmentId, disable: this.isDisabled });
    setTimeout(() => { this.isModalShow = false; }, 1000);
  }

  ClickForScroll(event: any) {
    this.isScroll = true;
    let data = 'section_' + event;
    let el = document.getElementById(data);
    el.scrollIntoView({ behavior: 'smooth' });
  }
  ClickForScrollTop() {
    let el1 = document.getElementById('l-of-sections_ScrollingId');
    el1.scrollIntoView({ behavior: 'smooth' });
    el1.scrollTop;
    this.isScroll = false;
    
  }

  onRadioChange() {
    ;
    this._timeout = null;
    this._timeout = setTimeout(() => {
      this.zone.run(() => {
        this.refreshTop(this.SectionGroup);
      });
    }, 1000);
  }
}
