import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent }
  from '@angular/common/http';
  import{Observable,throwError} from 'rxjs';
  import {AuthService} from '../auth.service';
  import Swal from 'sweetalert2'
  import {catchError} from 'rxjs/operators'
  import{ Router} from '@angular/router'

  @Injectable()
  export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService,private router:Router){

    }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(httpRequest).pipe(
        catchError(e=>{
          if(e.status==401){
            if(this.authService.isAuthenticated()){
              this.authService.logout();
            }
            this.router.navigate(['/login'])

          }
          if( e.status == 403){
            Swal.fire({
                icon: 'warning',
                title: 'Acceso Denegado',
                text: `Hola ${this.authService.usuario.username} No tienees acceso a este recurso`,
                showConfirmButton: true,
                confirmButtonText:"Aceptar",
              })
            this.router.navigate(['/clientes'])

          }
          return throwError(e);

        })
      );
    }
  }
