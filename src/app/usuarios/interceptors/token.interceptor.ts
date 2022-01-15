import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent }
  from '@angular/common/http';
  import{Observable} from 'rxjs';
  import {AuthService} from '../auth.service';

  @Injectable()
  export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService){

    }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = this.authService.token;
      if(token != null ){
        const authReq = httpRequest.clone({
          headers: httpRequest.headers.set('Authorization','Bearer '+ token)
        })
        return next.handle(authReq);
      }
      return next.handle(httpRequest);
    }
  }
