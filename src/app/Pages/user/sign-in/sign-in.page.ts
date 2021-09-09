import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form:  FormGroup;
  constructor(
    private AuthService: AuthenticationService,
    private route: Router,
    public alertController: AlertController,
    private loadingCtrl: LoadingController) {}
  ngOnInit() {
    this.form =  new FormGroup({
        email : new FormControl(null,[Validators.required]),
        password : new FormControl(null,[Validators.required]), 
    });
  }
  async submitLogin(){
    const loading = await this.loadingCtrl.create({message: ' Logging in...'});
    loading.present();
    this.AuthService.login(this.form.value).
      pipe(take(1))
      .subscribe((res)=>{
            console.log('Success ===', res);
             console.log("Token: ",res['token']);
             console.log("User: ",res['user']);
            this.form.reset();
            loading.dismiss();
            this.presentAlert('Great!','Logged in successfully');
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
