import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore) { }

  createUser(value){
//Consultarla coleccion Clientes, el documento con la llave value.user y escribir los siguientes pares de datos
    return this.db.collection('Clientes').doc(value.user).set({
      apellido: value.apellido,
      nombre: value.nombre,
      correo: value.correo,
      direccion: value.direccion,
      telefono: value.telefono,
      clave: value.clave,
      cuenta: value.cuenta
    });
  }

  logearUsuario(value, pass){
    //Vonsultar la coleccion clientes, ordenara
    return this.db.collection("Clientes", ref => ref.orderBy('user').startAt(value)).snapshotChanges();
    
  }

  testLogin(usuario, clave){
    let test = this.db.collection('users',ref => ref.where('uid','==',usuario)
                                         .where('clave','==',clave));

    console.log(test);
  }
}
