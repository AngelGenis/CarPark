import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import { ActivationEnd } from '@angular/router';

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
      
    this.db.collection('Clientes').doc(email).collection('Autos',ref => ref.where('estado', '==','activo')).snapshotChanges().subscribe(  res => {
      if(res.length > 3){
        this.toastr.warning('El limite de autos es 3.', 'Limite alcanzado');
        return 0;
      }
      else {
        let docRef =  this.db.firestore.doc(`Clientes/${email}/Autos/${auto.modelo}`);

        docRef.get()
              .then(res => {
                if(res.exists){
                  return this.db.collection('Clientes').doc(email).collection('Autos').doc(auto.modelo).update({
                    estado: 'activo'
                  }).then(res=>{
                  this.toastr.success('Auto registrado con exito','Listo');
                  }).catch(e => {
                    console.log(e);
                  }).finally(()=>{

                  })
                } else { 
                  return this.db.collection('Clientes').doc(email).collection('Autos').doc(auto.modelo).set({
                    estado: 'activo',
                    modelo:auto.modelo,
                    placas: auto.placas,
                    color: auto.color
                  }).then(res=>{
                    console.log("succ",res);
                    this.toastr.success('Auto registrado con exito','Listo');
                  }).catch(e=>{
                    console.log(e);
                  }).finally(()=>{
                    
                  })
                }
              })
              .catch(e => {

              })
              .finally(()=>{

              })
        }});
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
  // actualizaPagos(pago,email){
  //   return this.db.collection('Clientes').doc(email).collection('Pagos').doc(pago.numero).set({
  //     numero: pago.numero,
  //     cvv:pago.cvv,
  //     fecha:pago.expiracion
  //   });
  // }
}
  
