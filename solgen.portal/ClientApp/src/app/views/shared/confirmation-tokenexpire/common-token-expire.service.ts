import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonTokenExpireComponent } from './common-token-expire.component';


@Injectable({
  providedIn: "root"
})
export class CommonTokenExpireService {
  constructor(private modalService: BsModalService) { }
  close() {
    const config = {
      backdrop: false,
      ignoreBackdropClick: true
    };
   this.modalService.hide(1);

  }
  open(
    title: string,
    message: string,
    btnOkText: string = 'OK') {
    const config = {
      backdrop: false,
      ignoreBackdropClick: true
    };
    const modalRef = this.modalService.show(CommonTokenExpireComponent, config);

    modalRef.content.title = title;
    modalRef.content.message = message;

    const subscription = this.modalService.onHide.subscribe(() => {
    });

    this.modalService.onHidden.subscribe(() => {
      subscription.unsubscribe();
    });
  }
}
