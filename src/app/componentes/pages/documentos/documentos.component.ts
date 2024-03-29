import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfidencialComponent } from 'src/app/modals/modal-confidencial/modal-confidencial.component';
import { Clasificados } from 'src/app/models/clasificados.model';
import { ApiService } from 'src/app/service/api.service';

import { DeleteComponent } from 'src/app/modals/delete/delete.component';

import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ModalDocumentComponent } from 'src/app/modals/modal-document/modal-document.component';
import { ModalSecretosComponent } from 'src/app/modals/modal-secretos/modal-secretos.component';
import { ModalOrdinarioPersonalComponent } from 'src/app/modals/modal-ordinario-personal/modal-ordinario-personal.component';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { ModalLimitadosComponent } from 'src/app/modals/modal-limitados/modal-limitados.component';
import { SessionStorageService } from 'ngx-webstorage';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ transform: 'translateX(50%)', opacity: 0 }), stagger('100ms', animate('1000ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

const scaleAnimation = trigger('scaleAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(50%)', opacity: 0 }),
    animate('500ms', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1 }),
    animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
  ]),
]);


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  animations: [listAnimation, scaleAnimation]
})
export class DocumentosComponent implements OnInit {


  documentos: any[] = [];
  selec = false;
  seleccionados: any[] = [];
  // selected: Clasificados = {
  //   id: 1,
  //   no: 2,
  //   fecha: 'a',
  //   enviado: 'a',
  //   rsb: 'a',
  //   rs: 'a',
  //   fecha_registro_ctc: 'a',
  //   asunto: 'a',
  //   doc: 'a',
  //   ej: 'a',
  //   clasif: 'a',
  //   destino: 'a',
  //   traslado: 'a',
  //   fecha_traslado: 'a',
  //   imagen: 'a',
  // };
  loading: boolean = false;
  server: string = '';
  listado: any[] = [];
  opciones: any[] = [];
  tipos: any[] = [];
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService, public storage: SessionStorageService) { }

  ngOnInit(): void {
    this.loadListado();
    this.opciones = [
      { value: 1, name: 'Confidenciales', carpeta: 'documentos_clasificados/', tipo: 'documento_clasificados' },
      { value: 2, name: 'Limitados', carpeta: 'documentos_limitados/', tipo: 'documento_limitado' },
      { value: 3, name: 'Ordinarios', carpeta: 'documentos_ordinarios/', tipo: 'documento_ordinario' },
      { value: 4, name: 'Ordinarios Personales', carpeta: 'documentos_ordinarios_personales/', tipo: 'documento_ordinario_personal' },
      { value: 5, name: 'Secretos', carpeta: 'documentos_secretos/', tipo: 'documento_secreto' },
    ];
  }


  getDocumentFoto(e: any) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + e.tipo_doc.carpeta, e.tipo_doc.tipo).subscribe((result) => {
      // console.log(result);
    }, (error) => {
      console.log(error.url);
      e.image = error.url
    });
  }

  openPdf(e: any) {
    console.log('asda');

    this.api.openPdf(e.id, environment.dir_foto + e.tipo_doc.carpeta, e.tipo_doc.tipo).subscribe((result) => {
      console.log('sasda', result);
    }, (error) => {
      console.log(error);
      // e.image = error.url
    });
  }

  addClasificados() {
    let modal = this.modalService.open(ModalDocumentComponent);
    // modal.componentInstance.modalHeader = "Clasificados";
    // modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e) => {
      this.loadListado()
    })


  }

  editReport(item: any) {
    if (item.tipo_doc.tipo == "documento_clasificado") {

      let modal = this.modalService.open(ModalConfidencialComponent);
      modal.componentInstance.modalHeader = "Clasificados";
      modal.componentInstance.modalAction = "Editar";
      modal.componentInstance.clasificados = item;
      modal.result.then((e) => {
        this.loadListado();
      })
    }
    else if (item.tipo_doc.tipo == "documento_limitado") {

      let modal = this.modalService.open(ModalLimitadosComponent);
      modal.componentInstance.modalHeader = "Limitados";
      modal.componentInstance.modalAction = "Editar";
      modal.componentInstance.clasificados = item;
      modal.result.then((e) => {
        this.loadListado();
      })
    }
    else if (item.tipo_doc.tipo == "documento_ordinario") {

      let modal = this.modalService.open(ModalOrdinariosComponent);
      modal.componentInstance.modalHeader = "Ordinarios";
      modal.componentInstance.modalAction = "Editar";
      modal.componentInstance.clasificados = item;
      modal.result.then((e) => {
        this.loadListado();
      })
    }
    else if (item.tipo_doc.tipo == "documento_ordinario_personal") {

      let modal = this.modalService.open(ModalOrdinarioPersonalComponent);
      modal.componentInstance.modalHeader = "Ordinario_personal";
      modal.componentInstance.modalAction = "Editar";
      modal.componentInstance.clasificados = item;
      modal.result.then((e) => {
        this.loadListado();
      })
    }
    else if (item.tipo_doc.tipo == "documento_secreto") {

      let modal = this.modalService.open(ModalSecretosComponent);
      modal.componentInstance.modalHeader = "Secretos";
      modal.componentInstance.modalAction = "Editar";
      modal.componentInstance.clasificados = item;
      modal.result.then((e) => {
        this.loadListado();
      })
    }
  }

  deleteReportes(item: any) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = item.tipo_doc.name;
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = item.id;
    modal.result.then((e) => {
      this.loadListado();
    })
  }


  d(item: any) {
    if (this.seleccionados.filter((n) => n.id == item.id).length > 0) {
      this.seleccionados = this.seleccionados.filter((n) => n.id != item.id);
    }
    else
      this.seleccionados.push(item);
    console.log(this.seleccionados);
  }

  deleteAll() {
    if (this.seleccionados.length > 0) {
      for (let item of this.seleccionados) {
        console.log(item);

        this.deleteReportes(item);
        this.lib.success('Eliminados con exito!', 'Eliminar');
      }
    }
    else {
      this.lib.info('Debe seleccionar un elemento', 'No es posible');
    }
  }

  selecc() {
    //Ver si el checkbox esta seleccionado
    if (this.selec) {
      // Vaciar arreglo
      var des: any[] = [];
      this.seleccionados = des;
    }
    else {
      // Guardar todos los id en seleccionados
      var i = 0;
      for (let item of this.documentos) {
        this.seleccionados[i] = item;
        i++;
      }
    }
    this.selec = !this.selec;
    console.table(this.seleccionados);
  }

  loadListado() {
    this.loading = true;
    this.documentos = []
    if (this.tipos.length > 0) {
      this.tipos.forEach(i => {
        this.api.getDocuments(this.opciones[i - 1].tipo).subscribe((result) => {
          result.forEach((e) => {
            e.tipo_doc = this.opciones[i - 1]
            this.getDocumentFoto(e);
            this.documentos.push(e);
            console.log(new Date(Date.parse(e.fecha)));

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
