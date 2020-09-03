import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../../modules/authentication/services/authentication.service';

/**
 * Class which acts as an request interceptor check response and
 * catches errors from the backend service.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Create ErrorInterceptor
   *
   * @param authenticationService - The authentication service
   */
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
