import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.scss'
})
export class CreateCollectionComponent {
  collectionName: string = '';

  constructor(public dialogRef: MatDialogRef<CreateCollectionComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
