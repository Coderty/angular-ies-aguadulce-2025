import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: 'pokemons', pathMatch: 'full', component: PokemonListComponent },
  {
    path: 'pokemon/:pokemonName',
    pathMatch: 'full',
    component: PokemonDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'pokemons',
  },
];
