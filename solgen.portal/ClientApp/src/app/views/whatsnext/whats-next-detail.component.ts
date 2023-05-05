import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WhatsnextService, WhatsNext } from './whatsnext.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-whats-next-detail',
  templateUrl: './whats-next-detail.component.html',
  styleUrls: ['./whats-next-detail.component.scss']
})
export class WhatsNextDetailComponent implements OnInit {
  whatsNextForm: FormGroup;
  whatsNextvaule: any;
  whatsNext: WhatsNext = new WhatsNext();
  moduletitle: string;
  isleasePage = false;
  constructor(private route: ActivatedRoute, private whatsnewService: WhatsnextService
    , private fb: FormBuilder, private commonservice: CommonService, private router: Router) {
    this.moduletitle = this.route.snapshot.data.title;
  }

 
  ngOnInit() {
    var index = this.commonservice.getPreviousUrl().indexOf("lease");
   
    if (index !== -1) {
      this.isleasePage = true;
      var ul = document.getElementById("side-main-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
       
        if (items[i].innerText == 'Manage Perposals') {
         
          items[i].setAttribute("class", "nav-link my-click selected"); //" selected";   //nav-link selected
        }
        if (items[i].innerText == "What's Next") {
          items[i].setAttribute("class", "nav-link my-click");
          
        }
      }
      // do something with items[i], which is a <li> element
    }
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id) {
        this.getWhatsNextDetail(id);
      }
    }
    );
  }

  getWhatsNextDetail(id: string) {
    this.whatsnewService.getWhatsNextDetail(id)
      .subscribe(
      (whatsNext: WhatsNext) => {
        this.whatsNextvaule = whatsNext;
        });
  }

  whatsnextBack() {
    this.router.navigate(['/whatsnext']);
  }

  leaseBack() {
    this.router.navigate(['/lease']);
  }

}
