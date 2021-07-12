import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  attendingWorkers: any[] = [];
  isSubmitting: boolean = false;
  step: number = 1;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router,
    private sheet: MatBottomSheet,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.reportService.fetchTodayWorker(parseInt(this.cookieService.get("projectId"))).subscribe(responseData => {
      const response = responseData as any[];
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
      CodeProjectId: parseInt(this.cookieService.get("projectId")),
      Workers: this.workers
    }
    this.reportService.submitWorkerReport(workerReportForm)
      .subscribe(responseData => {
        this.workers = [];
        this.route.navigate(["/Project/Feed"]);
      }, error => {
          this.isSubmitting = false;
          this.snackBar.open(error.message, "Close", {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 2000
          })
      })
  }

  onLongPress(worker: Worker) {
    const sheet = this.sheet.open(AttendanceMenuComponent, {
      disableClose: true,
      data: worker
    });

    sheet.afterDismissed().subscribe(data => {
      if (data == "edit") {
        const dialog = this.dialog.open(AttendanceEditFormComponent, {
          data: worker,
          disableClose: true
        })

        dialog.afterClosed().subscribe(edit => {
          console.log(edit);
          this.workers[this.workers.indexOf(worker)].Name = edit.Name;
          this.workers[this.workers.indexOf(worker)].Quantity = edit.Quantity;
        })
      } else if (data == "delete") {
        this.workers.splice(this.workers.indexOf(worker), 1);
      }
    })
  }

  next() {
    this.step = 2;
  }

  prev() {
    this.step = 1;
  }
}

@Component({
  selector: 'attendance-form',
  templateUrl: 'attendance-form.html'
})
export class AttendanceFormComponent {
  constructor(
    public dialogRef: MatDialogRef<AttendanceMenuComponent>
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

@Component({
  selector: 'attendance-menu',
  templateUrl: 'attendance-menu.html'
})
export class AttendanceMenuComponent {
  constructor(
    public sheetRef: MatBottomSheetRef<AttendanceMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Worker
  ) { }

  onEditItem() {
    this.sheetRef.dismiss("edit");
  }

  onDeleteItem() {
    this.sheetRef.dismiss("delete");
  }

  onCloseMenu() {
    this.sheetRef.dismiss(null);
  }
}

@Component({
  selector: 'attendance-edit-form',
  templateUrl: 'attendance-edit-form.html'
})
export class AttendanceEditFormComponent {
  constructor(
    private dialogRef: MatDialogRef<AttendanceEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Worker
  ) { }

  attendanceForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.Name, Validators.required),
    quantity: new FormControl(this.data.Quantity, [Validators.required, Validators.min(1)])
  })

  submitForm() {
    this.dialogRef.close({
      Name: this.attendanceForm.controls.name.value,
      Quantity: this.attendanceForm.controls.quantity.value
    })
  }
}
