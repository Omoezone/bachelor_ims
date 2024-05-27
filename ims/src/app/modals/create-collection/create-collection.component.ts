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
  selector: 'app-create-collection',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.scss'
})
export class CreateCollectionComponent {
  collectionName: string = '';
  selectedGroupId: number | null = null;
  groups: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateCollectionComponent>,
    private userService: UserService
  ) {
    this.groups = this.userService.getUserGroups();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
