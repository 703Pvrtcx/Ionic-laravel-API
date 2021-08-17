import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  registerForm: FormGroup;
  submitted = false;
  constructor( private crudservice: CrudService,
    public route: Router,
    private formBuilder: FormBuilder,
     public alertController: AlertController){}
  //Add user form actions
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Great!!',
      message: 'Added Successfully',
      buttons: ['OK']
    });

    await alert.present();
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
     this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        this.registerForm.reset();
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      // Initialize Params Object
      const myFormData = new FormData();   // Begin assigning parameters
        myFormData.append('username', this.registerForm.value.firstname);
        myFormData.append('email', this.registerForm.value.email);
        myFormData.append('password', this.registerForm.value.password);
        this.crudservice.createUser(myFormData).subscribe((res: Response) => {
          console.log(res);
          console.log(this.registerForm.value);
          this.presentAlert();
        },error =>{
          console.log(error);
        });
      }
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
      //Add User form validations
      this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
    }
    goToWelcome(){
      this.route.navigateByUrl('/');
    }
    goRegisterAdmin(){
      this.route.navigateByUrl('admin');
    }
    goRegisterUser(){
      this.route.navigateByUrl('user');
    }
  }
