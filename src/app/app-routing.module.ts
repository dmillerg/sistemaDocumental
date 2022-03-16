import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasificadosComponent } from './componentes/pages/clasificados/clasificados.component';
import { InicioComponent } from './componentes/pages/inicio/inicio.component';
import { LoginComponent } from './componentes/pages/login/login.component';
import { UsuariosComponent } from './componentes/pages/usuarios/usuarios.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clasificados', component: ClasificadosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
