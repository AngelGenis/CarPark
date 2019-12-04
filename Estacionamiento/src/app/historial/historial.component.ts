import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service'; 
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  tiempo: number = 3;
  reserva: number = 0;
  reservaciones: any;

  constructor(private auth: AuthService,
              private db: FirestoreService,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.auth.user$.subscribe(e => {

      let datos= { 
        cliente: {
          email:e.email
        }
      }

      this.db.getHistorial(datos)
             .subscribe(res => {
                this.reservaciones = res;
              })
    });


  }

  calificacion(n,id){
    for(let i = 1; i <= 5; ++i){
      $(`#s${i}${id}`).css('color','grey');
    }
    for(let i = 1; i <= n; ++i){
      $(`#s${i}${id}`).css('color','yellow');
    }
    this.db.setCalificacion(n,id)
           .then(res =>{
            this.toastr.success('Calificacion guardada','Listo'); 
            console.log(res);
           })
           .catch(e => {
            this.toastr.error('Error al guardar calificacion', 'Error'); 
            console.log(e);
           })
  }


}
