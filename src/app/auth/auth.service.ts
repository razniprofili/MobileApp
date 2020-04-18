import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuth = false;

  constructor() { }

  get isUserAuth(): boolean {
    return this.isUserAuth;
  }

  login(){
    this._isUserAuth = true;
  }
  logout(){
    this._isUserAuth = false;
  }
}
