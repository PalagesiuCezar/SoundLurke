import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/pages/home/home.component';

import { ForgotPasswordComponent } from './core/pages/password-pages/forgot-password/reset-forgot-password/forgot-password.component';
import { ResetForgotPasswordConfirmComponent } from './core/pages/password-pages/forgot-password/reset-forgot-password-confirm/reset-forgot-password-confirm.component';

import { EmailAcivationSuccessfulPageComponent } from './core/pages/email-activation-pages/email-acivation-successful-page/email-acivation-successful-page.component';

import { ResetPasswordComponent } from './core/pages/password-pages/reset-password/reset-password.component';
import { MainViewComponent } from './core/pages/main-view/main-view.component';

const routes: Routes = [
  { path: '',
    // component: MainViewComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },
  { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)},
  
  { path: 'users/reset_password', component: ForgotPasswordComponent },
  { path: 'users/reset_password_confirm/:uid/:token', component: ResetForgotPasswordConfirmComponent },
  { path: 'activate/:uid/:token', component: EmailAcivationSuccessfulPageComponent } ,
  
  { path: '**', redirectTo: '' } //PageNotFound404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
