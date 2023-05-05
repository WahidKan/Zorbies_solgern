import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoaderBlackComponent } from './loader-black.component';
import { LoaderWhiteComponent } from './loader-white.component';
import { LoaderComponent } from './loader.component';


@NgModule({
  declarations: [
    LoaderComponent,
    LoaderBlackComponent,
    LoaderWhiteComponent
  ],
  imports: [
    LoaderComponent,
    LoaderBlackComponent,
    LoaderWhiteComponent,
  ],
  exports: [
    LoaderComponent,
    LoaderBlackComponent,
    LoaderWhiteComponent,
    
  ]
})
export class LoaderModule { }
