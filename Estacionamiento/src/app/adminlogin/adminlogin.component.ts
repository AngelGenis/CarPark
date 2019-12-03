import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import * as $  from 'jquery';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private db: FirestoreService) { }

  ngOnInit() {
  }

  login(){
    let datos = {
      email: $("#username").val(),
      key: $("#pass").val()
    }
    
    this.db.loginAdmin(datos)
           .then(res => console.log(res))
           .catch(e => {console.log(e);})
    
  }

}
