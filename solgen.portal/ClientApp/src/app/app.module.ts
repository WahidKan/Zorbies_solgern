import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './views/shared/user.service';
import { AuthIntercepter } from './auth/auth.intercepter';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonService } from './views/shared/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { ManagemodulesComponent } from './views/managemodules/managemodules.component';
import { ManageleaseModule } from './views/managelease/managelease.module';
import { comingsoonModule } from './views/comingsoon/comingsoon.module';
import { DragDropModule } from 'primeng/dragdrop';
import { DndModule } from 'ng2-dnd';
import { LoanApplicationModule } from './views/loanapplication/loanapplication.module';
import { CustomLayoutModule } from './views/managecustomlayout/managecustomlayout.module';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { AccordionModule, ToolbarModule, ContextMenuModule, TabModule, TreeViewModule, SidebarModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { VoicecallComponent } from './views/shared/twilio/voicecall/voicecall.component';
import { VoiceCallTimerPipe } from './pipes/functions.pipe';
import { DynamicListModule } from 'dynamiccustom-list';
import { LoanhomiallreportlistComponent } from './views/loanhomireports/loanhomiallreportlist.component';
import { SharedModule } from './views/shared/shared.module';
import { VideoChatComponent } from './views/video-chat/video-chat.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from './views/flow-builder/confirmation/confirmation.component';
import { LeadModule } from './views/lead/lead.module';
import { AuthGuard } from './auth/auth.guard';
import { SuperAdminAccessGuard } from './auth/superAdminAccessGuard.guard';
import { MobileModule } from './views/mobile/mobile.module';
import { CustomerdashboardComponent } from './views/dashboard/customerdashboard/customerdashboard.component';
import { MobileAppLoginComponent } from './mobile-app-login/mobile-app-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagemodulesComponent,
    VoicecallComponent,
    VoiceCallTimerPipe,
    LoanhomiallreportlistComponent,
    VideoChatComponent,
    ConfirmationComponent,
    MobileAppLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ManageleaseModule,
    ModalModule,
    LayoutModule,
    CustomLayoutModule,
    DndModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true
    }),
    BrowserAnimationsModule,
    NgxDatatableModule,
    RouterModule,
    FormsModule,
    AccordionModule,
    comingsoonModule,
    DragDropModule,
    LoanApplicationModule,
    SharedModule,
    ScheduleModule, 
    RecurrenceEditorModule, 
    AccordionModule, 
    ToolbarModule, 
    ContextMenuModule, 
    TabModule, TreeViewModule, 
    SidebarModule, 
    MenuModule, 
    DynamicListModule,
    LeadModule,
    MobileModule
  ],
  providers: [UserService, AuthGuard, SuperAdminAccessGuard,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepter,
      multi: true
    }],
  entryComponents: [ConfirmationComponent]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
