import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLimitadosComponent } from 'src/app/modals/modal-limitados/modal-limitados.component';
import { Limitados } from 'src/app/models/limitados.service';
import { ApiService } from 'src/app/service/api.service';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-limitados',
  templateUrl: './limitados.component.html',
  styleUrls: ['./limitados.component.css']
})
export class LimitadosComponent implements OnInit {

  limitados: Limitados[] = [  ];

  selected: Limitados = {
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
    imagen: '',
  };
  server: string = '';
  loading: boolean = false;
  seleccionados: number[] = [];
  selec=false;
  constructor(private api: ApiService, private modalService: NgbModal,private lib: ToastrService ) { }

  ngOnInit(): void {
    this.loadLimitados();
  }

  loadLimitados() {
    this.loading = true;
    this.api.getLimitados().subscribe((result) => {
      if (result.length == 0) {
        this.server = 'No hay documentos';
      }
      this.limitados = result;
      this.loading = false;
      this.limitados.forEach((e) => {
        console.log(e);
        this.getDocumentFoto(e);
      })
    }, (error) => {
      console.log('entro');
      this.server = 'Error comunicandose con el servidor por favor intentelo más tarde';
    })
  }

  detailToggle(item: Limitados) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    } else {

    }
    this.selected = item;
  }

  addLimitados() {
    let modal = this.modalService.open(ModalLimitadosComponent);
    modal.componentInstance.modalHeader = "Limitados";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e) => {
      this.loadLimitados();
    })
  }

  editLimitados(item: Limitados) {
    let modal = this.modalService.open(ModalLimitadosComponent);
    modal.componentInstance.modalHeader = "Limitados";
    modal.componentInstance.modalAction = "Editar";
    modal.componentInstance.limitados = item;
    modal.result.then((e) => {
      this.loadLimitados();
    })
  }

  deleteLimitados(idd: number) {
    let modal = this.modalService.open(DeleteComponent);
    modal.componentInstance.modalHeader = "Limitados";
    modal.componentInstance.modalAction = "Eliminar";
    modal.componentInstance.id = idd;
    modal.result.then((e) => {
      this.loadLimitados();
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

  getDocumentFoto(e: Limitados) {
    this.api.getDocumentsFoto(e.id, environment.dir_foto + 'documentos_limitados/', 'documento_limitado').subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error.url);
      e.imagen = error.url
    });
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
      for (let item of this.limitados) {
        this.seleccionados[i] = item.id;
        i++;
      }
    }
    this.selec = !this.selec;
    console.table(this.seleccionados);

  }

  deleteAll() {
   
    if(this.seleccionados.length>0){

    for (let idd of this.seleccionados)
     this.api.deleteLimitados(idd).subscribe(result=>{this.loadLimitados();});

    
 this.lib.success('Eliminados con exito!','Eliminar');

    }
    else{
     this.lib.info('Debe seleccionar un elemento','No es posible');
    }
}
}
