import { Component, OnInit } from '@angular/core';
// import { FirebaseService } from '../firebase.service';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { timingSafeEqual } from 'crypto';


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
      this.db.getPerfil(e.email).subscribe(perfiles => {
        this.perfiles = [perfiles.payload.data()];
      });
    });


    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getAutos(e.email).subscribe(res => this.autos =res);
    });

    
    this.auth.user$.subscribe(e => {
      console.log(e);
      this.db.getPagos(e.email).subscribe(res => {this.pagos =res; console.log(res);});
    });
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
  onClickEditarInfo(){
    $(".sololectura").removeClass("noborder");
    $(".sololectura").addClass("write");
    $(".sololectura").prop('disabled', false);
    $("#Editar").css("display", "none");
    $("#Guardar").css("display", "block");
  }

  onClickGuardarCambios(){
    $(".sololectura").removeClass("write");
    $(".sololectura").addClass("noborder");
    $(".sololectura").prop('disabled', true);
    $("#Editar").css("display", "block");
    $("#Guardar").css("display", "none");

    let name = $("#vnombre").val();
    let apellido = $("#vapellido").val();
    let sexo = $("#vsexo").val();
    let telefono = $("#vtelefono").val();
    let direccion = {
      calle: $("#vcalle").val(),
      numero: $("#vnumero").val(),
      colonia: $("#vcolonia").val(),
      cp: $("#vcp").val()
    }
    let pago = $("#vpago").val();
    
    let flag = true;

    this.auth.user$.subscribe(re=>{
      let data = {
        nombre:name,
        apellido:apellido,
        telefono:telefono,
        direccion:direccion,
        email: re.email,
        sexo: sexo
      }
      this.db.actualizarUsuario(data)
      .then(res=> {
          if(pago[0] !== '•'){
            let pagos = {
              numero:pago
            }
            this.auth.setPagos(pagos,re.email)
                     .then(resp=>{
                       this.toastr.success('Pago actualizado','Listo');
                     })
                     .catch(e =>{
                       console.log(e);
                       this.toastr.error('Error al actualizar','Error');
                     })
          } else {
              if(flag){
                flag = false;
                this.toastr.success('Datos actualizados','Listo');
              }
          }
       })
    })
  }
  
  agregarAuto(){

    if(this.autos.length == 3){
      this.toastr.warning('Ha llegado al limite de autos','Error');
    }else {

      let auto = {}
  
      auto['modelo'] = $("#modelo").val();
      auto['placas'] = $("#placas").val();
      auto['color'] =  $("#color").val();
      this.auth.user$.subscribe( async (e) => {
        console.log(e);
        await this.db.setAuto(auto,e.email)
      })
    }
  }
  
  eliminarAuto(modelo){
    this.auth.user$.subscribe(async(res)=>{
       await this.db.delAuto(modelo, res.email);
    })
    
  }

  colores(value){
    this.color = value;
  }

}
