import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      permiso: true,
    },
    {
      active: false,
      nombre: 'Clasificados',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Limitados',
      icono: 'bi bi-file-earmark-richtext',
      link: 'limitados',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Ordinarios',
      icono: 'bi bi-file-earmark-zip',
      link: 'ordinarios',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Ordinarios Personal',
      icono: 'bi bi-file-earmark-binary',
      link: 'ordinario_personal',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Secretos',
      icono: 'bi bi-file-earmark-check',
      link: 'secretos',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Ajustes',
      icono: 'bi bi-gear',
      link: 'ajustes',
      permiso: true,
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
      permiso: true,
    },
    {
      active: false,
      nombre: 'Clasificados',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Limitados',
      icono: 'bi bi-file-earmark-richtext',
      link: 'limitados',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Ordinarios',
      icono: 'bi bi-file-earmark-zip',
      link: 'ordinarios',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Ordinarios Personal',
      icono: 'bi bi-file-earmark-binary',
      link: 'ordinario_personal',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Secretos',
      icono: 'bi bi-file-earmark-check',
      link: 'secretos',
      permiso: true,
    },
    {
      active: false,
      nombre: 'Ajustes',
      icono: 'bi bi-gear',
      link: 'ajustes',
      permiso: true,
    },
  ]

  search: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('active');
    document.querySelector('.content')?.classList.toggle('active');
    
    if (document.querySelector('.scrollbar1')?.getAttribute('style')!='width:55px'){
    document.querySelector('.scrollbar1')?.setAttribute('style','width:55px');
  }
    else{
    document.querySelector('.scrollbar1')?.setAttribute('style','width:220px');
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

}
