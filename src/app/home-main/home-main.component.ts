import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  constructor(
    private router: Router,
    private LoginService: LoginService,
  ) { }

  ngOnInit(): void {
  }
  logout():void{
    this.router.navigateByUrl('/login(popup:login)');
    this.LoginService.logout();
  }
}
