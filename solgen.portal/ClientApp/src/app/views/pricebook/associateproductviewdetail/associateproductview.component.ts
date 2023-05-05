import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { PricebookService } from '../pricebook.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-associateproductview',
  templateUrl: './associateproductview.component.html',
  styleUrls: ['./associateproductview.component.scss']
})
export class AssociateproductviewComponent implements OnInit {

  @ViewChild('totalDocAssociateProduct', { static: false }) totalDocAssociateProduct: ModalDirective;
  @Output() totalDocAssociateProducts = new EventEmitter();
  loanId: any;
  title: any;
  documents: any;
  loadSave: boolean = false;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private pricebookService: PricebookService,
    private router: Router, private dialogService: ConfirmationDialogService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    //this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
  }


  show(id, result) {
    
    this.title = "Associate Product";
    this.loanId = id;
    this.documents = result;
    // console.log("documents", this.documents);
    this.totalDocAssociateProduct.show();
  }

  close() {
    this.totalDocAssociateProduct.hide();
  }
  GoToApplications() {

    this.router.navigateByUrl("/loanApplication/Detail/" + this.loanId);
  }
  DeletePriceBook(PriceMapId, PriceBookID, ProductName) {
    const message = `Are you sure you want to delete Price Book product Document "${ProductName}"?`;
    this.dialogService.confirm('Delete Price Book ', message).subscribe(confirmed => {
      if (confirmed) {
        this.pricebookService.DeleteAssociateProduct(PriceMapId, PriceBookID).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.totalDocAssociateProduct.hide();
            this.toaster.success(result.responseMessage);
            this.totalDocAssociateProducts.emit();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }
}
