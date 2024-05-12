import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../service/userStorage/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-invite-group',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './invite-group.component.html',
  styleUrl: './invite-group.component.scss'
}) 
export class InviteGroupComponent {
  email: string = '';
  selectedGroupId: number | null = null;
  groups: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<InviteGroupComponent>,
    private userService: UserService
  ) {
    this.groups = this.userService.getUserGroups();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
