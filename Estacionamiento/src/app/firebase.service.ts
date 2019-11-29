import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './services/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  perfilCollection: AngularFirestoreCollection<Cliente>;
  perfil: Observable<Cliente[]>;
  perfilDocument: AngularFirestoreDocument<Cliente>

  constructor(public db: AngularFirestore) { 
    this.perfil = db.collection('Clientes').valueChanges();
  }

  getPerfiles(){
    return this.perfil;
  }

  createUser(value){
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
    return this.db.collection("Clientes", ref => ref.orderBy('user').startAt(value)).snapshotChanges();
    
  }

  testing(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/people').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

}
