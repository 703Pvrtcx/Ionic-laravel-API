import { UserInfo } from './../../01_Models/userInfo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/05_Services/account/authentication.service';
import { UserInfoService } from 'src/app/05_Services/auth/user-info.service';
import { AccountService } from 'src/app/05_Services/account/account.service';
import { User } from 'src/app/01_Models/user';
import { Account } from 'src/app/01_Models/account.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-smart-pass',
  templateUrl: './smart-pass.page.html',
  styleUrls: ['./smart-pass.page.scss'],
})
export class SmartPassPage implements OnInit {
  userAccount: UserInfo;
  user = {} as User;
  constructor(  private userService: UserInfoService,
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
  }

  ngOnInit() {
    // this.auth.authState.subscribe(user => {
    //   if(user.emailVerified===false){
    //     this.router.navigateByUrl('user-login')
    //   }
    // })
  }
  outSystem(){
    this.router.navigateByUrl('');
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

  
  

}
