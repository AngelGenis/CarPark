import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuBtn = document.querySelector('.menu-btn');
  menuOpen = false;
  links = document.querySelector('.menu-btn');


  constructor(private auth:AuthService,
              private toastr:ToastrService,
              private router:Router) { 
    
  } 

  ngOnInit(){
    $(".menu-btn").hide();
     
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

  onClickLinks(){
      document.querySelector('.menu-btn').classList.remove('open');
      document.getElementById('Menu2').classList.remove('slideInRight');
      document.getElementById('Menu2').classList.add('slideOutRight');
      setTimeout(function(){
        document.getElementById('Menu2').style.display="none";
      },400);
      this.menuOpen = false;
}

  cerrarSesion(){
    this.auth.signOut()
             .then(res => {
              this.toastr.info('Nos vemos pronto', 'Sesion cerrada')  
              this.router.navigate(['/transicionlog','out']);
              this.onClickLinks();
             })
             .catch(e => {
                this.toastr.error('No se pudo cerrar sesion.','Error');
             })
  }
  

  

}

