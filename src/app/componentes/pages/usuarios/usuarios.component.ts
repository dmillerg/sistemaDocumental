import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario.inteface';

const detailnav =  trigger('detailnav', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('300ms', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('300ms', style({ transform: 'translateX(100%)', opacity: 0 })),
  ]),
])
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  animations: [detailnav],
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
      id: 1,
      usuario: 'daniel',
      nombre: 'daniel',
      fecha_registro: 'asdasd',
      fecha_ultima: 'fasas',
      rol: 'admin'
    }
  ];

  data: string[] = [];

  activoid: number = -1
  constructor() { }

  ngOnInit(): void {
  }

  cambiarActivo(item: Usuario) {
    this.activoid = item.id;
    this.transformarData(item);
  }

  transformarData(item: any) {
    this.data = [];
    let datas = JSON.stringify(item);
    datas = datas.substring(1, datas.length - 1);
    datas = datas.replace(/"/g, '');
    datas = datas.replace(/_/g, ' ');
    datas = datas.replace(/:/g, ': ');
    this.data = datas.split(',');
  }
}
