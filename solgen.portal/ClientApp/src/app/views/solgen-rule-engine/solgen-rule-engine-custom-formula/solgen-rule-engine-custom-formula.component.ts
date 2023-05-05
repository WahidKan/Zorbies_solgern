import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { SolgenRuleEngineService } from '../solgen-rule-engine.service';

@Component({
  selector: 'app-solgen-rule-engine-custom-formula',
  templateUrl: './solgen-rule-engine-custom-formula.component.html',
  styleUrls: ['./solgen-rule-engine-custom-formula.component.scss']
})
export class SolgenRuleEngineCustomFormulaComponent implements OnInit {

  @ViewChild('formulaModal', { static: false }) formulaModal: ModalDirective;
  formulaForm: FormGroup;
  resultform : FormGroup;
  customFormulasList : any[] = [{text:'IF/ELSE',value:1}];
  customFormulaConditionsList : any[] = [{text:'Value',value:'1'},{text:'Compare',value:'2'}];
  subModuleId : any;
  customFieldsList : any;
  constructor(private commonService: CommonService,
    private ruleEngineService: SolgenRuleEngineService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  saveFormula(){
    this.ruleEngineService.buildTargetResultConditionRelatedFormulaDatabaseString(this.formulaForm.value,this.resultform);
    this.hide();
  }
   //fetch operator list on field change.
   onFieldChange(event,form, i) {
    if (typeof event !== 'undefined') {
      this.commonService.getOperatorsByDataTypeCode(event.actual_data_type).subscribe(response => {
        let temp = response as any;
        form.get('operators').setValue(temp.filter(m => m.OperatorType != "Arithmetic"));
      });
    }
  }
  // customFormula
  show(formgroup:FormGroup,subModuleId,customFieldsList) {
    this.subModuleId =  subModuleId;
    this.customFieldsList =  customFieldsList;
    this.resultform = formgroup;
    this.formulaForm = formgroup.controls.customFormula as FormGroup;
    // console.log('result form',this.resultform);
    // console.log('formula',this.formulaForm);

    this.formulaModal.show();
  }
  hide() {
    this.formulaModal.hide();
  }
}
