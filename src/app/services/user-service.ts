import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { Client } from '../interfaces/client';
import { User, UserPosition } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  updateProfilePicture(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("createdBy", this.authService.getEmail());

    return this.http.post(global.url + "/user/profilePicture", formData)
  }

  getProfilePicture(email: string) {
    return this.http.get(global.url + "/user/profilePicture", {
      params: {
        email: email
      }
    })
  }
}
