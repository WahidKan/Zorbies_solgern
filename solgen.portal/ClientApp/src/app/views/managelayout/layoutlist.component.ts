import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from './layout.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-layoutlist',
  templateUrl: './layoutlist.component.html',
  styleUrls: ['./layoutlist.component.scss']
})
export class LayoutlistComponent implements OnInit {
  modulelist: any;
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  loading = false;
  id: any;
  sortDir = 'desc';
  sortColumn = 'Id';
  pagedData: any = {
    pager: {},
    data: []
  };
  @ViewChild('Select', { static: false }) MySelect: NgSelectComponent;
  listFilter = '';
  searchTxt = '';
  selectedValue: any;
  SelectedText: any;
  lstPageSize: any
  pageSizeValue: number;
  modulecode: number = 0;
  modulenamecode: any;
// modulePermission: ModuleList;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;
  currentPage: number;
  contentHeader: object;


  constructor(private fb: FormBuilder,
    private layoutservice: LayoutService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);



    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CUSTOMFIELDSADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CUSTOMFIELDSUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CUSTOMFIELDSDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
  }

  ngOnInit() {
    this.currentPage = 0;
    this.pageSizeValue = 15;
    this.getPageSizes();
    this.refresh();
    this.getModuleddl();
   
    this.route.paramMap.subscribe(
      params => {

        const id = params.get('id');
        this.id = id;
       // alert(this.id);

      });
  
      this.initBreadCrumb();
    }
    
    initBreadCrumb() {
       this.contentHeader = {
         headerTitle: 'Manage Custom Fields',
         actionButton: true,
         iconCssClass: '',
         breadcrumb:
           [
             {
               name: 'Dashboard',
               isLink: true,
               link: '/dashboard'
             },
             {
               name: 'Manage Custom Fields',
               isLink: false
             }
    
           ]
       };
     }
  getModuleddl() {
    this.commonService.getMasterItemsList('custom_modules_layout').subscribe((result: any) => {
      this.modulelist = this.commonService.masters;
      // // console.log('sas', this.commonService.masters);
      if (this.id != null) {
        for (var i = 0; i < this.modulelist.length; i++) {
          let s = this.modulelist[i];
          if (s.text.toString().toUpperCase() == this.id.toString().toUpperCase()) {
            let value: any = s.value;
            let text: any = s.text;
            // // console.log('text ', text)
            // // console.log('value ',value)
            this.selectedValue = value.toString();
            this.SelectedText = text.toString();
            this.selectmoduleValue(this.selectedValue, this.SelectedText);
            // // console.log('value ', this.selectedValue)
           // this.MySelect.select(s.value.toString());

          }
        }
      }       
    })
  }
  selectmodule(event) {
    if (typeof event === 'undefined') {
     
      this.modulecode = 0;
      this.listFilter = '';
      this.refresh();
    }
    else {
      this.router.navigateByUrl(`layoutlist/layoutlist/${event.text}`);
      this.modulecode = (event.value);
      this.modulenamecode = (event.text);
      this.listFilter = this.modulenamecode;
      this.refresh();
    }
  }
  selectmoduleValue(value: any, text: any) {

    if (value!=null) {
      this.modulecode = value;
      this.modulenamecode = text;
      this.refresh();
    }
    else {
      this.modulecode = 0;
      this.refresh();
    }
  }
  edit(modulecode,submoduelcode) {
    //alert(modulecode); alert(submoduelcode);
    this.router.navigate(['/layoutlist/editlayout', modulecode, submoduelcode]);
  }

  refresh() {
    this.loading = true;
    this.layoutservice.GetLayoutList(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.modulecode).subscribe(response => {

      this.pagedData = this.layoutservice.pagedData;
      // // console.log(this.pagedData);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  setPage($event) {
    this.currentPage = $event.page - 1;
    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = $event.page - 1;
    this.refresh();;
  }
}
