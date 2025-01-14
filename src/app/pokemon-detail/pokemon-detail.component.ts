import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail } from '../models/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  imports: [JsonPipe],

  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  pokemon = signal<PokemonDetail>({} as PokemonDetail);
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);

  constructor() {
    const pokemonName = this.route.snapshot.params['pokemonName'];
    this.getPokemon(pokemonName);
  }

  private getPokemon(name: string) {
    this.pokemonService.getPokemonDetail(name).subscribe((pokemon) => {
      console.log(pokemon);
      this.pokemon.set(pokemon);
    });
  }
}
