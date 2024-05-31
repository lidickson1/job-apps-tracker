import { Component, Inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Application } from '../models';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-reject-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './reject-form.component.html',
  styleUrl: './reject-form.component.css',
})
export class RejectFormComponent {
  date = new Date();
  time = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { application: Application },
    private dialogRef: MatDialogRef<ListItemComponent>
  ) {}

  submitForm(): void {
    const date = this.date;
    date.setHours(this.time.getHours());
    date.setMinutes(this.time.getMinutes());
    console.log(date);

    fetch('http://localhost:8080/application/reject', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.data.application.id,
        timestamp: date.toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.dialogRef.close('success');
      });
  }

  onTimeChange(time: string): void {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    this.time.setHours(hours);
    this.time.setMinutes(minutes);
  }
}
