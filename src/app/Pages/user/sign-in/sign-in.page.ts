import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form:  FormGroup;
  constructor(
    private AuthService: AuthenticationService,
    private route: Router) {}
ngOnInit() {
  this.form =  new FormGroup({
    email : new FormControl("01email@gmail.com",[Validators.required]),
    password : new FormControl("password",[Validators.required]), 
  });
  }
  async submitLogin(){
    this.AuthService.login(this.form.value).
      pipe(take(1))
      .subscribe((res)=>{
            console.log('Success ===', res);
             console.log("Token: ",res['token']);
             console.log("User: ",res['user']);
            this.form.reset();
        },error =>{
             console.log('Error === Error 1',error.error['message']);
       });
  }

}
