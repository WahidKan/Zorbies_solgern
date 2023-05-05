import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormArray, FormGroupName, NgForm } from '@angular/forms';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ServicesappointmentService, GroupControlQuestion, droped, Questionnaire, QuestionAns, mainSubSection, mainSection } from '../servicesappointment.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupControls } from '../../managelayout/layout.service';
import { PropertiespopupformComponent } from './viewpopupwindowform/propertiespopupform.component';

@Component({
  selector: 'app-managequestionnaire',
  templateUrl: './managequestionnaire.component.html',
  styleUrls: ['./managequestionnaire.component.scss']
})
export class ManagequestionnaireComponent implements OnInit, OnDestroy {
  @ViewChild('propertiesPopupform', { static: false }) editPopupModal: PropertiespopupformComponent;
  pageTitle: any;
  questionTypeList = [];
  WorkTypeList: any;
  fieldArray: any;
  form: FormGroup;
  colors = [];
  form_field_id: any;
  InnerData: any;
  indexTemp: number = 0;
  statusList = [];
  isEdit = false;
  isonlyForQuestion = false;
  lstAnsType: any;
  dragedColor: any;
  sectionIdentification: any;
  droped = [];
  newgroup = [];
  field_type: any;
  checkListId: any;
  AutoSaveintervalInSecond: any = 120000;
  customCompnentValues: any = [];
  mainQuestionvalues: any = [];
  formControlList: any[] = [];
  objSectionData: any[] = [];
  count: number = 0;
  formGroupName: FormGroupName;
  ckeConfig: any;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  loadSave: boolean = false;
  questionariesForm: FormGroup;
  displayCode = 'Add';
  uniqueid: any;
  length = 0;
  userInfo: any;
  companyType: any;
  _formId: any;
  isCompanyTypeFinancialInstitute: any;
  companyId: any;
  workTypeSearch: any = '';
  questionnaire: Questionnaire;
  disableCondition: boolean = false;
  isSomethingChange: boolean = false;
  interval;
  timeLeft: number = 60;
  sectionDrag: boolean = true;
  subSectionDrag: boolean = false;
  customFieldsList: any;
  moduleCode : string = 'serviceappointment';
  subModuleCode : string = 'serviceappointment';
  @ViewChild("questionnairForm", { static: false }) questionnairForm: NgForm;

  constructor(private commanService: CommonService, private toaster: ToastrService, private router: Router,
    private ServicesappointmentService: ServicesappointmentService, private dialogService: ConfirmationDialogService, private route: ActivatedRoute,
    private fb: FormBuilder, private location: Location) {
    groupControl: GroupControlQuestion;
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  onQuestionTypeChange(Value) {
    if (this.questionnaire.mainSection.length > 0) {
      if (confirm("Are you sure you want to change the Checklist Type? ")) {
        this.questionnaire.mainSection = [];
        this.getVisibleFieldsList();
      }
      else {
        if (Value) {
          setTimeout(
            () => {
              if (Value.text == "Photo") {
                this.questionnaire.questionType = "Questionnaire";
              }
              else if (Value.text == "Questionnaire") {
                this.questionnaire.questionType = "Photo";
              }
            }
          )

        }
      }
    }
    else {
      this.getVisibleFieldsList();
    }

  }
  getVisibleFieldsList() {
    this.colors = JSON.parse(JSON.stringify(this.filedLists));
    if (this.questionnaire && this.questionnaire.questionType == "Photo") {
      this.colors = this.colors.filter(field => field.sql_type == "image")
    } else if (this.questionnaire && this.questionnaire.questionType == "Questionnaire") {
      this.colors = this.colors.filter(field => field.sql_type != "image")
    }
    this.colors = this.colors.sort((f1, f2) => {
      let name1 = f1.name.toUpperCase();
      let name2 = f2.name.toUpperCase();
      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
      return 1;
    });
  }
  ngOnInit() {
    this.getIntereval();
    this.getCustomFieldsList()
    this.questionnaire = new Questionnaire();

    this.getVisibleFieldsList();
    this.InnerData = 'four';
    this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
    this.companyType = this.userInfo["companyType"];
    this.companyId = this.userInfo["companyId"];
    var _formId = '';

    if (this.companyType === "companytypeFinancialInstitute" && this.companyId === 1004 && _formId === '') {
      this.isCompanyTypeFinancialInstitute = true;

    }
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true
          this.checkListId = id;
          this.isEdit = true;
          this.fillForm(id);
        }
        else {
          this.isEdit = false;
        }
      }
    );
    //
    this.lstAnsType = this.filedLists;
    this.pageTitle = "Manage Questionnaire";
    this.GetQuestionTypes();
    this.GetWorkTypes();
    this.GetStatus();



  }
  getCustomFieldsList() {
    this.loadSave = true;
      this.ServicesappointmentService.GetCustomFieldsListBySubModuleCode(this.moduleCode,this.subModuleCode).subscribe((m: any) => {
        if (m) {
          let tableFields = m.data.map(f => {
            return {
              PrimaryTableColumn: f.PrimaryTableColumn,
              actual_data_type: f.actual_data_type,
              display_name: f.display_name,
              form_field_id: f.form_field_id,
              dt_code: f.dt_code,
              name: f.name,
              select_options: f.select_options,
              table_name: f.table_name,
              table_alias: f.table_alias,
              sub_module_id: f.sub_module_id,
              label: f.label
            }
          });
          this.customFieldsList = tableFields;
          this.loadSave = false;
        } else {
          this.loadSave = false;
          this.customFieldsList = null;
        }
      });
  }

  changeDragSatus(event, type) {
    event.stopPropagation();
    if (type == "Section") {
      this.sectionDrag = true;
      this.subSectionDrag = false;
    } else {
      this.sectionDrag = false;
      this.subSectionDrag = true;
    }
  }
  ////////////////Edit page code////////////////

  setMainsection(arrayOfMainSection: mainSection[]) {
    for (var obj in arrayOfMainSection) {

    }
  }
  valuechange(newValue, obj) {
    obj.statusId = (obj.statusId == '1001' || obj.statusId == '1011') ? '1011' : '1010';
    if (newValue && newValue.trim().length > 0) {
      this.isSomethingChange = true;
    }
  }
  getIntereval() {
    this.ServicesappointmentService.GetChecklistAutoSaveintervalInSeconds().subscribe(response => {
      if (response != null && response >= 120000) {
        this.AutoSaveintervalInSecond = response;
      }
      this.setAutoSaveTimer();
    });
  }
  fillForm(id) {
    try {
      this.ServicesappointmentService.GetCheckListDetail(id).subscribe((resultObj: any) => {
        if (resultObj) {
          this.loadSave = false;
          this.parseResult(resultObj);
          this.getVisibleFieldsList()
        }
      })
    }
    catch (error) {
      // console.log("error ", this.questionnaire);
      this.loadSave = false;
      console.error("Error trace GetCheckListDetail", error);
    }
  }
  parseResult(resultObj) {
    if (resultObj['mainSection'] == null || resultObj['mainSection'] == undefined)
      resultObj['mainSection'] = [];
    let mainSectionArray = resultObj['mainSection'];
    mainSectionArray.forEach((currentValue, index) => {
      if (currentValue.mainSubSection == null || currentValue.mainSubSection == undefined)
        currentValue.mainSubSection = [];
      let mainSubSection = currentValue.mainSubSection;
      mainSubSection.forEach((value, index) => {
        if (value.sectionType == "question") {
          value.question = JSON.parse(value.question);
          if (value.question != null) {
            if (value.question.field_type == "select" || value.question.field_type == "dropdown") {

              if (value.question.picklist_options.includes(',') == false) {
                value.question.picklist_options = (value.question.picklist_options != '' && value.question.picklist_options != null) ?
                  JSON.parse(value.question.picklist_options) : null;

                value.question.selectlistvalues = value.question.picklist_options;
              }
              else {
                var _data = value.question.picklist_options.split(',') as [];

                var _arr = [];
                _data.forEach((item) => {
                  var _obj = { value: item, id: item };
                  _arr.push(_obj);
                });

                value.question.picklist_options = _arr;
                value.question.selectlistvalues = value.question.picklist_options;

              }
            }
          } else {
            value.question = {};
          }
        } else {
          if (value.SubSectionQuestionAns != null) {
            value.SubSectionQuestionAns = JSON.parse(value.SubSectionQuestionAns);
            value.SubSectionQuestionAns.forEach((question, index) => {
              if (question.field_type == "select" || question.field_type == "dropdown") {
                question.picklist_options = (question.picklist_options != '' && question.picklist_options != null) ?
                  JSON.parse(question.picklist_options) : null;
                question.selectlistvalues = question.picklist_options;
              }
            })
          } else {
            value.SubSectionQuestionAns = [];
          }
        }
      });
    });

    this.questionnaire = resultObj;
  }
  drop(e, ix, iy, iz, section: any) {
    if (section == 'questionOnly') {
      let data1 = null; let data2 = null;

      if (this.dragedColor) {
        this.show(this.dragedColor, ix, iy, iz, section, '1010');
      }

    }
    else {
      if (this.dragedColor) {
        this.show(this.dragedColor, ix, iy, iz, section, '1010');
      }
    }
  }
  onDropSuccess(event, data, index) {
    if (data && data.is_dependent == true) {
      data.is_dependent = false;
      data.dependent_value = '';
      this.isSomethingChange = true;
    }
  }
  dragStart(e, c: GroupControlQuestion) {
    this.uniqueid = this.S4();
    c.form_field_id = this.uniqueid;

    let temp = [];
    temp = JSON.parse(JSON.stringify(c));
    this.dragedColor = temp;
  }
  sectionDisplayIndex = 0;
  defaultSection(sectionType): mainSubSection {
    var section = new mainSubSection();
    section.sectionType = sectionType;
    if (sectionType == 'question') {
      section.question.isDirty = true;
    }
    return section;
  }
  removeDefaultQuestion() {
    this.questionnaire.mainSection.forEach((currentValue, index) => {
      currentValue.mainSubSection.forEach((value, index) => {
        if (value.sectionType == "subSection") {
          value.SubSectionQuestionAns = value.SubSectionQuestionAns.filter(x => x.dt_code != 'default');
        }
      });
      currentValue.mainSubSection = currentValue.mainSubSection.filter(x => x.sectionType == "subSection" || (x.sectionType == "question" && x.question.dt_code != 'default'));
    });
  }
  defaultQuestion(): QuestionAns {
    var question = new QuestionAns();
    question.isDirty = true;
    question.statusId = '1010';
    return question;
  }
  addSection() {
    this.removeDefaultQuestion();
    if (this.questionnaire.mainSection == null || this.questionnaire.mainSection == undefined)
      this.questionnaire.mainSection = [];
    this.questionnaire.mainSection.push(new mainSection());
    this.sectionDisplayIndex++;
    this.updateSectionIndex();
    this.isSomethingChange = true;
  }
  addSubSectionQuestion(ix, iy) {
    this.removeDefaultQuestion();
    if (this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns == null
      || this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns == undefined)
      this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns = [];
    this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns.push(this.defaultQuestion());
    this.isSomethingChange = true;
  }
  addSubSection(ix, type) {
    this.removeDefaultQuestion();
    if (this.questionnaire.mainSection[ix].mainSubSection == null
      || this.questionnaire.mainSection[ix].mainSubSection == undefined)
      this.questionnaire.mainSection[ix].mainSubSection = [];
    this.questionnaire.mainSection[ix].mainSubSection.push(this.defaultSection(type));
    this.isSomethingChange = true;
  }
  removeSection(ix) {
    if (this.questionnaire.mainSection[ix].sectionId > 0) {
      this.questionnaire.mainSection[ix].statusId = '1003';
      this.questionnaire.mainSection[ix].mainSubSection.forEach((subSectionObj, index) => {
        subSectionObj.statusId = '1003';
        if (subSectionObj.sectionType == 'subSection') {
          subSectionObj.SubSectionQuestionAns.forEach((subquestions, index) => {
            subquestions.statusId = '1003';
          })
        } else {
          subSectionObj.question.statusId = '1003';
        }
      })
    } else {
      this.questionnaire.mainSection.splice(ix, 1);
    }
    this.updateSectionIndex();
    this.isSomethingChange = true;
  }
  removeSubSection(ix, iy) {
    if (this.questionnaire.mainSection[ix].mainSubSection[iy].mainSubSectionId > 0) {
      this.questionnaire.mainSection[ix].mainSubSection[iy].statusId = '1003';
      if (this.questionnaire.mainSection[ix].mainSubSection[iy].sectionType == 'subSection') {
        this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns.forEach((subquestions, index) => {
          subquestions.statusId = '1003';
        })
      } else {
        this.questionnaire.mainSection[ix].mainSubSection[iy].question.statusId = '1003';
      }
    } else {
      this.questionnaire.mainSection[ix].mainSubSection.splice(iy, 1);
    }
    this.isSomethingChange = true;
  }
  removeQuestionsAndAnswer(ix, iy, iz) {
    if (this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns[iz].questionId > 0) {
      this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns[iz].statusId = '1003';
    } else {
      this.questionnaire.mainSection[ix].mainSubSection[iy].SubSectionQuestionAns.splice(iz, 1);
    }
    this.isSomethingChange = true;
  }
  updateSectionIndex() {
    let index = 1;
    this.questionnaire.mainSection.forEach((obj, i) => {
      if (obj.statusId != '1003') {
        obj.sectionIndex = index;
        index++;
      }
    })
  }
  GetQuestionTypes() {
    let questiontypes = [{ text: "Photo", value: "Photo" }, { text: "Questionnaire", value: "Questionnaire" }];
    this.questionTypeList = questiontypes;
  };
  GetWorkTypes() {
    this.commanService.GetWorkTypesDDLList('', this.length, this.workTypeSearch).subscribe(resp => {
      if (resp) {
        this.WorkTypeList = resp;
      }
    });
  };
  GetStatus() {
    let questiontypes = [{ text: "Active", value: "1001" }, { text: "Inactive", value: "1002" }, { text: "Draft", value: "1010" }, { text: "Partial Draft", value: "1011" }];
    this.statusList = questiontypes;
  };
  setAutoSaveTimer() {
    this.interval = setInterval(() => {
      if (this.isSomethingChange) {
        this.autoSave();
        this.isSomethingChange = false;
      }
    }, this.AutoSaveintervalInSecond);
  }
  autoSave() {
    if (this.questionnairForm.valid) {
      this.indexJson(this.questionnaire);
      this.questionnaire.statusId = (this.questionnaire.statusId == '1001' || this.questionnaire.statusId == '1011') ? '1011' : '1010';

      if (this.questionnaire.checkListId == null) {
        this.questionnaire.statusId = '1010';
      }
      if (this.questionnaire.checkListId != null && this.questionnaire.statusId == '1010') {
        this.questionnaire.statusId = '1010';
      }
      this.ServicesappointmentService.SaveQuestionariesGroups(this.questionnaire, this.questionnaire.checkListId).subscribe((res: any) => {
        if (res.statusCode == 200) {
          var resultObj = JSON.parse(res.result);
          this.parseResult(resultObj);
          this.toaster.success('CheckList Record is Auto Saved Successfully');
        }
        else {
          this.toaster.error(res.responseMessage);
        }
      });
    }
  }
  updateStatus(qList: Questionnaire) {
    qList.mainSection.forEach(main => {
      main.statusId = (main.statusId == '1010' || main.statusId == '1011') ? '1001' : main.statusId;
      main.mainSubSection.forEach(sub => {
        sub.statusId = (sub.statusId == '1010' || sub.statusId == '1011') ? '1001' : sub.statusId;
        if (sub.sectionType == "question") {
          sub.question.statusId = (sub.question.statusId == '1010' || sub.question.statusId == '1011') ? '1001' : sub.question.statusId;
        } else {
          sub.SubSectionQuestionAns.forEach(subq => {
            subq.statusId = (subq.statusId == '1010' || subq.statusId == '1011') ? '1001' : subq.statusId;
          })
        }
      })
    });
  }
  onSubmit() {
    this.loadSave = true;
    this.indexJson(this.questionnaire);
    this.updateStatus(this.questionnaire);
    this.ServicesappointmentService.SaveQuestionariesGroups(this.questionnaire, this.questionnaire.checkListId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toaster.success(res.responseMessage);
        this.router.navigateByUrl("/questionnairechecklist");
      }
      else {
        this.loadSave = false;
        this.toaster.error(res.responseMessage);
      }
    }, err => { this.loadSave = false }, () => {
      this.loadSave = false;
    });
  }
  close() {
    this.router.navigateByUrl("/questionnairechecklist");
  }
  indexJson(data: Questionnaire) {
    for (var sectionIdex in data.mainSection) {
      //adding ref index to section
      data.mainSection[sectionIdex].sectionRef = parseInt(sectionIdex) + 1;
      //loop for sub sections array
      for (var subSectionIndex in data.mainSection[sectionIdex].mainSubSection) {
        //adding ref index of section to sub section
        data.mainSection[sectionIdex].mainSubSection[subSectionIndex].sectionRef = data.mainSection[sectionIdex].sectionRef;
        //adding ref index to sub section
        data.mainSection[sectionIdex].mainSubSection[subSectionIndex].mainSubSectionRef = parseInt(subSectionIndex) + 1;

        if (data.mainSection[sectionIdex].mainSubSection[subSectionIndex].sectionType === 'subSection') {
          // loop for sub section question array
          for (var subSectionQdnIndex in data.mainSection[sectionIdex].mainSubSection[subSectionIndex].SubSectionQuestionAns) {
            data.mainSection[sectionIdex].mainSubSection[subSectionIndex].SubSectionQuestionAns[subSectionQdnIndex].mainSubSectionRef = data.mainSection[sectionIdex].mainSubSection[subSectionIndex].mainSubSectionRef;
          }
        }
      }
    }

  }
  onScrollToEndWorkType(dataList: any) {
    this.fetchMore(dataList);
  }
  private fetchMore(dataList: any) {
    if (this.workTypeSearch == undefined) {
      this.workTypeSearch = '';
    }
    this.length = dataList.length;
    this.GetWorkTypes();
  }
  onChange($event: any): void {
  }
  onPaste($event: any): void {
  }
  onKeyWorkType(e: any, dataList: any) {
    this.length = 0
    this.workTypeSearch = e.target.value;
    this.GetWorkTypes();
  }
  onClearWorkType(dataList: any): void {
    this.length = 0
    this.workTypeSearch = '';
    this.GetWorkTypes();
  }
  initQuestionaries() {
    // initialize our guarantor
    return this.fb.group({
      sectionId: [null],
      SectionName: ['', Validators.required],
      subquestions: this.fb.array([
        this.initSubSection()
      ])
    });
  }
  initSubSection() {
    return this.fb.group({
      sectionId: [null],
      SubSectionName: ['', Validators.required],
      questionAndAnswer: this.fb.array([
        this.initQuestionAns()
      ])
    });
  }
  initQuestionAns() {
    return this.fb.group({
      questionId: [null],
      questionName: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }
  //////////////////Foem Fields ---------

  dragEnd(e) {
  }
  getFiledType(dt_code) {
    let field_type: any;

    switch (dt_code) {
      case 'text':
      case 'string':
      case 'nchar':
        field_type = 'textbox';
        break;

      case 'textarea':
        field_type = 'textarea';
        break;

      case 'select':
        field_type = 'dropdown';
        break;

      case 'bit':
        field_type = 'boolean';
        break;

      case 'radio':
        field_type = 'textbox';
        break;

      case 'checkbox':
        field_type = 'checkbox';
        break;

      case 'int':
      case 'bigint':
      case 'decimal':
        field_type = 'number';
        break;

      case 'decimal':
        field_type = 'decimal';
        break;

      case 'time':
      case 'datetime':
        field_type = 'datetime';
        break;

      case 'date':
        field_type = 'date';
        break;

      default:
        field_type = 'textbox';
        break;
    }
    return field_type;
  }
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  private GemgarteIdWithUniwquie(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  dropNewGrop(lst, a) {
    if (this.dragedColor) {
      this.dragedColor.index = a;
      this.newgroup.push(this.dragedColor);
      this.dragedColor = null;
    }
  }
  sectionIndex;
  questionIndex;
  answerIndex;
  control;
  show(control, ix, iy, iz, section: any, statusId: string) {
    let qtyList = [];
    this.questionnaire.mainSection[ix].mainSubSection.forEach((itr, index) => {
      if (index > iy) return;
      let e = JSON.parse(JSON.stringify(itr));
      if (e.sectionType == 'question') {
        e.question.dependent_type = "section";
        if (e.question.dt_code != 'default'
          && this.any(e.question.dt_code)
          && e.question.form_field_id != control.form_field_id
        ) {
          qtyList.push(e.question);
        }
      } else {
        e.SubSectionQuestionAns.forEach((s, i) => {
          if (iz && i > iz) return;
          s.dependent_type = "subsection"
          if (s.dt_code != 'default' &&
            this.any(s.dt_code)
            && s.form_field_id != control.form_field_id) {
            qtyList.push(s);
          }
        });
      }
    });
    if (section == 'questionOnly') {
      this.sectionIndex = ix;
      this.sectionIdentification = section;
      this.questionIndex = iy;
      this.answerIndex = iz;
      this.control = control;
      this.editPopupModal.show(control, ix, iy, iz, qtyList, statusId,this.customFieldsList);
    }
    else {
      this.sectionIdentification = section;
      this.sectionIndex = ix;
      this.questionIndex = iy;
      this.answerIndex = iz;
      this.control = control;
      this.editPopupModal.show(control, ix, iy, iz, qtyList, statusId,this.customFieldsList);
    }
  }
  any(fieldType) {
    return (fieldType == 'radio' || fieldType == 'checkbox' || fieldType == 'boolean' || fieldType == 'select') ? true : false;
  }
  refreshJson() {
    let final; let contro; var control; let secondData;
    if (this.sectionIdentification == 'questionOnly') {
      control = this.control;
    }
    else {
      control = this.control;
    }
    control['isDirty'] = true;
    if (this.editPopupModal.singleLine == true) {
      control['display_name'] = this.editPopupModal.singleLineNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.singleLineMarkRequired.value; // use this param for required
      control['dt_code'] = 'textbox'; // use this param for required
      control['isDirty'] = true;
      control['field_type'] = 'textbox';
    }
    else if (this.editPopupModal.multiLine == true) {
      control['display_name'] = this.editPopupModal.multiLineNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.multiLineMarkRequired.value; // use this param for required
      control['dt_code'] = 'textarea'; // use this param for required
      control['isDirty'] = true;
      control['field_type'] = 'textarea';
    }
    else if (this.editPopupModal.SelectList == true) {
      control['display_name'] = this.editPopupModal.selectListLineNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.selectListMarkRequired.value; // use this param for required
      control['selectlistvalues'] = this.editPopupModal.selectlistvalue.value; // use this param for picklist options
      control['isDirty'] = true;
      control['dt_code'] = 'select';
      control['dropdown'] = 'textarea';
    }
    else if (this.editPopupModal.intShow == true) {
      control['display_name'] = this.editPopupModal.intNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.intMarkRequired.value; // use this param for required
      control['dropdown'] = 'int';
      control['dt_code'] = 'int';
    }
    else if (this.editPopupModal.bigInt == true) {
      control['display_name'] = this.editPopupModal.bigintNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.bigintMarkRequired.value; // use this param for required
      control['dt_code'] = 'bigint';
      control['field_type'] = 'bigint';
    }
    else if (this.editPopupModal.decimalShow == true) {
      control['display_name'] = this.editPopupModal.decimalNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.decimalMarkRequired.value; // use this param for required
      control['dropdown'] = 'decimal';
      control['dt_code'] = 'decimal';
    }
    else if (this.editPopupModal.dateShow == true) {
      control['display_name'] = this.editPopupModal.dateNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.dateMarkRequired.value; // use this param for required
      control['dt_code'] = 'date';
      control['dropdown'] = 'date';

    }
    else if (this.editPopupModal.dateTimeShow == true) {
      control['display_name'] = this.editPopupModal.dateNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.dateMarkRequired.value; // use this param for required
      control['dt_code'] = 'datetime';
      control['dropdown'] = 'datetime';

    }
    else if (this.editPopupModal.booleanShow == true) {
      control['display_name'] = this.editPopupModal.booleanNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.booleanMarkRequired.value; // use this param for required
      control['dropdown'] = 'boolean';
      control['dt_code'] = 'boolean';
    }
    else if (this.editPopupModal.checkboxShow == true) {
      control['display_name'] = this.editPopupModal.checkboxNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.checkboxMarkRequired.value; // use this param for required
      control['picklist_options'] = this.editPopupModal.checkboxCharactersAllowed.value; // use this param for required
      control['dt_code'] = 'checkbox';
      control['dropdown'] = 'checkbox';

    }
    else if (this.editPopupModal.radioShow == true) {
      control['display_name'] = this.editPopupModal.radioNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.radioMarkRequired.value; // use this param for required
      control['picklist_options'] = this.editPopupModal.radioCharactersAllowed.value; // use this param for required
      control['dropdown'] = 'radio';
      control['dt_code'] = 'radio';
    }
    else if (this.editPopupModal.imageShow == true) {
      control['display_name'] = this.editPopupModal.urlNameDisplay.value; // use this param for question
      control['is_required'] = this.editPopupModal.urlMarkRequired.value; // use this param for required
      control['picklist_options'] = this.editPopupModal.urlCharactersAllowed.value; // use this param for required
      control['dt_code'] = 'image';
    }
    control['dependent_id'] = this.editPopupModal.ddlFormField.value;
    control['is_dependent'] = this.editPopupModal.chkIsDependant.value;
    control['dependent_value'] = this.editPopupModal.ddlOption.value;
    control['dependent_type'] = this.editPopupModal.dependentType.value;
    control['is_aync_with_object'] = this.editPopupModal.isSyncWithObject.value;
    control['is_sync_with_object_field_id'] = this.editPopupModal.isSyncWithObjectFieldId.value;
    
    if (this.sectionIdentification == 'questionOnly') {
      this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].question = control;
      this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].question.statusId = this.editPopupModal.statusId.value;
      this.dragedColor = null;
    }
    else {
      this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].SubSectionQuestionAns[this.answerIndex] = control;
      this.questionnaire.mainSection[this.sectionIndex].mainSubSection[this.questionIndex].SubSectionQuestionAns[this.answerIndex].statusId = this.editPopupModal.statusId.value;
      this.dragedColor = null;
    }
    this.isSomethingChange = true;
  }
  filedLists = [
    //{ form_field_id: "", sql_type: "nvarchar", name: "Text", dt_code: "text", class_name: "fa fa-file-text-o ", display_order: 0, actual_data_type: "string", id: 11, required: false, picklist_options: null, field_type: 'texteditor', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Single Line", dt_code: "text", class_name: "fa fa fa-ellipsis-h", display_order: 1, actual_data_type: "string", id: 1, required: false, length: 0, picklist_options: null, field_type: 'textbox', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Multi Line", group_name: "", dt_code: "textarea", class_name: "fa fa-navicon", display_order: 2, data_type_name: "string", id: 2, required: false, length: 0, index: "", picklist_options: null, field_type: 'textarea', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "select", name: "Select List", group_name: "", dt_code: "select", class_name: "fa fa-list", display_order: 3, data_type_name: "select", id: 3, required: false, length: 0, index: "", picklist_options: null, field_type: 'select', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "int", name: "Integer", group_name: "", dt_code: "int", class_name: "fa fa-sort-numeric-asc", display_order: 4, data_type_name: "int", id: 4, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bigint", name: "Long Integer", group_name: "", dt_code: "bigint", class_name: "fa  fa-list-ol", display_order: 5, data_type_name: "bigint", id: 5, required: false, length: 0, index: "", picklist_options: null, field_type: 'number', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_daependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "decimal", name: "Decimal", group_name: "", dt_code: "decimal", class_name: "fa fa fa-circle", display_order: 6, data_type_name: "decimal", id: 6, required: false, length: 0, index: "", picklist_options: null, field_type: 'decimal', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "date", name: "Date", group_name: "", dt_code: "date", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'date', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "datetime", name: "Datetime", group_name: "", dt_code: "datetime", class_name: "fa fa-calendar-o", display_order: 7, data_type_name: "date", id: 7, required: false, length: 0, index: "", picklist_options: null, field_type: 'datetime', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Checkbox", group_name: "", dt_code: "checkbox", class_name: "feather-check-square-o", display_order: 8, data_type_name: "string", id: 8, required: false, length: 0, index: "", picklist_options: null, field_type: 'checkbox', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "nvarchar", name: "Radio", group_name: "", dt_code: "radio", class_name: "fa fa-dot-circle-o", display_order: 9, data_type_name: "string", id: 9, required: false, length: 0, index: "", picklist_options: null, field_type: 'radioButton', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "image", name: "image", group_name: "", dt_code: "image", class_name: "fa fa-picture-o", display_order: 10, data_type_name: "image", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'image', default_value: '' },
    { is_aync_with_object : false, is_sync_with_object_field_id : null, statusId: '', dependent_type: '', dependent_value: '', dependent_id: '', is_dependent: false, form_field_visibility: 'YES', isDirty: false, form_field_id: "", sql_type: "bit", name: "Boolean", group_name: "", dt_code: "boolean", class_name: "fa fa-at", display_order: 11, data_type_name: "bit", id: 10, required: false, length: 0, index: "", picklist_options: null, field_type: 'boolean', default_value: '' }];
}
