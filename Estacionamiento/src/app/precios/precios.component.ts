import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(res => {
      if(res.email !== 'admin@carpark.cf')
        this.router.navigate(['/perfil']);
    })   
  }

}
