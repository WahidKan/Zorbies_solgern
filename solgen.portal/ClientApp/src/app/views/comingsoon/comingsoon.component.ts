import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
})

export class ComingSoonComponent implements OnInit {
  moduleTitle: any;
  loadSave: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.moduleTitle = this.route.snapshot.data.moduletitle;}
  ngOnInit() { }
}
