import { StateService } from './../state.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-state',
  templateUrl: './make-state.page.html',
  styleUrls: ['./make-state.page.scss'],
})
export class MakeStatePage implements OnInit {

  bookingForm: FormGroup;

  constructor(
    private stateService: StateService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      value: [''],
      state: [''],
      active: [''],
      
    })
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.stateService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        
        this.router.navigateByUrl('smart-pass/devices')
      })
        .catch(error => console.log(error));
    }
  }
}