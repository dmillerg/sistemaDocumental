import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { Ordinario_personal } from 'src/app/models/ordinario.model.personal';
import { ModalOrdinarioPersonalComponent } from 'src/app/modals/modal-ordinario-personal/modal-ordinario-personal.component';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ordinarios-personal',
  templateUrl: './ordinarios-personal.component.html',
  styleUrls: ['./ordinarios-personal.component.css']
})
export class OrdinariosPersonalComponent implements OnInit {

 
  ordinario_personal: Ordinario_personal[] = [
    {
      id: 1,
      no: 2,
      fecha: 'a',
      procedencia: 'a',
      asunto: 'a',
      destino: 'a',
      archivo: 'a',
      imagen: 'a'
    },
    {
      id: 1,
      no: 2,
      fecha: 'a',
      procedencia: 'a',
      asunto: 'a',
      destino: 'a',
      archivo: 'a',
      imagen: 'a'
    }
  ];

  selected: Ordinario_personal = {
    id: 1,
    no: 2,
    fecha: 'a',
    procedencia: 'a',
    asunto: 'a',
    destino: 'a',
    archivo: 'a',
    imagen: 'a',
  };

  server: string = '';
  loading: boolean = false
  constructor(private api: ApiService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadOrdinariosP();
  }

  loadOrdinariosP(){
    this.api.getOrdinariosP().subscribe((result)=>{
      this.ordinario_personal = result;
      this.ordinario_personal.forEach((e) => {
        console.log(e);
        this.getDocumentFoto(e);
      })
      this.loading = false;
    })
  }

  getDocumentFoto(e: Ordinario_personal) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + 'documentos_ordinarios_personales/', 'documento_ordinario_personal').subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error.url);
      e.imagen = error.url
    });
  }

  detailToggle(item: Ordinario_personal) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addOrdinariosP(){
    let modal = this.modalService.open(ModalOrdinarioPersonalComponent);
    modal.componentInstance.modalHeader = "Ordinario_personal";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadOrdinariosP();
    })
  }

  editOrdinariosP(item:Ordinario_personal){
    let modal = this.modalService.open(ModalOrdinarioPersonalComponent);
    modal.componentInstance.modalHeader = "Ordinario_personal";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.usuario = item;
    modal.result.then((e)=>{
      this.loadOrdinariosP();
    })
  }

  deleteOrdinariosP(idd: number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Ordinario_personal";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadOrdinariosP();
    })
  }

}