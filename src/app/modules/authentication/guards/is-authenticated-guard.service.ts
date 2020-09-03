import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // const currentUser = this.authenticationService.currentUserValue;
    // if (currentUser) {
    //   this.router.navigate(['/']);
    //   return false;
    // }
    // return true;
    return true;
  }
}
