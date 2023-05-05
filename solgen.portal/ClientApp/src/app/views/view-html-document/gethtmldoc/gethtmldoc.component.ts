import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gethtmldoc',
  templateUrl: './gethtmldoc.component.html',
  styleUrls: ['./gethtmldoc.component.scss']
})
export class GethtmldocComponent implements OnInit {

 
  proposalId: string = '';
  Type: string = '';
  doc: any = null;
  constructor(private route: ActivatedRoute, private router: Router, private commonService: CommonService, private titleService: Title ) { }

  ngOnInit() {
    
    this.setTitle();
    this.route.paramMap.subscribe(params => {
      ;
      this.proposalId = params.get('proposalId');


      if (params.get('type')) {
        this.Type = params.get('type');
      }
      this.getHtmlFile();
    });

  }

  public setTitle() {
    ;
    this.titleService.setTitle("SolgenOne");
  }
  getHtmlFile() {
    if (this.Type == "Document") {
      this.commonService.getHtmlFileForDocument(this.proposalId).subscribe((result: any) => {
        this.doc = result;
        var head = document.head || document.getElementsByTagName('head')[0],
          style: any = document.createElement('style');

        head.appendChild(style);
        head.title = "Html Content";
        style.type = 'text/css';
        if (style.styleSheet) {
          // This is required for IE8 and below.
          style.styleSheet.cssText = this.doc.HtmlCSS;
        } else {
          style.appendChild(document.createTextNode(this.doc.HtmlCSS));
        }

        var div = document.getElementById('htmlviewer');
        let test = localStorage.getItem('htmlMaker');
        div.innerHTML = localStorage.getItem('htmlMaker');
      });
    }
    else if (this.Type == "local") {
      this.commonService.getHtmlFileForDocument(this.proposalId).subscribe((result: any) => {
        this.doc = result;
        var head = document.head || document.getElementsByTagName('head')[0],
          style: any = document.createElement('style');

        head.appendChild(style);
        head.title = "Html Content";
        style.type = 'text/css';
        if (style.styleSheet) {
          // This is required for IE8 and below.
          style.styleSheet.cssText = this.doc.HtmlCSS;
        } else {
          style.appendChild(document.createTextNode(this.doc.HtmlCSS));
        }

        var div = document.getElementById('htmlviewer');
        div.innerHTML = this.doc.HtmlContent;
      });
    }
    else {
      this.commonService.getHtmlFile(this.proposalId).subscribe((result: any) => {
        ;
        // console.log(result);
        this.doc = result;
        var head = document.head || document.getElementsByTagName('head')[0],
          style: any = document.createElement('style');

        head.appendChild(style);
        head.title = "Html Content";
        if (result != null && result.length > 0) {
          style.type = 'text/css';
          result.forEach(element => {
            if (style.styleSheet) {
              // This is required for IE8 and below.
              style.styleSheet.cssText = style.styleSheet.cssText + element.HtmlCSS;
            } else {
              style.appendChild(document.createTextNode(element.HtmlCSS));
            }
            var div = document.getElementById('htmlviewer');
            div.innerHTML = div.innerHTML +'<div style=" position: relative !important;width: 100%;">'+ element.HtmlContent+'</div>';
          });

        }

      });
    }
  }
}
