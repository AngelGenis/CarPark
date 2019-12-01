import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-elevador',
  templateUrl: './elevador.component.html',
  styleUrls: ['./elevador.component.css']
})
export class ElevadorComponent implements OnInit {

  public piso: number = 1;
  constructor() { }

  ngOnInit() {
  }

  onClickSubir() {
    if (this.piso == 1) {
      $("#RectElevador").addClass("subirprimero");
      this.carro();
      this.escenario();
    }
    if (this.piso == 2) {
      $("#RectElevador").addClass("subirsegundo");
      this.carro();
      this.escenario();
    }
    if (this.piso == 3) {
      $("#RectElevador").addClass("subirtercero");
      this.carro();
      this.escenario();
    }
  }
  
  /*onClickBajar() {
    if (this.piso == 1) {
      $("#RectElevador").addClass("bajar1");
    }
    if (this.piso == 2) {
      $("#RectElevador").addClass("bajar2");
    }
    if (this.piso == 3) {
      $("#RectElevador").addClass("bajar3");
    }
  }*/

  carro() {
    setTimeout(function () {
      $(".img").addClass("imgefecto");
      $(".img").addClass("moverautoinicio");
      $(".piso").addClass("esc");
      $(".piso").addClass("escdes");
    }, 2000);
  }

  escenario() {
    setTimeout(function () {
      $("#Con").addClass("desaparecer");
      setTimeout(function () {
        $("#Con2").css("opacity", "1");
        $("#Con").css("opacity", "0");
        setTimeout(function () {
          $(".img2").addClass("carroap");
          $(".img2").css("left", "-25px");
        }, 100);
      }, 200);
    }, 2000);
  }


}
