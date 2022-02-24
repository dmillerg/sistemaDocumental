import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLimitadosComponent } from 'src/app/modals/modal-limitados/modal-limitados.component';
import { Limitados } from 'src/app/models/limitados.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-limitados',
  templateUrl: './limitados.component.html',
  styleUrls: ['./limitados.component.css']
})
export class LimitadosComponent implements OnInit {

  limitados: Limitados[] = [
    {
      id: 1,
      no: 2,
      procedencia: 'a',
      titulo: 'a',
      fecha: 'a',
      movimiento1: 'a',
      movimiento2: 'a',
      destruccion: 'a',
      expediente: 'a',
      observacion: 'a',
      imagen: 'a'
    },
    {
      id: 2,
      no: 3,
      procedencia: 'a',
      titulo: 'a',
      fecha: 'a',
      movimiento1: 'a',
      movimiento2: 'a',
      destruccion: 'a',
      expediente: 'a',
      observacion: 'a',
      imagen: 'a'
    }
  ];

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

  constructor(private api: ApiService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadLimitados();
  }

  loadLimitados(){
    this.api.getLimitados().subscribe((result)=>{
      this.limitados = result;
    })
  }

  detailToggle(item: Limitados) {
    if (this.selected == item) {
      document.querySelector('.sidebar-right')?.classList.toggle('active');
      document.querySelector('.tablas')?.classList.toggle('active');
    }else{

    }
    this.selected = item;
  }

  addLimitados(){
    let modal = this.modalService.open(ModalLimitadosComponent);
    modal.componentInstance.modalHeader = "Limitados";
    modal.componentInstance.modalAction = "Agregar";
    modal.result.then((e)=>{
      this.loadLimitados();
    })
  }

}
