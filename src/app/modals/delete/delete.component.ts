import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Clasificados } from 'src/app/models/clasificados.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  actiModal: NgbActiveModal;
  modalHeader: string = '';
  modalAction: string = '';
  id: number = -1;

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private lib: ToastrService) {
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  eliminar() {
console.log(this.modalHeader);
console.log(this.id);
    switch (this.modalHeader) {
      case 'Limitados':
        this.api.deleteLimitados(this.id).subscribe(result => {
          this.actiModal.close();
          this.lib.success('Eliminado con exito!', 'Eliminar');
        }, error => { this.lib.error('No se pudo eliminar', 'Error') }
        );
        break;

      case 'Clasificados':
        this.api.deleteClasificados(this.id).subscribe(result => {
          this.actiModal.close();
          this.lib.success('Eliminado con exito!', 'Eliminar');
        }, error => { this.lib.error('No se pudo eliminar', 'Error') }
        );
        break;

      case 'Ordinarios':
        this.api.deleteOrdinarios(this.id).subscribe(result => {
          this.actiModal.close();
          this.lib.success('Eliminado con exito!', 'Eliminar');
        }, error => { this.lib.error('No se pudo eliminar', 'Error') }
        );
        break;

      case 'Ordinarios Personales':
        this.api.deleteOrdinariosP(this.id).subscribe(result => {
          this.actiModal.close();
          this.lib.success('Eliminado con exito!', 'Eliminar');
        }, error => { this.lib.error('No se pudo eliminar', 'Error') }
        );
        break;

      case 'Secretos':
        this.api.deleteSecretos(this.id).subscribe(result => {
          this.actiModal.close();
          this.lib.success('Eliminado con exito!', 'Eliminar');
        }, error => { this.lib.error('No se pudo eliminar', 'Error') }
        );
        break;

      case 'Usuarios':
        this.api.deleteUsuario(this.id).subscribe(result => {
          this.actiModal.close();
          this.lib.success('Eliminado con exito!', 'Eliminar');
        }, error => { this.lib.error('No se pudo eliminar', 'Error') }
        );
        break;

    }


  }

}
