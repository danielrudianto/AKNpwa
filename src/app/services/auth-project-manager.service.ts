import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthProjectManager {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.getInfo().Position < 3) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
