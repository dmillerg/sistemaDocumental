import { Usuario } from "./usuario.models";

export interface Login{
    message: string;
    status:string;
    token:string;
    usuario:Usuario;
  }