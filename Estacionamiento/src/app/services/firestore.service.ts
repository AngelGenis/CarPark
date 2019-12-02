import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import { ActivationEnd } from '@angular/router';
import { exists } from 'fs';

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

  getPerfil(email){
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

  setReservacion(data){
    console.log(data);
    let cli = data.cliente;
    let rsv = data.reservacion;

    console.log(cli);
    console.log(rsv);
    return this.db.collection('Reservaciones')
                  .doc(`${cli.email},${rsv.fecha},${rsv.hinicio}`)
                  .set({
                    fecha: rsv.fecha,
                    hinicio: rsv.hinicio,
                    hfin: rsv.hfin,
                    tarjeta: rsv.tarjeta,
                    cliente: cli.email,
                    auto: { 
                      modelo:rsv.auto.modelo, 
                      placas: rsv.auto.placas,
                      color:rsv.auto.color
                    }
                  });

    
  }
  // actualizaPagos(pago,email){
  //   return this.db.collection('Clientes').doc(email).collection('Pagos').doc(pago.numero).set({
  //     numero: pago.numero,
  //     cvv:pago.cvv,
  //     fecha:pago.expiracion
  //   });
  // }
}
  
