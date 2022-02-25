import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasificadosComponent } from './componentes/pages/clasificados/clasificados.component';
import { InicioComponent } from './componentes/pages/inicio/inicio.component';
import { LimitadosComponent } from './componentes/pages/limitados/limitados.component';
import { LoginComponent } from './componentes/pages/login/login.component';
import { OrdinariosPersonalComponent } from './componentes/pages/ordinarios-personal/ordinarios-personal.component';
import { OrdinariosComponent } from './componentes/pages/ordinarios/ordinarios.component';
import { SecretosComponent } from './componentes/pages/secretos/secretos.component';
import { UsuariosComponent } from './componentes/pages/usuarios/usuarios.component';


const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path:'limitados', component: LimitadosComponent},
  {path:'clasificados', component: ClasificadosComponent},
  {path:'secretos', component: SecretosComponent},
  {path:'ordinarios', component: OrdinariosComponent},
  {path:'ordinario_personal', component: OrdinariosPersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
