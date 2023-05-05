import { Component, OnInit } from '@angular/core';
import { ContentItem } from '../dto/content';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  blockContents: ContentItem[];
  fieldContents: ContentItem[];
  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.blockContents = this.contentService.blockContents;
    this.fieldContents = this.contentService.getFeilds;
  }

  dragStart(controls: ContentItem) {
    this.contentService.setDroppedControl(controls);
  }
  dragEnd(e) {
  }
}
