import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpServiceService } from '../service/http/http-service.service';
import { UserService } from '../service/userStorage/user.service';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports : [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
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
        
        // update user in userService
        this.userService.setUser(this.userUpdateForm.value);
        this.router.navigate(['/userFrontPage']);  
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }
}
