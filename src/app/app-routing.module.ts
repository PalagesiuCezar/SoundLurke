import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './core/pages/home/home.component';
import {MainViewComponent} from './core/pages/main-view/main-view.component';

const routes: Routes = [
  { path: '',
    component: MainViewComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]
  },
  // { path: 'auth', loadChildren: './modules/authentication/authentication.module#AuthenticationModule' },
  { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
