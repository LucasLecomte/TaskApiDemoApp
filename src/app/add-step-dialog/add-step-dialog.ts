import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-step-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: 'add-step-dialog.html',
  styleUrl: 'add-step-dialog.css'
})
export class AddStepDialogComponent {
  label = '';
  description = '';

  constructor(private dialogRef: MatDialogRef<AddStepDialogComponent>) { }

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close({
      label: this.label,
      description: this.description
    });
  }
}
