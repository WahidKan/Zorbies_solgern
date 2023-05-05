import { Component, OnInit } from '@angular/core';

import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';

@Component({
  selector: 'app-grapejs',
  templateUrl: './grapejs.component.html',
  styleUrls: ['./grapejs.component.scss']
})
export class GrapejsComponent implements OnInit {
  private _editor: any;
  name = 'Angular 6';

  constructor() {

  }

  ngOnInit() {
    this._editor = this.initializeEditor();
    this.editor.on('asset:add', () => {
      // console.log('Asset add fired');
      // this.editor.runCommand('open-assets');
    });
  }
  get editor() {
    return this._editor;
  }
  // private initializeEditor(): any {
  //   console.dir(window);
  //   return grapesjs.init({
  //     container: '#gjs',
  //     autorender: true,
  //     forceClass: false,
  //     components: '',
  //     style: '',
  //     plugins: ['gjs-preset-webpage','grapesjs-custom-code'],
  //     pluginsOpts: {
  //       'gjs-preset-webpage': {
  //         navbarOpts: false,
  //         countdownOpts: false,
  //         formsOpts: false,
  //         blocksBasicOpts: {
  //           // blocks: ['link-block', 'quote', 'image', 'video', 'text', 'column1', 'column2', 'column3'],
  //           blocks: ['link-block', 'quote', 'image', 'video', 'text','customCode'],
  //           flexGrid: false,
  //           stylePrefix: 'lala-'
  //         }
  //       },
  //       'grapesjs-custom-code': {
  //         blocksBasicOpts: {
  //           blocks: ['Custom Code'],

  //         }
  //       }
  //     },
  //     assetManager: {
  //       uploadText: 'Add image through link or upload image',
  //       modalTitle: 'Select Image',
  //       openAssetsOnDrop: 1,
  //       inputPlaceholder: 'http://url/to/the/image.jpg',
  //       addBtnText: 'Add image',
  //       uploadFile: (e) => {
  //         const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //       },
  //       handleAdd: (textFromInput) => {
  //         this.editor.AssetManager.add(textFromInput);
  //       }
  //     },

  //   });
  // }

  private initializeEditor(): any {
    console.dir(window);
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      components: '',
      style: '',
      fromElement: true,
      // Size of the editor

      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      //panels: { defaults: [] },
      blockManager: {
        appendTo: '#gjs',
        blocks: [
          {
            id: 'section', // id is mandatory
            label: 'Section', // You can use HTML/SVG inside labels
            category: 'Basic',
            attributes: { class: 'gjs-block-section' },
            content: `<section style="border: solid 3px gray">
              <h5></h5>
            </section>`,
          },
          {
            id: 'text',
            category: 'Basic',
            label: 'Text',
            attributes: { class: 'fa fa-text-width' },
            // <div data-gjs-type="text">Insert your text here</div>
            content: '<input type="text" id="fname" name="fname">',
          },
          {
            id: 'image',
            category: 'Basic',
            label: 'Image',
            attributes: { class: 'fa fa-image' },
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: 'image' },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          },
          // {
          //   label: 'Simple map block',
          //   content: {
          //     type: 'map', // Built-in 'map' component
          //     style: {
          //       height: '350px'
          //     },

          //   }
          // },
          {
            label: 'Video',
            category: 'Basic',
            attributes: { class: 'fa fa-youtube' },
            content: {
              type: 'video', // Built-in 'video' component
              style: {
                width: '400px',
                height: '300px'
              },

            }
          },
          {
          id: 'table',
          label: 'Table',
          category: 'Basic',
          attributes: { class: 'fa fa-table' },
          content: `
              <table class="table table-bordered table-resizable" style="width: 100px;height: 100px;">
                <thead>
                  <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
          `},
          // {
          //   label: '2 Columns',
          //   content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
          //     '<div class="row-cell" data-gjs-draggable=".row"></div>' +
          //     '<div class="row-cell" data-gjs-draggable=".row"></div>' +
          //     '</div>',
          // }
        ]
      },
     // plugins: ['gjs-preset-webpage'],
      //pluginsOpts: {
      //  'gjs-preset-webpage': {
      //    navbarOpts: false,
      //    countdownOpts: false,
      //    formsOpts: false,
      //    blocksBasicOpts: {
      //      blocks: ['link-block', 'quote', 'image', 'video', 'text', 'column1', 'column2', 'column3'],
      //      flexGrid: false,
      //      stylePrefix: 'lala-'
      //    }
      //  }
      //},
      //assetManager: {
      //  uploadText: 'Add image through link or upload image',
      //  modalTitle: 'Select Image',
      //  openAssetsOnDrop: 1,
      //  inputPlaceholder: 'http://url/to/the/image.jpg',
      //  addBtnText: 'Add image',
      //  upload: true,
      //  uploadFile: (e) => {
      //    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      //  },
      //  handleAdd: (textFromInput) => {
      //    this.editor.AssetManager.add(textFromInput);
      //  }
      //},

    });
  }


  SaveHtml(){
    // console.log(this._editor);
  }

}
