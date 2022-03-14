import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { ModalOrdinariosComponent } from 'src/app/modals/modal-ordinarios/modal-ordinarios.component';
import { Ordinarios } from 'src/app/models/ordinarios.model';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ordinarios',
  templateUrl: './ordinarios.component.html',
  styleUrls: ['./ordinarios.component.css']
})
export class OrdinariosComponent implements OnInit {

  
  ordinarios: Ordinarios[] = [
    {
      id: 1,
      no: 2,
      fecha: 'a',
      enviado: 'a',
      rsb: 'a',
      rs: 'a',
      fecha_registro_ctc: 'a',
      asunto: 'a',
      destino: 'a',
      traslado: 'a',
      fecha_traslado: 'a',
      imagen: 'a'
    },
    {
      id: 1,
      no: 2,
      fecha: 'a',
      enviado: 'a',
      rsb: 'a',
      rs: 'a',
      fecha_registro_ctc: 'a',
      asunto: 'a',
      destino: 'a',
      traslado: 'a',
      fecha_traslado: 'a',
      imagen: 'a'
    }
  ];

  selected: Ordinarios = {
    id: 1,
    no: 2,
    fecha: 'a',
    enviado: 'a',
    rsb: 'a',
    rs: 'a',
    fecha_registro_ctc: 'a',
    asunto: 'a',
    destino: 'a',
    traslado: 'a',
    fecha_traslado: 'a',
    imagen: 'a',
  };

  server: string = '';
  loading: boolean = false;
  selec=false;
  seleccionados: number[] = [];
  constructor(private api: ApiService, private modalService: NgbModal, private lib: ToastrService ) { }

  ngOnInit(): void {
    this.loadOrdinarios();
  }

  loadOrdinarios(){
    this.loading = true;
    this.api.getOrdinarios().subscribe((result)=>{
      if (result.length == 0) {
        this.server = 'No hay documentos';
      }
      this.ordinarios = result;
      this.loading = false;
      this.ordinarios.forEach((e) => {
        console.log(e);
        this.getDocumentFoto(e);
      })

      
    })
  }

  getDocumentFoto(e: Ordinarios) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + 'documentos_ordinarios/', 'documento_ordinario').subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error.url);
      e.imagen = error.url
    });
  }


  detailToggle(item: Ordinarios) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addOrdinarios(){
    let modal = this.modalService.open(ModalOrdinariosComponent);
    modal.componentInstance.modalHeader = "Ordinarios";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadOrdinarios();
    })
  }

  editOrdinarios(item:Ordinarios){
    let modal = this.modalService.open(ModalOrdinariosComponent);
    modal.componentInstance.modalHeader = "Ordinarios";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.ordinarios = item;
    modal.result.then((e)=>{
      this.loadOrdinarios();
    })
  }

  d(id:number){

    if(this.seleccionados.filter((n)=>n==id).length>0){
      this.seleccionados =this.seleccionados.filter((n)=>n!=id);
  
    }
    else
    this.seleccionados.push(id);
    
    console.log(this.seleccionados);
  }

  deleteAll() {
   
    if(this.seleccionados.length>0){

    for (let idd of this.seleccionados)
     this.api.deleteOrdinarios(idd).subscribe(result=>{this.loadOrdinarios();});

    
 this.lib.success('Eliminados con exito!','Eliminar');

    }
    else{
     this.lib.info('Debe seleccionar un elemento','No es posible');
    }
}

  deleteOrdinarios(idd: number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Ordinarios";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadOrdinarios();
    })
  }

  selecc() {

    //Ver si el checkbox esta seleccionado
    if (this.selec) {

      // Vaciar arreglo
      var des: number[] = [];
      this.seleccionados = des;

    }
    else {

      // Guardar todos los id en seleccionados
      var i = 0;
      for (let item of this.ordinarios) {
        this.seleccionados[i] = item.id;
        i++;
      }
    }
    this.selec = !this.selec;
    console.table(this.seleccionados);

  }
}
