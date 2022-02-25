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
  //  var resultado = window.confirm('Seguro que desea eliminar el documento?');
 //if (resultado === true) {
   const element: HTMLElement = document.getElementById('cont') as HTMLElement
   element.innerHTML += '<div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">   <button type="button" class="close font__size-18" data-dismiss="alert"  <span aria-hidden="true"><a> <i class="fa fa-times greencross"></i> </a></span> <span class="sr-only">Close</span>  </button> <i class="start-icon far fa-check-circle faa-tada animated"></i> <strong class="font__weight-semibold">Eliminado con exito!</strong></div>'
   
 //} 
 }

}
