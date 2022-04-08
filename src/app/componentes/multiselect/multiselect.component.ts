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
  @Input() borderColor: string = 'var(--firstcolor-hover)';  
  @Input() selectedColor: string = 'seleccionar tipo(s)';  
  @Input() ifSearch: boolean = true;  

  lista: boolean = false;
  tipos: any[] = [];
  inputExit: string = '';
  listado: any[] = [];
  opciones2: any[] = [];
  search: string = '';
  constructor() { }

  ngOnInit(): void {
    this.opciones.forEach(e=>{
      this.opciones2.push(e);
    })
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
        if(this.inputExit.length>0){
          this.inputExit += ', ' + e.name;
        }else this.inputExit = e.name;
      }
    });
    this.salida();
  }

  salida(){
    this.emisor.emit(this.tipos);
  }

  onChange(item: any){
    this.opciones = this.opciones2.filter((e)=>e.name.toString().toLowerCase().includes(item.toString().toLowerCase()))
  }
}
