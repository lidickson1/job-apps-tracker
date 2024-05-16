import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ListItemComponent } from './list-item/list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFormComponent } from './add-form/add-form.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Companies, Company, Application } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListItemComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    AddFormComponent,
    MatPaginatorModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  currentDate = Date.now();
  companies: Companies = {};
  applications: Application[] = [];
  numOfItems: number = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddFormComponent, {
      data: {
        companies: this.companies,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  private loadData(): void {
    fetch('http://localhost:8080/companies')
      .then((res) => res.json())
      .then((res) => {
        this.companies = Object.fromEntries(res.map((x: Company) => [x.id, x]));
        console.log(res);
      });
    fetch('http://localhost:8080/applications?page=0')
      .then((res) => res.json())
      .then((res: Application[]) => {
        this.applications = res;
      });
    fetch('http://localhost:8080/applications/total')
      .then((res) => res.json())
      .then((res) => {
        this.numOfItems = res;
      });
  }

  handlePageEvent(e: PageEvent) {
    fetch(`http://localhost:8080/applications?page=${e.pageIndex}`)
      .then((res) => res.json())
      .then((res: Application[]) => {
        this.applications = res;
      });
  }
}
