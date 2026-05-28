import { Component } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tisch-layout',
  imports: [FormsModule],
  templateUrl: './tisch-layout.html',
  styleUrl: './tisch-layout.scss',
})
export class TischLayout {
  tables: TableModel[] = [
    { id: 1, booked: false, user: '' },
    { id: 2, booked: true, user: 'Masoud' },
    { id: 3, booked: false, user: '' },
    { id: 4, booked: true, user: 'Janik' },
    { id: 5, booked: false, user: '' },
    { id: 6, booked: false, user: '' },
    { id: 7, booked: true, user: 'Nikolaus' },
    { id: 8, booked: false, user: '' },
  ];

  users = ['Masoud', 'Janik', 'Nikolaus', 'Emma', 'Khaled'];

  selectedUser = '';
  minDate = '';
  maxDate = '';
  selectedDate = '';
  selectedTable: number | null = null;

  constructor() {
    this.minDate = this.getTodayDate();
    this.maxDate = this.getDateAfterDays(7);
    this.selectedDate = this.minDate;
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getDateAfterDays(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }
  selectTable(table: TableModel) {
    if (!this.selectedUser) {
      return;
    }

    // Unbook own table
    if (table.booked && table.user === this.selectedUser) {
      table.booked = false;
      table.user = '';

      return;
    }

    // Already booked by another user
    if (table.booked) {
      return;
    }

    // Book table
    table.booked = true;
    table.user = this.selectedUser;

    this.selectedTable = table.id;
  }

  selectUser(user: string) {
    this.selectedUser = user;
  }
}
