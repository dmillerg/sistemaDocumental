import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: any[] = [
    {
      active: true,
      nombre: 'Inicio',
      icono: 'bi bi-house',
      link: 'inicio',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Usuario',
      icono: 'bi bi-person',
      link: 'usuarios',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Clasificados',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Limitados',
      icono: 'bi bi-file-earmark-richtext',
      link: 'limitados',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Ordinarios',
      icono: 'bi bi-file-earmark-zip',
      link: 'ordinarios',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Ordinarios Personal',
      icono: 'bi bi-file-earmark-binary',
      link: 'ordinario_personal',
<<<<<<< HEAD
      permiso: true,
=======
      permiso: false,
>>>>>>> 2fd287d65ecf42bdd7ab5a620935a11b3221a3b2
    },
    {
      active: false,
      nombre: 'Secretos',
      icono: 'bi bi-file-earmark-check',
      link: 'secretos',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Ajustes',
      icono: 'bi bi-gear',
      link: 'ajustes',
      permiso: false,
    },
  ]

  menus: any[] = [
    {
      active: true,
      nombre: 'Inicio',
      icono: 'bi bi-house',
      link: 'inicio',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Usuario',
      icono: 'bi bi-person',
      link: 'usuarios',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Clasificados',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Limitados',
      icono: 'bi bi-file-earmark-richtext',
      link: 'limitados',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Ordinarios',
      icono: 'bi bi-file-earmark-zip',
      link: 'ordinarios',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Ordinarios Personal',
      icono: 'bi bi-file-earmark-binary',
      link: 'ordinario_personal',
<<<<<<< HEAD
      permiso: true,
=======
      permiso: false,
>>>>>>> 2fd287d65ecf42bdd7ab5a620935a11b3221a3b2
    },
    {
      active: false,
      nombre: 'Secretos',
      icono: 'bi bi-file-earmark-check',
      link: 'secretos',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Ajustes',
      icono: 'bi bi-gear',
      link: 'ajustes',
      permiso: false,
    },
  ]

  search: string = '';

  constructor(private router: Router, private storage: SessionStorageService, private api: ApiService) { }

  ngOnInit(): void {
    if (this.storage.retrieve('usuario')) {
      this.loadMenus(true);
    }
    this.storage.observe('usuario').subscribe((result) => {
      this.loadMenus(true);
    })
  }

  loadMenus(permiso: boolean = false) {
    this.menu.forEach((e) => {
      if (e.link != 'inicio') {
        e.permiso = permiso;
      }
    })
    this.menus.forEach((e) => {
      if (e.link != 'inicio') {
        e.permiso = permiso;
      }
    })
  }

  toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('active');
    document.querySelector('.content')?.classList.toggle('active');

    if (document.querySelector('.scrollbar1')?.getAttribute('style') != 'width:55px') {
      document.querySelector('.scrollbar1')?.setAttribute('style', 'width:55px');
    }
    else {
      document.querySelector('.scrollbar1')?.setAttribute('style', 'width:220px');
    }
  }

  changePage(target: any) {
    console.log(target.link);
    this.menu = this.menu.filter((e) => {
      if (e.active) {
        e.active = !e.active;
      }
      return true;
    });
    target.active = true;

    this.router.navigate([target.link])
  }

  filterMenu() {
    this.menu = this.menus.filter((e) => e.nombre.toLowerCase().includes(this.search.toLowerCase()))
  }

  logout(){
    let formData = new FormData();
    formData.append('id', this.storage.retrieve('usuario').usuario.id);
    this.api.logout(formData).subscribe((result)=>{
      this.storage.clear('usuario');
      this.router.navigate(['inicio']);
    })
  }

}
