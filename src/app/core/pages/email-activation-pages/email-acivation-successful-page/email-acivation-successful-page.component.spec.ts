import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAcivationSuccessfulPageComponent } from './email-acivation-successful-page.component';

describe('EmailAcivationSuccessfulPageComponent', () => {
  let component: EmailAcivationSuccessfulPageComponent;
  let fixture: ComponentFixture<EmailAcivationSuccessfulPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAcivationSuccessfulPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAcivationSuccessfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
