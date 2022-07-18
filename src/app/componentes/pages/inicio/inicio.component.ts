import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { ModalDocumentComponent } from 'src/app/modals/modal-document/modal-document.component';
import { ModalTipsComponent } from 'src/app/modals/modal-tips/modal-tips.component';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ transform: 'translateX(50%)', opacity: 0 }), stagger('100ms', animate('1000ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

const scaleAnimation = trigger('scaleAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(50%)', opacity: 0 }),
    animate('500ms', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1 }),
    animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [listAnimation, scaleAnimation]
})
export class InicioComponent implements OnInit {

  tips: any[] = [
    {
      title: "Autenticacion",
      subtitle: "permisos para administrar la app",
      description: "Para autenticarse usted debe presionar el boton rojo en la esquina superior derecha y rellenar el formulario que le sale a continuacion con su usuario y contrasenna"
    },
    {
      title: "Cerrar aplicacion",
      subtitle: "peligro de seguridad",
      description: "En caso de terminar de trabajar con la aplicacion por favor asegurese de cerrar la aplicacion o al menos presionar el boton que se encuentra en la esquina inferior izquierda"
    },
    {
      title: "Tipos de documentos",
      subtitle: "",
      description: "Hay 5 tipos de documentos que usted puede elegir para realizar las operaciones de registrar, editar, eliminar o visualizar. Estos son: clasificados, limitados, ordinarios, ordinarios personales y secretos"
    },
    {
      title: "Registrar",
      subtitle: "registro de todo tipo de documentos",
      description: "Para registrar un documento primero debe ir a la seccion de reportes presionando sobre el boton de reportes del menu lateral, luego presione el boton nuevo documento, ahi usted debe seleccionar el tipo de documento que desea registrar en la barra seleccionadora que se le presenta, rellene todos los campos necesarios y presione agregar"
    },
    {
      title: "Eliminar",
      subtitle: "eliminar uno o varios documentos",
      description: "Para eliminar un documento simplemente presione el boton con un icono de cesto de basura en la tabla y presione aceptar en el mensaje de confirmacion que le saldra a continuacion \n\n Para eliminar todos o mas de uno a la vez seleccione los checks que se encuentran en la tabla a la izquierda o el seleccionar todo que se encuentra a la izquierda enciama de la tabla, luego solo presione eliminar todo y confirme"
    }
  ]

  constructor(private router: Router,
    private modalService: NgbModal,
    public storage: SessionStorageService) { }

  ngOnInit(): void {

  }

  changePage() {
    this.router.navigate(['reportes'])
  }

  insert() {
    let modal = this.modalService.open(ModalDocumentComponent);
    modal.componentInstance.modalAction = "Agregar";
  }

  newDocument() {
    this.storage.clear('documento');
    this.storage.clear('type');
    this.router.navigate(['documentos']);
  }

  verTip(item: any) {
    let modal = this.modalService.open(ModalTipsComponent, { size: 'sm' });
    modal.componentInstance.titulo = item.title;
    modal.componentInstance.subtitulo = item.subtitle;
    modal.componentInstance.descripcion = item.description;
  }
}
