import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAcivationPageComponent } from './email-acivation-page.component';

describe('EmailAcivationPageComponent', () => {
  let component: EmailAcivationPageComponent;
  let fixture: ComponentFixture<EmailAcivationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAcivationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAcivationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
