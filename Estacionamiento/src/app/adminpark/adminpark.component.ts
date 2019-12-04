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
  reservaciones: any;

  constructor(private db:FirestoreService) { }

  ngOnInit() {
    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var valorfecha = Number(date.substr(8, 10));
    var fechab = this.fechaCorrecta(today, valorfecha);
    

    this.db.getReservacionesHora(12, fechab)
           .subscribe(res => {
             this.reservaciones = res;

             for(let rsv of this.reservaciones){
              var piso = rsv.payload.doc.data().piso;
              var cajon = rsv.payload.doc.data().cajon;
    
              console.log(cajon);
              console.log(piso);
              
            }
           })
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

  fechaCorrecta(today, valorfecha) {
    var fechabuena = "";
    switch (valorfecha) {
      case 1:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "01";
        break;
      case 2:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "02";
        break;
      case 3:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "03";
        break;
      case 4:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "04";
        break;
      case 5:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "05";
        break;
      case 6:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "06";
        break;
      case 7:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "07";
        break;
      case 8:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "08";
        break;
      case 9:
        fechabuena = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "09";
        break;
    }

    return fechabuena;

  }

}
