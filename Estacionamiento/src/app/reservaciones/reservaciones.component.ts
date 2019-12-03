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
  horastotales :number = 0;
  arr = [];

  constructor(private auth:AuthService,
              private db:FirestoreService,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.auth.user$.subscribe( cliente => {
      this.db.getReservaciones(cliente.email).subscribe( res => {
        this.reservaciones = res;
        for(let rsv of this.reservaciones){
          var horaenteraini = rsv.payload.doc.data().hinicio.substring(0,2);
          var horaenterafin = rsv.payload.doc.data().hfin.substring(0,2);
          horaenteraini = this.quitarCeros(horaenteraini);
          horaenterafin = this.quitarCeros(horaenterafin)
          if(horaenteraini == "0"){
            horaenteraini = 24;
          }
          if(horaenterafin == "0"){
            horaenterafin = 24;
          }
          horaenteraini = Number(horaenteraini);
          horaenterafin = Number(horaenterafin);
          if(horaenteraini > horaenterafin){
            this.horastotales = horaenteraini + horaenterafin;
          }else{
            this.horastotales = horaenterafin - horaenteraini;
          }
          this.totalPago = this.horastotales * 15; 
          this.arr.push(this.totalPago);
        }
      });
    });
  
  }

  onClickTimer(){
    var horas = this.horastotales-1;
    var minutos = 59;
    var segundos = 59;

    var x = setInterval(function() {
        if(horas != 0 && minutos != 0 && segundos != 0){

          if(segundos > 1){
            segundos --;
          }else if(minutos > 1){
            minutos --;
            segundos = 59;
          }else if(horas > 1){
            horas--;
            minutos=59;
          }  
          document.getElementById("CountDown").innerHTML = horas + " : " + minutos + " : "+ segundos;

        }
        if(horas == 1 && minutos == 1 && segundos == 1){
          clearInterval(x);
           document.getElementById("CountDown").innerHTML = "EXPIRED";
        }
   }, 1000);
    
  }

  quitarCeros(value){
    var valorobtenido;
    var valor = value.substr(0, 1);

    if(valor == "0"){
       valorobtenido = value.substr(1,2);
    }else{
      valorobtenido = value;
    }
    return valorobtenido;
    
  }
  

  onClickIniciarReservacion(){
    $("#Codigo").fadeIn(300);
  }
  
  onClickCross(){
    $("#Codigo").fadeOut(300);
    this.reserva = 1; 
    $("#Iniciar").css("display", "none");
    $(".tiempo-titulo").css("display", "block");
    $("#Contador").css("display", "block");
    $(".status").css("display", "block");
    this.onClickTimer();
  }

  mostrarLugarCorrespondiente(){
    $("#Codigo").fadeOut(300);
    $(".tarjeta").fadeOut(300);
    $("#AnimacionLugarReservado").fadeIn(300);
  }

}
