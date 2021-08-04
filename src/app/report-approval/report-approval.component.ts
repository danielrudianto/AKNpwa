import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Approvals } from '../interfaces/report';
import { ApprovalService } from '../services/approval.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import * as global from '../global';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report-approval',
  templateUrl: './report-approval.component.html',
  styleUrls: ['./report-approval.component.css']
})
export class ReportApprovalComponent implements OnInit {
  @Input() reportId: number;
  @Input() approvals: Approvals[] = [];
  @Input() comments: Approvals[] = [];

  global: any = global;

  constructor(
    private approvalService: ApprovalService,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private authService: AuthService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {

  }

  approveReport() {
    this.approvalService.approve(this.reportId, 1).subscribe(data => {
    }, error => {
        this.snackBar.open(error.message, "Close",
          {
            duration: 2000
          });
    })
  }
  disapproveReport() {
    this.approvalService.approve(this.reportId, 2).subscribe(data => {
    }, error => {
        this.snackBar.open(error.message, "Close", {
          duration: 2000
        });
    })
  }

  openComments() {
    this.dialog.open(ReportCommentListComponent, {
      data: this.reportId,
      maxHeight: '100%',
    })
  }

  openApprovals() {
    this.dialog.open(ReportApprovalListComponent, {
      data: this.reportId,
      maxHeight: '100%',
    })
  }
}

@Component({
  selector: 'report-approval-list',
  templateUrl: 'report-approval-list.html',
  styleUrls: ['report-approval-list.css']
})
export class ReportApprovalListComponent implements OnInit {
  approvals: Approvals[] = [];
  isFetching: boolean = false;
  selector: string = ".reportApprovalContainer";
  global: any = global;
  position: number = 0;

  constructor(
    private approvalService: ApprovalService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private socketService: SocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchApprovals();
    this.position = this.authService.getInfo().Position;

    this.socketService.socket.on("newApproval", (data: Approvals) => {
      if (data.CodeReportId == this.data && data.Approval != 0) {
        this.approvals.push(data);
      }
    });

    this.socketService.socket.on("deleteApproval", (data: Approvals) => {
      const index = this.approvals.findIndex(x => x.Id == data.Id);
      if (index > -1) {
        this.approvals.splice(index, 1);
      }
    })

    this.socketService.socket.on("updateToken", (data: any) => {
      if (data.Email == this.authService.getEmail) {
        this.position = this.authService.getInfo(data.Token).Position;
      }
    })
  }

  fetchApprovals() {
    this.isFetching = true;
    this.approvalService.getApprovals(this.data, this.approvals.length).subscribe(data => {
      this.isFetching = false;
      data.forEach(datum => {
        this.approvals.push(datum);
      })
    }, error => {
      this.isFetching = false;
    })
  }

  onScroll() {
    this.fetchApprovals();
  }

  deleteApproval(id: number) {
    this.approvalService.deleteApproval(id).subscribe(() => { }, error => {
      console.log(error);
    })
  }
}

@Component({
  selector: 'report-comment-list',
  templateUrl: 'report-comment-list.html',
  styleUrls: ['report-approval-list.css']
})
export class ReportCommentListComponent implements OnInit {
  approvals: Approvals[] = [];
  isFetching: boolean = false;
  selector: string = ".reportApprovalContainer";
  global: any = global;
  position: number = 0;

  constructor(
    private approvalService: ApprovalService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private socketService: SocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchApprovals();
    this.position = this.authService.getInfo().Position;

    this.socketService.socket.on("newApproval", (data: Approvals) => {
      if (data.CodeReportId == this.data && data.Approval == 0) {
        this.approvals.push(data);
      }
    });

    this.socketService.socket.on("deleteApproval", (data: Approvals) => {
      const index = this.approvals.findIndex(x => x.Id == data.Id);
      if (index > -1) {
        this.approvals.splice(index, 1);
      }
    })

    this.socketService.socket.on("updateToken", (data: any) => {
      if (data.Email == this.authService.getEmail) {
        this.position = this.authService.getInfo(data.Token).Position;
      }
    })
  }

  fetchApprovals() {
    this.isFetching = true;
    this.approvalService.getComments(this.data, this.approvals.length).subscribe(data => {
      this.isFetching = false;
      data.forEach(datum => {
        this.approvals.push(datum);
      })
    }, error => {
      this.isFetching = false;
    })
  }

  onScroll() {
    this.fetchApprovals();
  }

  deleteApproval(id: number) {
    this.approvalService.deleteApproval(id).subscribe(() => { }, error => {
      console.log(error);
    })
  }
}
