import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ulogovan = false;

  constructor() { }

  get isUserAuth(): boolean {
    return this.ulogovan;
  }

  login() {
    this.ulogovan = true;
  }
  logout() {
    this.ulogovan = false;
  }
}
