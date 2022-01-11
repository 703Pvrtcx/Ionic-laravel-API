import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/05_Services/auth/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }
  async resendMail(){
    await this.authService.SendVerificationMail().then(()=>{
      window.alert("Please check your email to verify your account");
      this.authService.SignOut();
    }).catch(err=>{
      window.alert("Oops, something went wrong");       
    })
  }

}
