import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Clasificados } from 'src/app/models/clasificados.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal-clasificados',
  templateUrl: './modal-clasificados.component.html',
  styleUrls: ['./modal-clasificados.component.css']
})
export class ModalClasificadosComponent implements OnInit {

 
  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  

  clasificados: Clasificados = {
    id: 1,
      no: 2,
      fecha: 'a',
      enviado: 'a',
      rsb: 'a',
      rs: 'a',
      fecha_registro_ctc: 'a',
      asunto: 'a',
      doc: 'a',
      ej: 'a',
      clasif: 'a',
      destino: 'a',
      traslado: 'a',
      fecha_traslado: 'a',
      imagen: 'a'
    }

  selected: Clasificados = {
    id: -1,
    no: -1,
    fecha: '',
    enviado:'',
    rsb: '',
    rs: '',
    fecha_registro_ctc: '',
    asunto: '',
    doc: '',
    ej: '',
    clasif: '',
    destino: '',
    traslado: '',
    fecha_traslado: '',
    imagen: ''
  }

  clasificados_pasado: Clasificados = {
    id: -1,
    no: -1,
    fecha: '',
    enviado:'',
    rsb: '',
    rs: '',
    fecha_registro_ctc: '',
    asunto: '',
    doc: '',
    ej: '',
    clasif: '',
    destino: '',
    traslado: '',
    fecha_traslado: '',
    imagen: ''
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
      this.clasificados_pasado.id = this.clasificados.id;
      this.clasificados_pasado.no = this.clasificados.no;
      this.clasificados_pasado.fecha = this.clasificados.fecha;
      this.clasificados_pasado.enviado = this.clasificados.enviado;
      this.clasificados_pasado.rsb = this.clasificados.rsb;
      this.clasificados_pasado.rs = this.clasificados.rs;
      this.clasificados_pasado.fecha_registro_ctc = this.clasificados.fecha_registro_ctc;
      this.clasificados_pasado.asunto = this.clasificados.asunto;
      this.clasificados_pasado.doc = this.clasificados.doc;
      this.clasificados_pasado.ej = this.clasificados.ej;
      this.clasificados_pasado.clasif = this.clasificados.clasif;
      this.clasificados_pasado.destino = this.clasificados.destino;
      this.clasificados_pasado.traslado = this.clasificados.traslado;
      this.clasificados_pasado.fecha_traslado = this.clasificados.fecha_traslado;
      this.clasificados_pasado.imagen = this.clasificados.imagen;
 
      this.src_documento=this.clasificados.imagen;
      console.log(this.src_documento+"ffffff");
    }
  }

  addUpdateClasificados() {
    let formData = new FormData();
    formData.append('id', this.clasificados.id.toString());
    formData.append('no', this.clasificados.no.toString());
    formData.append('fecha', this.clasificados.fecha.toString());
    formData.append('enviado', this.clasificados.enviado.toString());
    formData.append('rsb', this.clasificados.rsb.toString());
    formData.append('rs', this.clasificados.rs.toString());
    formData.append('fecha', this.clasificados.fecha.toString());
    formData.append('asunto', this.clasificados.asunto.toString());
    formData.append('doc', this.clasificados.doc.toString());
    formData.append('ej', this.clasificados.ej.toString());
    formData.append('clasif', this.clasificados.clasif.toString());
    formData.append('destino', this.clasificados.destino.toString());
    formData.append('traslado', this.clasificados.traslado.toString());
    formData.append('fecha_registro_ctc', this.clasificados.fecha_registro_ctc.toString());
    formData.append('fecha_traslado', this.clasificados.fecha_traslado.toString());
    formData.append('imagen', this.clasificados.imagen.toString());
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }



    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateClasificados(formData, this.clasificados.id).subscribe((result) => {
        this.actiModal.close('Clasificados');
        console.log(result);
        this.lib.success('Editado con exito!','Editar');
      }, (error) => {
        this.actiModal.close('Clasificados');
        this.lib.error('No se pudo editar','Error');
        console.log(error);
      });
    } else {
      this.api.addClasificados(formData).subscribe((result) => {
        this.actiModal.close('Clasificados');
        console.log(result);
        this.lib.success('Agregado con exito!','Agregar');
      }, (error) => {
        console.log(error);
        this.actiModal.close('Clasificados');
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
