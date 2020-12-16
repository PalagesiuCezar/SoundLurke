import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../../../shared/models/user/user';
import { resetPassword } from '../../../shared/models/user/resetPassword'; 
import { environment } from "../../../../environments/environment";

const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(API_URL + '/register/', user)
  }

  activationEmail( data: resetPassword){
    return this.http.post(API_URL + '/users/activation/ ', data)
  }

  forgotPassword(email: User["email"]) {
    return this.http.post(API_URL + '/users/reset_password/', email)
  }

  forgotPasswordConfirm( data : resetPassword) {
    return this.http.post(API_URL + '/users/reset_password_confirm/', data)
  }

}
