import { Component, NgZone, OnInit } from '@angular/core';

import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { FormsModule, FormBuilder,FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, ToastController,LoadingController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/05_Services/account/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    
  
  ) {
    this.signInForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6), 
        Validators.required
      ]))
    });
  
  
 
  }
 ngOnInit(){
  
  this.angularFire.authState.subscribe(user =>{
    if(user.uid != null){ 
    this.loadingCtrl.dismiss();
      this.router.navigateByUrl('smart-pass/profile')
    }
    this.loadingCtrl.dismiss();
  })
  }
  async presentLoading() { 
    const loader = this.loadingCtrl.create({
      message: "Signing in....",
    });
    (await loader).present();
  }
  signInWithEmail() {
    this.presentLoading();
    this.authService.SignIn(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      this.loadingCtrl.dismiss();
    })
    .catch(error => {
      this.loadingCtrl.dismiss();
      this.submitError = error.message;
      console.log(error);
    });
  }

  facebookSignIn() {
   
  }

  googleSignIn() {
   
  }

  twitterSignIn() {
     }
}