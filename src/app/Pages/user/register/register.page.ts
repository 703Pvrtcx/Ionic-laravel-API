import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form:  FormGroup;
  constructor(
    public alertController: AlertController,
    private AuthService: AuthenticationService,
    private route: Router,
    private loadingCtrl: LoadingController) {}

ngOnInit() {
  this.form =  new FormGroup({
    name : new FormControl("Name",[Validators.required]),
    email : new FormControl("01email@gmail.com",[Validators.required]),
    password : new FormControl("password",[Validators.required]), 
    password_confirmation : new FormControl("password1",[Validators.required]),
  });
  }
  async submitRegister(){
    const loading = await this.loadingCtrl.create({message: ' Signing up...'});
    loading.present();
    this.AuthService.register(this.form.value).
      pipe(take(1))
      .subscribe((res)=>{
        console.log('Success ===', res);
        console.log("Token: ",res['token']);
        console.log("User: ",res['user']);
        this.form.reset();
        loading.dismiss();
        this.presentAlert('Great!','Account created successfully');  
        this.route.navigateByUrl('sign-in');
    },error =>{
         this.form.reset();
        loading.dismiss();
        this.presentAlert('Oops, something went wrong!',error.error['message']);
      });
  }

  async presentAlert(header,message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

 


}
