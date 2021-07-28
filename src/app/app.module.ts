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
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { MaterialComponent, MaterialEditFormComponent, MaterialFormComponent, MaterialMenuComponent } from './report/material/material.component';
import { ToolFormComponent, ToolsComponent, ToolsMenuComponent } from './report/tools/tools.component';
import { RfiComponent } from './report/rfi/rfi.component';
import { WeatherComponent } from './report/weather/weather.component';
import { AttendanceComponent, AttendanceEditFormComponent, AttendanceFormComponent, AttendanceMenuComponent } from './report/attendance/attendance.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DailyComponent } from './report/daily/daily.component';
import { ProgressComponent } from './report/progress/progress.component';
import { LongPress } from './shared/longpress/longpress';
import { MediaPickerComponent } from './shared/mediaPicker/media-picker';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { MainProjectsComponent } from './main/main-projects/main-projects.component';
import { MainFeedsComponent } from './main/main-feeds/main-feeds.component';

import { CookieService } from 'ngx-cookie-service';
import { SuccessComponent } from './success/success.component';
import { ReportApprovalComponent, ReportApprovalListComponent, ReportCommentListComponent } from './report-approval/report-approval.component';
import { RfiAnswerComponent } from './rfi-answer/rfi-answer.component';
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { ReportApprovalColorPipe } from './pipes/report-approval-color.pipe';
import { ReportApprovalCountPipe } from './pipes/report-approval-count.pipe';
import { ReportApprovalSignedPipe } from './pipes/report-approval-signed.pipe ';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImageViewWrapperDirective } from './image-view-wrapper/image-view-wrapper.directive';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { MatDatepickerModule } from '@angular/material/datepicker';


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
    ToolsMenuComponent,
    MaterialFormComponent,
    MaterialEditFormComponent,
    MaterialMenuComponent,
    LongPress,
    MediaPickerComponent,
    MainHeaderComponent,
    MainProjectsComponent,
    MainFeedsComponent,
    AttendanceEditFormComponent,
    AttendanceMenuComponent,
    SuccessComponent,
    ReportApprovalComponent,
    RfiAnswerComponent,
    ReportCommentComponent,
    ReportApprovalListComponent,
    ReportCommentListComponent,
    ReportApprovalColorPipe,
    ReportApprovalCountPipe,
    ReportApprovalSignedPipe,
    ImageViewComponent,
    ImageViewWrapperDirective,

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
    MatSlideToggleModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    NgImageFullscreenViewModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FeedMenuComponent,
    AttendanceFormComponent,
    ToolFormComponent,
    MaterialFormComponent,
    MaterialEditFormComponent,
    MaterialMenuComponent,
    MediaPickerComponent,
    AttendanceEditFormComponent,
    AttendanceMenuComponent,
    ToolsMenuComponent,
    ReportApprovalListComponent,
    ReportCommentListComponent,
    ImageViewComponent
  ]
})
export class AppModule { }
