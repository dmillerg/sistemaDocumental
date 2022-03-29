import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.css']
})
export class ModalDocumentComponent implements OnInit {

  seleccionado: number = -1
  actiModal: NgbActiveModal;

  constructor(private api: ApiService, private activeModal: NgbActiveModal) { 
    this.actiModal = activeModal;
  }

  ngOnInit(): void {
  }

  changValue() {
    // console.log(this.seleccionado);
  }

  loadScanner(){
    this.api.Scan().subscribe((result)=>{
      console.log(result);
      
    })
  }
}
