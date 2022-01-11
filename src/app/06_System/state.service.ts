import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { State } from "./State";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createBooking(state: State) {
  
    
    return this.bookingListRef.push({
      name: state.name,
      value: state.value,
      state: state.state,
      active: state.active
      
    })
  }

  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/state/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/state');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, _state: State) {
    return this.bookingRef.update({
      name: _state.name,
      value: _state.value,
      state: _state.state,
      active: _state.active
    })
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/state/' + id);
    this.bookingRef.remove();
  }
}
