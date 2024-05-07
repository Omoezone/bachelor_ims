import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../http/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private cookieService: CookieService,
    private httpService: HttpServiceService
  ) {
    this.loggedInSubject = new BehaviorSubject<boolean>(false); 
    this.isLoggedIn$ = this.loggedInSubject.asObservable();
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    this.isAuthenticated().subscribe(isAuthenticated => {
      this.loggedInSubject.next(isAuthenticated); 
    });
  }

  login() {
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('user');
    this.loggedInSubject.next(false);
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.httpService.validateToken('verify', this.cookieService.get('authToken'))
      .pipe(
        map(data => {
          console.log('Data received:', data);
          if (!data) {
            return false;
          }
          return true;
        }),
        catchError(error => {
          console.error('Failed to fetch data', error);
          return of(false);
        })
      );
  }

  getAuthToken(): string | null {
    return this.cookieService.get('authToken');
  }
}
