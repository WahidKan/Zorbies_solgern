import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { BankService } from '../bank/bank.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';

import { TasklistService, Task } from './tasklist.service';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-addedittask',
  templateUrl: './addedittask.component.html',
  styleUrls: ['./addedittask.component.scss']
})
export class AddedittaskComponent implements OnInit {
  @ViewChild('clearDrop', { static: false }) clearDrop: NgSelectComponent;
  lstActiveStatus: any;
  taskmodel: Task = new Task();
  userId: string = null;
  dateTime = new Date();
  activeStatus: any;
  Heading = 'Add Task';
  breadcrum: string='Add Task'
  lstStatus: any;
  dt: Date;
  addForm: FormGroup;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  loadSave:boolean = false;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private bankService: BankService,
    private router: Router,
    private toaster: ToastrService,
    
    private route: ActivatedRoute, private taskListService: TasklistService) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
   
  }
  d: Date;
  ngOnInit() {
    this.addOrUpdatePermission = false;
    this.initForm();

    this.route.queryParams.subscribe(params => {
      // // console.log(params.id);
      this.userId = params.id;
      if (this.userId) {
        this.getTaskDetails(params.id);
      } else {
        this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
      }
    });
    this.taskListService.GetAssignedUsers().subscribe((result: any) => {

      this.lstActiveStatus = result;

    })
    this.activeStatus = '';
    this.commonService.getMasterItemsList("TaskStatus").subscribe((result: any) => {
      // // console.log("data", result);
      // // console.log("data", this.commonService.masters);
      this.lstStatus = this.commonService.masters;
    })
  }

  getTaskDetails(id) {
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.taskListService.GetTaskDetails(id + "").subscribe(s => {
      this.dt = new Date();
      var splitted = s.result.dueTime.split(":");
      this.dt.setHours(splitted[0]);
      this.dt.setMinutes(splitted[1]);
      // // console.log(this.dt);
      this.breadcrum = 'Edit User: ' + s.result.newTask;
      this.Heading = 'Edit Task';
      this.addForm.patchValue(
        {
          newTask: s.result.newTask,

          assignedUser: s.result.assignedUser,
          sendEmail: s.result.sendEmail,
          sendSms: s.result.sendSms,
          status: s.result.status,
          dueTime: this.dt,
          dueDate: new Date(s.result.dueDate)
        });
    });
  }

  addTask() {
    if (this.addForm.valid) {


      this.taskmodel.AssignedUser = this.addForm.value.assignedUser;
      this.taskmodel.DueDate = new Date(this.addForm.value.dueDate)
      this.taskmodel.DueTime = this.addForm.value.dueTime
      this.taskmodel.NewTask = this.addForm.value.newTask;
      this.taskmodel.SendEmail = this.addForm.value.sendEmail;
      this.taskmodel.SendSms = this.addForm.value.sendSms;
      this.taskmodel.Status = this.addForm.value.status;
      this.taskmodel.userId = '';

         this.dt = new Date(this.taskmodel.DueTime);

      this.taskmodel.DueTime = this.dt.getHours() + ":" + this.dt.getMinutes();
     
      this.taskmodel.taskAutoid = this.userId;
      this.taskListService.UploadTaskData(this.taskmodel).subscribe((result: any) => {
        this.toaster.success(`Task has been  successfully Submitted..`);

        this.router.navigateByUrl("/task");



      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
      
    }
    
      //this.taskmodel.addeditInsurance(this.insuranceModel).subscribe((result: any) => {
      //  if (result.statusCode == 200) {
      //    this.toaster.success(result.responseMessage);
      //    this.router.navigateByUrl("/insurance");
      //    setTimeout(() => { this.loadSave = false; }, 3000);
      //  }
      //  else {
      //    this.loadSave = false;
      //    this.toaster.error(result.responseMessage);
      //  }
      //}, error => {
      //  this.loadSave = false;
      //});
    //}
 

    //this.router.navigateByUrl("/task");
  }



  Cancel() {
    this.router.navigateByUrl("/task");
  }

 
  private initForm() {

    this.addForm = this.fb.group({
      newTask: ['', Validators.required],
      dueDate: ['', [Validators.required]],
      dueTime: [null, Validators.required],
      assignedUser: [null, [Validators.required]],
      sendEmail: [false],
      sendSms: [false],
      status: [null, Validators.required],
    });

   
      

    
  }


  get newTask() { return this.addForm.get('newTask'); }
  get dueDate() { return this.addForm.get('dueDate'); }
  get dueTime() { return this.addForm.get('dueTime'); }
  get assignedUser() { return this.addForm.get('assignedUser'); }
  get sendEmail() { return this.addForm.get('sendEmail'); }
  get sendSms() { return this.addForm.get('sendSms'); }
  get status() { return this.addForm.get('status'); }
 
  

  


}
