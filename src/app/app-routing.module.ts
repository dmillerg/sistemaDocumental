import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UsuariosComponent } from './componentes/pages/usuarios/usuarios.component';

const routes: Routes = [
  // {path: '', redirectTo: '/usuarios', pathMatch: 'full'},
  // {path: 'usuarios', component: UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
