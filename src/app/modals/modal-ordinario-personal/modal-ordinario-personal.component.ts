import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdinariosPersonalComponent } from 'src/app/componentes/pages/ordinarios-personal/ordinarios-personal.component';
import { Ordinario_personal } from 'src/app/models/ordinario.model.personal';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-modal-ordinario-personal',
  templateUrl: './modal-ordinario-personal.component.html',
  styleUrls: ['./modal-ordinario-personal.component.css']
})
export class ModalOrdinarioPersonalComponent implements OnInit {

  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  

  ordinario_personal: Ordinario_personal = {
      id: -1,
      no: -1,
      fecha: '',
      procedencia: '',
      asunto: '',
      destino: '',
      archivo: '',
      imagen: '',
  }
  ordinarios_pasado: Ordinario_personal = {
    id: -1,
      no: -1,
      fecha: '',
      procedencia: '',
      asunto: '',
      destino: '',
      archivo: '',
      imagen: '',
  }

  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  rellenarSiEditas() {
    if (this.modalHeader == 'Editar') {
      this.ordinarios_pasado.id = this.ordinarios_pasado.id;
      this.ordinarios_pasado.no = this.ordinarios_pasado.no;
      this.ordinarios_pasado.fecha = this.ordinarios_pasado.fecha;
      this.ordinarios_pasado.procedencia = this.ordinarios_pasado.procedencia;
      this.ordinarios_pasado.asunto = this.ordinarios_pasado.asunto;
      this.ordinarios_pasado.destino = this.ordinarios_pasado.destino;
      this.ordinarios_pasado.archivo = this.ordinarios_pasado.archivo;
      this.ordinarios_pasado.imagen = this.ordinarios_pasado.imagen;
    }
  }

  addUpdateOrdinariosP() {
    let formData = new FormData();
    formData.append('id', this.ordinario_personal.id.toString());
    formData.append('no', this.ordinario_personal.no.toString());
    formData.append('fecha', this.ordinario_personal.fecha.toString());
    formData.append('procedencia', this.ordinario_personal.procedencia.toString());
    formData.append('asunto', this.ordinario_personal.asunto.toString());
    formData.append('archivo', this.ordinario_personal.archivo.toString());
    formData.append('destino', this.ordinario_personal.destino.toString());
    formData.append('imagen', this.ordinario_personal.imagen.toString());


    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateOrdinariosP(formData, this.ordinario_personal.id).subscribe((result) => {
        this.actiModal.close('Ordinario_personal');
        console.log(result);
      }, (error) => {
        this.actiModal.close('Ordinario_personal');
        console.log(error);
      });
    } else {
      
      this.api.addOrdinariosP(formData).subscribe((result) => {
        this.actiModal.close('Ordinario_personal');
        console.log(result);
      }, (error) => {
        console.log(error);
        this.actiModal.close('Ordinario_personal');
      })
      
    }

  }


}
