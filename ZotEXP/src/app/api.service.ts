import { Injectable } from '@angular/core';
import { User } from './Classes/user/user';
import { Review } from './Classes/review/review';
import { Game } from './Classes/game/game';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  getUser(userId: number): User | null {
    // TODO: Use the API in the backend to retrieve the user data from the database with the given userId

    return null;
  }

  addUser(user: User) {
    // TODO: Use the API in the backend to create a new user given the user parameter

  }

  updateUser(user: User) {
    // Todo: Use the API in the backend to update the user specified with the new information passed as the argument

  }

  addReview(review: Review) {
    // TODO: Use the API in the backend to add a new review

  }

  updateReview(review: Review) {
    // TODO: Use the API in the backend to update the review specified with the new information passed as the argument
  }

  getGame(gameId: number) {
    // TODO: Use the API in the backend to get all data from the specified game in IGDB 

  }

  constructor() { }
}
