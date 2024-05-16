import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TitleCasePipe } from '@angular/common';

import { Companies, Application } from '../models';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, TitleCasePipe],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  @Input() application!: Application;
  // @Input() lastUpdated!: Date;
  @Input() companies: Companies = {};

  // lastUpdatedDate = '';

  // ngOnChanges() {
  //   if (this.lastUpdated) {
  //     this.lastUpdatedDate = new Date(this.lastUpdated).toLocaleString();
  //   }
  // }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-CA', { hour12: false });
  }
}
