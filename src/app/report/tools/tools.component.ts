import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Tool, ToolReportForm } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  tools: Tool[] = [];
  isSubmitting: boolean = false;
  step: number = 1;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  openAddToolForm() {
    const dialog = this.dialog.open(ToolFormComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data.Name != undefined && data.Quantity != undefined && data.Description != undefined) {
        this.tools.push(data as Tool);
      }
    })
  }

  addTools() {
    this.isSubmitting = true;
    const toolReportForm: ToolReportForm = {
      CreatedBy: this.authService.getEmail(),
      CodeProjectId: parseInt(this.cookieService.get("projectId")),
      Tools: this.tools
    }

    this.reportService.submitToolReport(toolReportForm)
      .subscribe(responseData => {
        this.tools = [];
        this.route.navigate(["/Project/Feed/"]);
      }, error => {
        this.isSubmitting = false;
        this.snackBar.open("Close", error.message, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000
        })
      })
  }

  onLongPress(tool: Tool) {

  }

  next() {
    this.step = 2;
  }

  prev() {
    this.step = 1;
  }

}

@Component({
  selector: 'tools-menu',
  templateUrl: 'tools-menu.html'
})
export class ToolsMenuComponent {
  constructor(
    private sheetRef: MatBottomSheetRef<ToolsMenuComponent>
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
  selector: 'tools-form',
  templateUrl: 'tools-form.html'
})
export class ToolFormComponent {
  constructor(
    private dialogRef: MatDialogRef<ToolFormComponent>
  ) { }

  toolForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    quantity: new FormControl(0, [Validators.min(1), Validators.required])
  })

  submitForm() {
    this.dialogRef.close({
      Name: this.toolForm.controls.name.value,
      Quantity: parseInt(this.toolForm.controls.quantity.value),
      Description: this.toolForm.controls.description.value
    })
  }
}
