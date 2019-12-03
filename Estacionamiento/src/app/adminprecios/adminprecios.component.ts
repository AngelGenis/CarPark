import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminprecios',
  templateUrl: './adminprecios.component.html',
  styleUrls: ['./adminprecios.component.css']
})
export class AdminpreciosComponent implements OnInit {
  costos: unknown;

  constructor(private db:FirestoreService,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.db.getCostos()
           .forEach(res=> {
             this.costos = res.payload.data();
           })
  }

  actualizarPrecios(){
    let dia = $("#dia").val() == '' ? this.costos.dia : $("#dia").val() ;
    let hora = $("#hora").val() == '' ? this.costos.hora : $("#hora").val() ;
    let semana = $("#semana").val() == '' ? this.costos.semana : $("#semana").val() ;
    let mes = $("#mes").val() == '' ? this.costos.mes : $("#mes").val() ;
    
    let datos = {
      dia: dia,
      hora:hora,
      semana:semana,
      mes:mes
    }

    this.db.actualizaPrecios(datos)
           .then(res=>{
              this.toastr.success('Datos actualizados','Listo');
           })
           .catch(e=>{

           });
  }

}
