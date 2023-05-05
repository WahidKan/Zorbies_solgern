import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-white',
  templateUrl: './loader-white.component.html',
  styleUrls: ['./loader-white.component.scss']
})
export class LoaderWhiteComponent implements OnInit {

  constructor() { }
  @Input() size: number;
  ngOnInit() {
  }

}
