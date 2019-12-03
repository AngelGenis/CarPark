import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.css']
})
export class GananciasComponent implements OnInit {
  gananciastotales: any;
  ganancias: any;

  constructor(private db:FirestoreService) {
    this.gananciastotales = 0;
  }

  ngOnInit() {
    this.db.getGanancias()
           .subscribe(res => {
             console.log(res);
             this.ganancias = res;
             res.forEach(rsv => {
              this.gananciastotales += rsv.payload.doc.get('total') !== undefined ? rsv.payload.doc.get('total') : 0;
             })
           })
  }

}
