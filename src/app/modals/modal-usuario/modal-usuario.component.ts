import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {
  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  hide_pass: boolean = false;
  hide_password: boolean = false;
  errorN: string = "";
  usuario: Usuario = {
    id: -1,
    usuario: '',
    nombre: '',
    password: '',
    fecha_registro: '',
    fecha_ultima_sesion: '',
    rol: ''
  }
  disabled: boolean = false;

  password2: string = '';

  usuario_pasado: Usuario = {
    id: -1,
    usuario: '',
    nombre: '',
    password: '',
    fecha_registro: '',
    fecha_ultima_sesion: '',
    rol: ''
  }

  usuarios_existentes: Usuario[] = [];

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
    this.rellenarSiEditas();
    this.loadUsuarios();

  }

  validarUsuarioExistente() {
    if (this.modalAction != 'Editar') {
      return this.usuarios_existentes.filter((e) => e.usuario == this.usuario.usuario).length > 0
    } else {
      this.usuarios_existentes = this.usuarios_existentes.filter((e) => e.usuario != this.usuario_pasado.usuario);
      return this.usuarios_existentes.filter((e) => e.usuario == this.usuario.usuario).length > 0;
    }
  }


  rellenarSiEditas() {
    if (this.modalAction == 'Editar') {
      this.usuario_pasado.id = this.usuario.id;
      this.usuario_pasado.usuario = this.usuario.usuario;
      this.usuario_pasado.password = this.usuario.password;
      this.usuario_pasado.nombre = this.usuario.nombre;
      this.usuario_pasado.fecha_registro = this.usuario.fecha_registro;
      this.usuario_pasado.fecha_ultima_sesion = this.usuario.fecha_ultima_sesion;
      this.usuario_pasado.rol = this.usuario.rol;
    }
  }

  loadUsuarios() {
    this.api.getUsuarios().subscribe((result) => {
      if(result.length>0){
      this.usuarios_existentes = result;}else{
        this.usuarios_existentes = [];
      }
    });
  }

  addUpdateUsuario() {
    let formData = new FormData();
    formData.append('id', this.usuario.id.toString());
    formData.append('usuario', this.usuario.usuario.toString());
    formData.append('password', this.usuario.password.toString());
    formData.append('nombre', this.usuario.nombre.toString());
    formData.append('rol', this.usuario.rol.toString());


    console.log(this.modalAction);
    console.log(this.modalAction == "Editar");
    if (this.modalAction == "Editar") {
      this.api.updateUsuario(formData, this.usuario.id).subscribe((result) => {
        this.actiModal.close('Usuarios');
        console.log(result);
        this.lib.success('Editado con exito!', 'Editar');
      }, (error) => {
        this.actiModal.close('Usuarios');
        this.lib.error('No se pudo editar', 'Error');
        console.log(error);
      });
    } else {
      this.api.addUsuario(formData).subscribe((result) => {
        this.actiModal.close('Usuarios');
        console.log(result);
        this.lib.success('Agregado con exito!', 'Agregar');
      }, (error) => {
        console.log(error);
        this.actiModal.close('Usuarios');
        this.lib.error('No se pudo agregar', 'Error');
      })
    }

  }

  validarCamposVacios() {
    return this.usuario.usuario.length > 0 && this.usuario.password.length > 0 && this.usuario.nombre.length > 0 && this.usuario.rol.length > 0;
  }


}
