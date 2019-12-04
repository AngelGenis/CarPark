import { Component, OnInit,  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(public db:FirestoreService,
              public auth:AuthService,
              private toastr:ToastrService
              ) { }

  ngOnInit() {
  }

  showSuccess() {
    
    this.toastr.success('Sesion Iniciada!', `Bienvenido ${this.auth.user$.source}`);

  }

  showFailure(){
    this.toastr.success('Error', `No se pudo iniciar sesion`);
  }

  aRegistro(){

    $("#intro").removeClass("delay-2s");
    $("#intro").removeClass("fadeOut");
    $("#intro").addClass("fadeOut faster");

    $("#login").removeClass("delay-2s");
    $("#login").removeClass("fadeOut");
    $("#login").removeClass("fadeInUpBig faster");
    $("#login").addClass("fadeOut faster");
    
    setTimeout(function(){
       $("#intro").hide();
       $("#login").hide();
       $("#registro").removeClass("fadeOut");
       $("#registro").show();
    },500);

  }

  async login(){
    
    let log = $("#username").val();
    let pass = $("#pass").val();

    let res = this.auth.logearUsuario(log,pass)
             .then( res => {
               console.log(res);
             })
             .catch( e =>{
               console.log(e);
             })
    console.log(res);
    if(res['code']){
      this.showFailure();
    } else if(res['user']) {
      this.showSuccess();
    }

  }

  glogin(){

    this.auth.googleSignIn()
             .then(res=>{
               //Logica cuando el inicio de sesion jale
              console.log(res, 'success');
              
             })
             .catch(e =>{
              //cuando no 
              console.log(e,'fail');
              
             })

    }

}
