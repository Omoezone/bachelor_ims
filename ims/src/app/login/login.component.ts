import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpServiceService } from '../service/http/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/userStorage/user.service';
import { AuthService } from '../service/auth/auth.service';
import { AuthGuardService } from '../service/authGuard/auth-guard.service';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService, 
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private authGuard: AuthGuardService,
    private snackBar: MatSnackBar
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authGuard.canActivate();
    const { email, password } = this.loginForm.value;
    this.httpService.login("login", email!, password!).subscribe({
      next: (success) => {        
        this.cookieService.set('authToken', success.token);
        this.cookieService.set('user', JSON.stringify(success.user));
        this.userService.setUser(success.user);
        this.authService.login();
        this.router.navigate(['/userFrontPage']); 

        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000, 
        });
        
      },
      error: (error) => {
        if (error.status === 401) {
          this.snackBar.open('Unauthorized: Incorrect email or password.', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Login failed. Internal server error, try again later.', 'Close', {
            duration: 5000,
          });
        }
      }
    });
  }
  public openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, { duration });
  }
}
