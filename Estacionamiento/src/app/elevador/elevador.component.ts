import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-elevador',
  templateUrl: './elevador.component.html',
  styleUrls: ['./elevador.component.css']
})
export class ElevadorComponent implements OnInit {

  public piso: number = 3;
  constructor() { }

  ngOnInit() {
  }

  onClickSubir(){
    if(this.piso==1){
      $("#RectElevador").addClass("subirprimero");
    }
    if(this.piso==2){
      $("#RectElevador").addClass("subirsegundo");
    }
    if(this.piso==3){
      $("#RectElevador").addClass("subirtercero");
    }
  }
  onClickBajar(){
    if(this.piso==1){
      $("#RectElevador").addClass("bajar1");
    }
    if(this.piso==2){
      $("#RectElevador").addClass("bajar2");
    }
    if(this.piso==3){
      $("#RectElevador").addClass("bajar3");
    }

  }
}
