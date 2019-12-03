import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import * as $ from 'jquery';
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  user$: Observable<any>;

  constructor( 
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastr:ToastrService,
    private router:Router
  ){
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>{
        if(user){
          return this.afs.doc<User>(`Clientes/${user.email}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    
  }

  public logearUsuario(email, pass){
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass).then(res=>{
              //   $("#Menu1").hide();
              //   $(".menu-btn").show();
              //   setTimeout(()=>{
              //     $(".menu-btn").addClass('animated');
              //     $(".menu-btn").addClass('heartBeat');
              // },3000)
                this.toastr.success('Sesion Iniciada',`Bienvenido: ${res.user.email}`)
                if(email !== 'admin@carpark.cf'){
                  this.router.navigate(['/transicionlog','in']);
                } else {

           $("#Menu1").hide();
           $("#navcli").hide();
           $("#navadmin").show();
           $(".menu-btnb").show();
                  this.router.navigate(['/transicionlog','admin']);
                }
    }).catch(e=>{
      this.toastr.error('Error','No se encuentra registrado')
    })

  }

  public logearAdmin(email,pass){
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass).then(res=>{
              //   $("#Menu1").hide();
              //   setTimeout(()=>{
              //     $(".menu-btnb").show();
              //     $(".menu-btnb").addClass('animated');
              //     $(".menu-btnb").addClass('heartBeat');
              // },3000)
                this.toastr.success('Sesion Iniciada',`Bienvenido: ${res.user.email}`)
                this.router.navigate(['/transicionlog','admin']);
    }).catch(e=>{
      this.toastr.error('Error','No se encuentra registrado')
    })
  }

  public async autenticarNuevoUsuario(value){
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(value.correo,value.clave)
    .then(res => {
      this.verificaEmail();
      this.createUser(value,'email')
      .then(res => { console.log(res)
      })    
      .catch(res => console.log(res))
      this.updateUserData({uid:res.user.uid, email: value.correo, phoneNumber:value.telefono, displayName: value.nombre + ' ' + value.apellido,photoURL:'none'})
          
    }).catch(e=>{
      console.log(e); //si falla
    })
    
  }
  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.languageCode= 'es';
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential);
    return this.updateUserData(credential.user);
    
  }

  public async googleLogIn() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.languageCode = 'es';
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return credential; 
  }
  
  async signOut(){
    await this.afAuth.auth.signOut();
  }
  
  private async verificaEmail(){
    var user = this.afAuth.auth.currentUser;
    
    await user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
    
  }
  
  public updateUserData({uid,email,displayName,photoURL,phoneNumber}: User){
    
    this.verificaEmail();
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`Clientes/${email}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      phoneNumber
    };

    userRef.update(data);

    return data;
  }

  createUser(value, flag){
    console.log(value);
    let hash = bcrypt.hashSync(value.clave, 8);
    return this.actualizaPagos(value.pagos,value.correo)
      .then(res => {
        console.log(res);
        if(flag === 'google'){
          return this.afs.collection('Clientes').doc(value.correo).update({
            apellido: value.apellido,
            nombre: value.nombre,
            correo: value.correo,
            direccion: value.direccion,
            telefono: value.telefono,
            email:value.correo,
            sexo:value.sexo,
            estado: 'activo',
            clave: hash
          });
        } else if (flag==='email'){

          return this.afs.collection('Clientes').doc(value.correo).set({
            apellido: value.apellido,
            nombre: value.nombre,
            correo: value.correo,
            direccion: value.direccion,
            telefono: value.telefono,
            email:value.correo,
            sexo:value.sexo,
            estado: 'activo',
            clave: hash
          });
        }
      })
      .catch(e=>console.log(e))
  }

  actualizaPagos(pago,email){
    return this.afs.collection('Clientes').doc(email).collection('Pagos').doc(pago.numero).set({
      numero: pago.numero,
      cvv:pago.cvv,
      fecha:pago.expiracion
    });
  }

  actualizaNombre(nombre){
    return this.afAuth.auth.currentUser.updateProfile({displayName:nombre}).then(res => console.log(res)).catch(e => console.log(e));
  }

  deleteUser(){
   return this.afAuth.auth.currentUser.delete(); 
  }
}
