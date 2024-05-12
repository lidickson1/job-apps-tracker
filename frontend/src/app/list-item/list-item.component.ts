import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  @Input() title!: String;
  @Input() company!: String;
  @Input() lastUpdated!: number;
  ngOnChanges() {
    if (this.lastUpdated) {
      this.lastUpdatedDate = new Date(this.lastUpdated).toLocaleString();
    }
  }
  lastUpdatedDate = '';
}
