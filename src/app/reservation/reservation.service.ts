import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() { }

  // CRUD opereations
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation  | undefined {
    return this.reservations.find(reservation => reservation.id === id);;
  }

  deleteReservation(id: string): void {
    // this.reservations = this.reservations.filter(reservation => reservation.id !== id);
    let index = this.reservations.findIndex(reservation => reservation.id === id);
    this.reservations.splice(index, 1);
  }

  updateReservation(reservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === reservation.id);
    this.reservations[index] = reservation;
  } 
}
