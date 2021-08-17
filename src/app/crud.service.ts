import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  userData:  any;
  constructor(private http: HttpClient) { }
   //add new user
   public adduser(userData)
   {
    //replace /Live/Ionic/IonicCrudAPi/CrudApi/
     return this.http.post('http://localhost/Live/Ionic/IonicCrudAPi/CrudApI/backend/users.php/', userData);
  }
  public createUser(userData)
  {
   //replace /Live/Ionic/IonicCrudAPi/CrudApi/
    return this.http.post('http://localhost/Live/Ionic/IonicCrudAPi/CrudApI/backend/create.php/', userData);
 }
}
