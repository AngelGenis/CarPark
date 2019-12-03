import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  menuBtn = document.querySelector('.menu-btn');
  menuOpen = false;
  links = document.querySelector('.menu-btn');
  constructor(private auth:AuthService,
              private toastr:ToastrService,
              private router:Router) { }

  ngOnInit(){
    $(".menu-btnb").hide();
     
  }
  onClickMenu(){
    
      if(!this.menuOpen) {
        document.querySelector('.menu-btnb').classList.add('open');
        document.getElementById('Menu2b').style.display = "block";
        document.getElementById('Menu2b').classList.add('slideInRight');
        document.getElementById('Menu2b').classList.remove('slideOutRight');
        this.menuOpen = true;

      } else {
        document.querySelector('.menu-btnb').classList.remove('open');
        document.getElementById('Menu2b').classList.remove('slideInRight');
        document.getElementById('Menu2b').classList.add('slideOutRight');
        setTimeout(function(){
          document.getElementById('Menu2b').style.display="none";
        },400);
        this.menuOpen = false;
      }

  }

  onClickLinks(){
      document.querySelector('.menu-btnb').classList.remove('open');
      document.getElementById('Menu2b').classList.remove('slideInRight');
      document.getElementById('Menu2b').classList.add('slideOutRight');
      setTimeout(function(){
        document.getElementById('Menu2b').style.display="none";
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
