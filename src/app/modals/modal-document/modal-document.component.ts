import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.css']
})
export class ModalDocumentComponent implements OnInit {

  seleccionado: number = -1

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  changValue() {
    console.log(this.seleccionado);
  }
}
