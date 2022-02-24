import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLimitadosComponent } from 'src/app/modals/modal-limitados/modal-limitados.component';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { Ordinarios } from 'src/app/models/ordinarios.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ordinarios',
  templateUrl: './ordinarios.component.html',
  styleUrls: ['./ordinarios.component.css']
})
export class OrdinariosComponent implements OnInit {

  
  ordinarios: Ordinarios[] = [
    {
      id: 1,
      no: 2,
      fecha: 'a',
      enviado: 'a',
      rsb: 'a',
      rs: 'a',
      fecha_registro_ctc: 'a',
      asunto: 'a',
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
      destino: 'a',
      traslado: 'a',
      fecha_traslado: 'a',
      imagen: 'a'
    }
  ];

  selected: Ordinarios = {
    id: 1,
    no: 2,
    fecha: 'a',
    enviado: 'a',
    rsb: 'a',
    rs: 'a',
    fecha_registro_ctc: 'a',
    asunto: 'a',
    destino: 'a',
    traslado: 'a',
    fecha_traslado: 'a',
    imagen: 'a',
  };

  constructor(private api: ApiService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadOrdinarios();
  }

  loadOrdinarios(){
    this.api.getOrdinarios().subscribe((result)=>{
      this.ordinarios = result;
    })
  }

  detailToggle(item: Ordinarios) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addOrdinarios(){
    let modal = this.modalService.open(ModalOrdinariosComponent);
    modal.componentInstance.modalHeader = "Ordinarios";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadOrdinarios();
    })
  }


}
