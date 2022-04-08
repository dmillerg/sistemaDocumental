import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  @Input() modalAction: string = '';
  errorN: string = "";
  exito: string = "";

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

  src_documento: string = '';
  uploadFiles: Array<File> = [];

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
    if (this.modalAction != 'Editar') {
      this.api.getLastNumberDocument('documento_limitado').subscribe((result) => {
        this.limitados.no = parseInt(result) + 1;
      }, (error) => {
        console.log(error)
      })
    }
    this.rellenarSiEditas();
  }

  rellenarSiEditas() {
    this.src_documento = this.limitados.imagen;
    if (this.modalAction == 'Editar') {
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
    console.log(this.limitados_pasado.no, this.limitados.no, this.limitados_pasado.no == this.limitados.no)
    if (this.limitados_pasado.no == this.limitados.no) {
      this.actionUpdateOrRegister();
    } else{
      this.api.getLimitados().subscribe((result) => {
        if (result.filter((n) => n.no == this.limitados.no).length <= 0) {
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
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }


    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateLimitados(formData, this.limitados.id).subscribe((result) => {
        this.actiModal.close('Limitados');
        console.log(result);
        this.lib.success('Editado con exito!', 'Editar');
      }, (error) => {
        this.actiModal.close('Limitados');
        console.log(error);
        this.lib.error('No se pudo editar', 'Error');
      });
    } else {
      this.api.addLimitados(formData).subscribe((result) => {
        this.actiModal.close('Limitados');
        this.lib.success('Agregado con exito!', 'Agregar');
        console.log(result);
      }, (error) => {
        console.log(error);
        this.actiModal.close('Limitados');
        this.lib.error('No se pudo agregar', 'Error');
      })
    }
  }

  

  fileEvent(fileInput: any) {
    // console.log(typeof('s'))
    let file = fileInput.target.files[0];
    //  console.log(fileInput);
    this.uploadFiles = fileInput.target.files;
    console.log(this.uploadFiles);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      
      this.src_documento = reader.result as string;
    }
    console.log(this.src_documento);
    
    reader.readAsDataURL(file);
    this.exito = "Subido con exito";
  }

  validarCamposVacios(){
    return this.limitados.procedencia.length>0&&this.limitados.titulo.length>0&&this.limitados.movimiento1.length>0&&this.limitados.movimiento2.length>0&&
    this.limitados.destruccion.length>0&&this.limitados.expediente.length>0&&this.limitados.observacion.length>0
    &&this.limitados.fecha.toString()!=''&&this.exito=="Subido con exito"
  }

  loadScanner(){
    this.api.Scan().subscribe((result)=>{
      console.log(result);
      
    })
  }
}




