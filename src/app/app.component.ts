import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'ngx-webstorage';
import { Login } from './models/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login: Login = {
    message: '',
    status: '',
    token: '',
    usuario: {
      id: -1,
      usuario: '',
      nombre: 'acceder / registrarse',
      password: '',
      fecha_registro: '',
      fecha_ultima_sesion: '',
      rol: '',
    },
  };
  login_copy: Login = {
    message: '',
    status: '',
    token: '',
    usuario: {
      id: -1,
      usuario: '',
      nombre: 'acceder / registrarse',
      password: '',
      fecha_registro: '',
      fecha_ultima_sesion: '',
      rol: '',
    },
  };
  mode: boolean = false;
  title = 'sistema-documental';
  fecha = new Date();
  constructor(private storage: SessionStorageService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.storage.retrieve('usuario')) {
      this.login = this.storage.retrieve('usuario');
    }
    this.storage.observe('usuario').subscribe((result) => {
      if(result != undefined){
      this.login = result;}else this.login = this.login_copy; 
    })
  }

  // themeChange() {
  //   if (!this.mode) {
  //     document.querySelectorAll(".ligth").forEach((e) => {
  //       e.classList.remove("ligth");
  //       e.classList.add("dark");
  //     })

  //     document.querySelectorAll(".text-oscuro").forEach((e) => {
  //       e.classList.remove("text-oscuro");
  //       e.classList.add("text-ligth");
  //     })

  //   } else {
  //     document.querySelectorAll(".dark").forEach((e) => {
  //       e.classList.remove("dark");
  //       e.classList.add("ligth");
  //     })
  //     document.querySelectorAll(".text-ligth").forEach((e) => {
  //       e.classList.remove("text-ligth");
  //       e.classList.add("text-oscuro");
  //     })
  //   }
  //   this.mode = !this.mode;
  // }

  loginPage() {
    if (!this.storage.retrieve('usuario')) {
      this.router.navigate(['login']);
    }
  }
  
}
