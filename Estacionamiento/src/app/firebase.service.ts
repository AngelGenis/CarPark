import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  createUser(value){
    return this.db.collection('Clientes').add({
      apellido: value.apellido,
      nombre: value.nombre,
      correo: value.correo,
      direccion: value.direccion,
      telefono: value.telefono,
      clave: value.clave,
      cuenta: value.cuenta
    });
  }


}
