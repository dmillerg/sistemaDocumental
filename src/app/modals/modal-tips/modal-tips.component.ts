import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-modal-tips',
  templateUrl: './modal-tips.component.html',
  styleUrls: ['./modal-tips.component.css']
})
export class ModalTipsComponent implements OnInit {

  actiModal: NgbActiveModal;
  titulo: string = '';
  subtitulo: string = '';
  descripcion: string = '';

  constructor(private api: ApiService, private modalService: NgbModal, public storage: SessionStorageService, private activeModal: NgbActiveModal) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {

  }


}
