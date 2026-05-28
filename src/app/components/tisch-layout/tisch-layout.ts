import { Component } from '@angular/core';

@Component({
  selector: 'app-tisch-layout',
  imports: [],
  templateUrl: './tisch-layout.html',
  styleUrl: './tisch-layout.scss',
})
export class TischLayout {

  tables = [1, 2, 3, 4, 5, 6, 7, 8];

  selectedTable: number | null = null;

  selectTable(table: number) {
    this.selectedTable = table;
  }

}