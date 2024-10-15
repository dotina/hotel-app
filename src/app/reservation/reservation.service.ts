import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly reservations: Reservation[] = [];

  constructor() {
    let data = localStorage.getItem('reservations');
    this.reservations = data? JSON.parse(data): [];
  }

  // CRUD opereations
  addReservation(reservation: Reservation): void {
    reservation.id = new Date().getTime().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
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
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(reservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === reservation.id);
    this.reservations[index] = reservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
