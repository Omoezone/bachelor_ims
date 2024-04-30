import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private cookieService: CookieService
  ) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.isLoggedIn$ = this.loggedInSubject.asObservable();
  }
  login() {
    this.loggedInSubject.next(true);
    console.log('logged in: ', this.loggedInSubject.value)
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('user');
    this.loggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('authToken');
  }

  getAuthToken(): string | null {
    return this.cookieService.get('authToken');
  }
}
