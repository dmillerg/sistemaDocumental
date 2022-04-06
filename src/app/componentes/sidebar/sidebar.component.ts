import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { ModalUsuarioComponent } from 'src/app/modals/modal-usuario/modal-usuario.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  logoAdmin: number = 0;
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
      nombre: 'Documentos',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Reportes',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
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
      nombre: 'Documentos',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: false,
    },
    {
      active: false,
      nombre: 'Reportes',
      icono: 'bi bi-file-earmark-text',
      link: 'clasificados',
      permiso: false,
    },
  ]

  search: string = '';

  constructor(private router: Router, private storage: SessionStorageService, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.storage.retrieve('usuario')) {
      this.loadMenus(true);
    }
    this.storage.observe('usuario').subscribe((result) => {
      if (this.storage.retrieve('usuario')) {
        this.loadMenus(true);
      } else this.loadMenus(false);
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

  logout() {
    let formData = new FormData();
    formData.append('id', this.storage.retrieve('usuario').usuario.id);
    this.api.logout(formData).subscribe((result) => {
      this.storage.clear('usuario');
      this.router.navigate(['inicio']);
    })
  }

  createUser(target: any) {
    console.log(this.logoAdmin);
    if (target.id == 'logo') {
      this.logoAdmin++;
      if (this.logoAdmin > 5) {
        let modal = this.modalService.open(ModalUsuarioComponent, { backdrop: 'static' });
        modal.componentInstance.modalAction = "Agregar";}
      } else
        this.logoAdmin = 0;
    }
  }
