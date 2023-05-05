import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { parse } from 'path';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { FileConfiguration, FileConfigurationsService, FileTypes, FileTypesGroups } from '../file-configurations.service';
import { TreeviewfileconfigurationComponent } from '../treeviewfileconfiguration/treeviewfileconfiguration.component';

@Component({
  selector: 'app-add-edit-file-configrations',
  templateUrl: './add-edit-file-configrations.component.html',
  styleUrls: ['./add-edit-file-configrations.component.scss']
})
export class AddEditFileConfigrationsComponent implements OnInit {
  @ViewChild('treeviewpopup', { static: false }) treeviewpopup: TreeviewfileconfigurationComponent;

  fileConfigurationList: FileConfiguration[] = [];
  fileTypesGroups: FileTypesGroups[] = []
  loadSave: boolean = false;
  max = 2048;
  contentHeader: object;
  constructor(
    private service: FileConfigurationsService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.GetFileExtensionList();
    this.GetFileConfigurationList();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Files Configuration',
       actionButton: true,
       iconCssClass: '',
       breadcrumb:
         [
           {
             name: 'Dashboard',
             isLink: true,
             link: '/dashboard'
           },
           {
             name: 'Files Configuration',
             isLink: false
           }
  
         ]
     };
   }
  GetFileExtensionList() {
    this.loadSave = true;
    this.service.getFileTypeExtensionList().subscribe((resp: any) => {
      this.loadSave = false;
      if (resp) {
        this.fileTypesGroups = resp;
      }
    }, err => {
      this.loadSave = false;
    });
  }
  GetFileConfigurationList() {
    this.loadSave = true;
    this.service.getFileConfigurationList().subscribe((resp: any) => {
      this.loadSave = false;
      if (resp) {
        resp.forEach(element => {
          if (element.FileTypesGroup) {
            element.FileTypesGroup = JSON.parse(element.FileTypesGroup);
            element.FileTypesGroup.forEach(e => {
              ;
              if (e.FileTypes) {
                e.FileTypes = Array.isArray(e.FileTypes) ? e.FileTypes : JSON.parse(e.FileTypes);
              }
            });
          }
        });
        this.fileConfigurationList = resp;
        this.fileConfigurationList.forEach((obj,index) =>{
          if(obj.Name == "CheckList" || obj.Name == "Company Setup" || obj.Name == "My Profile"){
            obj.FileTypesGroup = obj.FileTypesGroup.filter(x=>x.Name == "Image");
          }
        });
      }
    }, err => {
      this.loadSave = false;
    });
  }
  showFiletypesMapping(data: FileTypes[] = null,file : FileConfiguration) {
    ;
    if (data) {
      return data.filter(x => x.IsMapped).map(x => x.Name).join(' ,');
    }
  }
  submit() {
    this.loadSave = true;
    this.fileConfigurationList.forEach(root => {
      root.FileTypes = [];
      root.FileTypesGroup.forEach(group => {
        group.FileTypes.forEach(type => {
          if (type.IsMapped) {
            root.FileTypes.push(type.ExtensionId);
          }
        })
      })
      root.FileTypes = root.FileTypes.length > 0 ? root.FileTypes : null;
    });
    this.service.AddEditFileTypeExtensionConfiguration(this.fileConfigurationList).subscribe((resp: any) => {
      this.loadSave = false;
      if (resp) {
        this.toaster.success('Files configuration is saved successfully.');
      }
    }, err => {
      this.loadSave = false;
    });
  }
  keyPress(event: any) {
    const pattern = /[0-9 ]/;
    const pattern1 = /([1-9]|[1-9][0-9]{1,2}|1[0-9]{3}|20[0-3][0-9]|204[0-8])/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    let strNumber = event.srcElement.value + event.key;
    let nmbr = parseInt(strNumber);
    if (nmbr < 0 || nmbr > this.max) {
      event.preventDefault();
    }
  }
  AddEditFileTypes(event, group: FileTypesGroups[], index: number) {
    if (event) {
      this.treeviewpopup.show(group, index);
    }
  }
  refreshData(data: any) {
    let selectedTypes: number[] = data.data;
    let selectedIndex: number = data.index;
    this.fileConfigurationList[selectedIndex].FileTypesGroup.forEach(element => {
      element.FileTypes.forEach(e => {
        e.IsMapped = selectedTypes.find(l => l == e.ExtensionId) ? true : false;
      })
    });
  }
}
