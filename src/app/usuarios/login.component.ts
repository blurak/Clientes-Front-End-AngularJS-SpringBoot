import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario'
import Swal from 'sweetalert2'
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: String = "Login // Sign in"
  usuario: Usuario;

  constructor(private authService : AuthService , private router:Router) {
    this.usuario= new Usuario();
   }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      Swal.fire({
          icon: 'info',
          title: 'ya estas logeado Logeo',
          text: `Hola Crack ${this.authService.usuario.username} ya estas logeado`,
          showConfirmButton: true,
          confirmButtonText:"Aceptar",
        })
      this.router.navigate(['/clientes']);
      }

    }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire({
          icon: 'error',
          title: 'Error Logeo',
          text: "credenciales vacias",
          showConfirmButton: true,
          confirmButtonText:"Aceptar",
        })
        return;
      }
      this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split(".")[1]))
      console.log(payload);
      this.authService.guardarUsuario(response.access_token)
      this.authService.guardarToken(response.access_token)
      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      Swal.fire({
          icon: 'success',
          title: 'Login',
          text: `Bienvenido ${usuario.username} , logeaste con exito`,
          showConfirmButton: true,
          confirmButtonText:"Aceptar",
        })
    },err=>{
      if(err.status == 400 || err.status == 401){
        Swal.fire({
            icon: 'error',
            title: 'Error Login',
            text: `Credenciales Incorrectas`,
            showConfirmButton: true,
            confirmButtonText:"Aceptar",
          })
      }
    })


  }

}
