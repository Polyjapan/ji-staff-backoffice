import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import {Meal} from '../../../data/meals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meals-selector',
  templateUrl: './meals-selector.component.html',
  styleUrls: ['./meals-selector.component.css']
})
export class MealsSelectorComponent implements OnInit {
  meals: Meal[];

  createMealName: string;
  creatingMeal: boolean;

  private eventId: number;

  constructor(public ar: ActivatedRoute, public backend: BackendService, private router: Router) { }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.eventId = ev.eventId;
        this.refresh();
      });
  }

  refresh() {
    this.backend.getMeals(this.eventId).subscribe(meals => this.meals = meals);
  }

  createMeal() {
    if (this.creatingMeal) {
      return;
    }
    this.creatingMeal = true;
    const meal: Meal = {eventId: this.eventId, name: this.createMealName};

    this.backend.createMeal(meal).subscribe(
      succ => this.router.navigate([succ], {relativeTo: this.ar}),
      err => {
        Swal.fire('Une erreur s\'est produite...', undefined, 'error');
        this.creatingMeal = false;
      }
    );
  }



}
