import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;

  setUser(user: any) {
    this.currentUser = user;
  }
  getUser() {
    return this.currentUser;
  }
  getUserId() {
    return this.currentUser.user_id;
  }
  isLoggedIn() {
    return this.currentUser !== null;
  }
}
