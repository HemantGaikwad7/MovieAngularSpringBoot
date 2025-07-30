import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './movie-list.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MovieListComponent, HttpClientModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>{{ title() }}</h1>
      </header>
      <main class="app-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    
    .app-header {
      background-color: #1976d2;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .app-main {
      padding: 2rem;
    }
  `],
})
export class App {
  protected readonly title = signal('Movies');
}
