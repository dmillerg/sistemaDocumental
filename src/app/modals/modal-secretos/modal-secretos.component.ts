import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Secreto } from 'src/app/models/secreto.model';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-secretos',
  templateUrl: './modal-secretos.component.html',
  styleUrls: ['./modal-secretos.component.css']
})
export class ModalSecretosComponent implements OnInit {

  modalHeader: string = '';
  @Input() modalAction: string = '';
  errorN: string = "";
  exito: string = "";

  @Input() secretos: Secreto = {
    id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no: -1,
    folio_no: -1,
    cant: -1,
    no_ejemplar: -1,
    cant_hojas: -1,
    destruccion: '',
    destino: '',
    comp: '',
    imagen: '',
    tipo: '',
    procedencia: '',
    fecha: '',
  }

  @Input() secretos_pasado: Secreto = {
    id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no: -1,
    folio_no: -1,
    cant: -1,
    no_ejemplar: -1,
    cant_hojas: -1,
    destruccion: '',
    destino: '',
    comp: '',
    imagen: '',
    tipo: '',
    procedencia: '',
    fecha: '',
  }
  minDate: string = '';

  src_documento: string = '';
  uploadFiles: Array<File> = [];

  constructor(private api: ApiService, private lib: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.modalAction != 'Editar') {
      if (this.secretos == undefined) this.secretos = this.secretos_pasado;
      this.api.getLastNumberDocument('documento_secreto').subscribe((result) => {
        this.secretos.no = parseInt(result) + 1;
      }, (error) => {
        console.log(error)
      })
    }
    this.rellenarSiEditas();
    this.minDateS();
  }

  rellenarSiEditas() {
    this.src_documento = this.secretos.imagen;
    if (this.modalAction == 'Editar') {
      this.secretos_pasado.id = this.secretos.id;
      this.secretos_pasado.no = this.secretos.no;
      this.secretos_pasado.lugar = this.secretos.lugar;
      this.secretos_pasado.reg_no = this.secretos.reg_no;
      this.secretos_pasado.titulo = this.secretos.titulo;
      this.secretos_pasado.categoria = this.secretos.categoria;
      this.secretos_pasado.mat_no = this.secretos.mat_no;
      this.secretos_pasado.folio_no = this.secretos.folio_no;
      this.secretos_pasado.cant = this.secretos.cant;
      this.secretos_pasado.no_ejemplar = this.secretos.no_ejemplar;
      this.secretos_pasado.cant_hojas = this.secretos.cant_hojas;
      this.secretos_pasado.destruccion = this.secretos.destruccion;
      this.secretos_pasado.destino = this.secretos.destino;
      this.secretos_pasado.comp = this.secretos.comp;
      this.secretos_pasado.imagen = this.secretos.imagen;
      this.secretos_pasado.tipo = this.secretos.tipo;
      this.secretos_pasado.procedencia = this.secretos.procedencia;
      this.secretos_pasado.fecha = this.secretos.fecha;
    }
  }

  addUpdateSecretos() {
    console.log(this.secretos_pasado.no, this.secretos.no, this.secretos_pasado.no == this.secretos.no)
    if (this.secretos_pasado.no == this.secretos.no) {
      this.actionUpdateOrRegister();
    } else {
      this.api.getLimitados().subscribe((result) => {
        if (result.filter((n) => n.no == this.secretos.no).length <= 0) {
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
    formData.append('id', this.secretos.id.toString());
    formData.append('no', this.secretos.no.toString());
    formData.append('lugar', this.secretos.lugar.toString());
    formData.append('reg_no', this.secretos.reg_no.toString());
    formData.append('titulo', this.secretos.titulo.toString());
    formData.append('categoria', this.secretos.categoria.toString());
    formData.append('mat_no', this.secretos.mat_no.toString());
    formData.append('folio_no', this.secretos.folio_no.toString());
    formData.append('cant', this.secretos.cant.toString());
    formData.append('no_ejemplar', this.secretos.no_ejemplar.toString());
    formData.append('cant_hojas', this.secretos.cant_hojas.toString());
    formData.append('destruccion', this.secretos.destruccion.toString());
    formData.append('destino', this.secretos.destino.toString());
    formData.append('comp', this.secretos.comp.toString());
    formData.append('imagen', this.secretos.imagen.toString());
    formData.append('tipo', this.secretos.tipo.toString());
    formData.append('procedencia', this.secretos.procedencia.toString());
    formData.append('fecha', this.secretos.fecha.toString());
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }

    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateSecretos(formData, this.secretos.id).subscribe((result) => {
        this.router.navigate(['reportes']);
        console.log(result);
        this.lib.success('Editado con exito!', 'Editar');

      }, (error) => {
        console.log(error);
        this.lib.error('No se pudo editar', 'Error');
      });
    } else {
      this.api.addSecretos(formData).subscribe((result) => {
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
      return this.secretos.lugar.length > 0 && this.secretos.reg_no.length > 0 && this.secretos.titulo.length > 0 &&
        this.secretos.categoria.length > 0 && this.secretos.destino.length > 0 && this.secretos.destruccion.length > 0 && this.secretos.comp.length > 0
        && this.secretos.fecha.length > 0
    } else
      return this.secretos.lugar.length > 0 && this.secretos.reg_no.length > 0 && this.secretos.titulo.length > 0 &&
        this.secretos.categoria.length > 0 && this.secretos.destino.length > 0 && this.secretos.destruccion.length > 0 && this.secretos.comp.length > 0
        && this.exito == "Subido con exito" && this.secretos.fecha.length > 0
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