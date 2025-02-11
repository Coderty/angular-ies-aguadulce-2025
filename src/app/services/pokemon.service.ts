import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  readonly pokeAPI = 'https://pokeapi.co/api/v2/';

  private http = inject(HttpClient);

  getPokemonList(): Observable<any> {
    return this.http.get(`${this.pokeAPI}pokemon?limit=24`);
  }

  call(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonDetail(pokemonName: string): Observable<any> {
    return this.http.get(`${this.pokeAPI}pokemon/${pokemonName}`);
  }
}
