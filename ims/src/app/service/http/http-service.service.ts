import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private baseUrl: string = environment.baseUrl;
  constructor(
    private http: HttpClient  
  ) {
  }

  // USER
  postData(url: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );  
  }

  updateUser(url:string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );
  }
  allItemsUser(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/${url}`).pipe(
      catchError(this.handleError) 
    );
  }

  // AUTH
  login(url: string, email: string, password: string): Observable<any> {
    const loginData = { email, password };
    console.log("loginData: ", loginData)
    return this.http.post(`${this.baseUrl}/api/auth/${url}`, loginData).pipe(
      catchError(this.handleError) 
    );  
  }
  validateToken(url: string, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/${url}`, {"token": token}).pipe(
      catchError(this.handleError) 
    ); 
  }

  // ITEMS
  postItem(url: string, data: any, params: any): Observable<any> {
    console.log("data: ", data, "params: ", params)
    return this.http.post(`${this.baseUrl}/api/${url}`, data, { params }).pipe(
      catchError(this.handleError) 
    );  
  }
  deleteItem(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/${url}`).pipe(
      catchError(this.handleError) 
    );
  }

  updateItem(url:string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );
  }
  
  // Collections
  postCollection(url: string, data: any, params: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/${url}`, data, { params }).pipe(
      catchError(this.handleError) 
    );  
  }
  deleteCollection(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/${url}`).pipe(
      catchError(this.handleError) 
    );
  }
  getUserCollections(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/${url}`).pipe(
      catchError(this.handleError) 
    );
  }
  getItemCollections(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/${url}`).pipe(
      catchError(this.handleError) 
    );
  }

  // Groups
  createGroup(url: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );  
  }

  postInvite(url: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );  
  }
  
  acceptInvite(url: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );  
  }

  denyInvite(url: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/${url}`, data).pipe(
      catchError(this.handleError) 
    );  
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
