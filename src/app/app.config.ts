import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { httpInterceptor } from './core/auth/http.interceptor';
import { routes } from './routes/app.routes';
import { MoviesEffects } from './store/movies.effects';
import { moviesReducer } from './store/movies.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({ movies: moviesReducer }),
    provideEffects([MoviesEffects]),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAnimations(),
    ...(isDevMode() ? [provideStoreDevtools()] : []),
  ],
};
