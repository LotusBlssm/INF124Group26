import { Injectable } from '@angular/core';
import { User } from './Classes/user/user';
import { Review } from './Classes/review/review';
import { Game } from './Classes/game/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

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

  getGame(gameId: any) {
    // TODO: Use the API in the backend to get all data from the specified game in IGDB 
    console.log('API Service gameGame() called.')
    const data = this.http.get(`http://localhost:3000/api/game/${gameId}`);
    console.log('API Service received data: ' + data);
    return data;
  }
}
