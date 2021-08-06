import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FileSaverService } from 'ngx-filesaver';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  isSubmitting: boolean = false;
  date: FormControl = new FormControl(null, Validators.required)

  constructor(
    private reportService: ReportService,
    private _FileSaverService: FileSaverService,
    private router: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  downloadReport() {
    if (this.date.value != null) {
      this.isSubmitting = true;
      this.reportService.downloadDailyReport(this.date.value, parseInt(this.cookieService.get("projectId"))).subscribe(data => {
        this.isSubmitting = false;
        this._FileSaverService.save((<any>data), "Daily Report.pdf");
      }, error => {
          this.isSubmitting = false;
      })
    }
    
  }

}
