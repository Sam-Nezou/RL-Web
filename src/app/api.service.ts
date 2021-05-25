import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Rank } from './class/Rank';



@Injectable({
  providedIn: 'root'
})
export class APIService {
baseUrl = 'api/v1/rocket-league/player-history/mmr/4936955'; 
 // baseUrl = 'http://localhost/test'; 

 ranks: Rank[][];
 constructor(private http: HttpClient) { 
   this.ranks = [];
 }



  getRank(): Observable<Rank[][]> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((res) => {
        this.ranks = res['data'];
        return this.ranks; 

      }),
    catchError(this.handleError));
}


  private handleError(error: HttpErrorResponse) {
    console.log(error);
  
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}