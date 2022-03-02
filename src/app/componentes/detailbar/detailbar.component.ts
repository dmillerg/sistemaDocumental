import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { Clasificados } from 'src/app/models/clasificados.service';
import { Limitados } from 'src/app/models/limitados.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detailbar',
  templateUrl: './detailbar.component.html',
  styleUrls: ['./detailbar.component.css']
})
export class DetailbarComponent implements OnInit {

  constructor(private api: ApiService) { }

  @Input() data: any;
  imagen: string = '';
  data_detail: any[] = [];

  ngOnInit(): void {
    this.convertirData(this.data)
  }

  convertirData(datax: any) {
    let d = JSON.stringify(this.data)
    d = d.slice(1, d.length - 1)
    d = d.replace(/"/g, '')
    d = d.replace(/:/g, ': ')
    d = d.replace(/_/g, ' ')
    this.data_detail = d.split(',')
    this.data_detail = this.data_detail.filter((e) => {
      if (e.includes('fecha')) {
        console.log(e.substring(e.indexOf(':') + 2, e.length))
        let ad = e.substring(e.indexOf(':') + 2, e.length)
        // console.log(ad);
        e = Date.parse(ad).toLocaleString('en-US');
      }
      return true;
    })
    return this.data_detail;
  }
}
