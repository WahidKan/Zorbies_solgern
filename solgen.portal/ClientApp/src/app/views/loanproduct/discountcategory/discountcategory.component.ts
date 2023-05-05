import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DocumentModel, LoanproductService } from '../loanproduct.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService, ModuleList } from '../../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discountcategory',
  templateUrl: './discountcategory.component.html',
  styleUrls: ['./discountcategory.component.scss']
})
export class DiscountcategoryComponent implements OnInit {

  @ViewChild('discountDocument', { static: false }) discountDocument: ModalDirective;
  @Output() discountDocuments = new EventEmitter();
  active = false;
  documentModel: DocumentModel = new DocumentModel();
  modulePermission: ModuleList;
  loadSave = false;
  constructor(private fb: FormBuilder,
    private loanproductService: LoanproductService,
    private router: Router, private commonService: CommonService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
  }

  show() {
    this.discountDocument.show();
  }
  close() {
    this.active = false;
    this.discountDocument.hide();
  }
  sendDataToDocumentType() {
    if (this.addForm.valid) {
      this.documentModel.documentName = this.addForm.value.documentName;
      this.documentModel.mandatory = this.addForm.value.mandatory;
      this.loanproductService.AddEditDiscountDocument(this.documentModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          // this.router.navigate(["/calendar"]);
          this.addForm.reset();
          this.discountDocument.hide();
          this.discountDocuments.emit();

        }
        else {
          //this.loadSave = false;
          this.toaster.error(result.responseMessage);

        }
      }, error => {
        //this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }
  addForm = this.fb.group({
    documentName: ['', Validators.required],
    mandatory: [false],

  })
  get documentName() { return this.addForm.get('documentName'); }
  get mandatory() { return this.addForm.get('mandatory'); }

}
