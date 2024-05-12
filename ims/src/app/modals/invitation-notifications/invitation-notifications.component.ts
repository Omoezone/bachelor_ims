import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HttpServiceService } from '../../service/http/http-service.service';
import { UserService } from '../../service/userStorage/user.service';

@Component({
  selector: 'app-invitation-notifications',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    CommonModule,
    MatListModule
  ],
  templateUrl: './invitation-notifications.component.html',
  styleUrl: './invitation-notifications.component.scss'
})
export class InvitationNotificationsComponent {
  constructor(
    public dialogRef: MatDialogRef<InvitationNotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpServiceService,
    private userService: UserService
  ) {}

  acceptNotification(notification: any) {
    // set the notification as accepted in db and update user's group list and remove from invties
    // update db group
    this.http.acceptInvite(`users/${this.userService.getUserId()}/acceptInvite`, notification.invToken).subscribe({
      next: (success) => {
        console.log("invite accepted", success)
        console.log('Invite accepted');
      },
      error: (error) => {
        console.log('Invite accept error:', error);
      }
    });
    // update user's group list + invites

    console.log('Accepted:', notification);
    this.removeNotification(notification);
  }

  denyNotification(notification: any) {
    // set the acceptedAt in db without updating user's group list
    console.log('Denied:', notification);
    this.removeNotification(notification);
  }

  private removeNotification(notification: any) {
    this.data.notification = this.data.notification.filter((n: any) => n !== notification);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
