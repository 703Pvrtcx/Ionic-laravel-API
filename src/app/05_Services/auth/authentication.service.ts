import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { User } from 'src/app/01_Models/user';
       
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  user: User;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      } else {
        this.userData = null;
      }
    })
  }
  // Login in with email/password
  SignIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        });
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
      })
  }
  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  // Email verification when new user register
  async SendVerificationMail() {
   return (await this.ngFireAuth.currentUser).sendEmailVerification()
    // return (await this.ngFireAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }
  // Recover password
  ForgotPassword(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
      this.router.navigate(['verify-email']);
   
    }).catch((error) => {
      window.alert(error)
    })
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }
  // Sign in with Gmail
  
  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['profile']);
        })
      // this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }
  // Store user in localStorage
  // SetUserData(user) {
  //   let userID = firebase.auth().currentUser.uid.toString();
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${userID}`);
  //   const userData: User = {
  //     user_id: userID,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //     created_at: user.created_at,
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }
  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.router.navigate(['user-login']);
    })
  }
}