import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClasificadosComponent } from 'src/app/modals/modal-clasificados/modal-clasificados.component';
import { Clasificados } from 'src/app/models/clasificados.service';
import { ApiService } from 'src/app/service/api.service';

import { DeleteComponent } from 'src/app/modals/delete/delete.component';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.component.html',
  styleUrls: ['./clasificados.component.css']
})
export class ClasificadosComponent implements OnInit {


  clasificados: Clasificados[] = [];

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
  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadClasificados();
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
        this.getDocumentFoto(e);
      })
      this.loading = false;

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
    let modal = this.modalService.open(ModalClasificadosComponent);
    modal.componentInstance.modalHeader = "Clasificados";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e) => {
      this.loadClasificados();
    })
  }

  editClasificados(item:Clasificados) {
    let modal = this.modalService.open(ModalClasificadosComponent);
    modal.componentInstance.modalHeader = "Clasificados";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.clasificados = item;
    modal.result.then((e) => {
      this.loadClasificados();
    })
  }

  deleteClasificados(idd:number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Clasificados";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadClasificados();
    })
  }


}
