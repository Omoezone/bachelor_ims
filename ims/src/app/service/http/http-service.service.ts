import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:8082';

  postData(url: string, data: any): Observable<any> {
    return this.http.post("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );  
  }

  private handleError(error: any) {
    // Log or handle your error here
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
