import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    console.log('IsLoggedIn:' + this.authService.token);
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
    }
}
