export interface PokemonRes {
  count: number;
  next: string;
  previous: any;
  results: PokemonData[];
}

export interface PokemonData {
  name: string;
  url: string;
}
