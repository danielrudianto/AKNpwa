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
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    pathMatch: "full",
    canActivate: [AuthGuardService],
    data: { state: 'Main' },
  },
  {
    path: "Login",
    component: LoginComponent,
    data: { state: 'Login' }
  },
  {
    path: "Profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: { state: 'Profile' }
  },
  {
    path: "Project",
    component: ProjectComponent,
    canActivate: [AuthGuardService],
    data: { state: 'Project' },
    children: [
      {
        path: "Detail",
        component: ProjectDetailComponent
      },
      {
        path: "Feed",
        component: FeedComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "**",
        redirectTo:"/"
      }
    ]
  },
  {
    path: "Report",
    component: ReportComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "Attendance",
        component: AttendanceComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Tool",
        component: ToolsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Material",
        component: MaterialComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Weather",
        component: WeatherComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Rfi",
        component: RfiComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Progress",
        component: ProgressComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Daily",
        component: DailyComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Success",
        component: SuccessComponent
      },
      {
        path: "**",
        redirectTo:"/"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
