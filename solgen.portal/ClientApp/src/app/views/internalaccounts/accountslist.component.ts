import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  ModuleList,
  CommonService,
  validationModel,
} from "../shared/common.service";
import { AccountserviceService } from "./accountservice.service";
import { ConfirmationDialogService } from "../shared/confirmation-dialog/confirmation-dialog.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SearchfilteraddComponent } from "../shared/searchfilter/searchfilteradd.component";
import { ManageviewComponent } from "../shared/manageview/manageview.component";
import { SelectionType, DatatableComponent } from "@swimlane/ngx-datatable";
import { debug } from "console";

@Component({
  selector: "app-accountslist",
  templateUrl: "./accountslist.component.html",
  styleUrls: ["./accountslist.component.scss"],
})
export class AccountslistComponent implements OnInit {
  validationModel: validationModel = new validationModel();
  @ViewChild("templateFilterView", { static: false })
  FilterViewModal: SearchfilteraddComponent;
  @ViewChild("templateManageView", { static: false })
  ManageViewModal: ManageviewComponent;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild("table", { static: false }) tableModal: DatatableComponent;
  @Input() offset: number;
  moduleName = "crm";
  submoduleName = "account";
  custom_view_id = "";
  searchUserType = "";
  loginuserid: any;
  // modulePermission: ModuleList;
  modulePermission: any[] = [];
  ViewModel: any = "";
  //loading = false;
  //modulePermission: ModuleList;
  loadSave = true;
  SelectionType = SelectionType;
  sortDir = "desc";
  sortColumn = "id";
  vewId: any;
  lstUserType: any;
  pagedData: any = {
    pager: {},
    data: [],
  };
  listFilter = "";
  searchTxt = "";
  listFiltertext = "";
  lstPageSize: any;
  pageSizeValue: number;
  tableName = "tblaccounts";
  jsonData: any;
  placeholder: string = "Search by Name";
  searchlabelName: string = "Name";
  listLabelName: string = "Accounts";
  isApproveAccount = false;
  columndata: any;
  columnheading: any;
  totalRecords: any;
  currentPage: number;
  companyId: any;
  deleteId: any;
  selected = [];
  is_filter: any;
  lstListingColorCode: any;

  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  companyType: any;
  myCheckbox: any = false;
  load: boolean = false;
  actionarray: any[] = [];
  jsonDatapack: any;
  jsoncondition: any;
  userinfodata: any;
  contentHeader: object;
  isSubDealerList: boolean;
  isCustomerList: boolean;
  roleName: any = " Accounts";
  isSubDealer: boolean = true;

  constructor(
    private internalAccountService: AccountserviceService,
    private dialogService: ConfirmationDialogService,
    private commonService: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyId = userdetail.companyId;
      this.companyType = userdetail.companyType;
      this.validationModel.companyType = userdetail.companyType;
    });
  }

  ngOnInit() {
    //console.log(this.router.url);
    localStorage.removeItem("isSubDealer");
    this.loadSave = true;
    this.modulePermission = this.commonService.getPermissiondata(
      this.activeRoute.snapshot.data.moduleCode
    );

    if (
      this.router.url != "/accountslist/sub-dealer" &&
      this.router.url != "/accountslist/customer"
    ) {
      this.isSubDealerList = false;
      this.isCustomerList = false;
      this.isAdd = this.commonService.listingsActionManager_ForUpperCase(
        this.modulePermission,
        "ACCOUNTADD"
      );
      this.isUpdate = this.commonService.listingsActionManager_ForUpperCase(
        this.modulePermission,
        "ACCOUNTUPDATE"
      );
      this.isDelete = this.commonService.listingsActionManager_ForUpperCase(
        this.modulePermission,
        "ACCOUNTDELETE"
      );
    }

    if (this.router.url == "/accountslist/sub-dealer") {
      this.modulePermission = this.commonService.getPermissiondata(6003);
      this.isSubDealerList = true;
      this.roleName = " Sub Dealers";
      this.isAdd = this.commonService.listingsActionManager_ForLowerCase(
        this.modulePermission,
        "subdealeradd"
      );
      this.isUpdate = this.commonService.listingsActionManager_ForLowerCase(
        this.modulePermission,
        "subdealerupdate"
      );
      this.isDelete = this.commonService.listingsActionManager_ForLowerCase(
        this.modulePermission,
        "subdealerdelete"
      );
    }
    if (this.router.url == "/accountslist/customer") {
      this.isCustomerList = true;
      this.roleName = " Customers";
      this.modulePermission = this.commonService.getPermissiondata(6004);
      this.isSubDealerList = false;
      this.isAdd = this.commonService.listingsActionManager_ForLowerCase(
        this.modulePermission,
        "customeradd"
      );
      this.isUpdate = this.commonService.listingsActionManager_ForLowerCase(
        this.modulePermission,
        "customerupdate"
      );
      this.isDelete = this.commonService.listingsActionManager_ForLowerCase(
        this.modulePermission,
        "customerdelete"
      );
    }

    this.custom_view_id = "";
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.getPageSizes();
    this.LoadViewData();
    this.refresh();
    this.userinfodata = localStorage.getItem("userinfo");
    this.companyType = JSON.parse(this.userinfodata).companyType;
    this.actionarray = [
    ];
    //debugger;
    if ((this.companyType != "companytypeSolarInstall" && this.companyType != "companytypeCRMLoanInstall") || (this.router.url == "/accountslist/sub-dealer")) {
      this.actionarray.push({
        name: "View",
        click: "goToPage(row)",
        route: "/accountslist/viewaccount/",
        title: "View Detail",
        iclass: "feather-eye text-info pr-2",
        condition: "true",
      });
    } else {
      this.actionarray.push({
        name: "View",
        click: "goToPage(row)",
        route: "/accountslist/view/",
        title: "View Detail",
        iclass: "feather-eye text-info pr-2",
        condition: "true",
      });
    }
    this.actionarray.push({
      name: "Edit",
      click: "goToPage(row)",
      route: "/accountslist/editaccount/",
      title: "Edit",
      iclass: "feather-edit-2 text-success pr-2",
      condition: "this.isUpdate",
    })

    this.actionarray.push({
      name: "Delete",
      click: "goToPage(row)",
      title: "Delete",
      iclass: "feather-trash-2 text-danger",
      condition: "this.isDelete",
    })
    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: "Manage" + this.roleName,
      actionButton: true,
      iconCssClass: "",
      breadcrumb: [
        {
          name: "Dashboard",
          isLink: true,
          link: "/dashboard",
        },
        {
          name: "Manage" + this.roleName,
          isLink: false,
        },
      ],
    };
  }

  ApplyAdvanceFilter(event) {
    this.currentPage = 1;
    this.listFiltertext = "";
    this.listFiltertext = event;
    this.refresh();
  }

  GetcustomViewid(event) {
    if (event == "undefined" || typeof event == "undefined") {
      //this.isAddViewFirstTime = true;
      this.LoadViewData();
    }
    this.pagedData.data.forEach((cnt) => {
      if (cnt.custom_view_id == event) {
        this.ViewModel = cnt.view_name;
      }
    });
    this.vewId = event;
    this.custom_view_id = event;
    this.refresh();
  }
  getListingColorCode(fieldValue: any) {
    this.lstListingColorCode = "";
    if (fieldValue != null) {
      this.lstListingColorCode = fieldValue.split("::");
      if (this.lstListingColorCode.length > 0) {
        this.lstListingColorCode = [
          {
            color: this.lstListingColorCode[0],
            colorkey: this.lstListingColorCode[1],
          },
        ];
      }
    }
    return this.lstListingColorCode;
  }

  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;

    this.internalAccountService
      .GetAccountsList(
        this.isCustomerList,
        this.isSubDealerList,
        this.listFiltertext,
        this.sortColumn,
        this.currentPage,
        this.pageSizeValue,
        this.sortDir,
        this.loginuserid,
        this.moduleName,
        this.submoduleName,
        this.companyId,
        this.custom_view_id,
        this.myCheckbox
      )
      .subscribe(
        (response) => {
          this.load = false;
          this.jsonData=response;
          //debugger
          this.jsonData.data.forEach((x)=>{
            if(x.AnnualRevenue != null ){
              x.AnnualRevenue ='$' + x.AnnualRevenue+'.00';
            }
          });
          // if(this.router.url == '/accountslist/sub-dealer'){
          //   response.data = response.data.filter(x=>x.RecordTypeId=='Sub Dealer');
          // }
          this.jsoncondition = JSON.stringify(this.validationModel);
          this.jsonDatapack = JSON.stringify(response);

          this.load = true;
          this.loadSave = false;
        },
        (error) => {
          this.loadSave = false;
        }
      );
  }

  get curPage(): number {
    return this.offset;
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }

  setPage($event) {
    this.loadSave = true;
    this.currentPage = 1;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }

  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }

  displayDetailDetail(TemplateName: any) {
    this.ManageViewModal.show(TemplateName);
  }

  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13 || keycode === "13") {
      this.search();
    }
  }
  search() {
    this.currentPage = 1;
    this.listFiltertext = "";
    if (this.listFilter.length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }

  reset() {
    //this.table.selected = [];
    this.listFilter = "";
    this.listFiltertext = "";
    this.currentPage = 1;
    this.myCheckbox = false;
    this.refresh();
  }
  onSelect({ selected }) {
    if (
      this.deleteId == "" ||
      this.deleteId == null ||
      this.deleteId == "undefined"
    ) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    } else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
  }

  popUpOpen() {
    this.is_filter = "";
    this.is_filter = this.listFiltertext.length;
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      this.dialogService
        .confirm(
          "Delete Account(s)",
          "Are you sure you want to delete the selected account(s)?"
        )
        .subscribe((confirmed) => {
          if (confirmed) {
            this.internalAccountService
              .DeleteRecords(this.deleteId, this.tableName)
              .subscribe(
                (r) => {
                  this.toaster.success(
                    `Record(s) has been deleted successfully`
                  );
                  this.deleteId = "";
                  this.selected = [];
                  this.refresh();
                },
                (error) => {}
              );
          }
        });
    } else {
      this.toaster.error("Please select at least one row.");
    }
  }

  Delete(row: any) {
    this.dialogService
      .confirm(
        "Delete Account",
        "Are you sure you want to delete Account " + row.Name + "?"
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.internalAccountService
            .DeleteRecords(row.Id, this.tableName)
            .subscribe(
              (r) => {
                this.toaster.success(
                  `Account "${row.Name}" has been deleted successfully`
                );
                this.refresh();
              },
              (error) => {}
            );
        }
      });
  }
  ApproveAccount(row: any) {
    this.dialogService
      .confirm(
        "Approve Account",
        "Are you sure you want to Approve Account " + row.Name + "?"
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.internalAccountService
            .AppeoveAccount(row.Id, this.tableName)
            .subscribe(
              (r) => {
                if (this.internalAccountService.editPage.statusCode == 200) {
                  this.toaster.success(
                    `Account "${row.Name}" has been approved successfully`
                  );
                  this.refresh();
                  this.isApproveAccount = true;
                } else {
                  this.toaster.error(
                    this.internalAccountService.editPage.responseMessage
                  );
                  this.refresh();
                }
              },
              (error) => {}
            );
        }
      });
  }
  LoadViewData() {
    //this.loadSave = true;
    this.pageSizeValue = 15;
    this.currentPage = 1;
    this.internalAccountService
      .getViewList(
        this.searchTxt,
        this.searchUserType,
        this.sortColumn,
        this.sortDir,
        0,
        this.pageSizeValue,
        this.moduleName,
        this.submoduleName,
        this.companyId
      )
      .subscribe(
        (response) => {
          this.pagedData = this.internalAccountService.pagedData;
          this.pagedData.data.forEach((cnt) => {
            if (cnt.is_default == true) {
              this.vewId = cnt.custom_view_id;
              this.ViewModel = cnt.view_name;
            }
          });

          //this.loadSave = false;
        },
        (error) => {
          //this.loadSave = false;
        }
      );
  }

  SetManageViewValue(e) {
    this.ViewModel = e.text;
    this.ViewModel = e.text;
    this.custom_view_id = e.event;
    this.vewId = e.event;
    this.refresh();
    //this.LoadViewData();
  }
  switchClicked(event) {
    this.listFiltertext = "";
    this.myCheckbox = event.srcElement.checked;
    this.currentPage = 1;
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "Name like '%" + this.listFilter + "%'";
    }
    if (this.listFiltertext.trim().length > 0) {
      this.refresh();
    }
    if (this.myCheckbox == false) {
      this.refresh();
    }
  }
  curPageemit(e) {
    return this.offset;
  }

  selectdata(e) {
    this.deleteId = "";
    this.deleteId = e;
  }

  MainMethod(e: any) {
    this.currentPage = e.pageNo;
    this.pageSizeValue = e.pageSize;
    this.sortColumn = e.sortColumn;
    this.sortDir = e.sortdirect;
    this.refresh();
  }
  goToPage(e: any) {
//debugger
    if(e.row.RecordTypeId == "Dealer")
    {
      localStorage.setItem("isSubDealer", 'Dealer');
    }
    else
    {
      localStorage.setItem("isSubDealer", '');
    }
    
    if (
      e.page.route != "null" &&
      e.page.route != undefined &&
      e.page.title != "View Detail"
    ) {
      if (this.router.url == "/accountslist/sub-dealer") {
        this.router.navigateByUrl(e.page.route + e.row.Id + "/subDealer");
      }

      if (this.router.url == "/accountslist/customer") {
        this.router.navigateByUrl(e.page.route + e.row.Id + "/customer");
      }

      if (this.router.url == "/accountslist") {
        this.router.navigateByUrl(e.page.route + e.row.Id );
      }
    }

    if (e.page.title && e.page.title == "View Detail") {
      if (this.router.url == "/accountslist/sub-dealer") {
        this.router.navigateByUrl(e.page.route + e.row.Id + "/subDealer");
      }

      if (this.router.url == "/accountslist/customer") {
        this.router.navigateByUrl(e.page.route + e.row.Id + "/customer");
      }

      if (this.router.url == "/accountslist") {
        this.router.navigateByUrl(e.page.route + e.row.Id+  "/account" );
      }
    }

    // if(e.page.title == undefined && e.page =='/accountslist/viewaccount/' && e.row.RecordTypeId=='Sub Dealer'){
    //   this.router.navigateByUrl(e.page + e.row.Id + "/subDealer");
    // }

    // if(e.page.title == undefined && e.page =='/accountslist/viewaccount/' && e.row.RecordTypeId=='Standard'){
    //   this.router.navigateByUrl(e.page + e.row.Id + "/customer");
    // }



    if(e.page.title == undefined && this.router.url == "/accountslist/sub-dealer"){
      //debugger
      //this.router.navigateByUrl(e.page + e.row.Id + "/subDealer");
      this.router.navigateByUrl('/accountslist/viewaccount/' + e.row.Id + "/subDealer");

  }

  if(e.page.title == undefined && this.router.url == "/accountslist/customer"){
    this.router.navigateByUrl(e.page + e.row.Id + "/customer");
}
if(e.page.title == undefined && this.router.url == "/accountslist"){
  this.router.navigateByUrl(e.page + e.row.Id + "/account");
}


    // if(e.page.title == 'Edit' && e.page.route =='/accountslist/editaccount/' && e.row.RecordTypeId=='Sub Dealer' || e.row.RecordTypeId=='Dealer'){
    //   this.router.navigateByUrl(e.page.route + e.row.Id + "/subDealer");
    // }

    // if(e.page.title == 'Edit' && e.page.route =='/accountslist/editaccount/' && e.row.RecordTypeId=='Standard'){
    //   //debugger
    //   if(this.companyType=='companytypeSolarInstall'){
    //     this.router.navigateByUrl(e.page.route + e.row.Id + "/account");
    //   }
    //   if(this.companyType='companytypeFinancialInstitute'){
    //     this.router.navigateByUrl(e.page.route + e.row.Id + "/customer");
    //   }
    //   // if(this.companyType='companytypeCRMLoanInstall' && ){
    //   //   this.router.navigateByUrl(e.page.route + e.row.Id + "/customer");
    //   // }
    //   //this.router.navigateByUrl(e.page.route + e.row.Id + "/customer");
    // }



    if(e.page.title == 'Edit' && this.router.url == "/accountslist/sub-dealer"){

        this.router.navigateByUrl(e.page.route + e.row.Id + "/subDealer");
    }

    if(e.page.title == 'Edit' && this.router.url == "/accountslist/customer"){
      this.router.navigateByUrl(e.page.route + e.row.Id + "/customer");
  }
  if(e.page.title == 'Edit' && this.router.url == "/accountslist"){
    this.router.navigateByUrl(e.page.route + e.row.Id + "/account");
  }



    if (e.page.name == "Delete") {
      this.Delete(e.row);
    }
  }

  filterpopup() {
    this.is_filter = "";
    this.FilterViewModal.show(this.companyId, this.is_filter);
  }
  add() {
    if (this.router.url == "/accountslist/sub-dealer") {
      this.router.navigateByUrl("/accountslist/addaccount/subDealer");
    }

    if (this.router.url == "/accountslist/customer") {
      this.router.navigateByUrl("/accountslist/addaccount/customer");
    }

    if (this.router.url == "/accountslist") {
      this.router.navigateByUrl("/accountslist/addaccount/account");
    }
  }
}
