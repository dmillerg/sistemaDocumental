import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { Limitados } from '../models/limitados.service'; 
import { Clasificados } from '../models/clasificados.service';
import { Login } from '../models/login';
import { Secreto } from '../models/secreto.model';
import { Ordinarios } from '../models/ordinarios.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://172.40.3.14:9706/apis/';

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) { }

  // usuarios

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
   * 
   * @param formData Datos de usuario para logear
   * @returns 
   */
  login(formData: FormData):Observable<Login>{
    let direccion = this.url + 'login';
    return this.http.post<Login>(direccion, formData);
  }

  logout(formData: FormData){
    let direccion = this.url + 'logout';
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
    return this.http.delete(direccion, { headers: headers, params: params });
  }


//Clasificados

/**
   * Obtiene todos los usuarios de la db
   * @returns 
   */
 getClasificados(): Observable<Clasificados[]> {
  let direccion = this.url + 'clasificado';
  return this.http.get<Clasificados[]>(direccion);
}

/**
 * Agrega un nuevo usuario al sistema
 * @param formData Datos del nuevo usuario
 * @returns 
 */
addClasificados(formData: FormData) {
  let direccion = this.url + 'clasificado';

  formData.append('token', this.storage.retrieve('usuario').token);
  return this.http.post(direccion, formData);
}

/**
 * Actualiza los datos de un usuario 
 * @param formData Datos nuevos del usuario
 * @returns 
 */
updateClasificados(formData: FormData, id: number = -1) {
  let direccion = this.url + 'clasificado/' + id.toString();

  formData.append('token', this.storage.retrieve('token'));
  return this.http.put(direccion, formData);
}

/**
 * Elimina un usuario
 * @param id del usuario a eliminar
 * @returns 
 */
deleteClasificados(id: number = -1) {
  let direccion = this.url + 'clasificado/' + id.toString();
  const headers = { 'content-type': 'application/json' };
  const params = {
    token: this.storage.retrieve('usuario').token,
  };
  return this.http.delete(direccion, {headers: headers, params: params});
}

validate(campo:string){
var num = parseInt(campo);

}




//Limitados

/**
   * Obtiene todos los usuarios de la db
   * @returns 
   */
 getLimitados(limit: number = -1): Observable<Limitados[]> {
  let direccion = this.url + 'limitado/';
  return this.http.get<Limitados[]>(direccion);
}

/**
 * Agrega un nuevo usuario al sistema
 * @param formData Datos del nuevo usuario
 * @returns 
 */
addLimitados(formData: FormData) {
  let direccion = this.url + 'limitado';
  formData.append('token', this.storage.retrieve('usuario').token);
  return this.http.post(direccion, formData);
}

/**
 * Actualiza los datos de un usuario 
 * @param formData Datos nuevos del usuario
 * @returns 
 */
updateLimitados(formData: FormData, id: number = -1) {
  let direccion = this.url + 'limitado/' + id.toString();
  formData.append('token', this.storage.retrieve('token'));
  return this.http.put(direccion, formData);
}

/**
 * Elimina un usuario
 * @param id del usuario a eliminar
 * @returns 
 */
deleteLimitados(id: number = -1) {
  let direccion = this.url + 'limitado/' + id.toString();
  const headers = { 'content-type': 'application/json' };
  const params = {
    token: this.storage.retrieve('usuario').token,
  };
  return this.http.delete(direccion, {headers: headers, params: params});
}



//Secretos

/**
   * Obtiene todos los usuarios de la db
   * @returns 
   */
 getSecretos(limit: number = -1): Observable<Secreto[]> {
  let direccion = this.url + 'secreto/';
  return this.http.get<Secreto[]>(direccion);
}

/**
 * Agrega un nuevo usuario al sistema
 * @param formData Datos del nuevo usuario
 * @returns 
 */
addSecretos(formData: FormData) {
  let direccion = this.url + 'secreto';
  formData.append('token', this.storage.retrieve('usuario').token);
  return this.http.post(direccion, formData);
}

/**
 * Actualiza los datos de un usuario 
 * @param formData Datos nuevos del usuario
 * @returns 
 */
updateSecretos(formData: FormData, id: number = -1) {
  let direccion = this.url + 'secreto/' + id.toString();
  formData.append('token', this.storage.retrieve('token'));
  return this.http.put(direccion, formData);
}

/**
 * Elimina un usuario
 * @param id del usuario a eliminar
 * @returns 
 */
deleteSecretos(id: number = -1) {
  let direccion = this.url + 'secreto/' + id.toString();
  const headers = { 'content-type': 'application/json' };
  const params = {
    token: this.storage.retrieve('usuario').token,
  };
  return this.http.delete(direccion, {headers: headers, params: params});
}



//Ordinarios

/**
   * Obtiene todos los usuarios de la db
   * @returns 
   */
 getOrdinarios(limit: number = -1): Observable<Ordinarios[]> {
  let direccion = this.url + 'ordinario/';
  return this.http.get<Ordinarios[]>(direccion);
}

/**
 * Agrega un nuevo usuario al sistema
 * @param formData Datos del nuevo usuario
 * @returns 
 */
addOrdinarios(formData: FormData) {
  let direccion = this.url + 'ordinario';
  formData.append('token', this.storage.retrieve('usuario').token);
  return this.http.post(direccion, formData);
}

/**
 * Actualiza los datos de un usuario 
 * @param formData Datos nuevos del usuario
 * @returns 
 */
updateOrdinarios(formData: FormData, id: number = -1) {
  let direccion = this.url + 'ordinario/' + id.toString();
  formData.append('token', this.storage.retrieve('token'));
  return this.http.put(direccion, formData);
}

/**
 * Elimina un usuario
 * @param id del usuario a eliminar
 * @returns 
 */
deleteOrdinarios(id: number = -1) {
  let direccion = this.url + 'ordinario/' + id.toString();
  const headers = { 'content-type': 'application/json' };
  const params = {
    token: this.storage.retrieve('usuario').token,
  };
  return this.http.delete(direccion, {headers: headers, params: params});
}


}
