import { Component } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-tisch-layout',
  imports: [FormsModule],
  templateUrl: './tisch-layout.html',
  styleUrl: './tisch-layout.scss',
})
export class TischLayout {
  tables: TableModel[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  users = ['Masoud', 'Janik', 'Nikolaus', 'Emma', 'Khaled'];

  selectedUser = '';
  minDate = '';
  maxDate = '';
  selectedDate = '';
  selectedTable: number | null = null;

  constructor(public bookingService: BookingService) {
    this.bookingService.bookings = [
      {
        tableId: 2,
        user: 'Masoud',
        date: this.getTodayDate(),
      },
    ];
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

    this.bookingService.toggleBooking(table.id, this.selectedUser, this.selectedDate);

    this.selectedTable = table.id;
  }

  selectUser(user: string) {
    this.selectedUser = user;
  }

  isTableBooked(tableId: number): boolean {
    return this.bookingService.isTableBooked(tableId, this.selectedDate);
  }

  getTableUser(tableId: number): string {
    return this.bookingService.getTableUser(tableId, this.selectedDate);
  }
}
