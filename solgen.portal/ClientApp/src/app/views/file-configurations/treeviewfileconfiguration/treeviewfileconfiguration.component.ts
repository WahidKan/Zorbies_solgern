import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FileTypesGroups } from '../file-configurations.service';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
@Component({
  selector: 'app-treeviewfileconfiguration',
  templateUrl: './treeviewfileconfiguration.component.html',
  styleUrls: ['./treeviewfileconfiguration.component.scss']
})
export class TreeviewfileconfigurationComponent implements OnInit {
  @ViewChild('treeviewpopup', { static: false }) treeviewpopup: ModalDirective;
  @ViewChild('treeelement', { static: true })
  public tree: TreeViewComponent;
  @Output() refreshData: EventEmitter<any> = new EventEmitter<any>();
  data: FileTypesGroups[] = [];
  public checkedNodes: string[] = [];
  selectedIndex: number = 0;
  constructor() { }

  ngOnInit() {
    var test = this.tree;
    // console.log(test);
  }
  show(group: FileTypesGroups[], index: number) {
    group.forEach(x => x.expanded = true);
    this.data = group;
    this.selectedIndex = index;
    this.field = { dataSource: group, id: 'ExtensionId', text: 'Name', isChecked: 'IsMapped', child: 'FileTypes' };
    this.treeviewpopup.show();
  }
  submit() {
    var data = { data: this.tree.checkedNodes, index: this.selectedIndex };
    this.refreshData.emit(data);
    this.treeviewpopup.hide();
  }
  close() {
    this.treeviewpopup.hide();
  }
  public nodeChecked(args): void {

    // console.log("The checked node's id is: " + this.tree.selectedNodes);

  }
  // defined the array of data
  public hierarchicalData: Object[] = [];

  public field: Object = { dataSource: this.hierarchicalData, id: 'GroupName', text: 'GroupName', child: 'FileTypes' };


}
