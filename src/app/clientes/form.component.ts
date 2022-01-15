import { Component, OnInit } from '@angular/core';
import {Cliente } from './cliente'
import {Region } from './region'
import {ClienteService} from './cliente.service'
import {Router,ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente()
  public regiones : Region [];
  public titulo:string  = "Crear Cliente"
  public errores: string[];
  constructor(private clienteService:ClienteService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
    this.clienteService.getRegiones().subscribe(regiones=>{
      this.regiones= regiones;
    });
  }
  cargarCliente():void{
    this.activatedRoute.params.subscribe(params=> {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente)=> this.cliente =cliente)
      }
    })
  }
  public create(): void{
    this.clienteService.postCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire({
            icon: 'success',
            title: 'Nuevo Cliente Creado',
            text: `Creado Con Exito ${this.cliente.nombre}`,
            showConfirmButton: true,
            confirmButtonText:"Aceptar",
          })
    },
    (err:any)=> {
      if(!err.error.error){
        console.log(err.error.Mensaje)
        Swal.fire({
            icon: 'error',
            title: 'No se puede crear el cliente',
            text: `${err.error.Mensaje}`,
            showConfirmButton: true,
            confirmButtonText:"Aceptar",
          })
      }
      this.errores =err.error.error as string[];
      console.error('codigo del error',err.status)
      console.error('errores'+err.error.error)

    }
    )
  }
  public update(): void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      cliente=>{
        this.router.navigate(['/clientes'])
        Swal.fire({
            icon: 'success',
            title: 'Cliente Actualizado',
            text: `Actualizado Con Exito ${cliente.nombre}`,
            showConfirmButton: true,
            confirmButtonText:"Aceptar",
            timer: 1500
          })
      },
      err=> {
        if(!err.error.error){
          console.log(err.error.Mensaje)
          Swal.fire({
              icon: 'error',
              title: 'No se puede editar el cliente',
              text: `${err.error.Mensaje}`,
              showConfirmButton: true,
              confirmButtonText:"Aceptar",
            })
        }
        this.errores =err.error.error as string[];
        console.error('codigo del error',err.status)
        console.error('errores'+err.error.error)

      }
    )
  }
  compararRegion(o1:Region,o2:Region):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
     return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }
  }
