import { Injectable } from '@angular/core';

import { BookingModel } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings: BookingModel[] = [];
}
