import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }
 
getPokemonList(limit: number, offset: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
}

  
  getPokemonDetail(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  getEvolutionChain(url: string): Observable<any> {
  return this.http.get(url);
}


}


