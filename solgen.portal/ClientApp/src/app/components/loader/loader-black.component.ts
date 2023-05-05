import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-black',
  templateUrl: './loader-black.component.html',
  styleUrls: ['./loader-black.component.scss']
})
export class LoaderBlackComponent implements OnInit {

  constructor() { }
  @Input() size: number;
  ngOnInit() {
  }

}
