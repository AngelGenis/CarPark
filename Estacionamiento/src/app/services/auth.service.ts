import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import * as $ from 'jquery';
import { ToastrService, ToastRef } from 'ngx-toastr';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { TouchSequence } from 'selenium-webdriver';
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

                $("#Menu1").hide();
                $(".menu-btn").show();
      this.toastr.success('Sesion Iniciada',`Bienvenido: ${res.user.email}`)
      this.router.navigate(['/transicionlog','in']);
    }).catch(e=>{
      this.toastr.error('Error','No se encuentra registrado')
    })

  }

  public async autenticarNuevoUsuario(email, pass){
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
    .then(res => {
      this.verificaEmail();
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
  
  private updateUserData({uid,email,displayName,photoURL,phoneNumber}: User){
    
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

}
