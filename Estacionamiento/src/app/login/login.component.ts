import { Component, OnInit,  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
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
              private toastr:ToastrService,
              private router:Router
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

    this.auth.logearUsuario(log,pass)
             .then( res => {
              console.log(res); 
             })
             .catch( e =>{
               console.log(e);
             })
  }

  glogin(){
    this.auth.googleLogIn()
             .then(res=>{
              $(".menu-btn").show();
              setTimeout(()=>{
                $(".menu-btn").addClass('animated');
                $(".menu-btn").addClass('heartBeat');
              },3000)
              
              this.toastr.success('Secion Iniciada', `Bienvenido: ${res.user.displayName}`);
              console.log(res, 'success');

              this.router.navigate(['/transicionlog','in'])
             })
             .catch(e =>{
              //cuando no 
              console.log(e,'fail');
             })

    }

}
