import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent  {
  listaCurso: string[]=['TypeScript','JavaScript','Java','C#','Otro'];
  habilitar: boolean = true;
  setHablitar():void{
    this.habilitar = (this.habilitar=!this.habilitar)
  }
  constructor() { }

}
