import { Component, OnInit,  } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(public db:FirestoreService,
              public auth:AuthService
              ) { }

  ngOnInit() {
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

  login(){
    
    let log = $("#username").val();
    let pass = $("#pass").val();
    this.db.testLogin(log,pass);
  
  }

  glogin(){

    this.auth.googleSignIn()
             .then(res=>{
               //Logica cuando el inicio de sesion jale
              console.log(res);
             })
             .catch(e =>{
              //cuando no 
              console.log(e);
             })

    }

}
