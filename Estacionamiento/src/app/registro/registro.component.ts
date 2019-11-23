import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { ToastrService, ToastRef } from 'ngx-toastr';
import * as $ from 'jquery';

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
    public toastr:ToastrService
    ) { this.tipoLogin='email';
    
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.innerWidth = window.innerWidth;
    if ( window.innerWidth <= 1000){
      $("#form").addClass('example-1');
      $("#form").addClass('scrollbar-ripe-malinka');
    } 
    else{
      $("#form").removeClass('example-1');
      $("#form").removeClass('scrollbar-ripe-malinka');
    }
  } 
  
  ngOnInit() {

    if ( window.innerWidth <= 1000){
      $("#form").addClass('example-1');
      $("#form").addClass('scrollbar-ripe-malinka');
    } 
    else{
      $("#form").removeClass('example-1');
      $("#form").removeClass('scrollbar-ripe-malinka');
    }
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

    value['nombre'] =     $("#nombreIn").val();
    value['apellido'] =   $("#apellidoIn").val();
    value['direccion'] =  $("#direccionIn").val();
    value['correo'] =     $("#correoIn").val();
    value['telefono'] =   parseInt($("#telefonoIn").val());
    value['clave'] =      $("#passIn").val();
    value['cuenta'] =     parseInt($("#tarjetaIn").val());
    value['displayName'] = $("#nombreIn").val();

    console.log(value);

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
             })
             .catch(e => {
               console.log(e);
             })
  }

}
