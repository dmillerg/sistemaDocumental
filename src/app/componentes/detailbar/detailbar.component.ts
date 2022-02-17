import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.service';

@Component({
  selector: 'app-detailbar',
  templateUrl: './detailbar.component.html',
  styleUrls: ['./detailbar.component.css']
})
export class DetailbarComponent implements OnInit {

  constructor() { }

  @Input() data: any;
  data_detail: any[] = [];

  ngOnInit(): void {
    this.convertirData(this.data)
  }

  convertirData(datax: any) {
    let d = JSON.stringify(this.data)
    d = d.slice(1,d.length-1)
    d = d.replace(/"/g,'')
    d = d.replace(/:/g,': ')
    d = d.replace(/_/g,' ')
    this.data_detail = d.split(',')
    return this.data_detail;
  }

}
