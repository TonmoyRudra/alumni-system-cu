import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  map,
  catchError,
  flatMap,
  mergeMap,
  toArray,
  tap,
  switchMap,
  concatMap,
} from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
//import { JwtHelperService } from '@auth0/angular-jwt';
//const jwthelper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  isAutenticated = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    public globalService: GlobalService
  ) {}

  loggedIn() {
    const token = localStorage.getItem('sessionUser');
    if (token) {
      try {
        //localStorage.clear();
        return true;
        // if (jwthelper.isTokenExpired(token)) {
        //   // true means token expired.
        //   // if(this.getBracToken()){
        //   //   localStorage.clear();
        //   //   window.location.href = this.globalService.ssoBracUrl;
        //   // } else {
        //   // }
        //   localStorage.clear();
        //   return false;
        // } else {
        //   return true;
        // }
      } catch (error) {
        this.logout();
      }
    } else {
      return false;
    }
    // return !!localStorage.getItem('token');
  }

  signIn(username: string, password: string): Observable<any> {
    // console.log('<========Token 0Auth wtih (grant_type: password) service called========>');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ UserName: username, Password: password });
    return this.http
      .post(this.globalService.api_BaseURL + '/User/Login', body, {
        headers,
      })
      .pipe(
        map((x: Response) => x),
        map((x) => {
          // this.setSessionUser(x.user)
          this.setSessionUser(x);

          // localStorage.setItem('token', JSON.stringify(x.access_token));
          return x;
        }),
        catchError((error: Response) => {
          return throwError(error);
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  logout() {
    localStorage.clear();
    return true;
  }

  setSessionUser(user) {
    // try {
    //   const tokenDecode = jwthelper.decodeToken(token);
    //   delete tokenDecode.iat;
    //   delete tokenDecode.iss;
    //   localStorage.setItem('sessionUser', JSON.stringify(tokenDecode));
    //   return true;
    // } catch (error) {
    //   return false;
    // }

    localStorage.setItem('sessionUser', JSON.stringify(user));

  }

  getSessionUser() {
    return JSON.parse(localStorage.getItem('sessionUser'));
  }

  setBracToken(token) {
    localStorage.setItem('multipass', JSON.stringify(token));
  }

  getBracToken() {
    return JSON.parse(localStorage.getItem('multipass'));
  }

  getLoginUserRole() {
    const sUser = JSON.parse(localStorage.getItem('sessionUser'));
    return sUser.role;
  }

  isAdminRole() {
    // return true;
    const sUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sUser?.role?.short_form.toLowerCase() == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  isSMORole() {
    // return true;
    const sUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sUser?.role?.short_form.toLowerCase() == 'smo') {
      return true;
    } else {
      return false;
    }
  }
}
