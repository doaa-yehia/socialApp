import { SweetAlert2Module} from './../../node_modules/@sweetalert2/ngx-sweetalert2/lib/sweet-alert2.module.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interseptors/headers/headers.interceptor';
import { loadingInterceptor } from './core/interseptors/loading/loading.interceptor';
import { errorsInterceptor } from './core/interseptors/errors/errors.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,
      withHashLocation(),
      withInMemoryScrolling({scrollPositionRestoration:'top'}),
      withViewTransitions()
      ),

    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,loadingInterceptor,errorsInterceptor])),
    provideAnimations(),
    provideToastr(),
    // importProvidersFrom(SweetAlert2Module.forRoot()),
    importProvidersFrom(NgxSpinnerModule),
   provideClientHydration(withEventReplay())
  ]
};
