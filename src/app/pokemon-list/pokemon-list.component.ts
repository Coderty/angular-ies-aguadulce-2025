import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonsRes } from '../models/pokemon.interface';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [UpperCasePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  pokemonsRes = signal<PokemonsRes>({} as PokemonsRes);
  private pokemonService = inject(PokemonService);

  constructor() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonService.getPokemonList().subscribe((data) => {
      this.pokemonsRes.set(data);
    });
  }

  nextPage() {
    this.pokemonService.call(this.pokemonsRes().next).subscribe((data) => {
      this.pokemonsRes.set(data);
    });
  }

  prevPage() {
    this.pokemonService.call(this.pokemonsRes().previous).subscribe((data) => {
      this.pokemonsRes.set(data);
    });
  }

  getPokemonImg(pokemonName: string): string {
    return `https://img.pokemondb.net/artwork/${pokemonName}.jpg`;
  }
}
