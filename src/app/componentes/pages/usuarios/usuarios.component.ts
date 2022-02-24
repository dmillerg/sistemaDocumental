import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { ModalUsuarioComponent } from 'src/app/modals/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/service/api.service';

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
      usuario: 'eypalacio',
      nombre: 'Elaine',
      password: 'Hasd',
      fecha_registro: '2022021622105000',
      fecha_ultima_sesion: '2022021622105000',
      rol: 'admin'
    }
  ];

  selected: Usuario = {
    id: -1,
    usuario: '',
    nombre: '',
    password: '',
    fecha_registro: '',
    fecha_ultima_sesion: '',
    rol: '',
  };

  constructor(private api: ApiService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(){
    this.api.getUsuarios().subscribe((result)=>{
      this.usuarios = result;
    })
  }

  detailToggle(item: Usuario) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addUsuario(){
    let modal = this.modalService.open(ModalUsuarioComponent);
    modal.componentInstance.modalHeader = "Usuarios";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadUsuarios();
    })
  }

}
