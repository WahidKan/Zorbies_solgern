import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ImageItem } from '../../common.service';


@Component({
  selector: 'app-custom-lightbox',
  templateUrl: './custom-lightbox.component.html',
  styleUrls: ['./custom-lightbox.component.scss']
})
export class CustomLightboxComponent implements OnInit {
  @ViewChild('customLightbox', { static: false }) customLightBoxModal: ModalDirective
  title = "";
  loadSave = false;
  backdrop = false;
  constructor(private renderer: Renderer2) { }

  currentIndex: number = 0;

  ImageArray: Array<ImageItem>=[];

  ngOnInit() {
  }

  Show(imageList, index) {
    this.loadSave = true;
    this.backdrop=true;

    if (imageList) {
      this.ImageArray = imageList;
      this.title = this.ImageArray[index].caption;
    }
    this.currentIndex = index;
    this.customLightBoxModal.show();
    this.hideLoader();
  }
  hideLoader() {
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }
  close() {
    this.backdrop = false;
    setTimeout(()=>{
      this.customLightBoxModal.hide();
    }, 1000);
  }

  OnPrev() {
    this.loadSave = true;
    this.currentIndex = this.currentIndex - 1;
    this.title = this.ImageArray[this.currentIndex].caption;
    this.hideLoader();

  }

  OnRight() {
    this.loadSave = true;
    this.currentIndex = this.currentIndex + 1;
    this.title = this.ImageArray[this.currentIndex].caption;
    this.hideLoader();

  }

}

