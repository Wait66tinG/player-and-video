import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User, Userdata } from '../video-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.css']
})

export class LoginMainComponent implements OnInit {
  isActive = false

  token!: string | null

  // user: User = {
  //   id: 0,
  //   name: '',
  //   email: '',
  //   item: [],
  // }

  private userlogin = 'http://localhost:8000/users/login';

  userdata: Userdata = {
    id:0,
    is_active: false,
    name: '',
    email: '',
    item: []
  }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private LoginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.cookielogin()
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (!this.email?.errors && !this.password?.errors) {
      this.http.post<any>(this.userlogin,
        { "email": this.loginForm.value.email, "password": this.loginForm.value.password })
        .subscribe(rawdata => {
          
          // console.log('123', rawdata, this.isActive);
          localStorage.setItem("token", rawdata.token);
          this.cookielogin()
          
        });
    }
  }
  cookielogin(): void {
    this.LoginService.getLoginStatus()
      .subscribe(userdata => {
        this.userdata.id = userdata.id;
        // this.isActive = userdata.is_active;
        this.userdata.is_active = userdata.is_active;
        this.userdata.name = userdata.name;
        this.userdata.email = userdata.email;
        this.userdata.item = userdata.item;
        this.router.navigateByUrl('/home');
      })
  }
}
