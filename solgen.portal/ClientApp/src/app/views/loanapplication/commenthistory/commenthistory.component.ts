import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { LoanapplicationserviceService } from '../loanapplicationservice.service';
import { ActivatedRoute } from '@angular/router';
import { AddcommenthistoryComponent } from './addmorecommenthistory/addcommenthistory.component';
import { FollowUpPopupComponent } from './followuppopup/followuppopup.component';
import { AssigneduserlistComponent } from './assigneduserlist/assigneduserlist.component';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-commenthistory',
  templateUrl: './commenthistory.component.html',
  styleUrls: ['./commenthistory.component.scss']
})
export class CommenthistoryComponent implements OnInit {
  @ViewChild('showCommentPopup', { static: false }) showCommentPopupModel: ModalDirective;
  loadSave: boolean = false;

  CommentMessage: any;
  loading = false;
  sortDir = 'desc';
  sortColumn = 'CreatedOn';
  pagedData: any = {
    pager: {},
    data: []
  };
  lstPageSize: any
  pageSizeValue: number;
  loanId: any;
  isContact: boolean = false;
  isContactUser: boolean = false;
  @ViewChild('followuppopup', { static: false }) followuppopup: FollowUpPopupComponent;
  @ViewChild('commentmodel', { static: false }) commentmodel: AddcommenthistoryComponent;
  @ViewChild('AssignedUserListModelPopup', { static: false }) AssignedUserListModelPopup: AssigneduserlistComponent;
  constructor(private commonService: CommonService,
    private loanapplicationservice: LoanapplicationserviceService,
    private route: ActivatedRoute) {

    
  }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      //// console.log("userdetail", userdetail);
      if (userdetail.userType == "usertypecontact") {
        this.isContactUser = true;
      }
    });
    this.route.url.subscribe(s => {
      if (s[0].path == 'contactcommunications') {
        this.isContact = true;
      }
    })
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loanId = id;
    });
   
    this.pageSizeValue = 10;
    this.getPageSizes();

    this.getCommentHistoryList();
  }

  addPopUpShow() {
    this.commentmodel.show();
  }
  replyPopUp(id: any) {
    this.commentmodel.replyshow(id);
  }

  openFollowUpPopup(id: any) {
    this.followuppopup.show(this.loanId, id);

  }


  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  getCommentHistoryList(event=null) {
    
    this.loanapplicationservice.getCommentHistoryList(this.sortColumn, this.sortDir, 0, 10, this.loanId).subscribe((result: any) => {
      this.pagedData = this.loanapplicationservice.commentHistoryData;
     // // console.log('CommentHistoryListData', this.pagedData)
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onChange($event) {
    this.loading = true;
    this.loanapplicationservice.getCommentHistoryList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.commentHistoryData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.loanapplicationservice.getCommentHistoryList(this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.commentHistoryData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.loanapplicationservice.getCommentHistoryList(this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loanId).subscribe(response => {
      this.pagedData = this.loanapplicationservice.commentHistoryData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  openAssignedUserListPopup(obj: any) {
    this.AssignedUserListModelPopup.show(this.loanId, obj);
  }
  showComment(row) {
    //// console.log("dfsfsdfdsfsdf", row);
    this.CommentMessage = row.Comment;
    this.showCommentPopupModel.show();
  }

  closeshowCommentPopup() {
    this.showCommentPopupModel.hide();
  }
}
