import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-rfi',
  templateUrl: './rfi.component.html',
  styleUrls: ['./rfi.component.css']
})
export class RfiComponent implements OnInit {
  isSubmitting: boolean = false;
  documentations: any[] = [];

  constructor(
    private route: Router,
    private authService: AuthService,
    private reportService: ReportService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
  ) { }

  rfiForm: FormGroup = new FormGroup({
    Header: new FormControl("", Validators.required),
    AddressedFor: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required)
  })

  removeDocumentation(i: number) {
    this.documentations.splice(i, 1);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.documentations.push(event.target.files[0]);
    }
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.isSubmitting = true;
    const uploadData = new FormData();
    this.documentations.forEach((documentation, index) => {
      uploadData.append("File[" + index + "]", documentation, documentation.name);
    })

    uploadData.append("Header", this.rfiForm.controls.Header.value);
    uploadData.append("AddressedFor", this.rfiForm.controls.AddressedFor.value);
    uploadData.append("Description", this.rfiForm.controls.Description.value);

    uploadData.append("ProjectId", this.cookieService.get("projectId"));
    uploadData.append("Files", this.documentations.length.toString());
    uploadData.append("CreatedBy", this.authService.getEmail());

    this.reportService.submitRFI(uploadData).subscribe(response => {
      this.route.navigate(["/Report/Success"]);
    }, error => {
        this.snackBar.open(error.message, "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000
        });
      this.isSubmitting = false;
    });
  }

  openMediaPicker() {
    document.getElementById("cameraInput")!.click();
  }

}
