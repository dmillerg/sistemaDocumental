import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Secreto } from 'src/app/models/secreto.model';
import { ApiService } from 'src/app/service/api.service';
import { ModalSecretosComponent } from 'src/app/modals/modal-secretos/modal-secretos.component';
@Component({
  selector: 'app-secretos',
  templateUrl: './secretos.component.html',
  styleUrls: ['./secretos.component.css']
})
export class SecretosComponent implements OnInit {

  secretos: Secreto[] = [
    {
      id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no:-1,
    folio_no: -1,
    cant: -1,
    no_ejemplar: -1,
    cant_hojas: -1,
    destruccion: '',
    destino: '',
    comp: '',
    imagen:''
    }
  ];

  selected: Secreto = {
    id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no:-1,
    folio_no: -1,
    cant: -1,
    no_ejemplar: -1,
    cant_hojas: -1,
    destruccion: '',
    destino: '',
    comp: '',
    imagen:'',
  };

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  loadSecretos() {
    this.api.getSecretos().subscribe((result) => {
      this.secretos = result;
    });
  }

  detailToggle(item: Secreto) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addSecretos(){
    let modal = this.modalService.open(ModalSecretosComponent);
    modal.componentInstance.modalHeader = "Secretos";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadSecretos();
    })
  }

}
