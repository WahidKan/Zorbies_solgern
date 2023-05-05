import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-videocallheader',
  templateUrl: './videocallheader.component.html',
  styleUrls: ['./videocallheader.component.scss']
})
export class VideocallheaderComponent implements OnInit {

  @Input('joinerName') joinerName: string; 
  companyLogo: string;
  constructor() { }

  ngOnInit() {
  this.companyLogo = 'https://media.solgenone.com/resources/uploads/companyLogo/companyLogo_637533674347913724.png';  
  }

}
