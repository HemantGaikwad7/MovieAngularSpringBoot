import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { ReviewRequest } from '../models/ReviewRequest';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/api/v1/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
  getMovieById(imdbId: string) {
  return this.http.get<Movie>(`${this.apiUrl}/${imdbId}`)
  .pipe(
        tap(movie => console.log('Fetched movie details:', movie))
      );;
}


postReview(reviewRequest: ReviewRequest): Observable<any> {
  return this.http.post('http://localhost:8080/api/v1/reviews', reviewRequest);
}
}