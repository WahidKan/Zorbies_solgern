import { Component, Input, OnInit } from '@angular/core';
import { UserprofileService } from '../../userprofile/userProfile.service';
@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',

})
export class BreadcrumbComponent implements OnInit {
    @Input() data;
    html: any = "";
    isSuperAdmin:boolean=false;
    constructor(private userprofileService: UserprofileService){

    }

    ngOnInit(): void {
      this.userprofileService.getUserProfile().subscribe((result: any) => {
        if (result && result.userTypeName=="usertypesuperadmin") {
          this.isSuperAdmin = true;
        }
      })
    }


    // test(data){
    //     console.log("Header's Data: ",data)
    // }
}
