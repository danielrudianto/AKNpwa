import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { MediaPickerComponent } from '../../shared/mediaPicker/media-picker';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  isSubmitting: boolean = false;
  documentations: any[] = [];
  progress: string = "";

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private sheet: MatBottomSheet,
    private reportService: ReportService,
    private cookieService: CookieService,
    private authService: AuthService,
    private snack: MatSnackBar
  ) { }

  backToProject() {
    this.route.navigate(["/Project/Feed/" + this.router.snapshot.params.projectId]);
  }

  openMediaPicker() {
    document.getElementById("cameraInput")!.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files[0] as File;
    this.documentations.push(files as File);
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

  ngOnInit(): void {
  }

  submitForm() {
    const uploadData = new FormData();
    let processedItems = 0;
    this.isSubmitting = true;

    if (this.documentations.length > 0) {
      this.documentations.forEach((documentation, index) => {
        imageCompression(documentation, {
          maxWidthOrHeight: 640
        }).then(compressed => {
          uploadData.append("file[" + index + "]", compressed, documentation.name);
          processedItems++;

          if (processedItems == this.documentations.length) {
            uploadData.append("Progress", this.progress);
            uploadData.append("ProjectId", this.cookieService.get("projectId"));
            uploadData.append("Files", this.documentations.length.toString());
            uploadData.append("CreatedBy", this.authService.getEmail());

            this.reportService.submitProgressReport(uploadData).subscribe(response => {
              this.route.navigate(["/Report/Success"]);
            }, error => {
              this.snack.open(error.message, "Close", {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 2000
              });
              this.isSubmitting = false;
            });
          }
        })

      })
    } else {
      uploadData.append("Progress", this.progress);
      uploadData.append("ProjectId", this.cookieService.get("projectId"));
      uploadData.append("Files", this.documentations.length.toString());
      uploadData.append("CreatedBy", this.authService.getEmail());

      this.reportService.submitProgressReport(uploadData).subscribe(response => {
        this.route.navigate(["/Report/Success"]);
      }, error => {
        this.snack.open(error.message, "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000
        });
        this.isSubmitting = false;
      });
    }
  }

}
