import { Component } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';
import { UserModel } from '../../models/user.model';

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

  users: UserModel[] = [];

  selectedUser: UserModel | null = null;
  minDate = '';
  maxDate = '';
  selectedDate = '';
  selectedTable: number | null = null;

  constructor(public bookingService: BookingService) {
    this.minDate = this.getTodayDate();
    this.maxDate = this.getDateAfterDays(7);
    this.selectedDate = this.minDate;
    this.users = this.bookingService.loadUsers();

    const currentUsername = this.bookingService.getCurrentUsername();

    this.selectedUser = this.users.find((user) => user.username === currentUsername) ?? null;
    this.bookingService.loadBookingsByDate(this.selectedDate);
  }

  onDateChange(): void {
    this.bookingService.loadBookingsByDate(this.selectedDate);
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

    this.bookingService.toggleBooking(table.id, this.selectedUser.username, this.selectedDate);

    this.selectedTable = table.id;
  }

  selectUser(user: UserModel) {
    this.selectedUser = user;
  }

  isTableBooked(tableId: number): boolean {
    return this.bookingService.isTableBooked(tableId, this.selectedDate);
  }

  getTableUser(tableId: number): string {
    return this.bookingService.getTableUser(tableId, this.selectedDate);
  }
}
