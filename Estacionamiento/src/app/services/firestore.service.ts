import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore,
              ) { 
              }

  createUser(value, flag){
    let hash = bcrypt.hashSync(value.clave, 8);

    if(flag === 'google'){
      return this.db.collection('Clientes').doc(value.correo).update({
        apellido: value.apellido,
        nombre: value.nombre,
        correo: value.correo,
        direccion: value.direccion,
        telefono: value.telefono,
        clave: hash,
        cuenta: value.cuenta
      });
    } else if (flag==='email'){

      return this.db.collection('Clientes').doc(value.correo).set({
        apellido: value.apellido,
        nombre: value.nombre,
        correo: value.correo,
        direccion: value.direccion,
        telefono: value.telefono,
        clave: hash,
        cuenta: value.cuenta,
        displayName: value.displayName
      });
    }
  }

  logearUsuario(value, pass){
    //Vonsultar la coleccion clientes, ordenara
    return this.db.collection("Clientes", ref => ref.orderBy('').startAt(value)).snapshotChanges();
    
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

    //    agregarTablas(){
    //     let i = 1;
    //     let str = 'c-'
    //     let datos = {};

    //     while(i <= 60){
    //       datos[str+i] = { estado: 'disponible' }
          
    //       // capacidad:60,
    //       // disponibles:60,
    //       // ocupados:0,
    //     }

    //   return this.db.collection('Niveles/nivel-1/cajones').doc('kek').set(datos);
    // }


    }
