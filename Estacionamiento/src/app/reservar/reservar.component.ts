import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import {FirestoreService } from '../services/firestore.service';

import * as $ from 'jquery';
import { from } from 'rxjs';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})

export class ReservarComponent implements OnInit {
  banderaAutos: boolean = true;
  banderaTarjetas: boolean = true;
  autos: any;
  pagos: any;
  tarjeta: any;
  auto: any;
  email: any;
  perfiles: any;

  crearFormReservas(){
    return new FormGroup({
      usuario: new FormControl(''),
      fecha: new FormControl(''),
      llegada: new FormControl(''),
      salida: new FormControl(''),
      auto: new FormControl(''),
      pago: new FormControl('')
    })
  }

  formReservas: FormGroup;

  constructor(private db:FirestoreService,
              private auth:AuthService,
              private toastr:ToastrService) { 
    this.formReservas = this.crearFormReservas();

  }

  ngOnInit() {

    this.auth.user$.subscribe(e => {
      this.db.getPagos(e.email).subscribe(res => {
        this.pagos =res; 
        console.log(res);
      });
    });

    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getPerfil(e.email).subscribe(perfiles => {
        this.perfiles = perfiles;
      });
    });
    
    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getAutos(e.email).subscribe(res => this.autos =res);
    });
    
  }
  onLimpiarFormulario(){
    this.formReservas.reset();
  }
  onGuardarFormulario(){
    console.log("saved");

  }

  onClickAutos(){
    if(this.banderaAutos == true){
      $("#AutosRegistrados").show();
      document.getElementById('ArrowVehiculos').classList.add('up');
      document.getElementById('ArrowVehiculos').classList.remove('down');


      this.banderaAutos = false;
    }else{
      $("#AutosRegistrados").hide();
      this.banderaAutos = true;
      document.getElementById('ArrowVehiculos').classList.add('down');
      document.getElementById('ArrowVehiculos').classList.remove('up');
    }
    
  }
  onClickTarjetas(){
    if(this.banderaTarjetas == true){
      $("#TarjetasRegistradas").show();
      this.banderaTarjetas = false;
      document.getElementById('ArrowTarjetas').classList.add('up');
      document.getElementById('ArrowTarjetas').classList.remove('down');
    }else{
      $("#TarjetasRegistradas").hide();
      this.banderaTarjetas = true;
      document.getElementById('ArrowTarjetas').classList.add('down');
      document.getElementById('ArrowTarjetas').classList.remove('up');
    }
  }

  selectAuto(placa){
    this.auto=placa;
  }

  selectTarjeta(val){
    this.tarjeta=val;
  }

  reservar(){
    let ifecha = $("#fecha").val();
    let tlle = $("#tllegada").val()
    let tfin = $("#tsalida").val()
    
    let datos = {};
    let cliente= {};

      cliente = {
        email: this.perfiles.payload.data().correo
      }
    
    let auto = {};
    for(let carro of this.autos){
      if(carro.payload.doc.data().placas === this.auto){
        auto = {
          modelo: carro.payload.doc.data().modelo,
          placas: this.auto,
          color: carro.payload.doc.data().color
        }
      }
    }

    let reservacion = {
      fecha: ifecha,
      hinicio: tlle,
      hfin:tfin,
      tarjeta:this.tarjeta,
      auto: auto
    };

  
    datos['cliente'] = cliente;
    datos['reservacion'] = reservacion

    this.db.setReservacion(datos)
    //        .then(res => {
    //          this.toastr.success('Reservacion agregada con exito', 'Listo');
    //        })
    //        .catch(e => {
    //          this.toastr.error('No se pudo reservar','Error')
    //        })
    // console.log(datos);
    


    
  }
}
