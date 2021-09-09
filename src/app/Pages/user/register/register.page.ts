import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form:  FormGroup;
  constructor(private AuthService: AuthenticationService) {}
ngOnInit() {
  this.form =  new FormGroup({
    name : new FormControl(null,[Validators.required]),
    email : new FormControl(null,[Validators.required]),
    password : new FormControl(null,[Validators.required]), 
    password_confirmation : new FormControl(null,[Validators.required]),
  });
  }
  async submitRegister(){
    this.AuthService.register(this.form.value).
      pipe(take(1))
      .subscribe((res)=>{
        console.log("Token: ",res['token']);
        console.log("User: ",res['user']);
        this.form.reset();
    });
  }
}
