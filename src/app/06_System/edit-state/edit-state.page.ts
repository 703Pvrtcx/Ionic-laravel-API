import { StateService } from './../state.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.page.html',
  styleUrls: ['./edit-state.page.scss'],
})
export class EditStatePage implements OnInit {

  updateBookingForm: FormGroup;
  stateForm: FormGroup;
  activeForm: FormGroup;
  valueForm: FormGroup;
  id: any;
  constructor(
    private aptService: StateService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getBooking(this.id).valueChanges().subscribe(res => {
        this.updateBookingForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateBookingForm = this.fb.group({
      name: [''],
      value: [''],
      state: [''],
      active: [''],
    })
    
    // console.log(this.updateBookingForm.value)
  }

  updateForm() {
    this.aptService.updateBooking(this.id, this.updateBookingForm.value)
      .then(() => {
        this.router.navigateByUrl('smart-pass/devices')
      })
      .catch(error => console.log(error));
  }
 
}