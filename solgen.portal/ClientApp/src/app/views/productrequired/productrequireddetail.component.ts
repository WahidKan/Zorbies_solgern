import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductrequiredserviceService } from './productrequiredservice.service';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-productrequireddetail',
  templateUrl: './productrequireddetail.component.html',
  styleUrls: ['./productrequireddetail.component.scss']
})
export class ProductrequireddetailComponent implements OnInit {
  loadSave = false;
  ckeConfig: any;
  lstPriceBook: any
  addOrUpdatePermission = false;
  productName: any = '';
  ProductRequiredId: any;
  QuantityRequired: any;
  ProductRequiredNumber: any;
  Update_Required_Products_for__c: any;
  productRequiredDetail: any = null;
  pageTitle: any;
  Description__c: any;
  ProductId: any;
  QuantityUnitOfMeasure: any = '';
  parentRecordType: any;
  modulePermission: any[] = [];
  contentHeader: object;
  constructor(private fb: FormBuilder,
    private productrequiredserviceService: ProductrequiredserviceService,
    private commonService: CommonService,
    private router: Router, private location: Location,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    // console.log("priviledgeCode", priviledgeCode);
    // console.log("moduleCode", moduleCode);
    // console.log("modulePermission", this.modulePermission);
    //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    //// console.log("CHKPersmission", add);
    //if (add == undefined) {
    //  this.addOrUpdatePermission = false;
    //} else {

    //  this.addOrUpdatePermission = true;
    //}

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSave = true;
        this.pageTitle = 'Edit Price Book';
        this.ProductRequiredId = id;
        this.GetProductRequiredById(id);
      }
      else {
        this.pageTitle = 'Add Price Book';
      }
    });
 
    
    this.initBreadCrumb();
    }

    initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Product Required',
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
            name: 'Manage Product Required',
            isLink: true,
            link: '/manageproductrequired'
          },
          {
            name: 'Product Required Details',
            isLink: false
          }

        ]
    };
    }

  GetProductRequiredById(id) {
    this.productrequiredserviceService.GetProductRequiredById(id).subscribe((result: any) => {
      // console.log("resultPriceBook", result);
      if (result) {
        this.loadSave = false;
        this.pageTitle = 'Edit Price Book';
        this.productRequiredDetail = result[0];
        this.productName = this.productRequiredDetail.productName;
        this.ProductId =this.productRequiredDetail.ProductId;
        this.ProductRequiredNumber = this.productRequiredDetail.ProductRequiredNumber;
        this.parentRecordType = this.productRequiredDetail.parentRecordType;
        this.Update_Required_Products_for__c = this.productRequiredDetail.Update_Required_Products_for__c;
        this.QuantityUnitOfMeasure = this.productRequiredDetail.QuantityUnitOfMeasure;
        this.QuantityRequired = this.productRequiredDetail.QuantityRequired;
        this.Description__c =this.productRequiredDetail.Description__c;
      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }

  OnBackToListClick() {
    this.location.back();
  }
}
