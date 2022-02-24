import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  password: string = '';

  constructor(private api:ApiService, private storage:SessionStorageService) { }

  ngOnInit(): void {
  
  }
 loguear(){
   var formData = new FormData();
   formData.append('usuario',this.usuario);
   formData.append('password',this.password);
   console.log(this.usuario);
 this.api.login(formData).subscribe((result)=>{
   console.log(result);
   this.storage.store('usuario',result);
 });
 }

}
