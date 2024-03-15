import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HammerModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routesErrors } from './errors/error.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideRouter(routesErrors), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HammerModule)
  ]
};
