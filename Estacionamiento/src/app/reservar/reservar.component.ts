import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

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

  constructor(private dbData: AngularFirestore) { 
    this.formReservas = this.crearFormReservas();
  }

  ngOnInit() {
  }
  onLimpiarFormulario(){
    this.formReservas.reset();
  }
  onGuardarFormulario(value){
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
    }else{
      $("#TarjetasRegistradas").hide();
      this.banderaTarjetas = true;
    }
  }

}
