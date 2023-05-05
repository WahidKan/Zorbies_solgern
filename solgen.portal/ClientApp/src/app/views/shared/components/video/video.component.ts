import { Component, Input, OnInit, SecurityContext, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';
import { componentBase } from 'src/app/views/document-maker/dto/document-creation';
import { ContentService } from 'src/app/views/document-maker/services/content.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @Input('video') public video: FormGroup;
  @ViewChild('modal', { static: true }) addVideoModal: ModalDirective;
  src: string;
  sanitizedUrl: SafeResourceUrl;
  focus: boolean = false;

  constructor(public _sanitizer: DomSanitizer, private contentService: ContentService) {}

  ngOnInit() {
    const url = this.video.get('videoUrl').value;
    if (url) {
      this.sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  onUrlChanged(value) {
    this.src = value;
  }

  onVideoAdd() {
    if (this.src && this.src.includes('youtube.com')) {
      this.src = this.src.replace('/watch?v=', '/embed/');
      this.sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
      this.video.get('videoUrl').setValue(this.src);
      this.video.get('height').setValue(450);
      this.video.get('width').setValue(500);
    }
  }

  close() {
    this.addVideoModal.hide();
  }

  deleteVideo(){
    this.sanitizedUrl = null;
    this.video.get('videoUrl').setValue(null);
  }
}
