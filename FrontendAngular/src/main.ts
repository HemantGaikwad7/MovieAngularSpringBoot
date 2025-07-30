import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';

// Correct way: Merge providers so both appConfig.providers and provideRouter(routes) are used
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideRouter(routes),
  ]
}).catch((err) => console.error(err));