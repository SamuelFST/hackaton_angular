import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import User from '../Objects/User';
import UserRegister from '../Objects/UserRegister';
import Provider from '../Objects/Provider';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = environment.API_URL;

  constructor(private $http: HttpClient) { }

  listAll = () => {
    return this.$http.get<User[]>(`${this.API_URL}/users`);
  }

  findById = (id: number) => {
    return this.$http.get<User>(`${this.API_URL}/users/${id}`);
  }

  findAllEmailProviders = () => {
    return this.$http.get<Provider[]>(`${this.API_URL}/users/providers`);
  }

  searchByName = (name: string) => {
    return this.$http.get<User[]>(`${this.API_URL}/users?name=${name}`);
  }

  create = (user: UserRegister) => {
    return this.$http.post(`${this.API_URL}/users`, user);
  }

  update = (user: UserRegister, id: number) => {
    return this.$http.put(`${this.API_URL}/users/${id}`, user);
  }

  delete = (id : number) => {
    return this.$http.delete(`${this.API_URL}/users/${id}`);
  }
}
