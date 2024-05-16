import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import fuzzysort from 'fuzzysort';

import { Companies } from '../models';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    DatePipe,
    MatSelectModule,
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent {
  filteredOptions: string[] = [];
  time = new Date();

  formGroup = this.formBuilder.group({
    company: [''],
    image: [''],
    position: [''],
    date: [new Date()],
    location: [''],
    job_type: [''],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { companies: Companies },
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFormComponent>
  ) {}

  ngOnInit() {
    this.formGroup.controls.company.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredOptions = fuzzysort
          .go(
            value,
            Object.values(this.data.companies).map((x) => x.name),
            { limit: 5 }
          )
          .map((x) => x.target);
      } else {
        this.filteredOptions = [];
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return Object.values(this.data.companies)
      .map((x) => x.name)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  submitForm(): void {
    if (this.formGroup.errors) {
      console.log('errors');
    } else {
      // console.log('nice!');
      // console.log(this.date);
      const date = this.formGroup.controls.date.value!;
      date.setHours(this.time.getHours());
      date.setMinutes(this.time.getMinutes());
      // console.log({
      //   ...this.formGroup.value,
      //   applied_date: date.toISOString(),
      // });
      // return;
      fetch('http://localhost:8080/application/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.formGroup.value,
          applied_date: date.toISOString(),
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      this.dialogRef.close('success');
    }
  }

  onCompanyChange(event: MatAutocompleteSelectedEvent): void {
    this.formGroup.controls.image.setValue(
      Object.values(this.data.companies).find(
        (x) => x.name === event.option.value
      )!.image
    );
  }

  onTimeChange(time: string): void {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    this.time.setHours(hours);
    this.time.setMinutes(minutes);
  }
}
