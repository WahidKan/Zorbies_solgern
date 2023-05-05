import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-solgen-queue-target',
  templateUrl: './solgen-queue-target.component.html',
  styleUrls: ['./solgen-queue-target.component.scss']
})
export class SolgenQueueTargetComponent implements OnInit {
  @Output() deleteTargetEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteTarget() {
    this.deleteTargetEvent.emit();
  }

}
