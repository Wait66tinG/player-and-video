import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username!: string;
  constructor(
    private router: Router,
    private LoginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.getLoginStatus()
    this.router.navigate(['',{outlets: {popup:['home']}}]);
  }
  getLoginStatus(): void {
    this.LoginService.getLoginStatus()
      .subscribe(heroes => {
        this.username = heroes.name;
        // console.log('in login', heroes);
      });
  }
}
