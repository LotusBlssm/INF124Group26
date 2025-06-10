import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public readonly user$ = this.userSubject.asObservable();
  private token: any;

  login(userID: any, password: any) {
    this.apiService.loginUser(userID, password).subscribe((data: any) => {
      this.token = data.token; 
      this.userSubject.next(data.user);
    })
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  constructor(private apiService: APIService) { 

  }
}
