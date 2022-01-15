import { Injectable } from '@angular/core';
import {Region} from './region'
import {Cliente} from './cliente'
import {AuthService} from '../usuarios/auth.service';
import {of,map,throwError,Observable,tap} from 'rxjs'
import {HttpClient, HttpHeaders,HttpRequest,HttpEvent} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import Swal from 'sweetalert2'
import{ Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlBase:string ='http://localhost:8080/clientes';
  private url:string ='http://localhost:8080/clientes/consultar/page';
  private urlPost:string ='http://localhost:8080/clientes/crear';
  private urlCliente:string ='http://localhost:8080/clientes/cliente';
  private urlUpdate:string ='http://localhost:8080/clientes/editar';
  private  urlDelete:string ='http://localhost:8080/clientes/eliminar';

  //private HttpHeaders= new HttpHeaders({'Content-Type':'application/json'})


  constructor(
    private http: HttpClient,
    private router:Router ,
    /*private authService:AuthService*/
  ) { }

  /*private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null ){
      return  this.HttpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.HttpHeaders;
  }*/

  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlBase}/regiones`)

  }
  getClientes(page:number,cant:number): Observable<any>{
    return this.http.get(`${this.url}/${page}/${cant}`).pipe(
      tap((response:any) =>{

          (response.content as Cliente[]).forEach(cliente=>{
            console.log(cliente.nombre);
          })
      }),
      map(response =>{
        (response.content as Cliente[]).map(cliente =>{
          cliente.nombre= cliente.nombre.toUpperCase();
          //cliente.creatAt = formatDate(cliente.creatAt,' d/MMMM/yy','es');

          return cliente;
        });
        return response;
      }),
      tap(response =>{
          console.log("tap 2");
          (response.content as Cliente[]).forEach(cliente=>{
            console.log(cliente.nombre);
          })
      }),
    )
    // return this.http.get(this.url).pipe(
    //   map( response => response as Cliente[])
    // )
  }
  postCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlPost,cliente).pipe(
      catchError(e=>{
        if(e.status == 400){

          return throwError(e);
        }
        if(e.error.Mensaje){
        console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    )
  }
  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlCliente}/${id}`).pipe(
      catchError(e =>{
        if(e.status != 401 && e.error.Mensaje){
        this.router.navigate(['/clientes'])
        console.log(e.error.Mensaje);
      }
          return throwError(e);
      })
    )
  }
  updateCliente(cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlUpdate,cliente).pipe(
      catchError(e=>{
        if(e.status == 400){
          console.log("entro");
          return throwError(e);
        }
        if(e.error.Mensaje){
        console.log(e.error.Mensaje);
        }
          return throwError(e);
      })
    )
  }
  deleteCliente(id: number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlDelete}/${id}`/*{header:agregarAuthorizationHeader()}*/).pipe(
      catchError(e=>{

        if(e.error.Mensaje){
        console.log(e.error.Mensaje);
        }
          return throwError(e)

      })

    )
  }
  subirFoto(archivo:File,id):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    console.log("for",formData)

    /*let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
        httpHeaders=httpHeaders.append('Authorization','Bearer '+token)
    }*/
    const req = new HttpRequest('POST',`${this.urlBase}/upload/`,formData,{
        reportProgress : true
        /*headers: httpHeaders*/
    });
    return this.http.request(req);

}
}
