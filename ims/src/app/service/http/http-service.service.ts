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

  // USER
  postData(url: string, data: any): Observable<any> {
    return this.http.post("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );  
  }

  updateUser(url:string, data: any): Observable<any> {
    return this.http.put("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );
  }
  allItemsUser(url: string): Observable<any> {
    return this.http.get("/api/" + url).pipe(
      catchError(this.handleError) 
    );
  }

  // AUTH
  login(url: string, email: string, password: string): Observable<any> {
    const loginData = { email, password };
    console.log("loginData: ", loginData)
    return this.http.post("/api/auth/" + url, loginData).pipe(
      catchError(this.handleError) 
    );  
  }
  validateToken(url: string, token: string): Observable<any> {
    return this.http.post("/api/auth/" + url, {"token": token}).pipe(
      catchError(this.handleError) 
    ); 
  }

  // ITEMS
  postItem(url: string, data: any, params: any): Observable<any> {
    console.log("data: ", data, "params: ", params)
    return this.http.post("/api/" + url, data, { params }).pipe(
      catchError(this.handleError) 
    );  
  }
  deleteItem(url: string): Observable<any> {
    return this.http.delete("/api/" + url).pipe(
      catchError(this.handleError) 
    );
  }

  updateItem(url:string, data: any): Observable<any> {
    return this.http.put("/api/" + url, data).pipe(
      catchError(this.handleError) 
    );
  }
  
  // Collections
  postCollection(url: string, data: any, params: any): Observable<any> {
    console.log("data: ", data, "params: ", params)
    return this.http.post("/api/" + url, data, { params }).pipe(
      catchError(this.handleError) 
    );  
  }
  deleteCollection(url: string): Observable<any> {
    return this.http.delete("/api/" + url).pipe(
      catchError(this.handleError) 
    );
  }
  getUserCollections(url: string): Observable<any> {
    return this.http.get("/api/" + url).pipe(
      catchError(this.handleError) 
    );
  }
  getItemCollections(url: string): Observable<any> {
    return this.http.get("/api/" + url).pipe(
      catchError(this.handleError) 
    );
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
