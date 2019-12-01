import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/firestore';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore,
              ) { 
              }

  createUser(value, flag){
    console.log(value);
    let hash = bcrypt.hashSync(value.clave, 8);
    return this.actualizaPagos(value.pagos,value.correo)
      .then(res => {
        console.log(res);
        if(flag === 'google'){
          return this.db.collection('Clientes').doc(value.correo).update({
            apellido: value.apellido,
            nombre: value.nombre,
            correo: value.correo,
            direccion: value.direccion,
            telefono: value.telefono,
            email:value.correo,
            clave: hash
          });
        } else if (flag==='email'){
    
          return this.db.collection('Clientes').doc(value.correo).set({
            apellido: value.apellido,
            nombre: value.nombre,
            correo: value.correo,
            direccion: value.direccion,
            telefono: value.telefono,
            email:value.correo,
            clave: hash
            // displayName: value.displayName,
          });
        }
      })
      .catch(e=>console.log(e))
  }

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
    return this.db.collection('Clientes').doc(email).collection('Autos').doc(auto.modelo).set({
      modelo:auto.modelo,
      placas: auto.placas,
      color: auto.color
    })
  }

  getAutos(email){
    return this.db.collection('Clientes').doc(email).collection('Autos').snapshotChanges();
  }

  getPagos(email){
    return this.db.collection('Clientes').doc(email).collection('Pagos').snapshotChanges();
  }
  actualizaPagos(pago,email){
    return this.db.collection('Clientes').doc(email).collection('Pagos').doc(pago.numero).set({
      numero: pago.numero,
      cvv:pago.cvv,
      fecha:pago.expiracion
    });
  }
}
  
