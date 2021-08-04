import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRfiComponent } from './edit-rfi.component';

describe('EditRfiComponent', () => {
  let component: EditRfiComponent;
  let fixture: ComponentFixture<EditRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
