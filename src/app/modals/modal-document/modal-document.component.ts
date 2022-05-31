import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from 'src/app/service/api.service';
import { ModalClasificadosComponent } from '../modal-clasificados/modal-clasificados.component';
import { ModalLimitadosComponent } from '../modal-limitados/modal-limitados.component';
import { ModalOrdinarioPersonalComponent } from '../modal-ordinario-personal/modal-ordinario-personal.component';
import { ModalOrdinariosComponent } from '../modal-ordinarios/modal-ordinarios.component';
import { ModalSecretosComponent } from '../modal-secretos/modal-secretos.component';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.css']
})
export class ModalDocumentComponent implements OnInit {

  seleccionado: number = -1
  // actiModal: NgbActiveModal;
  documento: any = undefined;
  type: number=-1; 

  constructor(private api: ApiService, private modalService: NgbModal, public storage: SessionStorageService) {
    // this.actiModal = activeModal;
  }

  ngOnInit(): void {
    if(this.storage.retrieve('documento')){
      this.documento = this.storage.retrieve('documento');
    }
    this.storage.observe('documento').subscribe((re)=>{
      if(re){
        this.documento = re;
      }
    });
    if(this.storage.retrieve('type')){
      this.type = this.storage.retrieve('type');
      this.seleccionado = this.type; 
    }
    this.storage.observe('type').subscribe((re)=>{
      if(re){
        this.type = re;
        this.seleccionado = this.type;
      }
    });
  }

  changValue() {
    // console.log(this.seleccionado);
    // console.log(3 == this.seleccionado);

    // let modal = undefined;
    // if (this.seleccionado == 2) {
    //   modal = this.modalService.open(ModalClasificadosComponent);
    //   modal.componentInstance.modalAction = "Agregar";
    // }
    // if (this.seleccionado == 3) {
    //   modal = this.modalService.open(ModalLimitadosComponent);
    //   modal.componentInstance.modalAction = "Agregar";
    // }
    // if (this.seleccionado == 4) {
    //   modal = this.modalService.open(ModalOrdinariosComponent);
    //   modal.componentInstance.modalAction = "Agregar";
    // }
    // if (this.seleccionado == 5) {
    //   modal = this.modalService.open(ModalOrdinarioPersonalComponent);
    //   modal.componentInstance.modalAction = "Agregar";
    // }
    // if (this.seleccionado == 6) {
    //   modal = this.modalService.open(ModalSecretosComponent);
    //   modal.componentInstance.modalAction = "Agregar";
    // }
    // modal?.result.then((r) => {
    //   if (r) {

    //   } else {
    //     this.modalService.open(ModalDocumentComponent);
    //   }
    // });
    // this.actiModal.close();
  }

  loadScanner() {
    this.api.Scan().subscribe((result) => {
      console.log(result);

    })
  }
}
