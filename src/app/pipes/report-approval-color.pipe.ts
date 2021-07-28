import { Pipe, PipeTransform } from '@angular/core';
import { Approvals } from '../interfaces/report';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'ReportApprovalColor',
  pure: false
})
export class ReportApprovalColorPipe implements PipeTransform {
  constructor(
    private authService: AuthService
  ) {

  }

  transform(value: Approvals[], approval: number) {
    return (value.filter(x => x.Approval == approval && x.User!.Email == this.authService.getEmail()).length > 0) ? true : false;
  }
}
