import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit,OnChanges {
  ngOnChanges(): void {
    console.debug(this.color);
    }


  @Input() size: number;
  @Input() color: any;

  constructor() { }

  ngOnInit() {

  }

}
