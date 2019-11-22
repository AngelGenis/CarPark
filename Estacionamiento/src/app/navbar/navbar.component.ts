import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuBtn = document.querySelector('.menu-btn');
  menuOpen = false;

  constructor() { 
    
  } 

  ngOnInit() {
     
  }
  onClickMenu(){
    
      if(!this.menuOpen) {
        document.querySelector('.menu-btn').classList.add('open');
        document.getElementById('Menu2').style.display = "block";
        document.getElementById('Menu2').classList.add('slideInRight');
        document.getElementById('Menu2').classList.remove('slideOutRight');
        this.menuOpen = true;

      } else {
        document.querySelector('.menu-btn').classList.remove('open');
        document.getElementById('Menu2').classList.remove('slideInRight');
        document.getElementById('Menu2').classList.add('slideOutRight');
        setTimeout(function(){
          document.getElementById('Menu2').style.display="none";
        },400);
        this.menuOpen = false;
      }

  }

  onClickBrand(){

    $("#login").removeClass("delay-2s");
    $("#login").removeClass("fadeOut");
    $("#login").addClass("fadeOut faster");
    
    $("#registro").removeClass("delay-2s");
    $("#registro").removeClass("fadeOut");
    $("#registro").addClass("fadeOut faster");

    setTimeout(function(){
      $("#registro").hide();

       $("#login").hide();
       $("#intro").removeClass("fadeOut");
       $("#intro").addClass("fadeIn");
       $("#intro").show();
    },500);

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
    },500);

  }

  onClickPrecio(){

    document.getElementById("precio").scrollIntoView({behavior:"smooth"}); 
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
       $("#login").removeClass("fadeOut");
       $("#login").show();
    },500);
  }

  onClickRegistro(){
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

  

}

