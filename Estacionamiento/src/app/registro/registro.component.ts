import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { ToastrService, ToastRef } from 'ngx-toastr';
import {Router} from '@angular/router';
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
    private http: HttpClient,
    private router: Router
    ) { this.tipoLogin='email';
    
  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      correoIn: new FormControl(null,[Validators.required, Validators.email]),
      passIn: new FormControl(null,[Validators.required, Validators.minLength(6)]),
      defReq: new FormControl(null, [Validators.required]),
      telefonoIn: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+')]),
      tarjetaIn: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{16}')]),
      cvvIn: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{3}')]),
      fechaIn: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]{2}/[0-9]{2}')]),
      cpIn: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]')])
    });
  }


  get inputCorreo() {return this.validatingForm.get('correoIn');}
  get inputClave() {return this.validatingForm.get('passIn');}
  get inputname() {return this.validatingForm.get('defReq');}
  get inputapel() {return this.validatingForm.get('defReq');}
  get inputtel() {return this.validatingForm.get('telefonoIn');}
  get inputcalle() {return this.validatingForm.get('defReq');}
  get inputcp() {return this.validatingForm.get('cpIn');}
  get inputtarjeta() {return this.validatingForm.get('tarjetaIn');}
  get inputcvv() {return this.validatingForm.get('cvvIn')}
  get inputfecha() {return this.validatingForm.get('fechaIn')}

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
    
    console.log($('#sexo1').is(':checked'));

    value['sexo'] = $('#sexo1').is(':checked') ? 'M' : 'F';
    value['nombre'] =     $("#nombreIn").val();
    value['apellido'] =   $("#apellidoIn").val();
    value['correo'] =     $("#correoIn").val();
    value['telefono'] =   parseInt($("#telefonoIn").val());
    value['clave'] =      $("#passIn").val();
    value['displayName'] = $("#nombreIn").val();
    value['direccion'] = { calle: $("#calleIn").val(),
                           numero: $("#numeroIn").val(),
                           cp: $("#cpIn").val(),
                           colonia: $("#coloniaIn").val()
                          };
    value['pagos'] = {
                        numero: $("#tarjetaIn").val(),
                        cvv: $("#cvvIn").val(),
                        expiracion: $("#dateIn").val()
                      }


    this.auth.autenticarNuevoUsuario(value)
             .then(ret =>{
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
                          
                          this.router.navigate(['/login'])
                        })
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
