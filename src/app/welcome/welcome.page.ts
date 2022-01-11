import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(public route: Router) { }

  ngOnInit() {
  }
  onClick(){
    this.route.navigateByUrl('user-login');
  }

  goToHome(){
   this.route.navigateByUrl('user-login');
  }
}
