import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlBuilderformRoutingModule } from './html-builderform-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HtmlBuilderformService } from './html-builderform.service';
import { HtmlBuilderformComponent } from './html-builderform.component';
import { HtmlBuilderlistComponent } from './html-builderlist.component';


@NgModule({
  declarations: [HtmlBuilderlistComponent, HtmlBuilderformComponent],
  imports: [
    CommonModule,
    HtmlBuilderformRoutingModule,
    SharedModule, ModalModule
  ],
  providers: [HtmlBuilderformService],
  bootstrap: []
})
export class HtmlBuilderformModule { }
