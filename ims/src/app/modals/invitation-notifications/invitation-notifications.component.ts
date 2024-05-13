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
    this.http.denyInvite(`users/${this.userService.getUserId()}/denyInvite`, notification.invId).subscribe({
      next: (success) => {
        this.removeNotification(notification);
      },
      error: (error) => {
        console.log('Invite deny error:', error);
      }
    });
  }

  private removeNotification(notification: any) {
    this.userService.removeInvite(notification.invToken);
    this.data.notification = this.data.notification.filter((n: any) => n.invToken !== notification.invToken);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
