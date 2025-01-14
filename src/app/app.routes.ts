import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HomeComponent } from './home/home.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
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
