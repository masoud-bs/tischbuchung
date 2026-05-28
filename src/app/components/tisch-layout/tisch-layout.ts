import { Component } from '@angular/core';
import { TableModel } from '../../models/table.model';

@Component({
  selector: 'app-tisch-layout',
  imports: [],
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

  selectedTable: number | null = null;

  selectTable(table: TableModel) {
    if (table.booked) {
      return;
    }

    if (!this.selectedUser) {
      return;
    }

    table.booked = true;
    table.user = this.selectedUser;

    this.selectedTable = table.id;
  }

  selectUser(user: string) {
    this.selectedUser = user;
  }
}
