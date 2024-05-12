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

  restoreUserSession() {
    const userCookie = this.getUserCookie();
  if (userCookie) {
    const user = JSON.parse(userCookie);
    this.setUser(user);
  } else {
    console.log('User cookie not found');
  }
  }

  get userInvitesCount(): number {
    return this.currentUser?.invites?.length ?? 0;
  }
  
  getUserName(): string {
    if (this.currentUser) {
      return this.currentUser.firstName + ' ' + this.currentUser.lastName;
    } else {
      return "null";
    }
  }

  getUserId() {
    if (this.currentUser) {
      return this.currentUser.userId;
    } else {
      return null;
    }
  }
  getUserGroups() {
    if (this.currentUser) {
      return this.currentUser.groups;
    } else {
      return [];
    }
  }

  getUserInvites() {
    if (this.currentUser) {
      return this.currentUser.invites;
    } else {
      return [];
    }
  }

  getUserCookie() {
    return this.cookieService.get(this.user);
  }
}
