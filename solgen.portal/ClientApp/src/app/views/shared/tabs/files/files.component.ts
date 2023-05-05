import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonService } from '../../common.service';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { FilesuploadComponent } from './uploadfile/filesupload.component';
import { LightboxConfig, Lightbox } from 'ngx-lightbox';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';  
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  @Input('moduleName') moduleName: string;
  @Input('submoduleName') submoduleName: string;
  @Input('primaryKey') primaryKey: string;
  @Input('title') title: string;
  @Input('header') header: boolean = true;
  @ViewChild('uploadFileModal', { static: false }) uploadFileModal: FilesuploadComponent;//#previewModelPoup
  @ViewChild('previewModelPoup', { static: false }) previewModal: ModalDirective;

  lstDocumentCategory = [];
  ddlDocumentCategory;
  lstFiles: any = {
    pager: {},
    data: []
  }
  imageExtension: any='';
  pageNo = 1;
  pageSize = 4;
  previewImage: any = '';
  modalImages: any;
  sortDir = 'DESC';
  sortColumn = 'createdon';
  categoryId = '';
  dataFileUrl = 'https://stage.loanhomi.com/\\src\\assets\\Uploads\\Documents\\Proposal\ViewProposal_637588180580487435.pdf';
  filesCount = 0;
  siteurl = document.location.origin;
  loadSave = false;


  constructor(private commanService: CommonService, private dialogService: ConfirmationDialogService, private toaster: ToastrService, private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig, private http: HttpClient) { }

  ngOnInit() {
    this.getDocumentCategory();
    this.refresh();
  }

  getDocumentCategory() {
    this.commanService.GetDocumentCategory().subscribe(resp => {
      if (resp) {
        this.lstDocumentCategory = JSON.parse(resp);
      }
    });
  }

  GetDocumentType(evt) {
    this.pageNo = 1;
    if (evt) {
      this.categoryId = evt.value;
    }
    else {
      this.categoryId = '';
    }
    this.refresh();
  }

  resetDocumentDDL() {
    this.pageNo = 1;
    this.categoryId = '';
    this.refresh();
  }

  refresh() {
    this.loadSave = true;
    this.commanService.GetFileListForRelatedTab(this.primaryKey, this.categoryId, this.sortColumn, this.sortDir, this.pageNo, this.pageSize, this.moduleName, this.submoduleName).subscribe(result => {
      if (result) {
        this.lstFiles = result;
      
        this.filesCount = result.pager.totalItems;
        this.loadSave = false;
      }
    });
  }

  setPageNo($event) {
    this.pageNo = $event.page;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refresh();
  }

  deleteFiles(id) {
    const message = `Are you sure you want to delete File?`;
    this.dialogService.confirm('Delete File', message).subscribe(confirmed => {
      if (confirmed) {
        this.commanService.DeleteRecords(id, 'tblSolgenAttachment').subscribe((res: any) => {
          this.toaster.success(`File has been deleted successfully`);
          this.pageNo = 1;
          this.refresh();
        });
      }
    });
  }

  openUploadFilePopup() {
    this.uploadFileModal.show(this.primaryKey,this.moduleName,this.submoduleName);
  }

  uploadFileEvent() {
    this.refresh();
  }

  downloadFile(e: any, url: string) {
    e.preventDefault();
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = filename; // Set the file name.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      //delete a;
    };
    xhr.open('GET', url);
    xhr.send();
  };

  //downloadFile(docFile: string): Observable<Blob> {
  ////  window.location.href = docFile;
  //  //// console.log("file name: " + docFile);

  //  var xhr = new XMLHttpRequest();
  //  xhr.onreadystatechange = function () {
  //    if (xhr.readyState === 4 && xhr.status === 200) callback(xhr.responseText);
  //  };
  //  xhr.open("GET", docFile, true);


  //  var response=this.http.get('https://media.solgenone.com/download?name=' + docFile, {
  //    responseType: 'blob'
  //  });
  //  // console.log("response: " + response);
  //  return response;
  //}  


  open(imageList: any, index: number = 0): void {
    ;
    if (imageList.includes('https')) {

    }
    this.imageExtension = imageList.split('.').pop();
    this.previewImage = '';
    this.previewImage = imageList;
    this.previewModal.show();
  }
  closePreview() {
    this.previewModal.hide();
  }
  
}
