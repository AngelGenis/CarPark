import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore) { }

  createUser(value){
    return this.db.collection('Clientes').doc(value.correo).set({
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
      // this.db.collection('Clientes')
      //     .valueChanges()
      //     .subscribe( val => {
      //       val.map( e => {
      //         if(e['user'] == usuario && e['clave'] == clave){
      //           return true;
      //         }
      //         console.log(e);
      //       });
      //     });  
      // return false;
      return this.db.collection('Clientes',ref => ref.where('user', '==', usuario)
                                                  .where('clave', '==', clave))
                                                  .snapshotChanges()

      }


  }
