import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlowBuilderService } from '../../flow-builder/flow-builder.service';
import { FormField } from '../../lender/lenderlist.service';

@Component({
	selector: 'flow-automation-execution-view',
	templateUrl: './flow-automation-execution-view.component.html',
	styleUrls: ['./flow-automation-execution-view.component.css']
})

export class FlowAutomationExecutionViewComponent implements OnInit {
	//	json='[{"id": 265,"name": "all operation 1","moduleId": "4","subModuleId": 10,"statusId": 1001,"createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783","createdOn": "2022-03-19T11:19:59.437","modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783","modifiedOn": "2022-03-19T11:57:17.710","companyId": 1003,"flowType": "ScreenFlow","runCondition": 1,"nodes": [  { "id": 952, "automationFlowId": 265, "nodeId": "CreateRecordsyXIa1", "nodeType": "Create", "offsetX": "415", "offsetY": "258", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.443", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.713", "component": {"id": 36,"name": "create by name","nodeId": 952,"subModuleId": 10,"query": "INSERT INTO tblLeads (Name) values(textbox_e08e)","description": "desc","statusId": 1001,"fieldMapping": [  { "id": 84, "RecordId": 36, "Recordtype": "Create", "value": "e08e", "statusId": 1001, "customFieldId": 44  }] }  },  { "id": 953, "automationFlowId": 265, "nodeId": "DecisionU8Z3P", "nodeType": "Decision", "offsetX": "423", "offsetY": "138", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.487", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.723", "component": {"id": 46,"nodeId": 953,"name": "name decision","description": "Description","statusId": 1001,"outcomes": [  { "id": 48, "decisionId": 46, "name": "Decision 1", "condition": "1", "statusId": 1001, "conditions": [{  "id": 65,  "decisionOutcomeId": 48,  "resourceId": "b439",  "operator": "40",  "value": "Ijaz",  "statusId": 1001} ]  }] }  },  { "id": 954, "automationFlowId": 265, "nodeId": "DeleteRecordsxktZU", "nodeType": "Delete", "offsetX": "569", "offsetY": "479", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.493", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.727", "component": {"id": 34,"name": "delete by ad id","description": "desc","nodeId": 954,"subModuleId": 10,"howToFind": "Specify_conditions","query": "DELETE tblLeads  WHERE Ad_Id  = textbox_01dc ","findCondition": "1","statusId": 1001,"filterConditions": [  { "id": 149, "updateRecordId": 34, "operator": "1", "field": "978", "value": "01dc"  }] }  },  { "id": 955, "automationFlowId": 265, "nodeId": "GetRecordsEcnD3", "nodeType": "Get", "offsetX": "418", "offsetY": "480", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.510", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.733", "component": {"id": 49,"name": "get by unique number","nodeId": 955,"subModuleId": 10,"description": "desc","sortCondition": "1","sortBy": "475","query": "SELECT Street,Name,LastName FROM tblLeads WHERE Test_Unique  = number_e2ef  ORDER BY Website ASC","howManyToStore": "OnlyTheFirstRecord","howToMap": "letSalesforce","filterCondition": "1","filterConditions": [  { "id": 150, "updateRecordId": 49, "operator": "1", "field": "1019", "value": "e2ef", "statusId": 1001  }],"choosenFields": [  { "id": 697, "customfieldName": "Lead | Street Name", "customfieldDtCode": "text", "updateRecordId": 49, "customFieldId": 45, "statusId": 1001  },  { "id": 698, "customfieldName": "Lead | Name", "customfieldDtCode": "text", "updateRecordId": 49, "customFieldId": 44, "statusId": 1001  },  { "id": 699, "customfieldName": "Lead | Last Name", "customfieldDtCode": "text", "updateRecordId": 49, "customFieldId": 2, "statusId": 1001  }] }  },  { "id": 956, "automationFlowId": 265, "nodeId": "ScreenAaOoJ", "nodeType": "Screen", "offsetX": "619", "offsetY": "280", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.530", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.737", "component": {"id": 134,"screenId": 134,"name": "Finish Screen","statusId": 1001,"isHeaderShown": true,"isFooterShown": true,"nextOrFinishButton": "hideButton","isNextOrFinishButtonShown": true,"isNextOrFinishButtonDefaultLabel": true,"previousbutton": "standardValue","isPreviousbuttonShown": true,"isPreviousButtonDefaultLabel": true,"isPauseButtonShown": true,"isPauseButtonDefaultLabel": true,"isStandardPauseConfirmationMassage": true,"automationFlowId": 265,"nodeId": 956,"controls": [  { "id": 701, "screenId": 134, "name": "All operations completed", "dtCode": "text", "allowMultipleChoices": "false", "statusId": 1001, "formFieldId": "3998", "fieldType": "textbox", "formControlName": "textbox_3998"  }] }  },  { "id": 957, "automationFlowId": 265, "nodeId": "ScreenRFdLF", "nodeType": "Screen", "offsetX": "614", "offsetY": "138", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.537", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.740", "component": {"id": 135,"screenId": 135,"name": "Main Screen","statusId": 1001,"isHeaderShown": true,"isFooterShown": true,"nextOrFinishButton": "standardValue","isNextOrFinishButtonShown": true,"isNextOrFinishButtonDefaultLabel": true,"previousbutton": "hideButton","isPreviousbuttonShown": true,"isPreviousButtonDefaultLabel": true,"pausebutton": "hideButton","isPauseButtonShown": true,"isPauseButtonDefaultLabel": true,"isStandardPauseConfirmationMassage": true,"automationFlowId": 265,"nodeId": 957,"controls": [  { "id": 702, "screenId": 135, "name": "First Name", "isRequired": true, "dtCode": "text", "allowMultipleChoices": "false", "statusId": 1001, "formFieldId": "b439", "fieldType": "textbox", "formControlName": "textbox_b439"  },  { "id": 703, "screenId": 135, "name": "Last Name", "isRequired": true, "dtCode": "text", "allowMultipleChoices": "false", "statusId": 1001, "formFieldId": "e08e", "fieldType": "textbox", "formControlName": "textbox_e08e"  },  { "id": 704, "screenId": 135, "name": "Get by id number ", "isRequired": true, "dtCode": "int", "allowMultipleChoices": "false", "statusId": 1001, "formFieldId": "e2ef", "fieldType": "number", "formControlName": "number_e2ef"  },  { "id": 705, "screenId": 135, "name": "Ad ID for delete", "isRequired": true, "dtCode": "text", "allowMultipleChoices": "false", "statusId": 1001, "formFieldId": "01dc", "fieldType": "textbox", "formControlName": "textbox_01dc"  }] }  },  { "id": 958, "automationFlowId": 265, "nodeId": "start", "nodeType": "start", "offsetX": "600", "offsetY": "30", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.547", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.747"  },  { "id": 959, "automationFlowId": 265, "nodeId": "UpdateRecordsUxZAk", "nodeType": "Update", "offsetX": "415", "offsetY": "368", "statusId": 1001, "createdBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "createdOn": "2022-03-19T11:19:59.550", "modifiedBy": "E9E022F5-BAA8-468A-8EB4-2798772A6783", "modifiedOn": "2022-03-19T11:57:17.747", "component": {"id": 35,"name": "update by first name","nodeId": 959,"subModuleId": 10,"description": "desc","filterOperator": "2","query": "UPDATE tblLeads SET LastName = textbox_e08e WHERE Test_Unique  = number_e2ef","statusId": 1001,"filterConditions": [  { "id": 151, "updateRecordId": 35, "operator": "1", "value": "e2ef", "field": "1019", "statusId": 1001  }],"fieldMapping": [  { "id": 85, "RecordId": 35, "Recordtype": "Update", "value": "e08e", "statusId": 1001, "customFieldId": 2  }] }  }],"connectors": [  { "id": 5687, "dbId": 5687, "automationFlowId": 265, "sourceID": "ScreenRFdLF", "targetID": "DecisionU8Z3P", "connectorType": "Orthogonal", "statusId": 1001  },  { "id": 5688, "dbId": 5688, "automationFlowId": 265, "sourceID": "DecisionU8Z3P", "targetID": "CreateRecordsyXIa1", "connectorType": "Orthogonal", "statusId": 1001  },  { "id": 5689, "dbId": 5689, "automationFlowId": 265, "sourceID": "CreateRecordsyXIa1", "targetID": "UpdateRecordsUxZAk", "connectorType": "Orthogonal", "statusId": 1001  },  { "id": 5690, "dbId": 5690, "automationFlowId": 265, "sourceID": "UpdateRecordsUxZAk", "targetID": "GetRecordsEcnD3", "connectorType": "Orthogonal", "statusId": 1001  },  { "id": 5691, "dbId": 5691, "automationFlowId": 265, "sourceID": "GetRecordsEcnD3", "targetID": "DeleteRecordsxktZU", "connectorType": "Orthogonal", "statusId": 1001  },  { "id": 5692, "dbId": 5692, "automationFlowId": 265, "sourceID": "DeleteRecordsxktZU", "targetID": "ScreenAaOoJ", "connectorType": "Orthogonal", "statusId": 1001  },  { "id": 5693, "dbId": 5693, "automationFlowId": 265, "sourceID": "start", "targetID": "ScreenRFdLF", "connectorType": "Orthogonal", "statusId": 1001  }] }]';
	executionForm: FormGroup;
	FormJson: any;
	formFields: FormField[];
	selectJson: [] = [];
	connectors: any[] = [];
	nodes: any[] = [];
	resources: any[] = [];
	components: any[] = [];
	loadSave: boolean = false;
	nextnode: any;
	outcomeKey: string = "";
	GetRecord: any;
	formfieldvalue = [];
	autoLaunched: boolean = false;
	autoLaunchedMessage: string = "";
	debugResultObjectList: DebugResultObject[] = [];
	collectionObjectList: CollectionObject[] = [];
	resourceObjectList: ResourceObject[] = [];
	loopflow: LoopFlow;
	flowId: any;
	recordId: any;
	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
		private _flowBuilderService: FlowBuilderService, private toastrSerivce: ToastrService,) { }
	Current: string = "start";
	NewScreen: string;
	CurrentScreen: any;
	ngOnInit() {
		this.route.paramMap.subscribe(
			params => {
				this.flowId = params.get('id');
				this.recordId = params.get('id2');
				// console.log("flow id and record id", this.flowId + "--" + this.recordId);
				if (this.flowId > 0) {
					this.getAutomationFlowById(this.flowId);
				}
			});
	}
	getAutomationFlowById(id: any) {
		this._flowBuilderService.GetById(id).subscribe((response: any) => {
			if (response) {
				response.nodes.forEach(element => {
					if (element.nodeType != "start")
						element.component = JSON.parse(element.component);
				});
				this.connectors = response.connectors;
				this.nodes = response.nodes;
				this.resources = response.resources;
				if (this.resources != null) {
					;
					this.autoLaunched = response.isAutolaunched == null ? false : response.isAutolaunched;
					response.resources.forEach(element => {
						let resourceObject = new ResourceObject();
						resourceObject.resourceId = element.resourceId;
						this.resourceObjectList.push(resourceObject);
					});
				}
				// console.log(response);
				// console.log(this.connectors);
				// console.log(this.nodes);
			}
			//	this.FirstScreen();
			this.Next();
		});
	}
	Prev() {
		const next = this.connectors.find(x => x.targetID == this.Current);
		this.nextnode = this.nodes.find(a => a.nodeId == next.sourceID);
		if (this.nextnode.nodeType !== 'Screen' && this.nextnode.nodeType != 'start') {
			this.Current = next.sourceID;
			this.Prev();
		}
		else {
			if (next && next.sourceID != 'start')
				this.Current = next.sourceID;
		}
	}
	FirstScreen() {
		const next = this.connectors.find(x => x.sourceID == this.Current);
		if (next)
			this.Current = next.targetID;
	}
	NextScreenView() {
		;
		const next = this.connectors.find(x => x.sourceID == this.Current);
		if (next) {
			this.Current = next.targetID;
			this.NewScreen = this.Current;
			this.CurrentScreen = this.nodes.find(a => a.nodeId == this.Current);
		}

		else if (this.loopflow != null) {
			this.loopflow.currentIndex += 1;
			this.Current = this.loopflow.loopCollectionId;
			//if (this.loopflow.currentIndex == this.loopflow.length)
			//this.loopflow = null;
			this.Next();
		}
	}
	async Next(formData: any = null) {
		;
		let nodeValidate = true;
		let controlsInfo = '';
		this.loadSave = true;
		// console.log(this.collectionObjectList);
		if (this.outcomeKey == "") {
			let currentscreen = this.nodes.find(a => a.nodeId == this.Current);
			if (currentscreen.nodeType == 'Screen') {
				var formdata = null;
				currentscreen.component.controls.forEach((control) => {
					if (formData != null) {
						if (formData.group.controls[control.formControlName] != null) {
							//formData.fieldstype[element.value] == "dropdown" fieldType "dropdown"
							formdata = formData.group.controls[control.formControlName];
							if (control.fieldType == "dropdown") {
								controlsInfo += '<p>' + control.name + " " + "=" + " " + (formData.group.controls[control.formControlName].value != null ? formData.group.controls[control.formControlName].value.name : formData.group.controls[control.formControlName].value) + '</p>'
							}
							else
								controlsInfo += '<p>' + control.name + " " + "=" + " " + formData.group.controls[control.formControlName].value + '</p>'
						}
					}

				})
				if (formdata != null) {
					let resultObject = new DebugResultObject();
					resultObject.nodeType = currentscreen.nodeType + "";
					resultObject.nodeName = currentscreen.component.name;
					resultObject.result = controlsInfo;
					this.debugResultObjectList.push(resultObject);
				}
			}
		}
		var next: any;
		if (this.outcomeKey != "") {
			next = this.connectors.find(x => x.outcomeKey == this.outcomeKey);
			this.Current = next.targetID;
			this.outcomeKey = "";
		}

		else
			next = this.connectors.find(x => x.sourceID == this.Current);
		if (this.loopflow != null && next != null && next.targetID == this.loopflow.loopCollectionId) {
			this.loopflow.currentIndex += 1;
			this.Current = this.loopflow.loopCollectionId;
			// console.log('end loop', this.loopflow.currentIndex);
			if (this.loopflow != null && this.loopflow.currentIndex == this.loopflow.length) {
				next = this.connectors.find(x => x.sourceID == this.Current && x.isBreakAwayCondition);
				this.loopflow = null;
				this.Current = next.targetID;

			} else {
				next = this.connectors.find(x => x.sourceID == this.Current && !x.isBreakAwayCondition);

			}
			this.NextScreenView();
			//return;
		}
		;
		if (next == null) {
			this.loadSave = false;
			return;
		}
		this.nextnode = this.nodes.find(a => a.nodeId == next.targetID);
		var breakMe = false;
		if (this.nextnode.nodeType == 'Decision') {
			let conditions = '';
			;
			const nodeConditions = this.nextnode.component;
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			resultObject.nodeName = nodeConditions.name;
			nodeConditions.outcomes.forEach(element => {
				if (element.conditions !== null) {
					element.conditions.forEach(elementdoc => {
						const operatordetail = this._flowBuilderService.GetOperator(elementdoc.operator);
						if (!breakMe) {//Is Null
							nodeValidate = false;
							switch (operatordetail.text) {
								case 'Is Not Null': {
									
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId] != null) {
												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " is null.";
											}
										}
									}
									else if (elementdoc.isResource) {

										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);

										if (obj.records != null && obj.records.length > 0 && obj.records[0][elementdoc.customFieldId] != null) {
											nodeValidate = true;
											conditions += '<p>' + elementdoc.customFieldId + ": " + "Is Not Null" + " " + elementdoc.customFieldId + '</p>';
											resultObject.details = conditions;
										}

									}
									else {
										if (formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value = !null) {
											nodeValidate = true;
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Is Not Null" + '</p>';
											resultObject.details = conditions;
										}
										else {
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Is Null" + "(Failed)" + '</p>';
											resultObject.details = conditions;
											nodeValidate = false;
											//return false;
										}
									}
									break;
								}
								case 'Is Null': {
									
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId] == null) {
												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " is not null.";
											}
										}
									}
									else if (elementdoc.isResource) {
										// console.log(this.resourceObjectList);
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);

										if (obj.records != null && obj.records.length > 0 && obj.records[0][elementdoc.customFieldId] == null) {
											nodeValidate = true;
											// conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Is Not Null" + " " + elementdoc.customFieldId + '</p>';
											conditions += '<p>' + elementdoc.customFieldId + ": " + "Is  Null" + '</p>';
											resultObject.details = conditions;
										}

									}
									else {
										// if (elementdoc.value === String(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value)) {
										if (elementdoc.value === String(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value.value)) {
											nodeValidate = true;
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Equals" + " " + elementdoc.value + '</p>';
											resultObject.details = conditions;
										}
										else {
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Equals" + " " + elementdoc.value + " " + "(Failed)" + '</p>';
											resultObject.details = conditions;
											nodeValidate = false;
											//return false;
										}
									}
									break;
								}

								case 'Equals': {
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId] == elementdoc.value) {
												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " is not equal.";
											}
										}
									}
									else if (elementdoc.isResource) {
										// console.log(this.resourceObjectList);
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0 && obj.records[0][elementdoc.customFieldId] != null) {
											nodeValidate = true;
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Is Set" + " " + elementdoc.customFieldId + '</p>';
											resultObject.details = conditions;
										}
									}
									else {
										// if (elementdoc.value === String(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value)) {
										if (elementdoc.value === String(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value.value)) {
											nodeValidate = true;
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Equals" + " " + elementdoc.value + '</p>';
											resultObject.details = conditions;
										}
										else {
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Equals" + " " + elementdoc.value + " " + "(Failed)" + '</p>';
											resultObject.details = conditions;
											nodeValidate = false;
											//this.loadSave=false;
											//return false;
										}
									}
									break;
								}
								case 'Does Not Equal': {
									;
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId] != elementdoc.value) {
												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " is not equal.";
											}
										}
									}
									else if (elementdoc.isResource) {
										// console.log(this.resourceObjectList);
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0 && obj.records[0][elementdoc.customFieldId] != null) {
											nodeValidate = true;
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Is Set" + " " + elementdoc.customFieldId + '</p>';
											resultObject.details = conditions;
										}
									}
									else {
										if (elementdoc.value !== String(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value)) {
											nodeValidate = true;
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Not Equals" + " " + elementdoc.value + '</p>';
											resultObject.details = conditions;
											// console.log('add result in right section array');

										}
										else {
											conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + ": " + "Not Equals" + " " + elementdoc.value + " " + "(Failed)" + '</p>';
											resultObject.result = conditions;
											nodeValidate = false;
											//return false;
										}
									}
									break;




								}
								case 'Contains': {
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId].includes(elementdoc.value)) {
												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " does not Contain";
											}
										}
									}
									else if (elementdoc.value.Contains(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value)) {
										nodeValidate = true;
										conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Contains" + " " + elementdoc.value + '</p>';
										resultObject.details = conditions;
									}
									else {
										conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Contains" + " " + elementdoc.value + " " + "(Failed)" + '</p>';
										resultObject.details = conditions;
										nodeValidate = false;
										return false;
									}
									break;
								}
								case 'Ends With': {
									;
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId].indexOf(elementdoc.value, obj.records[0][elementdoc.customFieldId].length - elementdoc.value.length) !== -1) {

												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " does not Ends with";
											}
										}
									}

									else if (elementdoc.value.indexOf(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value, elementdoc.value.length - formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value.length) !== -1) {
										nodeValidate = true;
										conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Ends With" + " " + elementdoc.value + '</p>';
										resultObject.details = conditions;
									}
									else {
										conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Ends With" + " " + elementdoc.value + " " + "(Failed)" + '</p>';
										resultObject.details = conditions;
										nodeValidate = false;
										return false;
									}
									break;
								}
								case 'Starts With': {
									;
									if (this.autoLaunched) {
										let obj = this.resourceObjectList.find(x => x.resourceId == elementdoc.resourceId);
										if (obj.records != null && obj.records.length > 0) {
											if (obj.records[0][elementdoc.customFieldId].startsWith(elementdoc.value)) {

												nodeValidate = true;
												resultObject.details = '<p> Pass </p>';
											}
											else {
												this.autoLaunchedMessage = obj.records[0][elementdoc.customFieldId] + " does not Starts with";
											}
										}
									}

									else if (elementdoc.value.startsWith(formData.group.controls[formData.fieldsvalue[elementdoc.resourceId]].value)) {
										nodeValidate = true;
										conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Starts With" + " " + elementdoc.value + '</p>';
										resultObject.details = conditions;
									}
									else {
										conditions += '<p>' + formData.fieldsname[elementdoc.resourceId] + " " + "Starts With" + " " + elementdoc.value + " " + "(Failed)" + '</p>';
										resultObject.details = conditions;
										nodeValidate = false;
										return false;
									}
									break;
								}

								default: {
									break;
								}
							}
						}
					});
					// outcomes 
					if (nodeValidate && element.outcomeKey != "" && !breakMe) {
						this.outcomeKey = element.outcomeKey;
						//const nextcon = this.connectors.find(x => x.sourceID == next.targetID && x.outcomeKey == element.outcomeKey);
						//this.Current = nextcon.targetID;
						breakMe = true;

					}
				}
			});
			if (nodeValidate && this.outcomeKey == "") {
				this.Current = next.targetID;
				this.debugResultObjectList.push(resultObject);
				this.Next(formData);
			}
			else if (nodeValidate && this.outcomeKey != "") {
				this.debugResultObjectList.push(resultObject);
				this.Next(formData);
			}
			else if (!nodeValidate) {
				var defaultoutcome = this.connectors.find(x => x.outcomeKey == this.nextnode.nodeId + "_defaultOutcomes");
				if (defaultoutcome) {
					this.outcomeKey = defaultoutcome.outcomeKey;
					this.debugResultObjectList.push(resultObject);
					this.Next(formData);
				}
				else {
					return false;
				}
			}
			else
				return false;


		}
		else if (this.nextnode.nodeType == 'Create') {
			let fieldMapping = '';
			;
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodefieldMapping = this.nextnode.component;
			const subModuleId = this.nextnode.component.subModuleId;
			resultObject.nodeName = nodefieldMapping.name;
			var query = this.nextnode.component.query;
			var query2 = query.split(" ")[4].split(",");
			if (nodefieldMapping.fieldMapping != undefined) {
				nodefieldMapping.fieldMapping.forEach((element, index) => {
					
					if (this.autoLaunched) {
						let obj = this.resourceObjectList.find(x => x.resourceId == element.resourceId);
						if (obj.records != null && obj.records.length > 0 && obj.records[0][element.value] != null)
							query2[index] = query2[index].replace(element.value, "'" + obj.records[0][element.value] + "'");
						else
							query2[index] = query2[index].replace(element.value, "''");
						//query = query.split(" ")[0]  +' '+ query.split(" ")[1]  +' '+ query.split(" ")[2]  +' '+ query.split(" ")[3] +' '+ query2;
					}
					else {
						;
						if (formData.fieldstype[element.value] == "number") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + "=" + formData.group.controls[formData.fieldsvalue[element.value]].value + '</p>'
							query = query.replace(formData.fieldsvalue[element.value], formData.group.controls[formData.fieldsvalue[element.value]].value);
						}
						else if (formData.fieldstype[element.value] == "textbox") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + "=" + formData.group.controls[formData.fieldsvalue[element.value]].value + '</p>'
							query = query.replace(formData.fieldsvalue[element.value], "'" + formData.group.controls[formData.fieldsvalue[element.value]].value + "'");
						}
						else if (formData.fieldstype[element.value] == "checkbox") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + "=" + formData.group.controls[formData.fieldsvalue[element.value]].value + '</p>'
							query = query.replace(formData.fieldsvalue[element.value], "'" + formData.group.controls[formData.fieldsvalue[element.value]].value + "'");
						}
						else if (formData.fieldstype[element.value] == "dropdown") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + "=" + (formData.group.controls[formData.fieldsvalue[element.value]].value != null ? formData.group.value[formData.fieldsvalue[element.value]].name : formData.group.value[formData.fieldsvalue[element.value]].value) + '</p>'
							query = query.replace(formData.fieldsvalue[element.value], "'" + (formData.group.controls[formData.fieldsvalue[element.value]].value != null ? formData.group.value[formData.fieldsvalue[element.value]].value : formData.group.value[formData.fieldsvalue[element.value]].value) + "'");
						}
					}
				});
				if (this.autoLaunched)
					query = query.split(" ")[0] + ' ' + query.split(" ")[1] + ' ' + query.split(" ")[2] + ' ' + query.split(" ")[3] + ' ' + query2.join(", ");
				// console.log(query);
				var Getresult = await this._flowBuilderService.queryExecutionAutomationFlow(query, subModuleId, "Create", this.recordId).toPromise();
				if (Getresult) {
					if (Getresult.statusCode == 500) {
						// console.log('Create log error in right section : ' + Getresult.responseMessage);
						resultObject.result = Getresult.responseMessage;
						resultObject.details = fieldMapping;
						if (this.autoLaunched) {
							this.autoLaunchedMessage = Getresult.responseMessage;
						}
						this.debugResultObjectList.push(resultObject);
						this.loadSave = false;
						return false;
					}
					else {
						if (this.autoLaunched) {
							this.autoLaunchedMessage = "New Record has been created!";
						}
						else {
							resultObject.result = 'Created';
							resultObject.details = fieldMapping;
							this.debugResultObjectList.push(resultObject);
						}

					}
				}
			}

			this.Current = next.targetID;
			this.Next(formData);

		}
		else if (this.nextnode.nodeType == 'Delete') {
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodefilterConditions = this.nextnode.component;
			resultObject.nodeName = nodefilterConditions.name;
			var query = this.nextnode.component.query;
			if (nodefilterConditions.filterConditions != undefined) {
				nodefilterConditions.filterConditions.forEach(element => {
					if (element.isPrimaryField) {
						query = query + this.recordId
					}
					else {
						if (formData.fieldstype[element.value] == "number")
							query = query.replace(formData.fieldsvalue[element.value], formData.group.controls[formData.fieldsvalue[element.value]].value);
						else if (formData.fieldstype[element.value] == "textbox")
							query = query.replace(formData.fieldsvalue[element.value], "'" + formData.group.controls[formData.fieldsvalue[element.value]].value + "'");

					}
				});
				var Getresult = await this._flowBuilderService.queryExecutionAutomationFlow(query, this.nextnode.component.subModuleId, "Delete", this.recordId).toPromise();
				if (Getresult) {
					if (Getresult.statusCode == 500) {
						// console.log('Delete log error in right section : ' + Getresult.responseMessage);
						resultObject.result = Getresult.responseMessage;
						this.loadSave = false;
						return false;
					}
					else {
						resultObject.result = "Deleted";
						// console.log('Delete');
					}
				}
			}

			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		else if (this.nextnode.nodeType == 'Update') {
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodefilterConditions = this.nextnode.component;
			let filterConditions = '<p>Find all Account records where:</p>';
			let fieldMapping = '<p>Update the records field values:</p>';
			resultObject.nodeName = nodefilterConditions.name;
			;
			var query = this.nextnode.component.query;
			if (nodefilterConditions.filterConditions != undefined) {
				nodefilterConditions.filterConditions.forEach(element => {
					if (element.isPrimaryField) {
						query = query + this.recordId
						//  "UPDATE tblLeads SET FirstName = val_FirstName,LastName = val_LastName WHERE Name  = Fahad123"
					}
					else if (this.autoLaunched) {
						query = query.replace(element.value, "'" + element.value + "'");
					}
					else {
						if (formData.fieldstype[element.value] == "number") {
							filterConditions += '<p>' + formData.fieldsname[element.value] + ": " + "Equals" + " " + element.value + '</p>';
							// resultObject.result=filterConditions;
							//query = query.replace("val_lead",formData.group.controls[formData.fieldsvalue[element.value.repace.("val_","")]].value)
							query = query.replace(formData.fieldsvalue[element.value], formData.group.controls[formData.fieldsvalue[element.value]].value);
						}
						else if (formData.fieldstype[element.value] == "textbox") {
							filterConditions += '<p>' + formData.fieldsname[element.value] + ": " + "Equals" + " " + formData.group.controls[formData.fieldsvalue[element.value]].value + '</p>';
							//resultObject.result=filterConditions;
							query = query.replace(formData.fieldsvalue[element.value], "'" + formData.group.controls[formData.fieldsvalue[element.value]].value + "'");
						}
						else if (formData.fieldstype[element.value] == "dropdown") {
							filterConditions += '<p>' + formData.fieldsname[element.value] + ": " + "Equals" + " " + (formData.group.controls[formData.fieldsvalue[element.value]].value != null ? formData.group.controls[formData.fieldsvalue[element.value]].value.value : formData.group.controls[formData.fieldsvalue[element.value]].value) + '</p>';
							//resultObject.result=filterConditions;
							query = query.replace(formData.fieldsvalue[element.value], "'" + (formData.group.controls[formData.fieldsvalue[element.value]].value != null ? formData.group.controls[formData.fieldsvalue[element.value]].value.value : formData.group.controls[formData.fieldsvalue[element.value]].value) + "'");
						}
					}


				});
				nodefilterConditions.fieldMapping.forEach(element => {
					//  "UPDATE tblLeads SET FirstName = val_FirstName,LastName = val_LastName WHERE Name  = Fahad123"
					if (this.autoLaunched) {
						let obj = this.resourceObjectList.find(x => x.resourceId == element.resourceId);

						if (obj.records.length > 0 && obj.records[0][element.value] != null && obj.records[0][element.value] != "") {
							query = query.replace('val_' + element.value, "'" + obj.records[0][element.value] + "'");
						}
						else
							query = query.replace('val_' + element.value, "''");

					}
					else {
						if (formData.fieldstype[element.value] == "number") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + "=" + formData.group.controls[formData.fieldsvalue[element.value]].value + '</p>';
							query = query.replace(formData.fieldsvalue[element.value], formData.group.controls[formData.fieldsvalue[element.value]].value);
						}
						else if (formData.fieldstype[element.value] == "textbox") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + "=" + formData.group.controls[formData.fieldsvalue[element.value]].value + '</p>';
							query = query.replace(formData.fieldsvalue[element.value], "'" + formData.group.controls[formData.fieldsvalue[element.value]].value + "'");
						}
						else if (formData.fieldstype[element.value] == "dropdown") {
							fieldMapping += '<p>' + formData.fieldsname[element.value] + ": " + "=" + " " + (formData.group.controls[formData.fieldsvalue[element.value]].value != null ? formData.group.controls[formData.fieldsvalue[element.value]].value.value : formData.group.controls[formData.fieldsvalue[element.value]].value) + '</p>';
							//resultObject.result=filterConditions;
							query = query.replace(formData.fieldsvalue[element.value], "'" + (formData.group.controls[formData.fieldsvalue[element.value]].value != null ? formData.group.controls[formData.fieldsvalue[element.value]].value.value : formData.group.controls[formData.fieldsvalue[element.value]].value) + "'");
						}
					}
				});
				resultObject.details = filterConditions.concat(fieldMapping);
				//filterConditions.concat(fieldMapping);
				;
				var Getresult = await this._flowBuilderService.queryExecutionAutomationFlow(query, this.nextnode.component.subModuleId, "Update", this.recordId).toPromise();
				if (Getresult) {
					if (Getresult.statusCode == 500) {
						resultObject.result = Getresult.responseMessage;
						// console.log('Update log error in right section:' + Getresult.responseMessage);
						if (this.autoLaunched) {
							this.autoLaunchedMessage = Getresult.responseMessage;
						}
						this.loadSave = false;
						return false;
					}
					else {
						if (this.autoLaunched) {
							this.autoLaunchedMessage = "Record Updated has been successfully!";
						}
						else {
							resultObject.result = '<p>This Record can not be Updated </p>';
							this.toastrSerivce.error("This Record can not be Updated ");
						}

					}
				}
			}

			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		else if (this.nextnode.nodeType == 'Get') {
			;
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodeConditions = this.nextnode.component;
			resultObject.nodeName = nodeConditions.name;
			var query = this.nextnode.component.query;
			nodeConditions.filterConditions.forEach(element => {
				if (element.isPrimaryField) {
					query = query + this.recordId
				}
				else {
					if (formData != null) {
						if (formData.fieldstype[element.value] == "number")
							query = query.replace(formData.fieldsvalue[element.value], formData.group.controls[formData.fieldsvalue[element.value]].value);
						else if (formData.fieldstype[element.value] == "textbox")
							query = query.replace(formData.fieldsvalue[element.value], "'" + formData.group.controls[formData.fieldsvalue[element.value]].value + "'");
					}
				}
			});
			;
			//	query="SELECT Type_of_Meter_Installation,Test_Unique,ObjectId,Street,State,SF_setter_id,Service_Territory_Text,Salutation,LeadOwnerSFId,Referred_By,Referral_Owner,Lead_Ref_ID,QueueId,pull_stage,Proposed_Generator_Interconnection,Premium,Preferred_Language,Phone,Other_Non_Qualifying_Reason,Number_of_Meters,Non_Qualifying_Explanation,Next_Pull,New_Construction_without_a_Meter,New_Construction,Name,ModifyAt,MobilePhone,Method_of_Generation,StatusName,LeadSourceName,setter_id,OwnerName,Description,Last_Text_Received_Date,Last_Pulled_By,Last_Pull,LastName,LastModifiedById,Is_Utility_Bill_Attached,Homeowner,FirstName,Facebook_Lead_ID,External_ID,EmploymentType,Email,Do_Meters_need_to_be_Aggregated,Design_Notes,DELETE_Update_Lead_Owner,Credit_Threshold_Met,CreatedAt,CreatedById,Country,Connection,Company,City,Campaign_Name,Campaign_ID,Aware_of_Solar_Tax_Credits_ITC,Adset_Name,Adset_ID,Address_Link,Address,Ad_Name,Ad_Id,AC_Voltage,PostalCode,Website,Utility_Company,Type_of_Meter_Installation,Test_Unique,ObjectId,Street,State,SF_setter_id,Service_Territory_Text,Salutation,LeadOwnerSFId,Referred_By,Referral_Owner,Lead_Ref_ID,QueueId,pull_stage,Proposed_Generator_Interconnection,Premium,Preferred_Language,Phone,Other_Non_Qualifying_Reason,Number_of_Meters,Non_Qualifying_Explanation,Next_Pull,New_Construction_without_a_Meter,New_Construction,Name,ModifyAt,MobilePhone,Method_of_Generation,StatusName,LeadSourceName,setter_id,OwnerName,Description,Last_Text_Received_Date,Last_Pulled_By,Last_Pull,LastName,LastModifiedById,Is_Utility_Bill_Attached,Homeowner,FirstName,Facebook_Lead_ID,External_ID,EmploymentType,Email,Do_Meters_need_to_be_Aggregated,Design_Notes,DELETE_Update_Lead_Owner,Credit_Threshold_Met,CreatedAt,CreatedById,Country,Connection,Company,City,Campaign_Name,Campaign_ID,Aware_of_Solar_Tax_Credits_ITC,Adset_Name,Adset_ID,Address_Link,Address,Ad_Name,Ad_Id,AC_Voltage,PostalCode,Website,Utility_Company,Type_of_Meter_Installation,Test_Unique,ObjectId,Street,State,SF_setter_id,Service_Territory_Text,Salutation,LeadOwnerSFId,Referred_By,Referral_Owner,Lead_Ref_ID,QueueId,pull_stage,Proposed_Generator_Interconnection,Premium,Preferred_Language,Phone,Other_Non_Qualifying_Reason,Number_of_Meters,Non_Qualifying_Explanation,Next_Pull,New_Construction_without_a_Meter,New_Construction,Name,ModifyAt,MobilePhone,Method_of_Generation,StatusName,LeadSourceName,setter_id,OwnerName,Description,Last_Text_Received_Date,Last_Pulled_By,Last_Pull,LastName,LastModifiedById,Is_Utility_Bill_Attached,Homeowner,FirstName,Facebook_Lead_ID,External_ID,EmploymentType,Email,Do_Meters_need_to_be_Aggregated,Design_Notes,DELETE_Update_Lead_Owner,Credit_Threshold_Met,CreatedAt,CreatedById,Country,Connection,Company,City,Campaign_Name,Campaign_ID,Aware_of_Solar_Tax_Credits_ITC,Adset_Name,Adset_ID,Address_Link,Address,Ad_Name,Ad_Id,AC_Voltage,PostalCode,Website,Utility_Company,Type_of_Meter_Installation,Test_Unique,ObjectId,Street,State,SF_setter_id,Service_Territory_Text,Salutation,LeadOwnerSFId,Referred_By,Referral_Owner,Lead_Ref_ID,QueueId,pull_stage,Proposed_Generator_Interconnection,Premium,Preferred_Language,Phone,Other_Non_Qualifying_Reason,Number_of_Meters,Non_Qualifying_Explanation,Next_Pull,New_Construction_without_a_Meter,New_Construction,Name,ModifyAt,MobilePhone,Method_of_Generation,StatusName,LeadSourceName,setter_id,OwnerName,Description,Last_Text_Received_Date,Last_Pulled_By,Last_Pull,LastName,LastModifiedById,Is_Utility_Bill_Attached,Homeowner,FirstName,Facebook_Lead_ID,External_ID,EmploymentType,Email,Do_Meters_need_to_be_Aggregated,Design_Notes,DELETE_Update_Lead_Owner,Credit_Threshold_Met,CreatedAt,CreatedById,Country,Connection,Company,City,Campaign_Name,Campaign_ID,Aware_of_Solar_Tax_Credits_ITC,Adset_Name,Adset_ID,Address_Link,Address,Ad_Name,Ad_Id,AC_Voltage FROM tblLeads WHERE Name  = 'Fahad'";
			var Getresult = await this._flowBuilderService.queryExecutionAutomationFlow(query, this.nextnode.component.subModuleId, "Get", this.recordId).toPromise();

			if (Getresult) {

				if (Getresult.statusCode == 500) {
					resultObject.result = Getresult.statusCode;
					// console.log('Get log error in right section : ' + Getresult.responseMessage);
					return false;
				}
				else {
					;

					// console.log(Getresult.result);
					if (this.nextnode.component.recordVariableId != null) {
						this.resourceObjectList.forEach(element => {
							if (element.resourceId == this.nextnode.component.recordVariableId)
								element.records = Getresult.result;
						});
						// console.log(this.resourceObjectList);
						if (this.nextnode.component.howManyToStore == 'Allrecords') {
							if (this.collectionObjectList == null) {
								this.collectionObjectList = [];
							}
							let collectionObject = new CollectionObject();
							collectionObject.nodeType = this.nextnode.nodeType;
							collectionObject.loopCollectionName = this.nextnode.nodeId;
							collectionObject.records = Getresult.result;
							this.collectionObjectList.push(collectionObject);
						}
					}
					else {
						;
						var collectionobj = this.collectionObjectList.find(a => a.loopCollectionName == this.nextnode.nodeId);
						if (collectionobj != null) {
							this.collectionObjectList.forEach((value, index) => {
								if (value.loopCollectionName == collectionobj.loopCollectionName)
									this.collectionObjectList.splice(index, 1);
							});
						}
						if (Getresult.result.length == 0)
							this.loopflow = null;
						let collectionObject = new CollectionObject();
						collectionObject.nodeType = this.nextnode.nodeType;
						collectionObject.loopCollectionName = this.nextnode.nodeId;
						collectionObject.records = Getresult.result;
						;
						this.collectionObjectList.push(collectionObject);
					}

					resultObject.result = 'Get';
					// console.log('Get');

				}
			}
			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		//"Loop"
		else if (this.nextnode.nodeType == 'Loop') {
			;
			let resultObject = new DebugResultObject();

			resultObject.nodeType = this.nextnode.nodeType;
			const nodeLoop = this.nextnode.component;
			resultObject.nodeName = nodeLoop.name;
			var collectionobj = this.collectionObjectList.find(a => a.loopCollectionName == nodeLoop.loopCollection);
			if (collectionobj && collectionobj.records && collectionobj.records.length == 0) {
				next = this.connectors.find(x => x.sourceID == next.targetID && x.isBreakAwayCondition);
			}
			else {
				if (this.loopflow == null || this.loopflow == undefined) {
					this.loopflow = new LoopFlow();
					this.loopflow.currentIndex = 0;
					this.loopflow.loopCollectionId = this.nextnode.nodeId;
					this.loopflow.length = collectionobj.records.length;

				}
				if (this.loopflow != null && this.loopflow.currentIndex == this.loopflow.length) {
					next = this.connectors.find(x => x.sourceID == this.Current && x.isBreakAwayCondition);
					this.loopflow = null;

				} else {
					next = this.connectors.find(x => x.sourceID == this.Current && !x.isBreakAwayCondition);

				}
			}
			// console.log('end LOPPPPP ');
			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		//"Filter"
		else if (this.nextnode.nodeType == 'Filter') {
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodeFilter = this.nextnode.component;
			resultObject.nodeName = nodeFilter.name;
			nodeFilter.filterCollectionConditions.forEach(element => {
				this.collectionObjectList.forEach(collectionarray => {
					if (collectionarray.loopCollectionName == this.nextnode.component.collection) {
						collectionarray.records = collectionarray.records.filter(a => a[element.field] == element.value);
					}
				});
			});
			// console.log(this.collectionObjectList);
			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		else if (this.nextnode.nodeType == 'Sort') {
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodeSort = this.nextnode.component;
			resultObject.nodeName = nodeSort.name;
			if (nodeSort.sortConditions != null) {
				// console.log('sort > start', this.collectionObjectList);
				nodeSort.sortConditions.forEach(element => {
					this.collectionObjectList.forEach(collectionarray => {
						if (collectionarray.loopCollectionName == this.nextnode.component.collectionVariable) {
							if (element.sortOrder == "1")
								collectionarray.records = collectionarray.records.sort((a, b) => (a[element.sortBy] > b[element.sortBy]) ? 1 : -1);
							else
								collectionarray.records = collectionarray.records.sort((a, b) => (a[element.sortBy] > b[element.sortBy]) ? -1 : 1);
							if (this.nextnode.component.keepCount >= 1) {
								collectionarray.records = collectionarray.records.slice(0, this.nextnode.component.keepCount);
							}
						}
					});
				});
				this.collectionObjectList.forEach(collectionarray => {
					if (collectionarray.loopCollectionName == this.nextnode.component.collectionVariable) {
						if (this.nextnode.component.keepCount >= 1) {
							collectionarray.records = collectionarray.records.slice(0, this.nextnode.component.keepCount);
						}
					}
				});
			}
			// console.log('sort > start', this.collectionObjectList);
			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		else if (this.nextnode.nodeType == 'Assign') {
			;
			let resultObject = new DebugResultObject();
			resultObject.nodeType = this.nextnode.nodeType;
			const nodeAssignmentss = this.nextnode.component;
			resultObject.nodeName = nodeAssignmentss.name;
			nodeAssignmentss.variableAssignments.forEach(element => {
				if (element.isResource && this.autoLaunched) {
					let obj = this.resourceObjectList.find(x => x.resourceId == element.variable);
					if (element.value != null) {
						obj.records[0][element.customFieldId] = element.value;
					}
					else
						obj.records[0][element.customFieldId] = "";
				}
				else
					formData.group.controls[formData.fieldsvalue[element.variable]].setValue(element.value);
			});
			// console.log(formData);
			resultObject.result = 'Assign';

			this.debugResultObjectList.push(resultObject);
			this.Current = next.targetID;
			this.Next(formData);
		}
		else if (this.nextnode.nodeType == 'Screen') {
			;
			if (next) {
				this.loadSave = false;
				this.NextScreenView();
			}
		}
	}
	prevScreen(event) {
		if (event) {
			this.Prev();
		}

	}
	nextScreen(event) {
		if (event) {
			this.Next(event);
		}
	}
	saveExecutionForm() {
		// console.log(this.executionForm);
	}


}


export class DebugResultObject {
	nodeName: any;
	nodeType: any;
	result: any;
	input: any;
	outPut: any;
	details: any;
}
export class CollectionObject {
	loopCollectionName: any;
	nodeType: any;
	records: any;
}
export class ResourceObject {
	resourceId: any;
	records: any;
}
export class LoopFlow {
	loopCollectionId: any;
	currentIndex: any;
	length: any;
}




