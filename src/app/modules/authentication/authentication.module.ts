import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { RegisterComponent } from './forms/register/register.component';
import { LoginComponent } from './forms/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthenticationComponent, 
    RegisterComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
