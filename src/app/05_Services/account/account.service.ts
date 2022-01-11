import { Injectable } from '@angular/core';
import { Account } from 'src/app/01_Models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 
  private account: Account;

  constructor() {
    this.account = new Account(null);
   }
   public setAccount(account: Account){
     this.account = account;
   }
  public getAccount(){
    return this.account;
  }
}
