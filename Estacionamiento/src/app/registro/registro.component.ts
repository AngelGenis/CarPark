import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
 validatingForm:FormGroup;
 passVald:FormGroup;


  constructor(public firebaseService:FirestoreService,
              public auth:AuthService
              ) { }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      correoIn: new FormControl(null,[Validators.required, Validators.email])
    });

    this.passVald = new FormGroup({
      passIn: new FormControl(null,[Validators.required, Validators.minLength(6)])
    });
  }

  get input() {return this.validatingForm.get('correoIn');}
  get inputClave() {return this.passVald.get('passIn');}
  
 


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

    this.auth.autenticarNuevoUsuario(value['correo'],value['clave'])
             .then(res =>{
                  console.log(res);
              })
              .catch(e => {
                console.log(e);
              })

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
    this.auth.googleSignIn()
             .then(res=>{
               console.log(res);
               $("#nombreIn").val(res.displayName);
               $("#correoIn").val(res.email);
               $("#telefonoIn").val(res.phoneNumber);
             })
             .catch(e => {
               console.log(e);
             })
  }

}
