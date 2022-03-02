import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordinarios } from 'src/app/models/ordinarios.model';
import { OrdinariosComponent } from 'src/app/componentes/pages/ordinarios/ordinarios.component';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-ordinarios',
  templateUrl: './modal-ordinarios.component.html',
  styleUrls: ['./modal-ordinarios.component.css']
})
export class ModalOrdinariosComponent implements OnInit {

  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  

  ordinarios: Ordinarios = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
    rsb: '',
    rs: '',
    fecha_registro_ctc: '',
    asunto: '',
    destino: '',
    traslado: '',
    fecha_traslado: '',
    imagen: '',
  }
  ordinarios_pasado: Ordinarios = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
    rsb: '',
    rs: '',
    fecha_registro_ctc: '',
    asunto: '',
    destino: '',
    traslado: '',
    fecha_traslado: '',
    imagen: '',
  }

  src_documento: string = '';
  uploadFiles: Array<File> = [];
  
  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  rellenarSiEditas() {
    if (this.modalHeader == 'Editar') {
      this.ordinarios_pasado.id = this.ordinarios_pasado.id;
      this.ordinarios_pasado.no = this.ordinarios_pasado.no;
      this.ordinarios_pasado.fecha = this.ordinarios_pasado.fecha;
      this.ordinarios_pasado.enviado = this.ordinarios_pasado.enviado;
      this.ordinarios_pasado.rsb = this.ordinarios_pasado.rsb;
      this.ordinarios_pasado.rs = this.ordinarios_pasado.rs;
      this.ordinarios_pasado.fecha_registro_ctc = this.ordinarios_pasado.fecha_registro_ctc;
      this.ordinarios_pasado.asunto = this.ordinarios_pasado.asunto;
      this.ordinarios_pasado.traslado = this.ordinarios_pasado.traslado;
      this.ordinarios_pasado.fecha_traslado = this.ordinarios_pasado.fecha_traslado;
      this.ordinarios_pasado.destino = this.ordinarios_pasado.destino;
      this.ordinarios_pasado.imagen = this.ordinarios_pasado.imagen;
    }
  }

  addUpdateOrdinarios() {
    let formData = new FormData();
    formData.append('id', this.ordinarios.id.toString());
    formData.append('no', this.ordinarios.no.toString());
    formData.append('fecha', this.ordinarios.fecha.toString());
    formData.append('enviado', this.ordinarios.enviado.toString());
    formData.append('rs', this.ordinarios.rs.toString());
    formData.append('rsb', this.ordinarios.rsb.toString());
    formData.append('fecha_registro_ctc', this.ordinarios.fecha_registro_ctc.toString());
    formData.append('asunto', this.ordinarios.asunto.toString());
    formData.append('traslado', this.ordinarios.traslado.toString());
    formData.append('fecha_traslado', this.ordinarios.fecha_traslado.toString());
    formData.append('destino', this.ordinarios.destino.toString());
    formData.append('imagen', this.ordinarios.imagen.toString());
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }

    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateOrdinarios(formData, this.ordinarios.id).subscribe((result) => {
        this.actiModal.close('Ordinarios');
        console.log(result);
        this.lib.success('Editado con exito!','Editar');
      }, (error) => {
        this.actiModal.close('Ordinarios');
        console.log(error);
        this.lib.error('No se pudo editar','Error');

      });
    } else {
      
      this.api.addOrdinarios(formData).subscribe((result) => {
        this.actiModal.close('Ordinarios');
        console.log(result);
        this.lib.success('Agregado con exito!','Agregar');
      }, (error) => {
        console.log(error);
        this.actiModal.close('Ordinarios');
        this.lib.error('No se pudo agregar','Error');
      })
      
    }

  }
  fileEvent(fileInput: any) {
    // console.log(typeof('s'))
    let file = fileInput.target.files[0];
    //  console.log(fileInput);
    this.uploadFiles = fileInput.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      this.src_documento = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
