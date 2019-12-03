import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminpark',
  templateUrl: './adminpark.component.html',
  styleUrls: ['./adminpark.component.css']
})
export class AdminparkComponent implements OnInit {
  pisoact : number = 1;

  constructor() { }

  ngOnInit() {
  }

  goizq(){
    if(this.pisoact>1 && this.pisoact <=3){
      this.pisoact --;
    }else{
      this.pisoact = 3;
    }
  }

  goder(){
    if(this.pisoact>=1 && this.pisoact <3){
      this.pisoact ++;
    }else{
      this.pisoact = 1;
    }
  }

}
