import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  errorN: string="";

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
      this.ordinarios_pasado.procedencia = this.ordinarios_pasado.procedencia;
      this.ordinarios_pasado.asunto = this.ordinarios_pasado.asunto;
      this.ordinarios_pasado.destino = this.ordinarios_pasado.destino;
      this.ordinarios_pasado.archivo = this.ordinarios_pasado.archivo;
      this.ordinarios_pasado.imagen = this.ordinarios_pasado.imagen;
    }
  }

  addUpdateOrdinariosP() {

    this.api.getOrdinariosP().subscribe((result) => {
    
      if( result.filter((n)=>n.no==this.ordinario_personal.no).length<=0)
        {

    let formData = new FormData();
    formData.append('id', this.ordinario_personal.id.toString());
    formData.append('no', this.ordinario_personal.no.toString());
    formData.append('fecha', this.ordinario_personal.fecha.toString());
    formData.append('procedencia', this.ordinario_personal.procedencia.toString());
    formData.append('asunto', this.ordinario_personal.asunto.toString());
    formData.append('archivo', this.ordinario_personal.archivo.toString());
    formData.append('destino', this.ordinario_personal.destino.toString());
    formData.append('imagen', this.ordinario_personal.imagen.toString());
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
  else{

    this.errorN ="El numero introducido ya existe";
}    
    
})
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
