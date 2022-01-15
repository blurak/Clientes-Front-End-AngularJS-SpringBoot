import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service'
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'
import {ModalService} from './detalle/modal.service'
import {AuthService} from '../usuarios/auth.service'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit  {
  clientes: Cliente[];
  paginador:any;
  clienteSeleccionado: Cliente;

  constructor(
    private clienteService:ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService:ModalService,
    public authService: AuthService
  ) { }

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe( params =>{
      let page:number = +params.get('page');
      let cant:number = +params.get('cant');
      if (!page){
        page=0;
      }
      if(!cant){
        cant=4;
      }
      this.clienteService.getClientes(page,cant).pipe(
        tap()
      ).subscribe(
        (response) => {
          this.clientes=response.content as Cliente[],
          this.paginador= response

          }
      );
    }

    );
    this.modalService.notificarUpload.subscribe(cliente=>{
      this.clientes= this.clientes.map(clienteOriginal=>
      {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })
  }


  delete(cliente:Cliente): void{
      Swal.fire({
    title: 'Estas Seguro?',
    text: `Seguro que deseas eliminar a ${cliente.nombre}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si,Estoy Seguro'
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.deleteCliente(cliente.id).subscribe(
        response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          Swal.fire(
            'Cliente Eliminado Con Exito !',
            'Cliente Eliminado',
            'success'
          )
        }
      )

    }
  })

    }
  abrirModal(cliente:Cliente){
    this.clienteSeleccionado=cliente;
    this.modalService.abrirModal();
  }
}
