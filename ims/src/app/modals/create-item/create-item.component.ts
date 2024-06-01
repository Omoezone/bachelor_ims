import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { ItemsBase } from '../../types/items';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemsBase,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      name: [data?.name ?? '', Validators.required],
      price: [data?.price ?? null, [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern('^[0-9]*$')]],
      amount: [data?.amount ?? null, [Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern('^[0-9]*$')]],
      type: [data?.type ?? '', Validators.required],
      width: [data?.width ?? null, [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern('^[0-9]*$')]],
      height: [data?.height ?? null, [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern('^[0-9]*$')]],
      color: [data?.color ?? '', Validators.required]
    });
  } 

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSaveClick(): void {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value);
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}
