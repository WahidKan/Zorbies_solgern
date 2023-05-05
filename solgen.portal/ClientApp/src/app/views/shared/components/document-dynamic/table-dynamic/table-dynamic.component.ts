import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-table-dynamic',
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.scss']
})
export class TableDynamicComponent implements OnInit {

  @Input() public table: FormGroup;
  constructor(private tableService: TableService) {}
  ngOnInit() {
    this.tableService.onRowAdd.subscribe((id) => {
      this.onRowAdded(id);
    });
    this.tableService.onColumnAdd.subscribe((id) => {
      this.onColumnAdded(id);
    });
  }

  get rows() {
    return (this.table.get('tableRows') as FormArray).controls;
  }

  set setRow(value) {
    let arr = this.table.get('tableRows').patchValue(value);
    this.table.get('tableRows').setValue(arr);
  }

  get columns() {
    return (this.table.get('tableColumns') as FormArray).controls;
  }
  onColumnAdded(id) {
    if (id === this.table.get('id').value) {
      (this.table.get('tableColumns') as FormArray).push(new FormControl());
      (this.table.get('tableRows') as FormArray).controls.forEach((fg: FormGroup) =>
        fg.addControl(Object.keys(fg.controls).length.toString(), new FormControl())
      );
    }
  }

  onRowAdded(id) {
    if (id === this.table.get('id').value) {
      let fg = new FormGroup({});
      this.columns.forEach((x, i, arr) => {
        fg.addControl(i.toString(), new FormControl());
      });
      (this.table.get('tableRows') as FormArray).setControl(this.rows.length, fg);
    }
  }

}
