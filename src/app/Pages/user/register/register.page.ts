import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form:  FormGroup;
  constructor(private AuthService: AuthenticationService) {}
ngOnInit() {
 
  }

}
