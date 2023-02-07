import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../entidades/User';
import * as auth from 'firebase/auth'
import { Gogle } from '../entidades/Gogle';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userData: any;

  constructor(
    private afStore: AngularFirestore,
    private authFirebase: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.authFirebase.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  login(correo: string, password: string){
    return this.authFirebase.signInWithEmailAndPassword(correo,password)
  }

  logout(){
    this.authFirebase.signOut()
    //localStorage.removeItem('user')
  }

  registerUser(datos: User){
    return this.authFirebase.createUserWithEmailAndPassword(datos.email,datos.password)
  }

  stateUser(){
    return this.authFirebase.authState
  }

  async getUid(){
    const user = await this.authFirebase.currentUser
    if (user) {
      return user?.uid
    }else{
      return null
    }
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider) {
    return this.authFirebase
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['perfil']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: Gogle = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      perfil: 'cliente'
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
