import { LOCALE_ID, NgModule } from '@angular/core';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs, 'es');

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { UsuariosComponent } from './componentes/pages/usuarios/usuarios.component';
import { DetailbarComponent } from './componentes/detailbar/detailbar.component';
import { LoginComponent } from './componentes/pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUsuarioComponent } from './modals/modal-usuario/modal-usuario.component';
import { ModalClasificadosComponent } from './modals/modal-clasificados/modal-clasificados.component';
import { ModalLimitadosComponent } from './modals/modal-limitados/modal-limitados.component';
import { ReportesComponent } from './componentes/pages/reportes/reportes.component';
import { ModalSecretosComponent } from './modals/modal-secretos/modal-secretos.component';
import { ModalOrdinariosComponent } from './modals/modal-ordinarios/modal-ordinarios.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { ModalOrdinarioPersonalComponent } from './modals/modal-ordinario-personal/modal-ordinario-personal.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@angular/cdk/layout';
import { ModalDocumentComponent } from './modals/modal-document/modal-document.component';
import { MultiselectComponent } from './componentes/multiselect/multiselect.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsuariosComponent,
    DetailbarComponent,
    LoginComponent,
    ReportesComponent,
    ModalUsuarioComponent,
    ModalOrdinariosComponent,
    ModalClasificadosComponent,
    ModalLimitadosComponent,
    ModalSecretosComponent,
    LoadingComponent,
    ModalOrdinarioPersonalComponent,
    DeleteComponent,
    ModalDocumentComponent,
    MultiselectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    NgbModule,
    LayoutModule,
    ToastrModule.forRoot(),
    PdfViewerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
