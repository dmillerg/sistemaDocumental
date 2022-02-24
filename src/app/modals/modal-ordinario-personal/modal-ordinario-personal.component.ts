import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordinario_personal } from 'src/app/models/ordinario.model.personal';
import { Ordinarios } from 'src/app/models/ordinarios.model';


@Component({
  selector: 'app-modal-ordinario-personal',
  templateUrl: './modal-ordinario-personal.component.html',
  styleUrls: ['./modal-ordinario-personal.component.css']
})
export class ModalOrdinarioPersonalComponent implements OnInit {

  ordinario: Ordinario_personal = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
    asunto: '',
    destino: '',
    archivo: '',
    procedencia: '',
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
