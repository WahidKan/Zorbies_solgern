import { HttpClient } from '@angular/common/http';
import { Injectable, ɵsetCurrentInjector } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterValuesService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getModuleList() {
    return this.http.get(this.baseUri + `MasterValues/GetModuleList`);
  }
  getSelectTypeCustomFields(moduleId: number, subModuleId: number) {
    return this.http.get(this.baseUri + `MasterValues/GetSelectTypeCustomFields?moduleId=${moduleId}&subModuleId=${subModuleId}`);
  }
  getDDLValues(moduleId: number, subModuleId: number, fieldId: number) {
    return this.http.get(this.baseUri + `MasterValues/GetDDLValues?moduleId=${moduleId}&subModuleId=${subModuleId}&fieldId=${fieldId}`);
  }
  addEditForm(data: any) {
    return this.http.post(this.baseUri + `MasterValues/AddEditForm`, data);
  }
  checkIfUnique(index) {
    return (control: FormControl) => {
      //try get the form array
      //control.parent is the FormGroup, control.parent.parent is the formArray
      const formArray =
        control.parent && control.parent.parent
          ? (control.parent.parent as FormArray)
          : null;
      if (formArray && formArray.controls.length) {
        let dIndex= -1;
        const start = formArray.controls.length - 1;
        for (let i = start; i >= 0; i--) {
          for (let j = i; j >= 0; j--) {
            if (i != j) {

              if (
                (formArray.at(i) as FormGroup).get("value").value == (formArray.at(j) as FormGroup).get("value").value &&
                ((formArray.at(j) as FormGroup).get("value").value == control.value )
              ) {
                dIndex = dIndex < i ? i : dIndex ;
              }
            }
          }
        }
        if (dIndex > 0 && dIndex == index)
        return { isdublicated: true };
      }
    };
  }
  buildForm() {
    let form = this.fb.group({
      id: [0],
      moduleId: [null, Validators.required],
      subModuleId: [null, Validators.required],
      controlId: [null, Validators.required],
      mastersId: [null],
      fieldValues: this.fb.array([])
    });
    return form;
  }

  buildValuesForm(index: number, data = null) {
    let value = this.fb.group({
      masterId: [null],
      value: [null, [Validators.required, this.checkIfUnique(index)]],
      description: [null],
      choosenColor: [null],
      isSystemGenerated: [false],
      dislayOrder: [null]
    });
    if (data) {
      value.patchValue({
        masterId: data.masterId,
        value: data.value,
        description: data.description,
        choosenColor: data.choosenColor,
        isSystemGenerated: data.isSystemGenerated,
        dislayOrder: data.DisplayOrder
      });
    }
    return value;
  }
  patchValueForm(form: FormGroup, data) {
    form.patchValue({
      id: data.id,
      moduleId: data.moduleId,
      subModuleId: data.subModuleId,
      controlId: data.controlId
    });
    while ((form.get('fieldValues') as FormArray).length != 0) {
      (form.get('fieldValues') as FormArray).removeAt(0);
    }
    if (data.fieldValues) {
      data.fieldValues.forEach((value: any) => {
        (form.get('fieldValues') as FormArray).push(this.buildValuesForm(value));
      });
    }
  }



}

