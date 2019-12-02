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
  tiempo: number = 3;
  reserva: number = 0;
  reservaciones: any;

  constructor(private auth:AuthService,
              private db:FirestoreService,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.auth.user$.subscribe( cliente => {
      this.db.getReservaciones(cliente.email).subscribe( res => {
        this.reservaciones = res;
        console.log(res);
      })
    })
   
  }

  onClickTimer(){
    var horas = this.tiempo-1;
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
  

  onClickIniciarReservacion(){
    $("#Codigo").fadeIn(300);
  }

  onClickCross(){
    $("#Codigo").fadeOut(300);
    this.reserva = 1;  
  }

  mostrarLugarCorrespondiente(){
    $("#Codigo").fadeOut(300);
    $(".tarjeta").fadeOut(300);
    $("#AnimacionLugarReservado").fadeIn(300);
  }

}
