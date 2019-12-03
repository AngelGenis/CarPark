import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-elevador',
  templateUrl: './elevador.component.html',
  styleUrls: ['./elevador.component.css']
})
export class ElevadorComponent implements OnInit {

  public piso: string = "";
  public cajon: number = 0;
  public idcajon: string = "";
  cajones = new Array();
  reservaciones: any;
  @Input() bandera: number = 0;

  constructor(private auth:AuthService,
    private db:FirestoreService,
    private toastr:ToastrService) { 
     
    }

  ngOnInit() {

    this.auth.user$.subscribe( cliente => {
      this.db.getReservaciones(cliente.email).subscribe( res => {
        this.reservaciones = res;

        for(let rsv of this.reservaciones){
          this.piso = rsv.payload.doc.data().piso;
          this.cajon = rsv.payload.doc.data().cajon;

          console.log(this.cajon);
          console.log(this.piso);
          this.LlenarArray();
        }
        
          
      });
    });
    $("#Con2").fadeOut();
    $("#Con").fadeIn();
    $("#AceptarLugar").css("display", "none");
    
    

  }

  onClickSubir() {
   
    if (this.piso == "nivel-1") {
      $("#RectElevador").addClass("subirprimero");
      this.carro();
      this.escenario();
      $("#Con2").css("display", "block");
    }
    if (this.piso == "nivel-2") {
      $("#RectElevador").addClass("subirsegundo");
      this.carro();
      this.escenario();
      $("#Con2").css("display", "block");
    }
    if (this.piso == "nivel-3") {
      $("#RectElevador").addClass("subirtercero");
      this.carro();
      this.escenario();
    }
    setTimeout(function () {
      $("#Con2").css("display", "block");
      $("#AceptarLugar").css("display", "block");
    }, 3000);
    
  }

  onClickAceptarLugar(){
    $("#Con1").fadeOut();
    $("#Con2").fadeOut();
    $("#Con1").css("display", "none");
    $("#Con2").css("display", "none")
    
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

  LlenarArray() {
    this.idcajon = "#" + this.cajon;
    console.log(this.idcajon);
    
    $(this.idcajon).css("background", "blue");
    $(this.idcajon).css("color", "white");
  }

}
