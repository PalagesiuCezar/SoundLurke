import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetForgotPasswordConfirmComponent } from './reset-forgot-password-confirm.component';

describe('ResetForgotPasswordConfirmComponent', () => {
  let component: ResetForgotPasswordConfirmComponent;
  let fixture: ComponentFixture<ResetForgotPasswordConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetForgotPasswordConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetForgotPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
