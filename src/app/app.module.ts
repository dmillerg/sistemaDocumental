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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
