import { ModalDirective } from "ngx-bootstrap/modal";
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  HostListener,
} from "@angular/core";
import {
  CommandManagerModel,
  DiagramComponent,
  HistoryEntry,
  PageSettingsModel,
  ShapeAnnotationModel,
} from "@syncfusion/ej2-angular-diagrams";
import {
  PathModel,
  Diagram,
  NodeModel,
  UndoRedo,
  NativeModel,
  ConnectorModel,
  PointPortModel,
  Connector,
  FlowShapeModel,
  SymbolInfo,
  IDragEnterEventArgs,
  SnapSettingsModel,
  MarginModel,
  TextStyleModel,
  StrokeStyleModel,
  OrthogonalSegmentModel,
  Node,
  PaletteModel,
  PointModel,
  SelectorModel,
  PortVisibility,
  IElement,
  randomId,
  cloneObject,
  UserHandleModel,
  SelectorConstraints,
  ToolBase,
  MoveTool,
  MouseEventArgs,
  ConnectorConstraints,
  PortConstraints,
  Port,
  ConnectorDrawingTool,
  DiagramTools,
  IDropEventArgs,
  IDraggingEventArgs,
} from "@syncfusion/ej2-diagrams";
import { ExpandMode } from "@syncfusion/ej2-navigations";
import { paletteIconClick } from "../diagram-common";
import {
  AnnotationConstraints,
  IDoubleClickEventArgs,
  ICollectionChangeEventArgs,
  SnapConstraints,
  NodeConstraints,
} from "@syncfusion/ej2-diagrams";
import { ListView } from "@syncfusion/ej2-lists";
import { ScreenComponent } from "../screen/screen.component";
import { ActionComponent } from "../action/action.component";
import { SubflowComponent } from "../subflow/subflow.component";
import { AssignComponent } from "../assign/assign.component";
import { DecisionComponent } from "../decision/decision.component";
import { LoopComponent } from "../loop/loop.component";
import { SortComponent } from "../sort/sort.component";
import { CreateComponent } from "../create/create.component";
import { UpdateComponent } from "../update/update.component";
import { GetComponent } from "../get/get.component";
import { DeleteComponent } from "../delete/delete.component";
import { RollbackComponent } from "../rollback/rollback.component";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { FormArray, FormGroup } from "@angular/forms";
import { FlowBuilderService } from "../flow-builder.service";
import { JsonHubProtocol } from "@aspnet/signalr";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterComponent } from "../filter/filter.component";
import { elementClosest } from "@fullcalendar/core/util/dom-manip";
import { DecisionOutcomeMappingComponent } from "../decision-outcome-mapping/decision-outcome-mapping.component";
import { ResourcesListComponent } from "../resources";
import { LoopConnectorModalComponent } from "../loop-connector-modal/loop-connector-modal.component";
import { Console } from "console";
import { PauseComponent } from "../pause/pause.component";

Diagram.Inject(UndoRedo);
@Component({
  selector: "app-flow-builder-view",
  templateUrl: "./flow-builder-view.component.html",
  styleUrls: ["./flow-builder-view.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FlowBuilderViewComponent implements OnInit, AfterViewInit {
  @ViewChild("diagram", { static: false })
  public diagram: DiagramComponent;
  flowId: any;
  isEdit: boolean = false;
  pageTitle: string = "Add Flow";
  public pageSettings: PageSettingsModel;
  @ViewChild("screen", { static: false }) screen: ScreenComponent;
  @ViewChild("action", { static: false }) action: ActionComponent;
  @ViewChild("subFlow", { static: false }) subFlow: SubflowComponent;
  @ViewChild("assign", { static: false }) assign: AssignComponent;
  @ViewChild("decision", { static: false })
  decisionComponenet: DecisionComponent;
  @ViewChild("loop", { static: false }) loop: LoopComponent;
  @ViewChild("sort", { static: false }) sort: SortComponent;
  @ViewChild("create", { static: false }) create: CreateComponent;
  @ViewChild("update", { static: false }) update: UpdateComponent;
  @ViewChild("get", { static: false }) get: GetComponent;
  @ViewChild("delete", { static: false }) delete: DeleteComponent;
  @ViewChild("rollback", { static: false }) rollBack: RollbackComponent;
  @ViewChild("FlowTypeSelection", { static: false })
  modalFlowSelection: ModalDirective;
  @ViewChild("SaveModal", { static: false }) SaveModal: ModalDirective;
  @ViewChild("filter", { static: false }) filter: FilterComponent;
  @ViewChild("outcomeMapping", { static: false })
  outcomeMapping: DecisionOutcomeMappingComponent;
  @ViewChild("resourcelist", { static: false })
  resourcelist: ResourcesListComponent;
  @ViewChild("loopConnectorModal", { static: false })
  loopConnectorModal: LoopConnectorModalComponent;
  @ViewChild("pause", { static: false })
  pause: PauseComponent;
  //Undo-Redo
  backupList: any[] = [];
  genericList: any[] = [];
  eventList: any[] = [];
  //Undo-Redo
  title: string = "New Flow";
  flowAutomationForm: FormGroup;
  isFirstConnector: boolean = true;
  flowTypeProperty: any = "";
  genericObject: any = "";
  constructor(
    private service: FlowBuilderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.flowAutomationForm = this.service.FlowAutomationForm();
    this.onNodeValueChange();
    //this.assignPalettes();
    this.route.paramMap.subscribe((params) => {
      this.flowId = params.get("id");
      if (this.flowId > 0) {
        this.getAutomationFlowById(this.flowId);
        // console.log("onload form =>", this.flowAutomationForm);
        this.pageTitle = "Edit Flow";
        this.isEdit = true;
      } else {
        this.nodes = [
          {
            id: "start",
            offsetX: 600,
            offsetY: 30,
            constraints:
              NodeConstraints.Default &
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
              ~NodeConstraints.ResizeNorthEast,
            style: { fill: "#FFB2B2", strokeColor: "#FFB2B2" },
            width: 60,
            height: 60,
            shape: {
              type: "HTML",
              content:
                '<svg version="1.1" height="80" width="65" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 461.001 500.001" style="enable-background:new 0 0 461.001 461.001;" xml:space="preserve"><g><path style="fill:cadetblue;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/></g><text x="110" y="500"  font-size="8em" fill="black">Start</text></svg>',
            },
            annotations: [{ constraints: AnnotationConstraints.ReadOnly }],
          },
        ];
      }
    });
  }
  onNodeValueChange() {
    (this.flowAutomationForm.get("nodes") as FormArray).valueChanges.subscribe(
      (value) => {
        if (value) {
          value.forEach((obj, index) => {
            if (obj.component) {
              let node: any = this.diagram.getObject(obj.nodeId);
              if (node instanceof Node) {
                node.annotations[0].content = obj.component.name;
                node.annotations[0].margin = {
                  bottom: 0,
                  top: 56,
                  left: 0,
                  right: 0,
                };
                node.annotations[0].horizontalAlignment = "Center";
                node.annotations[0].verticalAlignment = "Bottom";
                node.annotations[0].style.color = "gray";
                node.annotations[0].style.textAlign = "Center";
                node.annotations[0].style.textWrapping = "NoWrap";
                node.annotations[0].style.fill = "white";
                node.annotations[0].style.fontSize = 10;
                this.diagram.dataBind();
              }
            }
          });
        }
      }
    );
  }



  ngAfterViewInit(): void {
    if (this.flowId == null) {
      this.modalFlowSelection.show();
    }
  }
  getAutomationFlowById(id: any) {
    this.service.GetById(id).subscribe((response: any) => {
      if (response) {
        this.service.FlowAutomationPatchValue(
          this.flowAutomationForm,
          response
        );
        // console.log("full form after patch value =>", this.flowAutomationForm);
         console.log(
          "full form after patch value =>",
          this.flowAutomationForm.value
        );
        response.nodes.forEach((obj, index) => {
          this.diagram.add(this.service.GetNode(obj));
        });
        // console.log(this.nodes);
        if(response.connectors){
            response.connectors.forEach((obj, index) => {
          // console.log(obj);
          // console.log(response.nodes, "dada");
          //let test = this.service.ReturnOutcomeList(this.flowAutomationForm, obj.sourceId);

          obj.id = "connector_" + obj.id;
          obj.isNew = false;
          if (obj.outcomeKey != null && obj.outcomeKey != "") {
            let node = this.flowAutomationForm.value.nodes.find(
              (x) => x.nodeId == obj.sourceID
            );
            if (node != null) {
              let component = node.component;
              let outcome = component.outcomes.find(
                (x) => x.outcomeKey == obj.outcomeKey
              );
              const display = outcome != null ? outcome.name : "";
              obj.annotations = [
                {
                  offset: 0.6,
                  content: display,
                  style: { color: "gray", fontSize: 10, fill: "white" },
                },
              ];
            }
          }
          this.diagram.add(obj);
        });
        }
      
        // console.log(this.connectors);
        if (response.flowType == "ScreenFlow") {
          this.logicshapes = this.logicshapes.filter((x) => x.id != "Pause");
          this.assignPalettes();
        } else if (response.flowType == "AutolaunchedFlow") {
          this.flowshapes = this.flowshapes.filter((x) => x.id != "Screen");
          this.assignPalettes();
        }
      }
    });
  }
  selectedType(event) {
    if (event) {
      this.flowTypeProperty = event;
      if (this.flowTypeProperty == "ScreenFlow") {
        this.logicshapes = this.logicshapes.filter((x) => x.id != "Pause");
        this.assignPalettes();
      } else if (this.flowTypeProperty == "AutolaunchedFlow") {
        this.flowshapes = this.flowshapes.filter((x) => x.id != "Screen");
        this.assignPalettes();
        this.flowAutomationForm.get("isAutolaunched").setValue(true);
      }
      this.flowType.setValue(event);
      this.flowType.markAsDirty();
    }
  }

  assignPalettes() {
    this.palettes = [
      {
        id: "Interaction",
        expanded: true,
        symbols: this.flowshapes,
        iconCss: "shapes",
        title: "Interaction",
      },
      {
        id: "Logic",
        expanded: true,
        symbols: this.logicshapes,
        iconCss: "shapes",
        title: "Logic",
      },
      {
        id: "Data",
        expanded: true,
        symbols: this.datashapes,
        iconCss: "shapes",
        title: "Data",
      },
      //datashapes
      // {
      //   id: "connectors",
      //   expanded: true,
      //   symbols: this.connectorSymbols,
      //   iconCss: "shapes",
      //   title: "Connectors",
      // },
    ];
  }

  showSave() {
    // this.formConnectors.clear();
    // this.formNodes.clear();
    // this.diagram.connectors.forEach((obj, index) => {
    //   let data = { id: null, automationFlowId: null, sourceId: obj.sourceID, targetId: obj.targetID, connectorType: obj.type, statusId: 1001 };
    //   this.formConnectors.push(this.service.BuildConnector(data));
    // });
    this.diagram.nodes.forEach((node, index) => {
      this.formNodes.controls
        .find((n) => n.get("nodeId").value == node.id)
        .get("offsetX")
        .setValue(node.offsetX);
      this.formNodes.controls
        .find((n) => n.get("nodeId").value == node.id)
        .get("offsetY")
        .setValue(node.offsetY);
    });
    this.SaveModal.show();
  }
  source: Diagram | SelectorModel;
  position: PointModel;
  count: number;
  public shape: PathModel = {
    type: "Path",
    data: "M35.2441,25 L22.7161,49.9937 L22.7161,0.00657536 L35.2441,25 z M22.7167,25 L-0.00131226,25 M35.2441,49.6337 L35.2441,0.368951 M35.2441,25 L49.9981,25",
  };
  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];
  public getCustomTool: Function = this.getTool.bind(this);
  public selectedItem: NodeModel | ConnectorModel;
  public selectedNode: any = null;
  public node: any = null;
  public type: any = null;

  public getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (this.diagram.selectedItems.nodes.length > 0) {
      this.selectedItem = this.diagram.selectedItems.nodes[0];
      // console.log("selected node", this.selectedItem);
    } else if (this.diagram.selectedItems.connectors.length > 0) {
      this.selectedItem = this.diagram.selectedItems.connectors[0];
    } else {
      this.selectedItem = null;
    }
    if (action === "edge") {
      this.diagram.drawingObject = {
        type: "Orthogonal",
      };
      if (this.diagram.tool == DiagramTools.DrawOnce) {
        this.diagram.tool = 3;
      } else this.diagram.tool = DiagramTools.DrawOnce;

      let customConnectorDrawingTool = new CustomConnectorDrawingTool(
        this.diagram.commandHandler,
        "ConnectorSourceEnd",
        this.diagram.drawingObject as Connector
      );
      return customConnectorDrawingTool;
    }
    if (this.selectedItem) {
      if (action == "btnDelete") {
        let itemToBackup = this.genericList.pop();
        this.backupList.push(itemToBackup);
        this.removeNode(this.selectedItem.id);
        this.diagram.remove(this.selectedItem);
      }
    }

    return tool;
  }

  undo() {
    // let itemToBackup = this.genericList.pop()
    // // console.log(itemToBackup);
    // this.backupList.push(itemToBackup);
    // this.removeNode(itemToBackup.value.nodeId);
    // let node =  this.diagram.nodes.find((x)=>(x.id==itemToBackup.value.nodeId));
    // this.diagram.remove(node);

    // let lastAddedItem=this.backupList.pop();
    // if(lastAddedItem.propName='nodes'){
    //   this.diagram.add(this.service.GetNode(lastAddedItem.value));
    //   this.formNodes.push(lastAddedItem);
    // }

    this.diagram.undo();
    let diagramLength = this.diagram.nodes.length;
    if (diagramLength > 1) {
      let node: any = this.diagram.nodes[diagramLength - 1];
      if (
        this.flowAutomationForm.value.nodes.filter(
          (x) => x.nodeId == node.properties.id
        ).length < 1
      ) {
        this.formNodes.push(
          this.genericList.find((x) => x.value.nodeId == node.properties.id)
        );
      }
    }

    // 
  }

  redo() {
    //   ;
    //   let lastAddedItem=this.backupList.pop();
    //   // console.log(lastAddedItem.value);
    //  if(lastAddedItem.propName='nodes'){
    // this.diagram.add(this.service.GetNode(lastAddedItem.value));
    //   this.formNodes.push(lastAddedItem);
    //  }
    this.diagram.redo();
    let diagramLength = this.diagram.nodes.length;
    if (diagramLength > 1) {
      let node: any = this.diagram.nodes[diagramLength - 1];
      if (
        this.flowAutomationForm.value.nodes.filter(
          (x) => x.nodeId == node.properties.id
        ).length < 1
      ) {
        this.formNodes.push(
          this.genericList.find((x) => x.value.nodeId == node.properties.id)
        );
      }
    }
  }

  public handles: UserHandleModel[] = [
    {
      name: "btnDelete",
      pathColor: "red",
      backgroundColor: "white",
      pathData:
        "M310.082,245.553l51.883-51.877c3.686-3.678,5.755-8.669,5.755-13.885c0-5.208-2.069-10.206-5.755-13.885" +
        "l-36.769-36.759c-7.662-7.664-20.105-7.664-27.768,0l-51.87,51.876l-51.885-51.876c-7.662-7.664-20.089-7.664-27.768,0" +
        "l-36.753,36.759c-3.688,3.68-5.756,8.678-5.756,13.885c0,5.216,2.068,10.207,5.756,13.885l51.876,51.877l-51.884,51.875" +
        "c-7.672,7.681-7.672,20.108,0,27.779l36.753,36.761c7.679,7.662,20.106,7.662,27.769,0l51.893-51.885l51.878,51.885" +
        "c7.662,7.662,20.106,7.662,27.768,0l36.769-36.761c7.655-7.671,7.655-20.098,0-27.779L310.082,245.553z" +
        "M245.556,0C110.16,0,0,110.162,0,245.564c0,135.387,110.16,245.547,245.556,245.547" +
        "c135.394,0,245.555-110.16,245.555-245.547C491.111,110.162,380.95,0,245.556,0z M245.556,438.198" +
        "c-106.218,0-192.641-86.424-192.641-192.633c0-106.233,86.423-192.648,192.641-192.648c106.217,0,192.639,86.416,192.639,192.648" +
        "C438.195,351.773,351.773,438.198,245.556,438.198z",
      size: 26,
      side: "Right",
      offset: 0,
      visible: true,
      horizontalAlignment: "Left",
      verticalAlignment: "Top",
      disableConnectors: true,
      margin: { top: 0, bottom: -10, left: -25, right: 0 },
    },
    {
      name: "edge",
      pathData:
        "M 61.24 100 L 61.24 61.92 L 0 61.92 L 0 32.92 L 61.24 32.92 L 61.24 0 L 100 49.99 z",
      visible: true,
      offset: 0,
      size: 14,
      side: "Bottom",
      disableConnectors: true,
      margin: { top: -20, bottom: 0, left: 30, right: 0 },
    },
  ];
  public selectedItems: SelectorModel = {
    constraints: SelectorConstraints.All,
    //disableConnectors:true,
    userHandles: this.handles,
  };
  // return form status  is dirty
  public canDeactivate(): boolean {
    if (this.flowAutomationForm.dirty) {
      return false;
    }
    return true;
  }
  @HostListener("window:beforeunload", ["$event"])
  public handleBeforeUnload($event: any): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }

  public documentShape: NativeModel = {
    content:
      '<div builder_platform_interaction-node_startnode="" title="The flow starts when a user or app launches the flow." class="start-node-container slds-is-absolute slds-text-align_center jtk-managed jtk-draggable jtk-droppable" style="left: 50px; top: 50px" id="51a3cf3e-2cdd-4b88-9aff-21ce221617cb"> <div builder_platform_interaction-node_startnode="" builder_platform_interaction-elementicon_elementicon-host=""> <div builder_platform_interaction-elementicon_elementicon=""> <div builder_platform_interaction-elementicon_elementicon="" class="slds-icon-utility-right background-green slds-icon__container_circle slds-icon_container"> <div><svg focusable="false" data-key="right" aria-hidden="true" viewBox="0 0 52 52" class="slds-icon"> <g> <path d="M14 43.7V8.3c0-1 1.3-1.7 2.2-.9l21.2 17.3c.8.6.8 1.9 0 2.5L16.2 44.7c-.9.7-2.2.1-2.2-1z"> </path> </g> </svg></div></div><div builder_platform_interaction-node_startnode="" class="start-node-box"> <div builder_platform_interaction-node_startnode="" class="slds-p-top_x-large slds-p-bottom_x-small"> <div builder_platform_interaction-node_startnode="" class="slds-text-heading_small slds-truncate slds-m-bottom_xx-small">Start</div></div></div></div></div></div>',
    type: "HTML",
  };
  public selectionChange(args) {
    //// console.log("selectionChange Clicked")
    if (args.state === "Changed" && args.type === "Addition") {
      if (args.newValue[0] instanceof Node && args.newValue[0].id === "start")
        // Hides the userhandle for specified node id
        this.diagram.selectedItems.userHandles[0].visible = false;
      else {
        // Sets the visible property to true
        this.diagram.selectedItems.userHandles[0].visible = true;
      }
    }
  }
  public collectionChange(args: ICollectionChangeEventArgs) {
    if (args.state === "Changed") {
      if (args.type === "Addition") {
        const connecter: any = args.element;
        if (connecter.type && connecter.type === "Orthogonal") {
          let connect: any = args.element;
          // console.log("connector", connect);

          let data = {
            id: null,
            dbId: connect.dbId,
            outcomeKey: connect.outcomeKey,
            automationFlowId: connect.automationFlowId,
            sourceID: connect.sourceID,
            targetID: connect.targetID,
            connectorType: connect.type,
            statusId: 1001,
            isNew: connect.isNew == undefined ? true : connect.isNew,
          };
          // console.log("connect data", data);
          if (this.isFirstConnector) {
            this.formConnectors.clear();
          }
          this.formConnectors.push(this.service.BuildConnector(data));
          // console.log("connectors", this.formConnectors);
          this.isFirstConnector = false;
          if (!this.isEdit || data.isNew) {
            if (connect.sourceID.includes("Decision")) {
              // console.log("this connector screen");
              this.outcomeMapping.show(
                this.diagram,
                connect.id,
                connect.targetID,
                connect.sourceID
              );
            }
            if (connect.sourceID.includes("Loop")) {
              let isBreakAwayCondition;
              let connectorControls = (<FormArray>(
                this.flowAutomationForm.get("connectors")
              )) as FormArray;
              connectorControls.controls.forEach((element, index) => {
                if (element.value.isBreakAwayCondition) {
                  isBreakAwayCondition = element.value.isBreakAwayCondition;
                }
              });
              //let property = connectorControls.find(x => x.controls).value.isBreakAwayCondition == true;
              // console.log(connectorControls);
              if (!isBreakAwayCondition) {
                this.loopConnectorModal.show(
                  connect.targetID,
                  connect.sourceID
                );
              }

              // if(!(<FormArray>this.flowAutomationForm.get("connectors") as FormArray).controls)
              // this.loopConnectorModal.show(connect.targetID,connect.sourceID);
            }
          }
        }

        // if (connecter.propName && connecter.propName == "nodes") {
        //   let element: any = args.element;
        //   this.genericObject
        //     .get("offsetX")
        //     .setValue(element.properties.offsetX);
        //   this.genericObject
        //     .get("offsetY")
        //     .setValue(element.properties.offsetY);
        //   if (
        //     this.genericList.filter(
        //       (x) => x.value.nodeId == element.properties.id
        //     ).length < 1
        //   ) {
        //     this.genericList.push(this.genericObject);
        //   }
        //   //// console.log("From Change Collection:",this.genericObject);
        // }
      }
      if (args.type === "Removal") {
        const element: any = args.element;
        if (element.propName == "nodes") {
          let node = args.element as NodeModel;
          this.removeNode(node.id);
        }
        if (element.propName == "connectors") {
          this.formConnectors.controls.forEach((n, index) => {
            if (element.dbId == n.value.dbId) {
              this.formConnectors.removeAt(index);
            }
          });
        }
        // console.log("Form inside remove function =>", this.formNodes);
      }
    }
  }
  public doubleClick(args: IDoubleClickEventArgs): void {
    let source: any = args.source;
    let sourceId: any = source.properties.id;

    if (sourceId != null) {
      if (sourceId.includes("Screen")) {
        this.showSreenModal(sourceId);
      } else if (sourceId.includes("Action")) {
        this.showActionModal(sourceId);
      } else if (sourceId.includes("Subflow")) {
        this.showSubFlowModal(sourceId);
      } else if (sourceId.includes("Assign")) {
        this.showAssignModal(sourceId);
      } else if (sourceId.includes("Decision")) {
        this.showDecisionModal(sourceId);
      } else if (sourceId.includes("Loop")) {
        this.showLoopModal(sourceId);
      } else if (sourceId.includes("Sort")) {
        this.showSortModal(sourceId);
      } else if (sourceId.includes("Create")) {
        this.showCreateModal(sourceId);
      } else if (sourceId.includes("Update")) {
        this.showUpdateModal(sourceId);
      } else if (sourceId.includes("Get")) {
        this.showGetModal(sourceId);
      } else if (sourceId.includes("Delete")) {
        this.showDeleteModal(sourceId);
      } else if (sourceId.includes("RollBack")) {
        this.showRollBackModal(sourceId);
      } else if (sourceId.includes("Filter")) {
        this.showFilterModal(sourceId);
      } else if (sourceId.includes("Pause")) {
        this.showPauseModal(sourceId);
      }
    }
  }

  public showPauseModal(nodeId: string) {
    this.pause.showPauseModal(nodeId);
  }
  public showFilterModal(nodeId: string) {
    this.filter.showFilterModal(nodeId);
  }
  public showRollBackModal(nodeId: string) {
    this.rollBack.showRollBackModal(nodeId);
  }
  public showDeleteModal(nodeId: string) {
    this.delete.showDeleteModal(nodeId);
  }
  public showGetModal(nodeId: string) {
    this.get.showGetModal(nodeId);
  }
  public showUpdateModal(nodeId: string) {
    this.update.showUpdateModal(nodeId);
  }
  public showCreateModal(nodeId: string) {
    this.create.showCreateModal(nodeId);
  }
  public showSortModal(nodeId: string) {
    this.sort.showsortModal(nodeId);
  }
  public showLoopModal(nodeId: string) {
    this.loop.showLoopModal(nodeId);
  }
  public showDecisionModal(nodeId: string) {
    this.decisionComponenet.showDecisionModal(nodeId, this.diagram);
  }
  public showAssignModal(nodeId: string) {
    this.assign.showAssignModal(nodeId);
  }

  public showSubFlowModal(nodeId: string) {
    this.subFlow.showSubflowModal(nodeId);
  }

  public showActionModal(nodeId: string) {
    this.action.showActinModal(nodeId);
  }

  public showSreenModal(nodeId: string) {
    this.screen.show(nodeId);
  }
  public showResourceListingModal() {
    this.resourcelist.showResourceListModal();
  }

  removeNode(nodeId: string) {
    this.formNodes.controls.forEach((n, index) => {
      if (n.value.nodeId == nodeId) {
        this.formNodes.removeAt(index);
      }
    });
    this.formConnectors.controls.forEach((n, index) => {
      if (n.value.targetId == nodeId || n.value.sourceId == nodeId) {
        this.formConnectors.removeAt(index);
      }
    });
  }

  cloneNode() {
    
    if (this.selectedItem) {
      this.selectedNode = this.selectedItem;
      this.node = this.flowAutomationForm.value.nodes.find(
        (y: { nodeId: any }) => y.nodeId == this.selectedNode.properties.id
      );

      this.selectedNode.properties.id =
        this.selectedNode.properties.id + randomId();
      this.selectedNode.properties.offsetX =
        this.selectedNode.properties.offsetX + 70;
      this.selectedNode.properties.offsetY =
        this.selectedNode.properties.offsetY + 20;
      this.type = this.service.ReturnComponentType(this.selectedNode);

      let data = {
        id: null,
        automationFlowId: null,
        nodeId: this.selectedNode.properties.id,
        nodeType: this.type,
        offsetX: this.selectedNode.offsetX,
        offsetY: this.selectedNode.offsetY,
        statusId: 1001,
        component: JSON.stringify(this.node.component),
      };

      this.formNodes.push(
        this.service.BuildNode(
          JSON.parse(JSON.stringify(data)),
          this.type.toLocaleLowerCase()
        )
      );
      this.diagram.add(this.selectedNode);

      // this.diagram.copy();
      // this.diagram.paste();
      // this.diagram.dataBind();
    }

    // console.log("Copied!", this.selectedItem);
  }

  numberOnly(event): boolean {
    // var index = event.target.value.indexOf('.');
    // var len = event.target.value.length;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else if (charCode == 46) {
      //Check if the text already contains the . character
      if (event.target.value.indexOf(".") === -1) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  public getName(selectedItems: any, args: any): boolean {
    for (let i: number = 0; i < selectedItems.data.length; i++) {
      let eventName: string = selectedItems.data[i].id;
      if (eventName === args.name) {
        return true;
      }
    }
    return false;
  }

  public terminator: FlowShapeModel = { type: "Flow", shape: "Terminator" };
  public process: FlowShapeModel = { type: "Flow", shape: "Process" };
  public decision: FlowShapeModel = { type: "Flow", shape: "Decision" };
  public data: FlowShapeModel = { type: "Flow", shape: "Data" };
  public directdata: FlowShapeModel = { type: "Flow", shape: "DirectData" };

  public margin: MarginModel = { left: 25, right: 25 };
  public connAnnotStyle: TextStyleModel = { fill: "white" };
  public strokeStyle: StrokeStyleModel = { strokeDashArray: "2,2" };

  public segments: OrthogonalSegmentModel = [
    { type: "Orthogonal", direction: "Top", length: 120 },
  ];
  public segments1: OrthogonalSegmentModel = [
    { type: "Orthogonal", direction: "Right", length: 100 },
  ];

  public nodeDefaults(node: NodeModel): NodeModel {
    let obj: NodeModel = {};
    if (obj.width === undefined) {
      obj.width = 60;
    } else {
      let ratio: number = 60 / obj.width;
      obj.width = 60;
      obj.height *= ratio;
    }
    obj.style = { fill: "#357BD2", strokeColor: "white" };
    obj.annotations = [{ style: { color: "white", fill: "transparent" } }];
    obj.ports = getPorts(node);
    return obj;
  }
  public connDefaults(obj: Connector): void {
    if (obj.id.indexOf("connector") !== -1) {
      obj.type = "Orthogonal";
      obj.targetDecorator = { shape: "Arrow", width: 10, height: 10 };
    }
  }
  public created(): void {}
  public interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
    9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  ];

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None,
  };
  public constraints: AnnotationConstraints;

  public dragEnter(args: IDragEnterEventArgs): void {
    // console.log("drap enter args =>", args);
    let obj: NodeModel = args.element as NodeModel;
    // console.log("drap enter obj =>", obj);
    if (obj && obj.width && obj.height) {
      let oWidth: number = obj.width;
      let oHeight: number = obj.height;
      let ratio: number = 60 / obj.width;
      obj.width = 60;
      obj.constraints =
        NodeConstraints.Default &
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
      // obj.constraints = SelectorConstraints.All & ~SelectorConstraints.Rotate & ~SelectorConstraints.ResizeAll & ~SelectorConstraints.ResizeNorth & ~SelectorConstraints.ResizeSouth & ~SelectorConstraints.ResizeWest & ~SelectorConstraints.ResizeEast & ~SelectorConstraints.ResizeNorthWest & ~SelectorConstraints.ResizeNorthEast & ~SelectorConstraints.ResizeSouthWest & ~SelectorConstraints.ResizeSouthEast,

      obj.annotations = [{ constraints: AnnotationConstraints.ReadOnly }];
      obj.height *= ratio;
      obj.offsetX += (obj.width - oWidth) / 2;
      obj.offsetY += (obj.height - oHeight) / 2;
      obj.style = { fill: "#357BD2", strokeColor: "white" };
      let type = this.service.ReturnComponentType(obj);
      let data = {
        id: null,
        automationFlowId: null,
        nodeId: obj.id,
        nodeType: type,
        offsetX: obj.offsetX,
        offsetY: obj.offsetY,
        statusId: 1001,
      };

      let node = this.service.BuildNode(data, type.toLocaleLowerCase());
      this.formNodes.push(node);
      //// console.log("From Drag Enter: ", node);
      this.genericObject = node;
      //this.genericList.push(node);

      // console.log("from inside drap =>", this.flowAutomationForm);
    }
  }


  public commandManager: CommandManagerModel = {
    commands: [
      {
        name: "paste",
        canExecute: (): boolean => {
          
          if (
            this.diagram.selectedItems.nodes.length > 0 &&
            this.diagram.selectedItems.nodes.filter(
              (x) => x.id.indexOf("start") > -1
            ).length
          ) {
            return false;
          }
          return true;
        },
      },
      {
        name: "copy",
        canExecute: (): boolean => {
          
          if (
            this.diagram.selectedItems.nodes.length > 0 &&
            this.diagram.selectedItems.nodes.filter(
              (x) => x.id.indexOf("start") > -1
            ).length
          ) {
            return false;
          }
          return true;
        },
      }
    ],
  };


  //SymbolPalette Properties
  public symbolMargin: MarginModel = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15,
  };
  public expandMode: ExpandMode = "Multiple";
  //Initialize the flowshapes for the symbol palatte

  private flowshapes: NodeModel[] = [
    {
      id: "Screen",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="screen" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"> <rect width="100" rx="15" height="90" fill="rgb(1, 118, 211)"/> <g> <path d="M80 25c0-2.8-2.2-5-5-5H25c-2.8 0-5 2.2-5 5v34.7c0 2.8 2.2 5 5 5h50c2.8 0 5-2.2 5-5V25zm-7.5 30.3c0 1-.9 1.9-1.9 1.9H29.4c-1 0-1.9-.9-1.9-1.9V29.4c0-1 .9-1.9 1.9-1.9h41.2c1 0 1.9.9 1.9 1.9v25.9zM41.2 72.5c-2.8 0-5 2.2-5 5v.6c0 1 .9 1.9 1.9 1.9h23.8c1 0 1.9-.9 1.9-1.9v-.6c0-2.8-2.2-5-5-5H41.2z"> </path> <path d="M40.2 50.9h-5.6c-.5 0-1-.5-1-1V34.7c0-.6.5-1 1-1h5.6c.5 0 1 .4 1 1v15.2c0 .5-.5 1-1 1zM65.4 50.9H48.3c-.5 0-1-.5-1-1V34.7c0-.5.5-1 1-1h17.1c.5 0 1 .5 1 1v15.2c0 .6-.5 1-1 1z"> </path> </g><text x="11" y="120"  font-size="2em" fill="black">Screen</text></svg>',
      },
    },
    {
      id: "Action",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="custom_notification" aria-hidden="true" viewBox="0 0 100 120" fill="white" stroke="currentColor" class="slds-icon slds-icon_small"> <rect width="100" rx="15" height="90" fill="rgb(62, 62, 60)"/> <g> <path d="M53.77 21.87L50 40.11a1 1 0 001.12 1.12h19.52a2 2 0 011.62 2.87L51 79a1.85 1.85 0 01-3.5-.87l3.75-21.48c0-.75-.62-.5-1.37-.5H29.42c-1.37 0-2.37-2-1.62-3.25L50.28 21a1.86 1.86 0 013.49.87z"> </path> </g><text x="11" y="120"  font-size="2em" font-weight="lighter" fill="black">Action</text></svg>',
      },
    },
    {
      id: "Subflow",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="flow" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(62, 62, 60)"/> <g> <path d="M79.9 30.7c-2.6-5.1-9.2-14.6-21.5-9-7.6 3.5-11.9 5.5-11.9 5.5l-11 4.8c-3.1 1.5-9.9-.6-13.7-2-1.1-.4-2.1.8-1.6 1.9 2.6 5.1 9.2 14.6 21.5 9 7.6-3.5 22.9-10.1 22.9-10.1 3.1-1.5 9.9.6 13.7 2 1.1.2 2.1-.9 1.6-2.1zM53.5 46.8c-1.4.8-6.9 3.3-6.9 3.3l-5.5 2.4C38.4 54 32.5 52 29 50.6c-1-.5-1.9.8-1.4 1.8 2.2 5 8.1 14 18.9 8.5 6.7-3.4 12.4-5.6 12.4-5.6 2.7-1.5 8.6.5 12.1 1.9 1 .4 1.9-.8 1.4-1.9-2.3-5-8.2-14-18.9-8.5zM49.5 68.9c-1.1.6-3 1.8-3 1.8-2.1 1.3-6.5-.4-9.1-1.7-.7-.4-1.4.8-1 1.8 1.6 4.5 6 12.6 14.1 7.6 3-1.9 3-1.8 3-1.8 2.2-1.1 6.5.4 9.1 1.6.7.4 1.4-.8 1-1.8-1.6-4.4-5.7-12.1-14.1-7.5z"> </path> </g> <text x="3" y="120"  font-size="2em" fill="black">Subflow</text></svg>',
      },
    },
  ];
  //Initialize the logicshapes for the symbol palatte
  private logicshapes: NodeModel[] = [
    {
      id: "Assignment",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="assignment" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)"/>  <g> <path d="M22 54.9h56c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zM22 37.1h56c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z"> </path> </g><text x="15" y="115"  font-size="2em" fill="black">Assign</text></svg>',
      },
    },
    {
      id: "Decision",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="decision" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" height="90" rx="15" fill="rgb(254, 147, 57)"/> <g> <path d="M79.4 28.8l-5.2-3.9c-.8-.5-1.5-.8-2.4-.8H54V22c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H26c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h45.8c.9 0 1.8-.2 2.4-.8l5.2-3.9c.8-.7.8-1.9 0-2.5zM74 46H54v-3c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v3H28.3c-.9 0-1.8.2-2.4.8l-5.2 3.9c-.9.6-.9 1.9 0 2.6l5.2 3.9c.8.5 1.5.8 2.4.8H74c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM54 71.6v-4.9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v4.9c-4 1.1-6.2 3.5-6.9 6.5-.2.9.5 1.9 1.5 1.9h18.9c1 0 1.8-.9 1.5-1.9-.7-3-3-5.3-7-6.5z"> </path> </g><text x="0" y="115"  font-size="2em" fill="black">Decision</text></svg>',
      },
    },
    {
      id: "Pause",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="Pause" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" height="90" rx="15" fill="rgb(254, 147, 57)"/> <g><path d="M80 40.5c0-1-.9-1.9-1.9-1.9H51.9c-1 0-1.9.9-1.9 1.9v3.7c0 1 .9 1.9 1.9 1.9h17.8L50.4 69.8s0 .1-.1.1c-.2.3-.4.7-.4 1.1v3.7c0 1 .9 1.9 1.9 1.9h26.3c1 0 1.9-.9 1.9-1.9V71c0-1-.9-1.9-1.9-1.9H60.6l19-23.3c.3-.4.4-.8.3-1.3v-4z"></path><path d="M50 25.3c0-1-.9-1.9-1.9-1.9H21.9c-1 0-1.9.9-1.9 1.9V29c0 1 .9 1.9 1.9 1.9h17.8L20.4 54.6s0 .1-.1.1c-.2.3-.3.6-.3 1v3.7c0 1 .9 1.9 1.9 1.9h26.3c1 0 1.9-.9 1.9-1.9v-3.7c0-1-.9-1.9-1.9-1.9H30.6l19-23.3c.3-.4.4-.8.3-1.3V25.3z"></path></g><text x="15" y="115"  font-size="2em" fill="black">Pause</text></svg>',
        // '<svg focusable="false" data-key="Pause" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" height="90" rx="15" fill="rgb(254, 147, 57)"/> <g> <path d="M79.4 28.8l-5.2-3.9c-.8-.5-1.5-.8-2.4-.8H54V22c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H26c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h45.8c.9 0 1.8-.2 2.4-.8l5.2-3.9c.8-.7.8-1.9 0-2.5zM74 46H54v-3c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v3H28.3c-.9 0-1.8.2-2.4.8l-5.2 3.9c-.9.6-.9 1.9 0 2.6l5.2 3.9c.8.5 1.5.8 2.4.8H74c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM54 71.6v-4.9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v4.9c-4 1.1-6.2 3.5-6.9 6.5-.2.9.5 1.9 1.5 1.9h18.9c1 0 1.8-.9 1.5-1.9-.7-3-3-5.3-7-6.5z"> </path> </g><text x="0" y="115"  font-size="2em" fill="black">Pause</text></svg>',
      },
    },
    {
      id: "Loop",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="loop" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)"/> <g> <path d="M76.5 58.3c0 .1 0 .2-.1.2-.3 1.1-.7 2.2-1.1 3.3-.5 1.2-1 2.3-1.6 3.4-1.2 2.2-2.7 4.2-4.5 6-1.7 1.8-3.7 3.4-5.9 4.7-2.2 1.3-4.5 2.3-7 3-2.5.7-5.1 1.1-7.7 1.1C32.8 80 20 67.2 20 51.3s12.8-28.6 28.6-28.6c5.3 0 10.3 1.5 14.6 4h.1c2.1 1.2 4 2.7 5.6 4.4.5.4.8.7 1.2 1.2.9.8 1.6.3 1.6-.9V22c0-1.1.9-2 2-2h4c1.1 0 2 .9 2.2 2v24.5c0 .9-.8 1.8-1.8 1.8H53.6c-1.1 0-1.9-.8-1.9-1.9v-4.2c0-1.1.9-2 2-2h9.4c.8 0 1.4-.2 1.7-.7-3.6-5-9.6-8.3-16.2-8.3-11.1 0-20.1 9-20.1 20.1s9 20.1 20.1 20.1c8.7 0 16.1-5.5 18.9-13.3 0 0 .3-1.8 1.7-1.8h5.7c.8 0 1.6.6 1.6 1.5v.5z"> </path> </g><text x="21" y="115"  font-size="2em" fill="black">Loop</text></svg>',
      },
    },
    {
      id: "Sort",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="sort" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"> <rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)"/><g> <path d="M50.9 37.7c.7-.7.7-1.9 0-2.6L36.6 20.7c-.7-.7-1.9-.7-2.6 0L19.7 35.1c-.7.7-.7 1.9 0 2.6l2.6 2.6c.7.7 1.9.7 2.6 0l4.5-4.5c.7-.7 2.1-.2 2.1.9v26.4c0 1 .9 1.9 1.9 1.9h3.7c1 0 1.9-1 1.9-1.9V36.7c0-1.1 1.4-1.6 2.1-.9l4.5 4.5c.7.7 1.9.7 2.6 0l2.7-2.6zm27.4 24.9l-2.6-2.5c-.7-.7-1.9-.7-2.6 0l-4.5 4.5c-.7.7-2.1.2-2.1-.9V37.1c0-1-.9-1.9-1.9-1.9h-3.7c-1 0-1.9 1-1.9 1.9v26.4c0 1.1-1.4 1.6-2.1.9l-4.5-4.5c-.7-.7-1.9-.7-2.6 0l-2.6 2.7c-.7.7-.7 1.9 0 2.6l14.3 14.3c.7.7 1.9.7 2.6 0l14.3-14.3c.7-.7.7-2-.1-2.6z"> </path> </g><text x="23" y="115"  font-size="2em" fill="black">Sort</text></svg>',
      },
    },
    {
      id: "Filter",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="filter" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"> <rect width="100" rx="15" height="90" fill="rgb(254, 147, 57)" /><g><path d="M77 20H21c-1.9 0-2.8 2.1-1.6 3.5l24.2 28.6c.8.9 1.1 2.1 1.1 3.3v22.7c0 1 1 1.9 2 1.9h4.4c1 0 1.8-.9 1.8-1.9V55.5c0-1.3.5-2.4 1.4-3.3l24.3-28.6c1.2-1.4.3-3.6-1.6-3.6z"></path></g><text x="23" y="115"  font-size="2em" fill="black">Filter</text></svg>',
      },
    },
  ];
  //Initialize the logicshapes for the symbol palatte
  private datashapes: NodeModel[] = [
    {
      id: "CreateRecords",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="record_create" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M68.4 27.1c.1 0 .1 0 0 0"></path> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"></path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zm-7.3 35.2c0 .5-.5 1-1 1h-11c-.4 0-.7.3-.7.7v11c0 .5-.5 1-1 1h-2c-.5 0-1-.5-1-1v-11c0-.4-.3-.7-.7-.7h-11c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h11c.4 0 .7-.3.7-.7v-11c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v11c0 .4.3.7.7.7h11c.5 0 1 .5 1 1v2z"> </path> </g> </g><text x="9" y="115"  font-size="2em" fill="black">Create</text></svg>',
      },
    },
    {
      id: "UpdateRecords",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="record_update" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M68.4 27.1c.1 0 .1 0 0 0"></path> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"> </path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM60 55.5l-16 16h.1l-7 2c-.7.2-1.3-.5-1.1-1.2l2-6.9 16-16c.2-.2.6-.2.9 0l5.1 5.3c.2.2.2.6 0 .8zm4.6-4.6l-2 2c-.2.2-.6.2-.9 0l-5.2-5.2c-.2-.2-.2-.6 0-.9l2-2c.9-1 2.4-1 3.4 0l2.6 2.6c1.1 1 1.1 2.5.1 3.5z"> </path> </g> </g><text x="9" y="115"  font-size="2em" fill="black">Update</text></svg>',
      },
    },
    {
      id: "GetRecords",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="record_lookup" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"></path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zm-7.7 47.6L63 73.9c-.3.3-.9.3-1.3 0l-8.1-8.1c-2.3 1.6-5.2 2.5-8.4 2.1-5.2-.7-9.4-5.1-9.9-10.3-.7-7.2 5.4-13.4 12.6-12.6 5.3.5 9.6 4.6 10.3 9.9.4 3.1-.4 6.1-2.1 8.4l8.1 8.1c.5.2.5.8.1 1.2z"> </path> <path d="M46.9 48.5c-4.4 0-7.9 3.6-7.9 7.9 0 4.4 3.5 7.9 7.9 7.9s7.9-3.5 7.9-7.9-3.5-7.9-7.9-7.9z"></path> </g> </g><text x="23" y="115"  font-size="2em" fill="black">Get</text></svg>',
      },
    },
    {
      id: "DeleteRecords",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="record_delete" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <g> <path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"> </path> <path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM60.4 70.6c0 1.7-1.3 3.1-3.1 3.1H42.7c-1.7 0-3.1-1.3-3.1-3.1v-13c0-.5.4-.9.9-.9h19c.5 0 .9.4.9.9v13zm2.4-18.7c0 .5-.4.9-.9.9H38.1c-.5 0-.9-.4-.9-.9v-1.8c0-.5.4-.9.9-.9h7.6v-2.4c0-1.3 1.1-2.4 2.4-2.4h3.7c1.3 0 2.4 1.1 2.4 2.4v2.4h7.6c.5 0 .9.4.9.9v1.8z"> </path> <path d="M47.6 61h-1.2c-.4 0-.6.2-.6.6v7.1c0 .4.2.6.6.6h1.2c.4 0 .6-.2.6-.6v-7.1c0-.4-.3-.6-.6-.6zM53.7 61h-1.2c-.4 0-.6.2-.6.6v7.1c0 .4.2.6.6.6h1.2c.4 0 .6-.2.6-.6v-7.1c0-.4-.3-.6-.6-.6zM51.2 46.7h-2.4c-.4 0-.6.2-.6.6v1.8h3.7v-1.8c-.1-.4-.3-.6-.7-.6z"> </path> </g> </g><text x="15" y="115"  font-size="2em" fill="black">Delete</text></svg>',
      },
    },
    {
      id: "RollBackRecords",
      shape: {
        type: "HTML",
        content:
          '<svg focusable="false" data-key="recent" aria-hidden="true" viewBox="0 0 100 120" class="slds-icon slds-icon_small" fill="white"><rect width="100" rx="15" height="90" fill="rgb(254, 92, 76)"/> <g> <path d="M28.1 48c-.1.7-.1 1.3-.1 2h-6c0-.7 0-1.3.1-2h6zM51.5 36h-3c-.8 0-1.5.7-1.5 1.5v13.1c0 .4.2.8.4 1.1l8.4 8.4c.6.6 1.5.6 2.1 0L60 58c.6-.6.6-1.5 0-2.1l-7-7.1V37.5c0-.8-.7-1.5-1.5-1.5z"> </path> <path d="M50 22c-14.8 0-26.9 11.5-27.9 26 0 .3-.1.7-.1 1h-4.5c-1.3 0-2 1.5-1.2 2.4l7.5 9.1c.6.7 1.7.7 2.3 0l7.5-9.1c.8-1 .1-2.4-1.2-2.4H28v-1c1-11.2 10.5-20 21.9-20 13 0 23.3 11.3 21.9 24.5-1 9.5-10 18.5-19.6 19.4-7.1.7-13.8-1.9-18.5-7-.6-.7-1.4-1.1-2.2-.1l-2.4 2.9c-.5.6-.1 1 .4 1.5 5.4 5.7 12.8 8.9 20.8 8.8 14.4-.2 26.5-11.6 27.5-26C79.1 35.7 66.1 22 50 22z"> </path> </g><text x="0" y="115"  font-size="2em" fill="black">RollBack</text></svg>',
      },
    },
  ];
  //Initializes connector symbols for the symbol palette
  private connectorSymbols: ConnectorModel[] = [
    {
      id: "Link1",
      type: "Orthogonal",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: {
        shape: "Arrow",
        style: { strokeColor: "#757575", fill: "#757575" },
      },
      style: { strokeWidth: 1, strokeColor: "#757575" },
    },
    {
      id: "link3",
      type: "Orthogonal",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: "#757575" },
      targetDecorator: { shape: "None" },
    },
    {
      id: "Link21",
      type: "Straight",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: {
        shape: "Arrow",
        style: { strokeColor: "#757575", fill: "#757575" },
      },
      style: { strokeWidth: 1, strokeColor: "#757575" },
    },
    {
      id: "link23",
      type: "Straight",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: "#757575" },
      targetDecorator: { shape: "None" },
    },
    {
      id: "link33",
      type: "Bezier",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: "#757575" },
      targetDecorator: { shape: "None" },
    },
  ];

  public palettes: PaletteModel[] = [];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.style.strokeColor = "#757575";
    if (symbol.id === "Terminator" || symbol.id === "Process") {
      symbol.width = 80;
      symbol.height = 40;
    } else if (
      symbol.id === "Decision" ||
      symbol.id === "Document" ||
      symbol.id === "PreDefinedProcess" ||
      symbol.id === "PaperTap" ||
      symbol.id === "DirectData" ||
      symbol.id === "MultiDocument" ||
      symbol.id === "Data"
    ) {
      symbol.width = 50;
      symbol.height = 40;
    } else {
      symbol.width = 50;
      symbol.height = 50;
    }
  }

  get id() {
    return this.flowAutomationForm.get("id");
  }
  get name() {
    return this.flowAutomationForm.get("name");
  }
  get description() {
    return this.flowAutomationForm.get("description");
  }
  get runCondition() {
    return this.flowAutomationForm.get("runCondition");
  }
  get moduleId() {
    return this.flowAutomationForm.get("moduleId");
  }
  get subModuleId() {
    return this.flowAutomationForm.get("subModuleId");
  }
  get flowType() {
    return this.flowAutomationForm.get("flowType");
  }
  get statusId() {
    return this.flowAutomationForm.get("statusId");
  }
  get formNodes() {
    return this.flowAutomationForm.get("nodes") as FormArray;
  }
  get formConnectors() {
    return this.flowAutomationForm.get("connectors") as FormArray;
  }
}

function getPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
    { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
    { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
    { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } },
  ];
  return ports;
}
class CustomConnectorDrawingTool extends ConnectorDrawingTool {
  public diagram: Diagram = null;
  private node: NodeModel;
  public connector: Connector;
  public mouseMove(args: MouseEventArgs): boolean {
    if (!this.drawingObject) {
      this.drawingObject = this.commandHandler.drawObject(this.connector);
    }
    return super.mouseMove(args);
  }

  public mouseUp(args: MouseEventArgs): Promise<void> {
    args.source = this.node as IElement;
    if (args.source) args.sourceWrapper = args.source.wrapper;
    let portId = null;
    // console.log(args);
    let target = args.target as any as NodeModel;
    for (let port of target.ports as Port[]) {
      if (
        (port.constraints & PortConstraints.OutConnect && !port.inEdges) ||
        port.inEdges.length == 0
      ) {
        //        portId = port.id;
        break;
      }
    }
    (this.drawingObject as ConnectorModel).targetPortID = portId;
    let superReturn = super.mouseUp(args);

    return superReturn;
  }

  mouseLeave(args: MouseEventArgs): void {
    args.source = this.node as IElement;
    if (args.source) args.sourceWrapper = args.source.wrapper;
  }

  public mouseDown(args: MouseEventArgs): Promise<void> {
    this.node = args.source;
    //find an open port
    let portId = null;
    if (this.node.id != "start") {
      for (let port of this.node.ports as Port[]) {
        if (
          (port.constraints & PortConstraints.InConnect && !port.outEdges) ||
          port.outEdges.length == 0
        ) {
          //portId = port.id;
          break;
        }
      }
    }

    args.position = {
      x: this.node.offsetX,
      y: this.node.offsetY,
    };
    args.source = this.node as IElement;
    args.actualObject = this.node as IElement;
    if (args.source) args.sourceWrapper = args.source.wrapper;
    let connectionModel: ConnectorModel = {
      type: "Orthogonal",
      constraints:
        ConnectorConstraints.Default | ConnectorConstraints.LineRouting | ConnectorConstraints.ReadOnly,
      sourceID: args.actualObject.wrapper.id,
      sourcePortID: portId,
    };
    this.connector = connectionModel as Connector;
    return super.mouseDown(args);
  }
}
