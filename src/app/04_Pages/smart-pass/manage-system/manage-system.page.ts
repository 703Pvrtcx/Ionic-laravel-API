import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-manage-system',
  templateUrl: './manage-system.page.html',
  styleUrls: ['./manage-system.page.scss'],
})
export class ManageSystemPage implements OnInit {
  tempState: boolean;
 
  item: Observable<any>;
  active: Observable<any>;
  constructor(public db: AngularFireDatabase) { 
  
    this.tempState = false;

    this.item = db.object('item').valueChanges();
    console.log(this.item);
    this.active = db.object('active').valueChanges();
    console.log(this.active);
    this.deactivate();
  }

  ngOnInit() {
    console.log(this.tempState); 
  }
  activate(){
    const itemRef = this.db.object('active');
    itemRef.set({ name: 'online'});
  }
  deactivate(){
    const itemRef = this.db.object('active');
    itemRef.set({ name: 'offline'});
  }
  changeState(){
    if(this.tempState==true){
      this.tempState = false;
      this.deactivate();
    }
    else{
      this.tempState = true;
      this.activate();
    }  
    console.log(this.tempState);
  }
}
