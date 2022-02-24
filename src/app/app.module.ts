import { LOCALE_ID, NgModule } from '@angular/core';
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
import { LimitadosComponent } from './componentes/pages/limitados/limitados.component';
import { ClasificadosComponent } from './componentes/pages/clasificados/clasificados.component';
import { SecretosComponent } from './componentes/pages/secretos/secretos.component';
import { ModalSecretosComponent } from './modals/modal-secretos/modal-secretos.component';
import { OrdinariosComponent } from './componentes/pages/ordinarios/ordinarios.component';
import { ModalOrdinariosComponent } from './modals/modal-ordinarios/modal-ordinarios.component';
import { LoadingComponent } from './componentes/loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsuariosComponent,
    DetailbarComponent,
    LoginComponent,
    LimitadosComponent,
    SecretosComponent,
    ClasificadosComponent,
    ModalUsuarioComponent,
    ModalOrdinariosComponent,
    ModalClasificadosComponent,
    ModalLimitadosComponent,
  ModalSecretosComponent,
  OrdinariosComponent,
  LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
