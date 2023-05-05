import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ManagequestionnaireListComponent } from './managequestionnaire-list.component';
import { ManagequestionnaireComponent } from './managequestionnaire.component';


const routes: Routes = [
   { path: '', component: ManagequestionnaireListComponent, canActivate: [AuthGuard] },
   { path: 'questionnairechecklist', component: ManagequestionnaireListComponent, canActivate: [AuthGuard] },
   { path: 'addeditquestionnaire', component: ManagequestionnaireComponent, canActivate: [AuthGuard]},
   { path: 'addeditquestionnaire/:id', component: ManagequestionnaireComponent, canActivate: [AuthGuard]},

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageQuestionaireRoutingModule { }
