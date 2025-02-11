import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { PokemonsRes } from '../models/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    UpperCasePipe,
    RouterLink,
    ToolbarComponent,
    MatIconModule,
    MatButtonModule,
    SpinnerComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonsRes = signal<PokemonsRes>({} as PokemonsRes);
  loading = signal(false);

  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  constructor() {
    console.log('constructor');
    this.getPokemonList();
  }

  ngOnInit(): void {
    console.log('init');
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  getPokemonList() {
    this.loading.set(true);
    this.pokemonService
      .getPokemonList()
      .pipe(debounceTime(2000))
      .subscribe((data) => {
        this.pokemonsRes.set(data);
        this.loading.set(false);
      });
  }

  nextPage() {
    this.loading.set(true);
    this.pokemonService
      .call(this.pokemonsRes().next)
      .pipe(debounceTime(2000))
      .subscribe((data) => {
        this.pokemonsRes.set(data);
        this.loading.set(false);
      });
  }

  prevPage() {
    this.loading.set(true);
    this.pokemonService
      .call(this.pokemonsRes().previous)
      .pipe(debounceTime(2000))
      .subscribe((data) => {
        this.loading.set(false);
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
