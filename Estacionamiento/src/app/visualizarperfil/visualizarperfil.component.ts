import { Component, OnInit } from '@angular/core';
// import { FirebaseService } from '../firebase.service';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-visualizarperfil',
  templateUrl: './visualizarperfil.component.html',
  styleUrls: ['./visualizarperfil.component.css']
})
export class VisualizarperfilComponent implements OnInit {
  public bandcontenedor: number = 1;
  public perfiles: any;
  autos: any;
  color: any;
  pagos: any;

  constructor(public db:FirestoreService,
              public auth:AuthService,
              private toastr:ToastrService
              ) { }

  ngOnInit() {
    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getPerfil(e.email).subscribe(perfiles => this.perfiles = [perfiles.payload.data()]);
    });


    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getAutos(e.email).subscribe(res => this.autos =res);
    });

    
    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getPagos(e.email).subscribe(res => {this.pagos =res; console.log(res);});
    });
    // this.db.getPerfil(this.email).subscribe(perfil => {
    //   this.perfiles = perfil;
    // })
    // this.perfilService.getPerfiles().subscribe(perfiles => {
    //   this.perfiles = perfiles
    // })
  }

  onClickDatosPersonales(){
    this.bandcontenedor = 1;
  }
  onClickDatosAutos(){
    this.bandcontenedor = 2;
  }
  onClickDatosTarjetas(){
    this.bandcontenedor = 3;
  }
  
  agregarAuto(){
    let auto = {}

    auto['modelo'] = $("#modelo").val();
    auto['placas'] = $("#placas").val();
    auto['color'] = this.color;
    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.setAuto(auto,e.email)
             .then(res => {
               console.log("succ",res);
               this.toastr.success('Auto registrado con exito','Listo');
             })
             .catch(e => {
               console.log("error",e);
                this.toastr.error('Error al registrar auto', 'Error');
              })
    })

  }

  colores(value){
    this.color = value;
  }

}
