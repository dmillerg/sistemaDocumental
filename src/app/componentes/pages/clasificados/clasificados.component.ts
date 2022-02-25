import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClasificadosComponent } from 'src/app/modals/modal-clasificados/modal-clasificados.component';
import { Clasificados } from 'src/app/models/clasificados.service';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.component.html',
  styleUrls: ['./clasificados.component.css']
})
export class ClasificadosComponent implements OnInit {


  clasificados: Clasificados[] = [
    {
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
      imagen: 'a'
    },
    {
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
      imagen: 'a'
    }
  ];

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
      this.loading = false;

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

  preguntar(){
   var resultado = window.confirm('Seguro que desea eliminar el documento?');
if (resultado === true) {
    window.alert('Okay, si estas seguro.');
} else { 
    window.alert('Pareces indeciso');
}
/*
document.getElementById('cont')?.innerHTML='<div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">   <button type="button" class="close font__size-18" data-dismiss="alert"                   <span aria-hidden="true"><a>
                          <i class="fa fa-times greencross"></i>
                          </a></span>
                                          <span class="sr-only">Close</span> 
                                      </button>
                <i class="start-icon far fa-check-circle faa-tada animated"></i>
                <strong class="font__weight-semibold">Well done!</strong> You successfullyread this important.
              </div>';
*/}
}
