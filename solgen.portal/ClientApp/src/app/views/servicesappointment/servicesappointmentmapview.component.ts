import { Component, OnInit } from '@angular/core';
import { ServicesappointmentService, CheckboxData } from './servicesappointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-servicesappointmentmapview',
  templateUrl: './servicesappointmentmapview.component.html',
  providers: [ServicesappointmentService]
})
export class ServicesappointmentMapViewComponent implements OnInit {
  loadSave = false;
  moduleName = 'serviceappointment';
  submoduleName = 'serviceappointment';
  companyId: any;
  modulePermission: any[] = [];
  userName: any;
  userId: any;
  maplistFilter: any;
  listFilter: any;

  constructor(private servicesappointmentService: ServicesappointmentService, private route: ActivatedRoute, private router: Router,
    private toaster: ToastrService, private commonService: CommonService) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });

    
  }


  ngOnInit() {
     
  }

}
