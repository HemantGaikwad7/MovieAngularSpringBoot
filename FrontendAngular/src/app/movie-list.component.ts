import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';

@Component({
  selector: 'movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="movies().length === 0">Loading movies...</div>
    <div *ngIf="movies().length > 0" class="movie-grid">
      <div *ngFor="let movie of movies()" class="movie-card">
      <a [routerLink]="['/movies', movie.imdbId]" style="text-decoration:none; color:inherit;">
        <img [src]="movie.poster" [alt]="movie.title" width="200" />
        <h3>{{ movie.title }}</h3>
        <p>Released: {{ movie.releaseDate }}</p>
        <div class="genres">
          <strong>Genres:</strong>
          <span *ngFor="let genre of movie.genres">{{ genre }}</span>
        </div>
        </a>
        <a [href]="movie.trailerLink" target="_blank">Watch Trailer</a>
      </div>
    </div>
  `,
  styles: [`
    .movie-grid { display: flex; flex-wrap: wrap; gap: 3rem; }
    .movie-card { border: 1px solid #ccc; padding: 10px; width: 220px; border-radius: 6px; box-shadow: 2px 2px 10px #eee; margin: 1rem; box-sizing: border-box; }
    .movie-card img { width: 100%; border-radius: 4px; }
    .movie-card div.genres {
  white-space: normal;      /* Allow wrapping */
  word-wrap: break-word;    /* Break long words if needed */
  display: flex;            /* Flex container */
  flex-wrap: wrap;          /* Wrap items to next line */
  gap: 0.25rem;             /* Small gap between genre tags */
}

.movie-card div.genres span {
  background-color: white;
  padding: 2px 6px; 
  border-radius: 3px;
  font-size: 0.85rem;
  white-space: nowrap;      /* Prevent individual genre words from wrapping */
}
   :host {
     display: block;
      background: antiquewhite;
      padding: 1rem; /* optional padding */
      min-height: 100vh; /* optional: full viewport height */
      box-sizing: border-box;
    }

  `]
})
export class MovieListComponent implements OnInit {
  movies = signal<Movie[]>([]);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies.set(movies);
    });
  }
}
