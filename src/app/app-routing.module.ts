import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './project/feed/feed.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ReportComponent } from './report/report.component';
import { AttendanceComponent } from './report/attendance/attendance.component';
import { DailyComponent } from './report/daily/daily.component';
import { ProgressComponent } from './report/progress/progress.component';
import { WeatherComponent } from './report/weather/weather.component';
import { MaterialComponent } from './report/material/material.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { RfiComponent } from './report/rfi/rfi.component';
import { ToolsComponent } from './report/tools/tools.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: MainComponent,
    pathMatch: "full",
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "Project",
    component: ProjectComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: ":projectId",
        component: ProjectDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Detail/:projectId",
        component: ProjectDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Feed/:projectId",
        component: FeedComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: "Report",
    component: ReportComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "Attendance"
      },
      {
        path: "Attendance/:projectId",
        component: AttendanceComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Tool/:projectId",
        component: ToolsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Material/:projectId",
        component: MaterialComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Weather/:projectId",
        component: WeatherComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Rfi/:projectId",
        component: RfiComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Progress/:projectId",
        component: ProgressComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Daily/:projectId",
        component: DailyComponent,
        canActivate: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
