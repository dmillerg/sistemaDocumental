import { Component, OnInit, Type } from '@angular/core';
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

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

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
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService, public storage: SessionStorageService) { }

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

  loadListado() {
    this.loading = true;
    this.documentos = []
    var listaNew = '';
    if (this.tipos.length > 0) {
      listaNew += "(";
      if (this.tipos2.length > 0) {
        this.tipos2.forEach(i => {
          if (i == 2&& listaNew.length>1) {
            listaNew += ', '+"'" + i + "'";
          }else
            listaNew += "'" + i + "'";
        });
      }
      listaNew += ")";
      this.tipos.forEach(i => {

        this.api.getDocuments(this.opciones[i - 1].tipo, this.inicio, this.fin, this.proceder, listaNew).subscribe((result) => {
          result.forEach((e) => {
            e.tipo_doc = this.opciones[i - 1]
            this.getDocumentFoto(e);
            this.documentos.push(e);
          });


          if (this.minDate == "") {
            this.recogerMinDate(result);
          }
          this.loading = false
        }, (error) => {
          this.server = 'Error comunicandose con el servidor por favor intentelo más tarde';
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
    // var fechaInicio = new Date(Date.parse(this.inicio));
    // var fechaFin = new Date(Date.parse(this.fin));

    // if(fechaFin<fechaInicio)
    // this.lib.warning('La fecha final debe ser mayor a la inicial', 'Datos mal!');
    // else
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
    if(item.tipo_doc.tipo=="documento_clasificado"){
      console.log('ggg');
    let modal = this.modalService.open(ModalClasificadosComponent);
    modal.componentInstance.modalHeader = "Clasificados";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.clasificados = item;
    modal.result.then((e) => {
      this.loadListado();
    })
  }
  else if(item.tipo_doc.tipo=="documento_limitado"){
    let modal = this.modalService.open(ModalLimitadosComponent);
    modal.componentInstance.modalHeader = "Limitados";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.limitados = item;
    modal.result.then((e) => {
      this.loadListado();
    })
  }
  else if(item.tipo_doc.tipo=="documento_ordinario"){
    let modal = this.modalService.open(ModalOrdinariosComponent);
    modal.componentInstance.modalHeader = "Ordinarios";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.ordinarios = item;
    modal.result.then((e) => {
      this.loadListado();
    })
  }
  else if(item.tipo_doc.tipo=="documento_ordinario_personal"){
    let modal = this.modalService.open(ModalOrdinarioPersonalComponent);
    modal.componentInstance.modalHeader = "Ordinarios Personales";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.ordinario_personal = item;
    modal.result.then((e) => {
      this.loadListado();
    })
  }
  else if(item.tipo_doc.tipo=="documento_secreto"){
    let modal = this.modalService.open(ModalSecretosComponent);
    modal.componentInstance.modalHeader = "Secretos";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.secretos = item;
    modal.result.then((e) => {
      this.loadListado();
    })
  }
  }

  delete(idd: number, item:any) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = item.tipo_doc.name;
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadListado();
    })
  
  }

  d(id:number){

    if(this.seleccionados.filter((n)=>n==id).length>0){
      this.seleccionados =this.seleccionados.filter((n)=>n!=id);
    }
    else
    this.seleccionados.push(id);
    console.log(this.seleccionados);
    
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
        this.seleccionados[i] = item.id;
        i++;
      }
    }
    this.selec = !this.selec;
    console.table(this.seleccionados);

  }

  deleteAll() {
   
    if(this.seleccionados.length>0){

    for (let idd of this.seleccionados)
     this.api.deleteLimitados(idd).subscribe(result=>{this.loadListado();});

    
 this.lib.success('Eliminados con exito!','Eliminar');

    }
    else{
     this.lib.info('Debe seleccionar un elemento','No es posible');
    }
}
}
