import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {
  reserva: number = 0;
  reservaciones: any;
  totalPago: number = 0;
  horastotales: number = 0;
  fecha: string = " ";
  arr = [];
  horafinal: string = "";
  horainicio: string = "";

  constructor(private auth: AuthService,
    private db: FirestoreService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.auth.user$.subscribe(cliente => {
      this.db.getReservaciones(cliente.email).subscribe(res => {
        this.reservaciones = res;
        for (let rsv of this.reservaciones) {
          this.fecha = rsv.payload.doc.data().fecha;
          this.horainicio = rsv.payload.doc.data().hinicio;
          this.horafinal = rsv.payload.doc.data().hfin;

          var horaenteraini = rsv.payload.doc.data().hinicio.substring(0, 2);
          var horaenterafin = rsv.payload.doc.data().hfin.substring(0, 2);
          horaenteraini = this.quitarCeros(horaenteraini);
          horaenterafin = this.quitarCeros(horaenterafin)
          if (horaenteraini == "0") {
            horaenteraini = 24;
          }
          if (horaenterafin == "0") {
            horaenterafin = 24;
          }
          horaenteraini = Number(horaenteraini);
          horaenterafin = Number(horaenterafin);
          if (horaenteraini > horaenterafin) {
            this.horastotales = horaenteraini + horaenterafin;
          } else {
            this.horastotales = horaenterafin - horaenteraini;
          }
          this.totalPago = this.horastotales * 15;
          this.arr.push(this.totalPago);
        }
      });
    });

  }

  Timer() {
    var f = this.fecha.substring(5, 7);
    var d = this.fecha.substring(8, 10);
    var y = this.fecha.substring(0, 4);
    var b ="";
    switch (f) {
      case "01":
        b = "Jan";
        break;
      case "2":
        b = "Feb";
        break;
      case "3":
        b = "Mar";
        break;
      case "4":
        b = "April";
        break;
      case "5":
        b = "May";
        break;
      case "6":
        b = "Jun";
        break;
      case "7":
        b = "Jul";
        break;
      case "8":
        b = "Aug";
        break;
      case "9":
        b = "Sep";
        break;
      case "10":
        b = "Oct";
        break;
      case "11":
        b = "Nov";
        break;
      case "12":
        b = "Dec";
        break;
    }
    
    var countDownDate = new Date(b + " " + d + ", "+ y +" "+this.horafinal+":00").getTime();
    
    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("CountDown").innerHTML =  hours + ":"
        + minutes + ":" + seconds;

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("CountDown").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  
  quitarCeros(value) {
    var valorobtenido;
    var valor = value.substr(0, 1);

    if (valor == "0") {
      valorobtenido = value.substr(1, 2);
    } else {
      valorobtenido = value;
    }
    return valorobtenido;

  }


  onClickIniciarReservacion() {
    $("#Codigo").fadeIn(300);
  }

  onClickCross() {
    $("#Codigo").fadeOut(300);
    $("#Iniciar").css("display", "none");
    $(".tiempo-titulo").css("display", "block");
    $("#Contador").css("display", "block");
    $(".status").css("display", "block");
    this.Timer();
    console.log(Math.floor(Date.now() / 1000));

    // this.reserva = 1;
  }

  mostrarLugarCorrespondiente() {
    $("#Codigo").fadeOut(300);
    $("#AnimacionLugarReservado").fadeIn(300);
  }

}
