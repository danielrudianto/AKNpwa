import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import * as global from '../global';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  constructor(
    private http: HttpClient
  ) { }

  approve(reportId: number, approval: number) {
    return this.http.post(global.url + "/reportApproval", {
      reportId: reportId,
      approval: approval
    })
  }
}
