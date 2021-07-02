import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { MaterialComponent, MaterialEditFormComponent, MaterialFormComponent } from './report/material/material.component';
import { ToolFormComponent, ToolsComponent } from './report/tools/tools.component';
import { RfiComponent } from './report/rfi/rfi.component';
import { WeatherComponent } from './report/weather/weather.component';
import { AttendanceComponent, AttendanceFormComponent } from './report/attendance/attendance.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeedComponent, FeedMenuComponent } from './project/feed/feed.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { SwiperModule } from 'swiper/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DailyComponent } from './report/daily/daily.component';
import { ProgressComponent } from './report/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    ProjectComponent,
    LoginComponent,
    ReportComponent,
    MaterialComponent,
    ToolsComponent,
    RfiComponent,
    WeatherComponent,
    AttendanceComponent,
    FeedComponent,
    ProjectDetailComponent,
    ToolbarComponent,
    FeedMenuComponent,
    DailyComponent,
    ProgressComponent,
    AttendanceFormComponent,
    ToolFormComponent,
    MaterialFormComponent,
    MaterialEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    SwiperModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FeedMenuComponent,
    AttendanceFormComponent,
    ToolFormComponent,
    MaterialFormComponent,
    MaterialEditFormComponent
  ]
})
export class AppModule { }
