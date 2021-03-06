import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordinarios } from 'src/app/models/ordinarios.model';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-ordinarios',
  templateUrl: './modal-ordinarios.component.html',
  styleUrls: ['./modal-ordinarios.component.css']
})
export class ModalOrdinariosComponent implements OnInit {

  modalHeader: string = '';
  @Input() modalAction: string = '';
  errorN: string = "";
  exito: string = "";

  @Input() ordinarios: Ordinarios = {
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
    tipo: '',
  }
  @Input() ordinarios_pasado: Ordinarios = {
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
    tipo: '',
  }
  minDate: string = '';

  src_documento: string = '';
  uploadFiles: Array<File> = [];

  constructor(private api: ApiService, private lib: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.modalAction != 'Editar') {
      if (this.ordinarios == undefined) this.ordinarios = this.ordinarios_pasado;
      this.api.getLastNumberDocument('documento_ordinario').subscribe((result) => {
        this.ordinarios.no = result.length +1;
      }, (error) => {
        console.log(error)
      })
    }
    this.rellenarSiEditas();
    this.minDateS();
  }

  rellenarSiEditas() {
    this.src_documento = this.ordinarios.imagen;
    if (this.modalAction == 'Editar') {
      this.ordinarios_pasado.id = this.ordinarios.id;
      this.ordinarios_pasado.no = this.ordinarios.no;
      this.ordinarios_pasado.fecha = this.ordinarios.fecha;
      this.ordinarios_pasado.enviado = this.ordinarios.enviado;
      this.ordinarios_pasado.rsb = this.ordinarios.rsb;
      this.ordinarios_pasado.rs = this.ordinarios.rs;
      this.ordinarios_pasado.fecha_registro_ctc = this.ordinarios.fecha_registro_ctc;
      this.ordinarios_pasado.asunto = this.ordinarios.asunto;
      this.ordinarios_pasado.traslado = this.ordinarios.traslado;
      this.ordinarios_pasado.fecha_traslado = this.ordinarios.fecha_traslado;
      this.ordinarios_pasado.destino = this.ordinarios.destino;
      this.ordinarios_pasado.imagen = this.ordinarios.imagen;
      this.ordinarios_pasado.tipo = this.ordinarios.tipo;
    }
  }

  addUpdateOrdinarios() {
    console.log(this.ordinarios_pasado.no, this.ordinarios.no, this.ordinarios_pasado.no == this.ordinarios.no)
    if (this.ordinarios_pasado.no == this.ordinarios.no) {
      this.actionUpdateOrRegister();
    } else {
      this.api.getLimitados().subscribe((result) => {
        if (result.filter((n) => n.no == this.ordinarios.no).length <= 0) {
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
    formData.append('tipo', this.ordinarios.tipo.toString());
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }

    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateOrdinarios(formData, this.ordinarios.id).subscribe((result) => {
        this.router.navigate(['reportes']);
        console.log(result);
        this.lib.success('Editado con exito!', 'Editar');
      }, (error) => {
        console.log(error);
        this.lib.error('No se pudo editar', 'Error');

      });
    } else {

      this.api.addOrdinarios(formData).subscribe((result) => {
        this.router.navigate(['inicio']);
        console.log(result);
        this.lib.success('Agregado con exito!', 'Agregar');
      }, (error) => {
        console.log(error);
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
    if (this.modalAction == 'Editar') {
      return this.ordinarios.enviado.length > 0 && this.ordinarios.rs.length > 0 && this.ordinarios.rsb.length > 0 &&
        this.ordinarios.destino.length > 0 && this.ordinarios.asunto.length > 0 && this.ordinarios.traslado.length > 0
        && this.ordinarios.fecha.toString() != '' && this.ordinarios.fecha_traslado.toString() != ''
        && this.ordinarios.fecha_registro_ctc.toString() != ''
    } else
      return this.ordinarios.enviado.length > 0 && this.ordinarios.rs.length > 0 && this.ordinarios.rsb.length > 0 &&
        this.ordinarios.destino.length > 0 && this.ordinarios.asunto.length > 0 && this.ordinarios.traslado.length > 0
        && this.ordinarios.fecha.toString() != '' && this.ordinarios.fecha_traslado.toString() != ''
        && this.ordinarios.fecha_registro_ctc.toString() != '' && this.exito == "Subido con exito"
  }


  loadScanner() {
    this.api.Scan().subscribe((result) => {
      console.log(result);

    })
  }

  minDateS() {
    let d = new Date();
    let day: string = '';
    let month: string = '';
    if (d.getMonth() + 1 < 10) month = '0' + (d.getMonth() + 1); else (d.getMonth() + 1).toString();
    if (d.getDate() < 10) day = '0' + d.getDate(); else day = d.getDate().toString();
    this.minDate = d.getFullYear().toString() + '-' + month + '-' + day;
  }

  cancelar() {
    if (this.modalAction == "Editar") {
      this.router.navigate(['reportes']);
    } else {
      this.router.navigate(['inicio']);
    }
  }
}
