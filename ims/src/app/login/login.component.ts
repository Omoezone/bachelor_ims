import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from '../service/http/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/userStorage/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
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
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.httpService.login("login", email!, password!).subscribe({
      next: (success) => {
        console.log('Login successful');

        this.cookieService.set('authToken', success.token);
        localStorage.setItem('user', JSON.stringify(success.user));
        this.userService.setUser(success.user);

        this.router.navigate(['/userFrontPage']); 
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
