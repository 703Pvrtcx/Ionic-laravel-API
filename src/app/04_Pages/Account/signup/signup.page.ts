import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/05_Services/account/authentication.service';
import { UserInfoService } from 'src/app/05_Services/auth/user-info.service';
import { UserInfo } from "src/app/01_Models/userInfo";
import { User } from 'src/app/01_Models/user';
  

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public now: any = (new Date()).toISOString();

  user = {} as User;
  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First name is required.' },
     // { type: 'pattern', message: 'Name must not contain speacial characters or number' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' },
     // { type: 'pattern', message: 'Name must not contain speacial characters or number' }
    ],
    'gender': [
      { type: 'required', message: 'gender is required.' },
    ],
    'role': [
      { type: 'required', message: 'role is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone number is required.'},
      { type: 'minlength', message: 'Phone number must be 10 numbers long.' },
      { type: 'maxlength', message: 'Phone number must not exceed 10 numbers.' },
      
    ],
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
    public authService: AuthenticationService,private asf: AngularFirestore,
    public angularFire: AngularFireAuth,
    public router: Router, private userDetails: UserInfoService,
     public loadingCtrl: LoadingController,
  ) { 
    this.signUpForm = new FormGroup({
      
      'firstname': new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[a-zA-Z]')
      ])),
      'lastname': new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[a-zA-Z]')
      ])),
      'gender': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'role': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      
      'phone': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
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
  ngOnInit() {
    this.signUpForm.reset();
  }
async presentLoading() {
  const loader = this.loadingCtrl.create({
    message: "Signing up....",
  });
  (await loader).present();
}
  async signUpWithEmail() {
  this.presentLoading();
 await this.authService.RegisterUser(this.signUpForm.value['email'], this.signUpForm.value['password'])
  .then(user => {
        let me = this.angularFire.currentUser.then((m)=>{
            this.user.user_id = m.uid; 
            this.user.firstname = this.signUpForm.value['firstname'];
            this.user.lastname =  this.signUpForm.value['lastname'];
            this.user.email = this.signUpForm.value['email'];
            this.user.gender = this.signUpForm.value['gender'],
            this.user.phone = this.signUpForm.value['phone'],
            this.user.role_id = this.signUpForm.value['role'],
            this.user.photoURL = "gs://i703-partco.appspot.com/dp.png"
            this.userDetails.addUser(this.user);
    })
    this.loadingCtrl.dismiss();
  })
  .catch(error => {
    this.submitError = error.message;
    this.loadingCtrl.dismiss();
  });
}
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 10 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}
