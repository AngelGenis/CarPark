import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() about: AboutComponent;

  constructor() { }

  ngOnInit() {
  }

  onClickInicio(){
    $("#btn1").removeClass('active');
    $("#btn1").addClass('active');
    for(let i =2; i<5; ++i){

      $("#btn"+i).removeClass('active');
    }
    console.log("wokin");

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
    window.scroll({
      top: 1000,
      behavior: 'smooth'
    });
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
    window.scroll({
      top: 1000,
      behavior: 'smooth'
    });
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

    window.scroll({
      top: 2000,
      behavior: 'smooth'
    });

  }

}
