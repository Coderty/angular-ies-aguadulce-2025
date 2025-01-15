import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetail } from '../models/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-pokemon-detail',
  imports: [ToolbarComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  pokemon = signal<PokemonDetail>({} as PokemonDetail);
  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    const pokemonName = this.activatedRoute.snapshot.params['pokemonName'];
    this.getPokemon(pokemonName);
  }

  private getPokemon(name: string) {
    this.pokemonService.getPokemonDetail(name).subscribe((pokemon) => {
      console.log(pokemon);
      this.pokemon.set(pokemon);
    });
  }
  redirecTo(url: string) {
    this.router.navigate([url]);
  }
}
