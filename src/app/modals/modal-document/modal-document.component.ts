import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.css']
})
export class ModalDocumentComponent implements OnInit {

  seleccionado: number=-1

  constructor() { }

  ngOnInit(): void {
  }

  changValue(){
    console.log(this.seleccionado);
    
  }
}
