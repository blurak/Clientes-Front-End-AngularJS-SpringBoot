import { Component, OnInit,Input,OnChanges} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit,OnChanges {
  @Input() paginador:any;
  paginas:number[];
  max:number;
  cantidad:number;
  desde:number;
  hasta:number;

  constructor(private router:Router) { }

  ngOnInit(): void {
      this.calcularRango();
      this.cantidad=4;
      console.log("entro al init")
  }
  ngOnChanges():void{
      this.calcularRango();
      console.log("entro al onchains")
  }
  setCantidad(cantidad:number,actual:number):void{
    this.cantidad = (this.cantidad=cantidad)
    this.router.navigate(['/clientes/page',actual,cantidad]);
  }
  calcularRango():void{
    this.desde= Math.min(Math.max(1,this.paginador.number-4),this.paginador.totalPages-5);
    this.hasta=Math.max(Math.min(this.paginador.totalPages,this.paginador.number+4),6);
    if(this.paginador.totalPages >5){
      this.paginas = new Array(this.hasta-this.desde+1).fill(0).map((_valor,indice)=>indice+this.desde);
    }else{
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice)=>indice+1);
    }
    this.max =this.paginador.totalPages;
  }
}
