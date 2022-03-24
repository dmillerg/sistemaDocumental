import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { ModalUsuarioComponent } from 'src/app/modals/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/service/api.service';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  selected: Usuario = {
    id: -1,
    usuario: '',
    nombre: '',
    password: '',
    fecha_registro: '',
    fecha_ultima_sesion: '',
    rol: '',
  };

  loading: boolean = false;
  seleccionados: number[] = [];
  selec = false;
  server: string = '';
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loading = true;
    this.api.getUsuarios().subscribe((result) => {
      if (result.length == 0) {
        this.server = 'No hay usuarios registrados';
      }
      this.usuarios = result;
      this.loading = false;
      this.usuarios.forEach((e) => {
        console.log(e);
      })
    }, (error) => {
      this.server = "Error comunicandose con el servidor por favor intentelo más tarde";
    })
  }

  detailToggle(item: Usuario) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    } else {

    }
    this.selected = item;
  }

  addUsuario() {
    let modal = this.modalService.open(ModalUsuarioComponent);
    modal.componentInstance.modalHeader = "Usuarios";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e) => {
      this.loadUsuarios();
    })
  }

  editUsuario(item: Usuario) {
    let modal = this.modalService.open(ModalUsuarioComponent);
    modal.componentInstance.modalHeader = "Usuarios";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.usuario = item;
    modal.result.then((e) => {
      this.loadUsuarios();
    })
  }

  deleteUsuario(idd: number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Usuarios";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadUsuarios();
    })
  }
  d(id: number) {

    if (this.seleccionados.filter((n) => n == id).length > 0) {
      this.seleccionados = this.seleccionados.filter((n) => n != id);

    }
    else
      this.seleccionados.push(id);


    console.log(this.seleccionados);

  }
  deleteAll() {

    if (this.seleccionados.length > 0) {

      for (let idd of this.seleccionados)
        this.api.deleteUsuario(idd).subscribe(result => { this.loadUsuarios(); });


      this.lib.success('Eliminados con exito!', 'Eliminar');

    }
    else {
      this.lib.info('Debe seleccionar un elemento', 'No es posible');
    }
  }


  selecc() {


    //Ver si el checkbox esta seleccionado
    if (this.selec) {

      // Vaciar arreglo
      var des: number[] = [];
      this.seleccionados = des;

    }
    else {

      // Guardar todos los id en seleccionados
      var i = 0;
      for (let item of this.usuarios) {
        this.seleccionados[i] = item.id;
        i++;
      }


    }
    this.selec = !this.selec;
    console.table(this.seleccionados);

  }
}
