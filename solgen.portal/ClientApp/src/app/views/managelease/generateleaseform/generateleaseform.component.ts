import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ManageleaseService, LeaseForm, Leasedata } from '../managelease.service';
import { ContactService, Guarantor } from '../../contact/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EqualValidator } from '../../shared/custom-validation/equal-validator';
import { VendorService } from '../../vendor/vendor.service';
import html2canvas from 'html2canvas';  
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
@Component({
  selector: 'app-generateleaseform',
  templateUrl: './generateleaseform.component.html',
  styleUrls: ['./generateleaseform.component.scss']
})
export class GenerateleaseformComponent implements OnInit {
  leasedata:  Leasedata[]=[];
  @ViewChild('generateleaseModal', { static: false }) modaldoc: ModalDirective;
  @Output() leaveGenerateLeasePDF = new EventEmitter();
  active = false;
  contactId: any;
  vendorId: any;
  leaseId: any;
  vendorAddress: any;
  lstterms: any;
  lsttermstext: string;
  solgenAddress: any;
  solgenAddressValue: string;
  licenseFee: any;
  LesseeContact: any;
  lesseeAddress: string;
  lesseeName: any;
  insuranceRequired: any;
  insuranceRequiredval: string;
  leaseTermValue: any;
  isGenerateLeaseDoc = false;
  isSalesUser = false;
  LeaseType: any;
  lesseeGuarantorName1: string;
  lesseeGuarantorName2: string;
  showEquipmentDiv: boolean;
  lessorName: string;
  lesseeCity: string;
  lesseeCountry: string;
  lesseestate: any;
  lesseeCityStateZip: any;
  bankName: any;
  bankNamevalue: string = null;
  nextPaymentDueDate: any;
  insuranceRequiredValue: any;
  leaseLicenceFee: any;
  leaseLicenceFeeValue: string;
  solgenPrintName: any;
  solgenPrintNameValue: string;
  lesseestateValue: string;
  loadSave = false; pagedData: any = {
    pager: {},
    data: []
  };
  LeaseTemplateContent: any;
  leaseNumber: any;
  LeasePDFDocumentNameLink: any;

  constructor(private fb: FormBuilder, private leaseService: ManageleaseService, private commonService: CommonService
    ,private vendorService: VendorService, private contactService: ContactService,
    private router: Router, private route: ActivatedRoute, private toaster: ToastrService) {
    this.commonService.getStatesList().subscribe(res => {
      this.lesseestate = this.commonService.states;
    });

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == 'usertype03') {
        this.isSalesUser = true;
      }
    });
  }

  

  ngOnInit() {
    this.GetLeaseTemplateDetail()
  }
  onRightClick() {
    if (this.isSalesUser)
    return false;
  }
  disablecopypaste() {
    if (this.isSalesUser)
      return false;
  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67 && this.isSalesUser)
      return false;
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86 && this.isSalesUser)
      return false;
  }
  public generateLeasePDF() {
    this.loadSave = true;
    var data =  document.getElementById('contentToConvert');
        var form = new FormData()
    form.append('DocumentName', this.LeaseTemplateContent);
    form.append('LeaseId', this.leaseId);
    form.append('LeaseNumber', this.leaseNumber);
      
      this.leaseService.uploadLeaseDocumentPDF(form).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.loadSave = false;
          this.leaveGenerateLeasePDF.emit();
          
          this.modaldoc.hide();
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      },
        error => {
          this.loadSave = false;

        }
      )
  }

  
  close() {
    this.active = false;
    this.modaldoc.hide();
  }

  show(res, IsGenerateLeaseDoc) {
    this.LeasePDFDocumentNameLink = res;
    this.isGenerateLeaseDoc = IsGenerateLeaseDoc;
    this.modaldoc.show();
    this.active = true;
    this.GetLeaseTemplateDetail();
  }

  GetLeaseTemplateDetail() {
    let id = '';
    this.route.paramMap.subscribe(
      params => {
        id = params.get('leaseId');
        this.leaseId = id;
      });
    this.leaseService.GetLeaseTemplateDetail(this.leaseId).subscribe((res: any) => {
      if (res) {
        this.LeaseTemplateContent = res.leaseTemplateContent;
        this.leaseNumber = res.leaseNumber;
      }
    },
      (error: any) => {
        this.loadSave = false;
      });
  }
}
