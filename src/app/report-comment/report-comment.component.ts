import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Approvals } from '../interfaces/report';
import { ApprovalService } from '../services/approval.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
  styleUrls: ['./report-comment.component.css']
})
export class ReportCommentComponent implements OnInit {
  @Output() onAddApproval = new EventEmitter<any>();
  @Input() reportId: number;
  @Input() approvals: Approvals[] = [];
  comment: string = "";
  isSubmitting: boolean = false;

  constructor(
    private approvalService: ApprovalService,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private authService: AuthService
  ) { }

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl("", Validators.required)
  })

  onSubmit() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      this.approvalService.approve(this.reportId, 0, this.commentForm.controls.comment.value).subscribe(data => {
        this.commentForm.reset();
        this.isSubmitting = false;
      }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close");
      });
    }
  }

  ngOnInit(): void {
  }

}
