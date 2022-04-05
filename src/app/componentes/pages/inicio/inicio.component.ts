import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

tips: any[]= [
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

  constructor() { }

  ngOnInit(): void {
  }

}
