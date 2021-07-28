import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { CodeProject } from '../interfaces/project';
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
    return this.http.get(global.url + "/project", {
      params: {
        email: this.authService.getEmail()
      }
    });
  }

  getProjectsByUser() {
    return this.http.get<CodeProject[]>(global.url + "/project?email=" + this.authService.getEmail());
  }
}
