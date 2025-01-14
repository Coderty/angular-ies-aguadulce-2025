import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'pokemons', pathMatch: 'full', component: PokemonListComponent },
  {
    path: '**',
    redirectTo: 'pokemons',
  },
];
