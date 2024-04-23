import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(
    private http: HttpClient  
  ) {}
  baseUrl = 'http://localhost:8081';

  postData(url: string, data: any): Observable<any> {
    return this.http.post("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );  
  }

  login(url: string, email: string, password: string): Observable<any> {
    const loginData = { email, password };
    console.log("loginData: ", loginData)
    return this.http.post("/api/auth/" + url, loginData).pipe(
      catchError(this.handleError) 
    );  
  }
  postCollection(url: string, data: any): Observable<any> {
    return this.http.post("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );  
  }
  getUserCollections(url: string): Observable<any> {
    return this.http.get("/api/" + url).pipe(
      catchError(this.handleError) 
    );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
