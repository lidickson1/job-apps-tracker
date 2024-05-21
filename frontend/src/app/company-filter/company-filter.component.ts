import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Companies } from '../models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import fuzzysort from 'fuzzysort';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.css',
})
export class CompanyFilterComponent {
  @Input() companies: Companies = {};
  @Output() notify: EventEmitter<string | null> = new EventEmitter<
    string | null
  >();

  myControl = new FormControl('');
  filteredOptions: string[] = Object.values(this.companies).map((x) => x.name);

  ngOnInit() {
    this.myControl.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredOptions = fuzzysort
          .go(
            value,
            Object.values(this.companies).map((x) => x.name),
            { limit: 10 }
          )
          .map((x) => x.target);
      } else {
        this.filteredOptions = [];
      }
      this.notify.emit(value);
    });
  }

  onCompanyChange(event: MatAutocompleteSelectedEvent): void {
    this.notify.emit(event.option.value);
  }
}
