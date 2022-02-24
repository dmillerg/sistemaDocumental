import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Secreto } from 'src/app/models/secreto.model';

@Component({
  selector: 'app-modal-secreto',
  templateUrl: './modal-secreto.component.html',
  styleUrls: ['./modal-secreto.component.css']
})
export class ModalSecretoComponent implements OnInit {

  ordinario: Secreto = {
    id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no: '',
    folio_no: '',
    cant: '',
    no_ejemplar: '',
    cant_hojas: '',
    destruccion: '',
    destino: '',
    comp: '',
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
