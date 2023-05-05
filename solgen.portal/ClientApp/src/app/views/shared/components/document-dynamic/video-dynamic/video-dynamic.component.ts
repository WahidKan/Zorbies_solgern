import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';
import { ContentService } from 'src/app/views/document-maker-dynamic/services/content.service';

@Component({
  selector: 'app-video-dynamic',
  templateUrl: './video-dynamic.component.html',
  styleUrls: ['./video-dynamic.component.scss']
})
export class VideoDynamicComponent implements OnInit {

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

}
