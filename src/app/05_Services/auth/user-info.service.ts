import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AccountService } from 'src/app/05_Services/account/account.service';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { User } from 'src/app/01_Models/user';
import { SpinnerService } from '../spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  
  constructor(private firestore: AngularFirestore,
    private toastController:ToastController,
    private storage: AngularFireStorage,
    private sp: SpinnerService,
    private accountService: AccountService) { }

  addUser(user:User){
    this.firestore.collection("Profile").doc(user.user_id).set({
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      photoURL: user.photoURL,
      role_id: user.role_id
    }).catch(err=>{
      console.log(err);
    })
  }
  update_user(recordID, user) {
    return this.firestore.doc('Profile/' + recordID).update(user).then(res=>{
      //Successfull update
    }).catch(async error =>{
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })
      toast.present()
    })
  }
  getUserInfo(userID){
    return this.firestore.collection('Profiles', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
  userProfile(book){
    // this.asf.collection('Profiles').add(book).then(() => {
    //   //Successful
    //   alert('Account added successfully');
    // }).catch(err => { 
    //   alert(err.message + ' account was unable to be added!');
    // })
  }
  updateProfile(file) {

    this.sp.isVisible = true;
    
    const filePath = this.accountService.getAccount().getUserInfo().getUserID()
    const ref = this.storage.ref("Profile/" + filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(finalize( () => {
  		ref.getDownloadURL().subscribe(url =>{
        this.firestore.collection("Profile").doc(this.accountService.getAccount().getUserInfo().getUserID()).update({
          photoURL: url,
        }).then(() => {
          this.sp.isVisible = false;
        }).catch(async error => {
          this.sp.isVisible = false;
          let toast = await this.toastController.create({
            message: error.message,
            duration: 3000,
            color: "danger",
          })
    
          toast.present()
        });

      })
  	})).subscribe()	
    
  }
  
}