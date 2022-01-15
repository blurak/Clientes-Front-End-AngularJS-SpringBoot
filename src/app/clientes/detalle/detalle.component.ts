import { Component, OnInit,Input } from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import Swal from 'sweetalert2'
import {HttpEventType} from '@angular/common/http'
import {ModalService} from './modal.service'
import {AuthService} from '../../usuarios/auth.service'


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente : Cliente;
  titulo : string = "Detalle Cliente";
  fotoSeleccionada :File;
  progreso:number =0


  constructor(
    private clienteService: ClienteService,
    public modalService:ModalService,
    public authService: AuthService
  ) {

   }

  ngOnInit(): void {

  }
  seleccionarFoto(event:Event){
    const target = event.target as HTMLInputElement;
     const files = target.files as FileList;
     console.log(files);
     this.progreso=0;
     this.fotoSeleccionada = files[0];
     if(this.fotoSeleccionada.type.indexOf('image')<0){
       Swal.fire({
           icon: 'error',
           title: 'Error Tipo de archivo',
           text: `Debe seleccionar un imagen`,
           showConfirmButton: true,
           confirmButtonText:"Aceptar",
         })
         this.fotoSeleccionada=null
     }
    console.log("foto",this.fotoSeleccionada)
  }
  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire({
          icon: 'error',
          title: 'Error al subir',
          text: `La foto se debe seleccionar`,
          showConfirmButton: true,
          confirmButtonText:"Aceptar",
        })
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id).subscribe(

        event=>{
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100)
          }else if (event.type=== HttpEventType.Response){
            let response:any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService._notificarUpload.emit(this.cliente);
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: `La foto se subio correctamente : ${this.cliente.foto}`,
                showConfirmButton: true,
                confirmButtonText:"Aceptar",
              })
          }

          //this.cliente=cliente;

        }
      )

    }

  }
  cerrarModal(){
  console.log("cerrarModal");

    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso=0;
  }

}
