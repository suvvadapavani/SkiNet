import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import 'zone.js'

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { errorInterceptor } from './Core/Interceptors/error-interceptor';
import { loadingInterceptor } from './Core/Interceptors/loading-interceptor';
import { InitService } from './Core/Services/init.service';
import { lastValueFrom } from 'rxjs';
import { authInterceptor } from './Core/Interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([
      errorInterceptor,
      loadingInterceptor,
      authInterceptor
    ])),

    provideAppInitializer(async () => {
      const initService = inject(InitService);
      return lastValueFrom(initService.init()).finally(() => {
        const splash = document.getElementById('initial-splash');
        if (splash) {
          splash.remove();
        }
      })
    }),


  
    {
      provide:MAT_DIALOG_DEFAULT_OPTIONS,
      useValue:{autoFocus:'dialog',restoreFocus:true},
  
        
      }
    

  ]
};
