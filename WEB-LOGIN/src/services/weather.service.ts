import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  private apiKey = '1fd927773e3f4bbe91d9083b06c5a704';
  private baseUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) { }

  getweather(query: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`);
  }
}
