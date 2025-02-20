import { Component, inject } from '@angular/core';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonServiceService } from '../pokemon-service.service';
import { JsonPipe } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonDetailComponent, JsonPipe, PaginatorComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  // TODO: cambiar any
  public pokemons: any[] = [];
  private pokemonService = inject(PokemonServiceService);

  constructor() {
    this.pokemonService.getPokemonList().subscribe((data) => {
      this.pokemons = data.results;
    });
  }

  clickName(frase: string) {
    console.log(frase);
  }

  nextPage() {
    console.log('siguiente pagina');
  }

  prevPage() {
    console.log('pagina anterior');
  }
}
