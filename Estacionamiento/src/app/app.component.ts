import { AfterViewInit, Component } from '@angular/core';
import 'jarallax';
declare var jarallax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'Estacionamiento';

  ngAfterViewInit(){
    jarallax(document.querySelectorAll('.jarallax'),{
      speed: 0.2
    })
  }
}
