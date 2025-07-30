import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';
import { RouterModule } from '@angular/router'; 
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'movie-details',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  template: `
    <ng-container *ngIf="loading">Loading movie details...</ng-container>
    
    <div *ngIf="!loading && movie" class="movie-details-container" [style.background-image]="backgroundImage">
      <div class="content-overlay">
      <img [src]="movie.poster" [alt]="movie.title" width="250" />
      <h2>{{ movie.title }}</h2>
      <p>Release Date: {{ movie.releaseDate }}</p>
      <div>
        <strong>Genres:</strong>
        <span *ngFor="let genre of movie.genres">{{ genre }}</span>
      </div>
      <div>
        <a [href]="movie.trailerLink" target="_blank">Watch Trailer</a>
      </div>
      <button routerLink="/">Back to movies</button>
       <!-- Reviews Section -->
      <section *ngIf="movie  && movie.reviewIds && movie.reviewIds.length > 0" style="margin-top: 2rem;">
        <h3>User Reviews</h3>
        <ul>
          <li *ngFor="let review of movie.reviewIds">
            <p>{{ review.body }}</p>
            <small>Posted on: {{ review.created | date:'medium' }}</small>
          </li>
        </ul>
      </section>

      <section *ngIf="movie && (!movie.reviewIds || movie.reviewIds.length === 0)" style="margin-top: 2rem;">
        <p>No reviews yet.</p>
      </section>
       <form (ngSubmit)="submitReview()" #reviewForm="ngForm" style="margin-top: 2rem;">
        <label for="reviewBody">Add your review:</label><br/>
        <textarea 
          id="reviewBody" 
          name="reviewBody" 
          [(ngModel)]="reviewBody" 
          required 
          rows="3" 
          cols="50"
          placeholder="Write your review here..."></textarea>
        <br/>
        <button type="submit" [disabled]="!reviewBody.trim()">Submit Review</button>
      </form>

      <div *ngIf="reviewMessage" style="margin-top: 0.5rem; color: green;">
        {{ reviewMessage }}
      </div>
    </div>
    <div *ngIf="!loading && !movie">
      <p>Movie not found.</p>
      <button routerLink="/">Back to movies</button>
    </div>
  `,
  styles: [`
    :host {
  display: block;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  color: #222; /* dark text for light background */
}
  .genres span {
  background-color: black !important;
  padding: 2px 6px; 
  border-radius: 3px;
  font-size: 0.85rem;
  white-space: nowrap;      /* Prevent individual genre words from wrapping */
}

    .movie-details-container {
      position: relative;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      padding: 2rem;
      color: #f0f0f0;
      /* dark overlay for readability */
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .movie-details-container::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
    .content-overlay {
      position: relative;
      z-index: 2;
      max-width: 800px;
      background-color: rgba(0,0,0,0.7);
      padding: 1.5rem 2rem;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0,0,0,0.9);
      width: 100%;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    strong {
      font-weight: 700;
    }
    span {
      margin-right: 0.5rem;
      padding: 2px 6px;
      border-radius: 4px;
      background-color: black;
      display: inline-block;
      margin-bottom: 0.3rem;
    }

    a {
      color: #81c784; /* nice green */
      text-decoration: underline;
    }
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border: none;
      background-color: #81c784;
      color: black;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #66bb6a;
    }
    form textarea {
      width: 100%;
      border-radius: 6px;
      border: 1px solid #666;
      resize: vertical;
      font-family: inherit;
      padding: 0.5rem;
      background: #222;
      color: #eee;
    }
    .review-message {
      margin-top: 0.5rem;
      color: #a5d6a7;
      font-weight: 600;
    }
  `]
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  loading = true;
   // Add these properties to bind to template and form
  reviewBody: string = '';
  reviewMessage: string = '';     
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}
  // Use the first backdrop if available as background-image
  get backgroundImage() {
    if (!this.movie || !this.movie.backdrops || this.movie.backdrops.length === 0) {
      return '';
    }
    return `url('${this.movie.backdrops[0]}')`;
  }
  ngOnInit() {
    const imdbId = this.route.snapshot.paramMap.get('imdbId')!;
    console.log('Fetching movie details for imdbId:', imdbId);
    this.movieService.getMovieById(imdbId).subscribe({
      next: (movie) => {
        console.log('Movie details received:', movie);
        this.movie = movie;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        console.error('Error loading movie details:');
        this.movie = null;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  submitReview() {
    if (!this.reviewBody.trim() || !this.movie) return;

    this.movieService.postReview({
      reviewBody: this.reviewBody.trim(),
      imdbId: this.movie.imdbId
    }).subscribe({
      next: () => {
        this.reviewMessage = 'Review submitted successfully!';
        this.reviewBody = '';
        // Optionally refresh the movie details here to show the new review
          // Re-fetch movie details to refresh the review list
      this.loading = true;  // Optional: show loading indicator while refreshing
      this.movieService.getMovieById(this.movie!.imdbId).subscribe({
        next: (updatedMovie) => {
          this.movie = updatedMovie;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
        }
      });
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.reviewMessage = 'Failed to submit review. Please try again.';
      }
    });
  }
}
