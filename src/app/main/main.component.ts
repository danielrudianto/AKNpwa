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
  projects: CodeProject[] = [];
  name: string = "";
  isFetching: boolean = false;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.projects.push({
      Id: 1,
      Name: "Logos Metrolink Warehouse 3",
      Address: "Jalan Harapan Mulya",
      CreatedBy: "Daniel Tri",
      CreatedDate: new Date(),
      Document: "PI-AE-",
      Client: {
        Id: 1,
        Name: "Daniel Tri"
      }
    })

    this.fetchProject();

    this.name = this.authService.getName()
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

  fetchProject() {
    this.isFetching = true;
    this.projectService.getProjects().subscribe(responseData => {
      const projects = responseData as CodeProject[];
      this.projects = projects;
    })
  }

  goToProject(project: CodeProject) {
    this.router.navigate(['/Project/Feed/' + project.Id]);
  }

  goToProjectDetail(project: CodeProject) {
    this.router.navigate(['/Project/Detail/' + project.Id]);
  }

}
