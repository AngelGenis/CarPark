import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cdarsebaja',
  templateUrl: './cdarsebaja.component.html',
  styleUrls: ['./cdarsebaja.component.css']
})
export class CdarsebajaComponent implements OnInit {

  constructor(private db: FirestoreService,
              private auth: AuthService,
              private toastr: ToastrService,
              private router:Router) { }

  ngOnInit() {

  }

  baja(){

    this.auth.user$.subscribe(res => {
      this.db.bajaUsuario(res.email)
             .then(resp => {
               this.auth.deleteUser()
                        .then(res => {
                          this.toastr.info('Cliente dado de baja',"Hasta Pronto!");
                          this.router.navigate(['/transicionlog','out']);
                        })
                        .catch(e => {
                            this.toastr.error('No se pudo cerrar sesion.','Error');
                        })
             })
    })
  }
}
