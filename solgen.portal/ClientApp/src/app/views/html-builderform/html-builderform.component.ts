import { Component, OnInit, ViewChild } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';
import { HtmlBuilderformService, htmlBuilderDataModel, PlaceHolderList } from './html-builderform.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-html-builderform',
  templateUrl: './html-builderform.component.html',
  styleUrls: ['./html-builderform.component.scss']
})

export class HtmlBuilderformComponent implements OnInit {
  public baseUri = `${environment.WebApiBaseUrl}`;

  @ViewChild('addEditHtmlContentPopUp', { static: false }) addEditHtmlContentPopUpModel: ModalDirective;
  htmlBuilderModel: htmlBuilderDataModel = new htmlBuilderDataModel();
  htmlData: any;
  cssData: any;
  htmlDataFromDatabse: any;
  usedinDocument: any;
  previewFieldsList: any;
  
  cssDataFromDatabase: any;
  isDefaultView: boolean = true;

  title: any;
  addEditHtmlContentForm: FormGroup;
  ID: string;
  formData: any;
  loadSave: any;
  myPlugin: any;
  fieldsName: any[]=[];
  txtNames: any[] = [];
  pageTitle: any;
  statusList: any[] = [{ text: "Active", value: 1001 }, { text: "InActive", value: 1002 }]
  isStatusDisable : boolean = false;
  contentHeader: object;
  private _editor: any;

  constructor(private fb: FormBuilder,
    private htmlBuilderformService: HtmlBuilderformService,
    private toaster: ToastrService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute  ) { }

  get editor() {
    return this._editor;
  };

  

  ngOnInit() {
    this.loadSave = true;
    this._editor = this.initializeEditor();
    this.editor.DomComponents.clear(); // Clear components
    this.editor.CssComposer.clear();  // Clear styles
    this.editor.UndoManager.clear(); // Clear undo history

    this.myPlugin = editor => {

      editor.DomComponents.addType('input123', {
        model: {
          defaults: {
            traits: [
              { type: 'text', label: 'Tag Name', name: 'data-tag' },
            ]
          }
        }
      });

      editor.DomComponents.addType('text', {
        isComponent: el => false,
        model: {
          //init() {
          //  this.listenTo(this, 'change:attributes:data-tag', () => // console.log('data-tag', this.getAttributes()['data-tag']))
          //},
          defaults: {
            traits: [{ type: 'text', label: 'Tag Name', name: 'data-tag' },],
             }
        },
        //view: {
        //  init() {
        //    const oldValue = this.model.getAttributes()['data-tag']
        //    if (oldValue != null || oldValue != undefined) {
        //      if (oldValue.indexOf('_txt') !== -1) {
        //        this.model.addAttributes({ 'data-tag': oldValue })
        //      }
        //      else {
        //        this.model.addAttributes({ 'data-tag': oldValue + '_txt' })
        //      }
        //    }
        //  }
        //}
      });

      editor.DomComponents.addType('image', {
        model: {
          defaults: {
            //attributes: { linkTitle: '',},
            //style: {
            //  padding: '25px',
            //  margin: '25px',
            //},
            traits: [{ type: 'text', label: 'Tag Name', name: 'data-tag', changeProp: false }]
          }
        }
      });

      editor.DomComponents.addType('link', {
        model: {
          defaults: {
            traits: [{ type: 'text', label: 'Tag Name', name: 'data-tag' },]
          }
        }
      });
     
      editor.DomComponents.addType('map', {
        model: {
          defaults: {
            traits: [{ type: 'text', label: 'Tag Data', name: 'data-tag' },]
          }
        }
      });

      editor.DomComponents.addType('video', {

        model: {
          defaults: {
            traits: [{ type: 'text', label: 'Tag Data', name: 'data-tag' }]
          }
        }
      });

      //=================== Activating View component button =============
      editor.Panels.addPanel({
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
          {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<u>B</u>',
            command: 'sw-visibility', // Built-in command
          }
        ],
      });
      //===============================End================================

      //========================== Remove buttons from panel ===========================

      //https://github.com/artf/grapesjs/blob/4bc79bd304072b458f63482d3a4f5049c6491467/src/panels/config/config.js#L56
          var panelManager = editor.Panels;
          var viewCodeBtn = panelManager.getButton('options', 'export-template');
          panelManager.removeButton('options', 'export-template');
          //panelManager.addButton("options", export-template);

          panelManager.removeButton('options', 'preview');
          panelManager.removeButton('options', 'fullscreen')
          panelManager.removeButton('options', 'gjs-open-import-webpage')
          //panelManager.removeButton('devices-c', 'block-editor');
      //==================================== End =======================================
    }

    //this.editor.on('asset:upload:response', (response) => {
    //});

    this.isDefaultView = true;
   
    this.initAddEditHtmlContentForm();
      
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.ID = id;
        if (id) {
          //this.loadSave = true;
          this.pageTitle = 'Edit HTML Template';
          this.isDefaultView = false;
          this.getHtmlContentFromDatabase(this.isDefaultView,id);
        }
        else {
          this.pageTitle = 'Add HTML Template';
          this.isDefaultView = true;
          this.getHtmlContentFromDatabase(this.isDefaultView, '');
        }
      }
    );
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);

    this.editor.on('run:preview', () => {
    });
    
  this.initBreadCrumb();
  }
  
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'HTML Templates',
      actionButton: true,
      iconCssClass: '',
      breadcrumb:
        [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name : 'HTML Templates',
            isLink : true,
            link : '/HtmlTemplate'
          },
          {
            name: this.pageTitle,
            isLink: false
          }
 
        ]
    };
  }

  private initializeEditor(): any {

    return grapesjs.init({
      fromElement: false,
      container: '#gjs',
      colorPicker: {
        appendTo: 'parent',
        offset: { top: 26, left: -166, },
      },  
      components: this.htmlDataFromDatabse,
      style: this.cssDataFromDatabase,
      styleManager: {
        clearProperties: true,
      },
      deviceManager: {
      },
      //dragMode: 'absolute',
      plugins: ['gjs-preset-webpage', this.myPlugin],
      pluginsOpts: {
        'gjs-preset-webpage': {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
          blocksBasicOpts: {
            blocks: ['text', 'image', 'column1', 'column2', 'column3', 'column3-7', 'link', 'map', 'video'],//'link-block','quote',
            flexGrid: false,
            stylePrefix: 'lala-'
          },
          customStyleManager: [
            {
              name: "General",
              open: false,
              buildProps: [
                "float",
                "display",
                "position",
                "top",
                "right",
                "left",
                "bottom",
              ],
              properties: [
                {
                  name: "Alignment",
                  property: "float",
                  type: "radio",
                  defaults: "none",
                  list: [
                    { value: "none", className: "fa fa-times" },
                    { value: "left", className: "fa fa-align-left" },
                    { value: "right", className: "fa fa-align-right" },
                  ],
                },
                { property: "position", type: "select" },
              ],
            },
            {
              name: "Dimension",
              open: false,
              buildProps: [
                "width",
                "flex-width",
                "height",
                "max-width",
                "min-height",
                "margin",
                "padding",
              ],
              properties: [
                {
                  id: "flex-width",
                  type: "integer",
                  name: "Width",
                  units: ["px", "%"],
                  property: "flex-basis",
                  toRequire: 1,
                },
                {
                  property: "margin",
                  properties: [
                    { name: "Top", property: "margin-top" },
                    { name: "Right", property: "margin-right" },
                    { name: "Bottom", property: "margin-bottom" },
                    { name: "Left", property: "margin-left" },
                  ],
                },
                {
                  property: "padding",
                  properties: [
                    { name: "Top", property: "padding-top" },
                    { name: "Right", property: "padding-right" },
                    { name: "Bottom", property: "padding-bottom" },
                    { name: "Left", property: "padding-left" },
                  ],
                },
              ],
            },
            {
              name: "Typography",
              open: false,
              buildProps: [
                "font-family",
                "font-size",
                "font-weight",
                "letter-spacing",
                "color",
                "line-height",
                "text-align",
                "text-decoration",
                "text-shadow",
              ],
              properties: [
                { name: "Font", property: "font-family" },
                { name: "Weight", property: "font-weight" },
                { name: "Font color", property: "color" },
                {
                  property: "text-align",
                  type: "radio",
                  defaults: "left",
                  list: [
                    { value: "left", name: "Left", className: "fa fa-align-left" },
                    {
                      value: "center",
                      name: "Center",
                      className: "fa fa-align-center",
                    },
                    {
                      value: "right",
                      name: "Right",
                      className: "fa fa-align-right",
                    },
                    {
                      value: "justify",
                      name: "Justify",
                      className: "fa fa-align-justify",
                    },
                  ],
                },
                {
                  property: "text-decoration",
                  type: "radio",
                  defaults: "none",
                  list: [
                    { value: "none", name: "None", className: "fa fa-times" },
                    {
                      value: "underline",
                      name: "underline",
                      className: "fa fa-underline",
                    },
                    {
                      value: "line-through",
                      name: "Line-through",
                      className: "fa fa-strikethrough",
                    },
                  ],
                },
                {
                  property: "text-shadow",
                  properties: [
                    { name: "X position", property: "text-shadow-h" },
                    { name: "Y position", property: "text-shadow-v" },
                    { name: "Blur", property: "text-shadow-blur" },
                    { name: "Color", property: "text-shadow-color" },
                  ],
                },
              ],
            },
            {
              name: "Decorations",
              open: false,
              buildProps: [
                "opacity",
                "border-radius",
                "border",
                "box-shadow",
                "background-bg",
              ],
              properties: [
                {
                  type: "slider",
                  property: "opacity",
                  defaults: 1,
                  step: 0.01,
                  max: 1,
                  min: 0,
                },
                {
                  property: "border-radius",
                  properties: [
                    { name: "Top", property: "border-top-left-radius" },
                    { name: "Right", property: "border-top-right-radius" },
                    { name: "Bottom", property: "border-bottom-left-radius" },
                    { name: "Left", property: "border-bottom-right-radius" },
                  ],
                },
                {
                  property: "box-shadow",
                  properties: [
                    { name: "X position", property: "box-shadow-h" },
                    { name: "Y position", property: "box-shadow-v" },
                    { name: "Blur", property: "box-shadow-blur" },
                    { name: "Spread", property: "box-shadow-spread" },
                    { name: "Color", property: "box-shadow-color" },
                    { name: "Shadow type", property: "box-shadow-type" },
                  ],
                },
                {
                  id: "background-bg",
                  property: "background",
                  type: "bg",
                },
              ],
            },
            {
              name: "Extra",
              open: false,
              buildProps: ["transition", "perspective", "transform"],
              properties: [
                {
                  property: "transition",
                  properties: [
                    { name: "Property", property: "transition-property" },
                    { name: "Duration", property: "transition-duration" },
                    { name: "Easing", property: "transition-timing-function" },
                  ],
                },
                {
                  property: "transform",
                  properties: [
                    { name: "Rotate X", property: "transform-rotate-x" },
                    { name: "Rotate Y", property: "transform-rotate-y" },
                    { name: "Rotate Z", property: "transform-rotate-z" },
                    { name: "Scale X", property: "transform-scale-x" },
                    { name: "Scale Y", property: "transform-scale-y" },
                    { name: "Scale Z", property: "transform-scale-z" },
                  ],
                },
              ],
            },
            {
              name: "Flex",
              open: false,
              properties: [
                {
                  name: "Flex Container",
                  property: "display",
                  type: "select",
                  defaults: "block",
                  list: [
                    { value: "block", name: "Disable" },
                    { value: "flex", name: "Enable" },
                  ],
                },
                {
                  name: "Flex Parent",
                  property: "label-parent-flex",
                  type: "integer",
                },
                {
                  name: "Direction",
                  property: "flex-direction",
                  type: "radio",
                  defaults: "row",
                  list: [
                    {
                      value: "row",
                      name: "Row",
                      className: "icons-flex icon-dir-row",
                      title: "Row",
                    },
                    {
                      value: "row-reverse",
                      name: "Row reverse",
                      className: "icons-flex icon-dir-row-rev",
                      title: "Row reverse",
                    },
                    {
                      value: "column",
                      name: "Column",
                      title: "Column",
                      className: "icons-flex icon-dir-col",
                    },
                    {
                      value: "column-reverse",
                      name: "Column reverse",
                      title: "Column reverse",
                      className: "icons-flex icon-dir-col-rev",
                    },
                  ],
                },
                {
                  name: "Justify",
                  property: "justify-content",
                  type: "radio",
                  defaults: "flex-start",
                  list: [
                    {
                      value: "flex-start",
                      className: "icons-flex icon-just-start",
                      title: "Start",
                    },
                    {
                      value: "flex-end",
                      title: "End",
                      className: "icons-flex icon-just-end",
                    },
                    {
                      value: "space-between",
                      title: "Space between",
                      className: "icons-flex icon-just-sp-bet",
                    },
                    {
                      value: "space-around",
                      title: "Space around",
                      className: "icons-flex icon-just-sp-ar",
                    },
                    {
                      value: "center",
                      title: "Center",
                      className: "icons-flex icon-just-sp-cent",
                    },
                  ],
                },
                {
                  name: "Align",
                  property: "align-items",
                  type: "radio",
                  defaults: "center",
                  list: [
                    {
                      value: "flex-start",
                      title: "Start",
                      className: "icons-flex icon-al-start",
                    },
                    {
                      value: "flex-end",
                      title: "End",
                      className: "icons-flex icon-al-end",
                    },
                    {
                      value: "stretch",
                      title: "Stretch",
                      className: "icons-flex icon-al-str",
                    },
                    {
                      value: "center",
                      title: "Center",
                      className: "icons-flex icon-al-center",
                    },
                  ],
                },
                {
                  name: "Flex Children",
                  property: "label-parent-flex",
                  type: "integer",
                },
                {
                  name: "Order",
                  property: "order",
                  type: "integer",
                  defaults: 0,
                  min: 0,
                },
                {
                  name: "Flex",
                  property: "flex",
                  type: "composite",
                  properties: [
                    {
                      name: "Grow",
                      property: "flex-grow",
                      type: "integer",
                      defaults: 0,
                      min: 0,
                    },
                    {
                      name: "Shrink",
                      property: "flex-shrink",
                      type: "integer",
                      defaults: 0,
                      min: 0,
                    },
                    {
                      name: "Basis",
                      property: "flex-basis",
                      type: "integer",
                      units: ["px", "%", ""],
                      unit: "",
                      defaults: "auto",
                    },
                  ],
                },
                {
                  name: "Align",
                  property: "align-self",
                  type: "radio",
                  defaults: "auto",
                  list: [
                    {
                      value: "auto",
                      name: "Auto",
                    },
                    {
                      value: "flex-start",
                      title: "Start",
                      className: "icons-flex icon-al-start",
                    },
                    {
                      value: "flex-end",
                      title: "End",
                      className: "icons-flex icon-al-end",
                    },
                    {
                      value: "stretch",
                      title: "Stretch",
                      className: "icons-flex icon-al-str",
                    },
                    {
                      value: "center",
                      title: "Center",
                      className: "icons-flex icon-al-center",
                    },
                  ],
                },
              ],
            },
            ]
        }
      },
      assetManager: {
        storageType: '',
        //upload: 'http://localhost:8530/api/Common/UploadAsset',
        upload: this.baseUri+'Common/UploadAsset',
        storeOnChange: true,
        storeAfterUpload: true,
        uploadName: 'files',
        assets: [
          //{ type: 'image', src: 'http://placehold.it/350x250/78c5d6/fff/image1.jpg', height: 350, width: 250 },
        ],

        data: [
          'https://.../image.png',
          {
            src: 'https://.../image2.png',
            type: 'image',
            height: 100,
            width: 200,
          },
        ]
      },
      canvas: {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
        ],
        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js']
      },
    });
  };


  //========================================== Get Data From Databse ================================================
  getHtmlContentFromDatabase(isDefaultView, id) {
    this.loadSave = true;
    this.htmlBuilderformService.getHtmlContentFromDatabase(isDefaultView, id).subscribe((result: any) => {
      if (result) {
        var data = this.commonService.TryJsonParse(result);
        this.formData = data;
        if(data.UsedinDocuemnt != "NotAvilable"){
          this.isStatusDisable = true;
        }
        this.htmlDataFromDatabse = data.HtmlContent;
        this.usedinDocument = data.UsedinDocuemnt;

        this.cssDataFromDatabase = data.HtmlCSS;
        if (this.htmlDataFromDatabse != null) {
          if (this.htmlDataFromDatabse.includes('{')) {
            var items = this.htmlDataFromDatabse.split('{');
            items.forEach(item => {
              if (item.includes('}')) {
                this.txtNames.push(item.split('}')[0]);
              }
            })
          }

          var stripedHtml = this.htmlDataFromDatabse.split(" ");
          stripedHtml.forEach(item => {
            if (item.includes("data-tag")) {
              this.fieldsName.push(item);
            }
          })
        }
        
        this._editor = this.initializeEditor();

        //========Get All blocks in basic And Remove specific one=============
        const blockManager = this.editor.BlockManager;

        const blocks = blockManager.getAll();

        blockManager.remove('quote');
        blockManager.remove('link-block');
        blockManager.remove('text-basic');
        //=============================END====================================


        //blockManager.add('h1-block', {
        //  label: 'Heading',
        //  content: '<input type="text" /> <h1> dsa</h1>',
        //  category: 'Basic',
        //  attributes: {
        //    title: 'Insert h1 block'
        //  }
        //});

        //blockManager.add('input-Password', {
        //  label: 'Password text',
        //  content: '<input type="password" />',
        //  category: 'Basic',
        //  attributes: {
        //    title: 'Insert Password Box'
        //  }
        //});

        //blockManager.add('input-Number', {
        //  label: 'Number',
        //  content: '<input type="Number" />',
        //  category: 'Basic',
        //  attributes: {
        //    title: 'Insert Number'
        //  }
        //});

        //this.editor.DomComponents.addType('input', {
        //  isComponent: el => el.tagName == 'INPUT',
        //  model: {
        //    defaults: {
        //      traits: [
        //        // Strings are automatically converted to text types
        //        'name', // Same as: { type: 'text', name: 'name' }
        //        'placeholder',
        //        'tag',
        //        {
        //          type: 'select', // Type of the trait
        //          label: 'Type', // The label you will see in Settings
        //          name: 'type', // The name of the attribute/property to use on component
        //          options: [
        //            { id: 'text', name: 'Text' },
        //            { id: 'email', name: 'Email' },
        //            { id: 'password', name: 'Password' },
        //            { id: 'number', name: 'Number' },
        //          ]
        //        },
        //        {
        //          type: 'checkbox',
        //          name: 'required',
        //        }],
        //      attributes: { type: 'text', required: false, tag: 'text' },
        //      // Add some style, just to make the component visible
        //    },
        //  },
        //});

        //this.editor.DomComponents.addType('image', {
        //  isComponent: el => el.tagName == 'IMAGE',
        //  model: {
        //    defaults: {
        //      traits: [
        //        'name', // Same as: { type: 'text', name: 'name' }
        //        'placeholder',
        //        'tag',
        //        {
        //          type: 'IMAGE', // Type of the trait
        //          label: 'Type', // The label you will see in Settings
        //          name: 'type', // The name of the attribute/property to use on component
        //          options: [
        //            { id: 'text', name: 'Text' },
        //            { id: 'email', name: 'Email' },
        //            { id: 'password', name: 'Password' },
        //            { id: 'number', name: 'Number' },
        //          ]
        //        }, {
        //          type: 'checkbox',
        //          name: 'required',
        //        }],
        //      attributes: { type: 'text', required: true, tag: '' },
        //    },
        //  },
        //});


        //this.editor.DomComponents.addType('text', {
        //  isComponent: el => el.tagName == 'TEXT',
        //  model: {
        //    defaults: {
        //      traits(component) {
        //        const result = [];
        //        if (component.get('draggable')) {
        //          result.push('id');
        //          result.push('name');
        //          result.push('tag');
        //        } else {
        //          result.push({
        //            type: 'select',
        //             ....
        //          });
        //        }
        //        return result;
        //      }
        //    },
        //  },
        //});

  

        if (data.IsDefault == 1) {
          this.isDefaultView = true;
        }
        else {
          this.isDefaultView = false;
        }
        // this.toaster.success(result.responseMessage);
      }
      else {
        this.toaster.error(result.responseMessage);
      }
    })
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  };
  //=================================================END=================================================================

  showAddEditPopup() {
    this.addEditHtmlContentForm.reset();
    this.addEditHtmlContentForm.patchValue({
      name: this.formData.Name == null ? null : this.formData.Name.toString(),
      statusId : this.formData.StatusId == null ? null : this.formData.StatusId, 
      description: this.formData.Description == null ? null : this.formData.Description.toString(),
      linkWithCustomerPortal: this.formData.LinkWithCustomerPortal == 0 ? false : this.formData.LinkWithCustomerPortal
    })
    if (this.isDefaultView == true) {
      this.title = "Add Html Template";
    }
    else {
      this.title = "Edit Html Template";
    }
    this.addEditHtmlContentPopUpModel.show();
  };

  private initAddEditHtmlContentForm() {
    this.addEditHtmlContentForm = this.fb.group({
      Id: [null],
      name: ['', Validators.required],
      statusId : [1001,Validators.required],
      description: ['', Validators.nullValidator],
      linkWithCustomerPortal:['',Validators.nullValidator]
    });
  };

  get Id() { return this.addEditHtmlContentForm.get('Id'); }
  get name() { return this.addEditHtmlContentForm.get('name'); }
  get statusId() { return this.addEditHtmlContentForm.get('statusId'); }
  get description() { return this.addEditHtmlContentForm.get('description'); }
  get linkWithCustomerPortal() { return this.addEditHtmlContentForm.get('linkWithCustomerPortal'); }



  Closemodel() {
    this.addEditHtmlContentPopUpModel.hide();
  };

  //========================================= Save Data Into Database ===========================================
  SaveDataRecords() {
    this.htmlData = this.editor.getHtml();
    this.cssData = this.editor.getCss();
    this.htmlBuilderformService.VerifyDuplicateName(this.addEditHtmlContentForm.value.name,this.ID).subscribe((result : any)=>{
      if (result == 1) {
        this.toaster.error("Template is already exist with same name. Please enter another name.")
        this.loadSave = false;
      }else{
        if (this.addEditHtmlContentForm.valid) {
          if (this.htmlData != null && this.cssData != null) {
            this.htmlBuilderModel.id = this.ID;
            this.htmlBuilderModel.html = this.htmlData;
            if (this.htmlBuilderModel.id == null || this.htmlBuilderModel.id == '' || this.htmlBuilderModel.id == undefined ) {
              this.htmlBuilderModel.isDefault = false;
            }
            else {
              this.findFieldsFromTemplate(this.htmlData)   
              this.htmlBuilderModel.isDefault = this.isDefaultView;
              let PlaceHolder = new PlaceHolderList();
              PlaceHolder.Id = this.ID
              PlaceHolder.PlaceHolders = this.previewFieldsList
              this.htmlBuilderformService.savePlaceHolder(PlaceHolder).subscribe(result => {
                if (result.statusCode == 200) {
                }
                else {
                }
              });
            }
            this.htmlBuilderModel.css = this.cssData;
            this.htmlBuilderModel.Name = this.addEditHtmlContentForm.value.name;
            this.htmlBuilderModel.statusId = this.addEditHtmlContentForm.value.statusId;
            this.htmlBuilderModel.Description = this.addEditHtmlContentForm.value.description;
            this.htmlBuilderModel.linkWithCustomerPortal = this.addEditHtmlContentForm.value.linkWithCustomerPortal;
            this.htmlBuilderformService.saveHtmlBuilderData(this.htmlBuilderModel).subscribe((result: any) => {
              if (result.statusCode == 200) {
                //this.loadSave = false;
                this.addEditHtmlContentPopUpModel.hide();
                this.isDefaultView = true;
                this.router.navigateByUrl("/HtmlTemplate");
                this.getHtmlContentFromDatabase(this.isDefaultView,this.ID);
                this.toaster.success(result.responseMessage);
              }
              else {
                //this.loadSave = false;
                this.toaster.error(result.responseMessage);
              }
            })
          }
        }
        else {
          this.commonService.validateAllFormFields(this.addEditHtmlContentForm);
          //this.loadSave = false;
        }
      }
    });
   
  };
  //===============================================END==========================================================

  //===============================================Add New place holder in mapping in update mode==========================================================

  findFieldsFromTemplate(htmlContent:any) {
    this.previewFieldsList = '';
    ;
    if (htmlContent) {
      let html = htmlContent;
      var temp = document.createElement("div");
      temp.innerHTML = html;  
      var all = temp.getElementsByTagName("*");
      for (var i = 0, max = all.length; i < max; i++) {
        // Do something with the element here
        if (all[i].getAttribute('data-tag')) {          
             let fileName = '';
             fileName = all[i].getAttribute('data-tag');            
             if(this.previewFieldsList=='')
             {
              this.previewFieldsList = fileName;
             }
             else{
              this.previewFieldsList = this.previewFieldsList + ',' +  fileName;              
             }                       
          }
      }     
      var found = [],          // an array to collect the strings that are found
        rxp = /{([^}\}]+)}/g,
        curMatch;        
      while (curMatch = rxp.exec(temp.innerHTML)) {
        var abnc = "{" + curMatch[1] + "}";
        if (!this.previewFieldsList.includes(abnc)) {          
        let fileName = '';         
        fileName = abnc;           
        if(this.previewFieldsList=='')
        {
         this.previewFieldsList = fileName;
        }
        else{        
         this.previewFieldsList = this.previewFieldsList + ',' +  fileName;  
        }                  
        }
      }
    }
  }
  //===============================================End==========================================================

  
};
