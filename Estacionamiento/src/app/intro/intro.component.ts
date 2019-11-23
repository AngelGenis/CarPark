import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
