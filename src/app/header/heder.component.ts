import {Component} from '@angular/core';
import {AuthService} from '../usuarios/auth.service'
import {Router} from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title = 'ClientesApp'
  constructor(public authService:AuthService,private router:Router){

  }
  logout():void{
    this.authService.logout();
    Swal.fire({
        icon: 'info',
        title: 'Adios',
        text: `adios Crack ya estas Deslogeado`,
        showConfirmButton: true,
        confirmButtonText:"Aceptar",
      })
    this.router.navigate(['/login']);
  }
}
