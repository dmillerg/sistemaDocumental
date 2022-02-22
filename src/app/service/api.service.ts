import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';

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
  getUsuarios(limit: number = -1): Observable<Usuario[]> {
    let direccion = this.url + 'usuarios/' + limit.toString();
    return this.http.get<Usuario[]>(direccion);
  }

  /**
   * Agrega un nuevo usuario al sistema
   * @param formData Datos del nuevo usuario
   * @returns 
   */
  addUsuario(formData: FormData) {
    let direccion = this.url + 'usuarios';
    formData.append('token', this.storage.retrieve('token'));
    return this.http.post(direccion, formData);
  }

  /**
   * Actualiza los datos de un usuario 
   * @param formData Datos nuevos del usuario
   * @returns 
   */
  updateUsuario(formData: FormData, id: number = -1) {
    let direccion = this.url + 'usuarios/' + id.toString();
    formData.append('token', this.storage.retrieve('token'));
    return this.http.put(direccion, formData);
  }

  /**
   * Elimina un usuario
   * @param id del usuario a eliminar
   * @returns 
   */
  deleteUsuario(id: number = -1) {
    let direccion = this.url + 'usuarios/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: this.storage.retrieve('usuario').token,
    };
    return this.http.delete(direccion, {headers: headers, params: params});
  }
}
