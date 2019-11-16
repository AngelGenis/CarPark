import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';


import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  user$: Observable<any>;

  constructor( 
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ){
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>{
        if(user){
          return this.afs.doc<User>(`Clientes/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    
  }

  public async logearUsuario(email, pass){
    const res = await this.afAuth.auth.signInWithEmailAndPassword(email,pass).then(res=>{
    }).catch(e=>{
      console.log(e); //si falla
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

    userRef.set(data, {merge:true});

    return data;
  }

}
