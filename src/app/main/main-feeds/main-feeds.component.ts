import { Component, OnInit } from '@angular/core';
import * as global from '../../global';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
} from "swiper/core";
import { Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { CodeProject } from '../../interfaces/project';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-main-feeds',
  templateUrl: './main-feeds.component.html',
  styleUrls: ['./main-feeds.component.css']
})
export class MainFeedsComponent implements OnInit {
  isFetching: boolean = false;
  projects: any[] = [];
  projectsSubscribed: number[] = [];
  feeds: any[] = [];

  global: any = global;

  constructor(
    private feedService: FeedService,
    private authService: AuthService,
    private projectService: ProjectService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.fetchProjects();

    this.socketService.socket.on("newToolReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newMaterialReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newProgressReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newWeatherReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newDailyReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newAttendanceReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      };
    })

    this.socketService.socket.on("newRFI", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })
  }

  fetchProjects() {
    this.isFetching = true;
    this.projectService.getProjectsByUser().subscribe((responseData: CodeProject[]) => {
      this.projects = responseData;
      this.isFetching = false;

      responseData.forEach(x => {
        this.projectsSubscribed.push(x.Id!);
      })

      this.fetchFeeds();
    })
  }

  fetchFeeds() {
    this.feedService.getFeedsByUser().subscribe((responseData: any[]) => {
      responseData.forEach(x => {
        x.ProjectName = this.projects.filter(y => y.Id == x.CodeProjectId)[0].Name;
      })
      this.feeds = responseData;
    })
  }

  viewImage(url: string) {

  }
}
