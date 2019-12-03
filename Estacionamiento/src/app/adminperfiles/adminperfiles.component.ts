import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-adminperfiles',
  templateUrl: './adminperfiles.component.html',
  styleUrls: ['./adminperfiles.component.css']
})
export class AdminperfilesComponent implements OnInit {
  perfiles: any;
  selected: string[];
  flag:boolean = false;
  currentuser: any;
  
  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.db.getPerfiles()
           .subscribe(res => {
             this.perfiles = res;
           })
           this.selected = [];
  }

  cerrarPerfil(){
    this.flag = false;
  }

  addPerfil(data,flag){
    if(flag !== 'inactivo')
      this.db.bajaUsuario(data).then().catch().finally();
  }

  visualizarInfo(email){
    this.db.getUsuario(email)
           .subscribe( res => {
             console.log(res.payload.data());
             this.currentuser = res.payload.data();
             this.flag=true;
            })
  }


}
