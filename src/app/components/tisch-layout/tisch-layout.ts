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

    const existingBooking = this.bookingService.bookings.find(
      (booking) => booking.tableId === table.id && booking.date === this.selectedDate,
    );

    // Unbook own table
    if (existingBooking && existingBooking.user === this.selectedUser) {
      this.bookingService.bookings = this.bookingService.bookings.filter(
        (booking) => !(booking.tableId === table.id && booking.date === this.selectedDate),
      );

      return;
    }

    // Already booked by another user
    if (existingBooking) {
      return;
    }

    // Book table
    this.bookingService.bookings.push({
      tableId: table.id,
      user: this.selectedUser,
      date: this.selectedDate,
    });

    this.selectedTable = table.id;
  }

  selectUser(user: string) {
    this.selectedUser = user;
  }

  isTableBooked(tableId: number): boolean {
    return this.bookingService.bookings.some(
      (booking) => booking.tableId === tableId && booking.date === this.selectedDate,
    );
  }

  getTableUser(tableId: number): string {
    const booking = this.bookingService.bookings.find(
      (booking) => booking.tableId === tableId && booking.date === this.selectedDate,
    );

    return booking ? booking.user : '';
  }
}
