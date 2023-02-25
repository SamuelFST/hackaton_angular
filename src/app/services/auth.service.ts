import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import LoginRequest from '../Objects/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.API_URL;

  constructor(private $http: HttpClient) { }

  authenticate = (login: LoginRequest) => {
    return this.$http.post(`${this.API_URL}/users/auth`, login);
  }

  public isAuthenticated() {
    const isLogged = localStorage.getItem('isLogged');

    if (isLogged === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
