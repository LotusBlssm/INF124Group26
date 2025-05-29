import { Injectable } from '@angular/core';
import { User } from './Classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  getUser(userId: number): User | null {
    // TODO: Use the API in the backend to retrieve the user data from the database with the given userId

    return null;
  }

  getReviews(gameId: number) {
    // TODO: Use the API in the backend to get all reviews from the specified game in our database 

  }

  getGame(gameId: number) {
    // TODO: Use the API in the backend to get all data from the specified game in IGDB 

  }

  constructor() { }
}
