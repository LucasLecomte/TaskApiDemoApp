import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepDialog } from './add-step-dialog';

describe('AddStepDialog', () => {
  let component: AddStepDialog;
  let fixture: ComponentFixture<AddStepDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStepDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStepDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
