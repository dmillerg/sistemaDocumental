import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Clasificados } from 'src/app/models/clasificados.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal-clasificados',
  templateUrl: './modal-clasificados.component.html',
  styleUrls: ['./modal-clasificados.component.css']
})
export class ModalClasificadosComponent implements OnInit {


  actiModal: NgbActiveModal;
  modalHeader: string = '';
  @Input() modalAction: string = '';
  errorN: string = "";
  exito: string = "";

  clasificados: Clasificados = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
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
    imagen: '',
    tipo: '',
  }

  selected: Clasificados = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
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
    imagen: '',
    tipo: '',
  }

  clasificados_pasado: Clasificados = {
    id: -1,
    no: -1,
    fecha: '',
    enviado: '',
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
    imagen: '',
    tipo: '',
  }

  src_documento: string = '';
  uploadFiles: Array<File> = [];

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
    if (this.modalAction != 'Editar') {
      this.api.getLastNumberDocument('documento_clasificado').subscribe((result) => {
        this.clasificados.no = parseInt(result) + 1;
      }, (error) => {
        console.log(error)
      })
    }
    this.rellenarSiEditas();
  }

  change() {
    console.log(Date.parse(this.clasificados.fecha));
    console.log(new Date(Date.parse(this.clasificados.fecha)));
  }

  rellenarSiEditas() {
    this.src_documento = this.clasificados.imagen;
    if (this.modalAction == 'Editar') {
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
      this.clasificados_pasado.tipo = this.clasificados.tipo;
    }
  }

  addUpdateClasificados() {
    console.log(this.clasificados_pasado.no, this.clasificados.no, this.clasificados_pasado.no == this.clasificados.no)
    if (this.clasificados_pasado.no == this.clasificados.no) {
      this.actionUpdateOrRegister();
    } else {
      this.api.getClasificados().subscribe((result) => {
        if (result.filter((n) => n.no == this.clasificados.no).length <= 0) {
          this.actionUpdateOrRegister();
        }
        else {
          this.errorN = "El numero introducido ya existe";
        }

      })
    }

  }

  actionUpdateOrRegister() {
    let formData = new FormData();
    console.log(this.clasificados.fecha);

    formData.append('id', this.clasificados.id.toString());
    formData.append('no', this.clasificados.no.toString());
    formData.append('fecha', this.clasificados.fecha.toString());
    formData.append('enviado', this.clasificados.enviado.toString());
    formData.append('rsb', this.clasificados.rsb.toString());
    formData.append('rs', this.clasificados.rs.toString());
    formData.append('asunto', this.clasificados.asunto.toString());
    formData.append('doc', this.clasificados.doc.toString());
    formData.append('ej', this.clasificados.ej.toString());
    formData.append('clasif', this.clasificados.clasif.toString());
    formData.append('destino', this.clasificados.destino.toString());
    formData.append('traslado', this.clasificados.traslado.toString());
    formData.append('fecha_registro_ctc', this.clasificados.fecha_registro_ctc.toString());
    formData.append('fecha_traslado', this.clasificados.fecha_traslado.toString());
    formData.append('imagen', this.clasificados.imagen.toString());
    formData.append('tipo', this.clasificados.tipo.toString());
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
        this.lib.success('Editado con exito!', 'Editar');
      }, (error) => {
        this.actiModal.close('Clasificados');
        this.lib.error('No se pudo editar', 'Error');
        console.log(error);
      });
    } else {
      this.api.addClasificados(formData).subscribe((result) => {
        this.actiModal.close('Clasificados');
        console.log(result);
        this.lib.success('Agregado con exito!', 'Agregar');
      }, (error) => {
        console.log(error);
        this.actiModal.close('Clasificados');
        this.lib.error('No se pudo agregar', 'Error');
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
    this.exito = "Subido con exito";
  }

  validarCamposVacios() {
    //console.log(this.clasificados.imagen.toString());

    // console.log('heree '+this.clasificados.imagen);
    return this.clasificados.destino.length > 0 && this.clasificados.clasif.length > 0 && this.clasificados.asunto.length > 0 &&
      this.clasificados.rsb.length > 0 && this.clasificados.rs.length > 0 && this.clasificados.doc.length > 0
      && this.clasificados.ej.length > 0 && this.clasificados.traslado.length > 0 && this.clasificados.enviado.length > 0
      && this.clasificados.fecha.toString() != '' && this.clasificados.fecha_traslado.toString() != ''
      && this.clasificados.fecha_registro_ctc.toString() != '' && this.exito == "Subido con exito"


  }

  loadScanner() {
    this.api.Scan().subscribe((result) => {
      console.log(result);

    })
  }


}