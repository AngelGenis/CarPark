import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  banderaAutos: boolean = true;
  banderaTarjetas: boolean = true;


  constructor() { }

  ngOnInit() {
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
