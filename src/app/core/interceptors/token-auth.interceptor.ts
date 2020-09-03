import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../modules/authentication/services/authentication.service';
import {environment} from '../../../environments/environment';

/**
 * Class that acts as an request interceptor and modifies it by
 * adding the token for each request of an logged user.
 */
@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Token ' + currentUser.token
        }
      });
    }

    return next.handle(req);
  }
}
