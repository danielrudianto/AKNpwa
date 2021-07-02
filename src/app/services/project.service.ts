import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProjects() {
    return this.http.get(global.url + "/project?email=" + this.authService.getEmail());
  }
}
