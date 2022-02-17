import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:9706/apis/';

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) { }

  /**
   * Obtiene todos los usuarios de la db
   * @returns 
   */
  getUsuarios(limit: number = -1): Observable<Usuario[]>{
    let direccion = this.url + 'usuarios/'+limit.toString();
    return this.http.get<Usuario[]>(direccion);
  }
}
