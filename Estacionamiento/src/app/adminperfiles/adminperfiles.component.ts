import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-adminperfiles',
  templateUrl: './adminperfiles.component.html',
  styleUrls: ['./adminperfiles.component.css']
})
export class AdminperfilesComponent implements OnInit {
  perfiles: any;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.db.getPerfiles()
           .subscribe(res => {
             this.perfiles = res;
           })
  }
}
