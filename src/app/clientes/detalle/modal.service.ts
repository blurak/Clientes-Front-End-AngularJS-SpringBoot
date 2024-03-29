import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal:boolean=false;
  _notificarUpload = new EventEmitter<any>();
  constructor() { }
  get notificarUpload():EventEmitter<any> {
    return this._notificarUpload;
  }
  abrirModal(){
    this.modal=true;
    console.log("abriendo")
  }
  cerrarModal(){
    this.modal=false;
    console.log("cerrando")
  }
}
