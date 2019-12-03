import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import * as $  from 'jquery';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private db: FirestoreService,
              private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    let datos = {
      email: $("#username").val(),
      key: $("#pass").val()
    }

    this.auth.logearUsuario(datos.email, datos.key).then(res=>{
      console.log(res);
    })
    .catch(e=>{
      console.log(e);
    })
    
  }

}
