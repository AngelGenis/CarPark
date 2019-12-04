import { AfterViewInit, Component } from '@angular/core';
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

  ngOnInit(){
      $("#login").hide();
      $("#registro").hide();
  }
  ngAfterViewInit(){
    jarallax(document.querySelectorAll('.jarallax'),{
      speed: 0.2
    })
  }
}
