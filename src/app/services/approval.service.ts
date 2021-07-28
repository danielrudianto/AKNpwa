import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import * as global from '../global';
import { Approvals, RFIAnswer } from '../interfaces/report';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  approve(reportId: number, approval: number, comment: string = "") {
    return this.http.post(global.url + "/reportApproval", {
      reportId: reportId,
      approval: approval,
      comment: comment
    })
  }

  getApprovals(reportId: number, offset: number, limit: number = 10) {
    return this.http.get<Approvals[]>(global.url + "/reportApproval/" + reportId, {
      params: {
        offset: offset,
        limit: limit
      }
    })
  }

  getComments(reportId: number, offset: number, limit: number = 10) {
    return this.http.get<Approvals[]>(global.url + "/reportApproval/comments/" + reportId, {
      params: {
        offset: offset,
        limit: limit
      }
    })
  }

  getAnswers(reportId: number, offset: number, limit: number = 10) {
    return this.http.get<RFIAnswer[]>(global.url + "/rfi/answer/" + reportId, {
      params: {
        offset: offset,
        limit: limit
      }
    });
  }

  getCommentsDisplay(reportId: number) {
    return this.http.get<any[]>(global.url + "/reportApproval/commentsDisplay/" + reportId);
  }

  answer(reportId: number, answer: string) {
    return this.http.post(global.url + "/rfi/answer/", {
      reportId: reportId,
      answer: answer,
      createdBy: this.authService.getEmail()
    })
  };

  deleteAnswer(answerId: number) {
    return this.http.delete(global.url + '/rfi/answer/' + answerId);
  }

  getAnswerDisplay(id: number) {
    return this.http.get<any[]>(global.url + '/rfi/answerDisplay/' + id);
  }

  deleteApproval(id: number) {
    return this.http.delete(global.url + "/reportApproval/" + id);
  }
}
