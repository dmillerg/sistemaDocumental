import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Output() emisor: EventEmitter<any[]> = new EventEmitter();

  @Input() opciones: any[] = []
  @Input() placeholder: string = 'seleccionar tipo(s)';
  lista: boolean = false;
  tipos: any[] = [];
  inputExit: string = '';
  listado: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  addORRemove(item: any) {
    if (this.listado.indexOf(item.value) != -1) {
      this.listado = this.listado.filter((e) => e != item.value);
    } else {
      this.listado.push(item.value)
    }
    this.tipos = this.listado
    this.inputExit = '';
    this.opciones.forEach((e) => {
      if (this.tipos.indexOf(e.value) != -1) {
        this.inputExit += e.name + ', ';
      }
    });
    this.salida();
  }

  salida(){
    this.emisor.emit(this.tipos);
  }
}
