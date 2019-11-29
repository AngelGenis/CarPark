import { Component, OnInit } from '@angular/core';
import { Cliente } from '../services/cliente.model';
import { FirebaseService } from '../firebase.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-visualizarperfil',
  templateUrl: './visualizarperfil.component.html',
  styleUrls: ['./visualizarperfil.component.css']
})
export class VisualizarperfilComponent implements OnInit {
  public bandcontenedor: number = 1;
  perfiles: Cliente[];


  constructor( private perfilService: FirebaseService) { }

  ngOnInit() {
    this.perfilService.getPerfiles().subscribe(perfiles => {
      this.perfiles = perfiles
    })
  }

  onClickDatosPersonales(){
    this.bandcontenedor = 1;
  }
  onClickDatosAutos(){
    this.bandcontenedor = 2;
  }
  onClickDatosTarjetas(){
    this.bandcontenedor = 3;
  }


}
