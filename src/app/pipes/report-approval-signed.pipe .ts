import { Pipe, PipeTransform  } from '@angular/core';
import { Approvals } from '../interfaces/report';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'ReportApprovalSigned',
  pure: false
})
export class ReportApprovalSignedPipe implements PipeTransform
{
  constructor(
    private authService: AuthService
  ) {

  }

  transform(value: Approvals[]) {
    return (value.filter(x => x.Approval != 0 && x.User!.Email == this.authService.getEmail()).length > 0) ? true : false;
  }
}
