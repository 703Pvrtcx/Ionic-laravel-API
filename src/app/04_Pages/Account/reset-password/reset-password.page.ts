import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/05_Services/auth/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }
  reset(email){
    this.authService.ForgotPassword(email).
    then((res)=>{
        
    }).catch((err)=>{
      window.alert(err);
    })
  }
}
