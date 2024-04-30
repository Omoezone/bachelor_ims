import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;
  private readonly user = 'user';

  constructor(
    private cookieService: CookieService
  ) {
    const user = cookieService.get(this.user);
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  setUser(user: any) {
    this.currentUser = user;
    this.cookieService.set(this.user, JSON.stringify(user));
  }

  getUser() {
    return this.currentUser;
  }

  getUserId() {
    if (this.currentUser) {
      console.log('user_id: ', this.currentUser.user_id);
      return this.currentUser.user_id;
    } else {
      console.error('User is not logged in.');
      return null;
    }
  }

  getUserCookie() {
    return this.cookieService.get(this.user);
  }
}
