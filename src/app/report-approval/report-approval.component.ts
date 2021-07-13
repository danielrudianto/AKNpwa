import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Approvals } from '../interfaces/report';
import { ApprovalService } from '../services/approval.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-report-approval',
  templateUrl: './report-approval.component.html',
  styleUrls: ['./report-approval.component.css']
})
export class ReportApprovalComponent implements OnInit {
  @Input() reportId: number;
  @Input() approvals: Approvals[] = [];
  selfSigned: boolean = false;

  constructor(
    private approvalService: ApprovalService,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.socketService.socket.on("newApproval", (data: Approvals) => {
      if (data.ReportId == this.reportId) {
        this.approvals.push(data);

        if (data.User!.Email == this.authService.getEmail()) {
          this.selfSigned = true;
        }
      }
    })

    this.approvals.forEach(approval => {
      if (approval.User!.Email == this.authService.getEmail()) {
        this.selfSigned = true;
      }
    })
  }

  approveReport() {
    this.approvalService.approve(this.reportId, 1).subscribe(data => {
      this.selfSigned = true;
    }, error => {
        this.snackBar.open(error.message, "Close");
    })
  }
  disapproveReport() {}
}
