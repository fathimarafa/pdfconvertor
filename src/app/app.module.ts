import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { HttpClientModule } from '@angular/common/http';
import { ServerCommunicationService } from './services/server-communication/server.communication.service';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SidebarComponent } from './modules/common/sidebar/sidebar.component';
import { ConfirmModalComponent } from './modules/common/confirm-modal/confirm-modal.component';
import { CustomValidationMessages } from './handlers/form-validation-handler/validation.handler';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { LoginComponent } from './modules/common/login/login.component';
import { HomeComponent } from './modules/common/home/home.component';
import { ModuleDefaultComponent } from './modules/common/module-default/module-default.component';
import { ModuleDefaultListingComponent } from './modules/common/module-default-listing/module-default-listing.component';
import { ModuleDefaultFormComponent } from './modules/common/module-default-form/module-default-form.component';
import { ModuleDefaultFormMultistepComponent } from './modules/common/module-default-form-multistep/module-default-form-multistep.component';
import { ModuleMetadataService } from './services/module-metadata/module.metadata.service';
import { MaterialModule } from './material.module';
import { DataHandlerService } from './services/datahandler/datahandler.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DialogEventHandlerService } from './services/dialog-event-handler/dialogeventhandler.service';
import { AuthenticationService } from './services/auth-service/authentication.service';
import { BasicModuleComponents } from './modules/basic/basic.component';
import { CRMmoduleComponents } from './modules/crm/crm.component';
import { HRmoduleComponents } from './modules/hr/hr.component';
import { MaterialModuleComponents } from './modules/material/material.component';
import { PrebudgetModuleComponents } from './modules/prebudget/prebudget.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ConfirmModalComponent,
    LoginComponent,
    HomeComponent,
    ModuleDefaultComponent,
    ModuleDefaultListingComponent,
    ModuleDefaultFormComponent,
    ModuleDefaultFormMultistepComponent,
    ...CRMmoduleComponents,
    ...HRmoduleComponents,
    ...MaterialModuleComponents,
    ...BasicModuleComponents,
    ...PrebudgetModuleComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(CustomValidationMessages),
    BrowserAnimationsModule,
    FormlyMaterialModule,
    MaterialModule,
    FormlyMatDatepickerModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        panelClass: ['snackbar-default']
      }
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ServerCommunicationService,
    ModuleMetadataService,
    DataHandlerService,
    DialogEventHandlerService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
