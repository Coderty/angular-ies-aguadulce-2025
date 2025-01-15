import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonsRes } from '../models/pokemon.interface';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [UpperCasePipe, RouterLink, ToolbarComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  pokemonsRes = signal<PokemonsRes>({} as PokemonsRes);
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

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

  redirecTo(url: string) {
    this.router.navigate([url]);
  }
}
