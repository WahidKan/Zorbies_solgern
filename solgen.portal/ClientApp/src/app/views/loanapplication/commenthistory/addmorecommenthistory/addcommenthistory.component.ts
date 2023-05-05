import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { LoanapplicationserviceService, commentmodel, replyCommentmodel } from '../../loanapplicationservice.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-addcommenthistory',
  templateUrl: './addcommenthistory.component.html',
  styleUrls: ['./addcommenthistory.component.scss']
})
export class AddcommenthistoryComponent implements OnInit {
  @ViewChild('commentHistory', { static: false }) commentHistory: ModalDirective;
  @Output() commentEmit = new EventEmitter<string>();
  commentmodel: commentmodel = new commentmodel();
  replyCommentmodel: replyCommentmodel = new replyCommentmodel();
  commentForm: FormGroup;
  replyForm: FormGroup;    
  loanId: any;
  usersList: any;
  commentList: any;
  assigntoddl: boolean = true;
  isContactUser: boolean = false;
  isBankerUser: boolean = false;
  comId: any;
  showReplyTag: boolean = false;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private toaster: ToastrService,
    private loanapplicationservice: LoanapplicationserviceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      if (userdetail.userType == "usertypecontact") {
        this.isContactUser = true;
      }
      else {
        this.isContactUser = false;
      } 
      if (userdetail.userType == "usertypebanker") {
        this.isBankerUser = true;
      }
      else {
        this.isBankerUser = false;
      }
    });
    this.assigntoddl = true;
    this.initForm();
    this.replyinitForm();
  
    //this.getCommentType();
    this.route.paramMap.subscribe(params => {    
      const id = params.get('id');
      if (id) {
        this.loanId = id;

        this.getUsers();
      }
    });
  }
  replyshow(id: any) {
    this.comId = id;
    this.commentHistory.show();
 
  }
  getUsers() {
    if (this.isBankerUser == true) {
      this.commentForm.reset({ 'isPrivate': "3" });
    }
    this.loanapplicationservice.getAddCommentAssignToList(this.loanId, this.commentForm.value.isPrivate).subscribe((result: any) => {
      //// console.log("result123123123",result)
      this.usersList = result;

    })
  }
  getCommentType() {
    this.commonService.getMasterItemsList("CommentType").subscribe((res: any) => {
      this.commentList = this.commonService.masters;
    })
  }

  show() {
    
    this.showReplyTag = false;
    this.commentForm.reset({ isPrivate: "0" });
    this.getUsers();
    this.assigntoddl = true;
    this.commentHistory.show();
    
  }
 

  close() {
    this.commentForm.reset({ isPrivate: "0" });
    this.replyForm.reset;
    this.assigntoddl = true;
    this.commentHistory.hide();
  }

  addComment() {
    if (this.commentForm.valid) {
      this.commentmodel.commentId = this.commentForm.value.commentId;
      this.commentmodel.commentType = this.commentForm.value.commentType;
      this.commentmodel.comment = this.commentForm.value.comment;
      this.commentmodel.element = this.commentForm.value.element;

      if (this.commentForm.value.followUpDate != null) {
        let dtdate = new Date(this.commentForm.value.followUpDate);
        this.commentmodel.followUpDate = dtdate.toDateString();
      }
      else {
        this.commentmodel.followUpDate = this.commentForm.value.followUpDate;
      }
      //if (this.commentForm.value.isPrivate == 0) {
      //  this.commentmodel.assignTo = this.usersList.map(m => { return m.valueGuid; }).join();
      //} else {
      //  this.commentmodel.assignTo = this.commentForm.value.assignTo.join();
      //}
      this.commentmodel.isActive = this.commentForm.value.isActive;
      this.commentmodel.loanApplicationId = this.loanId;
      this.commentmodel.isPrivate = this.commentForm.value.isPrivate;
      this.commentmodel.assignTo = this.commentForm.value.assignTo.join();
      this.loanapplicationservice.addcomment(this.commentmodel).subscribe((result: any) => {
        if (result.statusCode === 200) {
       
          this.toaster.success(result.responseMessage);
          this.commentForm.reset();
          this.commentHistory.hide();
          this.commentEmit.emit('Done');
         
        }
        else {
          this.toaster.error(result.responseMessage);

        }
        this.commentEmit.emit('Done');
      }, error => {
      });
    }
    else {
      this.commonService.validateAllFormFields(this.commentForm);
    }
  }
  private(e) {
    this.assigntoddl = true;
    this.getUsers();
  }
  public(e) {

    this.assigntoddl = true;
    this.getUsers();
  }
  banker(e) {
    this.assigntoddl = true;
    this.getUsers();
  }

  private initForm() {
    this.commentForm = this.fb.group({
      commentId: [null, Validators.nullValidator],
      commentType: [null, Validators.nullValidator],
      comment: ['', Validators.nullValidator],
      element: ['', Validators.nullValidator],
      followUpDate: [null, Validators.nullValidator],
      assignTo: [null, Validators.nullValidator],
      isActive: [false],
      isPrivate: ['0'],
    })
  }
  

  get commentId() { return this.commentForm.get('commentId'); }
  get commentType() { return this.commentForm.get('commentType'); }
  get comment() { return this.commentForm.get('comment'); }
  get element() { return this.commentForm.get('element'); }
  get followUpDate() { return this.commentForm.get('followUpDate'); }
  get assignTo() { return this.commentForm.get('assignTo'); }
  get isActive() { return this.commentForm.get('isActive'); }
  get isPrivate() { return this.commentForm.get('isPrivate'); }


  replyCustComment() {

    if (this.replyForm.valid) {
      this.replyCommentmodel.replycommentId = this.comId;
      this.replyCommentmodel.replycomment = this.replyForm.value.replycomment;
      this.replyCommentmodel.replyloanApplicationId = this.loanId;

      this.loanapplicationservice.replyCustcomment(this.replyCommentmodel).subscribe((result: any) => {
        if (result.statusCode === 200) {

          this.toaster.success(result.responseMessage);
          this.replyForm.reset();
          this.commentHistory.hide();


          this.commentEmit.emit('Done');

        }
        else {
          this.toaster.error(result.responseMessage);

        }
        this.commentEmit.emit('Done');
      }, error => {
      });
    }
    else {
      this.commonService.validateAllFormFields(this.replyForm);
    }
  }


  private replyinitForm() {
    this.replyForm = this.fb.group({
      replycommentId: [null, Validators.nullValidator],
      replycomment: ['', Validators.nullValidator],
    })
  }
  get replycommentId() { return this.replyForm.get('replycommentId'); }
  get replycomment() { return this.commentForm.get('replycomment'); }

}
