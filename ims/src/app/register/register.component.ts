import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HttpServiceService } from '../service/http/http-service.service';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private httpService: HttpServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.httpService.postData('users', this.registerForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/login']);  
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000, 
        });
      },
      error: (error) => {
        console.log("errorStuff", error);
        this.snackBar.open('This email is already in use, please chose another or login', 'Close', {
          duration: 5000,
        });
      }
    });
    }
  }
  public openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, { duration });
  }
}
