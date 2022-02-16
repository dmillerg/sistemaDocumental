import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

usuarios: Usuario[] = [
  {
    id: 1,
    usuario: 'kuroko',
    nombre: 'Daniel',
    password: 'Hasd',
    fecha_registro: '2022021622105000',
    fecha_ultima_sesion: '2022021622105000',
    rol: 'admin'
  },
  {
    id: 1,
    usuario: 'kuroko',
    nombre: 'Daniel',
    password: 'Hasd',
    fecha_registro: '2022021622105000',
    fecha_ultima_sesion: '2022021622105000',
    rol: 'admin'
  }
];

  constructor() { }

  ngOnInit(): void {
  }

  detailToggle(){
    document.querySelector('.sidebar-right')?.classList.toggle('active');
    document.querySelector('.tablas')?.classList.toggle('active');
  }

}
