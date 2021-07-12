import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import SwiperCore, {
  Navigation,
  Pagination,
} from "swiper/core";
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

SwiperCore.use([
  Navigation,
  Pagination,
]);

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  isSubmitting: boolean = false;
  constructor(
    private reportService: ReportService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  backToProject() {
    this.route.navigate(["/Project/Feed/" + this.router.snapshot.params.projectId])
  }

  selectedWeather: number = 0;
  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 1, spaceBetween: 40 },
    1024: { slidesPerView: 1, spaceBetween: 50 }
  };

  submitForm() {
    this.isSubmitting = true;
    this.reportService.submitWeatherReport({
      WeatherId: this.selectedWeather,
      CodeProjectId: parseInt(this.cookieService.get("projectId")),
      CreatedBy: this.authService.getEmail()
    }).subscribe(responseData => {
      this.isSubmitting = false;
      this.route.navigate(["/Project/Feed"]);
    }, error => {
      this.isSubmitting = false;
      this.snackBar.open("Close", error.message, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 2000
      })
    })
  }

}
