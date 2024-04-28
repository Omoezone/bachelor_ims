import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpServiceService } from '../service/http/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/userStorage/user.service';
import { MatMenuModule } from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

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
  showLoginForm = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]]
  });

  constructor(
    private httpService: HttpServiceService, 
    private fb: FormBuilder,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {}

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.httpService.login("login", email!, password!).subscribe({
      next: (success) => {
        console.log('Login successful');

        // Set the token in the cookie
        this.cookieService.set('authToken', success.token);

        // Set the user in the local storage and service, localStorage is for persistence across sessions/refreshs for now
        localStorage.setItem('user', JSON.stringify(success.user));
        this.userService.setUser(success.user);
        this.showLoginForm = false; 
        // Redirect to the user front page
        this.router.navigate(['/userFrontPage']); 
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
  logout() {
    this.userService.setUser(null); 
    this.cookieService.delete('authToken');
  }
}
