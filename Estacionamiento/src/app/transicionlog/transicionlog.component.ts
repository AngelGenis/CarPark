import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-transicionlog',
  templateUrl: './transicionlog.component.html',
  styleUrls: ['./transicionlog.component.css']
})
export class TransicionlogComponent implements OnInit {
  operacion: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.operacion = this.route.snapshot.paramMap.get('operacion');
      setTimeout(()=>{

      $("#logot").addClass('animated');
      $("#logot").addClass('tada');
      },500);
      setTimeout(() => {
        $("#transroot").removeClass('fadeInLeft');
        $("#transroot").removeClass('animated');
        $("#transroot").addClass('animated');
        $("#transroot").addClass('fadeOutRight');
      },1500);
      setTimeout(()=>{
        if(this.operacion == 'in'){
          $("#Menu1").hide();
        this.router.navigate(['/perfil']);
          
        } else if(this.operacion == 'admin'){
          $("#Menu1").hide();
        this.router.navigate(['/ganancias']);
        }
        else{
          $("#Menu1").show();
          $(".menu-btn").hide()
          this.router.navigate(['/inicio']);
        }
      },2500);
    }
    
    ngOnInit() {
    }
}
