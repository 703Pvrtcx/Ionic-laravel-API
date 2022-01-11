import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';



interface StudentData {
  Name: string;
  Age: number;
  Address: string;
  Role: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    add: boolean = false;
    studentList = [];
    studentData: StudentData;
    // studentForm: FormGroup;
    studentForm: FormGroup;
  
    constructor(
      private firebaseService: FirebaseService,
      public fb: FormBuilder
    ) {
      this.add = false;
      this.studentData = {} as StudentData;
    }
  
    ngOnInit() {
  
      this.studentForm = this.fb.group({
        Name: ['', [Validators.required]],
        Age: ['', [Validators.required]],
        Role: ['', [Validators.required]],
        Address: ['', [Validators.required]]
      })
  
      this.firebaseService.read_students().subscribe(data => {
  
        this.studentList = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['Name'],
            Age: e.payload.doc.data()['Age'],
            Role: e.payload.doc.data()['Role'],
            Address: e.payload.doc.data()['Address'],
          };
        })
        console.log(this.studentList);
  
      });
    }
    addNew(){
      this.add = true;
    }
    cancel(){
      
      this.add = false;
    }
  
    CreateRecord() {
      console.log(this.studentForm.value);
      this.firebaseService.create_student(this.studentForm.value).then(resp => {
        this.studentForm.reset();
      }).then(()=>{
        this.add = false;
      })
        .catch(error => {
          console.log(error);
        });
    }
  
    RemoveRecord(rowID) {
      this.firebaseService.delete_student(rowID);
    }
  
    EditRecord(record) {
      record.isEdit = true;
      record.EditName = record.Name;
      record.EditAge = record.Age;
      record.EditRole = record.Role;
      record.EditAddress = record.Address;
    }
  
    UpdateRecord(recordRow) {
      let record = {};
      record['Name'] = recordRow.EditName;
      record['Age'] = recordRow.EditAge;
      record['Role'] = recordRow.EditRole;
      record['Address'] = recordRow.EditAddress;
      this.firebaseService.update_student(recordRow.id, record);
      recordRow.isEdit = false;
    }
  
  }
  