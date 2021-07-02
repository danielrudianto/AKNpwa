import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as global from '../global';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(global.url + '/auth/login', {
      "Email": email,
      "Password": password
    });
  }

  setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiration, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getEmail() {
    const decoded: any = jwt_decode(localStorage.getItem("id_token")!.toString());
    return decoded.Email;
  }

  getName() {
    const decoded: any = jwt_decode(localStorage.getItem("id_token")!.toString());
    return decoded.FirstName + " " + decoded.LastName;
  }
}
