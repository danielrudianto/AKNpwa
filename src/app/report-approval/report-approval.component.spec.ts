import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApprovalComponent } from './report-approval.component';

describe('ReportApprovalComponent', () => {
  let component: ReportApprovalComponent;
  let fixture: ComponentFixture<ReportApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
