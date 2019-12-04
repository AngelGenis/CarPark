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
  horainicio: number = 0;
  precioss: number = 0;
  status: string = "";
  currentHora: number = 0;
  horaRestante : string = "";
  mensajePadre: string = "";

  constructor(private auth: AuthService,
    private db: FirestoreService,
    private toastr: ToastrService) {
    
  }

  ngOnInit() {
    this.Timer();
    
    this.auth.user$.subscribe(cliente => {
      this.db.getReservaciones(cliente.email).subscribe(res => {
        this.reservaciones = res;
        
      });
    });
  }

  temp(rsv,id) {
    
   
    //fecha actual
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var valorfecha = Number(date.substr(8, 10));
    var fechab = this.fechaCorrecta(today, valorfecha);

    //horafinal
    this.horafinal = rsv.hfin;
    var hf = this.quitarCeros2(this.horafinal);

    //horaincicio
    this.horainicio = rsv.hinicio;
    var hi = this.quitarCeros2(this.horainicio);

    
    //hora actual
    var d = new Date();
    var now = d.getHours();

    //Condiciones para cambiar el estado y mostrar en html
    var resultado = "";
      
    if(rsv.estado=="reservado"){
      if (this.fecha == fechab) {
        
        if(now >= hi && now <hf){
           resultado = "En curso";
           $(".circulo"+id).css("background", "royaleblue");
           $(".estado"+id).text("En curso");

          //Cambiar el estado a "activo", escribir de esa manera
        }
        if(now<hi){
          resultado = "Reservado";
          $(".circulo"+id).css("background", "yellow");
             $(".estado"+id).text("Reservado");
             $(".codigoaccesoo"+id).css("display", "none");
          //Cambiar el estado a "reservado", escribir de esa manera
        }
        if(now>=hf){
          resultado = "Finalizado";
          $(".circulo"+id).css("background", "red");
             $(".estado"+id).text("Finalizado");
             $(".codigoaccesoo"+id).css("display", "none");
          //Cambiar el estado a "finalizado", escribir de esa manera
        }
       }

       if(this.fecha != fechab && rsv.estado == "reservado"){
          resultado = "Reservado"
          $(".circulo"+id).css("background", "yellow");
          $(".estado"+id).text("Reservado");
          $(".codigoaccesoo"+id).css("display", "none");
       }
    }
    if(rsv == "finalizado"){
      resultado = "Finalizado"
      $(".circulo"+id).css("background", "red");
         $(".estado"+id).text("Finalizado");
         $(".codigoaccesoo"+id).css("display", "none");
    }

    if(rsv == "activo"){
      resultado = "En Curso";
      $(".circulo"+id).css("background", "royaleblue");
       $(".estado"+id).text("En curso");
       
    }
    
    return resultado;
    
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
    var horainicioV = new Date(b + " " + d + ", " + y + " " + this.horainicio + ":00").getTime();
    var countDownDate = new Date(b + " " + d + ", " + y + " " + this.horafinal + ":00").getTime();
    this.currentHora = countDownDate;
    console.log("EFDS: "+ horainicioV );
    
    this.horainicio =  horainicioV;
    
  }

  temporizador(countDownDate) {
    var x = setInterval(function () {
      console.log("hola");
      
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return hours + ":" + minutes + ":" + seconds;
      console.log(this.horaRestante + "Esta es la hora restante");
      console.log(hours + ":" + minutes + ":" + seconds);
      
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
      return "EXPIRED";
      }
      // If the count down is over, write some text 
    }, 60000);
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

  quitarCeros2(value){
    var valorobtenido;
    var valor = value.substr(0, 1);

    if (valor == "0") {
      valorobtenido = value.substr(1, 1);
    } else {
      valorobtenido = value.substr(0, 2);
    }
    return valorobtenido;
  }


  onClickIniciarReservacion(val) {
    $(".codigo"+val).fadeIn(300);
  }

  onClickCross(cajon, nivel,id) {

    console.log(id);
    this.mensajePadre = id;
    console.log($(".codigo"+id));

    $(".codigo"+id).fadeOut(300);
    $("#Iniciar").css("display", "none");
    $("#tiempo"+id).css("display", "block");
    $(".contador"+id).css("display", "block");
    $("#status"+id).css("display", "block");
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

  mili(millseconds) {
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
    var minutes = Math.floor((millseconds % oneHour) / oneMinute);
    var hours = Math.floor((millseconds % oneDay) / oneHour);
    var days = Math.floor(millseconds / oneDay);

    var timeString = '';
    if (days !== 0) {
        timeString += (days !== 1) ? (days + ' days ') : (days + ' day ');
    }
    if (hours !== 0) {
        timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
    }
    if (minutes !== 0) {
        timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
    }
    if (seconds !== 0 || millseconds < 1000) {
        timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
    }

    return timeString;
};

}
