import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/01_Models/userInfo';
import { UserInfoService } from 'src/app/05_Services/auth/user-info.service';
import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { StudentClass } from 'src/app/01_Models/student';
import { StudentInfo } from 'src/app/01_Models/student_Info';
import { AuthenticationService } from 'src/app/05_Services/account/authentication.service';
import { User } from 'src/app/01_Models/user';
import { AccountService } from 'src/app/05_Services/account/account.service';
import { Account } from 'src/app/01_Models/account.model';
import { Router } from '@angular/router';
import { RequestRole } from 'src/app/01_Models/requestRole';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { RequestService } from 'src/app/05_Services/request.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  userAccount: UserInfo;
  user = {} as User;
  userTemp = {} as User;
  requestForm: FormGroup;
  requestList = [];
  requestData: RequestRole;

  constructor(
    private asf: AngularFirestore,
    private auth: AngularFireAuth,
    public router: Router,
    public fb: FormBuilder,
    public requestService: RequestService,
    private authService: AuthenticationService,
    public userService: UserInfoService,
    private AccountService: AccountService,) { 
    this.userAccount = new UserInfo();
  
    this.requestData = {} as RequestRole;
    this.setUserAccount();
  }

  ngOnInit() {

    this.requestService.read_employees().subscribe(data=>{
      this.requestList =data.map(e=>{
    return{
      user_id: e.payload.doc.id,
      firstname: e.payload.doc.data()['firstname'],
      role_id: e.payload.doc.data()['role_id'],
      newRole_id: e.payload.doc.data()['newRole_id'],
      created_at: e.payload.doc.data()['created_at'],
      updated_at: e.payload.doc.data()['updated_at'],
    }
    })
    console.log(this.requestList);
  })


    console.log(this.userAccount);
    
    let account = new Account(this.userAccount);
    this.AccountService.setAccount(account);
    this.requestForm = this.fb.group({
      newRequest: ['', [Validators.required]],
    })
    console.log(
      this.userAccount.getUserID());
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
async makeRequest(){
  await this.auth.authState.subscribe(user => {
      let userID = user.uid;
      let request = new RequestRole();
      request.user_id = userID;
      request.firstname = this.userAccount.getFirstname();
      request.role_id = this.userAccount.getRole();
      request.newRole_id = this.requestForm.value['newRequest'];
      request.created_at = new Date().toDateString();
      request.updated_at = new Date().toDateString();
      this.requestService.newRequest(request);
  })
}

approve(item){
  this.asf.collection("Profile").doc(item.user_id).valueChanges().subscribe(data =>{   
    // set student data     
    this.userTemp.user_id = item.user_id;
    this.userTemp.firstname = data["firstname"];
    this.userTemp.lastname =  data["lastname"];
    this.userTemp.phone = data["phone"];
    this.userTemp.gender = data["gender"];
    this.userTemp.email =  data["email"];
    this.userTemp.role_id = item.newRole_id;
    this.userTemp.photoURL = data["photoURL"];
    this.userService.update_user(item.user_id,this.userTemp).then(res=>{
      console.log(res);
      this.decline(item.user_id);
    });
  })
    console.log(item.user_id);
  }
  decline(id){
    this.requestService.delete_employee(id)
  }
}