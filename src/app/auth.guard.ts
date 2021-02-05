import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): true|UrlTree {
    if (this.LoginService.userdata.is_active) { 
      // console.log("guard",this.LoginService.userdata.is_active);
      return true; }

    // Store the attempted URL for redirecting
    this.LoginService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl("/login(popup:login)");
  }
}
