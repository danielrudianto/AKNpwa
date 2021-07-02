import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker, WorkerReportForm } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  workers: Worker[] = [];
  attendingWorkers: Worker[] = [];
  isSubmitting: boolean = false;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.reportService.fetchTodayWorker(this.router.snapshot.params.projectId).subscribe(responseData => {
      const response = responseData as Worker[];
      this.attendingWorkers = response;
    })
  }

  openAddAttendanceForm() {
    const dialog = this.dialog.open(AttendanceFormComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data.name != undefined && data.quantity != undefined) {
        this.workers.push({
          Name: data.name,
          Quantity: data.quantity
        })
      }
    })
  }

  addAttendance() {
    this.isSubmitting = true;
    const workerReportForm: WorkerReportForm = {
      CreatedBy: this.authService.getEmail(),
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      Workers: this.workers
    }
    this.reportService.submitWorkerReport(workerReportForm)
      .subscribe(responseData => {
        this.workers = [];
        this.route.navigate(["/Project/Feed/" + this.router.snapshot.params.projectId.toString()]);
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

@Component({
  selector: 'attendance-form',
  templateUrl: 'attendance-form.html'
})
export class AttendanceFormComponent {
  constructor(
    public dialogRef: MatDialogRef<AttendanceFormComponent>
  ) { }

  attendanceForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  submitForm() {
    this.dialogRef.close({
      name: this.attendanceForm.controls.name.value,
      quantity: parseInt(this.attendanceForm.controls.quantity.value)
    })
  }
}
