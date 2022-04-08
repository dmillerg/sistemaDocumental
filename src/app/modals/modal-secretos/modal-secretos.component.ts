import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Secreto } from 'src/app/models/secreto.model';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-secretos',
  templateUrl: './modal-secretos.component.html',
  styleUrls: ['./modal-secretos.component.css']
})
export class ModalSecretosComponent implements OnInit {

  actiModal: NgbActiveModal;
  modalHeader: string = '';
  @Input() modalAction: string = '';
  errorN: string="";
  exito: string = "";

  secretos: Secreto = {
    id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no:-1,
    folio_no: -1,
    cant: -1,
    no_ejemplar: -1,
    cant_hojas: -1,
    destruccion: '',
    destino: '',
    comp: '',
    imagen:'',
  }

  secretos_pasado: Secreto = {
    id: -1,
    no: -1,
    lugar: '',
    reg_no: '',
    titulo: '',
    categoria: '',
    mat_no:-1,
    folio_no: -1,
    cant: -1,
    no_ejemplar: -1,
    cant_hojas: -1,
    destruccion: '',
    destino: '',
    comp: '',
    imagen:'',
  }

  src_documento: string = '';
  uploadFiles: Array<File> = [];
  
  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
    if (this.modalAction != 'Editar') {
      this.api.getLastNumberDocument('documento_secreto').subscribe((result) => {
        this.secretos.no = parseInt(result) + 1;
      }, (error) => {
        console.log(error)
      })
    }
    this.rellenarSiEditas();
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
    }
  }

  addUpdateSecretos() {
    console.log(this.secretos_pasado.no, this.secretos.no, this.secretos_pasado.no == this.secretos.no)
    if (this.secretos_pasado.no == this.secretos.no) {
      this.actionUpdateOrRegister();
    } else{
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
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }

    console.log(this.modalAction)
    if (this.modalAction == "Editar") {
      this.api.updateSecretos(formData, this.secretos.id).subscribe((result) => {
        this.actiModal.close('Secretos');
        console.log(result);
        this.lib.success('Editado con exito!','Editar');
        
      }, (error) => {
        this.actiModal.close('Secretos');
        console.log(error);
        this.lib.error('No se pudo editar','Error');
      });
    } else {
      this.api.addSecretos(formData).subscribe((result) => {
        this.actiModal.close('Secretos');
        console.log(result);
        this.lib.success('Agregado con exito!','Agregar');
      }, (error) => {
        console.log(error);
        this.actiModal.close('Secretos');
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
    return this.secretos.lugar.length>0&&this.secretos.reg_no.length>0&&this.secretos.titulo.length>0&&
    this.secretos.categoria.length>0&&this.secretos.destino.length>0&&this.secretos.destruccion.length>0&&this.secretos.comp.length>0
    &&this.exito=="Subido con exito"
  }


  loadScanner(){
    this.api.Scan().subscribe((result)=>{
      console.log(result);
      
    })
}
}