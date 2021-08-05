import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RFIAnswer } from '../interfaces/report';
import { ApprovalService } from '../services/approval.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import * as global from '../global';

@Component({
  selector: 'app-rfi-answer',
  templateUrl: './rfi-answer.component.html',
  styleUrls: ['./rfi-answer.component.css']
})
export class RfiAnswerComponent implements OnInit {
  @Input() reportId: number;
  @Input() answers: RFIAnswer[] = [];
  global: any = global;
  isSubmitting: boolean = false;

  constructor(
    private approvalService: ApprovalService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.socketService.socket.on("deleteAnswer", (data: any) => {
      const index = this.answers.findIndex(x => x.Id == data.Id);
      if (index > -1) {
        this.approvalService.getAnswerDisplay(this.reportId).subscribe((data: any[]) => {
          this.answers = data;
        });
      }
    });
  }

  answerForm: FormGroup = new FormGroup({
    Answer: new FormControl("", Validators.required)
  })

  onSubmit() {
    this.isSubmitting = true;
    this.approvalService.answer(this.reportId, this.answerForm.controls.Answer.value).subscribe(data => {
      this.answerForm.reset();
      this.isSubmitting = false;
    }, error => {
      this.snackbar.open(error.message, "Close");
      this.isSubmitting = false;
    })
  }

  openAnswers() {
    this.dialog.open(RfiAnswerListComponent, {
      maxHeight: '100%',
      data: this.reportId
    })
  }

}

@Component({
  selector: 'rfi-answer-list',
  templateUrl: 'rfi-answer-list.html',
  styleUrls: ['rfi-answer-list.css']
})

export class RfiAnswerListComponent implements OnInit {
  position: number = 0;
  answers: RFIAnswer[] = [];
  global: any = global;
  selector: string = ".reportApprovalContainer";

  constructor(
    private authService: AuthService,
    private approvalService: ApprovalService,
    private socketService: SocketService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.fetchAnswers();
    this.position = this.authService.getInfo().Position;

    this.socketService.socket.on("updateToken", (data: any) => {
      if (data.Email == this.authService.getEmail) {
        this.position = this.authService.getInfo(data.Token).Position;
      }
    })

    this.socketService.socket.on("deleteAnswer", (data: any) => {
      const index = this.answers.findIndex(x => x.Id == data.Id);
      if (index > -1) {
        this.answers.splice(index, 1);
      }
    });
  }

  fetchAnswers() {
    this.approvalService.getAnswers(this.data, this.answers.length).subscribe(data => {
      data.forEach(datum => {
        this.answers.push(datum);
      })
    }, error => {
      console.log(error);
    })
  }

  onScroll() {
    this.fetchAnswers();
  }

  deleteAnswer(id: number) {
    this.approvalService.deleteAnswer(id).subscribe(() => { }, error => { console.log(error) })
  }
}

