import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CodeProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.css']
})
export class MainProjectsComponent implements OnInit {
  projects: CodeProject[] = [];
  isFetching: boolean = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.fetchProject();
  }

  fetchProject() {
    this.isFetching = true;
    this.projectService.getProjects().subscribe(responseData => {
      const projects = responseData as CodeProject[];
      this.projects = projects;
    })
  }

  goToProject(project: CodeProject) {
    this.cookieService.set("projectId", project.Id!.toString());
    this.router.navigate(['/Project/Feed']);
  }

  goToProjectDetail(project: CodeProject) {
    this.cookieService.set("projectId", project.Id!.toString());
    this.router.navigate(['/Project/Detail']);
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

}
