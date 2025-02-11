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
import { SpinnerComponent } from '../spinner/spinner.component';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [ToolbarComponent, SpinnerComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  pokemon = signal<PokemonDetail | undefined>({} as PokemonDetail);
  loading = signal<boolean>(true);

  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    const pokemonName = this.activatedRoute.snapshot.params['pokemonName'];
    this.getPokemon(pokemonName);
  }

  private getPokemon(name: string) {
    this.loading.set(true);
    this.pokemonService
      .getPokemonDetail(name)
      .pipe(debounceTime(2000))
      .subscribe((pokemon) => {
        this.pokemon.set(pokemon);
        this.loading.set(false);
      });
  }
  redirecTo(url: string) {
    this.router.navigate([url]);
  }
}
