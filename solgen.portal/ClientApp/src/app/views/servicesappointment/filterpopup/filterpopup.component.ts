import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServicesappointmentService, filterData, saveSa_Data } from '../servicesappointment.service';
import { take } from 'rxjs/operators';
import { NgSelectComponent } from '@ng-select/ng-select';
import { LeadlistService } from '../../lead/leadlist.service';

@Component({
  selector: 'app-filterpopup',
  templateUrl: './filterpopup.component.html',
  styleUrls: ['./filterpopup.component.scss']
})
export class FilterpopupComponent implements OnInit {

  @ViewChild('resourcedll', { static: false }) resourcedll: NgSelectComponent;
  @ViewChild('filterPopoup', { static: false }) filterModal: ModalDirective;
  @Output() getFilterData = new EventEmitter<object>();
  filterPopoupForm: FormGroup;

  crewList = [];
  resourceList = [];
  departmentList = [];
  warehouseList = [];
  lstWorkType = [];
  lstTeritory = [];
  lstWorkOrderCategory = [];
  lstaccountlist = [];
  lstsitesurveyzone = [];
  filterData : filterData = new filterData();
  saveSa_Data: saveSa_Data = new saveSa_Data();
  loadSave = false;
  len: any = 10;
  scrollDataList: any;
  searchText: string='';
  departmentid: any;

  constructor(private fb: FormBuilder, private toaster: ToastrService, private commonService: CommonService, private leadlistService: LeadlistService, private service: ServicesappointmentService,
    ) { }

  ngOnInit() {
    this.initForm();
    this.loadSave = true;

  }

  private initForm() {
    this.filterPopoupForm = this.fb.group({
      serviceCrew: [null],
      serviceResource: [null],  
      department: [null],  
      warehouse: [null],  
      worktype: [null],  
      serviceTeritory: [null],  
      category: [null],  
      account: [null],  
      sitesurveyZone: [null],  
      testAccount: [false],  
    });
  }

  get serviceCrew() { return this.filterPopoupForm.get('serviceCrew'); }
  get serviceResource() { return this.filterPopoupForm.get('serviceResource'); }
  get department() { return this.filterPopoupForm.get('department'); }
  get warehouse() { return this.filterPopoupForm.get('warehouse'); }
  get worktype() { return this.filterPopoupForm.get('worktype'); }
  get serviceTeritory() { return this.filterPopoupForm.get('serviceTeritory'); }
  get category() { return this.filterPopoupForm.get('category'); }
  get account() { return this.filterPopoupForm.get('account'); }
  get testAccount() { return this.filterPopoupForm.get('testAccount'); }
  get sitesurveyZone() { return this.filterPopoupForm.get('sitesurveyZone'); }





  show() {
    // this.filterPopoupForm.reset();
    //this.GetCrewList();
    this.filterPopoupForm.reset();
    this.getDepartmentList();
    this.GetLeadConvertAccountDll(null);
    this.GetServiceCrewDll();
    this.GetServiceResourceDll();
    this.getWorkTypeList();
    this.getServiceTerritory();
    this.getWarehouse();
    this.getSurveyZone();
    this.getWorkOrderCategory();
    this.service.getGhantViewFilter().subscribe((result: any) => {
      if (result != null) {
        result = JSON.parse(result);
        result = JSON.parse(result[0].FilterJson);
        if (result.accountid != null) {
          this.GetLeadConvertAccountDll(result.accountid);
        }
        if (result.resourceid != null) {
          this.GetServiceResourceDll(result.resourceid);

        }
        if (result.crewid != null) {
          this.GetServiceCrewDll(result.crewid);

        }
        if (result.warehouseid == 0) {
          result.warehouseid = null;
        }
        this.filterPopoupForm.patchValue({
          serviceCrew: result.crewid,
          serviceResource: result.resourceid,
          department: result.departmentid,
          warehouse: result.warehouseid,
          worktype: result.worktypeid,
          serviceTeritory: result.teritoryid,
          category: result.categoryid,
          account: result.accountid,
          testAccount: result.testAccount,
          sitesurveyZone: result.sitesurveyZone,
        })
      }
    })
    this.filterModal.show();
    this.loadSave = false;
  };

  close() {
    this.filterModal.hide();
    this.filterModal.ngOnDestroy();
  }
  clearAllFields() {
    //this.initForm();
    this.filterPopoupForm.reset();
   // this.submit();
  }
  getSurveyZone() {
    this.commonService.getMasterItemsList("SiteSurveyZone").subscribe((result: any) => {
      this.lstsitesurveyzone = this.commonService.masters;
    })
   
  }
  getDepartmentList(){
    this.commonService.getMasterItemsList("department").subscribe((result: any) => {
      this.departmentList = this.commonService.masters;
    })
  }
  getServiceTerritory() {
    this.commonService.getMasterItemsList("ServiceTerritory").subscribe((result: any) => {
      this.lstTeritory = this.commonService.masters;
    })
  }
  getWarehouse() {
    this.commonService.getMasterItemsList("locWarehouse").subscribe((result: any) => {
      this.warehouseList = this.commonService.masters;
    })
  }
  getWorkOrderCategory() {
    this.commonService.getMasterItemsList("WorkOrderCategory").subscribe((result: any) => {
      this.lstWorkOrderCategory = this.commonService.masters;
    })
  }
  getWorkTypeList() {
    this.commonService.getMasterItemsList("WorkType").subscribe((result: any) => {
      this.lstWorkType = this.commonService.masters;
    })
  }


  //GetCrewList(id:any=null) {
  //  this.service.GetServiceCrewAndResourceDll(id, 0, '','').pipe(take(1)).subscribe((resp) => {
  //    if (resp) {
  //      this.crewList = resp as [];
  //    }
  //  });

  //}
  
  onChange(e: any) {
   

  }
  submit() {
    this.filterData.crewid = this.filterPopoupForm.get('serviceCrew').value;
    this.filterData.warehouseid = this.filterPopoupForm.get('warehouse').value;
    this.filterData.resourceid = this.filterPopoupForm.get('serviceResource').value;
    this.filterData.departmentid = this.filterPopoupForm.get('department').value;
    this.filterData.worktypeid = this.filterPopoupForm.get('worktype').value;
    this.filterData.teritoryid = this.filterPopoupForm.get('serviceTeritory').value;
    this.filterData.testAccount = this.filterPopoupForm.get('testAccount').value;
    this.filterData.accountid = this.filterPopoupForm.get('account').value;
    this.filterData.categoryid = this.filterPopoupForm.get('category').value;
    this.filterData.sitesurveyZone = this.filterPopoupForm.get('sitesurveyZone').value;

    if (this.filterData.worktypeid != null ) {
      if (this.filterData.worktypeid.length == 0) {
        this.filterData.worktypeid = null;
      }
    }
    if (this.filterData.warehouseid != null) {
      if (this.filterData.warehouseid.length == 0) {
        this.filterData.warehouseid = null;
      }
    }
    
    
    //if (this.filterPopoupForm.get('warehouse').value != null) {
    //  if (this.filterPopoupForm.get('warehouse').value.length == 0) {
    //    this.filterData.warehouseid = null;
    //  }
    //}
  
    var data = JSON.stringify(this.filterData)
    this.saveSa_Data.filterdata = JSON.stringify(this.filterData);
    this.service.SaveGhantViewFilter(this.saveSa_Data).subscribe((result: any) => {
      this.toaster.success('Filter data applied successfully.')
    })
    //if (ab == null) {
    //  this.getFilterData.emit({ id: 0, type: null })
    //} else {
    //  var data = this.crewList.filter(m => m.value.toString() == ab.toString())
    this.getFilterData.emit({ data: data, isClearFilter: 'false'});
    //this.getFilterData.emit(data);
    //}
    
    this.filterModal.hide();
    
  }

  GetServiceCrewDll(id: any = null) {
    this.service.GetServiceCrewDll(id, 0, '').subscribe((data: any) => {
      this.crewList = data;
    })
  }
  GetServiceResourceDll(id: any = null, depid: any = null) {
    this.service.GetServiceResourceDll(id, 0, '', depid).subscribe((data: any) => {
      this.resourceList = data;
    })
  }
  onScrollToEnd(dataList: any) {
    this.fetchMoreServiceCrew(dataList);
  }

  onKey(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.service.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.crewList = data;
    })
  }

  private fetchMoreServiceCrew(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.service.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.crewList = this.crewList.concat(data);
    })
  }

  onClearLang(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.service.GetServiceCrewDll('', this.len, this.searchText).subscribe((data: any) => {
      this.crewList = data;
    });
   
  }

      


  onScrollToEndresource(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;

    this.service.GetServiceResourceDll('', this.len, this.searchText, this.departmentid).subscribe((data: any) => {
      this.resourceList = this.resourceList.concat(data);
    })

  }

  onKeyresource(e: any, dataList: any) {
    this.len = 0
    this.searchText = e.target.value;
    this.service.GetServiceResourceDll('', this.len, this.searchText, this.departmentid).subscribe((data: any) => {
      this.resourceList = data;
    })
  }

  onClearLangresource(dataList: any): void {
    this.len = 0
    this.searchText = '';
    this.departmentid = 0;
    this.service.GetServiceResourceDll('', this.len, this.searchText).subscribe((data: any) => {
      this.resourceList = data;
    });
  }
  changeDept(id: any) {
    this.resourcedll.clearModel();
    this.departmentid = id.value;
    this.GetServiceResourceDll(null, this.departmentid);
  }
  clearallForm() {
    this.filterPopoupForm.reset();
    this.filterData.crewid = this.filterPopoupForm.get('serviceCrew').value;
    this.filterData.resourceid = this.filterPopoupForm.get('serviceResource').value;
    this.filterData.warehouseid = this.filterPopoupForm.get('warehouse').value;
    this.filterData.testAccount = this.filterPopoupForm.get('testAccount').value;
    this.filterData.departmentid = this.filterPopoupForm.get('department').value;
    this.filterData.worktypeid = this.filterPopoupForm.get('worktype').value;
    this.filterData.teritoryid = this.filterPopoupForm.get('serviceTeritory').value;
    this.filterData.accountid = this.filterPopoupForm.get('account').value;
    this.filterData.categoryid = this.filterPopoupForm.get('category').value;
    this.filterData.sitesurveyZone = this.filterPopoupForm.get('sitesurveyZone').value;
    var data = JSON.stringify(this.filterData)
    this.saveSa_Data.filterdata = data;
    this.service.SaveGhantViewFilter(this.saveSa_Data).subscribe((result: any) => {
      this.toaster.success('Filter data clear successfully.')
    })
    //this.getFilterData.emit(data);
    this.getFilterData.emit({ data: data, isClearFilter: 'true'});
    

    this.filterModal.hide();
  }
  GetLeadConvertAccountDll(id: any = 0) {
    this.leadlistService.GetLeadConvertAccountDll(id, '0', this.searchText).subscribe((data: any) => {
      this.lstaccountlist = data;
    })
  }
  private fetchMoreAccountDll(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.leadlistService.GetLeadConvertAccountDll(null, this.len, this.searchText).subscribe((data: any) => {
      this.lstaccountlist = this.lstaccountlist.concat(data);
    })
  }
  onKeyAccountDll(e: any, dataList: any) {

    this.len = 0
    this.searchText = e.target.value;
    this.leadlistService.GetLeadConvertAccountDll(null, this.len, this.searchText).subscribe((data: any) => {
      this.lstaccountlist = data;
    })

  }
  onScrollToEndAccountDll(dataList: any) {
    this.fetchMoreAccountDll(dataList);
  }  
  onClearLangAccountDll(dataList: any): void {
    

    this.len = 0
    this.searchText = '';
    this.leadlistService.GetLeadConvertAccountDll(null, this.len, this.searchText).subscribe((data: any) => {
      this.lstaccountlist = data;
    });
  }

}
