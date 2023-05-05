import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PricebookService } from './pricebook.service';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeditpricebook',
  templateUrl: './addeditpricebook.component.html',
  styleUrls: ['./addeditpricebook.component.scss']
})
export class AddeditpricebookComponent implements OnInit {
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  loadSave = false;
  ckeConfig: any;
  lstPriceBook: any
  PriceBookId: any;
  pageTitle: any;
  priceBook: FormGroup;
  modulePermission: any[] = [];
  addOrUpdatePermission: boolean = false;
  constructor(private fb: FormBuilder,
    private pricebookService: PricebookService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    // console.log("priviledgeCode", priviledgeCode);
    // console.log("moduleCode", moduleCode);
    // console.log("modulePermission", this.modulePermission);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    // console.log("CHKPersmission", add);
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }
    
  }


  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSave = true;
        this.pageTitle = 'Edit Price Book';
        this.PriceBookId = id;
       this.getPriceBook(id);
      }
      else {
        this.pageTitle = 'Add Price Book';
      }
    }
    );
    this.initForm();
    this.getPriceBookType();
  }
  getPriceBookType() {
    this.commonService.getMasterItemsList("PriceBookType").subscribe((result: any) => {

      this.lstPriceBook = this.commonService.masters;
      // console.log("Data", this.lstPriceBook);
    })

  }
  onChange($event: any): void {
  }

  onPaste($event: any): void {
  }
  private initForm() {
    this.priceBook = this.fb.group({
      PriceBookID: ['', Validators.nullValidator],
      bookPrice: ['', [Validators.required, Validators.maxLength(50)]],
      bookPriceType: [null, [Validators.nullValidator]],
      isActive: [false, Validators.nullValidator],
      isVisibleToProposal: [false, Validators.nullValidator],
      Description: [''],
      isStandardPriceBook:[false]
    });
  }
  get PriceBookID() { return this.priceBook.get('PriceBookID');}
  get bookPrice() { return this.priceBook.get('bookPrice'); }
  get bookPriceType() { return this.priceBook.get('bookPriceType'); }
  get isActive() { return this.priceBook.get('isActive'); }
  get isVisibleToProposal() { return this.priceBook.get('isVisibleToProposal'); }
  get Description() { return this.priceBook.get('Description'); }
  get isStandardPriceBook() { return this.priceBook.get('isStandardPriceBook');}
  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('PriceBookID', this.PriceBookId);
    input.append('fieldsData', JSON.stringify(this.priceBook.value));
    return input;
  }
  save() {
    if (this.priceBook.valid) {
      this.loadSave = true;
      const priceBookmodel = this.prepareFormDataForDocument();
      //// console.log('companySetupModelcompanySetupModel', companySetupModel);
      this.pricebookService.addOrUpdatePriceBook(priceBookmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
         
          this.router.navigateByUrl("/pricebook");
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.priceBook);
    }
  }
  Cancel() {
    this.router.navigateByUrl("/pricebook");
  }
  getPriceBook(id) {
    this.pricebookService.getPriceBookById(id).subscribe((result: any) => {
      // console.log("resultPriceBook", result);
      if (result) {
        this.loadSave = false;
        this.pageTitle = 'Edit Price Book';
        this.priceBook.patchValue({
          PriceBookID: result[0].PriceBookID,
          bookPrice: result[0].PriceBookName,
          bookPriceType: result[0].PriceBookType,
          isActive: result[0].IsActive,
          isVisibleToProposal: result[0].VisibleToProposal,
          Description: result[0].Description,
          isStandardPriceBook: result[0].isStandardPriceBook
        });

       
      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }
}
