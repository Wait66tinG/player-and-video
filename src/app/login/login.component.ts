import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isActive = false;

  username!: string;
  constructor(
    private LoginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getLoginStatus();
    this.router.navigate(['', { outlets: { popup: ['login'] } }]);
  }

  getLoginStatus(): void {
    this.LoginService.getLoginStatus()
      .subscribe(heroes => {
        this.username = heroes.name;
        this.isActive = heroes.is_active;
        // console.log('in login', heroes);
      });
  }
}
