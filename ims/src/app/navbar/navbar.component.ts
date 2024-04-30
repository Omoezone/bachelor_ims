import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/userStorage/user.service';
import { MatMenuModule } from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../service/auth/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [CookieService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    const userCookie = this.userService.getUserCookie();
    if (userCookie) {
      const user = JSON.parse(userCookie);
      this.userService.setUser(user);
      console.log('user: ', user);
    } else {
      console.log('User cookie not found');
    }
  }

  logout() { 
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
