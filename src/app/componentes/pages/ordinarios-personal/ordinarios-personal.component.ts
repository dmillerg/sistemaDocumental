import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { Ordinario_personal } from 'src/app/models/ordinario.model.personal'; 
import { ModalOrdinarioPersonalComponent } from 'src/app/modals/modal-ordinario-personal/modal-ordinario-personal.component';



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

  constructor(private api: ApiService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadOrdinariosP();
  }

  loadOrdinariosP(){
    this.api.getOrdinariosP().subscribe((result)=>{
      this.ordinario_personal = result;
    })
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

}
