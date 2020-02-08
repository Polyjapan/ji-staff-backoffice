import {UserProfile} from './user';

export class Meal {
  mealId?: number;
  eventId: number;
  name: string;
  date?;
}

export class MealTaken {
  userId: number;
  timestamp?;
}
