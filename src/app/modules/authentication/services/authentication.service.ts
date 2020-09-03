import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../shared/models/user/user';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../core/services/api/api.service';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';


const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Returns current user object from the behavioral subject.
   * @returns User object
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Performs login functionality , sends user information to the backend service
   * and expects user information + token info. Then stores user into localstorage and
   * behavioral subject.
   *
   * @param email - email to be use
   * @param password - password to be used
   *
   * @returns User object current user logged in
   */
  login(email: string, password: string) {
    const requestOptions = ApiService.basicAuthRequestOptions(email, password);
    return this.http.post<any>(API_URL + '/login', {}, requestOptions)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  /**
   * Performs logout functionality , deletes user from localstorage,
   * removes it from behavioral subject and redirects user to homepage.
   *
   * @return NaN
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
