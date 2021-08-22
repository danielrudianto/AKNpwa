import { Component, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Worker, WorkerReportForm } from '../../interfaces/report';
import { AttendanceEditFormComponent, AttendanceFormComponent, AttendanceMenuComponent } from '../../report/attendance/attendance.component';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {
  @Input('report') report: any;

  workers: Worker[] = [];
  attendingWorkers: any[] = [];
  isSubmitting: boolean = false;
  step: number = 1;

  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private route: Router,
    private snackBar: MatSnackBar,
    private sheet: MatBottomSheet,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.workers = this.report.Worker;
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
      Id: this.report.Id,
      CreatedBy: this.report.CreatedBy,
      CodeProjectId: this.report.ProjectId,
      Workers: this.report.Workers
    }
    this.reportService.editWorkerReport(workerReportForm)
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
