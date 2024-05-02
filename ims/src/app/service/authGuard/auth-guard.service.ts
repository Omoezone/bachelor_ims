import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
        console.log("Response from canActivate() is: ", isAuthenticated);
        if (isAuthenticated) {
          console.log("Response from canActivate() is TRUE ");
          return of(true);
        } else {
          console.log("Response from canActivate() is FALSE ");
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
