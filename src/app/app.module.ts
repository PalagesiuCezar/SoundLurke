import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AuthenticationModule} from "./modules/authentication/authentication.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/pages/home/home.component';
import { MainViewComponent } from './core/pages/main-view/main-view.component';

import { TokenAuthInterceptor } from './core/interceptors/token-auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error-handler.interceptor';
import { ForgotPasswordComponent } from './core/pages/password-pages/forgot-password/reset-forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/pages/password-pages/reset-password/reset-password.component';
import { ResetForgotPasswordConfirmComponent } from './core/pages/password-pages/forgot-password/reset-forgot-password-confirm/reset-forgot-password-confirm.component';
import { EmailAcivationPageComponent } from './core/pages/email-activation-pages/email-acivation-page/email-acivation-page.component';
import { EmailAcivationSuccessfulPageComponent } from './core/pages/email-activation-pages/email-acivation-successful-page/email-acivation-successful-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MainViewComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetForgotPasswordConfirmComponent,
    EmailAcivationPageComponent,
    EmailAcivationSuccessfulPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
