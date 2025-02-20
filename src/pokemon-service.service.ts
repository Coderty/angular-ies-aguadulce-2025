import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PokemonServiceService {
  private http = inject(HttpClient);

  // TODO: cambiar any
  getPokemonList(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon');
  }
}
