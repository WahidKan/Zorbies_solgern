import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kanbanviewpopup',
  templateUrl: './kanbanviewpopup.component.html',
  styleUrls: ['./kanbanviewpopup.component.scss']
})
export class KanbanviewpopupComponent implements OnInit {

  @ViewChild('KanbanViewModal', { static: false }) KanbanViewPopup: ModalDirective
  @Output() kanbanView = new EventEmitter();

  isWorkFlowHidden = false;
  loadSave: boolean = false;
  isSelectedView: any;
  radioButton: any;
  constructor() { }

  ngOnInit() {
  }

  show(opportunityView: any) {
    this.isSelectedView = opportunityView;
    this.KanbanViewPopup.show();
  }

  close() {
    this.KanbanViewPopup.hide();
  }
  submit() {
    this.kanbanView.emit(this.radioButton);
    this.KanbanViewPopup.hide();
  }
}

