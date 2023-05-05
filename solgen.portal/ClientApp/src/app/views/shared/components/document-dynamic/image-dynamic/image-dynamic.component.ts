import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContentService } from 'src/app/views/document-maker-dynamic/services/content.service';

@Component({
  selector: 'app-image-dynamic',
  templateUrl: './image-dynamic.component.html',
  styleUrls: ['./image-dynamic.component.scss']
})
export class ImageDynamicComponent implements OnInit {

  @Input('Img') public Img: FormGroup;
  nextElement: number = 70;
  display: boolean = false;
  focus: boolean = false;
  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }

  deleteImage() {
    this.Img.get('imageSrc').setValue(null);
    this.Img.get('height').setValue(100);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.Img.get('imageSrc').setValue(reader.result);
          this.Img.get('height').setValue(400);
          this.Img.get('width').setValue(400);
        };
      }
    }
  }

  showToolTip() {
    setTimeout(() => {
      this.display = true;
    });
  }

  hideToolTip() {
    setTimeout(() => {
      this.display = false;
    });
  }
  onBackgroundChange(event) {
    this.Img.get('style').setValue({'background-color':event.srcElement.value, 'color':'white'});
  }
}
