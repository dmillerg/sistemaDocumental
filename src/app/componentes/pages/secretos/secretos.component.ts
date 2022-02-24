import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSecretoComponent } from 'src/app/modals/modal-documento-secrerto/modal-secreto.component';
import { Secreto } from 'src/app/models/secreto.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-secretos',
  templateUrl: './secretos.component.html',
  styleUrls: ['./secretos.component.css']
})
export class SecretosComponent implements OnInit {


  secretos: Secreto[] = [];

  selected: Secreto = {
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

  addUsuario(){
    let modal = this.modalService.open(ModalSecretoComponent);
    modal.componentInstance.modalHeader = "Usuarios";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadSecretos();
    })
  }

}
