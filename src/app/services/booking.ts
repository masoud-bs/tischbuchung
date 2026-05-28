import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings: BookingModel[] = [];
  isLoading = false;
  isSaving = false;

  loadUsers(): UserModel[] {
    const jrUsers = [
      {
        username: 'firouzi',
        lastname: 'Firouzi',
        prename: 'Masoud',
        email: 'Masoud.Firouzi@behrens-schuleit.de',
      },
      {
        username: 'busch',
        lastname: 'Busch',
        prename: 'Janik',
        email: 'Janik.Busch@behrens-schuleit.de',
      },
    ];

    return jrUsers.map((user) => ({
      username: user.username,
      displayName: user.prename,
      lastname: user.lastname,
      email: user.email,
    }));
  }

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

    return booking ? booking.displayName : '';
  }

  bookTable(tableId: number, user: string, date: string): void {
    this.isSaving = true;

    this.bookings.push({
      tableId,
      username: user,
      displayName: user,
      date,
    });

    this.isSaving = false;
  }

  unbookTable(tableId: number, user: string, date: string): void {
    this.bookings = this.bookings.filter(
      (booking) =>
        !(
          booking.tableId === tableId &&
          booking.date === date &&
          (booking.username === user || booking.displayName === user)
        ),
    );
  }

  toggleBooking(tableId: number, user: string, date: string): void {
    const existingBooking = this.bookings.find(
      (booking) => booking.tableId === tableId && booking.date === date,
    );

    if (
      existingBooking &&
      (existingBooking.username === user || existingBooking.displayName === user)
    ) {
      this.unbookTable(tableId, user, date);
      return;
    }

    if (existingBooking) {
      return;
    }

    this.bookTable(tableId, user, date);
  }

  loadBookingsByDate(date: string): void {
    this.isLoading = true;

    /*const url =
      'https://jobrouter.behrens-schuleit.de/jobrouter/api/rest/v2/application/steps/new/dialogfunctions/GetTableBookings';

    this.http.post<any>(url, {}).subscribe({
      next: (response) => {
        this.bookings = response.dialogfunctions.returnValues.TableBookings;

        this.isLoading = false;
      },

      error: (error) => {
        console.error('Load bookings error:', error);

        this.isLoading = false;
      },
    });*/
    console.log('Load bookings for:', date);

    this.bookings = [
      {
        tableId: 2,

        username: 'firouzi',

        displayName: 'Masoud',

        date,
      },
    ];

    this.isLoading = false;
  }
}
