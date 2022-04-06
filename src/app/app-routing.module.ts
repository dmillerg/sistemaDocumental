import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosComponent } from './componentes/pages/documentos/documentos.component';
import { InicioComponent } from './componentes/pages/inicio/inicio.component';
import { LoginComponent } from './componentes/pages/login/login.component';
import { ReportesComponent } from './componentes/pages/reportes/reportes.component';
import { UsuariosComponent } from './componentes/pages/usuarios/usuarios.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'reportes', component: ReportesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
