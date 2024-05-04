import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ItemsBase } from '../../types/items';

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
