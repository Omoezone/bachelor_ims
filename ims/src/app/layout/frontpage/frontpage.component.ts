import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/userStorage/user.service';
import { HttpServiceService } from '../../service/http/http-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [
    MatCardModule, 
    RouterLink, 
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.scss'
})
export class FrontpageComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.restoreUserSession();
  }
}
