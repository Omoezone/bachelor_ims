import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ItemsBase } from '../../types/items';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  
  constructor(
    public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemsBase
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
