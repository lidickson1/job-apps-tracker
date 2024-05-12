import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  //https://stackoverflow.com/a/72504735
  providers: [provideRouter(routes), provideAnimationsAsync()],
};
