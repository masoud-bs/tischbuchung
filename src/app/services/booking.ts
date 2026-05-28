import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings: BookingModel[] = [];

  constructor(private http: HttpClient) {}
  getBookingsByDate(date: string): BookingModel[] {
    return this.bookings.filter((booking) => booking.date === date);
  }

  isTableBooked(tableId: number, date: string): boolean {
    return this.bookings.some((booking) => booking.tableId === tableId && booking.date === date);
  }

  getTableUser(tableId: number, date: string): string {
    const booking = this.bookings.find(
      (booking) => booking.tableId === tableId && booking.date === date,
    );

    return booking ? booking.user : '';
  }

  bookTable(tableId: number, user: string, date: string): void {
    const existingBooking = this.bookings.find(
      (booking) => booking.tableId === tableId && booking.date === date,
    );

    if (existingBooking) {
      return;
    }

    this.bookings.push({
      tableId,
      user,
      date,
    });
  }

  unbookTable(tableId: number, user: string, date: string): void {
    this.bookings = this.bookings.filter(
      (booking) => !(booking.tableId === tableId && booking.date === date && booking.user === user),
    );
  }

  toggleBooking(tableId: number, user: string, date: string): void {
    const existingBooking = this.bookings.find(
      (booking) => booking.tableId === tableId && booking.date === date,
    );

    if (existingBooking && existingBooking.user === user) {
      this.unbookTable(tableId, user, date);
      return;
    }

    if (existingBooking) {
      return;
    }

    this.bookTable(tableId, user, date);
  }

  loadBookingsByDate(date: string): void {
    console.log('Load bookings for:', date);
    /* const url = 'https://example.com/api/bookings?date=' + date;

    this.http.get(url).subscribe({
      next: (response) => {
        console.log('API response:', response);
      },

      error: (error) => {
        console.error('API error:', error);
      },
    });*/
  }
}
