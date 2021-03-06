import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';


import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { ModalClasificadosComponent } from 'src/app/modals/modal-clasificados/modal-clasificados.component';
import { ModalLimitadosComponent } from 'src/app/modals/modal-limitados/modal-limitados.component';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { ModalOrdinarioPersonalComponent } from 'src/app/modals/modal-ordinario-personal/modal-ordinario-personal.component';
import { ModalSecretosComponent } from 'src/app/modals/modal-secretos/modal-secretos.component';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
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
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  animations: [listAnimation, scaleAnimation]
})
export class ReportesComponent implements OnInit, OnDestroy {

  documentos: any[] = [];
  selec = false;
  seleccionados: any[] = [];

  inicio: string = '';
  fin: string = '';
  proceder: string = '';
  mes: string = '';
  dia: string = '';

  loading: boolean = false;
  server: string = '';
  listado: any[] = [];
  opciones: any[] = [];
  values: any[] = [];
  tipos: any[] = [1, 2, 3, 4, 5];
  tipos2: any[] = [1, 2];
  minDate: string = ''
  today: string = ''
  constructor(private api: ApiService,
    private modalService: NgbModal,
    private lib: ToastrService,
    public storage: SessionStorageService,
    private router: Router) { }

  ngOnDestroy(): void {
    // this.storage.clear('type');
    // this.storage.clear('documento');
  }

  ngOnInit(): void {

    this.opciones = [
      { value: 1, name: 'Clasificados', carpeta: 'documentos_clasificados/', tipo: 'documento_clasificado' },
      { value: 2, name: 'Limitados', carpeta: 'documentos_limitados/', tipo: 'documento_limitado' },
      { value: 3, name: 'Ordinarios', carpeta: 'documentos_ordinarios/', tipo: 'documento_ordinario' },
      { value: 4, name: 'Ordinarios Personales', carpeta: 'documentos_ordinarios_personales/', tipo: 'documento_ordinario_personal' },
      { value: 5, name: 'Secretos', carpeta: 'documentos_secretos/', tipo: 'documento_secreto' },
    ];
    this.values = [
      { value: 1, name: 'Emitido' },
      { value: 2, name: 'Recibido' }
    ];
    if (new Date().getMonth() + 1 < 10)
      this.mes = "0" + (new Date().getMonth() + 1).toString();
    else
      this.mes = (new Date().getMonth() + 1).toString();
    if (new Date().getDate() < 10)
      this.dia = "0" + new Date().getDate().toString();
    else
      this.dia = new Date().getDate().toString();
    this.today = new Date().getFullYear().toString() + "-" + this.mes + "-" + this.dia;
    this.fin = this.today;
    this.loadListado();
  }

  getDocumentFoto(e: any) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + e.tipo_doc.carpeta, e.tipo_doc.tipo).subscribe((result) => {
    }, (error) => {
      e.image = error.url
    });
  }

  openPdf(e: any) {
    this.api.openPdf(e.id, environment.dir_foto + e.tipo_doc.carpeta, e.tipo_doc.tipo).subscribe((result) => {
    }, (error) => {
      console.log(error);
      // e.image = error.url
    });
  }

  loadListado() {
    this.loading = true;
    this.documentos = []
    var listaNew = '';
    if (this.tipos.length > 0) {
      listaNew += "(";
      if (this.tipos2.length > 0) {
        this.tipos2.forEach(i => {
          if (i == 2 && listaNew.length > 1) {
            listaNew += ', ' + "'" + i + "'";
          } else
            listaNew += "'" + i + "'";
        });
      }
      listaNew += ")";
      this.tipos.forEach((i, k) => {

        this.api.getDocuments(this.opciones[i - 1].tipo, '', this.fin, this.proceder, listaNew).subscribe((result) => {
          result.forEach((e) => {
            e.tipo_doc = this.opciones[i - 1]
            this.getDocumentFoto(e);
            this.documentos.push(e);
          });
          console.log('k ',k,'tipos ',this.tipos.length,' mindate ',this.minDate.length);
          
          if (this.minDate.length == 0 && k == this.tipos.length - 1) {
            this.recogerMinDate(this.documentos);
          }
          this.loading = false
        }, (error) => {
          if(this.minDate.length == 0 && this.documentos.length>0){
            this.recogerMinDate(this.documentos);
          }
          console.log('ERROR', error);
          this.server = 'Error comunicandose con el servidor por favor intentelo m??s tarde';
        });
      });
    } else {
      this.loading = false;
    }
  }

  recogerMinDate(result: any[]) {
    let d = new Date();
    result.forEach((e) => {
      let dd = new Date(Date.parse(e.fecha));
      console.log('fecha'+dd);
      if (d > dd) {
        d = dd;
      }
    });
    let day: string = '';
    let month: string = '';
    if (d.getMonth() + 1 < 10) month = '0' + (d.getMonth() + 1); else (d.getMonth() + 1).toString();
    if (d.getDate() < 10) day = '0' + d.getDate(); else day = d.getDate().toString();
    this.minDate = d.getFullYear().toString() + '-' + month + '-' + day;
    console.log(this.minDate);
    this.inicio = this.minDate;
  }

  salida(result: any) {
    this.tipos = result;
    this.loadListado();
  }

  salida2() {
    this.loadListado();
  }

  salida3() {
    this.loadListado();
  }

  salida4(result: any) {
    this.tipos2 = result;
    this.loadListado();
  }

  edit(item: any) {
    //   if (item.tipo_doc.tipo == "documento_clasificado") {
    //     let modal = this.modalService.open(ModalClasificadosComponent);
    //     modal.componentInstance.modalHeader = "Clasificados";
    //     modal.componentInstance.modalAction = "Editar";
    //     modal.componentInstance.clasificados = item;
    //     modal.result.then((e) => {
    //       this.loadListado();
    //     })
    //   }
    //   else if (item.tipo_doc.tipo == "documento_limitado") {
    //     let modal = this.modalService.open(ModalLimitadosComponent);
    //     modal.componentInstance.modalHeader = "Limitados";
    //     modal.componentInstance.modalAction = "Editar";
    //     modal.componentInstance.limitados = item;
    //     modal.result.then((e) => {
    //       this.loadListado();
    //     })
    //   }
    //   else if (item.tipo_doc.tipo == "documento_ordinario") {
    //     let modal = this.modalService.open(ModalOrdinariosComponent);
    //     modal.componentInstance.modalHeader = "Ordinarios";
    //     modal.componentInstance.modalAction = "Editar";
    //     modal.componentInstance.ordinarios = item;
    //     modal.result.then((e) => {
    //       this.loadListado();
    //     })
    //   }
    //   else if (item.tipo_doc.tipo == "documento_ordinario_personal") {
    //     let modal = this.modalService.open(ModalOrdinarioPersonalComponent);
    //     modal.componentInstance.modalHeader = "Ordinarios Personales";
    //     modal.componentInstance.modalAction = "Editar";
    //     modal.componentInstance.ordinario_personal = item;
    //     modal.result.then((e) => {
    //       this.loadListado();
    //     })
    //   }
    //   else if (item.tipo_doc.tipo == "documento_secreto") {
    //     let modal = this.modalService.open(ModalSecretosComponent);
    //     modal.componentInstance.modalHeader = "Secretos";
    //     modal.componentInstance.modalAction = "Editar";
    //     modal.componentInstance.secretos = item;
    //     modal.result.then((e) => {
    //       this.loadListado();
    //     })
    //   }
    let type = -1;
    switch (item.tipo_doc.tipo) {
      case "documento_clasificado":
        type = 2;
        break;
      case "documento_limitado":
        type = 3;
        break;
      case "documento_ordinario":
        type = 4;
        break;
      case "documento_ordinario_personal":
        type = 5;
        break;
      case "documento_secreto":
        type = 6;
        break;
    }
    this.storage.store('documento', item);
    this.storage.store('type', type);
    this.router.navigate(['documentos'])
  }

  delete(idd: number, item: any) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = item.tipo_doc.name;
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadListado();
    })
  }

  deleteAll() {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = 'Todo';
    modal.componentInstance.modalAction = "Eliminar";
    // modal.componentInstance.id = idd;
    modal.componentInstance.seleccionados = this.seleccionados;
    modal.result.then((e) => {
      this.loadListado();
    })
  }

  d(item: any) {
    if (this.seleccionados.filter((n) => n == item.id).length > 0) {
      this.seleccionados = this.seleccionados.filter((n) => n != item.id);
    }
    else
      this.seleccionados.push({ id: item.id, tipo_doc: item.tipo_doc.tipo });
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
      for (let item of this.documentos) {
        this.seleccionados[i] = { id: item.id, tipo_doc: item.tipo_doc.tipo };
        i++;
      }
    }
    this.selec = !this.selec;
    console.table(this.seleccionados);
  }

  createReporte() {
    let formData = new FormData();

    formData.append('reportes', this.documentos.toString());
    this.api.createReporte(this.documentos).subscribe(result => {
      console.log(result);
      let filename = result.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      let blob: Blob = result.body as Blob;
      let a = document.createElement('a');
      let date = new Date();
      let fecha = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString() +'/' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()).toString() +'/'+ date.getFullYear().toString();
      a.download = 'reportes-' + fecha + '.xlsx';
      a.href = window.URL.createObjectURL(blob)
      a.target = "_blank"
      a.click();
    })
  }
}
