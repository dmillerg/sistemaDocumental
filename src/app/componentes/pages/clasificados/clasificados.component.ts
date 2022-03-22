import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClasificadosComponent } from 'src/app/modals/modal-clasificados/modal-clasificados.component';
import { Clasificados } from 'src/app/models/clasificados.service';
import { ApiService } from 'src/app/service/api.service';

import { DeleteComponent } from 'src/app/modals/delete/delete.component';

import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ModalDocumentComponent } from 'src/app/modals/modal-document/modal-document.component';

@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.component.html',
  styleUrls: ['./clasificados.component.css']
})
export class ClasificadosComponent implements OnInit {


  clasificados: any[] = [];
  selec = false;
  seleccionados: number[] = [];
  selected: Clasificados = {
    id: 1,
    no: 2,
    fecha: 'a',
    enviado: 'a',
    rsb: 'a',
    rs: 'a',
    fecha_registro_ctc: 'a',
    asunto: 'a',
    doc: 'a',
    ej: 'a',
    clasif: 'a',
    destino: 'a',
    traslado: 'a',
    fecha_traslado: 'a',
    imagen: 'a',
  };
  loading: boolean = false;
  server: string = '';
  listado: any[] = [];
  opciones: any[] = [];
  tipos: any[] = [];
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService) { }

  ngOnInit(): void {
    this.loadListado();
    this.opciones = [
      { value: 1, name: 'Clasificados', tipo: 'documento_clasificado' },
      { value: 2, name: 'Limitados', tipo: 'documento_limitado' },
      { value: 3, name: 'Ordinarios', tipo: 'documento_ordinario' },
      { value: 4, name: 'Ordinarios Personales', tipo: 'documento_ordinario_personal' },
      { value: 5, name: 'Secretos', tipo: 'documento_secreto' },
    ];
  }

  loadClasificados() {
    this.loading = true;
    this.api.getClasificados().subscribe((result) => {
      if (result.length == 0) {
        this.server = 'No hay documentos';
      }
      this.clasificados = result;
      console.log(this.clasificados);
      this.clasificados.forEach((e) => {
        // console.log(e);

      })
      this.loading = false;
    }, (error) => {
      this.server = 'Error comunicandose con el servidor por favor intentelo más tarde';
    });
  }

  getDocumentFoto(e: Clasificados) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + 'documentos_clasificados/', 'documento_clasificado').subscribe((result) => {
      // console.log(result);
    }, (error) => {
      // console.log(error.url);
      e.imagen = error.url
    });
  }

  detailToggle(item: Clasificados) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    } else {

    }
    this.selected = item;
  }

  addClasificados() {
    let modal = this.modalService.open(ModalDocumentComponent);
    // modal.componentInstance.modalHeader = "Clasificados";
    // modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e) => {
      this.loadClasificados();
    })


  }

  editClasificados(item: Clasificados) {
    let modal = this.modalService.open(ModalClasificadosComponent);
    modal.componentInstance.modalHeader = "Clasificados";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.clasificados = item;
    modal.result.then((e) => {
      this.loadClasificados();
    })
  }

  deleteClasificados(idd: number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Clasificados";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadClasificados();
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
        this.api.deleteClasificados(idd).subscribe(result => { this.loadClasificados(); });
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
      for (let item of this.clasificados) {
        this.seleccionados[i] = item.id;
        i++;
      }


    }
    this.selec = !this.selec;
    console.table(this.seleccionados);
  }

  loadListado() {
    this.loading = true;
    this.clasificados = []
    if (this.tipos.length > 0) {
      this.tipos.forEach(i => {
        this.api.getDocuments(this.opciones[i - 1].tipo).subscribe((result) => {
          result.forEach((e) => {
            e.tipo_doc = this.opciones[i-1].name
            this.getDocumentFoto(e);
            this.clasificados.push(e);
          });
          this.loading = false
        }, (error) => {
          this.server = 'Error comunicandose con el servidor por favor intentelo más tarde';
        });
        // if (this.clasificados.length == 0) {
        //   this.server = 'No hay documentos';
        // }else this.loading = false;
      });
      
    } else {
      this.loading = false;
    }
  }

  salida(result: any) {
    this.tipos = result;
    this.loadListado();
  }

}
