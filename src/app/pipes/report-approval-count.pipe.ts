import { Pipe, PipeTransform  } from '@angular/core';
import { Approvals } from '../interfaces/report';

@Pipe({
  name: 'ReportApprovalCount',
  pure: false
})
export class ReportApprovalCountPipe implements PipeTransform
{
  transform(value: Approvals[], approval: number) {
    return value.filter(x => x.Approval == approval).length;
  }
}
