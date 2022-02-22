import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordinarios } from 'src/app/models/ordinarios.model';

@Component({
  selector: 'app-modal-ordinarios',
  templateUrl: './modal-ordinarios.component.html',
  styleUrls: ['./modal-ordinarios.component.css']
})
export class ModalOrdinariosComponent implements OnInit {

  ordinario: Ordinarios = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
    rsb: '',
    rs: '',
    fecha_registro_ctc: '',
    asunto: '',
    destino: '',
    traslado: '',
    fecha_traslado: '',
    imagen: '',
  }

  actiModal: NgbActiveModal;

  constructor(private activeModal: NgbActiveModal) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  addOrUpdateOrdinario(){
    console.log('asd')
  }
}
