import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-common-icon-picker',
    templateUrl: './common-icon-picker.component.html',
})
export class CommonIconPickerComponent implements OnInit {
    @Output() iconSelector :EventEmitter<any> = new EventEmitter()

    constructor(
      private toaster: ToastrService,) { }
  
    ngOnInit() 
    {
    }
    
    setIconClass(iconClass)
    {
      this.iconSelector.emit(iconClass);;
      this.toaster.success("Icon copied successfully.");
    }

}