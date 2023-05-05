import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WebmergeDelivery, WebmergeDeliveryInsureSignRecipient, LenderlistService } from '../lenderlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-routing-delivery',
  templateUrl: './routing-delivery.component.html',
  styleUrls: ['./routing-delivery.component.scss']
})
export class RoutingDeliveryComponent implements OnInit {

  webmergeObjectId: number;
  webmergeObjectType: string;
  bankId: any;
  active: any;
  loadSave: boolean = false;
  action: any; 
  webmergeDocumentFields: string[] = [];

  @ViewChild('delivery', { static: false }) delivery: ModalDirective;

  deliveryModel: WebmergeDelivery = new WebmergeDelivery("");

  constructor(private lenderService: LenderlistService, private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  show(webmergeObjectId: number, webmergeObjectType: string, bankId: any) {
    this.deliveryModel = new WebmergeDelivery("insuresign");
    this.webmergeObjectId = webmergeObjectId;
    this.webmergeObjectType = webmergeObjectType;
    this.getWebmergeDocumentsByBankId(bankId);

    this.loadSave = true;
    this.lenderService.getWebmergeDelivery(webmergeObjectId, webmergeObjectType).subscribe(d => {
      this.loadSave = false;
      if (d == null) {
        
      } else {
        this.deliveryModel = d;
      }
    }, err => {
      this.loadSave = false;
    });
    this.delivery.show();
  }

  getWebmergeDocumentsByBankId(bankId: any) {
    this.loadSave = true;
    this.lenderService.getWebmergeDocuments(bankId).subscribe(resp => {
      this.loadSave = false;
      resp.forEach(document => {
        this.getWebmergeDocumentFields(document.id);
      })
    }, err => {
      this.loadSave = false;
    });
  }

  getWebmergeDocumentFields(documentId: any) {
    this.loadSave = true;
    this.lenderService.getWebmergeDocumentFields(documentId).subscribe(documentFields => {
      this.loadSave = false;
      this.webmergeDocumentFields = this.webmergeDocumentFields.concat(documentFields.map(field => {
        return '{$' + field + '}';
      }));
    }, err => {
      this.loadSave = false;
    });
  }

  close() {
    this.active = false;
    this.deliveryModel = new WebmergeDelivery("");
    this.delivery.hide();
  }

  deleteRecipient(recipient) {
    this.deliveryModel.settings.recipients.forEach((r, index) => {
      if (r == recipient) {
        this.deliveryModel.settings.recipients.splice(index, 1);
      }
    });
  }

  onChange(ctrl: ElementRef, event) {
    if (event.target.value == "Add") {
      //do nothing
    } else {
      this.addNewRecipient();
      ctrl.nativeElement.value = "Add";
    }
  }

  addNewRecipient() {
    this.deliveryModel.settings.recipients.push(new WebmergeDeliveryInsureSignRecipient("signer"));
  }

  submit() {
    this.loadSave = true;
    this.lenderService.saveWebmergeDelivery(this.webmergeObjectId, this.webmergeObjectType, this.deliveryModel).subscribe(d => {
      this.loadSave = false;
      this.toastr.success("Delivery Route saved.");
    }, err => {
        this.loadSave = false;
        this.toastr.error("An error ocurred. Please try again later.");
    });
  }
}
