import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User, Userdata } from '../video-data';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

export function forbiddenNameValidator(self: SignUpComponent): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value == self.signupForm?.get('password')?.value;
    // console.log(self.signupForm?.get('password')?.errors)
    return !forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  private createuser = 'http://localhost:8000/users/';
  // firstpassword = '123456';
  private userlogin = 'http://localhost:8000/users/login';
  userdata: Userdata = {
    id:0,
    is_active: false,
    name: '',
    email: '',
    item: []
  }

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    passwordagain: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      forbiddenNameValidator(this)
    ]),
  });

  // forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
  //   console.log(this)
  //   const forbidden = 1
  //   // (this.firstpassword == control.value)
  //   return !forbidden ? { forbiddenName: { value: control.value } } : null;
  // }


  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get name() { return this.signupForm.get('name'); }
  get passwordagain() { return this.signupForm.get('passwordagain'); }

  onSubmit() {
    // console.warn(this.email?.errors);
    if (!this.email?.errors && !this.password?.errors && !this.name?.errors && !this.passwordagain?.errors) {
      this.http.post<any>(this.createuser,
        {
          "email": this.signupForm.value.email,
          "name": this.signupForm.value.name,
          "password": this.signupForm.value.password
        })
        .subscribe(rawdata => {
          this.http.post<any>(this.userlogin,
            { "email": this.signupForm.value.email, "password": this.signupForm.value.password })
            .subscribe(rawdata => {

              // console.log('123', rawdata, this.isActive);
              localStorage.setItem("token", rawdata.token);
              this.cookielogin()
            });
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

  constructor(
    private LoginService: LoginService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  // postUser(): void {
  //   if (this.user.name && this.user.email && this.user.password) {
  //     this.http.post<any>(this.createuser,
  //       { "email": this.user.email, "name": this.user.name, "password": this.user.password })
  //       .subscribe(rawdata => {
  //         console.log(rawdata,rawdata.detail)
  //       });
  //   }
  //   else {
  //     console.log("有未填或填错项", this.user)
  //   }
  // }
}
