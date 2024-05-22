import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      switchMap((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return of(true);
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
