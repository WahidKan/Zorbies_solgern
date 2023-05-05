import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateWelcomePackageComponent } from './generate-welcome-package.component';

const routes: Routes = [
  { path: '', component: GenerateWelcomePackageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomepackageRoutingModule { }
