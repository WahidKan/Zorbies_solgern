import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { JsonHubProtocol } from "@aspnet/signalr";
import { ModalDirective } from "ngx-bootstrap";
import { FlowBuilderService } from "../flow-builder.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  @ViewChild("createModal", { static: false }) createModal: ModalDirective;
  @Input() form: FormGroup;
  nodeId: string;
  PageSize = 10;
  currentpage = 0;
  filter: any;
  resourceList: any[] = []
  customFieldList: any = [];
  objectList: any[];
  moduleId: any;
  valueList: any[] = [];
  select: string = "";
  isAutoLunched:boolean=false;
  constructor(private flowBuilderService: FlowBuilderService) { }

  ngOnInit() { }

  saveCreateForm() {
;
    let cols = "";
    let value = "";
    this.select = "INSERT INTO " + this.customFieldList[0].table_name;
    if (this.createRecordForm.value != null) {
      this.createRecordForm.value.fieldMapping.forEach((element) => {
        if(element.customFieldId){
          cols += this.customFieldList.find((field) => field.form_field_id == element.customFieldId).PrimaryTableColumn + ",";
        }
        if(element.value){
          if(this.isAutoLunched)
          {
            value += element.value + ",";
          }
          else
          {
         value += this.valueList.find(r => r.id == element.value).formControlName + ",";
          }
        }
      });
      cols = cols.slice(0, -1);
      value = value.slice(0, -1);
    }
    let query = this.select + " (" + cols + ") values(" + value + ")";
    this.createRecordForm.get("query").setValue(query);
    // console.log(query);
    this.closeCreateModal();
  }
  get subModuleId() {
    return this.createRecordForm.get("subModuleId");
  }
  showCreateModal(nodeId: string) {
    ;
    this.getSubModuleList();
    this.nodeId = nodeId;
    ;
this.isAutoLunched=this.form.value.isAutolaunched;
    this.resourceList = [...this.flowBuilderService.ReturnData(this.form, nodeId)];
    if(this.isAutoLunched)
    {
      this.resourceList= this.resourceList.filter(x=>x.groupName=="Resources");
    }
    this.flowBuilderService.ReturnDecisionResources(this.form, this.resourceList);

    this.createModal.show();
    this.valueList = [...this.flowBuilderService.ReturnData(this.form, nodeId)];
    if (this.subModuleId) {
      this.customFieldList = [];
      this.moduleId = this.subModuleId.value;
      this.currentpage = 0;
      this.filter = "";
      this.getAutomationFlowCustomFields();
    }
    ////////////////
    ;
if(this.createRecordForm.get('id').value)
{
  if((this.createRecordForm.get('fieldMapping') as FormArray).length>0)
  {
    // .get('fieldMapping')['controls']
    let fieldMaping=(<FormArray>(this.createRecordForm.get('fieldMapping') as FormArray)).controls;
    
    fieldMaping.forEach(item=>{
let resourc=this.resourceList.find(x=>x.id==item.get('resourceId').value);
this.onResourceChange(resourc,item);
    })
  }
}
    ///////////////
  }
  get fieldMapping() {
    return this.createRecordForm.get("fieldMapping") as FormArray;
  }
  addField() {
    this.fieldMapping.push(this.flowBuilderService.BuildCreateRecordFieldMapping());
  }
  deleteField(index) {
    if (this.fieldMapping.length > 1) {
      this.fieldMapping.removeAt(index);
    } else {
      this.fieldMapping.reset();
    }
  }
  closeCreateModal() {
    this.createModal.hide();
  }
  get createRecordForm() {
    let node = (this.form.get("nodes") as FormArray).controls.find(f => f.get("nodeId").value == this.nodeId);
    return node != null ? node.get("component") : null;
  }

  onScrollToEndCustomFields(dataList: any) {
    this.fetchMore(dataList);
  }

  private fetchMore(dataList: any) {
    this.currentpage += 1;
    if (this.filter == undefined) {
      this.filter = "";
    }
    this.PageSize = dataList.length;
    this.getAutomationFlowCustomFields();
  }

  onClearCustomField(dataList: any): void {
    this.currentpage = 0;
    this.filter = "";
    this.getAutomationFlowCustomFields();
  }

  onKeyCustomField(e: any, dataList: any) {
    this.currentpage = 0;
    this.filter = e.target.value;
    this.getAutomationFlowCustomFields();
  }

  getAutomationFlowCustomFields() {
    this.flowBuilderService.GetAutomationFlowCustomFieldsWithoutPaging(this.moduleId).subscribe((res) => {
      if (res) {
        // console.log(res);
        this.customFieldList = res;
      }
    });
  }
  onResourceChange(event, control) {
    if (event) {
      ;
      // console.log("on resource change =>event", event);
      // console.log("on resource change =>control", control);
      control.get("isResource").setValue(event.isResource);
      control.get("subModuleId").setValue(event.subModuleId);
      if (!event.isResource) {
    //    this.filterOperators(event.dtCode, control);
      } else {
        ;
        this.flowBuilderService.GetAutomationFlowCustomFieldsWithoutPaging(event.subModuleId).subscribe((res: any) => {
          if (res) {
            control.get('customfieldsList').setValue(null);
            control.get('customfieldsList').setValue(res);
            this.valueList=res;
          }
        });
      }
    }
  }
  
  getSubModuleList() {
    this.flowBuilderService
      .getSubModulesListCreatedByCustomFields()
      .subscribe((response) => {
        this.objectList = response;
        // console.log(response);
      });
  }

  GetObjectId(event) {
    // console.log(event);
    this.customFieldList = [];
    this.moduleId = event.value;
    this.getAutomationFlowCustomFields();
  }
  get createName() { return this.createRecordForm.get('name'); } 
  get createDescription() { return this.createRecordForm.get('description'); } 
}
