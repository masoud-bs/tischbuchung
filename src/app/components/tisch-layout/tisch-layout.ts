import { Component } from '@angular/core';

@Component({
  selector: 'app-tisch-layout',
  imports: [],
  templateUrl: './tisch-layout.html',
  styleUrl: './tisch-layout.scss',
})
export class TischLayout {

  tables = [
    { id: 1, booked: false },
    { id: 2, booked: true },
    { id: 3, booked: false },
    { id: 4, booked: true },
    { id: 5, booked: false },
    { id: 6, booked: false },
    { id: 7, booked: true },
    { id: 8, booked: false },
  ];

  selectedTable: number | null = null;

  selectTable(table: any) {

    if (table.booked) {
      return;
    }

    this.selectedTable = table.id;
  }

}