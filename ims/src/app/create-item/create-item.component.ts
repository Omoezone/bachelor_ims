import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  itemName: string = '';
  itemPrice: number = 0;
  itemAmount: number = 0;
  itemType: string = '';
  itemWidth: number | null = null;
  itemHeight: number | null = null;
  itemColor: string = '';

  constructor(public dialogRef: MatDialogRef<CreateItemComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
