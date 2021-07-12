import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFeedsComponent } from './main-feeds.component';

describe('MainFeedsComponent', () => {
  let component: MainFeedsComponent;
  let fixture: ComponentFixture<MainFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
