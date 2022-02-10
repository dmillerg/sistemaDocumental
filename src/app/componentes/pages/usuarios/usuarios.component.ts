import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.inteface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [
    {
      id: 0,
      usuario: 'daniel',
      nombre: 'daniels',
      fecha_registro: 'asdasd',
      fecha_ultima: 'fasas',
      rol: 'admin'
    },
    {
      id: 0,
      usuario: 'daniel',
      nombre: 'daniel',
      fecha_registro: 'asdasd',
      fecha_ultima: 'fasas',
      rol: 'admin'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
