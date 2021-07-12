import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeProject, Project } from '../interfaces/project';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToProfile() {
    this.router.navigate(['Profile']);
  }

}
