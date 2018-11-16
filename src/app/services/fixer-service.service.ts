import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FixerServiceService {

  constructor(private http: HttpClient) { }
  
  // RESTful API endpoint and HTTP headers
  endpoint = 'http://data.fixer.io/api/latest?access_key=052ed2a09fe56cae04ebe56831ca960f&symbols=USD,AUD&format=1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private extractData(res: Response) {
    let body = res;
    return body || {};
  };

  getRates(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }
 
}
