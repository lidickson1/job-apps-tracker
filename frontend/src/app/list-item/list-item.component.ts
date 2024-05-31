import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TitleCasePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Companies, Application } from '../models';
import { RejectFormComponent } from '../reject-form/reject-form.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    TitleCasePipe,
    MatDialogModule,
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  @Input() application!: Application;
  // @Input() lastUpdated!: Date;
  @Input() companies: Companies = {};
  @Input() loadData!: () => void;

  constructor(public dialog: MatDialog) {}

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-CA', { hour12: false });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RejectFormComponent, {
      data: {
        application: this.application,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
}
