import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Ordinario_personal } from 'src/app/models/ordinario.personal.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-modal-ordinario-personal',
  templateUrl: './modal-ordinario-personal.component.html',
  styleUrls: ['./modal-ordinario-personal.component.css']
})
export class ModalOrdinarioPersonalComponent implements OnInit {

  actiModal: NgbActiveModal;
  modalHeader: string = '';
  @Input() modalAction: string = '';
  errorN: string="";
  exito: string = "";

  ordinario_personal: Ordinario_personal = {
      id: -1,
      no: -1,
      fecha: '',
      procedencia: '',
      asunto: '',
      destino: '',
      archivo: '',
      imagen: '',
      tipo: '',
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
      tipo: '',
  }

  src_documento: string = '';
  uploadFiles: Array<File> = [];

  
  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
    if (this.modalAction != 'Editar') {
      this.api.getLastNumberDocument('documento_ordinario_personal').subscribe((result) => {
        this.ordinario_personal.no = parseInt(result) + 1;
      }, (error) => {
        console.log(error)
      })
    }
    this.rellenarSiEditas();
  }

  rellenarSiEditas() {
    this.src_documento = this.ordinario_personal.imagen;
    if (this.modalAction == 'Editar') {
      this.ordinarios_pasado.id = this.ordinario_personal.id;
      this.ordinarios_pasado.no = this.ordinario_personal.no;
      this.ordinarios_pasado.fecha = this.ordinario_personal.fecha;
      this.ordinarios_pasado.procedencia = this.ordinario_personal.procedencia;
      this.ordinarios_pasado.asunto = this.ordinario_personal.asunto;
      this.ordinarios_pasado.destino = this.ordinario_personal.destino;
      this.ordinarios_pasado.archivo = this.ordinario_personal.archivo;
      this.ordinarios_pasado.imagen = this.ordinario_personal.imagen;
      this.ordinarios_pasado.tipo = this.ordinario_personal.tipo;
    }
  }


  addUpdateOrdinariosP() {
    console.log(this.ordinarios_pasado.no, this.ordinario_personal.no, this.ordinarios_pasado.no == this.ordinario_personal.no)
    if (this.ordinarios_pasado.no == this.ordinario_personal.no) {
      this.actionUpdateOrRegister();
    } else{
      this.api.getLimitados().subscribe((result) => {
        if (result.filter((n) => n.no == this.ordinario_personal.no).length <= 0) {
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
    formData.append('id', this.ordinario_personal.id.toString());
    formData.append('no', this.ordinario_personal.no.toString());
    formData.append('fecha', this.ordinario_personal.fecha.toString());
    formData.append('procedencia', this.ordinario_personal.procedencia.toString());
    formData.append('asunto', this.ordinario_personal.asunto.toString());
    formData.append('archivo', this.ordinario_personal.archivo.toString());
    formData.append('destino', this.ordinario_personal.destino.toString());
    formData.append('imagen', this.ordinario_personal.imagen.toString());
    formData.append('tipo', this.ordinario_personal.tipo.toString());
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }

    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateOrdinariosP(formData, this.ordinario_personal.id).subscribe((result) => {
        this.actiModal.close('Ordinario_personal');
        console.log(result);
        this.lib.success('Editado con exito!','Editar');
      }, (error) => {
        this.actiModal.close('Ordinario_personal');
        console.log(error);
        this.lib.error('No se pudo editar','Error');

      });
    } else {
      
      this.api.addOrdinariosP(formData).subscribe((result) => {
        this.actiModal.close('Ordinario_personal');
        console.log(result);
        this.lib.success('Agregado con exito!','Agregar');
      }, (error) => {
        console.log(error);
        this.actiModal.close('Ordinario_personal');
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
    this.exito = "Subido con exito";
  }

  validarCamposVacios(){
    return this.ordinario_personal.procedencia.length>0&&this.ordinario_personal.asunto.length>0&&this.ordinario_personal.archivo.length>0&&
    this.ordinario_personal.destino.length>0
    &&this.ordinario_personal.fecha.toString()!=''&&this.exito=="Subido con exito"
  }


  loadScanner(){
    this.api.Scan().subscribe((result)=>{
      console.log(result);
      
    })
  }

}
