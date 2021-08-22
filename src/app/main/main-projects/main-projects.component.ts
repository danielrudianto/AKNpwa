import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CodeProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { SocketService } from '../../services/socket.service';

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
    private cookieService: CookieService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.fetchProject();

    this.socketService.socket.on("newProject", (data: any) => {
      this.fetchProject();
    })
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
    300: { slidesPerView: 1.2, spaceBetween: 10 },
    640: { slidesPerView: 2.3, spaceBetween: 20 },
  };

}
