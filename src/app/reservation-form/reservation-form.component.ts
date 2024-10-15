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
    private readonly fb: FormBuilder,
    private readonly reservationService: ReservationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation); // this adds the values to the edit view form
      }
    }
  }
  onSubmit() {
    if(this.reservationForm.valid) {
      let reservation : Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      // to check if we are adding new or editing.
      // this is because we are using the same submit button for both
      if (id) {
        // update
        this.reservationService.updateReservation(id,reservation);
      } else {
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']).then(r => {});
    }
  }
}
