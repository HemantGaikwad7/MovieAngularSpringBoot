import { Routes } from '@angular/router';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailsComponent } from './movie-details.component';
export const routes: Routes = [
{ path: '', component: MovieListComponent },
{ path: 'movies/:imdbId', component: MovieDetailsComponent },
  { path: '**', redirectTo: '' }
];
