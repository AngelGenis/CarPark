import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public firebaseService:FirestoreService,
              public auth:AuthService) { }

  ngOnInit() {

  }

  limpiarImputs(){
  $("#nombreIn").val('');
  $("#apellidoIn").val('');
  $("#direccionIn").val('');
  $("#correoIn").val('');
  $("#telefonoIn").val('');
  $("#passIn").val('');
  $("#tarjetaIn").val('');
  }

  crearUsuario(){
    
    let value={};

    value['user'] = $("#userIn").val();
    value['nombre'] =     $("#nombreIn").val();
    value['apellido'] =   $("#apellidoIn").val();
    value['direccion'] =  $("#direccionIn").val();
    value['correo'] =     $("#correoIn").val();
    value['telefono'] =   parseInt($("#telefonoIn").val());
    value['clave'] =      $("#passIn").val();
    value['cuenta'] =     parseInt($("#tarjetaIn").val());
    console.log(value);

    this.firebaseService.createUser(value)
        .then(
          res=>{
            this.limpiarImputs();
            
            $("#intro").removeClass("delay-2s");
            $("#intro").removeClass("fadeOut");

            $("#registro").removeClass("delay-2s");
            $("#registro").removeClass("fadeOut");
            $("#registro").addClass("fadeOut faster");

            setTimeout(function(){
              $("#intro").hide();
              $("#registro").hide();
              $("#intro").addClass("fadeInUp");
              $("#intro").show();
            },500);
      }
        )
        .catch(
            e=>{
              console.log(e);
            }
        )
        .finally(
          function(){
            console.log('here');
          }
        );
  }
  gRegistro(){
    this.auth.googleSignIn();
  }

}
