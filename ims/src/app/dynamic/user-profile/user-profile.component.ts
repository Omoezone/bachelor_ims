import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpServiceService } from '../../service/http/http-service.service';
import { UserService } from '../../service/userStorage/user.service';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports : [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userUpdateForm: any; 

  constructor(
    private fb: FormBuilder, 
    private http: HttpServiceService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = this.userService.getUser();
    this.userUpdateForm = this.fb.group({
      userId: [this.userService.getUserId()],
      firstName: [userData.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      lastName: [userData.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      email: [userData.email, [Validators.required, Validators.email]],
      password: [userData.password, [Validators.required, Validators.minLength(6)]],
      age: [userData.age, [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: [userData.gender, Validators.required]
    });
  }
  onSubmit() {
    console.log('Form Submitted', this.userUpdateForm.value)
    this.http.updateUser(`users/${this.userService.getUserId()}`, this.userUpdateForm.value).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        
        this.userService.setUser(this.userUpdateForm.value);
        this.router.navigate(['/userFrontPage']); 

        this.snackBar.open('User updated successful!', 'Close', {
          duration: 3000, 
        });
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }
}
