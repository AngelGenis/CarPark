import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'jarallax';
declare var jarallax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'Estacionamiento';
  usuario = 0;
  constructor(private auth:AuthService,
              private toastr:ToastrService){
    this.toastr.toastrConfig.timeOut = 1500;
  }

  ngOnInit(){
      $("#login").hide();
      $("#registro").hide();
      $("#navadmin").hide();

      this.auth.user$.subscribe(res => {
        console.log(res);
         if(res.email !== "admin@carpark.cf"){
          $("#Menu1").hide();
          $("#navcli").hide();
          $("#navadmin").hide();
          setTimeout(()=>{
            $("#navcli").show();
          },500)
          $(".menu-btn").show(); 
          } else {
          $("#Menu1").hide();
          $("#navcli").hide();
          $("#navadmin").hide();
          setTimeout(()=>{
            $("#navadmin").show();
          },500)
          $(".menu-btnb").show(); 
          } 
        //  else {
        //   $("#Menu1").hide();
        //   $("#navcli").hide();
        //   $("#navadmin").show();
        //   $(".menu-btnb").show();
        //  }
      })
  }
  ngAfterViewInit(){
    jarallax(document.querySelectorAll('.jarallax'),{
      speed: 0.2
    })
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

}
