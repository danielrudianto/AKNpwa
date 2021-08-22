import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool, ToolReportForm } from '../../interfaces/report';
import { ToolFormComponent, ToolsEditFormComponent, ToolsMenuComponent } from '../../report/tools/tools.component';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./edit-tool.component.css']
})
export class EditToolComponent implements OnInit {
  @Input('report') report: any;

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
    private sheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.tools = this.report.Tool;
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
      CreatedBy: this.report.CreatedBy,
      CodeProjectId: this.report.CodeProjectId,
      Tools: this.tools,
      Id: this.report.Id
    }

    this.reportService.editToolReport(toolReportForm)
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
    const sheet = this.sheet.open(ToolsMenuComponent, {
      disableClose: true,
      data: this.tools
    });

    sheet.afterDismissed().subscribe(data => {
      if (data == "edit") {
        const dialog = this.dialog.open(ToolsEditFormComponent, {
          data: tool,
          disableClose: true
        })

        dialog.afterClosed().subscribe(edit => {
          this.tools[this.tools.indexOf(tool)].Name = edit.Name;
          this.tools[this.tools.indexOf(tool)].Description = edit.Description;
          this.tools[this.tools.indexOf(tool)].Quantity = edit.Quantity;
        })
      } else if (data == "delete") {
        this.tools.splice(this.tools.indexOf(tool), 1);
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
