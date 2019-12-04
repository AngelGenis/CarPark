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
    $(".autoclass").removeClass('border border-primary rounded-pill');
    $("#"+placa).addClass('border border-primary rounded-pill');
  }

  selectTarjeta(val){
    this.tarjeta=val;
    $(".tarjetaclass").removeClass('border border-primary rounded-pill');
    $("#"+val).addClass('border border-primary rounded-pill');
  }

  reservar(){
    let ifecha = $("#fecha").val();
    let tlle = $("#tllegada").val()
    let tfin = $("#tsalida").val()
    
    if(ifecha === '' || tlle === '' || tfin === '' || this.auto === '' || this.tarjeta === ''){
      this.toastr.error('Existen campos no validos, por favor intente de nuevo','Error');
    } else {

      
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
      
      let lleInt = parseInt(tlle.split(':')[0]+tlle.split(':')[1]);
      let finInt = parseInt(tlle.split(':')[0]+tlle.split(':')[1]);
      let reservacion = {
        fecha: ifecha,
        hinicio: tlle,
        hinicioInt: lleInt,
        hfinInt: finInt,
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

  total(rsv) {
    let horastotales;
    let totalPago;
    let fecha = rsv.fecha;
    let horainicio = rsv.hinicio;
    let horafinal = rsv.hfin;

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
      horastotales = horaenteraini + horaenterafin;
    } else {
      horastotales = horaenterafin - horaenteraini;
    }
    totalPago = horastotales * 15;


    totalPago;
  
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
        // foo(){
          //   let tlle = $("#tllegada").val()
          //   let tfin = $("#tsalida").val()
          
          
          //   console.log(parseInt(tlle.split(':')[0]+tlle.split(':')[1]));
          // }
  }
        