import { Injectable } from '@angular/core';
import { User } from './Classes/user/user';
import { Review } from './Classes/review/review';
import { Game } from './Classes/game/game';
import { Feedback } from './Classes/feedback/feedback';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  loginUser(userID: any, password: any) {
    const data = this.http.post('http://localhost:3000/api/user/login', { userID, password });
    return data; 
  }

  addReview(review: Review) {
    // TODO: Use the API in the backend to add a new review
    console.log('API Service addReview() called');
    console.log('in service, review is');
    console.log(review);
    const data = this.http.post(`http://localhost:3000/api/review`, { review });
    return data;
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

  getSearchResults(query: any) {
    console.log(`API Service getSearchResults(${query}) called`);
    const params = new HttpParams().set('query', query);
    const data = this.http.get('http://localhost:3000/api/search', { params });
    return data;
  }

  addFeedback(feedback: Feedback) {
    console.log('API Service postFeedback() called.');
    console.log(feedback); 
    return this.http.post('http://localhost:3000/api/feedback', feedback);
}

  getFeedback(feedbackID: any) { 
    console.log('API Service getFeedback() called.');
    console.log(feedbackID); 
    const data = this.http.get('http://localhost:3000/api/feedback/${feedbackId}');
  }

}
