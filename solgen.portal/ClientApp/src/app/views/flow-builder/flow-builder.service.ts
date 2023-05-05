import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AstMemoryEfficientTransformer, ThrowStmt } from "@angular/compiler";
import {
  AnnotationConstraints,
  HtmlModel,
  NodeConstraints,
} from "@syncfusion/ej2-angular-diagrams";
import { retry } from "rxjs/operators";
import { GroupControls } from "../manageform/form.service";
import { any } from "underscore";

@Injectable({
  providedIn: "root",
})
export class FlowBuilderService {
  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  editPage: any;
  customFieldsList: any;
  cascadingFieldsList: any;
  nodeDataList: DataObject[] = [];
  nodeCollectionList: any[] = [];
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  GetAutomationFlowList(
    sortDir: string,
    sortColumn: string,
    page: number,
    pageSize: number,
    submoduleid: number,
    objectname: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUri}AutomationFlow/GetAutomationFlowList?sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&submoduleid=${submoduleid}&objectname=${objectname}`
    );
  }

  GetAutomationFlowSubFlowddl(
    id: number,
    searchtext: string,
    pageNo: number
  ): Observable<any> {
    return this.http.get(
      `${this.baseUri}AutomationFlow/GetAutomationFlowSubFlowddl?id=${id}&pageNo=${pageNo}&searchtext=${searchtext}`
    );
  }

  getSubModulesListCreatedByCustomFields(): Observable<any> {
    return this.http.get(
      `${this.baseUri}AutomationFlow/GetSubModuleListCreatedByCustomFields`
    );
  }

  AddEditAutomation(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUri}AutomationFlow/AddEditAutomationFlow`,
      data
    );
  }
  GetById(id): Observable<any> {
    return this.http.get(
      this.baseUri +
      `AutomationFlow/GetAutomationFlowById?automationFlowId=${id}`
    );
  }
  deleteAutomationFlow(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUri}AutomationFlow/DeleteAutomationFlow`,
      null,
      {
        params: { id },
      }
    );
  }
  deleteMultipleAutomationFlow(ids: string): Observable<any> {
    return this.http.post(
      `${this.baseUri}AutomationFlow/DeleteMultipleAutomationFlow`,
      null,
      {
        params: { ids },
      }
    );
  }

  queryExecutionAutomationFlow(
    sqlQuery: string,
    subModuleId: number,
    operation: string,
    refId: number
  ): Observable<any> {
    return this.http.post(
      `${this.baseUri}AutomationFlow/AutomationFlowQueryExecution?sqlQuery=${sqlQuery}&subModuleId=${subModuleId}&operation=${operation}&refId=${refId}`,
      null
    );

    // return this.http.post(`${this.baseUri}AutomationFlow/AutomationFlowQueryExecution`, null, {
    //   params: { sqlQuery },
    // });
  }

  getSubModules(moduleId: any) {
    return this.http.get(
      `${this.baseUri}SolgenRuleEngine/GetSolgenSubModules?moduleId=${moduleId}`
    );
  }

  getAutomationFlowCustomFields(
    filter: string,
    PageNo: number,
    subModuleId: number
  ) {
    if (filter == undefined) {
      filter = "";
    }
    return this.http.get(
      `${this.baseUri}AutomationFlow/GetAutomationFlowCustomFields?filter=${filter}&PageNo=${PageNo}&subModuleId=${subModuleId}`
    );
  }

  GetAutomationFlowCustomFieldsWithoutPaging(subModuleId: number) {
    return this.http.get(
      `${this.baseUri}AutomationFlow/GetAutomationFlowCustomFieldsWithoutPaging?subModuleId=${subModuleId}`
    );
  }

  VerifyDuplicateFlowName(name: string, id?: number) {
    return this.http.get(
      `${this.baseUri}AutomationFlow/VerifyDuplicateFlowName?name=${name}&id=${id}`
    );
  }

  GenerateUniqueKey(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  getCustomFieldsList(subModuleId) {
    this.GetAutomationFlowCustomFieldsWithoutPaging(subModuleId).subscribe(
      (data: any) => {
        return data;
      }
    );
  }
  GenerateGuid() {
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  FlowAutomationPatchValue(form: FormGroup, data: any) {
    form.patchValue({
      id: data.id,
      flowExist: data.flowexist,
      isAutolaunched:data.isAutolaunched,
      name: data.name,
      description: data.description,
      moduleId: data.moduleId,
      subModuleId: data.subModuleId,
      runCondition: data.runCondition,
      flowType: data.flowType,
      statusId: data.statusId,
    });
    while ((form.get("nodes") as FormArray).length != 0) {
      (form.get("nodes") as FormArray).removeAt(0);
    }

    if (data) {
      if (data.nodes) {
        data.nodes.forEach((node: any) => {
          (form.get("nodes") as FormArray).push(
            this.BuildNode(node, node.nodeType.toLowerCase())
          );
        });
      }
    }
    while ((form.get("connectors") as FormArray).length != 0) {
      (form.get("connectors") as FormArray).removeAt(0);
    }

    if (data) {
      if (data.connectors) {
        data.connectors.forEach((node: any) => {
          (form.get("connectors") as FormArray).push(this.BuildConnector(node));
        });
      }
    }
    if (data) {
      if (data.resources) {
        data.resources.forEach((node: any) => {
          (form.get("resources") as FormArray).push(this.BuildResource(node));
        });
      }
    }
  }
  FlowAutomationForm() {
    let form = this.fb.group({
      id: [null],
      flowExist: [null],
      name: [null, Validators.required],
      description: [null],
      moduleId: [null, Validators.required],
      subModuleId: [null, Validators.required],
      runCondition: [null],
      flowType: [null, Validators.required],
      statusId: [1001, Validators.required],
      isAutolaunched: [false],
      nodes: this.fb.array([
        this.BuildNode(
          {
            id: null,
            automationFlowId: null,
            nodeId: "start",
            nodeType: "start",
            offsetX: 600,
            offsetY: 30,
            statusId: 1001,
          },
          "start"
        ),
      ]),
      connectors: this.fb.array([this.BuildConnector()]),
      resources: this.fb.array([]),
    });
    return form;
  }
  BuildNodeComponent(nodeType, data = null) {

    switch (nodeType) {
      case "screen":
        return this.BuildScreenComponent(data);
      case "action":
        return null;
      case "subflow":
        return this.BuildSubFlowComponnent(data);
      case "assign":
        return this.BuildAssignmentComponent(data);
      case "decision":
        return this.BuildDecisionComponent(data);
      case "loop":
        return this.BuildLoopComponent(data);
      case "sort":
        return this.BuildCollectionSortComponent(data);
      case "create":
        return this.BuildCreateRecordComponent(data);
      case "update":
        return this.BuildUpdateRecordComponent(data);
      case "get":
        return this.BuildGetRecordComponent(data);
      case "delete":
        return this.BuildDeleteRecordComponent(data);
      case "rollback":
        return this.BuildRollBackComponent(data);
      case "filter":
        return this.BuildCollectionFilterComponent(data);
      case "pause":
        return this.BuildPauseComponent(data);
      default:
        return null;
    }
  }
  getFiledType(dt_code) {
    let field_type: any;

    switch (dt_code) {
      case "text":
      case "string":
      case "nchar":
        field_type = "textbox";
        break;

      case "textarea":
        field_type = "textarea";
        break;

      case "select":
        field_type = "dropdown";
        break;

      case "bit":
        field_type = "boolean";
        break;

      case "radio":
        field_type = "radio";
        break;

      case "checkbox":
        field_type = "checkbox";
        break;

      case "int":
      case "bigint":
      case "decimal":
        field_type = "number";
        break;

      case "decimal":
        field_type = "decimal";
        break;

      case "time":
      case "datetime":
        field_type = "datetime";
        break;

      case "date":
        field_type = "date";
        break;

      case "span":
        field_type = "span";
        break;

      default:
        field_type = "textbox";
        break;
    }
    return field_type;
  }
  BuildNode(data: any = null, type: string) {
    let node = this.fb.group({
      id: [null],
      automationFlowId: [null],
      nodeId: [null],
      nodeType: [null],
      offsetX: [null],
      offsetY: [null],
      statusId: [1001],
      component: this.BuildNodeComponent(type, data),
    });
    if (data) {
      node.patchValue({
        id: data.id,
        automationFlowId: data.automationFlowId,
        nodeId: data.nodeId,
        nodeType: data.nodeType,
        offsetX: data.offsetX,
        offsetY: data.offsetY,
        statusId: data.statusId,
      });
    }
    return node;
  }
  BuildConnector(data = null) {
    let connector = this.fb.group({
      id: [null],
      dbId: [null],
      automationFlowId: [null],
      sourceID: [null],
      targetID: [null],
      connectorType: [null],
      outcomeKey: [null],
      statusId: [1001],
      isBreakAwayCondition: [false],
      isNew: [true]
    });
    if (data) {
      connector.patchValue({
        id: data.id,
        dbId: data.dbId,
        automationFlowId: data.automationFlowId,
        sourceID: data.sourceID,
        targetID: data.targetID,
        connectorType: data.connectorType,
        outcomeKey: data.outcomeKey,
        statusId: data.statusId,
        isBreakAwayCondition: data.isBreakAwayCondition,
        isNew: data.isNew
      });
    }
    return connector;
  }
  BuildResource(data = null) {
    let resource = this.fb.group({
      id: [null],
      resourceId: [this.GenerateGuid()],
      name: [null],
      description: [null],
      automationFlowId: [null],
      statusId: [1001],
      resourceTypeId: [null],
      dataTypeId: [null],
      isAllowMultiple: [false],
      subModuleId: [null],
      tableName: [null],
    });
    if (data) {
      resource.patchValue({
        id: data.id,
        resourceId: data.resourceId,
        name: data.name,
        description: data.description,
        automationFlowId: data.automationFlowId,
        statusId: data.statusId,
        resourceTypeId: data.resourceTypeId,
        dataTypeId: data.dataTypeId,
        isAllowMultiple: data.isAllowMultiple,
        subModuleId: data.subModuleId,
        tableName: data.tableName,
      });
    }
    return resource;
  }
  BuildScreenComponent(data = null) {
    let screen = this.fb.group({
      id: [null],
      nodeId: [null],
      automationFlowId: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      isHeaderShown: [true],
      isFooterShown: [true],
      nextOrFinishButton: ["standardValue"],
      isNextOrFinishButtonShown: [true],
      isNextOrFinishButtonDefaultLabel: [true],
      nextOrFinishCustomLabel: [null],
      previousbutton: ["standardValue"],
      isPreviousbuttonShown: [true],
      isPreviousButtonDefaultLabel: [true],
      previousButtonCustomLabel: [null],
      pausebutton: ["standardValue"],
      isPauseButtonShown: [true],
      isPauseButtonDefaultLabel: [true],
      pauseButtonCutomLabel: [null],
      isStandardPauseConfirmationMassage: [true],
      pauseCustomMassage: [null],
      controls: this.fb.array([]),
      statusId: [1001],
      resourceId: [null],
      subModuleId: [null],
      displayFormat: ['four']
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        screen.patchValue({
          id: componnet.id,
          nodeId: componnet.nodeId,
          automationFlowId: componnet.automationFlowId,
          name: componnet.name,
          description: componnet.description,
          isHeaderShown: componnet.isHeaderShown,
          isFooterShown: componnet.isFooterShown,
          nextOrFinishButton: componnet.nextOrFinishButton,
          isNextOrFinishButtonShown: componnet.isNextOrFinishButtonShown,
          isNextOrFinishButtonDefaultLabel:
            componnet.isNextOrFinishButtonDefaultLabel,
          nextOrFinishCustomLabel: componnet.nextOrFinishCustomLabel,
          previousbutton: componnet.previousbutton,
          isPreviousbuttonShown: componnet.isPreviousbuttonShown,
          isPreviousButtonDefaultLabel: componnet.isPreviousButtonDefaultLabel,
          previousButtonCustomLabel: componnet.previousButtonCustomLabel,
          pausebutton: componnet.pausebutton,
          isPauseButtonShown: componnet.isPauseButtonShown,
          isPauseButtonDefaultLabel: componnet.isPauseButtonDefaultLabel,
          pauseButtonCutomLabel: componnet.pauseButtonCutomLabel,
          isStandardPauseConfirmationMassage:
            componnet.isStandardPauseConfirmationMassage,
          pauseCustomMassage: componnet.pauseCustomMassage,
          resourceId: componnet.resourceId,
          statusId: componnet.statusId,
          subModuleId: componnet.subModuleId,
          displayFormat: componnet.displayFormat,
        });
        while ((screen.get("controls") as FormArray).length != 0) {
          (screen.get("controls") as FormArray).removeAt(0);
        }
        if (componnet.controls) {
          componnet.controls.forEach((control: any) => {
            (screen.get("controls") as FormArray).push(
              this.BuildScreenControl(control)
            );
          });
        }
      }
    }
    return screen;
  }
  BuildScreenControlOnDrap(cntrl: GroupControls) {
    let control = this.fb.group({
      controlId: [null],
      screenId: [null],
      name: [
        cntrl.display_name ? cntrl.display_name : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [null, [Validators.maxLength(200)]],
      isRequired: [null],
      sectionColumnsType: [null],
      is_system_generated: [null],
      defaultValue: [null],
      dtCode: [cntrl.dt_code],
      formFieldId: [cntrl.form_field_id],
      fieldType: [this.getFiledType(cntrl.dt_code)],
      displayOrder: [null],
      isEditProg: [false],
      errorMassage: [null],
      allowMultipleChoices: [false],
      rangeMaximum: [null],
      rangeMinimum: [null],
      sliderSize: [null],
      helpText: [null],
      validateInput: [null],
      customFieldId: [cntrl.customFieldId],
      isCustomField: [cntrl.display_name ? true : false],
      primaryTableColumn: [cntrl.PrimaryTableColumn],
      isDisabled: [null],
      stepSize: [null],
      // isReadOnly: [cntrl.display_name ? true : false],
      isReadOnly: [false],
      urlValue: [null],
      acceptedFormats: [null],
      allowMultipleFiles: [null],
      pattern: [null],
      hoverText: [null],
      placeHolderText: [null],
      selectlistvalues: [null],
      decimalPlaces: [null],
      imageAltText: [null],
      horizontalAlignment: [null],
      imageHeight: [null],
      imageWidth: [null],
      imageCSS: [null],
      fieldCode: [cntrl.field_code],
      statusId: [1001],
      displayConditionOperator: [null],
      customDisplayCondition: [null],
      pickListOptions: this.fb.array([this.BuildScreenControlPicklistChoice()]),
      Conditions: this.fb.array([this.BuildScreenControlVisibilityCondition()]),
    });
    return control;
  }
  BuildScreenControl(data = null) {
    let control = this.fb.group({
      id: [null],
      screenId: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      formFieldId: [null],
      fieldType: [null],
      isEditProg: [null],
      isRequired: [null],
      sectionColumnsType: [null],
      is_system_generated: [null],
      defaultValue: [null],
      dtCode: [null],
      displayOrder: [null],
      errorMassage: [null],
      allowMultipleChoices: [false],
      rangeMaximum: [null],
      rangeMinimum: [null],
      sliderSize: [null],
      helpText: [null],
      isDisabled: [null],
      stepSize: [null],
      isReadOnly: [null],
      urlValue: [null],
      acceptedFormats: [null],
      allowMultipleFiles: [null],
      pattern: [null],
      hoverText: [null],
      placeHolderText: [null],
      decimalPlaces: [null],
      imageAltText: [null],
      horizontalAlignment: [null],
      imageHeight: [null],
      imageWidth: [null],
      fieldCode: [null],
      imageCSS: [null],
      statusId: [1001],
      displayConditionOperator: [null],
      customDisplayCondition: [null],
      validateInput: [null],
      customFieldId: [null],
      isCustomField: [null],
      primaryTableColumn: [null],
      selectlistvalues: [null],
      componentType: [null],
      pickListOptions: this.fb.array([this.BuildScreenControlPicklistChoice()]),
      Conditions: this.fb.array([this.BuildScreenControlVisibilityCondition()]),
    });
    if (data) {
      if (data.pickListOptions && typeof data.pickListOptions === "string") {
        data.pickListOptions = JSON.parse(data.pickListOptions);
      }

      control.patchValue({
        id: data.id,
        screenId: data.screenId,
        name: data.name,
        formFieldId: data.formFieldId,
        fieldCode: data.fieldCode,
        fieldType: data.fieldType,
        isEditProg: data.isEditProg,
        description: data.description,
        errorMessage: data.errorMessage,
        isRequired: data.isRequired,
        sectionColumnsType: data.sectionColumnsType,
        is_system_generated: data.is_system_generated,
        defaultValue: data.defaultValue,
        dtCode: data.dtCode,
        displayOrder: data.displayOrder,
        errorMassage: data.errorMassage,
        allowMultipleChoices: data.allowMultipleChoices,
        rangeMaximum: data.rangeMaximum,
        rangeMinimum: data.rangeMinimum,
        sliderSize: data.sliderSize,
        helpText: data.helpText,
        validateInput: data.validateInput,
        customFieldId: data.customFieldId,
        isCustomField: data.isCustomField,
        primaryTableColumn: data.primaryTableColumn,
        selectlistvalues: data.selectlistvalues,
        isDisabled: data.isDisabled,
        stepSize: data.stepSize,
        //isReadOnly: (data.isReadOnly == null && data.isCustomField == false) ? false : data.isReadOnly,
        isReadOnly: data.isReadOnly,

        urlValue: data.urlValue,
        acceptedFormats: data.acceptedFormats,
        allowMultipleFiles: data.allowMultipleFiles,
        pattern: data.pattern,
        hoverText: data.hoverText,
        placeHolderText: data.placeHolderText,
        // pickListOptions: data.pickListOptions,
        decimalPlaces: data.decimalPlaces,
        imageAltText: data.imageAltText,
        horizontalAlignment: data.horizontalAlignment,
        imageHeight: data.imageHeight,
        imageWidth: data.imageWidth,
        imageCSS: data.imageCSS,
        statusId: data.statusId,
        displayConditionOperator: data.displayConditionOperator,
        customDisplayCondition: Number(data.customDisplayCondition),
      });
      if(data.isRequired)
      {
         control.get('validateInput').setValidators([Validators.required]);
         control.get('validateInput').updateValueAndValidity();

       }
       else {
         control.get('validateInput').clearValidators();
         control.get('validateInput').updateValueAndValidity();
       }



      while ((control.get("pickListOptions") as FormArray).length != 0) {
        (control.get("pickListOptions") as FormArray).removeAt(0);
      }
      if (data.pickListOptions && typeof data.pickListOptions === "string") {
        data.pickListOptions = JSON.parse(data.pickListOptions);
      }
      if (data.pickListOptions) {
        data.pickListOptions.forEach((option: any) => {
          // console.log("inside patch pickList options", option);
          (control.get("pickListOptions") as FormArray).push(
            this.BuildScreenControlPicklistChoice(option)
          );
        });
      }
      while ((control.get("Conditions") as FormArray).length != 0) {
        (control.get("Conditions") as FormArray).removeAt(0);
      }
      if (data.Conditions) {
        data.Conditions.forEach((condition: any) => {
          // console.log("inside patch condition", condition);
          (control.get("Conditions") as FormArray).push(
            this.BuildScreenControlVisibilityCondition(condition)
          );
        });
      }
    }
    return control;
  }
  BuildScreenControlVisibilityCondition(data = null) {
    if (data != null && data.operator) {
      data.operator = Number(data.operator);
    }
    let condition = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      screenId: [null],
      isCustomField: [null],
      controlPropertyId: [null],
      isResource: [false],
      customfieldsList:[null],
      customFieldId:[null],
      resource: [null],
      field: [null],
      operator: [null],
      value: [null],
    });
    if (data) {
      condition.patchValue({
        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        screenId: data.screenId,
        isResource: data.isResource,
        customFieldId:data.customFieldId,
        isCustomField: data.isCustomField,
        controlPropertyId: data.controlPropertyId,
        resource: data.resource,
        field: data.field,
        operator: data.operator,
        value: data.value,
      });

      if (data.isResource) {
        let opp = decisonOperatorList.find(x => x.value == Number(data.operator));
        if (opp.text == 'Is Null' || opp.text == 'Is Not Null') {
          condition.get('value').disable();
        }
      }

      this.GetAutomationFlowCustomFieldsWithoutPaging(data.subModuleId).subscribe((data: any) => {
        condition.get('customfieldsList').setValue(data);
      });
    }
    return condition;
  }
  BuildScreenControlPicklistChoice(data = null) {
    let listChoice = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      screenId: [null],
      isCustomField: [null],
      controlPropertyId: [null],
      resource: [null],
      field: [null],
      value: [null],
    });
    if (data) {
      listChoice.patchValue({
        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        screenId: data.screenId,
        isCustomField: data.isCustomField,
        controlPropertyId: data.controlPropertyId,
        resource: data.resource,
        field: data.field,
        value: data.value,
      });
    }
    return listChoice;
  }
  BuildCreateRecordComponent(data = null) {
    let createRecord = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      nodeId: [null],
      recordToCreate: [null],
      setRecordValue: [null],
      moduleId: [null],
      subModuleId: [null],
      objectId: [null],
      recordValues: [null],
      recordCollection: [null],
      fieldMapping: this.fb.array([this.BuildCreateRecordFieldMapping()]),
      statusId: [1001],
      query: [null],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        createRecord.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          nodeId: componnet.nodeId,
          recordToCreate: componnet.recordToCreate,
          setRecordValue: componnet.setRecordValue,
          moduleId: componnet.moduleId,
          subModuleId: componnet.subModuleId,
          objectId: componnet.objectId,
          recordValues: componnet.recordValues,
          recordCollection: componnet.recordCollection,
          query: componnet.query,
        });
        while ((createRecord.get("fieldMapping") as FormArray).length != 0) {
          (createRecord.get("fieldMapping") as FormArray).removeAt(0);
        }
        if (componnet.fieldMapping) {
          componnet.fieldMapping.forEach((fieldMapping: any) => {
            (createRecord.get("fieldMapping") as FormArray).push(
              this.BuildCreateRecordFieldMapping(fieldMapping)
            );
          });
        }
      }
    }
    return createRecord;
  }
  BuildCreateRecordFieldMapping(data = null) {
    let map = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      createRecordId: [null],
      customFieldId: [null],
      isResource:[null],
      customfieldsList:[null],
      resourceId:[null],
      value: [null],
      statusId: [1001],
    });
    if (data) {
     ;
      map.patchValue({

        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        createRecordId: data.createRecordId,
        isResource:data.isResource,
        resourceId:data.resourceId,
        customFieldId: Number(data.customFieldId),
        value: data.value,
      });
      this.GetAutomationFlowCustomFieldsWithoutPaging(data.subModuleId).subscribe((data: any) => {
        map.get('customfieldsList').setValue(data);
      });
    }
    return map;
  }
  BuildUpdateRecordComponent(data = null) {
    let updateRecord = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      nodeId: [null],
      moduleId: [null],
      subModuleId: [null],
      description: [null, [Validators.maxLength(200)]],
      objectId: [null],
      collectionId: [null],
      filterOperator: [2],
      customFilterOperator: [null],
      findRecordCondition: [null],
      statusId: [1001],
      query: [null],
      filterConditions: this.fb.array([this.BuildUpdateRecordFilter()]),
      fieldMapping: this.fb.array([this.BuildUpdateRecordFieldMapping()]),
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        updateRecord.patchValue({
          id: componnet.id,
          name: componnet.name,
          nodeId: componnet.nodeId,
          moduleId: componnet.moduleId,
          subModuleId: componnet.subModuleId,
          description: componnet.description,
          objectId: componnet.objectId,
          collectionId: componnet.collectionId,
          filterOperator: Number(componnet.filterOperator),
          customFilterOperator: componnet.customFilterOperator,
          findRecordCondition: componnet.findRecordCondition,
          query: componnet.query,
        });
        while (
          (updateRecord.get("filterConditions") as FormArray).length != 0
        ) {
          (updateRecord.get("filterConditions") as FormArray).removeAt(0);
        }
        if (componnet.filterConditions) {
          componnet.filterConditions.forEach((filterConditions: any) => {
            (updateRecord.get("filterConditions") as FormArray).push(
              this.BuildUpdateRecordFilter(filterConditions)
            );
          });
        }
        while ((updateRecord.get("fieldMapping") as FormArray).length != 0) {
          (updateRecord.get("fieldMapping") as FormArray).removeAt(0);
        }
        if (componnet.fieldMapping) {
          componnet.fieldMapping.forEach((fieldMapping: any) => {
            (updateRecord.get("fieldMapping") as FormArray).push(
              this.BuildUpdateRecordFieldMapping(fieldMapping)
            );
          });
        }
      }
    }
    return updateRecord;
  }
  BuildUpdateRecordFilter(data = null) {
    let filterCondition = this.fb.group({
      id: [null],
      updateRecordId: [null],
      moduleId: [null],
      subModuleId: [null],
      screenId: [null],
      isCustomField: [null],
      isPrimaryField: [null],
      field: [null],
      operator: [null],
      value: [null],
      isResource:[null],
      resourceId:[null],
      statusId: [1001],
    });
    if (data) {
      ;
      filterCondition.patchValue({
        id: data.id,
        updateRecordId: data.updateRecordId,
        moduleId: data.moduleId,
        subModuleId: Number(data.subModuleId),
        screenId: data.screenId,
        isCustomField: data.isCustomField,
        field: data.field,
        isPrimaryField: data.isPrimaryField,
        operator: Number(data.operator),
        value: data.value,
        isResource:data.isResource,
        resourceId:data.resourceId
      });
    }
    return filterCondition;
  }
  BuildUpdateRecordFieldMapping(data = null) {
    let map = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      updateRecordId: [null],
      customFieldId: [null],
      value: [null],
      isResource:[null],
      customfieldsList:[null],
      resourceId:[null],
      statusId: [1001]
    });
    if (data) {
      ;
      map.patchValue({
        id: data.id,
        updateRecordId: data.updateRecordId,
        moduleId: data.moduleId,
        subModuleId: Number(data.subModuleId),
        customFieldId: Number(data.customFieldId),
        isResource:data.isResource,
        resourceId:data.resourceId,
        value: data.value,
      });
      this.GetAutomationFlowCustomFieldsWithoutPaging(data.subModuleId).subscribe((data: any) => {
        map.get('customfieldsList').setValue(data);
      });
    }
    return map;
  }
  BuildGetRecordComponent(data = null) {
    let getRecord = this.fb.group({
      id: [null],
      nodeId: [null],
      objectId: [null],
      moduleId: [null],
      subModuleId: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      sortCondition: [3],
      sortBy: [null],
      howManyToStore: ["OnlyTheFirstRecord"],
      howToMap: ["Automaticallystore"],
      filterCondition: [1],
      customFilterCondition: [null],
      query: [null],
      statusId: [1001],
      recordVariableId: [null],
      filterConditions: this.fb.array([this.BuildGetRecordFilterConditions()]),
      choosenFields: this.fb.array([this.BuildGetRecordSelectFieldsToStore()]),
      variableMapping: this.fb.array([
        this.BuildGetRecordSelectFieldsToStoreToVariables(),
      ]),
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        getRecord.patchValue({
          id: componnet.id,
          nodeId: componnet.nodeId,
          subModuleId: componnet.subModuleId,
          name: componnet.name,
          description: componnet.description,
          sortCondition: componnet.sortCondition
            ? Number(componnet.sortCondition)
            : null,
          sortBy: componnet.sortBy ? Number(componnet.sortBy) : null,
          howManyToStore: componnet.howManyToStore,
          howToMap: componnet.howToMap,
          statusId: componnet.statusId,
          query: componnet.query,
          recordVariableId: componnet.recordVariableId,
          filterCondition: componnet.filterCondition
            ? Number(componnet.filterCondition)
            : null,
          customFilterCondition: componnet.customFilterCondition,
        });
        while ((getRecord.get("filterConditions") as FormArray).length != 0) {
          (getRecord.get("filterConditions") as FormArray).removeAt(0);
        }
        if (componnet.filterConditions) {
          componnet.filterConditions.forEach((filterConditions: any) => {
            (getRecord.get("filterConditions") as FormArray).push(
              this.BuildGetRecordFilterConditions(filterConditions)
            );
          });
        }

        while ((getRecord.get("choosenFields") as FormArray).length != 0) {
          (getRecord.get("choosenFields") as FormArray).removeAt(0);
        }
        if (componnet.choosenFields) {
          componnet.choosenFields.forEach((choosenField: any) => {
            (getRecord.get("choosenFields") as FormArray).push(
              this.BuildGetRecordSelectFieldsToStore(choosenField)
            );
          });
        }
      }
    }
    return getRecord;
  }
  BuildGetRecordFilterConditions(data = null) {
    let filter = this.fb.group({
      id: [null],
      updateRecordId: [null],
      moduleId: [null],
      subModuleId: [null],
      screenId: [null],
      isCustomField: [null],
      isPrimaryField: [null],
      isResource: [false],
      resourceId:[null],
      customfieldsList:[],
      field: [null],
      variable: [null],
      operator: [null],
      value: [null],
      statusId: [1001],
    });
    if (data) {
      filter.patchValue({
        id: data.id,
        updateRecordId: data.updateRecordId,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        screenId: data.screenId,
        isPrimaryField: data.isPrimaryField,
        isCustomField: data.isCustomField,
        isResource:data.isResource,
        resourceId:data.resourceId,
        field: data.field ? data.field : "",
        variable: data.variable,
        operator: Number(data.operator),
        value: data.value,
      });
      this.GetAutomationFlowCustomFieldsWithoutPaging(data.subModuleId).subscribe((data: any) => {
        filter.get('customfieldsList').setValue(data);
      });
    }
    return filter;
  }
  BuildGetRecordSelectFieldsToStore(data = null) {
    let store = this.fb.group({
      id: [null],
      customfieldName: [null],
      primaryTableColumn: [null],
      customfieldDtCode: [null],
      updateRecordId: [null],
      customFieldId: [null],
      isSetNull: [null],
      statusId: [1001],
    });
    if (data) {
      store.patchValue({
        id: data.id,
        primaryTableColumn: data.primaryTableColumn,
        updateRecordId: data.updateRecordId,
        customfieldName: data.customfieldName,
        customfieldDtCode: data.customfieldDtCode,
        customFieldId: Number(data.customFieldId),
        statusId: data.statusId,
      });
    }
    return store;
  }
  BuildGetRecordSelectFieldsToStoreToVariables() {
    let store = this.fb.group({
      id: [null],
      updateRecordId: [null],
      customFieldId: [null],
      variableId: [null],
      isSetNull: [null],
      statusId: [1001],
    });
    return store;
  }
  BuildDeleteRecordComponent(data = null) {
    let deleteRecord = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      nodeId: [null],
      moduleId: [null],
      subModuleId: [null],
      description: [null, [Validators.maxLength(200)]],
      howToFind: ['Specify_conditions'],
      collection: [null],
      objectId: [null],
      recordId: [null],
      findCondition: [1],
      customFindCondition: [null],
      query: [null],
      filterConditions: this.fb.array([this.BuildDeleteRecordFindConditions()]),
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        deleteRecord.patchValue({
          id: componnet.id,
          name: componnet.name,
          nodeId: componnet.nodeId,
          moduleId: componnet.moduleId,
          subModuleId: componnet.subModuleId,
          description: componnet.description,
          howToFind: componnet.howToFind,
          collection: componnet.collection,
          objectId: componnet.objectId,
          recordId: componnet.recordId,
          query: componnet.query,
          findCondition: Number(componnet.findCondition),
          customFindCondition: componnet.customFindCondition,
          statusId: componnet.statusId,
        });
        while (
          (deleteRecord.get("filterConditions") as FormArray).length != 0
        ) {
          (deleteRecord.get("filterConditions") as FormArray).removeAt(0);
        }
        if (componnet.filterConditions) {
          componnet.filterConditions.forEach((findCondition: any) => {
            (deleteRecord.get("filterConditions") as FormArray).push(
              this.BuildDeleteRecordFindConditions(findCondition)
            );
          });
        }
      }
    }
    return deleteRecord;
  }
  BuildDeleteRecordFindConditions(data = null) {
    let find = this.fb.group({
      id: [null],
      deleteRecordId: [null],
      screenId: [null],
      isCustomField: [null],
      isPrimaryField: [null],
      field: [null],
      operator: [null],
      value: [null],
    });
    if (data) {
      find.patchValue({
        id: data.id,
        deleteRecordId: data.deleteRecordId,
        screenId: data.screenId,
        isCustomField: data.isCustomField,
        field: Number(data.field),
        isPrimaryField: data.isPrimaryField,
        operator: Number(data.operator),
        value: data.value,
      });
    }
    return find;
  }
  BuildRollBackComponent(data = null) {
    let rollBack = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      nodeId: [null],
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        rollBack.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          nodeId: componnet.nodeId,
        });
      }
    }
    return rollBack;
  }
  BuildSubFlowComponnent(data = null) {
    let subflow = this.fb.group({
      id: [null],
      nodeId: [null],
      name: [null,[Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      flowId: [null],
      statusId: [1001],
    });
    if (data) {
      ;
      if (data.component) {
        const componnet = JSON.parse(data.component);
        subflow.patchValue({
          id: componnet.id,
          nodeId: componnet.nodeId,
          name: componnet.name,
          description: componnet.description,
          flowId: componnet.flowId,
          statusId: componnet.statusId,
        });
      }
    }
    return subflow;
  }
  BuildAssignmentComponent(data = null) {
    let assignment = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      variableAssignments: this.fb.array([this.BuildAssignmentMapping()]),
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        assignment.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          statusId: componnet.statusId,
        });
        while (
          (assignment.get("variableAssignments") as FormArray).length != 0
        ) {
          (assignment.get("variableAssignments") as FormArray).removeAt(0);
        }
        if (componnet.variableAssignments) {
          componnet.variableAssignments.forEach((VA: any) => {
            (assignment.get("variableAssignments") as FormArray).push(
              this.BuildAssignmentMapping(VA)
            );
          });
        }
      }
    }
    return assignment;
  }
  BuildAssignmentMapping(data = null) {
    let map = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      isCustomField: [null],
      customFieldId: [null],
      isResource: [false],
      screenId: [null],
      variable: [null],
      customfieldsList: [null],
      operator: [null],
      value: [null],
      statusId: [1001],
      assignmentId: [null],
    });
    if (data) {
      map.patchValue({
        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        isCustomField: data.isCustomField,
        customFieldId: data.customFieldId,
        isResource: data.isResource,
        resourceId: data.resourceId,
        screenId: data.screenId,
        variable: data.variable,
        operator: data.operator,
        value: data.value,
        statusId: data.statusId,
        assignmentId: data.assignmentId,
      });
      this.GetAutomationFlowCustomFieldsWithoutPaging(data.subModuleId).subscribe((data: any) => {
        map.get('customfieldsList').setValue(data);
      });
    }
    return map;
  }
  BuildLoopComponent(data = null) {
    let loop = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      nodeId: [null],
      description: [null, [Validators.maxLength(200)]],
      loopCollection: [null],
      direction: [null],
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        loop.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          nodeId: componnet.nodeId,
          loopCollection: componnet.loopCollection,
          direction: componnet.direction,
          statusId: componnet.statusId,
        });
      }
    }
    return loop;
  }
  BuildCollectionSortComponent(data = null) {
    let sort = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      nodeId: [null],
      description: [null, [Validators.maxLength(200)]],
      howManyToKeep: ['Keep_all_items'],
      keepCount: [null],
      collectionVariable: [null],
      sortConditions: this.fb.array([this.BuildCollectionSortConditions()]),
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const component = JSON.parse(data.component);
        sort.patchValue({
          id: component.id,
          name: component.name,
          description: component.description,
          nodeId: component.nodeId,
          howManyToKeep: component.howManyToKeep,
          keepCount: component.keepCount,
          collectionVariable: component.collectionVariable,
        });
        while ((sort.get("sortConditions") as FormArray).length != 0) {
          (sort.get("sortConditions") as FormArray).removeAt(0);
        }
        if (component.sortConditions) {
          component.sortConditions.forEach((sortCondition: any) => {
            (sort.get('sortConditions') as FormArray).push(this.BuildCollectionSortConditions(sortCondition));
          });
        }
      }
    }

    return sort;
  }
  BuildCollectionSortConditions(data = null) {
    let condition = this.fb.group({
      id: [null],
      collectionSortId: [null],
      putNullOrEmptyString: [false],
      sortBy: [null],
      sortOrder: [1],
      statusId: [1001],
    });
    if (data) {
      condition.patchValue({
        id: data.id,
        collectionSortId: data.collectionSortId,
        putNullOrEmptyString: data.putNullOrEmptyString,
        sortBy: data.sortBy ? data.sortBy : "",
        sortOrder: data.sortOrder ? Number(data.sortOrder) : null,
      });
    }

    return condition;
  }
  BuildCollectionFilterComponent(data = null) {
    let filter = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      nodeId: [null],
      description: [null, [Validators.maxLength(200)]],
      collection: [null],
      filterCollectionConditions: this.fb.array([
        this.BuildCollectionFilterConditions(),
      ]),
      condition: [null],
      formula: [null],
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        filter.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          nodeId: componnet.nodeId,
          collection: componnet.collection,
          condition: componnet.condition,
          formula: componnet.formula,
          statusId: componnet.statusId,
        });
        while (
          (filter.get("filterCollectionConditions") as FormArray).length != 0
        ) {
          (filter.get("filterCollectionConditions") as FormArray).removeAt(0);
        }
        if (componnet.filterCollectionConditions) {
          componnet.filterCollectionConditions.forEach((condition: any) => {
            (filter.get("filterCollectionConditions") as FormArray).push(
              this.BuildCollectionFilterConditions(condition)
            );
          });
        }
      }
    }
    return filter;
  }
  BuildCollectionFilterConditions(data = null) {
    let filterCondition = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      isCustomField: [null],
      screenId: [null],
      operator: [null],
      field: [null],
      value: [null],
      statusId: [1001],
    });
    if (data) {
      filterCondition.patchValue({
        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        isCustomField: data.isCustomField,
        screenId: data.screenId,
        operator: data.operator,
        field: data.field,
        value: data.value,
        statusId: data.statusId,
      });
    }
    return filterCondition;
  }
  BuildDecisionComponent(data = null) {
    let decision = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(200)]],
      nodeId: [null],
      outcomes: this.fb.array([this.BuildDecisionOutcome()]),
      defaultOutcome: [null],
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        decision.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          nodeId: componnet.nodeId,
          defaultOutcome: componnet.defaultOutcome,
          statusId: componnet.statusId,
        });
        while ((decision.get("outcomes") as FormArray).length != 0) {
          (decision.get("outcomes") as FormArray).removeAt(0);
        }
        if (componnet.outcomes) {
          componnet.outcomes.forEach((outcome: any) => {
            (decision.get("outcomes") as FormArray).push(
              this.BuildDecisionOutcome(outcome)
            );
          });
        }
      }
    }
    return decision;
  }

  /** Pause Component Start*/

  BuildPauseComponent(data = null) {
    let pause = this.fb.group({
      id: [null],
      name: [null],
      description: [null],
      nodeId: [null],
      pauseConfigs: this.fb.array([this.BuildPauseConfig()]),
      defaultPath: [null],
      statusId: [1001],
    });
    if (data) {
      if (data.component) {
        const componnet = JSON.parse(data.component);
        pause.patchValue({
          id: componnet.id,
          name: componnet.name,
          description: componnet.description,
          nodeId: componnet.nodeId,
          defaultPath: componnet.defaultPath,
          statusId: componnet.statusId,
        });
        while ((pause.get("pauseConfigs") as FormArray).length != 0) {
          (pause.get("pauseConfigs") as FormArray).removeAt(0);
        }
        if (componnet.pauseConfigs) {
          componnet.pauseConfigs.forEach((pauseConfig: any) => {
            (pause.get("pauseConfigs") as FormArray).push(
              this.BuildPauseConfig(pauseConfig)
            );
          });
        }
      }
    }
    return pause;
  }

  BuildPauseConfig(data = null) {

    let pauseConfig = this.fb.group({
      id: [null],
      name: ["New Pause Config."],
      condition: [4],
      customCondition: [null],
      pauseConfigKey: [this.GenerateUniqueKey()],
      statusId: [1001],
      conditions: this.fb.array([this.BuildPauseConfigConditions()]),
      resumeEvent: this.BuildResumeEvent(),
    });
    if (data) {
      pauseConfig.patchValue({
        id: data.id,
        pauseConfigKey: data.pauseConfigKey,
        name: data.name,
        description: data.description,
        condition: Number(data.condition),
        customCondition: data.customCondition,
        statusId: data.statusId,
        //resumeEvent: this.BuildResumeEvent(data.resumeEvent),
      });

      //pauseConfig.controls.resumeEvent.setValue(this.BuildResumeEvent(data.resumeEvent));

      pauseConfig.setControl(
        "resumeEvent",
        this.BuildResumeEvent(data.resumeEvent)
      );

      while ((pauseConfig.get("conditions") as FormArray).length != 0) {
        (pauseConfig.get("conditions") as FormArray).removeAt(0);
      }
      if (data.conditions) {
        data.conditions.forEach((condition: any) => {
          (pauseConfig.get("conditions") as FormArray).push(
            this.BuildPauseConfigConditions(condition)
          );
        });
      }
    }
    return pauseConfig;
  }

  // BuildResumeEvent(data=null){
  //   let resumeEvent = this.fb.group({
  //     specifiedTime : this.fb.group(this.BuildSpecifiedTime())
  //     //plateFormEvent: this.fb.group(this.BuildPlateFormEvent())
  //   })
  //   if(data){
  //     resumeEvent.patchValue({
  //       specifiedTime: data.specifiedTime
  //       //plateFormEvent: data.plateFormEvent
  //     })
  //   }
  //   return resumeEvent
  // }

  BuildResumeEvent(data = null) {

    let resumeEvent = this.fb.group({
      timeSource: ["Keep_all_items"],
      baseTime: [null],
      offSetNumber: [null],
      offSetUnit: [null],
      resumeTime: [null],
      eventDelivery: [null],
      object: [null],
      field: [null],
      recordId: [null],
    });
    if (data) {
      const parsedData = JSON.parse(data);
      resumeEvent.patchValue({
        timeSource: parsedData.timeSource,
        baseTime: new Date(parsedData.baseTime),
        offSetNumber: parsedData.offSetNumber,
        offSetUnit: parsedData.offSetUnit,
        resumeTime: parsedData.resumeTime,
        eventDelivery: parsedData.eventDelivery,
        object: parsedData.object,
        field: parsedData.field,
        recordId: parsedData.recordId,
      });
    }

    return resumeEvent;
  }

  // BuildPlateFormEvent(data=null){
  //   let PlateFormEvent= this.fb.group({
  //     plateFormEvent :[null],
  //     conditionRequirements:[null],
  //     plateformEventMessage:[null]
  //   })
  //   if(data){
  //     PlateFormEvent.patchValue({
  //       timeSource :data.timeSource,
  //       baseTime: data.baseTime,
  //       offsetNumber: data.offsetNumber,
  //     })
  //   }

  //   return PlateFormEvent;
  // }

  BuildPauseConfigConditions(data = null) {
    let PauseConfigCondition = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      isCustomField: [null],
      customFieldId: [null],
      isResource: [false],
      screenId: [null],
      resourceId: [null],
      operatorList: [null],
      customfieldsList: [null],
      operator: [null],
      value: [null],
      statusId: [1001],
    });
    if (data) {
      let type = data.operator
        ? decisonOperatorList.find((x) => x.value == data.operator).type
        : "";
      PauseConfigCondition.patchValue({
        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        isCustomField: data.isCustomField,
        screenId: data.screenId,
        isResource: data.isResource,
        customFieldId: data.customFieldId,
        resourceId: data.resourceId,
        operatorList: decisonOperatorList.filter(
          (x) => x.type.toLocaleLowerCase() == type.toLowerCase()
        ),
        operator: Number(data.operator),
        value: data.value,
        statusId: data.statusId,
      });

      this.GetAutomationFlowCustomFieldsWithoutPaging(
        data.subModuleId
      ).subscribe((data: any) => {
        PauseConfigCondition.get("customfieldsList").setValue(data);
      });
    }
    return PauseConfigCondition;
  }

  /** Pause Component End*/

  BuildDecisionOutcome(data = null) {
    let outcome = this.fb.group({
      id: [null],
     name: ["New Outcome", [Validators.required, Validators.maxLength(50)]],
      description: [null],
      condition: [1,[Validators.required]],
      customCondition: [null],
      outcomeKey: [this.GenerateUniqueKey()],
      statusId: [1001],
      conditions: this.fb.array([this.BuildDecisionOutcomeConditions()]),
    });
    if (data) {
      outcome.patchValue({
        id: data.id,
        outcomeKey: data.outcomeKey,
        name: data.name,
        description: data.description,
        condition: Number(data.condition),
        customCondition: data.customCondition,
        statusId: data.statusId,
      });
      while ((outcome.get("conditions") as FormArray).length != 0) {
        (outcome.get("conditions") as FormArray).removeAt(0);
      }
      if (data.conditions) {
        data.conditions.forEach((condition: any) => {
          (outcome.get("conditions") as FormArray).push(
            this.BuildDecisionOutcomeConditions(condition)
          );
        });
      }
    }
    return outcome;
  }
  BuildDecisionOutcomeConditions(data = null) {
    let outComeCondition = this.fb.group({
      id: [null],
      moduleId: [null],
      subModuleId: [null],
      isCustomField: [null],
      customFieldId: [null],
      isResource: [false],
      screenId: [null],
      resourceId: [null],
      operatorList: [null],
      customfieldsList: [null],
      operator: [null],
      value: [null],
      statusId: [1001],
    });
    if (data) {
     // let type = decisonOperatorList.find((x) => x.value == data.operator).type;
     let operator =  decisonOperatorList != null?    decisonOperatorList.find((x) => x.value == data.operator): null;

      let type = operator!=null? operator.type:"";
      outComeCondition.patchValue({
        id: data.id,
        moduleId: data.moduleId,
        subModuleId: data.subModuleId,
        isCustomField: data.isCustomField,
        screenId: data.screenId,
        isResource: data.isResource,
        customFieldId: data.customFieldId,
        resourceId: data.resourceId,
        operatorList: decisonOperatorList.filter(
          (x) => x.type.toLocaleLowerCase() == type.toLowerCase()
        ),
        operator: Number(data.operator),
        value: data.value,
        statusId: data.statusId,
      });
      ;
      if (data.isResource) {
        let opp = decisonOperatorList.find(x => x.value == Number(data.operator));
        if (opp.text == 'Is Null' || opp.text == 'Is Not Null') {
          outComeCondition.get('value').disable();
        }
      }
      this.GetAutomationFlowCustomFieldsWithoutPaging(
        data.subModuleId
      ).subscribe((data: any) => {
        outComeCondition.get("customfieldsList").setValue(data);
      });
    }
    return outComeCondition;
  }

  GetNode(node: any): any {
    return {
      id: node.nodeId,
      offsetX: Number(node.offsetX),
      offsetY: Number(node.offsetY),
      constraints: this.getConstraints(node.nodeType.toLowerCase()),
      style: { fill: "#FFB2B2", strokeColor: "#FFB2B2" },
      width: 60,
      height: 60,
      shape: this.GetNodeShape(node.nodeType.toLowerCase()),
      annotations: [{ constraints: AnnotationConstraints.ReadOnly }],
    };
  }
  getConstraints(type: string) {
    if (type == 'start') {
      return NodeConstraints.Default &
        ~NodeConstraints.Rotate &
        ~NodeConstraints.Delete &
        ~NodeConstraints.Resize &
        ~NodeConstraints.ResizeNorth &
        ~NodeConstraints.ResizeNorthWest &
        ~NodeConstraints.ResizeWest &
        ~NodeConstraints.ResizeSouthWest &
        ~NodeConstraints.ResizeSouth &
        ~NodeConstraints.ResizeSouthEast &
        ~NodeConstraints.ResizeEast &
        ~NodeConstraints.ResizeNorthEast;
    }
    else {
      return NodeConstraints.Default &
        ~NodeConstraints.Rotate &
        ~NodeConstraints.Resize &
        ~NodeConstraints.ResizeNorth &
        ~NodeConstraints.ResizeNorthWest &
        ~NodeConstraints.ResizeWest &
        ~NodeConstraints.ResizeSouthWest &
        ~NodeConstraints.ResizeSouth &
        ~NodeConstraints.ResizeSouthEast &
        ~NodeConstraints.ResizeEast &
        ~NodeConstraints.ResizeNorthEast;
    }
  }
  GetNodeShape(type: string): HtmlModel {
    switch (type) {
      case "screen":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="screen" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"> <rect width="100" rx="15" height="90" fill="rgb(1, 118, 211)"/> <g> <path d="M80 25c0-2.8-2.2-5-5-5H25c-2.8 0-5 2.2-5 5v34.7c0 2.8 2.2 5 5 5h50c2.8 0 5-2.2 5-5V25zm-7.5 30.3c0 1-.9 1.9-1.9 1.9H29.4c-1 0-1.9-.9-1.9-1.9V29.4c0-1 .9-1.9 1.9-1.9h41.2c1 0 1.9.9 1.9 1.9v25.9zM41.2 72.5c-2.8 0-5 2.2-5 5v.6c0 1 .9 1.9 1.9 1.9h23.8c1 0 1.9-.9 1.9-1.9v-.6c0-2.8-2.2-5-5-5H41.2z"> </path> <path d="M40.2 50.9h-5.6c-.5 0-1-.5-1-1V34.7c0-.6.5-1 1-1h5.6c.5 0 1 .4 1 1v15.2c0 .5-.5 1-1 1zM65.4 50.9H48.3c-.5 0-1-.5-1-1V34.7c0-.5.5-1 1-1h17.1c.5 0 1 .5 1 1v15.2c0 .6-.5 1-1 1z"> </path> </g><text x="11" y="120"  font-size="2em" fill="black">Screen</text></svg>',
        };

      case "action":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="custom_notification" aria-hidden="true" viewBox="0 0 100 120" fill="white" stroke="currentColor" class="slds-icon slds-icon_small"> <rect width="100" rx="15" height="90" fill="rgb(62, 62, 60)"/> <g> <path d="M53.77 21.87L50 40.11a1 1 0 001.12 1.12h19.52a2 2 0 011.62 2.87L51 79a1.85 1.85 0 01-3.5-.87l3.75-21.48c0-.75-.62-.5-1.37-.5H29.42c-1.37 0-2.37-2-1.62-3.25L50.28 21a1.86 1.86 0 013.49.87z"> </path> </g><text x="11" y="120"  font-size="2em" font-weight="lighter" fill="black">Action</text></svg>',
        };

      case "subflow":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="flow" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(62, 62, 60)"/> <g> <path d="M79.9 30.7c-2.6-5.1-9.2-14.6-21.5-9-7.6 3.5-11.9 5.5-11.9 5.5l-11 4.8c-3.1 1.5-9.9-.6-13.7-2-1.1-.4-2.1.8-1.6 1.9 2.6 5.1 9.2 14.6 21.5 9 7.6-3.5 22.9-10.1 22.9-10.1 3.1-1.5 9.9.6 13.7 2 1.1.2 2.1-.9 1.6-2.1zM53.5 46.8c-1.4.8-6.9 3.3-6.9 3.3l-5.5 2.4C38.4 54 32.5 52 29 50.6c-1-.5-1.9.8-1.4 1.8 2.2 5 8.1 14 18.9 8.5 6.7-3.4 12.4-5.6 12.4-5.6 2.7-1.5 8.6.5 12.1 1.9 1 .4 1.9-.8 1.4-1.9-2.3-5-8.2-14-18.9-8.5zM49.5 68.9c-1.1.6-3 1.8-3 1.8-2.1 1.3-6.5-.4-9.1-1.7-.7-.4-1.4.8-1 1.8 1.6 4.5 6 12.6 14.1 7.6 3-1.9 3-1.8 3-1.8 2.2-1.1 6.5.4 9.1 1.6.7.4 1.4-.8 1-1.8-1.6-4.4-5.7-12.1-14.1-7.5z"> </path> </g> <text x="3" y="120"  font-size="2em" fill="black">Subflow</text></svg>',
        };

      case "assign":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="assignment" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)"/>  <g> <path d="M22 54.9h56c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zM22 37.1h56c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z"> </path> </g><text x="15" y="115"  font-size="2em" fill="black">Assign</text></svg>',
        };
      case "decision":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="decision" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="90" height="90" rx="15" fill="rgb(254, 147, 57)"/> <g> <path d="M79.4 28.8l-5.2-3.9c-.8-.5-1.5-.8-2.4-.8H54V22c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H26c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h45.8c.9 0 1.8-.2 2.4-.8l5.2-3.9c.8-.7.8-1.9 0-2.5zM74 46H54v-3c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v3H28.3c-.9 0-1.8.2-2.4.8l-5.2 3.9c-.9.6-.9 1.9 0 2.6l5.2 3.9c.8.5 1.5.8 2.4.8H74c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM54 71.6v-4.9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v4.9c-4 1.1-6.2 3.5-6.9 6.5-.2.9.5 1.9 1.5 1.9h18.9c1 0 1.8-.9 1.5-1.9-.7-3-3-5.3-7-6.5z"> </path> </g><text x="0" y="115"  font-size="2em" fill="black">Decision</text></svg>',
        };

      case "loop":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="loop" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)"/> <g> <path d="M76.5 58.3c0 .1 0 .2-.1.2-.3 1.1-.7 2.2-1.1 3.3-.5 1.2-1 2.3-1.6 3.4-1.2 2.2-2.7 4.2-4.5 6-1.7 1.8-3.7 3.4-5.9 4.7-2.2 1.3-4.5 2.3-7 3-2.5.7-5.1 1.1-7.7 1.1C32.8 80 20 67.2 20 51.3s12.8-28.6 28.6-28.6c5.3 0 10.3 1.5 14.6 4h.1c2.1 1.2 4 2.7 5.6 4.4.5.4.8.7 1.2 1.2.9.8 1.6.3 1.6-.9V22c0-1.1.9-2 2-2h4c1.1 0 2 .9 2.2 2v24.5c0 .9-.8 1.8-1.8 1.8H53.6c-1.1 0-1.9-.8-1.9-1.9v-4.2c0-1.1.9-2 2-2h9.4c.8 0 1.4-.2 1.7-.7-3.6-5-9.6-8.3-16.2-8.3-11.1 0-20.1 9-20.1 20.1s9 20.1 20.1 20.1c8.7 0 16.1-5.5 18.9-13.3 0 0 .3-1.8 1.7-1.8h5.7c.8 0 1.6.6 1.6 1.5v.5z"> </path> </g><text x="21" y="115"  font-size="2em" fill="black">Loop</text></svg>',
        };

      case "sort":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="sort" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"> <rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)"/><g> <path d="M50.9 37.7c.7-.7.7-1.9 0-2.6L36.6 20.7c-.7-.7-1.9-.7-2.6 0L19.7 35.1c-.7.7-.7 1.9 0 2.6l2.6 2.6c.7.7 1.9.7 2.6 0l4.5-4.5c.7-.7 2.1-.2 2.1.9v26.4c0 1 .9 1.9 1.9 1.9h3.7c1 0 1.9-1 1.9-1.9V36.7c0-1.1 1.4-1.6 2.1-.9l4.5 4.5c.7.7 1.9.7 2.6 0l2.7-2.6zm27.4 24.9l-2.6-2.5c-.7-.7-1.9-.7-2.6 0l-4.5 4.5c-.7.7-2.1.2-2.1-.9V37.1c0-1-.9-1.9-1.9-1.9h-3.7c-1 0-1.9 1-1.9 1.9v26.4c0 1.1-1.4 1.6-2.1.9l-4.5-4.5c-.7-.7-1.9-.7-2.6 0l-2.6 2.7c-.7.7-.7 1.9 0 2.6l14.3 14.3c.7.7 1.9.7 2.6 0l14.3-14.3c.7-.7.7-2-.1-2.6z"> </path> </g><text x="23" y="115"  font-size="2em" fill="black">Sort</text></svg>',
        };

      case "create":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="record_create" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M68.4 27.1c.1 0 .1 0 0 0"></path> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"></path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zm-7.3 35.2c0 .5-.5 1-1 1h-11c-.4 0-.7.3-.7.7v11c0 .5-.5 1-1 1h-2c-.5 0-1-.5-1-1v-11c0-.4-.3-.7-.7-.7h-11c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h11c.4 0 .7-.3.7-.7v-11c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v11c0 .4.3.7.7.7h11c.5 0 1 .5 1 1v2z"> </path> </g> </g><text x="9" y="115"  font-size="2em" fill="black">Create</text></svg>',
        };

      case "update":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="record_update" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M68.4 27.1c.1 0 .1 0 0 0"></path> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"> </path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM60 55.5l-16 16h.1l-7 2c-.7.2-1.3-.5-1.1-1.2l2-6.9 16-16c.2-.2.6-.2.9 0l5.1 5.3c.2.2.2.6 0 .8zm4.6-4.6l-2 2c-.2.2-.6.2-.9 0l-5.2-5.2c-.2-.2-.2-.6 0-.9l2-2c.9-1 2.4-1 3.4 0l2.6 2.6c1.1 1 1.1 2.5.1 3.5z"> </path> </g> </g><text x="9" y="115"  font-size="2em" fill="black">Update</text></svg>',
        };

      case "get":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="record_lookup" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"></path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zm-7.7 47.6L63 73.9c-.3.3-.9.3-1.3 0l-8.1-8.1c-2.3 1.6-5.2 2.5-8.4 2.1-5.2-.7-9.4-5.1-9.9-10.3-.7-7.2 5.4-13.4 12.6-12.6 5.3.5 9.6 4.6 10.3 9.9.4 3.1-.4 6.1-2.1 8.4l8.1 8.1c.5.2.5.8.1 1.2z"> </path> <path d="M46.9 48.5c-4.4 0-7.9 3.6-7.9 7.9 0 4.4 3.5 7.9 7.9 7.9s7.9-3.5 7.9-7.9-3.5-7.9-7.9-7.9z"></path> </g> </g><text x="23" y="115"  font-size="2em" fill="black">Get</text></svg>',
        };

      case "delete":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="record_delete" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"> </path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM60.4 70.6c0 1.7-1.3 3.1-3.1 3.1H42.7c-1.7 0-3.1-1.3-3.1-3.1v-13c0-.5.4-.9.9-.9h19c.5 0 .9.4.9.9v13zm2.4-18.7c0 .5-.4.9-.9.9H38.1c-.5 0-.9-.4-.9-.9v-1.8c0-.5.4-.9.9-.9h7.6v-2.4c0-1.3 1.1-2.4 2.4-2.4h3.7c1.3 0 2.4 1.1 2.4 2.4v2.4h7.6c.5 0 .9.4.9.9v1.8z"> </path> <path d="M47.6 61h-1.2c-.4 0-.6.2-.6.6v7.1c0 .4.2.6.6.6h1.2c.4 0 .6-.2.6-.6v-7.1c0-.4-.3-.6-.6-.6zM53.7 61h-1.2c-.4 0-.6.2-.6.6v7.1c0 .4.2.6.6.6h1.2c.4 0 .6-.2.6-.6v-7.1c0-.4-.3-.6-.6-.6zM51.2 46.7h-2.4c-.4 0-.6.2-.6.6v1.8h3.7v-1.8c-.1-.4-.3-.6-.7-.6z"> </path> </g> </g><text x="15" y="115"  font-size="2em" fill="black">Delete</text></svg>',
        };

      case "filter":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="filter" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"> <rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)" /><g><path d="M77 20H21c-1.9 0-2.8 2.1-1.6 3.5l24.2 28.6c.8.9 1.1 2.1 1.1 3.3v22.7c0 1 1 1.9 2 1.9h4.4c1 0 1.8-.9 1.8-1.9V55.5c0-1.3.5-2.4 1.4-3.3l24.3-28.6c1.2-1.4.3-3.6-1.6-3.6z"></path></g><text x="23" y="115"  font-size="2em" fill="black">Filter</text></svg>',
        };
      case "pause":
        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="Pause" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" height="90" rx="15" fill="rgb(254, 147, 57)"/> <g><path d="M80 40.5c0-1-.9-1.9-1.9-1.9H51.9c-1 0-1.9.9-1.9 1.9v3.7c0 1 .9 1.9 1.9 1.9h17.8L50.4 69.8s0 .1-.1.1c-.2.3-.4.7-.4 1.1v3.7c0 1 .9 1.9 1.9 1.9h26.3c1 0 1.9-.9 1.9-1.9V71c0-1-.9-1.9-1.9-1.9H60.6l19-23.3c.3-.4.4-.8.3-1.3v-4z"></path><path d="M50 25.3c0-1-.9-1.9-1.9-1.9H21.9c-1 0-1.9.9-1.9 1.9V29c0 1 .9 1.9 1.9 1.9h17.8L20.4 54.6s0 .1-.1.1c-.2.3-.3.6-.3 1v3.7c0 1 .9 1.9 1.9 1.9h26.3c1 0 1.9-.9 1.9-1.9v-3.7c0-1-.9-1.9-1.9-1.9H30.6l19-23.3c.3-.4.4-.8.3-1.3V25.3z"></path></g><text x="15" y="115"  font-size="2em" fill="black">Pause</text></svg>',
        };

      case "rollback":
        // return { type: "HTML", content: '<svg focusable="false" data-key="recent" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M28.1 48c-.1.7-.1 1.3-.1 2h-6c0-.7 0-1.3.1-2h6zM51.5 36h-3c-.8 0-1.5.7-1.5 1.5v13.1c0 .4.2.8.4 1.1l8.4 8.4c.6.6 1.5.6 2.1 0L60 58c.6-.6.6-1.5 0-2.1l-7-7.1V37.5c0-.8-.7-1.5-1.5-1.5z"> </path> <path d="M50 22c-14.8 0-26.9 11.5-27.9 26 0 .3-.1.7-.1 1h-4.5c-1.3 0-2 1.5-1.2 2.4l7.5 9.1c.6.7 1.7.7 2.3 0l7.5-9.1c.8-1 .1-2.4-1.2-2.4H28v-1c1-11.2 10.5-20 21.9-20 13 0 23.3 11.3 21.9 24.5-1 9.5-10 18.5-19.6 19.4-7.1.7-13.8-1.9-18.5-7-.6-.7-1.4-1.1-2.2-.1l-2.4 2.9c-.5.6-.1 1 .4 1.5 5.4 5.7 12.8 8.9 20.8 8.8 14.4-.2 26.5-11.6 27.5-26C79.1 35.7 66.1 22 50 22z"> </path> </g><text x="0" y="115"  font-size="2em" fill="black">RollBack</text></svg>' };

        return {
          type: "HTML",
          content:
            '<svg focusable="false" data-key="recent" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M28.1 48c-.1.7-.1 1.3-.1 2h-6c0-.7 0-1.3.1-2h6zM51.5 36h-3c-.8 0-1.5.7-1.5 1.5v13.1c0 .4.2.8.4 1.1l8.4 8.4c.6.6 1.5.6 2.1 0L60 58c.6-.6.6-1.5 0-2.1l-7-7.1V37.5c0-.8-.7-1.5-1.5-1.5z"> </path> <path d="M50 22c-14.8 0-26.9 11.5-27.9 26 0 .3-.1.7-.1 1h-4.5c-1.3 0-2 1.5-1.2 2.4l7.5 9.1c.6.7 1.7.7 2.3 0l7.5-9.1c.8-1 .1-2.4-1.2-2.4H28v-1c1-11.2 10.5-20 21.9-20 13 0 23.3 11.3 21.9 24.5-1 9.5-10 18.5-19.6 19.4-7.1.7-13.8-1.9-18.5-7-.6-.7-1.4-1.1-2.2-.1l-2.4 2.9c-.5.6-.1 1 .4 1.5 5.4 5.7 12.8 8.9 20.8 8.8 14.4-.2 26.5-11.6 27.5-26C79.1 35.7 66.1 22 50 22z"> </path> </g><text x="0" y="115"  font-size="2em" fill="black">RollBack</text></svg>',
        };
        break;
      default:
        return {
          type: "HTML",
          content:
            '<svg version="1.1" height="80" width="70" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 461.001 500.001" style="enable-background:new 0 0 461.001 461.001;" xml:space="preserve"><g><path style="fill:cadetblue;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/></g><text x="95" y="500"  font-size="8em" fill="black">Start</text></svg>',
        };
    }
  }
  ReturnComponentType(obj) {
    if (obj.id.includes("Screen")) {
      return "Screen";
    } else if (obj.id.includes("Action")) {
      return "Action";
    } else if (obj.id.includes("Subflow")) {
      return "Subflow";
    } else if (obj.id.includes("Assign")) {
      return "Assign";
    } else if (obj.id.includes("Decision")) {
      return "Decision";
    } else if (obj.id.includes("Loop")) {
      return "Loop";
    } else if (obj.id.includes("Sort")) {
      return "Sort";
    } else if (obj.id.includes("Create")) {
      return "Create";
    } else if (obj.id.includes("Update")) {
      return "Update";
    } else if (obj.id.includes("Get")) {
      return "Get";
    } else if (obj.id.includes("Delete")) {
      return "Delete";
    } else if (obj.id.includes("RollBack")) {
      return "RollBack";
    } else if (obj.id.includes("Filter")) {
      return "Filter";
    } else if (obj.id.includes("Start")) {
      return "Start";
    } else if (obj.id.includes("Pause")) {
      return "Pause";
    }
  }
  ReturnData(form: FormGroup, nodeId: string) {
    let connector = (form.get("connectors") as FormArray).controls.filter(
      (f) => f.get("targetID").value == nodeId
    );
    connector.forEach((item: any) => {
      if (
        item.get("sourceID").value == null ||
        item.get("sourceID").value == ""
      ) {
        return null;
      } else {
        this.ReturnData(form, item.get("sourceID").value);
      }
      let node = (form.get("nodes") as FormArray).controls.find(
        (f) => f.get("nodeId").value == nodeId
      );
      // console.log("node type=>", node.get("nodeType").value);
      if (node.get("nodeType").value.toLowerCase() == "screen") {
        let componnet = node != null ? node.get("component") : null;
        if (componnet) {
          let componentControls = componnet.get("controls") as FormArray;
          if (componentControls) {
            this.nodeDataList = [];
            componentControls.controls.forEach((control) => {
              if (this.nodeDataList.length == 0) {
                this.nodeDataList.push({
                  nodeId:
                    node.get("nodeId") != null
                      ? node.get("nodeId").value
                      : null,
                  displayName:
                    control.get("name") != null
                      ? control.get("name").value
                      : null,
                  dtCode:
                    control.get("dtCode") != null
                      ? control.get("dtCode").value
                      : null,
                  type: "screen",
                  formControlName:
                    (control.get("fieldType") != null
                      ? control.get("fieldType").value
                      : null) +
                    "_" +
                    (control.get("formFieldId") != null
                      ? control.get("formFieldId").value
                      : null),
                  id:
                    control.get("formFieldId") != null
                      ? control.get("formFieldId").value
                      : null,
                  isCollection: false,
                  subModuleId: null,
                  isRecord: false,
                  isResource: false,
                  isCustomField: false,
                  customFieldId: null,
                  groupName: 'Screen'
                });
              } else {
                let d = this.nodeDataList.find(
                  (f) => f.id == control.get("formFieldId").value
                );
                if (d == null) {
                  this.nodeDataList.push({
                    nodeId:
                      node.get("nodeId") != null
                        ? node.get("nodeId").value
                        : null,
                    displayName:
                      control.get("name") != null
                        ? control.get("name").value
                        : null,
                    dtCode:
                      control.get("dtCode") != null
                        ? control.get("dtCode").value
                        : null,
                    type: "screen",
                    subModuleId: null,
                    formControlName:
                      (control.get("fieldType") != null
                        ? control.get("fieldType").value
                        : null) +
                      "_" +
                      (control.get("formFieldId") != null
                        ? control.get("formFieldId").value
                        : null),
                    id:
                      control.get("formFieldId") != null
                        ? control.get("formFieldId").value
                        : null,
                    isCollection: false,
                    isResource: false,
                    isRecord: false,
                    isCustomField: false,
                    customFieldId: null,
                    groupName: 'Screen'
                  });
                }
              }
            });
          }
        }
      }
    });
    return this.nodeDataList;
  }

  resourceList: any = [];

  ReturnResources(form: FormGroup) {
    this.resourceList = [];
    (form.get("resources") as FormArray).controls.forEach((element) => {
      if (element.get("isAllowMultiple").value == false) {
        this.resourceList.push({
          name: element.get("name").value,
          resourceTypeId: element.get("resourceTypeId").value,
          resourceId: element.get("resourceId").value,
          subModuleId: element.get("subModuleId").value,
        });
      }
    });
    return this.resourceList;
  }
  ReturnDecisionResources(form: FormGroup, list: any) {
    (form.get("resources") as FormArray).controls.forEach((element) => {
      //if (element.get("isAllowMultiple").value == false) {
        if (list.length == 0) {
          list.push({
            nodeId: null,
            displayName: element.get("name").value,
            dtCode: null,
            type: "resource",
            formControlName: null,
            id: element.get("resourceId").value,
            isCollection: false,
            isRecord: false,
            subModuleId: element.get("subModuleId").value,
            isResource: true,
            isCustomField: false,
            customFieldId: null,
            groupName: 'Resources'
          });
        } else {
          let d = list.find(f => f.id == element.get("resourceId").value);
          if (d == null) {
            list.push({
              nodeId: null,
              displayName: element.get("name").value,
              subModuleId: element.get("subModuleId").value,
              dtCode: null,
              type: "resource",
              formControlName: null,
              id: element.get("resourceId").value,
              isCollection: false,
              isRecord: false,
              isResource: true,
              isCustomField: false,
              customFieldId: null,
              groupName: 'Resources'
            });
          }
        }
     // }
    });
    return this.resourceList;
  }
  ReturnAssignmentResources(form: FormGroup, list: any) {
    (form.get("resources") as FormArray).controls.forEach(element => {
      if (element.get("isAllowMultiple").value == false) {
        if (list.length == 0) {
          list.push({
            nodeId: null,
            displayName: element.get("name").value,
            dtCode: null,
            type: "resource",
            formControlName: null,
            id: element.get("resourceId").value,
            isCollection: false,
            isRecord: false,
            subModuleId: element.get("subModuleId").value,
            isResource: true,
            isCustomField: false,
            customFieldId: null,
            groupName: "Resources"
          });
        } else {
          let d = list.find((f) => f.id == element.get("resourceId").value);
          if (d == null) {
            list.push({
              nodeId: null,
              displayName: element.get("name").value,
              subModuleId: element.get("subModuleId").value,
              dtCode: null,
              type: "resource",
              formControlName: null,
              id: element.get("resourceId").value,
              isCollection: false,
              isRecord: false,
              isResource: true,
              isCustomField: false,
              customFieldId: null,
              groupName: "Resources"
            });
          }
        }
      }
    });
    return this.resourceList;
  }
  ReturnResourceBySubModule(
    form: FormGroup,
    subModuleId: any,
    isCollection: boolean
  ) {
    let list = [];
    (form.get("resources") as FormArray).controls.forEach((element) => {
      if (
        element.get("subModuleId").value == subModuleId &&
        element.get("isAllowMultiple").value == isCollection
      ) {
        list.push({
          name: element.get("name").value,
          resourceTypeId: element.get("resourceTypeId").value,
          resourceId: element.get("resourceId").value,
          subModuleId: element.get("subModuleId").value,
        });
      }
    });
    return list;
  }
  ReturnCollection(form: FormGroup, nodeId: string) {
    let connector = (form.get("connectors") as FormArray).controls.filter(
      (f) => f.get("targetID").value == nodeId
    );
    connector.forEach((item: any) => {
      if (
        item.get("sourceID").value == null ||
        item.get("sourceID").value == ""
      ) {
        return null;
      } else {
        this.ReturnCollection(form, item.get("sourceID").value);
      }
      let node = (form.get("nodes") as FormArray).controls.find(
        (f) => f.get("nodeId").value == nodeId
      );
      // console.log("node type=>", node.get("nodeType").value);
      if (node.get("nodeType").value.toLowerCase() == "get") {
        let componnet = node != null ? node.get("component") : null;
        if (componnet) {
          if (componnet.get("howManyToStore").value == "Allrecords") {
            if (this.nodeCollectionList.length == 0) {
              this.nodeCollectionList.push({
                name: componnet.get("name").value + "_" + "Collection",
                value:
                  node.get("nodeId") != null ? node.get("nodeId").value : null,
              });
            } else {
              let d = this.nodeCollectionList.find((x) =>
                (x.value == node.get("nodeId")) != null
                  ? node.get("nodeId").value
                  : null
              );
              if (d == null) {
                this.nodeCollectionList.push({
                  name: componnet.get("name").value + "_" + "Collection",
                  value:
                    node.get("nodeId") != null
                      ? node.get("nodeId").value
                      : null,
                });
              }
            }
          }
        }
      }
    });
    return this.nodeCollectionList;
  }

  ReturnOutcomeList(form: FormGroup, nodeId: string) {
    let data = [];
    let node = (form.get("nodes") as FormArray).controls.find(
      (f) => f.get("nodeId").value == nodeId
    );
    if (node.get("nodeType").value.toLowerCase() == "decision") {
      let componnet = node != null ? node.get("component") : null;
      if (componnet) {
        (componnet.get("outcomes") as FormArray).controls.forEach(
          (outcome: any) => {
            data.push({
              text: outcome.get("name").value,
              value: outcome.get("outcomeKey").value,
            });
          }
        );
      }
    }
    return data;
  }
  GetOperator(operator: number) {
    return decisonOperatorList.find((a) => a.value == operator);
  }
}

export class DataObject {
  nodeId: any;
  displayName: any;
  dtCode: any;
  type: any;
  id: any;
  subModuleId: any;
  isResource: boolean;
  formControlName: any;
  isCollection: boolean;
  isRecord: boolean;
  isCustomField: boolean;
  customFieldId: any;
  groupName: string;
  constructor() {
    this.nodeId = null,
      this.displayName = null,
      this.formControlName = null,
      this.isRecord = null,
      this.customFieldId = null,
      this.subModuleId = null,
      this.isResource = null,
      this.dtCode = null,
      this.type = null,
      this.id = null,
      this.isCollection = null,
      this.isRecord = null,
      this.isCustomField = null,
      this.customFieldId = null,
      this.groupName = null
  }
}
export var decisonOperatorList: any[] = [
  {
    text: "Does Not Equal",
    value: 1,
    type: "Boolean",
    supportedTypes: "Boolean",
  },
  { text: "Equals", value: 2, type: "Boolean", supportedTypes: "Boolean" },
  { text: "Was Set", value: 3, type: "Boolean", supportedTypes: "Boolean" },
  { text: "Was Visited", value: 4, type: "Boolean", supportedTypes: "Boolean" },
  { text: "Was Selected", value: 5, type: "Choice", supportedTypes: "Boolean" },
  {
    text: "Contains",
    value: 6,
    type: "Collection",
    supportedTypes: "SameObjectType",
  },
  {
    text: "Does Not Equal",
    value: 7,
    type: "Collection",
    supportedTypes: "SameObjectType",
  },
  {
    text: "Equals",
    value: 8,
    type: "Collection",
    supportedTypes: "SameObjectType",
  },
  { text: "Is Null", value: 9, type: "Collection", supportedTypes: "Boolean" },
  {
    text: "Does Not Equal",
    value: 10,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Equals",
    value: 11,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Greater Than",
    value: 12,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Greater Than or Equal",
    value: 13,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Less Than",
    value: 14,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Less Than or Equal",
    value: 15,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  { text: "Is Null", value: 16, type: "Number", supportedTypes: "Boolean" },
  { text: "Was Set", value: 17, type: "Number", supportedTypes: "Boolean" },
  {
    text: "Does Not Equal",
    value: 18,
    type: "DateTime",
    supportedTypes: "Date,DateTime",
  },
  {
    text: "Equals",
    value: 19,
    type: "DateTime",
    supportedTypes: "Date,DateTime",
  },
  {
    text: "Greater Than",
    value: 20,
    type: "DateTime",
    supportedTypes: "Date,DateTimen",
  },
  {
    text: "Greater Than or Equal",
    value: 21,
    type: "DateTime",
    supportedTypes: "Date,DateTime",
  },
  {
    text: "Less Than",
    value: 22,
    type: "DateTime",
    supportedTypes: "Date,DateTime",
  },
  {
    text: "Less Than or Equal",
    value: 23,
    type: "DateTime",
    supportedTypes: "Date,DateTime",
  },
  { text: "Is Null", value: 24, type: "DateTime", supportedTypes: "Boolean" },
  { text: "Was Set", value: 25, type: "DateTime", supportedTypes: "Boolean" },
  {
    text: "Contains",
    value: 26,
    type: "Picklist",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  {
    text: "Does Not Equal",
    value: 27,
    type: "Picklist",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  {
    text: "Equals",
    value: 28,
    type: "Picklist",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  {
    text: "Is Not Null",
    value: 29,
    type: "Picklist",
    supportedTypes: "Boolean",
  },
  {
    text: "Does Not Equal",
    value: 30,
    type: "Record",
    supportedTypes: "SameObjectType",
  },
  {
    text: "Equals",
    value: 31,
    type: "Record",
    supportedTypes: "SameObjectType",
  },
  { text: "Is Null", value: 32, type: "Record", supportedTypes: "Stage,Text" },
  {
    text: "Does Not Equal",
    value: 33,
    type: "Stage",
    supportedTypes: "Stage,Text",
  },
  { text: "Equals", value: 34, type: "Stage", supportedTypes: "Stage,Text" },
  { text: "Ends With", value: 35, type: "Stage", supportedTypes: "Stage,Text" },
  { text: "Is Null", value: 36, type: "Stage", supportedTypes: "Boolean" },
  {
    text: "Starts With",
    value: 37,
    type: "Stage",
    supportedTypes: "Stage,Text",
  },
  {
    text: "Contains",
    value: 38,
    type: "Text",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  {
    text: "Does Not Equal",
    value: 39,
    type: "Text",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  {
    text: "Equals",
    value: 40,
    type: "Text",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  // { text: "Does Not Equal", value: 41, type: "Text", supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text" },
  // { text: "Equals", value: 42, type: "Text", supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text" },
  {
    text: "Ends With",
    value: 43,
    type: "Text",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  { text: "Is Null", value: 44, type: "Text", supportedTypes: "Boolean" },
  {
    text: "Starts With",
    value: 45,
    type: "Text",
    supportedTypes: "Boolean,Currency,Date,DateTime,Number,Picklist,Text",
  },
  { text: "Was Set", value: 46, type: "Text", supportedTypes: "Boolean" },
  { text: "Is Null", value: 47, type: "Picklist", supportedTypes: "Boolean" },
];
export var assingmentOperatorList: any[] = [
  { text: "Equals", value: 1, type: "Boolean", supportedTypes: "Boolean" },
  {
    text: "Equals",
    value: 2,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Add",
    value: 3,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Remove After First",
    value: 4,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Add At Start",
    value: 5,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Remove All",
    value: 6,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Remove First",
    value: 7,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Remove Before First",
    value: 8,
    type: "Collection",
    supportedTypes: "Text,Picklist,MultiSelectPicklist",
  },
  {
    text: "Remove Position",
    value: 9,
    type: "Collection",
    supportedTypes: "Number",
  },
  {
    text: "Remove Uncommon",
    value: 10,
    type: "Collection",
    supportedTypes: "SameObjectType",
  },
  {
    text: "Equals",
    value: 11,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  { text: "Add", value: 12, type: "Number", supportedTypes: "Currency,Number" },
  {
    text: "Subtract",
    value: 13,
    type: "Number",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Equals Count	",
    value: 14,
    type: "Number",
    supportedTypes: "Collection",
  },
  { text: "Equals", value: 15, type: "Date", supportedTypes: "Date,Date/Time" },
  { text: "Add", value: 16, type: "Date", supportedTypes: "Currency,Number" },
  {
    text: "Subtract",
    value: 17,
    type: "Date",
    supportedTypes: "Currency,Number",
  },
  {
    text: "Equals",
    value: 18,
    type: "Date/Time",
    supportedTypes: "Date,Date/Time",
  },
  {
    text: "Equals",
    value: 19,
    type: "Picklist",
    supportedTypes:
      "Boolean,Currency,Date,Date/Time,MultiSelectPicklist,Number,Picklist,Text",
  },
  {
    text: "Add",
    value: 20,
    type: "Picklist",
    supportedTypes:
      "Boolean,Currency,Date,Date/Time,MultiSelectPicklist,Number,Picklist,Text",
  },
  {
    text: "Equals",
    value: 21,
    type: "MultiSelectPicklist",
    supportedTypes:
      "Boolean,Collection,Currency,Date,Date/Time,MultiSelectPicklist,Number,Picklist,Text",
  },
  {
    text: "Add",
    value: 22,
    type: "MultiSelectPicklist",
    supportedTypes:
      "Boolean,Currency,Date,Date/Time,MultiSelectPicklist,Number,Picklist,Text",
  },
  {
    text: "Add Item	",
    value: 23,
    type: "MultiSelectPicklist",
    supportedTypes:
      "Boolean,Currency,Date,Date/Time,MultiSelectPicklist,Number,Picklist,Text",
  },
  {
    text: "Equals",
    value: 24,
    type: "Record",
    supportedTypes: "SameObjectType",
  },
  {
    text: "Equals",
    value: 25,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Add",
    value: 26,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Remove After First",
    value: 27,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Add At Start",
    value: 28,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Remove All",
    value: 29,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Remove First",
    value: 30,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Remove Before First",
    value: 31,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Remove Position",
    value: 32,
    type: "Stage",
    supportedTypes: "Stage,FullyQualifiedStageName",
  },
  {
    text: "Equals",
    value: 33,
    type: "Text",
    supportedTypes:
      "Boolean,Currency,Date,Date/Time,Number,MultiSelectPicklist,Picklist,Stage,Text",
  },
  {
    text: "Add",
    value: 34,
    type: "Text",
    supportedTypes:
      "Boolean,Currency,Date,Date/Time,Number,MultiSelectPicklist,Picklist,Stage,Text",
  },
];

export class Resource {
  automationFlowId: any;
  dataTypeId: any;
  resourceId: any;
  resourceTypeId: any;
  description: any;
  name: any;
  subModuleId: any;
  isAllowMultiple: any;
}
