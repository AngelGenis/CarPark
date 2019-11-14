import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { 
    
  } 

  ngOnInit() {
  }

  onClickBrand(){

    $("#login").removeClass("delay-2s");
    $("#login").removeClass("fadeOut");
    $("#login").addClass("fadeOut faster");
    $("#registro").removeClass("delay-2s");
    $("#registro").removeClass("fadeOut");
    $("#registro").addClass("fadeOut faster");

    setTimeout(function(){
       $("#login").hide();
       $("#registro").hide();
       $("#intro").removeClass("fadeOut");
       $("#intro").addClass("fadeIn");
       $("#intro").show();
    },0);

  }

  onClickInicio(){
    $("#btn1").removeClass('active');
    $("#btn1").addClass('active');
    for(let i =2; i<5; ++i){

      $("#btn"+i).removeClass('active');
    }

    $("#login").removeClass("delay-2s");
    $("#login").removeClass("fadeOut");
    $("#login").addClass("fadeOut faster");
    $("#registro").removeClass("delay-2s");
    $("#registro").removeClass("fadeOut");
    $("#registro").addClass("fadeOut faster");

    setTimeout(function(){
       $("#login").hide();
       $("#registro").hide();
       $("#intro").removeClass("fadeOut");
       $("#intro").addClass("fadeIn");
       $("#intro").show();
    },0);

  }

  onClickAbout(){

    $("#btn4").removeClass('active');
    $("#btn4").addClass('active');
    for(let i = 1; i<5; ++i){
      if(i == 4){

      } else
      $("#btn"+i).removeClass('active');
    }
    console.log("wokin");
    document.getElementById("about").scrollIntoView({behavior:"smooth"}); 
  }

  onClickUbicacion(){

    $("#btn3").removeClass('active');
    $("#btn3").addClass('active');
    for(let i = 1; i<5; ++i){
      if(i == 3){

      } else
      $("#btn"+i).removeClass('active');
    }
    console.log("wokin");
    document.getElementById("about").scrollIntoView({behavior:"smooth"}); 
  }

  onClickInstalaciones(){

    $("#btn2").removeClass('active');
    $("#btn2").addClass('active');
    for(let i = 1; i<5; ++i){
      if(i == 2){

      } else
      $("#btn"+i).removeClass('active');
    }
    console.log("wokin");

    document.getElementById("instalaciones").scrollIntoView({behavior:"smooth"}); 

  }

  onClickLogin(){
    $("#intro").removeClass("delay-2s");
    $("#intro").removeClass("fadeOut");
    $("#intro").addClass("fadeOut faster");
    $("#registro").removeClass("delay-2s");
    $("#registro").removeClass("fadeOut");
    $("#registro").addClass("fadeOut faster");

    setTimeout(function(){
       $("#intro").hide();
       $("#registro").hide();
       $("#login").show();
    },500);
  }

  onClickRegistro(){
    $("#intro").removeClass("delay-2s");
    $("#intro").removeClass("fadeOut");
    $("#intro").addClass("fadeOut faster");
    $("#login").removeClass("delay-2s");
    $("#login").removeClass("fadeOut");
    $("#login").addClass("fadeOut faster");
    
    setTimeout(function(){
       $("#intro").hide();
       $("#login").hide();
       $("#registro").show();
    },500);
  }

}
