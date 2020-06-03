import { Injectable } from '@angular/core';
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {environment} from "../../environments/environment";
import { Observable, throwError } from 'rxjs';
export interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ulogovan = false;
  private _user = new BehaviorSubject<User>(null);
  //gde god se pretplatimo na User-a imacemo na uvid svaku promenu!
  //dobijamo najnoviju prethodno emitovanu vrednost

  constructor(private http: HttpClient) { }

  get isUserAuth() {
    return this._user.asObservable().pipe(
        //posto menjamo vrednost koja se vraca koristimo map
        map((user) => {
          if (user) {
            return !!user.token; //truthy samo ako nije prazan! proveravamo to i istovremeno ga vracamo
          } else {
            return false;
          }
        })
    );
  }
  get userId() {
    return this._user.asObservable().pipe(
        map((user) => {
          if (user) {
            return user.id;
          } else {
            return null;
          }
        })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
        map((user) => {
          if (user) {
            return user.token;
          } else {
            return null;
          }
        })
    );
  }
  login(user: UserData) {
    this.ulogovan = true;

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        {
          email: user.email,
          password: user.password,
          returnSecureToken: true
        }).pipe(tap(userData => {
      const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000); //ovaj plusic je pretvaranje stringa u number, u milisek
      const newUser = new User(userData.localId, userData.email, userData.idToken, expirationDate);
      this._user.next(newUser); // postavljamo ovog usera, i dalje mozemo da ga koristimo
    }));
  }

  logout() {
   // this.ulogovan = false;
    this._user.next(null);
  }

  register(user: UserData) {
    this.ulogovan = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(
        // catchError(this.handleError),
        tap(userData => {
      const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
      const newUser = new User(userData.localId, userData.email, userData.idToken, expirationDate);
      this._user.next(newUser);
    }));
  }
  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('desila se greska pokusajte kasnije');
  }
}
