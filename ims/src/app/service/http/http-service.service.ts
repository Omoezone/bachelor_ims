import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}
  baseUrl = 'http://localhost:8082';

  postData(url: string, data: any): Observable<any> {
    return this.http.post("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );  
  }

  login(url: string, email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post("/api/auth/" + url, loginData).pipe(
      catchError(this.handleError) 
    );  
  }
  
  private handleError(error: any) {
    // Log or handle your error here
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
