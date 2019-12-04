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
  precios = [];
  horafinal: string = "";
  horainicio: string = "";
  precioss: number = 0;
  status: string = "";
  currentHora: number = 0;

  constructor(private auth: AuthService,
    private db: FirestoreService,
    private toastr: ToastrService) {
    this.Timer();
  }

  ngOnInit() {
    
    this.auth.user$.subscribe(cliente => {
      this.db.getReservaciones(cliente.email).subscribe(res => {
        this.reservaciones = res;
        // for (let rsv of this.reservaciones) {
          // this.temp(rsv.payload.doc.data());
          // this.fecha = rsv.payload.doc.data().fecha;
          // this.horainicio = rsv.payload.doc.data().hinicio;
          // this.horafinal = rsv.payload.doc.data().hfin;

          // var horaenteraini = rsv.payload.doc.data().hinicio.substring(0, 2);
          // var horaenterafin = rsv.payload.doc.data().hfin.substring(0, 2);

          // horaenteraini = this.quitarCeros(horaenteraini);
          // horaenterafin = this.quitarCeros(horaenterafin)

          // if (horaenteraini == "0") {
          //   horaenteraini = 24;
          // }
          // if (horaenterafin == "0") {
          //   horaenterafin = 24;

          // }
          // horaenteraini = Number(horaenteraini);
          // horaenterafin = Number(horaenterafin);

          // if (horaenteraini > horaenterafin) {
          //   this.horastotales = horaenteraini + horaenterafin;
          // } else {
          //   this.horastotales = horaenterafin - horaenteraini;
          // }
          // this.totalPago = this.horastotales * 15;

          // this.precios.push(this.totalPago);

          //temporizador

        //   var today = new Date();

        //   var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //   var valorfecha = Number(date.substr(8, 10));

        //   //Obtiene el valor de la fecha aumentando un 0 si el dia es de 1-9, es decir 01, 02...

        //   var fechab = this.fechaCorrecta(today, valorfecha);
        //   var hora = new Date().getTime();
        //   console.log(hora);
        //   console.log(this.currentHora);




        //   if (fechab == this.fecha && this.currentHora <= hora) {
        //     console.log("Si es");
        //   } else {
        //     console.log("no es");
        //   }

        //   this.status = rsv.payload.doc.data().estado;

        //   if (this.status == "reservado") {

        //   }

        // }
      });
    });


  }

  temp(rsv) {
    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var valorfecha = Number(date.substr(8, 10));

    //Obtiene el valor de la fecha aumentando un 0 si el dia es de 1-9, es decir 01, 02...

    var fechab = this.fechaCorrecta(today, valorfecha);
    var hora = new Date().getTime();
    console.log(`Hora:${hora}`);
    console.log(`Current: ${this.currentHora}`);


    this.fecha = rsv.fecha;

    if (fechab == this.fecha && this.currentHora >= hora) {
      return 'algo'
      // return this.temporizador(this.horafinal); 
      //cambiar estado a activo
    } else {
      return "no es"
    }

    this.status = rsv.estado;

    if (this.status == "reservado") {

    }
  }

  total(rsv) {
    this.fecha = rsv.fecha;
    this.horainicio = rsv.hinicio;
    this.horafinal = rsv.hfin;

    var horaenteraini = rsv.hinicio.substring(0, 2);
    var horaenterafin = rsv.hfin.substring(0, 2);
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

    return this.totalPago;
    // this.precios.push(this.totalPago);

    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var valorfecha = Number(date.substr(8, 10));

    // //Obtiene el valor de la fecha aumentando un 0 si el dia es de 1-9, es decir 01, 02...

    // var fechab = this.fechaCorrecta(today, valorfecha);
    // var hora = new Date().getTime();
    // console.log(hora);
    // console.log(this.currentHora);




    // if(fechab == this.fecha && this.currentHora <= hora){
    //   console.log("Si es");
    // }else{
    //   console.log("no es");
    // }

    // this.status = rsv.payload.doc.data().estado;

    // if(this.status == "reservado"){

    // }
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


  Timer() {
    var f = this.fecha.substring(5, 7);
    var d = this.fecha.substring(8, 10);
    var y = this.fecha.substring(0, 4);
    var b = "";
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

    var countDownDate = new Date(b + " " + d + ", " + y + " " + this.horafinal + ":00").getTime();
    this.currentHora = countDownDate;
  }

  temporizador(countDownDate) {
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
      if(distance < 0){
        clearInterval(x);
        return "EXPIRED";
      }else{
        return distance < 0 ? hours + ":"
          + minutes + ":" + seconds : clearInterval(x);

      }

      // If the count down is over, write some text 
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

  calcularTotal() {

  }
  onClickCross(cajon, nivel) {

    $("#Codigo").fadeOut(300);
    $("#Iniciar").css("display", "none");
    $(".tiempo-titulo").css("display", "block");
    $("#Contador").css("display", "block");
    $(".status").css("display", "block");
    this.Timer();

    this.reserva = 1;
  }


  mostrarLugarCorrespondiente() {
    $("#Codigo").fadeOut(300);
    $("#AnimacionLugarReservado").fadeIn(300);
  }

  eliminarReservacion(id) {
    this.db.eliminarReservacion(id).then(res => { console.log(res); })
      .catch(e => { this.toastr.error('Operacion fallida', 'Error') })
  }

}
