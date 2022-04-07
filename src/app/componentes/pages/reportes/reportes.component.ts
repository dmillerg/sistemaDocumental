import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClasificadosComponent } from 'src/app/modals/modal-clasificados/modal-clasificados.component';
import { Clasificados } from 'src/app/models/clasificados.service';
import { ApiService } from 'src/app/service/api.service';

import { DeleteComponent } from 'src/app/modals/delete/delete.component';

import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ModalDocumentComponent } from 'src/app/modals/modal-document/modal-document.component';
import { ModalSecretosComponent } from 'src/app/modals/modal-secretos/modal-secretos.component';
import { ModalOrdinarioPersonalComponent } from 'src/app/modals/modal-ordinario-personal/modal-ordinario-personal.component';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { ModalLimitadosComponent } from 'src/app/modals/modal-limitados/modal-limitados.component';
import { LocalizedString } from '@angular/compiler';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  documentos: any[] = [];
  selec = false;
  seleccionados: any[] = [];

  inicio:string = '';
  fin:string = '';
  proceder:string = '';
  mes:string = '';
  dia:string = '';

  today:string = '';
 
  loading: boolean = false;
  server: string = '';
  listado: any[] = [];
  opciones: any[] = [];
  values: any[] = [];
  tipos: any[] = [1,2,3,4,5];
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService) { }

  ngOnInit(): void {

    this.opciones = [
      { value: 1, name: 'Clasificados', carpeta: 'documentos_clasificados/', tipo: 'documento_clasificado' },
      { value: 2, name: 'Limitados', carpeta: 'documentos_limitados/', tipo: 'documento_limitado' },
      { value: 3, name: 'Ordinarios', carpeta: 'documentos_ordinarios/', tipo: 'documento_ordinario' },
      { value: 4, name: 'Ordinarios Personales', carpeta: 'documentos_ordinarios_personales/', tipo: 'documento_ordinario_personal' },
     { value: 5, name: 'Secretos', carpeta: 'documentos_secretos/', tipo: 'documento_secreto' },
    ];
    this.values = [
      { value: 1, name: 'Emitido'},
      { value: 2, name: 'Recibido'}
    ];
    if(new Date().getMonth()<10)
    this.mes =  "0"+new Date().getMonth().toString();
   else
   this.mes =  new Date().getMonth().toString();

   if(new Date().getDay()<10)
    this.dia =  "0"+new Date().getDay().toString();
   else
   this.dia =  new Date().getDay().toString();

   this.today = new Date().getFullYear().toString() +"-"+ this.mes+"-"+this.dia;


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

  openPdf(e: any){
    console.log('asda');
    
    this.api.openPdf(e.id, environment.dir_foto + e.tipo_doc.carpeta, e.tipo_doc.tipo).subscribe((result) => {
      console.log('sasda',result);
    }, (error) => {
      console.log(error);
      // e.image = error.url
    });
  }

  loadListado() {
    
    console.log(this.today);
    this.loading = true;
    this.documentos = []
    if (this.tipos.length > 0) {
      this.tipos.forEach(i => {
        console.log(this.proceder+'procccc');
        this.api.getDocuments(this.opciones[i - 1].tipo,this.inicio,this.fin, this.proceder,this.values[i-1].name).subscribe((result) => {
          console.log(result+"result");
          result.forEach((e) => {
            e.tipo_doc = this.opciones[i - 1]
            this.getDocumentFoto(e);
            this.documentos.push(e);
          });
          this.loading = false
        }, (error) => {
          this.server = 'Error comunicandose con el servidor por favor intentelo más tarde';
        });
      });

    } else {
      this.loading = false;
    }
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


}
