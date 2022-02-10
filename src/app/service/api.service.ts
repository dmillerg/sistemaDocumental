import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:9706/apis/';

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) { }

  getUsuarios(){
    
  }
}
