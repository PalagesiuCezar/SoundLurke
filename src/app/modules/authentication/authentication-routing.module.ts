import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component'
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { IsAuthenticatedGuard } from "./guards/is-authenticated-guard.service";

const routes: Routes = [
  { path: '', component: AuthenticationComponent, pathMatch: 'full' },
  { path: 'login', canActivate: [IsAuthenticatedGuard], component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
