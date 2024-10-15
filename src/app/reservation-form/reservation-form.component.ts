import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });
  }
  onSubmit() {
    if(this.reservationForm.valid) {
      this.reservationService.addReservation(this.reservationForm.value);
      this.router.navigate(['/list']);
    }
  }
}
