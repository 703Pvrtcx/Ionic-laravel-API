import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RequestRole } from '../01_Models/requestRole';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
// firebase.service.ts

  editProduct: boolean;
  collectionName = 'User_Requests';

  constructor(
    private firestore: AngularFirestore,
  ) { }
  create_employee(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }
  read_employee(userID) {
    return this.firestore.collection(this.collectionName, ref => ref.where('user_id','==', userID)).snapshotChanges();
  }
  read_employees() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  update_employee(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }
  delete_employee(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
  newRequest(request:RequestRole){
    this.firestore.collection(this.collectionName).doc(request.user_id).set({
      user_id: request.user_id,
      firstname: request.firstname,
      role_id: request.role_id,
      newRole_id: request.newRole_id,
      created_at: request.created_at,
      updated_at: request.updated_at,
    }).then(()=>{
      console.log(request);
      
    })
    .catch(err=>{
      console.log(err);
    }) 
}
}