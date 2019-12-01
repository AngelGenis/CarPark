import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { ToastrService, ToastRef } from 'ngx-toastr';

import * as $ from 'jquery';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  validatingForm:FormGroup;
  passVald:FormGroup;
  tipoLogin: string;
  
  
  constructor(public firebaseService:FirestoreService,
    public auth:AuthService,
    public toastr:ToastrService,
    private http: HttpClient
    ) { this.tipoLogin='email';
    
  }

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

    $("#nombreIn").val('')
    $("#apellidoIn").val('')
    $("#correoIn").val('')
    $("#telefonoIn").val('')
    $("#passIn").val('')
    $("#nombreIn").val('')
    $("#calleIn").val('')
    $("#numeroIn").val('')
    $("#cpIn").val('')
    $("#tarjetaIn").val('')
    $("#cvvIn").val('')
    $("#fechaIn").val('')
    
  }

  crearUsuario(){
    
    let value={};


    value['nombre'] =     $("#nombreIn").val();
    value['apellido'] =   $("#apellidoIn").val();
    value['correo'] =     $("#correoIn").val();
    value['telefono'] =   parseInt($("#telefonoIn").val());
    value['clave'] =      $("#passIn").val();
    value['displayName'] = $("#nombreIn").val();
    value['direccion'] = { calle: $("#calleIn").val(),
                           numero: $("#numeroIn").val(),
                           cp: $("#cpIn").val()
                          };
    value['pagos'] = {
                        numero: $("#tarjetaIn").val(),
                        cvv: $("#cvvIn").val(),
                        expiracion: $("#dateIn").val()
                      }


    this.auth.autenticarNuevoUsuario(value['correo'],value['clave'])
             .then(res =>{
               this.firebaseService.createUser(value, this.tipoLogin)
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
           
                       this.toastr.success('Registro exitoso','Bienvenido');
                 }
                   )
                   .catch(
                       e=>{
                         
                         console.log(e);
           
                         this.toastr.error('Error','Verifique su email');
                       }
                   )
                   .finally(
                     function(){
                     }
                   );
              })
            
              .catch(e => {
                  console.log(e);
                  this.toastr.error('Error','Verifique su email');
              })
              
  }

  gRegistro(){
    this.auth.googleSignIn()
             .then(res=>{
               console.log(res);
               $("#nombreIn").val(res.displayName);
               $("#correoIn").val(res.email);
               $("#telefonoIn").val(res.phoneNumber);
               this.tipoLogin='google';
               this.toastr.info('Complete el formulario','Autenticado');
             })
             .catch(e => {
               console.log(e);
             })
  }

}
