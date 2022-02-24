import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Limitados } from 'src/app/models/limitados.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal-limitados',
  templateUrl: './modal-limitados.component.html',
  styleUrls: ['./modal-limitados.component.css']
})
export class ModalLimitadosComponent implements OnInit {

  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  

  limitados: Limitados = {
    id: -1,
    no: -1,
    procedencia: '',
    titulo: '',
    fecha: '',
    movimiento1: '',
    movimiento2: '',
    destruccion: '',
    expediente: '',
    observacion: '',
    imagen: ''
  }

  limitados_pasado: Limitados = {
    id: -1,
    no: -1,
    procedencia: '',
    titulo: '',
    fecha: '',
    movimiento1: '',
    movimiento2: '',
    destruccion: '',
    expediente: '',
    observacion: '',
    imagen: ''
  }

  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  rellenarSiEditas() {
    if (this.modalHeader == 'Editar') {
      this.limitados_pasado.id = this.limitados.id;
      this.limitados_pasado.no = this.limitados.no;
      this.limitados_pasado.procedencia = this.limitados.procedencia;
      this.limitados_pasado.titulo = this.limitados.titulo;
      this.limitados_pasado.fecha = this.limitados.fecha;
      this.limitados_pasado.movimiento1 = this.limitados.movimiento1;
      this.limitados_pasado.movimiento2 = this.limitados.movimiento2;
      this.limitados_pasado.destruccion = this.limitados.destruccion;
      this.limitados_pasado.expediente = this.limitados.expediente;
      this.limitados_pasado.observacion = this.limitados.observacion;
      this.limitados_pasado.imagen = this.limitados.imagen;
    }
  }

  addUpdateLimitados() {
    let formData = new FormData();
    formData.append('id', this.limitados.id.toString());
    formData.append('no', this.limitados.no.toString());
    formData.append('procedencia', this.limitados.procedencia.toString());
    formData.append('titulo', this.limitados.titulo.toString());
    formData.append('fecha', this.limitados.fecha.toString());
    formData.append('movimiento1', this.limitados.movimiento1.toString());
    formData.append('movimiento2', this.limitados.movimiento2.toString());
    formData.append('destruccion', this.limitados.destruccion.toString());
    formData.append('expediente', this.limitados.expediente.toString());
    formData.append('observacion', this.limitados.observacion.toString());
    formData.append('imagen', this.limitados.imagen.toString());


    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateLimitados(formData, this.limitados.id).subscribe((result) => {
        this.actiModal.close('Limitados');
        console.log(result);
      }, (error) => {
        this.actiModal.close('Limitados');
        console.log(error);
      });
    } else {
      this.api.addLimitados(formData).subscribe((result) => {
        this.actiModal.close('Limitados');
        console.log(result);
      }, (error) => {
        console.log(error);
        this.actiModal.close('Limitados');
      })
    }

  }

  loadImage() {
    
  }
}




