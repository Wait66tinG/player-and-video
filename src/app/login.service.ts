import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdata } from './video-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private cookieloginURL = 'http://localhost:8000/items/cookie';

  userdata: Userdata = {
    id:0,
    is_active: false,
    name: '',
    email: '',
    item: []
  }

  redirectUrl = '/home'

  constructor(
    private http: HttpClient,
  ) { }
  getLoginStatus(): Observable<Userdata> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    };
    this.http.get<any>(this.cookieloginURL, httpOptions)
    .subscribe(userdata =>{
      this.userdata.is_active = userdata.is_active;
      this.userdata.name = userdata.name;
      this.userdata.email = userdata.email;
      this.userdata.item = userdata.item;
      // console.log('loginservice',this.userdata)
    })
    return this.http.get<any>(this.cookieloginURL, httpOptions)
  }
  logout():void{
    localStorage.removeItem("token");
    this.userdata.is_active = false
  }
  
}
