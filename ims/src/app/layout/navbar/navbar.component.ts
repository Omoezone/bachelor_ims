import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../service/userStorage/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { HttpServiceService } from '../../service/http/http-service.service';
import { InviteGroupComponent } from '../../modals/invite-group/invite-group.component';
import { InvitationNotificationsComponent } from '../../modals/invitation-notifications/invitation-notifications.component';
import { CreateGroupComponent } from '../../modals/create-group/create-group.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

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
    MatIconModule,
    MatBadgeModule
  ],
  providers: [CookieService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpServiceService,
  ) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.restoreUserSession();
  }

  inviteToGroup(){
    const dialogRef = this.dialog.open(InviteGroupComponent, {
      width: '30%'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.postInvite(`users/${this.userService.getUserId()}/sendInvite`, { "recieverEmail": result.email, "groupId": result.groupId }).subscribe({
          next: (data: any) => {
            this.snackBar.open('Group invitation successfully sent!', 'Close', {
              duration: 2000, 
            });
          },
          error: (error: any) => {
            if(error.status === 404){
              this.snackBar.open('User not found, please use a valid user email', 'Close', {
                duration: 3000, 
              });
            }else {
              this.snackBar.open('Internal error, please try again later', 'Close', {
                duration: 5000, 
            });
          }
        }});
      }
    });
  }

  createNewGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.createGroup(`users/${this.userService.getUserId()}/group`,{ groupName: result.groupName }).subscribe({
          next: (data: any) => {
            this.userService.setUserGroups(data);
            this.snackBar.open('New group successfully created!', 'Close', {
              duration: 2000,
            });
          },
          error: (error: any) => {
            if (error.status === 404) {
              this.snackBar.open('User not found, please use a valid user email', 'Close', {
                duration: 3000,
              });
            } else {
              this.snackBar.open('Internal error, please try again later', 'Close', {
                duration: 5000,
              });
            }
          }
        });
      }
    });
  }

  get userInvitesCount(): number {
    return this.userService.getUserInvites().length;
  }

  showNotifications() {
    const user = this.userService.getUser();
    if (user && user.invites) {
      const dialogRef = this.dialog.open(InvitationNotificationsComponent, {
        width: '40%', 
        height: '60%',
        data: { notification : user.invites }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
    console.log("No notifications to show or user is not logged in.");
    }
  }
  
  logout() { 
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
