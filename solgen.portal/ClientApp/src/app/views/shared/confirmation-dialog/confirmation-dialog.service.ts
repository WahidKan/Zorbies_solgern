import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscriber } from 'rxjs/Subscriber';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';


@Injectable({
  providedIn: "root"
})
export class ConfirmationDialogService {
  constructor(private modalService: BsModalService) { }

  confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel', showCancel: boolean = true): Observable<boolean> {

    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };

    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      const modalRef = this.modalService.show(ConfirmationDialogComponent, config);

      modalRef.content.title = title;
      modalRef.content.message = message;
      modalRef.content.btnOkText = btnOkText;
      modalRef.content.btnCancelText = btnCancelText;
      modalRef.content.showCancel = showCancel;

      const subscription = this.modalService.onHide.subscribe(() => {
        return subscriber.next(modalRef.content.confirmed);
      });

      this.modalService.onHidden.subscribe(() => {
        subscription.unsubscribe();
      });
    });
  }


  confirm_yes_no(
    title: string,
    message: string,
    btnOkText: string = 'Yes',
    btnCancelText: string = 'No', showCancel: boolean = true, html: boolean = false): Observable<boolean> {
    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };

    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      const modalRef = this.modalService.show(ConfirmationDialogComponent, config);

      modalRef.content.title = title;
      modalRef.content.message = message;
      modalRef.content.btnOkText = btnOkText;
      modalRef.content.btnCancelText = btnCancelText;
      modalRef.content.showCancel = showCancel;
      modalRef.content.html = html;
      const subscription = this.modalService.onHide.subscribe(() => {
        return subscriber.next(modalRef.content.confirmed);
      });

      this.modalService.onHidden.subscribe(() => {
        subscription.unsubscribe();
      });
    });
  }

  

   existingEmail(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel', showCancel: boolean = true): Observable<boolean> {

    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };

    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      const modalRef = this.modalService.show(ConfirmationDialogComponent, config);

      modalRef.content.title = title;
      modalRef.content.message = message;
      modalRef.content.btnOkText = btnOkText;
      modalRef.content.btnCancelText = btnCancelText;
      modalRef.content.showCancel = showCancel;

      const subscription = this.modalService.onHide.subscribe(() => {
        return subscriber.next(modalRef.content.confirmed);
      });

      this.modalService.onHidden.subscribe(() => {
        subscription.unsubscribe();
      });
    });
  }


}
