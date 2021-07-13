import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiAnswerComponent } from './rfi-answer.component';

describe('RfiAnswerComponent', () => {
  let component: RfiAnswerComponent;
  let fixture: ComponentFixture<RfiAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfiAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
