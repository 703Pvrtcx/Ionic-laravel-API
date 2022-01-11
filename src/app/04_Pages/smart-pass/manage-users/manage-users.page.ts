import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserInfoService } from 'src/app/05_Services/auth/user-info.service';
import { FirebaseService } from './../../../05_Services/CRUD/firebase.service';

interface StudentData {
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  role_id:string;
  user_id:string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  studentList = [];
  studentData: StudentData;
  // studentForm: FormGroup;
  studentForm: FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    public fb: FormBuilder,
    private modalCtrl: ModalController,
    public userService: UserInfoService, 
    private loadingCtrl: LoadingController,
  ) {
    this.studentData = {} as StudentData;
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...'
     });

    this.studentForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      
    })
    loading.present();
    this.firebaseService.read_employees().subscribe(data => {

      this.studentList = data.map(e => {
       
        loading.dismiss();
        return {
          id: e.payload.doc.id,
          isEdit: false,
          firstname: e.payload.doc.data()['firstname'],
          lastname: e.payload.doc.data()['lastname'],
          email: e.payload.doc.data()['email'],
          phone: e.payload.doc.data()['phone'],
          gender: e.payload.doc.data()['gender'],
          photoURL: e.payload.doc.data()['photoURL'],
          role_id: e.payload.doc.data()['role_id'],
          user_id: e.payload.doc.data()['user_id'],
          
        };
      })
      
      loading.dismiss();
      console.log(this.studentList);

    });
  }

  CreateRecord() {
    console.log(this.studentForm.value);
    this.firebaseService.create_employee(this.studentForm.value).then(resp => {
      this.studentForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_employee(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.editFirstname = record.firstname;
    record.editLastname = record.lastname;
    record.editPhone = record.phone;
    record.editRole = record.role_id;
    record.editGender = record.gender;
    record.editId = record.user_id;
    record.editPhoto = record.phoneURL;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['firstname'] = recordRow.editFirstname;
    record['lastname'] = recordRow.editLastname;
    record['phone'] = recordRow.editPhone;
    record['role_id'] = recordRow.editRole;
    record['gender'] = recordRow.editGender;
    this.firebaseService.update_employee(recordRow.user_id, record);
    this.userService.update_user(recordRow.user_id,record)
    recordRow.isEdit = false;
  }

}
