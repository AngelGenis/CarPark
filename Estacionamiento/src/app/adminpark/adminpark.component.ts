import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminpark',
  templateUrl: './adminpark.component.html',
  styleUrls: ['./adminpark.component.css']
})
export class AdminparkComponent implements OnInit {
  pisoact: number = 1;
  reservaciones: any;
  currentfecha: string = " ";


  constructor(private db: FirestoreService) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var valorfecha = Number(date.substr(8, 10));
    this.currentfecha = this.fechaCorrecta(today, valorfecha);

  }

  ngOnInit() {
    $("#M4").fadeOut();
  }

  goizq() {

    if (this.pisoact > 1 && this.pisoact <= 3) {
      this.pisoact--;
      if (this.pisoact == 1) {
        $("#M2").fadeOut();
        $("#M3").fadeOut();
        setTimeout(function () {
          $("#M1").fadeIn();
        }, 500);


      }
      if (this.pisoact == 2) {
        $("#M1").fadeOut();
        $("#M3").fadeOut();
        setTimeout(function () {
          $("#M2").fadeIn();
        }, 500);

      }
      if (this.pisoact == 3) {
        $("#M1").fadeOut();
        $("#M2").fadeOut();

        setTimeout(function () {
          $("#M3").fadeIn();
        }, 500);


      }

    } else {
      this.pisoact = 3;
      $("#M1").fadeOut();
      $("#M2").fadeOut();

      setTimeout(function () {
        $("#M3").fadeIn();
      }, 500);


    }
  }

  goder() {

    if (this.pisoact >= 1 && this.pisoact < 3) {
      this.pisoact++;
      if (this.pisoact == 1) {
        $("#M2").fadeOut();
        $("#M3").fadeOut();
        setTimeout(function () {
          $("#M1").fadeIn();
        }, 500);


      }
      if (this.pisoact == 2) {
        $("#M1").fadeOut();
        $("#M3").fadeOut();
        setTimeout(function () {
          $("#M2").fadeIn();
        }, 500);

      }
      if (this.pisoact == 3) {
        $("#M1").fadeOut();
        $("#M2").fadeOut();

        setTimeout(function () {
          $("#M3").fadeIn();
        }, 500);


      }

    } else {
      this.pisoact = 1;
      $("#M2").fadeOut();
      $("#M3").fadeOut();
      setTimeout(function () {
        $("#M1").fadeIn();
      }, 500);


    }
  }

  fechaCorrecta(today, valorfecha) {
    var fechabuena = "";
    switch (valorfecha) {
      case 1:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "01";
        break;
      case 2:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "02";
        break;
      case 3:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "03";
        break;
      case 4:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "04";
        break;
      case 5:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "05";
        break;
      case 6:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "06";
        break;
      case 7:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "07";
        break;
      case 8:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "08";
        break;
      case 9:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "09";
        break;
    }

    return fechabuena;

  }

  llenarCuadros() {
    for (let rsv of this.reservaciones) {
      var cajon = rsv.payload.doc.data().cajon;
      var fechaact = rsv.payload.doc.data().fecha;
      var piso = rsv.payload.doc.data().piso;
      var p = " ";
      if (piso == "nivel-1") {
        p = "-p1";
      }
      if (piso == "nivel-2") {
        p = "-p2";
      }
      if (piso == "nivel-3") {
        p = "-p3";
      }

      if (this.currentfecha == fechaact) {
        cajon = "#" + cajon + p;
        $(cajon).css("background", "blue");
        $(cajon).css("color", "white");
      }
    }
  }

  changeinput() {
    var hor = $("#tllegada").val();
    var h = 0;
    console.log(hor);

    switch (hor) {
      case "01:00":
        h = 1;
        break;
      case "02:00":
        h = 2;
        break;
      case "03:00":
        h = 3;
        break;
      case "04:00":
        h = 4;
        break;
      case "05:00":
        h = 5;
        break;
      case "06:00":
        h = 6;
        break;
      case "07:00":
        h = 7;
        break;
      case "08:00":
        h = 8;
        break;
      case "09:00":
        h = 9;
        break;
    }

    this.db.getReservacionesHora(h)
      .subscribe(res => {
        this.reservaciones = res;
        if(this.reservaciones == ""){
         console.log("Vacio");
         
        }else{
          this.llenarCuadros();
        }
       
      })




  }

}
