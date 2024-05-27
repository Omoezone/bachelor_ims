import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateGroupComponent>
  ) {
    this.groupForm = this.fb.group({
      groupName: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45) ]]
    });
  }

  onNoClick(): void {
    console.log('No click');
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Submit');
    if (this.groupForm.valid) {
      this.dialogRef.close(this.groupForm.value);
    }
  }
}
