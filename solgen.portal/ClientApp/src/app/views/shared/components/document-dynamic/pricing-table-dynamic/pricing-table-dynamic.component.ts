import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pricing-table-dynamic',
  templateUrl: './pricing-table-dynamic.component.html',
  styleUrls: ['./pricing-table-dynamic.component.scss']
})
export class PricingTableDynamicComponent implements OnInit {

  @Input('pricingTable') public pricingTable: FormGroup;
  constructor() { }

  ngOnInit() {
    this.getRowPrice.valueChanges.subscribe(value=>{
      let total = 0;
      value.forEach(element => {
        if(element.price && element.quantity){
          total+=element.price * element.quantity;
        }
      });
      const group = (this.pricingTable.get('aggreateTable') as FormGroup);
      group.get('subTotal').setValue(total);
      this.applyDiscount();
      this.applyTax();
    });
  }
  getSubTotal(row, cols) {
    let total = 1;

    cols.forEach(col => {
      total *= row[col];
    });
    return total;
  }
  get getRowPrice() {
    let a = (this.pricingTable.get('pricingTableRows') as FormArray);
    return a;
  }

  get rows() {
    let a = (this.pricingTable.get('pricingTableRows') as FormArray).controls;
    return a;
  }

  get columns() {
    let a = (this.pricingTable.get('pricingTableColumns') as FormArray).controls;
    return a;
  }

  applyDiscount(){
    const group = (this.pricingTable.get('aggreateTable') as FormGroup);
    if(group.get('subTotal').value && group.get('discount').value){
      group.get('total').setValue(group.get('subTotal').value - group.get('discount').value);
    }
  }
  applyTax(){
    const group = (this.pricingTable.get('aggreateTable') as FormGroup);
    if(group.get('total').value && group.get('tax').value){
      group.get('total').setValue(group.get('total').value + group.get('tax').value);
    }
  }

}
