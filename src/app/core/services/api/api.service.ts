import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  static defaultRequestOptions() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'accept': 'application/json;q=0.9,*/*;q=0.8',
    });
    return {
      headers: headers,
      withCredentials: true
    };
  }

  static basicAuthRequestOptions(username, password) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'accept': 'application/json;q=0.9,*/*;q=0.8',
      'authorization': 'Basic ' + btoa(username + ':' + password),
    });
    return {
      headers: headers,
      withCredentials: true
    };
  }

  static tokenAuthRequestOptions() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'accept': 'application/json;q=0.9,*/*;q=0.8',
      'authorization': 'Token ' + JSON.parse(localStorage.getItem('currentUser')).token,
    });
    return {
      headers: headers,
      withCredentials: true
    };
  }

  static tokenAuthFormDataRequestOptions() {
    const headers = new HttpHeaders({
      'accept': 'multipart/settingsForm-data;q=0.9,*/*;q=0.8',
      'authorization': 'Token ' + JSON.parse(localStorage.getItem('currentUser')).token,
    });
    return {
      headers: headers,
      withCredentials: true
    };
  }

  static forgotPasswordRequestOptions() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return { 
      headers: headers,
      withCredentials: true
    };
  }
}
