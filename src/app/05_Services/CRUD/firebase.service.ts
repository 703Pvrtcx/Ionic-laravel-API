// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  editProduct: boolean;
  collectionName = 'Profile';

  constructor(
    private firestore: AngularFirestore
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
}
