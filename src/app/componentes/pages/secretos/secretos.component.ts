import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Secreto } from 'src/app/models/secreto.model';
import { ApiService } from 'src/app/service/api.service';
import { ModalSecretosComponent } from 'src/app/modals/modal-secretos/modal-secretos.component';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-secretos',
  templateUrl: './secretos.component.html',
  styleUrls: ['./secretos.component.css']
})
export class SecretosComponent implements OnInit {

  secretos: Secreto[] = [
    {
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
    imagen:''
    }
  ];

  selected: Secreto = {
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
  };
  server: string = '';
  loading: boolean = false;
seleccionados : number[]=[];
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService) { }

  ngOnInit(): void {
    this.loadSecretos();
  }

  loadSecretos() {
    this.loading = true;
    this.api.getSecretos().subscribe((result) => {
      if (result.length == 0) {
        this.server = 'No hay documentos';
      }
      this.secretos = result;
      this.loading = false;
      this.secretos.forEach((e) => {
        console.log(e);
        this.getDocumentFoto(e);
      })
    });
  }

  detailToggle(item: Secreto) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addSecretos(){
    let modal = this.modalService.open(ModalSecretosComponent);
    modal.componentInstance.modalHeader = "Secretos";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadSecretos();
    })
  }

  
  editSecretos(item:Secreto){
    let modal = this.modalService.open(ModalSecretosComponent);
    modal.componentInstance.modalHeader = "Secretos";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.usuario = item;
    modal.result.then((e)=>{
      this.loadSecretos();
    })
  }


  getDocumentFoto(e: Secreto) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + 'documentos_secretos/', 'documento_secreto').subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error.url);
      e.imagen = error.url
    });
  }
  d(id:number){

    if(this.seleccionados.filter((n)=>n==id).length>0){
      this.seleccionados =this.seleccionados.filter((n)=>n!=id);
  
    }
    else
    this.seleccionados.push(id);
  
    
    console.log(this.seleccionados);
    
  }
  deleteSecretos(idd:number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Secretos";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadSecretos();
    })
  }

  deleteAll() {
   
    if(this.seleccionados.length>0){

    for (let idd of this.seleccionados)
     this.api.deleteSecretos(idd).subscribe(result=>{this.loadSecretos();});

    
 this.lib.success('Eliminados con exito!','Eliminar');

    }
    else{
     this.lib.info('Debe seleccionar un elemento','No es posible');
    }
}
}
