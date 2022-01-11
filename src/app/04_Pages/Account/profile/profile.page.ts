import { AccountService } from './../../../05_Services/account/account.service';
import { Account } from './../../../01_Models/account.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/01_Models/userInfo';
import { UserInfoService } from 'src/app/05_Services/auth/user-info.service';

import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { StudentClass } from 'src/app/01_Models/student';
import { StudentInfo } from 'src/app/01_Models/student_Info';
import { AuthenticationService } from 'src/app/05_Services/account/authentication.service';
import { User } from 'src/app/01_Models/user';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, PopoverController } from '@ionic/angular';
import { PopoverPage } from '../../popover/popover.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userAccount: UserInfo;
  user = {} as User;
  isEdit : boolean = false;
  submitError: string;
  updateUserForm: FormGroup;

  public now: any = (new Date()).toISOString();
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
    'phone': [
      { type: 'required', message: 'phone number is required.'},
      { type: 'minlength', message: 'Phone number must be 10 numbers long.' },
      { type: 'maxlength', message: 'Phone number must not exceed 10 numbers.' },
      
    ],
    
  };
  
  constructor(
    private userService: UserInfoService,
    private asf: AngularFirestore,
    private auth: AngularFireAuth,
    public router: Router,
    private authService: AuthenticationService,
    private AccountService: AccountService,
    public loadingCtrl: LoadingController,
    public popoverController: PopoverController
    ) {
      this.userAccount = new UserInfo();
      this.setUserAccount(); 
      this.updateUserForm = new FormGroup({
        'firstname': new FormControl('', Validators.compose([
          Validators.required,
        ])),
        'lastname': new FormControl('', Validators.compose([
          Validators.required,
        ])),
        'phone': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]))
      }); 
    }
   
  accessSystem(){
    this.router.navigateByUrl('smart-pass');
  }
  ngOnInit() {
    this.updateUserForm.reset();
    let account = new Account(this.userAccount);
    this.AccountService.setAccount(account);
  }
 async updateForm() {
    if (window.confirm('You are updating!')){
    this.presentLoading();
   await this.userService.update_user(this.AccountService.getAccount().getUserInfo().getUserID(), this.updateUserForm.value)
    .then(() => {
      this.loadingCtrl.dismiss();
      this.isEdit = false;
    })
    .catch(error => {
      this.loadingCtrl.dismiss();
      this.submitError = error.message;
    });
  }
  }
  home(){
    this.router.navigateByUrl('system');
  }
  checkRoles(){
    console.log(
      this.AccountService.getAccount().getUserInfo().getRole());
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 10 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 async setUserAccount(){
    // let userID = firebase.auth().currentUser.uid.toString();
   await this.auth.authState.subscribe(user => {
     
    let userID = user.uid;
    this.asf.collection("Profile").doc(userID).valueChanges().subscribe(data =>{   
      // set student data     
      this.user.user_id = userID;
      this.user.firstname = data["firstname"];
      this.user.lastname =  data["lastname"];
      this.user.phone = data["phone"];
      this.user.gender = data["gender"];
      this.user.email =  data["email"];
      this.user.role_id = data["role_id"];
      this.user.photoURL = data["photoURL"];
      

      this.userAccount.overloadUser(
        this.user.user_id,
        this.user.firstname,
        this.user.lastname,
        this.user.phone,
        this.user.gender,
        this.user.email,
        this.user.role_id,
        this.user.photoURL); 
        
        this.userAccount.setRole(this.user.role_id);  
        let account = new Account(this.userAccount);
        this.AccountService.setAccount(account);
    })
  })
  }
  async presentLoading() { 
    const loader = this.loadingCtrl.create({
      message: "Updating user information....",
    });
    (await loader).present();
  }
  async uploadPhoto(ev){
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  logUserOut(){
    this.authService.SignOut().then(()=>{
      this.auth.signOut().then(()=>{
        this.router.navigateByUrl('');
      })
    })
    // this.auth.signOut();
  }
}
