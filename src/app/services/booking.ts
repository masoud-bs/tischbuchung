import { Injectable } from '@angular/core';

import { BookingModel } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings: BookingModel[] = [];

  isTableBooked(tableId: number, date: string): boolean {
    return this.bookings.some((booking) => booking.tableId === tableId && booking.date === date);
  }

  getTableUser(tableId: number, date: string): string {
    const booking = this.bookings.find(
      (booking) => booking.tableId === tableId && booking.date === date,
    );

    return booking ? booking.user : '';
  }
}
