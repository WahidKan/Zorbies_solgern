import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { any } from 'underscore';
import { DateTimeToLocalForAddEditPipe, DateTimeToLocalPipe } from '../../../pipes/datetime.pipe';
import { CommonService } from '../../shared/common.service';
import { workOrderLineItemModel, WorkorderService } from '../workorderservice.service';

@Component({
  selector: 'app-work-order-line-item-popup',
  templateUrl: './work-order-line-item-popup.component.html',
  styleUrls: ['./work-order-line-item-popup.component.scss']
})
export class WorkOrderLineItemPopupComponent implements OnInit {
  @ViewChild('WorkOrderLineItemModal', { static: false }) modalWorkOrder: ModalDirective;
  @Output('refreshLineItemList') refreshLineItemList:EventEmitter<any>=new EventEmitter();  
  headTitle:any='New To-do Line Item';
  addLineItemForm:FormGroup;
  WoDisable:boolean=true;
  workOrderList:any;
  
  statusList:any;
  loadSave:boolean=false;
  PworkOrderId:any;
  createdBy:any;
  updatedBy:any;
  createdDate:any;
  updatedDate:any;
  LineItemModel: workOrderLineItemModel = new workOrderLineItemModel();
  Id:any=0;
  constructor(private fb:FormBuilder,
    private workOrderService: WorkorderService,
    private toaster: ToastrService,
    private commonService: CommonService,
    private dateTimeToLocal: DateTimeToLocalPipe
    ) { }

  ngOnInit() {
   this.CreateForm();
   this.GetAutoGenerateLineItemNo();
   this.getWorkOrderList();
   this.getWorkOrderStatusList();
  }
CreateForm()
{
  this.addLineItemForm=this.fb.group({
    lineItemNo:['',Validators.required],
    workOrder:[null,Validators.required],
    status:[null,Validators.required],
    completedDate:[''],
    subject:[''],
    description:[''],
    LitemId:[null],

  })
}
get lineItemNo() { return this.addLineItemForm.get('lineItemNo'); }
get workOrder() { return this.addLineItemForm.get('workOrder'); }
get status() { return this.addLineItemForm.get('status'); }
get completedDate() { return this.addLineItemForm.get('completedDate'); }
get subject() { return this.addLineItemForm.get('subject'); }
get description() { return this.addLineItemForm.get('description'); }
get LitemId() { return this.addLineItemForm.get('LitemId'); }



GetAutoGenerateLineItemNo() {
  ;
   this.workOrderService.GetAutoGenerateLineItemNo(this.PworkOrderId).subscribe((result: any) => {
     this.lineItemNo.setValue(result[0].LineItemNo);
   });
}
getWorkOrderList() {
  ;
   this.workOrderService.getWorkOrderList(this.PworkOrderId).subscribe((result: any) => {
     this.workOrderList = result;
   });
}

getWorkOrderStatusList() {
  
  this.workOrderService.getWorkOrderStatusList().subscribe((result: any) => {
    
    this.statusList = result;
    if(this.Id==0)
    {
    let Abc=result.find(x=>x.text=='New');

    this.status.setValue(Abc.value);
    }
   });
}


  close()
  {
    this.modalWorkOrder.hide();
  }
  Show(WorderId:any,id=0)
  {
    debugger;
    this.headTitle='Add To-do List Item';
    this.addLineItemForm.reset();
    this.PworkOrderId=WorderId;
    this.Id=0;
    this.GetAutoGenerateLineItemNo();
    this.getWorkOrderList();
    this.getWorkOrderStatusList();
    this.workOrder.setValue(WorderId);
    this.modalWorkOrder.show();
  }
  editWithRedirect(id: any,workOrderId=0) {
    
    this.PworkOrderId=workOrderId;
    this.edit(id);
  }
  edit(id: any) {
    debugger;
    this.headTitle='Edit To-do List Item';
    this.Id = id;
    this.workOrderService.getLineItemById(id).subscribe((result: any) => {

      debugger;
      // console.log(result);  
      this.createdBy=result.createdBy;
      this.updatedBy=result.updatedBy;
      this.createdDate=result.createdDate;
      this.updatedDate=result.updatedDate;

     // this.workOrder.setValue(result.workOrder.toString());
   //  const convertDateTime = new DateTimeToLocalForAddEditPipe();
      this.addLineItemForm.patchValue({
        LitemId:id,
        lineItemNo:result.lineItemNo,
        workOrder:result.workOrder !=null ? result.workOrder.toString():null,
      //  status:result.status !=null ? result.status.toString():null,
      status:result.status !=null ? this.statusList.find(x => x.text == result.status.toString()).value:null,        
        subject:result.subject,
       // completedDate:new Date(result.completedDate),      
       completedDate:result.completedDate != null ?  moment(result.completedDate).format('hh:mm A').toString():null ,
       
       //  completedDate:result.completedDate != null ?  moment(convertDateTime.transform(result.completedDate, '')).format('L').toString():null ,
        description: result.description,
      });

      this.getWorkOrderList();
      this.getWorkOrderStatusList();
      // this.headTitle='Edit Work Order Line Item';

           this.loadSave = false;
      this.modalWorkOrder.show();
    });
  }

  save()
   {
    ;
    this.loadSave=true;
    if(this.addLineItemForm.valid)
    {
      this.LineItemModel.lineItem_id=this.Id;
    this.LineItemModel.lineItemNo = this.addLineItemForm.value.lineItemNo;
    this.LineItemModel.workOrder = this.addLineItemForm.value.workOrder;
    this.LineItemModel.statusText = this.statusList.find(x => x.value == this.addLineItemForm.value.status).text;
    this.LineItemModel.status = this.addLineItemForm.value.status;

    let time = moment(new Date()).format('HH:mm');
    if(this.addLineItemForm.value.completedDate)
    {
       let timeDate = moment(this.addLineItemForm.value.completedDate).format('MM-DD-YYYY')+ ' ' + time;
       let DateSub = new Date(timeDate);
       this.LineItemModel.completedDate = DateSub;
     // this.LineItemModel.completedDate = new Date(this.addLineItemForm.value.completedDate);
    }
    //this.LineItemModel.completedDate = this.addLineItemForm.value.completedDate;
    this.LineItemModel.subject = this.addLineItemForm.value.subject;
    this.LineItemModel.description = this.addLineItemForm.value.description;
    // console.log(this.addLineItemForm);
    this.workOrderService.addeditWorkOrderLineItem(this.LineItemModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.addLineItemForm.reset();
        this.Id=0;
        this.LitemId.setValue(null);
        this.modalWorkOrder.hide();
        
        this.refreshLineItemList.emit();
        
      }
      else {
        this.toaster.error(result.responseMessage);
        this.loadSave = false;
      }
    },
    error => {
      this.loadSave = false;
    });

    }
    }
  
  
}


