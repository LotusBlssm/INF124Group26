import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1), // take the latest value and complete
      map(user => {
        if (user) {
          return true; // user logged in, allow access
        } else {
          this.router.navigate(['/login']); // not logged in, redirect to login page
          return false;
        }
      })
    );
  }
}
