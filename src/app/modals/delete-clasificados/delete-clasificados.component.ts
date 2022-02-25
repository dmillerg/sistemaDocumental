import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clasificados } from 'src/app/models/clasificados.service';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-delete-clasificados',
  templateUrl: './delete-clasificados.component.html',
  styleUrls: ['./delete-clasificados.component.css']
})
export class DeleteClasificadosComponent implements OnInit {

 
  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  
  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  preguntar(){
   this.actiModal.close();

   //Insertar ventana emergente
    const element: HTMLElement = document.getElementById('cont') as HTMLElement
    element.innerHTML += '<section id="aa">  <div id="d" class="square_box box_three"></div> <div class="square_box box_four"></div><div class="container mt-5"><div class="row"><div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"> <i class="start-icon far fa-check-circle faa-tada animated"></i> <strong class="font__weight-semibold">Eliminado con exito!</strong></div></div></div></section>'

    //Eliminar ventana emergente luego de 2 segundos
    setTimeout(function(){
   document.querySelector(".row")?.remove();
  }, 2000);
 }

}
