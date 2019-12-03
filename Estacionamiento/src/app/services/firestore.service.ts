import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usr: User;
  constructor(public db: AngularFirestore,
              public auth:AuthService,
              public toastr:ToastrService
              ) { 
              }

  // createUser(value, flag){
  //   console.log(value);
  //   let hash = bcrypt.hashSync(value.clave, 8);
  //   return this.actualizaPagos(value.pagos,value.correo)
  //     .then(res => {
  //       console.log(res);
  //       if(flag === 'google'){
  //         return this.db.collection('Clientes').doc(value.correo).update({
  //           apellido: value.apellido,
  //           nombre: value.nombre,
  //           correo: value.correo,
  //           direccion: value.direccion,
  //           telefono: value.telefono,
  //           email:value.correo,
  //           sexo:value.sexo,
  //           clave: hash
  //         });
  //       } else if (flag==='email'){
  //         this.auth.updateUserData({displayName: value.nombre + ' ' + value.apellido,
  //                                   uid: value.uid,
  //                                   phoneNumber: value.telefono,
  //                                   photoURL: null,
  //                                   email: value.correo});

  //         return this.db.collection('Clientes').doc(value.correo).set({
  //           apellido: value.apellido,
  //           nombre: value.nombre,
  //           correo: value.correo,
  //           direccion: value.direccion,
  //           telefono: value.telefono,
  //           email:value.correo,
  //           sexo:value.sexo,
  //           clave: hash
  //         });
  //       }
  //     })
  //     .catch(e=>console.log(e))
  // }


  actualizarUsuario(datos){
    return this.db.collection('Clientes').doc(datos.email).update({
      nombre:datos.nombre,
      telefono: datos.telefono,
      correo:datos.correo,
      direccion: datos.direccion
    })
  }


  getPerfil(email){
    bcrypt.compare('adminkey','$2a$10$vMvHo31n8aVI.bzEs9gV0OrLMRvvRhGR15BcDUmU7gB3h.5KzDp5S',(err,res) => {console.log(res)})
    
    return this.db.collection('Clientes').doc(email).snapshotChanges();
  }

  logearUsuario(value, pass){
    //Vonsultar la coleccion clientes, ordenara
    return this.db.collection("Clientes", ref => ref.orderBy('').startAt(value)).snapshotChanges();
    
  }

  testLogin(usuario, clave){
      return this.db.collection('Clientes',ref => ref.where('user', '==', usuario)
                                                  .where('clave', '==', clave))
                                                  .snapshotChanges()
  }

  setAuto(auto,email){

    // let res = this.db.collection('Clientes').doc(email)
    //                  .collection('Autos',ref => ref.where('estado', '==','activo'))
    //                  .get();

    // res.forEach(res => { 
    //   res.docs.map(e => {
    //     if(e.data().placas === auto.placas){
    //       this.toastr.info('Placaje previamente registrado','Aviso')
    //       return;
    //     } else {
    //     }
    //   });
    // })
    
    let docRef = this.db.firestore.doc(`Clientes/${email}/Autos/${auto.placas}`);

    docRef.get()
      .then(res => {
        if (res.exists && res.data().estado == 'inactivo') {
          return this.db.collection('Clientes').doc(email).collection('Autos').doc(auto.placas).update({
            modelo:auto.modelo,
            color:auto.color,
            estado: 'activo'
          }).then(res => {
            this.toastr.success('Auto registrado con exito', 'Listo');
          }).catch(e => {
            console.log(e);
          }).finally(() => {

          })
        } else if(res.exists && res.data().estado == 'activo'){
          this.toastr.error("Existe un auto con este placaje en su perfil","Error")
        } else {
          return this.db.collection('Clientes').doc(email).collection('Autos').doc(auto.placas).set({
            estado: 'activo',
            modelo: auto.modelo,
            placas: auto.placas,
            color: auto.color
          }).then(res => {
            console.log("succ", res);
            this.toastr.success('Auto registrado con exito', 'Listo');
          }).catch(e => {
            console.log(e);
          }).finally(() => {

          })
        }
      })
      .catch(e => {

      })
      .finally(() => {

      })
 }

  delAuto(modelo,email){
    this.db.collection('Clientes').doc(email).collection('Autos').doc(modelo).set({
      estado: 'inactivo'
    },{merge:true}).then(res=>{
      this.toastr.info('Auto eliminado con exito','Listo');
      
    }).catch(e=>{
      console.log(e);
    });
  }

  getAutos(email){
    return this.db.collection('Clientes').doc(email).collection('Autos', ref => ref.where('estado', '==', 'activo')).snapshotChanges();
  }

  getPagos(email){
    return this.db.collection('Clientes').doc(email).collection('Pagos').snapshotChanges();
  }

  actualizarCajon(nivel, cajon, operacion){
    if(operacion == 1){
      return this.db.collection('Niveles').doc(`nivel-${nivel}`).collection('cajones').doc(`c-${cajon}`).update({estado: 'reservado'})
    } else if (operacion == 2){
      return this.db.collection('Niveles').doc(`nivel-${nivel}`).collection('cajones').doc(`c-${cajon}`).update({estado: 'activo'})
    } else {
      return this.db.collection('Niveles').doc(`nivel-${nivel}`).collection('cajones').doc(`c-${cajon}`).update({estado: 'disponible'})
    }
  } 

  setReservacion(data){
      let cli = data.cliente;
      let rsv = data.reservacion;
      let doc, inserted = false;      

      for(let i =1; i<4;++i){
        doc = this.db.collection('Niveles')
                     .doc(`nivel-${i}`)
                     .collection('cajones');
        
        for(let j = 1; j <=15; ++j){
          doc.doc(`c-${j}`).get().forEach(cajon => {
              if(cajon.data().estado !== "reservado" && cajon.data().estado !== "activo" && inserted !== true){
                inserted = true;
                this.actualizarCajon(i,j,1)
                    .then(res => {
                      return this.db.collection('Reservaciones')
                             .add({
                             fecha: rsv.fecha,
                             hinicio: rsv.hinicio,
                                             hfin: rsv.hfin,
                                             estado:'reservado',
                                             tarjeta: rsv.tarjeta,
                                             cliente: cli.email,
                                             cajon: `c-${j}`,
                                             piso: `nivel-${i}`,
                                             auto: { 
                                               modelo:rsv.auto.modelo, 
                                               placas: rsv.auto.placas,
                                               color:rsv.auto.color
                                             }
                               }).then(res => {
                                 this.toastr.success('Agregado con exito','Listo');
                               })

                    })
                    .catch(e => {

                    })
              }
          })
        }
     }
  }

  modificarReservacion(datos){
    return this.db.collection('Reservaciones', ref=> ref.where('cliente', '==', datos.cliente))
  }

  eliminarReservacion(id){

    return this.db.collection('Reservaciones')
                  .doc(id)
                  .get()
                  .forEach(res =>{
                    this.db.collection('Niveles')
                           .doc(res.data().piso)
                           .collection('cajones')
                           .doc(res.data().cajon)
                           .update({
                             estado: 'disponible'
                           })
                           .then(res=>{
                             this.db.collection('Reservaciones')
                                    .doc(id)
                                    .delete()
                                    .then(res=>{
                                      this.toastr.success('Reservacion eliminada con exito','Listo')
                                    })
                           })
                           .catch();
                  })


  }

  getHistorial(data){
    let cli = data.cliente;
    return this.db.collection('Reservaciones', ref=> ref.where('cliente','==',cli.email)
                                                        .where('estado','==','finalizado')).snapshotChanges();
  }
  
  getReservaciones(email){
    return this.db.collection('Reservaciones', ref=> ref.where('cliente', '==', email)
                                                        .where('estado', '==', 'reservado')).snapshotChanges();
  }


  //Admin
  getUsuarios(){
    return this.db.collection('Clientes', ref => ref.where('estado','==','activo')).snapshotChanges();
  }

  getGanancias(){
    return this.db.collection('Reservaciones').snapshotChanges();                
  }

  getCostos(){
    return this.db.collection('Estacionamiento')
                  .doc('Costos')
                  .snapshotChanges();
  }

  loginAdmin(datos){
    return this.db.collection('Estacionamiento')
                  .doc('Administracion')  
                  .collection('Cuentas')
                  .doc('Admin')
                  .get()
                  .forEach( res => {
                    bcrypt.compare(datos.key, res.data().clave,(err,res)=>{
                      if(res){
                        this.auth.logearAdmin(datos.email,datos.key)
                          .then(re => {
                            this.toastr.success('Sesion iniciada con exito', `Bienvenido ${res.data().nombre}`);
                          })
                          .catch(e => {
                            console.log(err);
                           })
                      }
                    })
                  })
  }

  actualizaPrecios(datos){
    return this.db.collection('Estacionamiento')
                  .doc('Costos')
                  .update(datos);
  }
}
  
